import { state } from './state';

export function registerShortcuts(node, shortcuts) {
  
  function onFocus() {
    state.set(shortcuts);
    node.addEventListener('blur', onBlur);
  }
  
  function onBlur() {
    state.reset();
    node.removeEventListener('blur', onBlur);
  }
  
  node.addEventListener('focus', onFocus);
  return {
    destroy() {
      node.removeEventListener('focus', onFocus);
      onBlur();
    }
  };
}
