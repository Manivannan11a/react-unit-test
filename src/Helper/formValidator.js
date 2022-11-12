const alphaNumeric = /^[A-Za-z_][A-Za-z\d_]*$/;
const phoneNumber = /^\d{10}$/;

const matchWithRegExp = (value, regExp) => value.match(regExp)

export const isEmpty = (value) => (value && value !== "");
export const isValidfName = (value) => !!(isEmpty(value) && matchWithRegExp(value, alphaNumeric));
export const isValidlName = (value) => !!(isEmpty(value) && matchWithRegExp(value, alphaNumeric));
export const isValidphone = (value) => !!(isEmpty(value) && matchWithRegExp(value, phoneNumber));
export const isValidAmount = (value) => !!(isEmpty(value) && (value > 0 || 9999999 <= value));

