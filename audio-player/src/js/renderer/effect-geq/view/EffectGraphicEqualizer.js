import React from 'react';

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
      </div>
    );
  }

  /**
   * Occurs when the Store of the state has been changed.
   */
  _onChange() {
    this.forceUpdate();
  }
}
