/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Converts underscored keys to camelcased keys in an object.
 *
 * @param {any} obj - Object with underscored keys.
 * @returns {any} - Converted object with camelcased keys.
 */
export function underscoreToCamel(obj: any): any {
  if (!obj || typeof obj !== 'object') {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => underscoreToCamel(item));
  }

  return Object.keys(obj).reduce((acc, key) => {
    const camelKey = key.replace(/_([a-z])/g, (_, letter) =>
      letter.toUpperCase()
    );

    if (camelKey) {
      (acc as any)[camelKey] = underscoreToCamel(obj[key]);
    }

    return acc;
  }, {});
}
