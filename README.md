# HomeGenie UI and PWA

This is the home of the new [HomeGenie](https://github.com/genielabs/HomeGenie)
server user interface, based on [zuixjs.org](https://zuixjs.org) library and its
[web-starter](https://github.com/zuixjs/zuix-web-starter) project.

## Purpose of this project

`// TODO: ....`


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

Read [zuix-web-starter](https://github.com/zuixjs/zuix-web-starter) documentation for further information.
