const { contextBridge } = require("electron");
contextBridge.exposeInMainWorld("appApi", {
  ping: () => "pong"
});
