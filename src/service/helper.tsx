/**
 * @param  {any} obj
 * @return {boolean}
 */
export const IsObject = (obj: any): boolean => {
  if (typeof obj !== "undefined" && typeof obj === "object" && obj !== null) {
    return true;
  }
  return false;
};

/**
 * [getObject]
 * @param  {object} object
 * @param  {boolean} secondTime
 */
export const GetObject = (object: object): object => {
  if (IsObject(object)) {
    return object;
  }
  if (!HaveValue(object)) {
    return {};
  }
  return {};
};

/**
 * @param  {any} obj
 * @return {boolean}
 */
export const IsObjectHaveValue = (obj: any): boolean => {
  if (typeof obj === "object" && obj !== null && Object.keys(obj).length > 0) {
    return true;
  }
  return false;
};

/**
 * @param  {number|string} opt1
 * @param  {number|string} opt2
 * @return {boolean}
 */
export const IsEqual = (
  opt1: number | string,
  opt2: number | string
): boolean => {
  return opt1 === opt2;
};

/**
 * @param  {boolean|string|number} bool
 * @param  {boolean} returnNumeric
 * @return {boolean|number}
 */
export const IsTrue = (
  bool: boolean | string | number | undefined,
  returnNumeric: boolean
): boolean | number => {
  if (bool === true || bool === "true" || bool === 1 || bool === "1") {
    return returnNumeric === true ? 1 : true;
  }
  return returnNumeric === true ? 0 : false;
};

/**
 * @param  {any} agr
 * @return {boolean}
 */
export const IsString = (agr: any): boolean => {
  if (typeof agr === "string") {
    return true;
  }
  return false;
};

/**
 * @param  {any} text
 * @param  {boolean} nullOption
 * @param  {boolean} noneOption
 * @return {boolean}
 */
export const HaveValue = (
  text: any,
  nullOption?: boolean,
  noneOption?: boolean
): boolean => {
  if (typeof text === "undefined") {
    return false;
  }
  if (IsTrue(nullOption, false) && (text === "null" || text === null)) {
    return false;
  }
  if (IsTrue(noneOption, false) && text.toLowerCase() === "none") {
    return false;
  }
  if (text === "0" || text === 0) {
    return true;
  }
  if (text !== "" && text !== null) {
    return true;
  }
  return false;
};

/**
 * @param  {string} email
 * @return {boolean}
 */
export const IsValidEmail = (email: string): boolean => {
  if (!HaveValue(email)) {
    return false;
  }
  email = email.toString();
  const regex = /\S+@\S+\.\S+/;
  return regex.test(email);
};

/**
 * @param  {object} obj
 * @return {object}
 */
export const MakeCopy = (obj: object): object => {
  if (!IsObject(obj)) {
    return {};
  }
  return { ...obj };
};

/**
 * @param  {any} val
 * @return {number}
 */
export const FloatVal = (val: any): number => {
  if (!HaveValue(val)) {
    return 0.0;
  }
  return isNaN(parseFloat(val)) ? 0.0 : parseFloat(val);
};

/**
 * @param  {any} arr
 * @return {boolean}
 */
export const IsArray = (arr: any): boolean => {
  if (typeof arr !== "undefined" && arr !== null && Array.isArray(arr)) {
    return true;
  }
  return false;
};

/**
 * [copy array]
 * @param  {any} arr
 * @return {any[]}
 */
export const CopyArray = (arr: any): any[] => {
  if (!IsArray(arr)) return [];
  return JSON.parse(JSON.stringify([...arr]));
};

/**
 * [ArrayHaveValues]
 * @param  {any} arr
 * @return {boolean}
 */
export const ArrayHaveValues = (arr: any): boolean => {
  if (IsArray(arr) && arr.length > 0) {
    return true;
  }
  return false;
};

/**
 * [HasStringText]
 * @param  {string} string
 * @param  {string} text
 * @return {boolean}
 */
export const HasStringText = (string: string, text: string): boolean => {
  if (string.toLowerCase().indexOf(text.toLowerCase()) > -1) {
    return true;
  }
  return false;
};

