// Debounce utility: delays function execution until after wait ms have elapsed since last call
export default function debounce(callback, delay = 300) {
  let timeoutId;
  return function (...args) {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      callback(...args);
    }, delay);
  };
}
