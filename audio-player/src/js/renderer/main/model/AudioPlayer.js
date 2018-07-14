import AudioEffectGraphicEqualizer from './AudioEffectGraphicEqualizer.js'
import { GraphicEqulizerParams, IPCKeys }   from '../../../Constants.js'
import * as MimeTypes from 'mime-types'
import * as dataurl from 'dataurl'

const AppAudioContext = (window.AudioContext || window.webkitAudioContext)

/**
 * Provides audio playback function.
 *
 * @see referred: http://github.com/eipark/buffaudio
 *
 * @throws {Error} Web Audio API is undefined.
 */
export default class AudioPlayer {
  /**
   * Initliaze instance.
   */
  constructor (ipc) {
    /**
     * Manage the IPC of the renderer process.
     * @type {RendererIPC}
     */
    this._ipc = ipc

    /**
     * Audio context.
     * @type {AudioContext|webkitAudioContext}
     */
    this._audioContext = (() => {
      if (AppAudioContext) {
        return new AppAudioContext()
      }

      throw new Error('Web Audio API is not supported.')
    })()

    /**
     * Audio element.
     * @type {Audio}
     */
    this._audio = null

    /**
     * Node for audio source。
     * @type {MediaElementAudioSourceNode}
     */
    this._sourceNode = null

    /**
     * Node for audio volume adjustment.
     * @type {GainNode}
     */
    this._gainNode = this._audioContext.createGain()
    this._gainNode.gain.value = 1.0
    this._gainNode.connect(this._audioContext.destination)

    /**
     * Node for audio analyze.
     * @type {AnalyserNode}
     */
    this._analyserNode = this._audioContext.createAnalyser()
    this._analyserNode.fftSize = 64
    this._analyserNode.connect(this._gainNode)

    /**
     * Node for effector
     * @type {GainNode}
     */
    this._effectNode = this._audioContext.createGain()
    this._effectNode.gain.value = 1.0
    this._effectNode.connect(this._analyserNode)

    /**
     * Node that connects the source and the effector.
     * @type {GainNode}
     */
    this._sourceEffectNode = this._audioContext.createGain()
    this._sourceEffectNode.gain.value = 1.0
    this._sourceEffectNode.connect(this._effectNode)

    /**
     * Indicates that the audio is playing.
     * @type {Boolean}
     */
    this._isPlaying = false

    /**
     * Effect of the graphic equalizer.
     * @type {AudioEffectGraphicEqualizer}
     */
    this._effectGraphicEqualizer = new AudioEffectGraphicEqualizer(
      this._audioContext,
      GraphicEqulizerParams.GainMin,
      GraphicEqulizerParams.GainMax,
      GraphicEqulizerParams.Bands)

    this._ipc.on(IPCKeys.FinishReadAudioFile, this._onFinishReadAudioFile.bind(this))
  }

  /**
   * Get an audio duration.
   *
   * @return {Number} duration.
   */
  get duration () {
    return (this._audio ? this._audio.duration : 0)
  }

  /**
   * Get the currently playback time.
   *
   * @return {Number} playback time (milliseconds).
   */
  get currentTime () {
    return (this._audio ? this._audio.currentTime : 0)
  }

  /**
   * Set the currently playback time.
   *
   * @param {Number} playback time (milliseconds).
   */
  set currentTime (value) {
    if (value === undefined || !(this._audio)) {
      return
    }

    const currentTime = Number(value)
    if (currentTime < 0 || this.duration < currentTime) {
      return
    }

    this._audio.currentTime = currentTime
  }

  /**
   * Get the frequency spectrum of an audio.
   *
   * @return {Uint8Array} Spectrums If an audio during playback. Otherwise null.
   */
  get spectrums () {
    if (!(this._sourceNode && this._isPlaying)) {
      return null
    }

    const spectrums = new Uint8Array(this._analyserNode.frequencyBinCount)
    this._analyserNode.getByteFrequencyData(spectrums)

    return spectrums
  }

  /**
   * Get the audio volume.
   *
   * @return {Number} Volume (range: 0 - 100).
   */
  get volume () {
    return (this._gainNode.gain.value * 100)
  }

  /**
   * Set the volume fro playback audio.
   *
   * @param {Number} value New volume (range: 0 - 100).
   */
  set volume (value) {
    if (0 <= value && value <= 100) {
      this._gainNode.gain.value = (value / 100)
    }
  }

  /**
   * Close the currently audio nodes and source.
   */
  close () {
    this.stop()

    this._audio      = null
    this._sourceNode = null
  }

  /**
   * Open an audio file for playback target.
   *
   * @param {String} filePath Audio file path.
   * @param {Function} callback Callback function that occurs when load a file.
   */
  open (filePath, callback) {
    this.close()

    console.log('Open: %s....', filePath)

    this._audio = new window.Audio()
    this._audio.crossOrigin = 'anonymous'
    this._audio.addEventListener('loadstart', () => {
      console.log('Audio-element: loadstart')
      this._sourceNode = this._audioContext.createMediaElementSource(this._audio)
      this._sourceNode.connect(this._sourceEffectNode)
      console.log('Audio-element: loadstart callback()')
      callback()
    })
    this._ipc.send(IPCKeys.RequestReadAudioFile, filePath)
  }

  _onFinishReadAudioFile (ev, err, audioFile) {
    if (err) {
      console.error(err.message)
      return
    }

    const mimetype = MimeTypes.lookup(audioFile.path)
    console.log('Loaded audio file %s, type=%s', audioFile.path, mimetype)

    const audioUrl = dataurl.convert({ data: audioFile.data, mimetype })
    this._audio.src = audioUrl

    this._audio.addEventListener('error', () => {
      console.error('Error playing audio track: ' + audioFile.path)
    })
  }

  /**
   * Play the audio.
   */
  play () {
    console.log('play')
    if (!(this._audio) || this._isPlaying) {
      return
    }

    this._audio.play()
    this._isPlaying = true
  }

  /**
   * Pause the currently playback audio.
   */
  pause () {
    if (!(this._audio && this._isPlaying)) {
      return
    }

    this._audio.pause()
    this._isPlaying = false
  }

  /**
   * Stop the currently playback audio.
   */
  stop () {
    if (!(this._sourceNode && this._isPlaying)) {
      return
    }

    this._audio.pause()
    this._audio.currentTime = 0
    this._isPlaying = false
  }

  /**
   * Update the graphic equalizer.
   *
   * @param {Boolean} connect If true to connect the effector, Otherwise disconnect.
   * @param {Number[]} gains   Gain values.
   */
  updateGraphicEqualizer (connect, gains) {
    this._effectGraphicEqualizer.gains = gains
    if (connect !== this._connected) {
      if (connect) {
        this._effectGraphicEqualizer.connect(this._sourceEffectNode, this._effectNode)
      } else {
        this._effectGraphicEqualizer.disconnect()
        this._sourceEffectNode.connect(this._effectNode)
      }
    }
  }
}
