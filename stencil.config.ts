import { Config } from "@stencil/core";
import dotenvPlugin from "rollup-plugin-dotenv";

export const config: Config = {
  namespace: "ios-14-weather-widget",
  globalStyle: "src/global/style.css",
  taskQueue: "async",
  outputTargets: [
    {
      type: "dist",
      esmLoaderPath: "../loader",
    },
    {
      type: "docs-readme",
    },
    {
      type: "www",
      copy: [
        {
          src: "global/assets/background.jpg",
          dest: "assets/background.jpg",
        },
      ],
      serviceWorker: null, // disable service workers
    },
  ],
  plugins: [dotenvPlugin()],
};
