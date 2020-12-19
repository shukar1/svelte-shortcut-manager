<script lang='ts' context='module'>

  
  export function keySequence(node) {
    let keys = [];
    
    function onKeyDown(event) {
      if (!(event.target instanceof HTMLInputElement)) {
        event.preventDefault();
      }
      
      if (!keys.includes(event.code)) {
        keys.push(event.code);
        node.dispatchEvent(new CustomEvent('sequence', {
          detail: {
            keys
          }
        }));
      }
    }
    
    function onKeyUp() {
      if (!keys.length) return;
      node.dispatchEvent(new CustomEvent('sequence', {
        detail: {
          final: true,
          keys
        }
      }));
      keys = [];
    }
    
    node.addEventListener('keydown', onKeyDown);
    node.addEventListener('keyup', onKeyUp);
    return {
      destroy() {
        node.removeEventListener('keydown', onKeyDown);
        node.removeEventListener('keyup', onKeyUp);
      }
    };
  }
</script>

<script lang='ts'>
  import { fly } from 'svelte/transition';
  import { onMount } from 'svelte';
  import { state } from './state';
  
  onMount(() => {
    let unsubscribe = state.subscribe(v => {
      scoped = v;
    });
    return () => {
      unsubscribe();
    };
  });
  
  let keys = [];
  export let helper = true;
  export let strict = false;
  export let sortFn;
  export let permanents = [];
  let scoped = [];
  
  function checkMatch(sequence, definition, strict = false) {
    if (strict) {
      if (sequence.length !== definition.length) return false;
    } else {
      if (sequence.length > definition.length) return false;
    }
    
    let s = definition.slice(0);
    for (let i = 0; i < sequence.length; i++) {
      let l = sequence[i];
      let found = false;
      for (let j = 0; j < s.length; j++) {
        let { code } = s[j];
        if (Array.isArray(code)) {
          found = code.includes(l);
        } else {
          found = l === code;
        }
        if (found) {
          s = s.slice(0, j).concat(s.slice(j + 1));
          break;
        }
      }
      if (!found) {
        return false;
      }
    }
    return true;
  }
  
  function aggregatedConditions(sc, k) {
    if (typeof sc.escaped === 'function' && sc.escaped()) {
      return false;
    }
    return checkMatch(k, sc.sequence);
  }
  
  $: filtered = scoped.filter(sc => aggregatedConditions(sc, keys));
  $: permFiltered = permanents.filter(sc => aggregatedConditions(sc, keys));
  $: sorted = typeof sortFn === 'function' ? filtered.sort(sortFn) : filtered;
  $: permSorted = typeof sortFn === 'function' ? permFiltered.sort(sortFn) : permFiltered;
  $: all = [ ...permSorted, ...sorted ];
  
  function isPressed(code) {
    if (Array.isArray(code)) {
      return code.some(c => keys.includes(c));
    } else {
      return keys.includes(code);
    }
  }
  
  function onSequence(event) {
    let { final, keys: k } = event.detail;
    if (final) {
      for (let i = 0; i < all.length; i++) {
        if (checkMatch(keys, all[i].sequence, true)) {
          all[i].fn();
          break;
        }
      }
      k = [];
    }
    keys = k;
  }
  
  $: showUI = helper && (strict ? !!keys.length : true);
</script>

<svelte:window use:keySequence on:sequence={onSequence}/>

{#if showUI}
	<div class='shortcut-helper' transition:fly={{duration: 75, y: 20}}>
		{#if !sorted.length && !permSorted.length}
			<div class='sequence-container'>No Matches</div>
		{/if}
		{#if sorted.length}
			<div>
				<span class='badge'>SCOPED</span>
				{#each sorted as { sequence, title }, i (i)}
					<div class='sequence-container'>
						<div>{typeof title === 'function' ? title() : title}</div>
						<div>
							{#each sequence as { symbol, code }, j (j)}
								<div class='key-container' class:highlight={isPressed(code)}>
									{symbol}
								</div>
							{/each}
						</div>
					</div>
				{/each}
			</div>
		{/if}
		{#if permSorted.length}
			<div>
				{#if sorted.length}
					<hr>
				{/if}
				<span class='badge'>GLOBALS</span>
				{#each permSorted as { sequence, title }, i (i)}
					<div class='sequence-container'>
						<div>{typeof title === 'function' ? title() : title}</div>
						<div>
							{#each sequence as { symbol, code }, j (j)}
								<div class='key-container' class:highlight={isPressed(code)}>
									{symbol}
								</div>
							{/each}
						</div>
					</div>
				{/each}
			</div>
		{/if}
	</div>
{/if}

<style>
    hr {
        height: 1px;
        background-color: #dcdcdc;
        border: none;
    }

    .badge {
        color: #bbb;
        font-size: x-small;
    }

    .highlight {
        color: orangered;
        font-weight: bolder;
    }

    .shortcut-helper {
        box-shadow: 0 0 2px #b7b7b7, -1px 1px 2px 0px #a3a3a3;
        padding: 0.5rem;
        width: max-content;
        min-width: 10rem;
        position: fixed;
        left: 0;
        bottom: 0;
        margin: 1rem;
        border-radius: 3px;
    }

    .sequence-container:not(:last-child) {
        margin-bottom: 0.5rem;
    }

    .sequence-container {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .sequence-container > div:first-child {
        min-width: 5rem;
        margin-right: 0.5rem;
    }

    .key-container {
        height: 1rem;
        width: 1rem;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 0.5rem;
        overflow: hidden;
        box-shadow: 0 0 2px #a3a3a3;
    }

    .key-container:not(:last-child) {
        margin-right: 0.5rem;
    }
</style>
