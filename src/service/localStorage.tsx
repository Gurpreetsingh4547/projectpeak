const LocalStorageKeyPreFix = "PEAK_"; // Replace 'your_prefix_' with your desired prefix

const LocalStorageUtil = {
  /**
   * [set data in local storage]
   * @param {string} key
   * @param {string} value
   */
  set(key: string, value: any): void {
    localStorage[LocalStorageKeyPreFix + key] = value;
  },

  /**
   * [get data from local storage]
   * @param {string} key
   * @param {string} defaultValue
   */
  get(key: string, defaultValue: any = 0): string {
    return localStorage[LocalStorageKeyPreFix + key] || defaultValue;
  },

  /**
   * [setObject in local storage]
   * @param {string} key
   * @param {object} value
   */
  setObject(key: string, value: object): void {
    localStorage[LocalStorageKeyPreFix + key] = JSON.stringify(value);
  },

  /**
   * [getObject from local storage]
   * @param {string} key
   */
  getObject(key: string): any {
    return JSON.parse(localStorage[LocalStorageKeyPreFix + key] || "{}");
  },

  /**
   * [clear local storage]
   */
  clear(): void {
    localStorage.clear();
  },

  /**
   * [remove key from local storage]
   * @param {string} key
   */
  remove(key: string): void {
    localStorage.removeItem(LocalStorageKeyPreFix + key);
  },
};

export default LocalStorageUtil;
