/**
 * Create the peaking filter.
 * @param context Web Audio context.
 * @param frequency The number of frequency (kHz).
 * @returns Peeking filter.
 */
const createPeakingFilter = (
  context: AudioContext,
  frequency: number
): BiquadFilterNode => {
  const peaking = context.createBiquadFilter()
  peaking.type = 'peaking'
  peaking.frequency.value = frequency
  peaking.Q.value = 2
  peaking.gain.value = 0

  return peaking
}

/**
 * Create the peakings.
 * @param context Web Audio context.
 * @param bands Frequency band collection of equalizer.
 * @returns Created peakings.
 */
const createPeakings = (
  context: AudioContext,
  bands: number[]
): BiquadFilterNode[] => {
  const peakings = new Array<BiquadFilterNode>(bands.length)
  bands.forEach((band, index) => {
    peakings[index] = createPeakingFilter(context, band)
  })

  // Chain paekings (0-1, 1-2, ...N)
  for (let index = 0, max = peakings.length - 1; index < max; ++index) {
    peakings[index].connect(peakings[index + 1])
  }

  return peakings
}

/**
 * Provides the graphic equalizer.
 */
class EffectEqualizer {
  /** Value indicating that it is connected. */
  private _connected: boolean

  /** Peakings. */
  private _peakings: BiquadFilterNode[]

  /** Minimum value of the gain. */
  private readonly _min: number

  /** Maximum value of the gain. */
  private readonly _max: number

  /**
   * Initialize instance.
   * @param context Web Audio context.
   * @param bands Frequency band collection of equalizer.
   * @param min Minimum value of the gain.
   * @param max Maximum value of the gain.
   */
  constructor(
    context: AudioContext,
    bands: number[],
    min: number,
    max: number
  ) {
    this._connected = false
    this._peakings = createPeakings(context, bands)
    this._min = min
    this._max = max
  }

  /**
   * Get connection status.
   * @returns connection status.
   */
  get connected(): boolean {
    return this._connected
  }
  /**
   * Get the gains values.
   * @returns Gain values.
   */
  get gains(): number[] {
    return this._peakings.map((peaking) => peaking.gain.value)
  }

  /**
   * Set the gain values.
   * @param values Gain values.
   */
  set gains(values: number[]) {
    if (!(values && values.length === this._peakings.length)) {
      return
    }

    values.forEach((value, index) => {
      if (this._min <= value && value <= this._max) {
        this._peakings[index].gain.value = value
      }
    })
  }

  /**
   * Connect the effector to the node.
   *
   * @param {AudioNode} input Input node.
   * @param {AudioNode} output Output node.
   */
  connect(input: AudioNode, output: AudioNode) {
    if (this._connected) {
      return
    }

    this._connected = true

    // Connect top and end
    input.connect(this._peakings[0])
    this._peakings[this._peakings.length - 1].connect(output)
  }

  /**
   * Disconnect the effector from the node.
   */
  disconnect() {
    if (!this._connected) {
      return
    }

    this._connected = false

    // Input chain
    this._peakings[0].disconnect()
    this._peakings[0].connect(this._peakings[1])

    // Output chain
    const last = this._peakings.length - 1
    this._peakings[last].disconnect()
    this._peakings[last - 1].connect(this._peakings[last])
  }
}

export default EffectEqualizer
