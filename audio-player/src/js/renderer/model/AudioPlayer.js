
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
    this._analyserNode.fftSize = 128;
    this._analyserNode.connect( this._gainNode );

    /**
     * Indicates that the audio is playing.
     * @type {Boolean}
     */
    this._isPlaying = false;

    /**
     * Audio data duration.
     * @type {Number}
     */
    this._duration = 0;

    /**
     * Playback time.
     * @type {Number}
     */
    this._playbackTime = 0;

    /**
     * Save the time that you start playback for pause.
     * Position it is calculated in "Now - Start" to restore the playback.
     * @type {Number}
     */
    this._startTimestamp = 0;
  }

  /**
   * Get an audio duration.
   *
   * @return {Number} duration.
   */
  get duration() {
    return this._duration;
  }

  /**
   * Get the currently playback time.
   *
   * @return {Number} playback time ( milliseconds ).
   */
  get playbackTime() {
    return this._playbackTime;
  }

  /**
   * Set the currently playback time.
   *
   * @param {Number} playback time ( milliseconds ).
   */
  set playbackTime( value ) {
    if( value === undefined ) { return; }

    const playbacktime = Number( value );
    if( playbacktime < 0 || this.duration < playbacktime ) {
      return;
    }

    if( this._isPlaying ) {
      this.pause();
      this._playbackTime = playbacktime;
      this.play();
    } else {
      this._playbackTime = playbacktime;
    }
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

    this._playbackTime   = 0;
    this._startTimestamp = 0;
    this._sourceNode     = null;
  }

  /**
   * Open an audio file for playback target.
   *
   * @param {String}   filePath Audio file path.
   * @param {Function} callback Callback function that occurs when load a file.
   */
  open( filePath, callback ) {
    this.close();

    const audio = new Audio( filePath );
    audio.addEventListener( 'loadstart', () => {
      this._duration = Math.round( audio.duration );

      this._source = this._context.createMediaElementSource( audio );
      this._sourceNode.connect( this._analyserNode );
      callback();
    } );
  }

  /**
   * Play the audio.
   */
  play() {
    if( !( this._sourceNode ) || this._isPlaying ) { return; }

    this._sourceNode.start( 0, this._playbackTime );
    this._startTimestamp = Date.now();
    this._isPlaying      = true;
  }

  /**
   * Pause the currently playback audio.
   */
  pause() {
    if( !( this._sourceNode && this._isPlaying ) ) { return; }

    this._sourceNode.stop();
    this._playbackTime = ( Math.round( ( Date.now() - this._startTimestamp ) / 1000 ) + this._playbackTime );
    this._isPlaying    = false;
  }

  /**
   * Stop the currently playback audio.
   */
  stop() {
    if( !( this._sourceNode && this._isPlaying ) ) { return; }

    this._sourceNode.stop();
    this._startTimestamp = 0;
    this._playbackTime   = 0;
    this._isPlaying      = false;
  }
}
