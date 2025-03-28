import { watch } from 'nativescript-vue'

export function warn(msg: string) {
  console.warn('[nativescript-vue-portal]: ' + msg)
}

export function assertStaticProps(
  component: string,
  props: Record<string, any>,
  propNames: string[]
) {
  propNames.forEach(
    (name) => {
      watch(
        () => props[name],
        () => {
          warn(
            `Prop '${name}' of component ${component} is static, but was dynamically changed by the parent.
          This change will not have any effect.`
          )
        }
      )
    },
    { flush: 'post' }
  )
}

export function stableSort<T>(array: T[], compareFn: Function) {
  return array
    .map((v: T, idx: number) => {
      return [idx, v] as [number, T]
    })
    .sort(function (a, b) {
      return compareFn(a[1], b[1]) || a[0] - b[0]
    })
    .map((c) => c[1])
}
