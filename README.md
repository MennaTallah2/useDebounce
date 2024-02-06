# useDebounce
useDebounce hook created with React and following typescript restrictions.

/**
 * `useDebounce` is a custom React hook designed to debounce a given synchronous function by introducing a delay.
 *
 * @param {function} func - A synchronous function of a generic type that you want to debounce.
 * @param {number} delay - The delay time in milliseconds for debouncing the function.
 *
 * @returns {function} - An asynchronous function that, when invoked, triggers the debounced execution of the provided synchronous function after the specified delay.
 */

## using useDebounce hook

```javascript
 const debouncedFetchData = useDebounce(fetchData, 500);
```
