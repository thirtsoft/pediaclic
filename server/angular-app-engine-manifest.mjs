
export default {
  basePath: "/pediaclic",
  allowedHosts: [],
  supportedLocales: {
  "en-US": ""
},
  entryPoints: {
    "": () => import('./main.server.mjs')
  },
};
