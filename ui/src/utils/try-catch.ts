type SuccessTuple<T> = [null, T];

type FailureTuple<E> = [E, null];

type TryCatchResult<T, E = Error> = SuccessTuple<T> | FailureTuple<E>;

/**
 * Handles asynchronous operations and returns a tuple [error, data].
 *
 * @param promise - Promise to be awaited
 * @returns Promise<[E, null] | [null, T]>
 */
export async function tryCatch<T, E = Error>(
  promise: Promise<T>,
): Promise<TryCatchResult<T, E>> {
  try {
    const data = await promise;
    return [null, data];
  } catch (error) {
    return [error as E, null];
  }
}

/**
 * Handles synchronous operations and returns a tuple [error, data].
 *
 * @param callback - Synchronous function to execute
 * @returns [E, null] | [null, T]
 */
export function tryCatchSync<T, E = Error>(
  callback: () => T,
): TryCatchResult<T, E> {
  try {
    const data = callback();
    return [null, data];
  } catch (error) {
    return [error as E, null];
  }
}
