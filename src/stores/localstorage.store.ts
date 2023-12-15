import { defineStore } from "pinia";

export const useLocalStorageStore = defineStore('localstorage', {
    state: () => {
        return {
            localStorage: localStorage,
            watchers: new Map()
        }
    },
    actions: {
        setLocalStorage<T extends string = string>(key: string, value: T) {
            this.localStorage.setItem(key, value)
        },
        removeLocalStorage(key: string) {
            this.localStorage.removeItem(key)
        },
        triggerTimeoutKey(key: string) {
            this.setLocalStorage(key, 'true')
            setTimeout(() => {
                this.removeLocalStorage(key)
            }, 1000)
        },
        getLocalStorage<T extends string = string>(key: string): T | null {
            return this.localStorage.getItem(key) as T
        },
        trigger() {
            for (const [key, callback] of this.watchers.entries()) {
                if (this.localStorage.getItem(key) === null) continue
                callback(this.localStorage.getItem(key))
            }
        },
        watch<T extends string = string>(key: string, callback: (value: T) => void) {
            this.watchers.set(key, callback)
        },
        unwatch(key: string) {
            this.watchers.delete(key)
        }
    }
})