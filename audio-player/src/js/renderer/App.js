import MainWindow  from './main/view/MainWindow.js';
import MainContext from './main/MainContext.js';

// Compile switch
global.DEBUG = true;

window.onload = () => {
  const context = new MainContext();
  MainWindow.setup( context );
};
