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
    "revision": "915325646b32f486118441cda2d98082"
  },
  {
    "url": "app/adapters/demo/data.groups.json",
    "revision": "8dee5115b8b581b7a6cac6e317b2ceb9"
  },
  {
    "url": "app/adapters/demo/data.modules.json",
    "revision": "b3d16a3135958d5a0a3c71530abb3561"
  },
  {
    "url": "app/adapters/homegenie.js",
    "revision": "874c00641a8f1cbdd3a8342e224b6d63"
  },
  {
    "url": "app/components/README.html",
    "revision": "4d933ef7afc7943ed5c13ac5185a5d88"
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
    "revision": "d394cc04cde033753a888184e834d1e0"
  },
  {
    "url": "app/layout/header.css",
    "revision": "7faf862273f4c48c8f7abbb5b8b40d19"
  },
  {
    "url": "app/layout/header.html",
    "revision": "f593c409c4f6965126ba17d9bf0bfa99"
  },
  {
    "url": "app/pages/eventslog.css",
    "revision": "8c6b5be647dc8bcf2e4a733512fd5f23"
  },
  {
    "url": "app/pages/eventslog.html",
    "revision": "d84787dba4ba300b89bf84914a036746"
  },
  {
    "url": "app/pages/home.css",
    "revision": "2b19b5eaea3999ac80f4438639e6487f"
  },
  {
    "url": "app/pages/home.html",
    "revision": "745a16081bb296c95262aad7d12e05d3"
  },
  {
    "url": "app/pages/home/items_list.css",
    "revision": "eec8f80db4742f2559a5e824774f562c"
  },
  {
    "url": "app/pages/home/items_list.html",
    "revision": "e9494e2a3c2f0d0da1118d8d28291fe6"
  },
  {
    "url": "app/pages/home/items_list.js",
    "revision": "2b90876fcd90c5ae337f15a6ee6e2dac"
  },
  {
    "url": "app/pages/home/items_list/item_mini.css",
    "revision": "3d62085c6fa48605e32684c25520059b"
  },
  {
    "url": "app/pages/home/items_list/item_mini.html",
    "revision": "e4297b8cc469b04a28fe0e261a00309e"
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
    "revision": "91edcf820671aa65316a9e30d82027d1"
  },
  {
    "url": "app/pages/home/items_list/item.js",
    "revision": "d6093152119850e2f53205aea96df4dd"
  },
  {
    "url": "app/pages/module_detail.css",
    "revision": "b3cd7f71a6ca7f936d2a1dea8e5b5ef0"
  },
  {
    "url": "app/pages/module_detail.html",
    "revision": "2bd6d08b1dfa1c90fcd521d9b568bbc3"
  },
  {
    "url": "app/pages/module_detail.js",
    "revision": "5ff3a16f4f0184928c737aa67fa2d298"
  },
  {
    "url": "app/pages/setup.css",
    "revision": "fb0da108f43f82585e6063536433e183"
  },
  {
    "url": "app/pages/setup.html",
    "revision": "b3c79d8a3d13d7581a913461452e8355"
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
    "revision": "35dc27bd559b7bd8e6688cac5ecb8409"
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
    "revision": "500c2f0f961f833d9206a5eda2fa0317"
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
    "revision": "602ca4bae9b8b3d03e90ade2b6fa61e0"
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
    "revision": "0ebca2a3f90cbc09b8710236c0f50e23"
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
    "revision": "13786cde7540823548ca80cf1805eacb"
  },
  {
    "url": "app/tools/zuix_editor.js",
    "revision": "6c3727c57418a5e6f52f06228bc6c58a"
  },
  {
    "url": "app/tools/zuix_editor/bundle_item.css",
    "revision": "321bb67d53b889b8b7ff1c42e8c3a796"
  },
  {
    "url": "app/tools/zuix_editor/bundle_item.html",
    "revision": "435a56f0d185cffe995c28a512e38f32"
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
    "revision": "4fcee871a909807f82e7e41ead61c242"
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
    "revision": "98b9be27f0de7161a8b9a237a05954f1"
  },
  {
    "url": "app/tools/zuix_hackbox/log_item.js",
    "revision": "a5db9403d8de8722159f40df0cc7c833"
  },
  {
    "url": "app/widgets/_inc/standard_widget.css",
    "revision": "706418714729b1745c7ea73463f535e1"
  },
  {
    "url": "app/widgets/_inc/standard_widget.html",
    "revision": "83d2da4d9d133c8c2ef48a38ed9bed72"
  },
  {
    "url": "app/widgets/_inc/standard_widget.js",
    "revision": "6d320d701084125fbcd77bb62462855e"
  },
  {
    "url": "app/widgets/program.css",
    "revision": "f804fcfca36be282d98ff794ea704317"
  },
  {
    "url": "app/widgets/program.html",
    "revision": "49fc19b5fc0a351aaf2d3bee140acb45"
  },
  {
    "url": "app/widgets/program.js",
    "revision": "ffbff731e366b96b1f8a623cb2a588a8"
  },
  {
    "url": "app/widgets/sensor.css",
    "revision": "c0fba1110ffd0ec5dccb2534ddb16295"
  },
  {
    "url": "app/widgets/sensor.html",
    "revision": "f63b323995b3238fbe022b0308c7e589"
  },
  {
    "url": "app/widgets/sensor.js",
    "revision": "f5f08d09ea6af5cc7957e5d324430afb"
  },
  {
    "url": "app/widgets/switch.css",
    "revision": "5e4361aa9c2fdeb040e2b76f611eb4a2"
  },
  {
    "url": "app/widgets/switch.html",
    "revision": "1038b5aaddc73cc28cb928fe80b7d307"
  },
  {
    "url": "app/widgets/switch.js",
    "revision": "61fee8e3977c64d2e588ae74b70552af"
  },
  {
    "url": "app/widgets/timeclock.css",
    "revision": "d08ccc0e2d609eecf405383dd2cf9ac3"
  },
  {
    "url": "app/widgets/timeclock.html",
    "revision": "b723cfad159ec78657f04d047fbc6827"
  },
  {
    "url": "app/widgets/timeclock.js",
    "revision": "89ab6cc41599b019668f089c0d0e303b"
  },
  {
    "url": "cli/mqtt.html",
    "revision": "dc77b01fd5a2f7ffb2797bc594b5f399"
  },
  {
    "url": "cli/ws.html",
    "revision": "c3d32c893f59e0e5a4879b06978e1de5"
  },
  {
    "url": "config.js",
    "revision": "78e0970dacda9eb851258bd642217625"
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
    "revision": "4da280277b90afaf4e13b618c2afe4eb"
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
    "revision": "f26984049c038d9ac02013c60e7588bc"
  },
  {
    "url": "index.html",
    "revision": "6b8788c77eb2792f26dd0c814e89cc6d"
  },
  {
    "url": "index.js",
    "revision": "fb45aefcda9e4ec6c47a94219d5c3f32"
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
    "revision": "111d7ff92ef17da5d7b60105f8c12a56"
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
    "url": "js/widgets.js",
    "revision": "d717a64d34f7afb6f0e0ba995334c84e"
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
    "revision": "8a7ede3a46887e81cc30997afdc8c42c"
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
    "url": "test.html",
    "revision": "c491d21fd21b42969c85c9a090a56fee"
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
  },
  {
    "url": "images/widgets/bulb.png",
    "revision": "4dca54a739d44089ae998e47093d120e"
  },
  {
    "url": "images/widgets/drop.png",
    "revision": "51b1e6166978eb61414f764248ac1eb8"
  },
  {
    "url": "images/widgets/empty.svg",
    "revision": "efd685f4843279556438eeb8eaa1f72c"
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
