#### 0.0.3 (2020-12-14)

- Permanent shortcuts and Scoped shortcuts
  - Permanents are added to the `<Shortcut/>` component
  - Scoped are added to the relevant node. ex: `div use:shortcut={[...]}`
    
- Escape a shortcut if it is not relevant although the element is focused: `escaped: () => boolean;`
- Shortcut.Title can be a function
