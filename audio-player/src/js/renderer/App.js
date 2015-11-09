import MainContext from './main/MainContext.js';

// Compile switch
global.DEBUG = true;

let context = null;

window.onload = () => {
  const area = document.querySelector( '.app' );
  if( !( area ) ) { return; }

  context = new MainContext( area );
};
