
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: "/pediaclic/",
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "redirectTo": "/pediaclic/medecin-dashboard",
    "route": "/pediaclic"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-H2XOYDCO.js"
    ],
    "route": "/pediaclic/medecin-dashboard"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-W2KVTGFY.js"
    ],
    "route": "/pediaclic/medecin"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-Q4Q44SCG.js"
    ],
    "route": "/pediaclic/cabinet-dashboard"
  },
  {
    "renderMode": 2,
    "redirectTo": "/pediaclic/medecin-dashboard",
    "route": "/pediaclic/**"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    "index.csr.html": {size: 8722, hash: "0c61c49a5723ec3bba612e86ad72badfd69759d1af769a4688e9e369206bdd94", text: () => import("./assets-chunks/index_csr_html.mjs").then(m => m.default)},
    "index.server.html": {size: 8784, hash: "e2a1ed3d842d7b5634cce3e3540ed659bf61eb1037dee5f8bca9f74ff27217a1", text: () => import("./assets-chunks/index_server_html.mjs").then(m => m.default)},
    "cabinet-dashboard/index.html": {size: 58315, hash: "099a003e6f4b845321e92be85c4c1bd517778f84634a9126729f8f70987b21d1", text: () => import("./assets-chunks/cabinet-dashboard_index_html.mjs").then(m => m.default)},
    "medecin/index.html": {size: 44771, hash: "e1f1415807d0a43b86a0b3e0455332c227c413e39c93c1c17a358c65ade86ee8", text: () => import("./assets-chunks/medecin_index_html.mjs").then(m => m.default)},
    "medecin-dashboard/index.html": {size: 56370, hash: "d9eb403ad2ba5d4bfdd23aa98a8dd967ff60d143636730830db3bd80bee86a7a", text: () => import("./assets-chunks/medecin-dashboard_index_html.mjs").then(m => m.default)},
    "styles-36MTGJFB.css": {size: 90023, hash: "DA/yXhY9smo", text: () => import("./assets-chunks/styles-36MTGJFB_css.mjs").then(m => m.default)}
  },
};
