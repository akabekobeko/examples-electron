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
}
