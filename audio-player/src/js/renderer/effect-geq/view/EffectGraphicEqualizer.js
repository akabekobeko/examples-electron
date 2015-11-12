import React                     from 'react';
import { GraphicEqulizerParams } from '../../../common/Constants.js'

/**
 * Component for graphic equalizer window.
 */
export default class GraphicEqualizer extends React.Component {
  /**
   * Initialize instance.
   *
   * @param {Object} props Properties。
   */
  constructor( props ) {
    super( props );

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
    let frequecy = GraphicEqulizerParams.CenterFrequency;
    return this.props.context.effectGraphicEqualizerStore.gains.map( ( gain, index ) => {
      if( 0 < index ) {
        frequecy *= 2;
      }

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
            { this._frequecyToString( frequecy ) }
          </div>
        </div>
      );
    } );
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

  /**
   * Occurs when the Store of the state has been changed.
   */
  _onChange() {
    this.forceUpdate();
  }
}
