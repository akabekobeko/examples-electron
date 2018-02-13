import { Store } from 'material-flux'
import { Keys } from '../action/EffectGraphicEqualizerAction.js'
import { IPCKeys, StorageKeys, GraphicEqulizerParams } from '../../../Constants.js'

/**
 * Preset number of the manual.
 * @type {Number}
 */
const PREST_INDEX_MANUAL = 0

/**
 * Manage for audio player.
 */
export default class EffectGraphicEqualizerStore extends Store {
  /**
   * Initialize instance.
   *
   * @param {EffectGraphicEqualizerContext} context Contect of the graphic equalizer.
   */
  constructor (context) {
    super(context)

    /**
     * Preset of graphic equalizer.
     * @type {GraphicEqualizerPreset[]}
     */
    this._presets = [
      { name: 'Manual', gains: [] },
      { name: 'Flat', gains: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
      { name: 'Acoustic', gains: [20, 20, 15, 5, 10, 10, 15, 15, 15, 10] },
      { name: 'Pops', gains: [-5, -5, 0, 5, 10, 10, 5, 5, 0, -5] },
      { name: 'Rock', gains: [20, 15, 10, 5, 0, -5, 0, 5, 10, 15] },
      { name: 'R&B', gains: [10, 25, 15, 5, -5, 0, 5, 5, 10, 15] },
      { name: 'Techno', gains: [15, 15, 10, 5, 0, 5, 0, 5, 10, 15] }
    ]

    /**
     * Preset names.
     * @type {String[]}
     */
    this._presetNames = this._presets.map((preset) => {
      return preset.name
    })

    /**
     * State of store.
     * @type {Object}
     */
    this.state = {
      connect: false,
      presetNumber: PREST_INDEX_MANUAL
    }

    this.register(Keys.connect, this._actionConnect)
    this.register(Keys.updateGain, this._actionUpdateGain)
    this.register(Keys.selectPreset, this._actionSelectPreset)

    this._load()
  }

  /**
   * Get the status of effector connection.
   *
   * @return {Boolean} "true" if is connected.
   */
  get connect () {
    return this.state.connect
  }

  /**
   * Get the gains of graphic equalizer.
   *
   * @return {Number[]} Gains.
   */
  get gains () {
    return this._presets[this.state.presetNumber].gains
  }

  /**
   * Get the index number of presets.
   *
   * @return {Number} Index number.
   */
  get presetNumber () {
    return this.state.presetNumber
  }

  /**
   * Get the preset names of graphic equalizer.
   *
   * @return {String[]} Presets.
   */
  get presetNames () {
    return this._presetNames
  }

  /**
   * Update the connection status of the effector.
   *
   * @param {Boolean} connect If true to connect the effector, Otherwise disconnect.
   */
  _actionConnect (connect) {
    this.setState({ connect: connect })
    this._save()
  }

  /**
   * Update the gain.
   *
   * @param {Number} index Index of the gains.
   * @param {Number} value New value.
   */
  _actionUpdateGain (index, value) {
    let gains = this._presets[ this.state.presetNumber ].gains
    if (this.state.presetNumber === PREST_INDEX_MANUAL) {
      gains[index] = value
      this.setState()
    } else {
      // Updated "Manual" based on the current preset
      gains = gains.concat()
      gains[index] = value
      this._presets[PREST_INDEX_MANUAL].gains = gains
      this.setState({ presetNumber: PREST_INDEX_MANUAL })
    }

    this._save()
    this._notifyUpdate()
  }

  /**
   * Select the preset.
   *
   * @param {Number} presetNumber Number of the new prest.
   */
  _actionSelectPreset (presetNumber) {
    this.setState({ presetNumber: presetNumber })

    this._save()
    this._notifyUpdate()
  }

  /**
   * Load the parameters of the graphic equalizer.
   */
  _load () {
    const params = this.context.localStorage.getItem(StorageKeys.GraphicEqulizerParams, true)
    if (params) {
      this._presets[PREST_INDEX_MANUAL].gains = params.gains
      this.setState({
        connect: params.connect,
        presetNumber: (params.preset === undefined ? PREST_INDEX_MANUAL : params.preset)
      })
    } else {
      // First launch
      for (let i = 0, max = GraphicEqulizerParams.Bands.length; i < max; ++i) {
        this._presets[PREST_INDEX_MANUAL].gains.push(GraphicEqulizerParams.GainFlat)
      }

      this.setState()
    }

    this._notifyUpdate()
  }

  /**
   * Save the parameters of the graphic equalizer.
   */
  _save () {
    const params = {
      connect: this.state.connect,
      gains: this._presets[PREST_INDEX_MANUAL].gains,
      preset: this.state.presetNumber
    }

    this.context.localStorage.setItem(StorageKeys.GraphicEqulizerParams, params, true)
    this._notifyUpdate()
  }

  /**
   * That the graphic equalizer has been updated it will notify the audio player.
   */
  _notifyUpdate () {
    this.context.ipc.send(
      IPCKeys.RequestUpdateGraphicEqualizer,
      this.state.connect,
      this._presets[this.state.presetNumber].gains
    )
  }
}
