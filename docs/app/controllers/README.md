# controllers

Place controllers here.

Example controllers structure:

```
app/
├── controllers/            # Shared or generic controllers
│   ├── scroll_helper.js    #   Scroll Helper
│   ├── gesture_helper.js   #   Gesture Helper
│   ├── view_pager.js       #   View Pager
```

### Loading a controller

To load a controller on a component use the following tag attribute:

```html
<div data-ui-load="controllers/view_pager">
    <div>
        <h1>Page 1</h1>
        ...
    </div>
    <div>
        <h1>Page 2</h1>
        ...
    </div>
    <div>
        <h1>Page 3</h1>
        ...
    </div>
</div>
```
