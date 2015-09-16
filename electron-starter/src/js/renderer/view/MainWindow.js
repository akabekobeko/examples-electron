import React from 'react/dist/react';

/**
 * メイン ウィンドウとなるクラスです。
 */
export default class MainWindow extends React.Component {
  /**
   * コンポーネントを描画します。
   *
   * @return {ReactElement} 描画情報。
   */
  render() {
    return (
      <div>
        <div>Toolbar</div>
      </div>
    );
  }

  /**
   * メイン ウィンドウを構築します。
   */
  static setup( context ) {
    const area = document.querySelector( '.app' );
    if( !( area ) ) { return; }

    React.render( <MainWindow context={ context } />, area );
  }
}
