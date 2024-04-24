interface LocalStorageUtility {
  set<T>(key: string, value: T): void

  get<T>(key: string): T | null

  remove(key: string): void

  clear(): void
}

const localStorageUtility: LocalStorageUtility = {
  /**
   * 设置 localStorage 的值
   * @param key 键名
   * @param value 键值
   */
  set<T>(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value))
  },

  /**
   * 获取 localStorage 的值
   * @param key 键名
   * @returns {T | null} 键值
   */
  get<T>(key: string): T | null {
    const item = localStorage.getItem(key)
    if (item === null) return null

    try {
      return JSON.parse(item) as T
    } catch (error) {
      console.error(`Error parsing localStorage item "${key}":`, error)
      return null
    }
  },

  /**
   * 删除指定的 localStorage 键
   * @param key 键名
   */
  remove(key: string): void {
    localStorage.removeItem(key)
  },

  /**
   * 清空 localStorage
   */
  clear(): void {
    localStorage.clear()
  }
}

export default localStorageUtility
