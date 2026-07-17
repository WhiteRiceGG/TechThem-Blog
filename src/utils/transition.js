let resolveTransition = null;
let transitionPromise = null;

export function waitForTransition() {
  return transitionPromise || Promise.resolve();
}

export function triggerTransitionOut() {
  transitionPromise = new Promise((resolve) => {
    resolveTransition = resolve;
    
    setTimeout(() => {
      if (resolveTransition === resolve) {
        resolve();
        resolveTransition = null;
        transitionPromise = null;
      }
    }, 500);
  });
}

export function triggerTransitionIn() {
  if (resolveTransition) {
    resolveTransition();
    resolveTransition = null;
    transitionPromise = null;
  }
}
