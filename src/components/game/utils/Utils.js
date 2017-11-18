export function getTimestamp() {
  return window.performance && window.performance.now ? window.performance.now() : new Date().getTime();
}
