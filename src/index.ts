import type { App } from 'nativescript-vue'
import Portal from './components/portal'
import PortalTarget from './components/portal-target'
import {
  provideWormhole,
  useWormhole,
  useEnsuredWormhole,
  wormholeSymbol,
} from './composables/wormhole'
import type { Wormhole as TWormhole } from './types'
import { createWormhole, wormhole as defaultWormhole } from './wormhole'

export interface PluginOptions {
  portalName?: string | false
  portalTargetName?: string | false
  MountingPortalName?: string
  wormhole?: TWormhole
}

export default function install(app: App, options: PluginOptions = {}) {
  options.portalName !== false &&
    app.component(options.portalName || 'Portal', Portal)
  options.portalTargetName !== false &&
    app.component(options.portalTargetName || 'PortalTarget', PortalTarget)

  const wormhole = options.wormhole ?? defaultWormhole
  app.provide(wormholeSymbol, wormhole)
}

export const Wormhole = defaultWormhole

export {
  install,
  Portal,
  PortalTarget,
  useWormhole,
  useEnsuredWormhole,
  provideWormhole,
  wormholeSymbol,
  TWormhole,
  createWormhole,
}
