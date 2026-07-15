let resolveTransition = null;
let transitionPromise = null;

export function waitForTransition() {
  return transitionPromise || Promise.resolve();
}

export function triggerTransitionOut() {
  transitionPromise = new Promise((resolve) => {
    resolveTransition = resolve;
    // Safety fallback to prevent hanging in case transition hooks do not fire
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
