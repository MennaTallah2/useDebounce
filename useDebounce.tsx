import { useCallback, useEffect, useRef } from "react";

/**
 * `useDebounce` is a custom React hook designed to debounce a given synchronous function by introducing a delay.
 *
 * @param {function} func - A synchronous function of generic type that you want to debounce.
 * @param {number} delay - The delay time in milliseconds for debouncing the function.
 *
 * @returns {function} - An asynchronous function that, when invoked, triggers the debounced execution of the provided synchronous function after the specified delay.
 */

type Timer = ReturnType<typeof setTimeout>;

export const useDebounce =
  // Two generic types :
  // <T> if for the provided function arguments as an array of unknown values
  // <U> is another generic value for unkown funtction return value
  <T extends unknown[], U>(
    func: (...args: T) => U,
    delay: number
  ): // async returned function
  ((...args: T) => Promise<U>) => {
    const timer = useRef<Timer>();

    //  Returns a cleanup function within a React useEffect hook that clears the timer and stops the ongoing function calls when the component unmounts.
    useEffect(() => {
      return () => {
        if (!timer.current) return;
        // Clear the timer and stop ongoing function calls on component unmount
        clearTimeout(timer.current);
      };
    }, []);

    // The returned asynchronous memoized function as new Promise that resolves the synchronous function after the delay
    return useCallback(
      (...args: T): Promise<U> => {
        return new Promise((resolve) => {
          if (timer.current) {
            clearTimeout(timer.current);
          }
          timer.current = setTimeout(() => resolve(func(...args)), delay);
        });
      },
      [delay, func]
    );
  };
