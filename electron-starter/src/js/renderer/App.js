import MainWindow from './view/MainWindow.js';
import AppContext from './AppContext.js';

// Compile switch
global.DEBUG = true;

window.onload = () => {
  const context = new AppContext();
  MainWindow.setup( context );
};
