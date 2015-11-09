
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
  constructor() {
    /**
     * Audio context.
     * @type {AudioContext|webkitAudioContext}
     */
    this._context = ( () => {
      const audioContext = ( window.AudioContext || window.webkitAudioContext );
      if( audioContext ) { return new audioContext(); }

      throw new Error( 'Web Audio API is not supported.' );
    } )();

    /**
     * Audio element.
     * @type {Audio}
     */
    this._audio = null;

    /**
     * Node for audio source。
     * @type {MediaElementAudioSourceNode}
     */
    this._sourceNode = null;

    /**
     * Node for audio volume adjustment.
     * @type {GainNode}
     */
    this._gainNode = this._context.createGain();
    this._gainNode.gain.value = 1.0;
    this._gainNode.connect( this._context.destination );

    /**
     * Node for audio analyze.
     * @type {AnalyserNode}
     */
    this._analyserNode = this._context.createAnalyser();
    this._analyserNode.fftSize = 64;
    this._analyserNode.connect( this._gainNode );

    /**
     * Indicates that the audio is playing.
     * @type {Boolean}
     */
    this._isPlaying = false;
  }

  /**
   * Get an audio duration.
   *
   * @return {Number} duration.
   */
  get duration() {
    return ( this._audio ? this._audio.duration : 0 );
  }

  /**
   * Get the currently playback time.
   *
   * @return {Number} playback time ( milliseconds ).
   */
  get currentTime() {
    return ( this._audio ? this._audio.currentTime : 0 );
  }

  /**
   * Set the currently playback time.
   *
   * @param {Number} playback time ( milliseconds ).
   */
  set currentTime( value ) {
    if( value === undefined || !( this._audio ) ) { return; }

    const currentTime = Number( value );
    if( currentTime < 0 || this.duration < currentTime ) {
      return;
    }

    this._audio.currentTime = currentTime;
  }

  /**
   * Get the frequency spectrum of an audio.
   *
   * @return {Uint8Array} Spectrums If an audio during playback. Otherwise null.
   */
  get spectrums() {
    if( !( this._sourceNode && this._isPlaying ) ) { return null; }

    const spectrums = new Uint8Array( this._analyserNode.frequencyBinCount );
    this._analyserNode.getByteFrequencyData( spectrums );

    return spectrums;
  }

  /**
   * Get the audio volume.
   *
   * @return {Number} volume ( range: 0 - 100 ).
   */
  get volume() {
    return ( this._gainNode.gain.value * 100 );
  }

  /**
   * Set the volume fro playback audio.
   *
   * @param {Number} value New volume ( range: 0 - 100 ).
   */
  set volume( value ) {
    if( 0 <= value && value <= 100 ) {
      this._gainNode.gain.value = ( value / 100 );
    }
  }

  /**
   * Close the currently audio nodes and source.
   */
  close() {
    this.stop();

    this._audio      = null;
    this._sourceNode = null;
  }

  /**
   * Open an audio file for playback target.
   *
   * @param {String}   filePath Audio file path.
   * @param {Function} callback Callback function that occurs when load a file.
   */
  open( filePath, callback ) {
    this.close();

    this._audio = new Audio( filePath );
    this._audio.addEventListener( 'loadstart', () => {
      this._sourceNode = this._context.createMediaElementSource( this._audio );
      this._sourceNode.connect( this._analyserNode );
      callback();
    } );
  }

  /**
   * Play the audio.
   */
  play() {
    if( !( this._audio ) || this._isPlaying ) { return; }

    this._audio.play();
    this._isPlaying = true;
  }

  /**
   * Pause the currently playback audio.
   */
  pause() {
    if( !( this._audio && this._isPlaying ) ) { return; }

    this._audio.pause();
    this._isPlaying = false;
  }

  /**
   * Stop the currently playback audio.
   */
  stop() {
    if( !( this._sourceNode && this._isPlaying ) ) { return; }

    this._audio.pause();
    this._audio.currentTime = 0;
    this._isPlaying = false;
  }
}
