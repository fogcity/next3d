<!-- markdownlint-disable-next-line -->
<p align="center">
  <img width='13%' src="./images/logo.png" alt="Next 3D">
  <h1 align="center">Next 3D</h1>
</p>
</br>
<p align="center">
  The 3D tools helps you create the best web 3D app.
</p>
<div align="center">

[![license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/mui-org/material-ui/blob/HEAD/LICENSE)
[![npm latest package](https://img.shields.io/npm/v/@mui/material/latest.svg)](https://www.npmjs.com/package/@mui/material)
[![npm next package](https://img.shields.io/npm/v/@mui/material/next.svg)](https://www.npmjs.com/package/@mui/material)
[![npm downloads](https://img.shields.io/npm/dm/@mui/material.svg)](https://www.npmjs.com/package/@mui/material)
[![Coverage Status](https://img.shields.io/codecov/c/github/mui-org/material-ui/master.svg)](https://codecov.io/gh/mui-org/material-ui/branch/master)
[![Renovate status](https://img.shields.io/badge/renovate-enabled-brightgreen.svg)](https://github.com/mui-org/material-ui/issues/27062)
[![Average time to resolve an issue](https://isitmaintained.com/badge/resolution/mui-org/material-ui.svg)](https://isitmaintained.com/project/mui-org/material-ui 'Average time to resolve an issue')

English | [Português](./README-pt_BR.md) | [简体中文](./README-zh_CN.md) | [Українською](./README-uk_UA.md) | [Spanish](./README-sp_MX.md) | [日本語](./README-ja_JP.md)

  <img width='100%' src="./images/site.png" alt="Next 3D">
</div>

## ✨ Features

- 🌈 Cutting-edge and fashionable ui design.
- 📦 A set of high-quality React components out of the box.
- 🛡 Written in TypeScript with predictable static types.
- ⚙️ Whole package of design resources and development tools.
- 📖 Extensive documentation and demos
- 🌍 Support i18n, built-in N+ languages
- 🎨 Powerful theme customization in every detail.

## 🖥 Environment Support

- Modern browsers
- Server-side Rendering
- [Electron](https://www.electronjs.org/)

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/electron/electron_48x48.png" alt="Electron" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>Electron |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Edge                                                                                                                                                                                                 | last 2 versions                                                                                                                                                                                                  | last 2 versions                                                                                                                                                                                              | last 2 versions                                                                                                                                                                                              | last 2 versions                                                                                                                                                                                                      |

## ⭐ Support the project

If you feel awesome and want to support us in a small way, please consider starring and sharing the repo! This helps us getting known and grow the community. 🙏

<img src="https://raw.githubusercontent.com/lusaxweb/vuesax/master/public/github-vuesax-star.gif" alt="star" />

## 🔨 Documentation

Visit [https://s3d.org/docs](https://s3d.org/docs) to view the full documentation.

## 📦 Quick Start

1. Installation: Inside your React project directory, install Next3D by running either of the following:

```bash
yarn add @next3d/core @emotion/react
# or
npm i @next3d/core @emotion/react
```

2. Here is a quick react example to get you started, **it's all you need**:

```jsx
import { createBox, createSphere, vec3, createEngine, createScene, createPerspectiveCamera, createPointLight } from "../lib";
import { createGround } from "../lib/meshes";
import { scale, translate } from "../lib/transform";
import React,{ useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'rana-ui';

function App() {
  useEffect(() => {
    (async () => {
      const canvas = document.getElementById(
        "webgpu-canvas"
      ) as HTMLCanvasElement;

      if (!canvas) {
        console.error("canvas is not exist.");
      }

      const engine = createEngine(canvas);
      const scene = createScene(engine);

      const camera = createPerspectiveCamera(
        "c1",
        { target: vec3(0, 0, 1), position: vec3(0, 0, -1), up: vec3(0, 1, 0) },
        scene
      );


      const box = createBox("b", scene, {
        width: 2, height: 2, depth: 2
      });


      const light = createPointLight(
        "light1",
        { color: vec3(0, 0.4, 0), position: vec3(-1, -1, -1), intensity: 10, radius: 10 },
        scene
      );

      await engine.loop(() => {
        box.transform = translate(-0.02, 0, 0).mul(box.transform)
        scene.render();
      });
    })();
  }, []);

  return <canvas
          id="webgpu-canvas"
          width="512"
          height="512
        ."
        ></canvas>;
}

ReactDOM.render(<App />, document.querySelector('#app'));
```

## 🤝 Contribution

Please make sure to read the [Contributing Guide](https://github.com/fogcity/ui/blob/main/contributing.md) before making a pull request and commit with [Commit Guide](https://github.com/fogcity/ui/blob/main/commit-convention.md).

## ❤️ Sponsors

Thank you to all the people who already contributed to us!

## 🔗 License

[MIT](https://opensource.org/licenses/MIT)
