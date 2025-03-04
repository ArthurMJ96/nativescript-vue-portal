# PortalVue for NativeScript Vue 3

A Portal Component for [NativeScript Vue 3](https://github.com/nativescript-vue/nativescript-vue), to render elements outside of a component, anywhere in your app.

[Basic StackBlitz Example](https://stackblitz.com/edit/portalvue-for-nativescript-vue-3-example?file=src%2Fcomponents%2FHome.vue)

## Getting Started

1.  **Install the package:**

    ```bash
    npm i @amj7/nativescript-vue-portal
    ```

2.  **Register the plugin in your `main.ts` (or equivalent):**

    ```javascript
    import { createApp } from 'vue'
    import Home from './components/Home.vue'
    import PortalVue from '@amj7/nativescript-vue-portal'

    const app = createApp(Home)
    PortalVue(app)
    app.start()
    ```

    _This registers the necessary components and registers and [App-level Provide](https://vuejs.org/guide/components/provide-inject.html#app-level-provide) for managing portal connections throughout your application._

3.  **Use the `Portal` and `PortalTarget` components in your App:**

    ```vue
    <template>
      <Portal to="myDestination">
        <label text="Hello from the Portal!" />
      </Portal>
      <PortalTarget name="myDestination" />
    </template>
    ```

## Special Considerations

### RootLayout:

The RootLayout will break vue events if we teleport **multiple** items in-and-out of it. To fix this, the `wrap`-prop was added to render all items within a `GridLayout`.

```vue
<Frame>
  <Page actionBarHidden="true">
    <RootLayout>
      <GridLayout>
        <!-- content -->
      </GridLayout>

      <PortalTarget name="destination" wrap multiple/>
    </RootLayout>
  </Page>
</Frame>
```

To change the default wrap element, use the `as`-prop. (`as="StackLayout"`)

### Use without installing globally:

You can import the components directly. The first created instance of `Portal` or `PortalTarget` will try to register the required [App-level Provide](https://vuejs.org/guide/components/provide-inject.html#app-level-provide).

```vue
<script setup lang="ts">
import { PortalTarget } from '@amj7/nativescript-vue-portal'
</script>

<template>
  <PortalTarget name="destination" />
</template>
```

## API

### `<Portal>`

#### Props:

- **`to` (String):** The name of the `PortalTarget` where the content should be rendered.
- **`name` (String | Symbol, default: Unique ID):** A unique identifier for the portal. Defaults to a generated unique ID.
- **`disabled` (Boolean, optional):** If `true`, the portal will be disabled and the content will not be rendered in the target, but will render in it's original position.
- **`order` (Number, optional):** Specifies the rendering order of the portal content within the target, especially useful when using `multiple`. Lower numbers render first.
- **`slotProps` (Object, optional):** Props that are passed to the slot content of the portal, when it's rendered in it's original position.

### `<PortalTarget>`

#### Props:

- **`name` (String, required):** The unique name that matches the `to` prop of a `Portal`.
- **`wrap` (Boolean, optional, default: `false`):** If `true`, wraps the rendered content in a layout element (specified by the `as` prop). Required when teleporting multiple items to a `RootLayout` to avoid event issues.
- **`as` (String, optional, default: `GridLayout`):** The NativeScript layout element to use as the wrapper when `wrap` is `true`.
- **`multiple` (Boolean, optional, default: `false`):** If `true`, allows multiple `Portal` components to render content to this `PortalTarget`.
- **`slotProps` (Object, default: `{}`):** Props that are passed to the slot content of the PortalTarget.

#### Emits:

- **`change` (returns `{ hasContent: boolean, sources: Name[] }`):** Fires after items have been teleported in or out.

---

### Credits

[PortalVue](https://github.com/LinusBorg/portal-vue)

---

---

<a href="https://buymeacoffee.com/amj7" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/default-orange.png" alt="Buy Me A Coffee" height="41" width="174"></a>
