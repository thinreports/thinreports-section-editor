declare global {
  interface Window {
    electronAPI: IElectronAPI;
  }
}

export interface IElectronAPI {
  openSchemaFile: () => Promise<{ schema: string, filename: string } | undefined>;
  saveSchemaFile: (schema: string, filename: string) => Promise<void>;
  saveSchemaFileAs: (schema: string, filename?: string) => Promise<string | undefined>;
}
