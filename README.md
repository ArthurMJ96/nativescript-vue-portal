# PortalVue for NativeScript Vue 3

A Portal Component for NativeScript Vue 3, to render elements outside of a component, anywhere in your app.

## Installation

```bash
npm i @amj7/nativescript-vue-portal
```

```javascript
import PortalVue from '@amj7/nativescript-vue-portal'

const app = createApp(Home)

PortalVue(app)

app.start()
```

## Usage

### Basic:

```html
<Portal to="destination">
  <label text="Portal Test" class="bg-red-400" />
</Portal>

<PortalTarget name="destination" />
```

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

## API

### `<Portal>`

- **`to` (String):** The name of the `PortalTarget` where the content should be rendered.
- **`name` (String | Symbol, default: Unique ID):** A unique identifier for the portal. Defaults to a generated unique ID.
- **`disabled` (Boolean, optional):** If `true`, the portal will be disabled and the content will not be rendered in the target, but will render in it's original position.
- **`order` (Number, optional):** Specifies the rendering order of the portal content within the target, especially useful when using `multiple`. Lower numbers render first.
- **`slotProps` (Object, optional):** Props that are passed to the slot content of the portal, when it's rendered in it's original position.

### `<PortalTarget>`

- **`name` (String, required):** The unique name that matches the `to` prop of a `Portal`.
- **`wrap` (Boolean, optional, default: `false`):** If `true`, wraps the rendered content in a layout element (specified by the `as` prop). Required when teleporting multiple items to a `RootLayout` to avoid event issues.
- **`as` (String, optional, default: `GridLayout`):** The NativeScript layout element to use as the wrapper when `wrap` is `true`.
- **`multiple` (Boolean, optional, default: `false`):** If `true`, allows multiple `Portal` components to render content to this `PortalTarget`.
- **`slotProps` (Object, default: `{}`):** Props that are passed to the slot content of the PortalTarget.

---

### Credits

[PortalVue](https://github.com/LinusBorg/portal-vue)

---

---

<a href="https://buymeacoffee.com/amj7" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/default-orange.png" alt="Buy Me A Coffee" height="41" width="174"></a>
