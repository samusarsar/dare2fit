/**
 * Retrieves the value of a specific key in an enum object.
 * @param {Object} enumObj - The enum object.
 * @param {string} key - The key for which to retrieve the value.
 * @return {string | undefined} - The value of the key in the enum object, or undefined if not found or not a string.
 */
export const getEnumValue = (enumObj: any, key: string): string | undefined => {
    const value = enumObj[key];
    return typeof value === 'string' ? value : undefined;
};
