import { render } from 'react-dom';
import React from 'react';
import App from './App';

render(<App />, document.getElementById('root'));

// calling IPC exposed from preload script
window.electron.ipcRenderer.once('ipc-example', (arg) => {
  // eslint-disable-next-line no-console
  console.log(arg);
});

// window.electron.ipcRenderer.once('install', (arg) => {
//   // eslint-disable-next-line no-console
//   console.log("In index.tsx - install");
//   console.log(arg);
// });
window.electron.ipcRenderer.send('ipc-example', 'ping');
// window.electron.ipcRenderer.send('install', 'hello new api');

