import MainWindow from './view/MainWindow.js';
import AppContext from './AppContext.js';

window.onload = () => {
  const context = new AppContext();
  MainWindow.setup( context );
};
