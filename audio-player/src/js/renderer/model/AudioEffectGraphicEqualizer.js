
/**
 * The default number of bands equalizer.
 * @type {Number}
 */
const DEFAULT_EQUALIZER_BANDS = 10;

/**
 * Frequency of the central ( kHz ).
 * @type {Number}
 */
const CENTER_FREQUENCY = 31.25;

/**
 * The maximum value of the gain.
 * @type {Number}
 */
const MIN_GAIN = -40;

/**
 * The minimum value of the gain.
 * @type {Number}
 */
const MAX_GAIN = 40;

/**
 * Provides the graphic equalizer.
 */
export default class AudioEffectGraphicEqualizer {
  /**
   * Initialize instance.
   *
   * @param {AudioContext} context Web Audio context.
   * @param {Number}       bands   The number of bands of the equalizer, Default is 10 ( bands ).
   */
  constructor( context, bands = DEFAULT_EQUALYZER_BANDS ) {
    this._peakings = new Array( bands );

    // Initialize peakings
    this._peakings[ 0 ] = this._createPeakingFilter( context, CENTER_FREQUENCY );
    for( let i = 1, frequency = CENTER_FREQUENCY; i < bands; ++i, frequency *= 2 ) {
      this._peakings[ i ] = this._createPeakingFilter( context, frequency );
    }

    // Paekings chain
    for( let i = 0, max = bands - 1; i < max; ++i ) {
      this._peakings[ i ].connect( this._peakings[ i + 1 ] );
    }
  }

  /**
   * The maximum value of the gain.
   *
   * @return {Number} value.
   */
  static maxGain() {
    return MAX_GAIN;
  }

  /**
   * The minimum value of the gain.
   *
   * @return {Number} value.
   */
  static minGain() {
    return MIN_GAIN;
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
      if( MIN_GAIN <= value && value <= MAX_GAIN ) {
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
