# [Svelte](https://svelte.dev) Key Sequence Capture

## [Demo](https://svelte-shortcut-manager.surge.sh/)

`npm i svelte-key-sequence-capturer`

## Types

```
type KeyCode = {
    [prop: string]: {
        code: string | string[];
        symbol: string;            
    }
}

interface Shortcut {
    title: string | () => string;
    sequence: KeyCode[];
    fn: () => void;
    escaped?: () => boolean;
}
```

## API

### Inputs:
```
permanents: Shortcut[];
helper: boolean // show window
strict: boolean // show window only if a key is pressed
```

### A pre-made `Keys` lib is also exported

## Future

- Usage based attaching/detaching of scoped shortcuts
