/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js");

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "404.html",
    "revision": "3065ad87c133096dbba38b6e7895afc7"
  },
  {
    "url": "app/adapters/demo.js",
    "revision": "a0f8dc61dfdca69770e6da781d4f58e3"
  },
  {
    "url": "app/adapters/homegenie.js",
    "revision": "f46e24956ec9fc7d05c01a28fc05c7a1"
  },
  {
    "url": "app/components/program.css",
    "revision": "40f1b4e521b9230421a4e47a89a4c753"
  },
  {
    "url": "app/components/program.html",
    "revision": "6525d3791131b384252b5c9039b7bd89"
  },
  {
    "url": "app/components/program.js",
    "revision": "e27034f2a7b5963c9852c27d4f785767"
  },
  {
    "url": "app/components/README.html",
    "revision": "4d933ef7afc7943ed5c13ac5185a5d88"
  },
  {
    "url": "app/components/sensor.css",
    "revision": "28426c6bac235b6911f97e59a1a6dcd6"
  },
  {
    "url": "app/components/sensor.html",
    "revision": "9b93a81494a63cb5336812a3dadb0b95"
  },
  {
    "url": "app/components/sensor.js",
    "revision": "0b747a3acc6e836475c899aaebb73a9f"
  },
  {
    "url": "app/components/switch.css",
    "revision": "7dfb50674009a6215e499fe06c445727"
  },
  {
    "url": "app/components/switch.html",
    "revision": "a4fafa68113a2dd1549a92c45e77741c"
  },
  {
    "url": "app/components/switch.js",
    "revision": "b627500ae45fa7a0ad56c5c12fe96d43"
  },
  {
    "url": "app/controllers/README.html",
    "revision": "9ed2499d1677b2a886c93ceb0e0ef7d8"
  },
  {
    "url": "app/layout/footer.css",
    "revision": "204665ad6ba031dbd4627e0392c57dda"
  },
  {
    "url": "app/layout/footer.html",
    "revision": "140b14870f89415d6cf4ff790189de2a"
  },
  {
    "url": "app/layout/header.css",
    "revision": "7faf862273f4c48c8f7abbb5b8b40d19"
  },
  {
    "url": "app/layout/header.html",
    "revision": "e98784bb3202148f5e368374de923b44"
  },
  {
    "url": "app/pages/eventslog.css",
    "revision": "8c6b5be647dc8bcf2e4a733512fd5f23"
  },
  {
    "url": "app/pages/eventslog.html",
    "revision": "a2d73443110b9e3595cae269c9819863"
  },
  {
    "url": "app/pages/home.css",
    "revision": "45ba4c0abf96b74b00abdad3d442c822"
  },
  {
    "url": "app/pages/home.html",
    "revision": "1442e75ee3210cd6522af85fd0fb94e1"
  },
  {
    "url": "app/pages/home/items_list.css",
    "revision": "eec8f80db4742f2559a5e824774f562c"
  },
  {
    "url": "app/pages/home/items_list.html",
    "revision": "25b9f7cf760f392535bf38776a596720"
  },
  {
    "url": "app/pages/home/items_list.js",
    "revision": "f301d39d7af5d91fd58dac8cb4a2c1e6"
  },
  {
    "url": "app/pages/home/items_list/item_mini.css",
    "revision": "3d62085c6fa48605e32684c25520059b"
  },
  {
    "url": "app/pages/home/items_list/item_mini.html",
    "revision": "d132282b8d0f839d59ecfd2346a6e46a"
  },
  {
    "url": "app/pages/home/items_list/item_mini.js",
    "revision": "8aff956c6de8c95445f93e7a7db15a64"
  },
  {
    "url": "app/pages/home/items_list/item.css",
    "revision": "2905fc6dafc962343ae74f86b5ba5d10"
  },
  {
    "url": "app/pages/home/items_list/item.html",
    "revision": "1303408c72a2cc61ffd43bc7fa5f9760"
  },
  {
    "url": "app/pages/home/items_list/item.js",
    "revision": "d6093152119850e2f53205aea96df4dd"
  },
  {
    "url": "app/pages/setup.css",
    "revision": "c415f940444c2582c87704abfbd4d309"
  },
  {
    "url": "app/pages/setup.html",
    "revision": "75c3fff843af8c88e2d25ba7d990fe30"
  },
  {
    "url": "app/pages/setup.js",
    "revision": "a59aa1b56d2a07c5cee30789bfe70edc"
  },
  {
    "url": "app/pages/setup/module_item.css",
    "revision": "c7589ccdfe6a739105f9212c007c3859"
  },
  {
    "url": "app/pages/setup/module_item.html",
    "revision": "2b9f78649e84bcafb9b7651947c7dc2b"
  },
  {
    "url": "app/pages/setup/module_item.js",
    "revision": "621c9dd18b9f882b9770f98d4e78aca4"
  },
  {
    "url": "app/pages/setup/test.js",
    "revision": "c2213112ee667e664cdd7ddae1c3342f"
  },
  {
    "url": "app/pages/splash.css",
    "revision": "3571d2801983548d806fa30f14982372"
  },
  {
    "url": "app/pages/splash.html",
    "revision": "9a56ae8bc74d15ce50d6cf7be2af5104"
  },
  {
    "url": "app/README.html",
    "revision": "529d9be4ce30a10c69bc167c34d25bd8"
  },
  {
    "url": "app/shared/button_menu.css",
    "revision": "fe34504c045cca13ffa4ced9489f427c"
  },
  {
    "url": "app/shared/button_menu.html",
    "revision": "58e33707962dba7d7ed1d9d1da81f0e9"
  },
  {
    "url": "app/shared/button_menu.js",
    "revision": "43c46366aa989104f8dabee90a2b1685"
  },
  {
    "url": "app/shared/main_menu.css",
    "revision": "89f29c1dbc3f496e937ea68b5e24f4ec"
  },
  {
    "url": "app/shared/main_menu.html",
    "revision": "95e478bf1114c55e34bb12d27051d3d4"
  },
  {
    "url": "app/shared/main_menu.js",
    "revision": "b65bb449ac69b4c874d5bb3b3c12c4f3"
  },
  {
    "url": "app/templates/README.html",
    "revision": "77ba01864c4060ecb2d03ca6ee381178"
  },
  {
    "url": "cli/mqtt.html",
    "revision": "dc77b01fd5a2f7ffb2797bc594b5f399"
  },
  {
    "url": "cli/ws.html",
    "revision": "29b6c8b95ef24b884c9319ad47d1be61"
  },
  {
    "url": "config.js",
    "revision": "b5fb62e9e34bf05f99a048d03105e34c"
  },
  {
    "url": "css/common/base.css",
    "revision": "0e49a0b3ca52fc8173a8691514daf81c"
  },
  {
    "url": "css/common/layout.css",
    "revision": "ba043b1550921afb72f5f0d709766c1a"
  },
  {
    "url": "css/common/text.css",
    "revision": "3dd02835d964bc6c577d2680c1ae7577"
  },
  {
    "url": "css/common/widgets.css",
    "revision": "69430746f0edf8cce068254d5ce7edd3"
  },
  {
    "url": "css/README.html",
    "revision": "6a4fe1ff92acfccf5d3e40f0f81fb427"
  },
  {
    "url": "index.css",
    "revision": "40e887d590a280938f5740dfb9e943a7"
  },
  {
    "url": "index.hgui.js",
    "revision": "1358236fa222cd03a291f35465a8e0a2"
  },
  {
    "url": "index.html",
    "revision": "2b1b7f64e3eeeaf0b751c4c5e743a79b"
  },
  {
    "url": "index.js",
    "revision": "d6f2a931b7ea33ef6d9b44b7f6406725"
  },
  {
    "url": "index.options.js",
    "revision": "96d2b9ae3e75b1153b4140c98f9ebdf5"
  },
  {
    "url": "js/hgui.js",
    "revision": "533e4993e08a182bc9270b174670bbdf"
  },
  {
    "url": "js/mqttws31.js",
    "revision": "5bcc29c376b9bfb78b73b259601c5f52"
  },
  {
    "url": "js/pouchdb-7.0.0.min.js",
    "revision": "12d23e3295590b71657939cdb7aba451"
  },
  {
    "url": "js/zuix/zuix-bundler.js",
    "revision": "2bb68a5874f617a868f6a96e83431df7"
  },
  {
    "url": "js/zuix/zuix-bundler.min.js",
    "revision": "6a73edc276475e9a405bfd5006cd8cc5"
  },
  {
    "url": "js/zuix/zuix.js",
    "revision": "a0a82db1a01d0e5ece6e284ef728792e"
  },
  {
    "url": "js/zuix/zuix.min.js",
    "revision": "4ddd90baebdb28b031c6c3df58e51fea"
  },
  {
    "url": "manifest.json",
    "revision": "10231bceb6bf625a754e38394f9a7f0c"
  },
  {
    "url": "offline.html",
    "revision": "72257b195d4eb39cc00cbdcf3463f77e"
  },
  {
    "url": "images/devices/bulb.png",
    "revision": "4dca54a739d44089ae998e47093d120e"
  },
  {
    "url": "images/devices/socket.png",
    "revision": "44fe5ded79bf5a25914d0b2c66396c96"
  },
  {
    "url": "images/genie.png",
    "revision": "d311329f6b7f6588be49094a592492c9"
  },
  {
    "url": "images/icons/desktop/android-chrome-192x192.png",
    "revision": "93d5e77e9ee1e9c6975f3c0bd1a21574"
  },
  {
    "url": "images/icons/desktop/android-chrome-512x512.png",
    "revision": "6df83c6c13be17a2ea70d29e340c5ddb"
  },
  {
    "url": "images/icons/desktop/apple-touch-icon.png",
    "revision": "2b78ed332644d19d9779c069c5842538"
  },
  {
    "url": "images/icons/desktop/favicon-16x16.png",
    "revision": "6c047cdbd3d5c4c962a3a692a5025d27"
  },
  {
    "url": "images/icons/desktop/favicon-32x32.png",
    "revision": "7413528d5e59c22af1ccf38187bc950b"
  },
  {
    "url": "images/icons/desktop/mstile-150x150.png",
    "revision": "540caa78f56655281b2d4b17ad52f2ce"
  },
  {
    "url": "images/icons/desktop/safari-pinned-tab.svg",
    "revision": "a0ab2c612c6a5019b3e4ae7c38043b98"
  },
  {
    "url": "images/icons/icon-128x128.png",
    "revision": "69f3f1f3f956bb71f35ce66b7717e1a0"
  },
  {
    "url": "images/icons/icon-144x144.png",
    "revision": "45e24db8671c41ca95c440df0cadf2a3"
  },
  {
    "url": "images/icons/icon-152x152.png",
    "revision": "e0867fd6e9bc25afd831b1eabdd83f8d"
  },
  {
    "url": "images/icons/icon-192x192.png",
    "revision": "cf383c3d4500d31884326cc9d53a8c3a"
  },
  {
    "url": "images/icons/icon-384x384.png",
    "revision": "19007d16c73f442f44c926beddc34637"
  },
  {
    "url": "images/icons/icon-512x512.png",
    "revision": "274298ed7162d12352fa836d3a2cb11e"
  },
  {
    "url": "images/icons/icon-72x72.png",
    "revision": "919cb6b3e8a1b5d0c963921dba0e4388"
  },
  {
    "url": "images/icons/icon-96x96.png",
    "revision": "5547ad1a33334c0f5c04f6de1f6d2c52"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerRoute(/\.(?:png|jpg|jpeg|svg)$/, workbox.strategies.cacheFirst({ "cacheName":"images", plugins: [new workbox.expiration.Plugin({"maxEntries":50,"purgeOnQuotaError":false})] }), 'GET');
workbox.routing.registerRoute(/\.(?:html|json|js|css)$/, workbox.strategies.cacheFirst({ "cacheName":"default", plugins: [new workbox.expiration.Plugin({"maxEntries":50,"purgeOnQuotaError":false})] }), 'GET');
