import React                     from 'react';
import { GraphicEqulizerParams } from '../../../common/Constants.js'
import OnOffSwitch               from '../../common/controls/OnOffSwitch.js';
import SelectBox                 from '../../common/controls/SelectBox.js';

/**
 * Component for graphic equalizer window.
 */
export default class EffectGraphicEqualizer extends React.Component {
  /**
   * Initialize instance.
   *
   * @param {Object} props Properties。
   */
  constructor( props ) {
    super( props );

    /**
     * State of component.
     * @type {Object}
     */
    this.state = {
      presets: this.props.context.effectGraphicEqualizerStore.presets.map( ( preset ) => {
        return preset.name;
      } )
    }

    /**
     * Function to watch the change of Store.
     * @type {Function}
     */
    this._onChangeBind = this._onChange.bind( this );
  }

  /**
   * Occurs when the component is mount.
   */
  componentDidMount() {
    this.props.context.effectGraphicEqualizerStore.onChange( this._onChangeBind );
  }

  /**
   * Occurs when the component is unmount.
   */
  componentWillUnmount() {
    this.props.context.effectGraphicEqualizerStore.removeChangeListener( this._onChangeBind );
  }

  /**
   * Render for component.
   *
   * @return {ReactElement} Rendering data.
   */
  render() {
    return (
      <div className="effect-graphic-equalizer">
        <div className="effect-graphic-equalizer__header">
          <div className="effect-graphic-equalizer__header__presets">
            <SelectBox
              options={ this.state.presets }
              selectedValue={ this.props.context.effectGraphicEqualizerStore.preset } />
          </div>
          <div className="effect-graphic-equalizer__header__connect">
            <OnOffSwitch
              checked={ this.props.context.effectGraphicEqualizerStore.connect }
              onChange={ this._onChangeConncectSwitch.bind( this ) } />
          </div>
        </div>
        <div className="effect-graphic-equalizer__gain">
        { this._renderGains() }
        </div>
      </div>
    );
  }

  /**
   * Render for gain sliders.
   *
   * @return {Array.<ReactElement>} Rendering data.
   */
  _renderGains() {
    return this.props.context.effectGraphicEqualizerStore.gains.map( ( gain, index ) => {
      return (
        <div key={ index }>
          <input
            className="effect-graphic-equalizer__gain__slider"
            style={ { left: -84 + ( index * 31 ) } }
            type="range"
            value={ gain }
            min={ GraphicEqulizerParams.GainMin }
            max={ GraphicEqulizerParams.GainMax }
            step="10"
            onChange={ ( ev ) => {
              this.props.context.effectGraphicEqualizerAction.update( index, ev.target.value );
            } } />
          <div
            className="effect-graphic-equalizer__gain__frequecy"
            style={ { left: ( index * 32 ) + 5 } }>
            { this._frequecyToString( GraphicEqulizerParams.Bands[ index ] ) }
          </div>
        </div>
      );
    } );
  }

  /**
   * Occurs when the connection switch is changed.
   *
   * @param {Boolean} frequecy Frequecy.
   */
  _onChangeConncectSwitch( connect ) {
    this.props.context.effectGraphicEqualizerAction.connect( connect );
  }

  /**
   * Occurs when the Store of the state has been changed.
   */
  _onChange() {
    this.forceUpdate();
  }

  /**
   * Convert a frequency to string.
   *
   * @param {Number} frequecy Frequecy.
   *
   * @return {String} Converted string.
   */
  _frequecyToString( frequecy ) {
    if( 1000 <= frequecy ) {
      const value = frequecy / 1000;
      return value + 'K';
    }

    return String( frequecy );
  }
}
