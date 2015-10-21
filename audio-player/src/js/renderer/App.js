import MainWindow from './view/MainWindow.js';
import AppContext from './AppContext.js';

// Compile switch
global.DEBUG = true;

window.onload = () => {
  const context = new AppContext();
  context.setup( () => {
    MainWindow.setup( context );
  } );
};
