import {
  type InjectionKey,
  inject,
  provide,
  getCurrentInstance,
} from 'nativescript-vue'
import type { Wormhole } from '../types'
import { wormhole as defaultWormhole } from '../wormhole'

export const wormholeSymbol = Symbol('wormhole') as InjectionKey<Wormhole>

export function useWormhole() {
  const wh = inject(wormholeSymbol)

  if (!wh) {
    throw new Error(
      '[nativescript-vue-portal]: Necessary Injection not found. Make sur you installed the plugin properly.'
    )
  }

  return wh
}

/**
 * Ensures a Wormhole instance is available within the current Vue component context.
 *
 * This function attempts to retrieve a Wormhole instance using Vue's `inject` mechanism.
 * If a Wormhole is not found, it will try register an App-Level provided Wormhole and return it.
 *
 * This ensures that the `portal` and `portal-target` components can be imported and used directly without having to install the plugin in your main entry file.
 *
 * @param wormhole (Optional) A custom Wormhole instance to provide. If not provided, a default Wormhole is used.
 * @returns A Wormhole instance.
 * @throws {Error} If no component instance is found. Can only be used inside setup() or functional components.
 * @throws {Error} If the Wormhole cannot be ensured (provided) to the application context.
 */
export function useEnsuredWormhole(wormhole?: Wormhole) {
  const wh = inject(wormholeSymbol)
  if (!wh) {
    const instance = getCurrentInstance()
    if (!instance) {
      throw new Error(
        '[nativescript-vue-portal]: useEnsuredWormhole did not find a vue instance. Can only be used inside setup() or functional components.'
      )
    }
    instance?.appContext?.app?.provide(
      wormholeSymbol,
      wormhole || defaultWormhole
    )
    const ewh = inject(wormholeSymbol)
    if (!ewh) {
      throw new Error(
        '[nativescript-vue-portal]: useEnsuredWormhole could not ensure Wormhole.'
      )
    }

    return ewh
  }
  return wh
}

export function provideWormhole(wormhole: Wormhole) {
  provide(wormholeSymbol, wormhole)
}
