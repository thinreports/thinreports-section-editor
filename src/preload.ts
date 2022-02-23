import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
  openSchemaFile: () => ipcRenderer.invoke('open-schema-file'),
  saveSchemaFile: (schema: string, filename: string) => ipcRenderer.invoke('save-schema-file', schema, filename),
  saveSchemaFileAs: (schema: string, filename?: string) => ipcRenderer.invoke('save-schema-file-as', schema, filename)
});
