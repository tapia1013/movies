// Debounce
const debounce = (func, delay = 1000) => {
  let timeoutId;
  // return a function
  return (...args) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    // new execution of function
    timeoutId = setTimeout(() => {
      func.apply(null, args);
    }, delay);
  };
};