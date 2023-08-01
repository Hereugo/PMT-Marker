class Utils {
  static log(message) {
    console.log(
      `%c[PMT-CE]%c ${message} `,
      "color:white;background:#058D80",
      "font-weight:bold;color:#058D80;"
    );
  }

  static errorLog(error) {
    console.error(
      `%c[PMT-CE]%c ${error.message} `,
      "color:white;background:#FF0000",
      "font-weight:bold;color:#FF0000;"
    );
  }

  /**
   * @param {string[]} keys
   *
   * @returns {Promise<Object>}
   *
   * @example
   * const { data } = await getStorageData(['data']);
   *
   */
  static getStorageData(keys) {
    return new Promise((resolve, reject) =>
      chrome.storage.sync.get(keys, (result) =>
        chrome.runtime.lastError
          ? reject(Error(chrome.runtime.lastError.message))
          : resolve(result)
      )
    );
  }

  /**
   * @param {Object} data
   *
   * @returns {Promise<void>}
   *
   * @example
   *
   * await setStorageData({ data: 'some data' });
   *
   */
  static setStorageData(data) {
    return new Promise((resolve, reject) =>
      chrome.storage.sync.set(data, () =>
        chrome.runtime.lastError
          ? reject(Error(chrome.runtime.lastError.message))
          : resolve()
      )
    );
  }
}
