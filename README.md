# HomeGenie UI and PWA

This is the home of the new [HomeGenie](https://github.com/genielabs/HomeGenie)
server user interface, based on [zuixjs.org](https://zuixjs.org) library and its
[web-starter](https://github.com/zuixjs/zuix-web-starter) project.


## Prerequisites

This project requires [Node.js/npm](https://www.npmjs.com/get-npm) to be installed.


## Installation

Download or clone this repository

     git clone https://github.com/genielabs/homegenie-web-ui.git
     cd homegenie-web-ui.git

Install development dependencies

    npm install

## Usage

Start local web server

    npm start

Start auto-build script (watch file tree for changes and auto-rebuild)

    npm run watch

Or manual building

    npm run build

website source files are located in the `./source` folder and are
generated in the `./docs` folder.
This setting can be changed by modifying the `./config/default.json` file.


## Site Structure

The following are just guide-lines for app structuring.

```
├── source/                #
│   ├── _inc/              # Static-Site includes (eg. header.html, footer.html)
│   ├── app/               # app folder
│   ├────── adapters/      # - data adapters and providers
│   ├────── components/    # - components / widgets
│   ├────── controllers/   # - controllers
│   ├────── layout/        # - layout files (header, footer, ...) 
│   ├────── pages/         # - page fragments conveniently
│   │                      #   organized into subfolders
│   ├────── shared/        # - other bits shared across the whole app
│   ├────── templates/     # - templates
│   ├── images/            # Images (generic/shared)
│   └── ...                # Landing/Home and other entry pages,
.   .                      #  PWA service worker, SEO, etc.
```

The **_inc** folder is reserved for **static-site** content fragments that are
reusable fragments of page that can be included by using the
`{% include "<file_to_include>" %}` command.

The following example shows how the main `source/index.html' file includes
common stuff that is usually put in the header and before the end of
the body of all pages:


```html
{% include "_inc/head_open.html" %}
    <link rel="stylesheet" href="index.css">
    <!-- put any custom content that goes inside `<head>` here -->
{% include "_inc/head_close.html" %}
<body>

    <header>
        ...
    </header>

    <main>
        ...
    </main>

    <footer>
        ...
    </footer>

    <script src="index.js"></script>
{% include "_inc/body_end.html" %}
</body>
{% include "_inc/html_close.html" %}
```

Find out all other *static-site* commands and functionality from its
[documentation page](https://github.com/paulcpederson/static-site#how).

The **app** folder is reserverd for **zUIx** components and templates that
are loaded using the `data-ui-load` and `data-ui-include`
attributes. See *zUIx* [Getting Started](https://zuixjs.github.io/zuix/#/docs)
guide for documentation about how to apply templates and how to create/use
components. The name of this folder (*app*) is defined by the
`zuix.app.resourcePath` configuration setting.

The **images** folder should be reserved for all graphic resources that
are shared and are usually referenced by more than a single page or component.

It is recommended to put component-local or content-local resources inside
a dedicated subfolder.

For instance, a `app/components/login_dialog` component will consist
of the following files/folder:
```
├── source/
│   ├── app/
│   ├────── components/
│   ├────────── login_dialog.js     # Controller
│   ├────────── login_dialog.html   # View
│   ├────────── login_dialog.css    # Style
│   ├────────── login_dialog/       # Folder where to put
.   .                               #  component-local assets/resources
```

as an example see the *Media Browser* component structure in the
[zKit repository](https://github.com/zuixjs/zkit/tree/master/source/lib/components).


## Resources and Docs

- **zUIx** https://zuixjs.org
- **Static Site** https://github.com/paulcpederson/static-site
- **LESS** http://lesscss.org/features/
- **ESLint** https://eslint.org/docs/user-guide/getting-started
- **HTML-minifier** https://github.com/kangax/html-minifier
- **Node-config** http://lorenwest.github.io/node-config/
