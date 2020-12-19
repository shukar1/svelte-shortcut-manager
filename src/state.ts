import cloneDeep from 'lodash.clonedeep';
import { writable } from 'svelte/store';

export function createStore(state) {
  let initialStateBackUp = cloneDeep(state);
  
  const { subscribe, set: _set } = writable(state);
  
  function update(fn) {
    set(fn(state));
  }
  
  function set(st) {
    _set(state = st);
  }
  
  function reset() {
    set(cloneDeep(initialStateBackUp));
  }
  
  return {
    subscribe,
    set,
    update,
    reset
  };
  
}


export const state = createStore([]);

