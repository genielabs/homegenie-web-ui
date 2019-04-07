# templates

Place templates here.

Example `card` template structure:

```
app/
├── templates/          # Templates
│   ├── card.html       #   view
│   ├── card.css        #   [optional] style
```

### Applying a template

To apply a template use the following tag attribute:

```html
<div data-ui-include="templates/card" ...>
    <h2 data-ui-field="title">Card title</h2>
    <p data-ui-field="description">The quick brown fox...</p>
</div>
```
