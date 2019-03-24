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

importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.4.1/workbox-sw.js");

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
    "revision": "8798b04789005cff20aa99a900b5e655"
  },
  {
    "url": "app/adapters/homegenie.js",
    "revision": "6abc03165d9f8e89436992e1f4c608eb"
  },
  {
    "url": "app/components/program.css",
    "revision": "df561bb6edfb5cfa1e3699493e66a056"
  },
  {
    "url": "app/components/program.html",
    "revision": "eaa563a0f473ae31826af3e835d0699f"
  },
  {
    "url": "app/components/program.js",
    "revision": "77633066654ef2ec30defdb0fe60024c"
  },
  {
    "url": "app/components/README.html",
    "revision": "4d933ef7afc7943ed5c13ac5185a5d88"
  },
  {
    "url": "app/components/switch.css",
    "revision": "ac9237322e1cbae86719707bc610fd0a"
  },
  {
    "url": "app/components/switch.html",
    "revision": "ef3268f424de2c03f14e5ec1e6a41361"
  },
  {
    "url": "app/components/switch.js",
    "revision": "c0b2cff5a119a8ca7631307ce3066ffc"
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
    "revision": "50a494e94d21d06bd171e467a87e3060"
  },
  {
    "url": "app/layout/header.html",
    "revision": "bd64785ca460d38942afef4618a9da57"
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
    "revision": "7e1884cbe84e9e4534437ecebe619adc"
  },
  {
    "url": "app/pages/home.html",
    "revision": "d6ea589957338f7e8c4eb09437b60aad"
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
    "url": "app/pages/setup/wizard.css",
    "revision": "e558a965f5db79376b1a31e2e88ef50f"
  },
  {
    "url": "app/pages/setup/wizard.html",
    "revision": "ff0d62ca86645debea1addebb549139d"
  },
  {
    "url": "app/pages/setup/wizard.js",
    "revision": "1cfca487656b1265213a93f7a7e394b2"
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
    "revision": "6d3219020defe3156694de586b20dfdc"
  },
  {
    "url": "app/shared/button_menu.js",
    "revision": "43c46366aa989104f8dabee90a2b1685"
  },
  {
    "url": "app/shared/main_menu.css",
    "revision": "dc7f1ee85f1c38935d5a30ef4e29b630"
  },
  {
    "url": "app/shared/main_menu.html",
    "revision": "1881a2c553cc62123d58104810edffd1"
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
    "revision": "43ee49be8fbbb74b432fe7302b9dd7e0"
  },
  {
    "url": "config.js",
    "revision": "21bf9612f3f1f4f36480f5490d9b4ada"
  },
  {
    "url": "index.css",
    "revision": "40e887d590a280938f5740dfb9e943a7"
  },
  {
    "url": "index.html",
    "revision": "e94ad3b3a64ae78d336377a44655fbe4"
  },
  {
    "url": "index.js",
    "revision": "20f3ba88b9f7ea32bfa8c2b818475b20"
  },
  {
    "url": "js/mqttws31.js",
    "revision": "5bcc29c376b9bfb78b73b259601c5f52"
  },
  {
    "url": "js/zuix/zuix-bundler.js",
    "revision": "396148535ac82a888cd2cd7a6708d942"
  },
  {
    "url": "js/zuix/zuix-bundler.min.js",
    "revision": "853a0a1ea6ed171d2ffa91bd2780ef47"
  },
  {
    "url": "js/zuix/zuix.js",
    "revision": "1c8816752cffc0d62918505e33b8d0f6"
  },
  {
    "url": "js/zuix/zuix.min.js",
    "revision": "6d62703319ca5dc92ec65ebf772a075c"
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
    "url": "test_protocols/index.html",
    "revision": "d2dcf920fc9967e7563504d4c8d60069"
  },
  {
    "url": "test_protocols/ws.html",
    "revision": "218a67431fdf95202b51f204f8213f3d"
  },
  {
    "url": "images/devices/bulb.png",
    "revision": "4dca54a739d44089ae998e47093d120e"
  },
  {
    "url": "images/devices/socket f.png",
    "revision": "44fe5ded79bf5a25914d0b2c66396c96"
  },
  {
    "url": "images/devices/socket.png",
    "revision": "44fe5ded79bf5a25914d0b2c66396c96"
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
    "url": "images/profile_icon.png",
    "revision": "8b7b22be809239e2b5214d326c9ab6cd"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerRoute(/\.(?:png|jpg|jpeg|svg)$/, workbox.strategies.cacheFirst({ cacheName: "images", plugins: [new workbox.expiration.Plugin({"maxEntries":50,"purgeOnQuotaError":false})] }), 'GET');
workbox.routing.registerRoute(/\.(?:html|json|js|css)$/, workbox.strategies.cacheFirst({ cacheName: "default", plugins: [new workbox.expiration.Plugin({"maxEntries":50,"purgeOnQuotaError":false})] }), 'GET');
