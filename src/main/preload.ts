import { contextBridge, ipcRenderer } from 'electron';

const validChannels = ['ipc-example', 'install'];

contextBridge.exposeInMainWorld('electron', {
  ipcRenderer: {
    send: (channel, data) => {
      if (validChannels.includes(channel)) {
        ipcRenderer.send(channel, data);
      }
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    on(channel: string, func: (...args: any[]) => void) {
      if (validChannels.includes(channel)) {
        // Deliberately strip event as it includes `sender`
        ipcRenderer.on(channel, (_event, ...args) => func(...args));
      }
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    once(channel: string, func: (...args: any[]) => void) {
      if (validChannels.includes(channel)) {
        // Deliberately strip event as it includes `sender`
        ipcRenderer.once(channel, (_event, ...args) => func(...args));
      }
    },
  },
});
