import {
  type FunctionalComponent,
  type VNode,
  computed,
  defineComponent,
  h,
  watch,
  getCurrentInstance,
} from 'nativescript-vue'
import { useEnsuredWormhole } from '../composables/wormhole'

const PortalTargetContent: FunctionalComponent = (_, { slots }) => {
  return slots.default?.()
}

// In-between component to inject original provides
const PortalTargetNodeRenderer = defineComponent({
  props: { provides: { type: Object } },
  setup(props, { slots }) {
    // Inject the original provides
    const currentInstance = getCurrentInstance()
    if (props.provides) {
      // @ts-expect-error
      currentInstance.provides = props.provides
    }
    return () => slots.default?.()
  },
})

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'portalTarget',
  inheritAttrs: false,
  props: {
    /**
     * Wether to wrap teleported content in a layout element. (Default: false)
     * Fixes RootLayout freezing.
     */
    wrap: { type: Boolean, default: false },

    /**
     * Layout element to wrap all teleported content with. (Default: GridLayout)
     * No effect when wrap=false.
     */
    as: { type: String, default: 'GridLayout' },

    /**
     * Allows rendering content from multiple Portal components at the same time.
     */
    multiple: { type: Boolean, default: false },

    /**
     * Name of this portal target.
     */
    name: { type: String, required: true },

    /**
     * Props to be provided to teleported content.
     */
    slotProps: { type: Object, default: () => ({}) },
  },
  emits: ['change'],
  setup(props, { emit, slots, attrs }) {
    const wormhole = useEnsuredWormhole()

    const slotVnodes = computed<{ vnodes: VNode[]; vnodesFn: () => VNode[] }>(
      () => {
        const transports = wormhole.getContentForTarget(
          props.name,
          props.multiple
        )

        const wrapperSlot = slots.wrapper
        const rawNodes = transports.map(({ content, from, provides }) => {
          return [
            h(
              PortalTargetNodeRenderer,
              { provides, key: `_portal_item-${String(from)}` }, // Force teleported items to have keys. Fixes multiple features for Nativescript-Vue.
              () => content(props.slotProps)
            ),
          ]
        })
        const vnodes = wrapperSlot
          ? rawNodes.flatMap((nodes) =>
              nodes.length ? wrapperSlot(nodes) : []
            )
          : rawNodes.flat(1)

        return { vnodes, vnodesFn: () => vnodes }
      }
    )

    watch(
      slotVnodes,
      ({ vnodes }) => {
        const hasContent = vnodes.length > 0
        const content = wormhole.transports.get(props.name)
        const sources = content ? [...content.keys()] : []
        emit('change', { hasContent, sources })
      },
      { flush: 'post' }
    )
    return () => {
      const hasContent = !!slotVnodes.value.vnodes.length
      if (hasContent) {
        if (props.wrap && props.as) {
          return h(
            props.as,
            { ...attrs },
            h(PortalTargetContent, slotVnodes.value.vnodesFn)
          )
        }
        return h(PortalTargetContent, slotVnodes.value.vnodesFn)
      } else {
        return slots.default?.()
      }
    }
  },
})
