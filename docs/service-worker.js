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
    "revision": "f0f31b28ddec9bdd15084156d8b96059"
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
    "revision": "3824f5507b10042858c415729bf3826d"
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
    "revision": "d85f42cce978ae04de58cab484ee0fa0"
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
    "url": "app/widgets/program.css",
    "revision": "ac26b3b5d7cd229986db28bb7c6b5789"
  },
  {
    "url": "app/widgets/program.html",
    "revision": "ab832e0f5ca3fe1516716f35be40115d"
  },
  {
    "url": "app/widgets/program.js",
    "revision": "ffbff731e366b96b1f8a623cb2a588a8"
  },
  {
    "url": "app/widgets/sensor.css",
    "revision": "ceaf6173df86f6e850d91b8fbf574c34"
  },
  {
    "url": "app/widgets/sensor.html",
    "revision": "2f164bbb9a8d1cfc42327134af33ced2"
  },
  {
    "url": "app/widgets/sensor.js",
    "revision": "40e49692b6a91868b8614e94a29f54b9"
  },
  {
    "url": "app/widgets/switch.css",
    "revision": "0c9d7c8ffbcc4c82795d7d233b8e8e70"
  },
  {
    "url": "app/widgets/switch.html",
    "revision": "3358ac0ca79732ad045520c90004457a"
  },
  {
    "url": "app/widgets/switch.js",
    "revision": "9ac1aef91e80b64003d96317a8ad0918"
  },
  {
    "url": "app/widgets/timeclock.css",
    "revision": "3547977dda2efa110ca2366cdea20329"
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
    "revision": "33bc120e2566eb4fff4428ca9eb55124"
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
    "revision": "f26984049c038d9ac02013c60e7588bc"
  },
  {
    "url": "index.html",
    "revision": "f27bb88abc9bcef6f0331f3a1a2dd02a"
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
    "revision": "d304516320c19533b1aafed90c42ffc2"
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
    "revision": "8b00aac205b038970fafeb3e429fa388"
  },
  {
    "url": "js/zuix/zuix-bundler.min.js",
    "revision": "b2b1f6b259eb52ac69d3e488aeed3320"
  },
  {
    "url": "js/zuix/zuix.js",
    "revision": "3202373641c577975e90463ad06274b4"
  },
  {
    "url": "js/zuix/zuix.min.js",
    "revision": "f472d9cd35c4867242d8a79f5ed4382d"
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
    "revision": "2bebbc0d8b727eed8b5b98587bbf413e"
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
    "revision": "d41d8cd98f00b204e9800998ecf8427e"
  },
  {
    "url": "images/icons/desktop/apple-touch-icon.png",
    "revision": "d41d8cd98f00b204e9800998ecf8427e"
  },
  {
    "url": "images/icons/desktop/favicon-16x16.png",
    "revision": "d41d8cd98f00b204e9800998ecf8427e"
  },
  {
    "url": "images/icons/desktop/favicon-32x32.png",
    "revision": "d41d8cd98f00b204e9800998ecf8427e"
  },
  {
    "url": "images/icons/desktop/mstile-150x150.png",
    "revision": "d41d8cd98f00b204e9800998ecf8427e"
  },
  {
    "url": "images/icons/desktop/safari-pinned-tab.svg",
    "revision": "d41d8cd98f00b204e9800998ecf8427e"
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
    "revision": "897ac60c42c2b29f942ca2624dcb96bd"
  },
  {
    "url": "images/widgets/power.svg",
    "revision": "30725b2b912019737ec6a810b8813c91"
  },
  {
    "url": "images/widgets/recycling.svg",
    "revision": "774e777cf3afacbd821bd45e97b9da77"
  },
  {
    "url": "images/widgets/remote control.svg",
    "revision": "39fe37b965c20c8d8443bc566621f2eb"
  },
  {
    "url": "images/widgets/router.svg",
    "revision": "89dbdcb59cae8531604164fe1eba16a5"
  },
  {
    "url": "images/widgets/sensor.svg",
    "revision": "e36b8d99cb5410dce4005f77375316c2"
  },
  {
    "url": "images/widgets/smartphone.svg",
    "revision": "82eccdceb218fe26a29adf1b15db6b83"
  },
  {
    "url": "images/widgets/socket f.svg",
    "revision": "3cb0ca5f15537185fa98378e1ac49ae7"
  },
  {
    "url": "images/widgets/socket i.svg",
    "revision": "32007f4b64e792556c33f9878849aa36"
  },
  {
    "url": "images/widgets/socket.svg",
    "revision": "dc3d16667df6145350088e4c090d52da"
  },
  {
    "url": "images/widgets/solar panel.svg",
    "revision": "3998707052c0f5679beeb7f0f8f491c9"
  },
  {
    "url": "images/widgets/sun.svg",
    "revision": "bc7dce4e6166f043d99559182cc8e7ee"
  },
  {
    "url": "images/widgets/temperature.svg",
    "revision": "5f585a0b8df103c82ac0f9e7f70ea3db"
  },
  {
    "url": "images/widgets/thermostat.svg",
    "revision": "7c4a18e31facc516c285f9bba3cc06a0"
  },
  {
    "url": "images/widgets/tv.svg",
    "revision": "bc6fe4667b07b28de792b30787020384"
  },
  {
    "url": "images/widgets/vacuum cleaning robot.svg",
    "revision": "98aef983df55e355223bb9ab2806e467"
  },
  {
    "url": "images/widgets/ventilation.svg",
    "revision": "ce026cb36cb5a607146b28dc53251259"
  },
  {
    "url": "images/widgets/washer.svg",
    "revision": "d41d8cd98f00b204e9800998ecf8427e"
  },
  {
    "url": "images/widgets/weather.svg",
    "revision": "d41d8cd98f00b204e9800998ecf8427e"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerRoute(/\.(?:png|jpg|jpeg|svg)$/, workbox.strategies.cacheFirst({ "cacheName":"images", plugins: [new workbox.expiration.Plugin({"maxEntries":50,"purgeOnQuotaError":false})] }), 'GET');
workbox.routing.registerRoute(/\.(?:html|json|js|css)$/, workbox.strategies.cacheFirst({ "cacheName":"default", plugins: [new workbox.expiration.Plugin({"maxEntries":50,"purgeOnQuotaError":false})] }), 'GET');
