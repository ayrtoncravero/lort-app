declare module 'vuex' {
  import type { App } from 'vue'

  export interface Store<S = unknown> {
    state: S
    commit(type: string, payload?: unknown): void
    dispatch(type: string, payload?: unknown): Promise<unknown>
    install(app: App): void
  }

  export function createStore<S = unknown>(options: unknown): Store<S>
  export function useStore<S = unknown>(): Store<S>
}
