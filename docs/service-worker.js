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
    "revision": "920911e362a3d5549a818dc606c6d758"
  },
  {
    "url": "app/adapters/demo.js",
    "revision": "f2e790bdc002d2d87bdb2dbf39c1303e"
  },
  {
    "url": "app/adapters/demo/data.groups.json",
    "revision": "21929b90370ef1d73505b9f1236909e7"
  },
  {
    "url": "app/adapters/demo/data.modules.json",
    "revision": "c586974447e9c11664004d54f2514e69"
  },
  {
    "url": "app/adapters/homegenie.js",
    "revision": "e0c87801497184f6f16dcebce8fd4e28"
  },
  {
    "url": "app/components/program.css",
    "revision": "5d7a7322b6cbe5871d30e812edcbd190"
  },
  {
    "url": "app/components/program.html",
    "revision": "fc28ecaa8d589080f53b60f06240d204"
  },
  {
    "url": "app/components/program.js",
    "revision": "d41d8cd98f00b204e9800998ecf8427e"
  },
  {
    "url": "app/components/README.html",
    "revision": "4d933ef7afc7943ed5c13ac5185a5d88"
  },
  {
    "url": "app/components/sensor.css",
    "revision": "d41d8cd98f00b204e9800998ecf8427e"
  },
  {
    "url": "app/components/sensor.html",
    "revision": "d41d8cd98f00b204e9800998ecf8427e"
  },
  {
    "url": "app/components/sensor.js",
    "revision": "d41d8cd98f00b204e9800998ecf8427e"
  },
  {
    "url": "app/components/switch.css",
    "revision": "d41d8cd98f00b204e9800998ecf8427e"
  },
  {
    "url": "app/components/switch.html",
    "revision": "d41d8cd98f00b204e9800998ecf8427e"
  },
  {
    "url": "app/components/switch.js",
    "revision": "d41d8cd98f00b204e9800998ecf8427e"
  },
  {
    "url": "app/controllers/paged_view.js",
    "revision": "62ba8f50a938bd48a0f0186e64d3713f"
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
    "revision": "3df24ae9b0550c27d08287310fd5e3fc"
  },
  {
    "url": "app/layout/header.css",
    "revision": "7faf862273f4c48c8f7abbb5b8b40d19"
  },
  {
    "url": "app/layout/header.html",
    "revision": "cd7f61abedf1547138f081917b48af42"
  },
  {
    "url": "app/pages/eventslog.css",
    "revision": "8c6b5be647dc8bcf2e4a733512fd5f23"
  },
  {
    "url": "app/pages/eventslog.html",
    "revision": "d41d8cd98f00b204e9800998ecf8427e"
  },
  {
    "url": "app/pages/home.css",
    "revision": "d41d8cd98f00b204e9800998ecf8427e"
  },
  {
    "url": "app/pages/home.html",
    "revision": "d41d8cd98f00b204e9800998ecf8427e"
  },
  {
    "url": "app/pages/home/items_list.css",
    "revision": "eec8f80db4742f2559a5e824774f562c"
  },
  {
    "url": "app/pages/home/items_list.html",
    "revision": "d0d4934489c35e5222568546f6eed050"
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
    "revision": "141886ab37324985e54ddb1d1f63635a"
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
    "revision": "e179930ea08a54520b436e684fcd35b7"
  },
  {
    "url": "app/pages/home/items_list/item.js",
    "revision": "d6093152119850e2f53205aea96df4dd"
  },
  {
    "url": "app/pages/module_detail.css",
    "revision": "d41d8cd98f00b204e9800998ecf8427e"
  },
  {
    "url": "app/pages/module_detail.html",
    "revision": "d41d8cd98f00b204e9800998ecf8427e"
  },
  {
    "url": "app/pages/module_detail.js",
    "revision": "d41d8cd98f00b204e9800998ecf8427e"
  },
  {
    "url": "app/pages/setup.css",
    "revision": "fb0da108f43f82585e6063536433e183"
  },
  {
    "url": "app/pages/setup.html",
    "revision": "e07addc15b5c57c1801557dda7e5ee79"
  },
  {
    "url": "app/pages/setup.js",
    "revision": "663d5314da5ac52091f831f241863f1a"
  },
  {
    "url": "app/pages/setup/module_item.css",
    "revision": "c7589ccdfe6a739105f9212c007c3859"
  },
  {
    "url": "app/pages/setup/module_item.html",
    "revision": "b0abaa634c20bdba7e681c9958706100"
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
    "revision": "d0e1361433abf430dc2ce032209c940c"
  },
  {
    "url": "app/README.html",
    "revision": "529d9be4ce30a10c69bc167c34d25bd8"
  },
  {
    "url": "app/shared/button_menu.css",
    "revision": "1f7fcd16336c680ff28b6af8a69f613e"
  },
  {
    "url": "app/shared/button_menu.html",
    "revision": "1b87ea675429868168ad70c2bcb2eb5a"
  },
  {
    "url": "app/shared/button_menu.js",
    "revision": "43c46366aa989104f8dabee90a2b1685"
  },
  {
    "url": "app/shared/main_menu.css",
    "revision": "6426486699a406ededcd7ff37f5524e2"
  },
  {
    "url": "app/shared/main_menu.html",
    "revision": "4627d8ab67c451408436b54a11f37d65"
  },
  {
    "url": "app/shared/main_menu.js",
    "revision": "c8ac3289305cc673e7bee5366da19d04"
  },
  {
    "url": "app/templates/README.html",
    "revision": "77ba01864c4060ecb2d03ca6ee381178"
  },
  {
    "url": "app/tools/zuix_editor.css",
    "revision": "0cfe56022fd7c64f9771a6d8730df42a"
  },
  {
    "url": "app/tools/zuix_editor.html",
    "revision": "06835aa40756d2ee5a43626e6dff2d74"
  },
  {
    "url": "app/tools/zuix_editor.js",
    "revision": "6c3727c57418a5e6f52f06228bc6c58a"
  },
  {
    "url": "app/tools/zuix_editor/bundle_item.js",
    "revision": "2d8a04755212a67643094a7f54125cc0"
  },
  {
    "url": "app/tools/zuix_hackbox.css",
    "revision": "8a2976ba4c9ef3cbcf9b44a271d76390"
  },
  {
    "url": "app/tools/zuix_hackbox.html",
    "revision": "3ab0350f75d531c384d032bd72c2a984"
  },
  {
    "url": "app/tools/zuix_hackbox.js",
    "revision": "5ad98f342e41673b38d59d9477baacbf"
  },
  {
    "url": "app/tools/zuix_hackbox/log_item.css",
    "revision": "12d9f88050479e9fa8eec4c6b71fa4a6"
  },
  {
    "url": "app/tools/zuix_hackbox/log_item.html",
    "revision": "8886c2a2c482015b5898088c6de81534"
  },
  {
    "url": "app/tools/zuix_hackbox/log_item.js",
    "revision": "a5db9403d8de8722159f40df0cc7c833"
  },
  {
    "url": "cli/mqtt.html",
    "revision": "d2dcf920fc9967e7563504d4c8d60069"
  },
  {
    "url": "cli/ws.html",
    "revision": "14002d432b5c5d0de43ab611c9362aa5"
  },
  {
    "url": "config.js",
    "revision": "21bf9612f3f1f4f36480f5490d9b4ada"
  },
  {
    "url": "css/common/base.css",
    "revision": "c48108c43d0600aec3fc20efe83c0000"
  },
  {
    "url": "css/common/layout.css",
    "revision": "4aa577896944c1c1ead6c8986981b642"
  },
  {
    "url": "css/common/text.css",
    "revision": "3dd02835d964bc6c577d2680c1ae7577"
  },
  {
    "url": "css/common/widgets.css",
    "revision": "f9d271ebcdbd1a0a182511683fa6c1e4"
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
    "revision": "460563ea705b9f96932b7424569fdb86"
  },
  {
    "url": "index.html",
    "revision": "26a8664d20606a26a4c8cb6309b715e7"
  },
  {
    "url": "index.js",
    "revision": "a8908d1da2cd75e7af113516a76d297c"
  },
  {
    "url": "index.options.js",
    "revision": "96d2b9ae3e75b1153b4140c98f9ebdf5"
  },
  {
    "url": "js/chartist/chartist.min.css",
    "revision": "0d6caf50a899aab4422a3afcfa80f4d7"
  },
  {
    "url": "js/chartist/chartist.min.js",
    "revision": "cf9d912db488847b9ee2c7993eaf5e27"
  },
  {
    "url": "js/hgui.js",
    "revision": "838840acfcee57dc508be9f4227555eb"
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
    "revision": "8a17441713a3009ccd759fa3e4b43c7b"
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
    "revision": "02ddb6a753b7c1e733b7cadc0fc4b109"
  },
  {
    "url": "images/devices/alarm.png",
    "revision": "3e7483846a3995d549271a11deac33a2"
  },
  {
    "url": "images/devices/bulb.png",
    "revision": "4dca54a739d44089ae998e47093d120e"
  },
  {
    "url": "images/devices/drop.png",
    "revision": "51b1e6166978eb61414f764248ac1eb8"
  },
  {
    "url": "images/devices/power.png",
    "revision": "a4671d72ab9965f1ab9e3544e3fad717"
  },
  {
    "url": "images/devices/sensor.png",
    "revision": "3e7483846a3995d549271a11deac33a2"
  },
  {
    "url": "images/devices/socket.png",
    "revision": "44fe5ded79bf5a25914d0b2c66396c96"
  },
  {
    "url": "images/devices/sun.png",
    "revision": "e708a9291c465df34b262ad06032403b"
  },
  {
    "url": "images/devices/temperature.png",
    "revision": "4c85b9c79c7395bda77f82b63c245119"
  },
  {
    "url": "images/genie.png",
    "revision": "d311329f6b7f6588be49094a592492c9"
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
  },
  {
    "url": "images/widgets/bulb.png",
    "revision": "4dca54a739d44089ae998e47093d120e"
  },
  {
    "url": "images/widgets/drop.png",
    "revision": "d41d8cd98f00b204e9800998ecf8427e"
  },
  {
    "url": "images/widgets/power.png",
    "revision": "a4671d72ab9965f1ab9e3544e3fad717"
  },
  {
    "url": "images/widgets/sensor.png",
    "revision": "3e7483846a3995d549271a11deac33a2"
  },
  {
    "url": "images/widgets/socket.png",
    "revision": "44fe5ded79bf5a25914d0b2c66396c96"
  },
  {
    "url": "images/widgets/sun.png",
    "revision": "e708a9291c465df34b262ad06032403b"
  },
  {
    "url": "images/widgets/temperature.png",
    "revision": "4c85b9c79c7395bda77f82b63c245119"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerRoute(/\.(?:png|jpg|jpeg|svg)$/, workbox.strategies.cacheFirst({ "cacheName":"images", plugins: [new workbox.expiration.Plugin({"maxEntries":50,"purgeOnQuotaError":false})] }), 'GET');
workbox.routing.registerRoute(/\.(?:html|json|js|css)$/, workbox.strategies.cacheFirst({ "cacheName":"default", plugins: [new workbox.expiration.Plugin({"maxEntries":50,"purgeOnQuotaError":false})] }), 'GET');
