/**
 * Provides the graphic equalizer.
 */
export default class AudioEffectGraphicEqualizer {
  /**
   * Initialize instance.
   *
   * @param {AudioContext}   context Web Audio context.
   * @param {Number}         gainMin The minimum value of the gain.
   * @param {Number}         gainMax The maximum value of the gain.
   * @param {Array.<Number>} bands   Frequency band collection of equalizer.
   */
  constructor( context, gainMin, gainMax, bands ) {
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

    /**
     * Value indicating that it is connected.
     * @type {Boolean}
     */
    this._connected = false;

    this._setupPeakings( context, bands );
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
    if( this._connected ) { return; }
    this._connected = true;

    input.connect( this._peakings[ 0 ] );
    this._peakings[ this._peakings.length - 1 ].connect( output );
  }

  /**
   * Disconnect the effector from the node.
   */
  disconnect() {
    if( !( this._connected ) ) { return; }
    this._connected = false;

    // Input chain
    this._peakings[ 0 ].disconnect();
    this._peakings[ 0 ].connect( this._peakings[ 1 ] );

    // Output chain
    const last = this._peakings.length - 1;
    this._peakings[ last ].disconnect();
    this._peakings[ last - 1 ].connect( this._peakings[ last ] );
  }

  /**
   * Setup the peakings.
   *
   * @param {AudioContext}   context Web Audio context.
   * @param {Array.<Number>} bands   Frequency band collection of equalizer.
   */
  _setupPeakings( context, bands ) {
    this._peakings = new Array( bands.length );
    for( let i = 0, max = bands.length; i < max; ++i ) {
      this._peakings[ i ] = this._createPeakingFilter( context, bands[ i ] );
    }

    // Paekings chain ( 0-1, 1-2, ...N )
    for( let i = 0, max = bands.length - 1; i < max; ++i ) {
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
