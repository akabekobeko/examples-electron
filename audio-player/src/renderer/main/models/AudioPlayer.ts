import { GraphicEqulizerParams as GEQ } from '../../Constants'
import { PlaybackState } from '../Types'
import EffectEqualizer from './EffectEqualizer'

/**
 * Provides audio playback function.
 * @see referred: http://github.com/eipark/buffaudio
 */
class AudioPlayer {
  /** Audio context. */
  private _context: AudioContext

  /** Node for audio volume adjustment. */
  private _gainNode: GainNode

  /** Node for audio analyze. */
  private _analyserNode: AnalyserNode

  /** Node for effector. */
  private _effectNode: GainNode

  /**  Node that connects the source and the effector. */
  private _effectSourceNode: GainNode

  /** Audio element. */
  private _audio: HTMLAudioElement | null

  /** Node for audio source. */
  private _audioSourceNode: MediaElementAudioSourceNode | null

  /** Effect of the graphic equalizer. */
  private _effectEqualizer: EffectEqualizer

  /** Playback state. */
  private _playbackState: PlaybackState

  /**
   * Initliaze instance.
   */
  constructor() {
    this._context = new AudioContext()

    this._gainNode = this._context.createGain()
    this._gainNode.gain.value = 1.0
    this._gainNode.connect(this._context.destination)

    this._analyserNode = this._context.createAnalyser()
    this._analyserNode.fftSize = 64
    this._analyserNode.connect(this._gainNode)

    this._effectNode = this._context.createGain()
    this._effectNode.gain.value = 1.0
    this._effectNode.connect(this._analyserNode)

    this._effectSourceNode = this._context.createGain()
    this._effectSourceNode.gain.value = 1.0
    this._effectSourceNode.connect(this._effectNode)

    this._effectEqualizer = new EffectEqualizer(
      this._context,
      GEQ.Bands,
      GEQ.GainMin,
      GEQ.GainMax
    )

    this._audio = null
    this._audioSourceNode = null
    this._playbackState = PlaybackState.Stopped
  }

  /**
   * Get an playback state.
   * @returns State.
   */
  get playbackState(): PlaybackState {
    return this._playbackState
  }

  /**
   * Get an audio duration.
   * @returns Duration (Milliseconds).
   */
  get duration(): number {
    return this._audio ? this._audio.duration : 0
  }
  /**
   * Get the currently playback time.
   * @returns Playback time (Milliseconds).
   */
  get currentTime(): number {
    return this._audio ? this._audio.currentTime : 0
  }

  /**
   * Set the currently playback time.
   * @param value New playback time (Milliseconds).
   */
  set currentTime(value: number) {
    if (this._audio && 0 <= value && value <= this.duration) {
      this._audio.currentTime = value
    }
  }

  /**
   * Get the frequency spectrum of an audio.
   * @returns Spectrums If an audio during playback. Otherwise `null`.
   */
  get spectrums(): Uint8Array | null {
    if (
      this._audioSourceNode &&
      this._playbackState !== PlaybackState.Stopped
    ) {
      const spectrums = new Uint8Array(this._analyserNode.frequencyBinCount)
      this._analyserNode.getByteFrequencyData(spectrums)
      return spectrums
    }

    return null
  }

  /**
   * Get the audio volume.
   * @returns Volume, range: `0` to `100`.
   */
  get volume(): number {
    return this._gainNode.gain.value * 100
  }

  /**
   * Set the volume fro playback audio.
   * @param value New volume, range: `0` to `100`.
   */
  set volume(value: number) {
    if (0 <= value && value <= 100) {
      this._gainNode.gain.value = value / 100
    }
  }

  /**
   * Close the currently audio nodes and source.
   */
  close() {
    this.stop()

    this._audio = null
    this._audioSourceNode = null
  }

  /**
   * Open an audio file for playback target.
   * @param filePath Audio file path.
   * @param callback Callback function that occurs when load a file.
   */
  open(filePath: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.close()

      this._audio = new Audio(filePath)
      this._audio.addEventListener(
        'loadstart',
        () => {
          if (!this._audio) {
            return reject(new Error(`Can't load music file`))
          }

          this._audioSourceNode = this._context.createMediaElementSource(
            this._audio
          )
          this._audioSourceNode.connect(this._effectSourceNode)
          resolve()
        },
        { once: true }
      )
      this._audio.addEventListener(
        'error',
        (ev) => {
          reject(`Can't open music files, ${ev.message}`)
        },
        { once: true }
      )
    })
  }

  /**
   * Play the audio.
   * @returns Asynchronous task.
   */
  play(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this._audio || this._playbackState === PlaybackState.Playing) {
        return resolve()
      }

      this._audio
        .play()
        .then(() => {
          this._playbackState = PlaybackState.Playing
          resolve()
        })
        .catch((error) => reject(error))
    })
  }

  /**
   * Pause the currently playback audio.
   * @returns `true` on success.
   */
  pause(): boolean {
    if (!this._audio || this._playbackState !== PlaybackState.Playing) {
      return false
    }

    this._audio.pause()
    this._playbackState = PlaybackState.Paused
    return true
  }

  /**
   * Stop the currently playback audio.
   * @returns `true` on success.
   */
  stop() {
    if (!this._audio || this._playbackState === PlaybackState.Stopped) {
      return false
    }

    this._audio.pause()
    this._audio.currentTime = 0
    this._playbackState = PlaybackState.Stopped
    return true
  }

  /**
   * Update the graphic equalizer.
   * @param connect If true to connect the effector, Otherwise disconnect.
   * @param gains Gain values.
   */
  updateGraphicEqualizer(connect: boolean, gains: number[]) {
    this._effectEqualizer.gains = gains
    if (connect !== this._effectEqualizer.connected) {
      if (connect) {
        this._effectEqualizer.connect(this._effectSourceNode, this._effectNode)
      } else {
        this._effectEqualizer.disconnect()
        this._effectSourceNode.connect(this._effectNode)
      }
    }
  }
}

export default AudioPlayer
