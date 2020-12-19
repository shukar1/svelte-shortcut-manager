declare module '@shuk/shortcut-manager' {
  
  export type KeyCode = {
    [prop: string]: {
      code: string | string[];
      symbol: string;
    }
  }
  
  export interface IShortcut {
    title: string;
    sequence: KeyCode[];
    fn: () => void;
    escaped?: () => boolean;
  }
}

