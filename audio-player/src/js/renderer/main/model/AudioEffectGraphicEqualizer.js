/**
 * Provides the graphic equalizer.
 */
export default class AudioEffectGraphicEqualizer {
  /**
   * Initialize instance.
   *
   * @param {AudioContext} context         Web Audio context.
   * @param {Number}       gainMin         The minimum value of the gain.
   * @param {Number}       gainMax         The maximum value of the gain.
   * @param {Number}       centerFrequency Frequency of the central ( kHz ).
   * @param {Number}       bands           The number of bands of the equalizer.
   */
  constructor( context, gainMin, gainMax, centerFrequency, bands ) {
    /**
     * The minimum value of the gain.
     * @type {Number}
     */
    this._gainMin = gainMin;

    /**
     * The maximum value of the gain.
     * @type {Number}
     */
    this._gainMax = gainMax;

    /**
     * Peakings.
     * @type {Array.<BiquadFilterNode>}
     */
    this._peakings = null;

    this._setupPeakings( centerFrequency, bands );
  }

  /**
   * Get the gains values.
   *
   * @return {Array.<Number>} Gain values.
   */
  get gains() {
    const gains = new Array( this._peakings.length );
    this._peakings.forEach( ( peaking, index ) => {
      gains[ index ] = peaking.gain.value;
    } );

    return gains;
  }

  /**
   * Set the gain values.
   *
   * @return {Array.<Number>} values Gain values.
   */
  set gains( values ) {
    if( !( values && values.length === this._peakings.length ) ) { return; }

    values.forEach( ( value, index ) => {
      if( this._gainMin <= value && value <= this._gainMax ) {
        this._peakings[ index ].gain.value = value;
      }
    } );
  }

  /**
   * Connect the effector to the node.
   *
   * @param {AudioNode} input  Input node.
   * @param {AudioNode} output Output node.
   */
  connect( input, output ) {
    input.connect( this._peakings[ 0 ] );
    this._peakings[ this._peakings.length - 1 ].connect( output );
  }

  /**
   * Disconnect the effector from the node.
   */
  disconnect() {
    this._peakings[ 0 ].disconnect();
    this._peakings[ this._peakings.length - 1 ].disconnect();
  }

  /**
   * Setup the peakings.
   *
   * @param {Number} centerFrequency Frequency of the central ( kHz ).
   * @param {Number} bands           The number of bands of the equalizer.
   */
  _setupPeakings( centerFrequency, bands ) {
    this._peakings = new Array( bands );

    this._peakings[ 0 ] = this._createPeakingFilter( context, centerFrequency );
    for( let i = 1, frequency = centerFrequency; i < bands; ++i, frequency *= 2 ) {
      this._peakings[ i ] = this._createPeakingFilter( context, frequency );
    }

    // Paekings chain
    for( let i = 0, max = bands - 1; i < max; ++i ) {
      this._peakings[ i ].connect( this._peakings[ i + 1 ] );
    }
  }

  /**
   * Create the peaking filter.
   *
   * @param {AudioContext} context   Web Audio context.
   * @param {Number}       frequency The number of frequency ( kHz ).
   *
   * @return {BiquadFilterNode} Peeking filter.
   */
  _createPeakingFilter( context, frequency ) {
    const peaking = context.createBiquadFilter();
    peaking.type            = 'peaking';
    peaking.frequency.value = frequency;
    peaking.Q.value         = 2;
    peaking.gain.value      = 0;

    return peaking;
  }
}
