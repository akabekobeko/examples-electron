import React from 'react';

/**
 * Component for On/Off switch control.
 */
export default class OnOffSwitch extends React.Component {
  /**
   * Render for component.
   *
   * @return {ReactElement} Rendering data.
   */
  render() {
    return (
      <div
        className="onoffswitch"
        onClick={ this._onClick.bind( this ) }>
        <input
          id="onoffswitch"
          name="onoffswitch"
          className="onoffswitch__checkbox"
          type="checkbox"
          checked={ this.props.checked }
          onChange={ this._onChange.bind( this ) } />
        <label
          className="onoffswitch__label" />
      </div>
    );
  }

  /**
   * Occurs when the switch is clicked.
   */
  _onClick() {
    const checked = !( this.props.checked );
    if( this.props.onChange ) {
      this.props.onChange( checked );
    }
  }

  /**
   * Occurs when the switch is changed.
   * Also it required onChange If you want to specify a checked in checkbox.
   * However checkbox this function be changed is not called.
   */
  _onChange() {
    // Dummy
  }
}