export const GetString = (str: any): string => {
  if (HaveValue(str) && !IsObject(str) && !IsArray(str)) {
    return str.toString();
  }
  return "";
};

export const Int = (val: any): number => {
  return parseInt(val);
};

export const HaveArrayID = (arr: any, id: any): boolean => {
  if (!ArrayHaveValues(arr)) {
    return false;
  }
  if (!HaveValue(id)) {
    return false;
  }
  if (
    arr.indexOf(id) > -1 ||
    arr.indexOf(GetString(id)) > -1 ||
    arr.indexOf(Int(id)) > -1
  ) {
    return true;
  }
  return false;
};

export const GetArray = (arr: any): any[] => {
  if (ArrayHaveValues(arr)) {
    return arr;
  }
  return [];
};

/**
 * [Return list of keys]
 * @param  {any[]} arr
 * @param  {string} keyToReturn
 * @param  {string} keySelected
 * @return {any[]}
 */
export const GetSelectedList = (
  arr: any[],
  keyToReturn: string,
  keySelected: string
): any[] => {
  if (
    typeof arr !== "undefined" &&
    arr !== null &&
    Array.isArray(arr) &&
    arr.length > 0
  ) {
    const ids = arr.map((obj) => {
      if (IsTrue(obj[keySelected], false)) {
        return obj[keyToReturn];
      }
    });
    return ids;
  }
  return [];
};

export const WebAppUrl = (): string => {
  if (!/^www./.test(window.location.hostname)) {
    return (
      window.location.protocol + "//www." + window.location.hostname + "/app"
    );
  }
  return window.location.origin + "/app";
};

export const GetArrayElementValues = (list: any[], key: string): any[] => {
  if (!IsArray(list) || !HaveValue(key)) {
    return [];
  }
  const keyValues: any = [];
  list.map((item) => {
    if (HaveValue(item[key])) {
      keyValues.push(item[key]);
    }
  });
  return keyValues;
};

/**
 * Checks if two IDs are the same.
 * @param id1 The first ID.
 * @param id2 The second ID.
 * @returns Returns true if the IDs are the same, false otherwise.
 */
export const IsSameId = (id1: any, id2: any): boolean => {
  if (!HaveValue(id1) && !HaveValue(id2)) {
    return false;
  }

  if (parseInt(id1) == parseInt(id2)) {
    return true;
  }

  return false;
};

/**
 * Gets a list of IDs from a list of objects using a specified key.
 * @param list The list of objects.
 * @param key The key to extract IDs from (default is "id").
 * @returns Returns an array of IDs extracted from the list.
 */
export const GetListIds = (list: any[], key: string = "id"): number[] => {
  if (!ArrayHaveValues(list)) {
    return [];
  }
  const ids = list.map((item) => Int(item[key]));
  return ids;
};

/**
 * Checks if a given value is a function.
 * @param functionToCheck The value to check.
 * @returns Returns true if the value is a function, false otherwise.
 */
export const IsFunction = (functionToCheck: any): boolean => {
  return (
    functionToCheck && {}.toString.call(functionToCheck) === "[object Function]"
  );
};

/**
 * Checks if a value is undefined.
 * @param what The value to check.
 * @returns Returns true if the value is undefined, false otherwise.
 */
export const IsUndefined = (what: any): boolean => {
  return what === void 0;
};

/**
 * Checks if a value is defined.
 * @param value The value to check.
 * @returns Returns true if the value is defined, false otherwise.
 */
export const IsDefined = (value: any): boolean => {
  // Better way to check if a variable is defined or not
  return typeof value !== "undefined";
};

/**
 * Parses JSON string if provided string is a valid JSON.
 * @param json The JSON string.
 * @returns Returns parsed JSON object if the input string is valid JSON, otherwise returns the input string.
 */
export const FromJson = (json: string): any => {
  return IsString(json) ? JSON.parse(json) : json;
};

/**
 * Checks if a number has a numeric value greater than 0.
 * @param num The number to check.
 * @returns Returns true if the number has a numeric value greater than 0, false otherwise.
 */
export const HaveNumValue = (num: any): boolean => {
  if (IsDefined(num) && num != null && !isNaN(num) && Int(num) > 0) {
    return true;
  }
  return false;
};
