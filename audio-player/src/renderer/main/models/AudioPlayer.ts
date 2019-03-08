import { GraphicEqulizerParams as GEQ } from '../../Constants'
import EffectEqualizer from './EffectEqualizer'

/**
 * Provides audio playback function.
 * @see referred: http://github.com/eipark/buffaudio
 */
class AudioPlayer {
  /** Audio context. */
  private _context: AudioContext = new AudioContext()

  /** Node for audio volume adjustment. */
  private _gainNode: GainNode = this._context.createGain()

  /** Node for audio analyze. */
  private _analyserNode: AnalyserNode = this._context.createAnalyser()

  /** Node for effector. */
  private _effectNode: GainNode = this._context.createGain()

  /**  Node that connects the source and the effector. */
  private _effectSourceNode: GainNode = this._context.createGain()

  /** Audio element. */
  private _audio: HTMLAudioElement | null = null

  /** Node for audio source. */
  private _audioSourceNode: MediaElementAudioSourceNode | null = null

  /** Indicates that the audio is playing. */
  private _isPlaying = false

  /** Effect of the graphic equalizer. */
  private _effectEqualizer: EffectEqualizer

  /**
   * Initliaze instance.
   */
  constructor() {
    this._gainNode.gain.value = 1.0
    this._gainNode.connect(this._context.destination)

    this._analyserNode.fftSize = 64
    this._analyserNode.connect(this._gainNode)

    this._effectNode.gain.value = 1.0
    this._effectNode.connect(this._analyserNode)

    this._effectSourceNode.gain.value = 1.0
    this._effectSourceNode.connect(this._effectNode)

    this._effectEqualizer = new EffectEqualizer(
      this._context,
      GEQ.Bands,
      GEQ.GainMin,
      GEQ.GainMax
    )
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
   * @returns Spectrums If an audio during playback. Otherwise null.
   */
  get spectrums(): Uint8Array | null {
    if (this._audioSourceNode && this._isPlaying) {
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
  open(filePath: string, callback: () => void) {
    this.close()

    this._audio = new Audio(filePath)
    this._audio.addEventListener('loadstart', () => {
      this._audioSourceNode = this._context.createMediaElementSource(
        this._audio!
      )
      this._audioSourceNode.connect(this._effectSourceNode)
      callback()
    })
  }

  /**
   * Play the audio.
   */
  play() {
    if (!this._audio || this._isPlaying) {
      return
    }

    this._audio.play()
    this._isPlaying = true
  }

  /**
   * Pause the currently playback audio.
   */
  pause() {
    if (!(this._audio && this._isPlaying)) {
      return
    }

    this._audio.pause()
    this._isPlaying = false
  }

  /**
   * Stop the currently playback audio.
   */
  stop() {
    if (!(this._audio && this._audioSourceNode && this._isPlaying)) {
      return
    }

    this._audio.pause()
    this._audio.currentTime = 0
    this._isPlaying = false
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
