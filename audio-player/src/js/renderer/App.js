import MainWindowContext from './main/MainWindowContext.js';

// Compile switch
global.DEBUG = true;

let context = null;

window.onload = () => {
  const area = document.querySelector( '.app' );
  if( !( area ) ) { return; }

  context = new MainWindowContext( area );
};
