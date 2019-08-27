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
    "revision": "d93d7c7cd1ea8473efbd94be2582d01c"
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
    "revision": "2a058632e7f24e871d37be6529147aa0"
  },
  {
    "url": "app/adapters/homegenie/options_view.css",
    "revision": "5afd5e16f0240b797f68f7033d1e04c1"
  },
  {
    "url": "app/adapters/homegenie/options_view.html",
    "revision": "0a55901136ceb363a267c580f72281ba"
  },
  {
    "url": "app/adapters/homegenie/options_view.js",
    "revision": "c48a9d2d1014d32e9dc44a5aeab2ede6"
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
    "revision": "9fb6cf5e190b549bd5981f7d70ab8d5a"
  },
  {
    "url": "app/layout/footer.html",
    "revision": "d394cc04cde033753a888184e834d1e0"
  },
  {
    "url": "app/layout/header.css",
    "revision": "0429c01cf3eedc8fe7214cb76e0424f0"
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
    "revision": "8d6b0a51942db448f36a102e124cf9b3"
  },
  {
    "url": "app/pages/home.html",
    "revision": "745a16081bb296c95262aad7d12e05d3"
  },
  {
    "url": "app/pages/home/items_list.css",
    "revision": "ee093796cb85cd92ca287ef67496c2c3"
  },
  {
    "url": "app/pages/home/items_list.html",
    "revision": "d0d4934489c35e5222568546f6eed050"
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
    "revision": "298f6d4a37742808915d0a4e09a1969f"
  },
  {
    "url": "app/pages/module_detail.html",
    "revision": "4be63689842d2da66e4d9e82dbd1f387"
  },
  {
    "url": "app/pages/module_detail.js",
    "revision": "b19a46cae4ef38e0a2a2e26accb298d8"
  },
  {
    "url": "app/pages/setup.css",
    "revision": "10341680a4d15cef99f950f25e6130b2"
  },
  {
    "url": "app/pages/setup.html",
    "revision": "5cf37aeb214ecd7bcf3fb412f29f21b3"
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
    "revision": "6afbe44c62aa9c1e3fcd53166542080a"
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
    "revision": "e75080fb214d354b6d9b9c9c893e5600"
  },
  {
    "url": "app/shared/button_menu.js",
    "revision": "43c46366aa989104f8dabee90a2b1685"
  },
  {
    "url": "app/shared/main_menu.css",
    "revision": "cfaef3190aa20cc2321a9e35ea7eaecf"
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
    "revision": "0974032a2870108e744aeefd1df710fa"
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
    "url": "app/widgets/program.css",
    "revision": "fb103ae88392cc979b5a1fb8620345b3"
  },
  {
    "url": "app/widgets/program.html",
    "revision": "bcf52bd633472d964f7d77d3c778a231"
  },
  {
    "url": "app/widgets/program.js",
    "revision": "90315b9b2986800d8336ff716ba19cab"
  },
  {
    "url": "app/widgets/sensor.css",
    "revision": "154e6eff72b26ea3e2dbc47e3dab7ef3"
  },
  {
    "url": "app/widgets/sensor.html",
    "revision": "67bc73bb7262a4005d20e87a3ba0ad64"
  },
  {
    "url": "app/widgets/sensor.js",
    "revision": "c2f3f876cdcbe0f1d38524a00712da35"
  },
  {
    "url": "app/widgets/switch.css",
    "revision": "c191ed6bc58beb0f6c1e771bf29f9f04"
  },
  {
    "url": "app/widgets/switch.html",
    "revision": "d8fae695e7cac526edeaa7798098b00f"
  },
  {
    "url": "app/widgets/switch.js",
    "revision": "c513ccb7faf2f8ca5bccce8661a592fc"
  },
  {
    "url": "app/widgets/timeclock.css",
    "revision": "87c3e9bed9d09a7cb7232717c067251c"
  },
  {
    "url": "app/widgets/timeclock.html",
    "revision": "74a0932069f97879838df06780fa287e"
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
    "revision": "96a52717f0d12fcffb9be85c1ab2694a"
  },
  {
    "url": "config.js",
    "revision": "78e0970dacda9eb851258bd642217625"
  },
  {
    "url": "css/common/base.css",
    "revision": "b0fd639136a66685ff56528db5002921"
  },
  {
    "url": "css/common/layout.css",
    "revision": "43c3d3502ccbd8f1262702fe3daaf22f"
  },
  {
    "url": "css/common/text.css",
    "revision": "3dd02835d964bc6c577d2680c1ae7577"
  },
  {
    "url": "css/common/theme.css",
    "revision": "fe3a97164e79da0f5678c648f896c5ad"
  },
  {
    "url": "css/README.html",
    "revision": "6a4fe1ff92acfccf5d3e40f0f81fb427"
  },
  {
    "url": "index.css",
    "revision": "dfbda19f9f05da247c1d9759f237e35b"
  },
  {
    "url": "index.hgui.js",
    "revision": "70a82243b0db6eed33a91ac3c103da0f"
  },
  {
    "url": "index.html",
    "revision": "a9ca06adef24c47d1af70edb57ddcf30"
  },
  {
    "url": "index.js",
    "revision": "fb45aefcda9e4ec6c47a94219d5c3f32"
  },
  {
    "url": "index.options.js",
    "revision": "4fdfb674cea40d62479ddd059ef28c32"
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
    "revision": "36675d9b6707e80a63d086deb8582e18"
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
    "revision": "69e39b41cfb231bb473effd095dea19f"
  },
  {
    "url": "js/zuix/zuix-bundler.min.js",
    "revision": "523f47f0aad2c5c31743ed32474e8c6f"
  },
  {
    "url": "js/zuix/zuix.js",
    "revision": "d7d2e0d58b00800d1dec563eacd4e5c0"
  },
  {
    "url": "js/zuix/zuix.min.js",
    "revision": "085e4af98d5a676849725a5869aa7678"
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
    "revision": "ae8a9c80d9dc348141daff5afd585f02"
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
    "url": "images/widgets/air conditioning indoor.svg",
    "revision": "2d11f05debcbd456ae7d07b74f6fb939"
  },
  {
    "url": "images/widgets/air conditioning outdoor.svg",
    "revision": "67fac213de52eac62f14e74a199f8083"
  },
  {
    "url": "images/widgets/bulb.svg",
    "revision": "45c1e5b82bc61d4be1834c8a13c23fc7"
  },
  {
    "url": "images/widgets/cold.svg",
    "revision": "6be93ce6bd8c542e9af0cc97cad7704f"
  },
  {
    "url": "images/widgets/dome camera.svg",
    "revision": "e304c15ec19984523e941588d1cc3ede"
  },
  {
    "url": "images/widgets/door handle.svg",
    "revision": "7c1eff97a6403cc82adf51f41425c555"
  },
  {
    "url": "images/widgets/doorbell.svg",
    "revision": "2184896670e3d1cf36e8a236bb7c56fe"
  },
  {
    "url": "images/widgets/drop.svg",
    "revision": "7d1196d01f9c21058672824503a9581b"
  },
  {
    "url": "images/widgets/electric range.svg",
    "revision": "3a674bc61522411dcd45bc25e0f40e8e"
  },
  {
    "url": "images/widgets/empty.svg",
    "revision": "efd685f4843279556438eeb8eaa1f72c"
  },
  {
    "url": "images/widgets/eye.svg",
    "revision": "bab2f7af3be57fd54f8ef43cd67b447b"
  },
  {
    "url": "images/widgets/garage.svg",
    "revision": "709c492dc6372bddf18628e3efb1d77d"
  },
  {
    "url": "images/widgets/heater.svg",
    "revision": "e1c983f6a9e8a2e5c51f3d544ae6a071"
  },
  {
    "url": "images/widgets/houseplant.svg",
    "revision": "5cd2ba7b0fcb95c6444e787de7ed3b39"
  },
  {
    "url": "images/widgets/ip camera.svg",
    "revision": "a328fe7000fc5eb702cd14c900699af6"
  },
  {
    "url": "images/widgets/key.svg",
    "revision": "08e2291f366771752ef3c6ce7a651234"
  },
  {
    "url": "images/widgets/lock a.svg",
    "revision": "5f9f5d98b32eb3c79ffed9fc0fb8300f"
  },
  {
    "url": "images/widgets/lock b.svg",
    "revision": "e32cd6c314d0362ee96a5da9f9ee835d"
  },
  {
    "url": "images/widgets/loudspeakers.svg",
    "revision": "de9e8b244027a9fd6af54fba117b47a6"
  },
  {
    "url": "images/widgets/pet.svg",
    "revision": "83afd1b90ec13d19a1f30f02fcf17e55"
  },
  {
    "url": "images/widgets/plug.svg",
    "revision": "ca9543cbde3ff328e8b97d9fc040bf02"
  },
  {
    "url": "images/widgets/pool.svg",
    "revision": "9a0fc408b1ff457249abf5d1c2631566"
  },
  {
    "url": "images/widgets/power button.svg",
    "revision": "d41d8cd98f00b204e9800998ecf8427e"
  },
  {
    "url": "images/widgets/power.svg",
    "revision": "d41d8cd98f00b204e9800998ecf8427e"
  },
  {
    "url": "images/widgets/recycling.svg",
    "revision": "d41d8cd98f00b204e9800998ecf8427e"
  },
  {
    "url": "images/widgets/remote control.svg",
    "revision": "d41d8cd98f00b204e9800998ecf8427e"
  },
  {
    "url": "images/widgets/router.svg",
    "revision": "d41d8cd98f00b204e9800998ecf8427e"
  },
  {
    "url": "images/widgets/sensor.svg",
    "revision": "d41d8cd98f00b204e9800998ecf8427e"
  },
  {
    "url": "images/widgets/smartphone.svg",
    "revision": "d41d8cd98f00b204e9800998ecf8427e"
  },
  {
    "url": "images/widgets/socket f.svg",
    "revision": "d41d8cd98f00b204e9800998ecf8427e"
  },
  {
    "url": "images/widgets/socket i.svg",
    "revision": "d41d8cd98f00b204e9800998ecf8427e"
  },
  {
    "url": "images/widgets/socket.svg",
    "revision": "d41d8cd98f00b204e9800998ecf8427e"
  },
  {
    "url": "images/widgets/solar panel.svg",
    "revision": "d41d8cd98f00b204e9800998ecf8427e"
  },
  {
    "url": "images/widgets/sun.svg",
    "revision": "d41d8cd98f00b204e9800998ecf8427e"
  },
  {
    "url": "images/widgets/temperature.svg",
    "revision": "d41d8cd98f00b204e9800998ecf8427e"
  },
  {
    "url": "images/widgets/thermostat.svg",
    "revision": "d41d8cd98f00b204e9800998ecf8427e"
  },
  {
    "url": "images/widgets/tv.svg",
    "revision": "d41d8cd98f00b204e9800998ecf8427e"
  },
  {
    "url": "images/widgets/vacuum cleaning robot.svg",
    "revision": "d41d8cd98f00b204e9800998ecf8427e"
  },
  {
    "url": "images/widgets/weather.svg",
    "revision": "c16be5c6256d7467fc685fe54a7d2173"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerRoute(/\.(?:png|jpg|jpeg|svg)$/, workbox.strategies.cacheFirst({ "cacheName":"images", plugins: [new workbox.expiration.Plugin({"maxEntries":50,"purgeOnQuotaError":false})] }), 'GET');
workbox.routing.registerRoute(/\.(?:html|json|js|css)$/, workbox.strategies.cacheFirst({ "cacheName":"default", plugins: [new workbox.expiration.Plugin({"maxEntries":50,"purgeOnQuotaError":false})] }), 'GET');
