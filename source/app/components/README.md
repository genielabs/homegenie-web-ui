# components

Place components here.

Example `gallery` component structure:

```
app/
├── components/         # Shared or generic UI components
│   ├── gallery.js      #   controller
│   ├── gallery.html    #   view
│   ├── gallery.css     #   [optional] style
│   └── /gallery/       #   [optional] component assets folder
```

### Component loading

To load a component in the main page use the following tag attribute:

```html
<div data-ui-load="components/gallery" ...></div>
```

or with JavaScript:

```js
const componentId = 'components/gallery';
const options = {
    // define component options and model
    css: false
};
// load/create the component
const componentContext = zuix.createComponent(componentId, options);
const componentElement = componentContext.container();
// append `componentElement` to the desired view
view.appendChild(componentElement);
```

See [**zuixjs** documentation](https://zuixjs.org) for further information.
