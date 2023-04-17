import React, { useEffect, useState } from 'react';
import {
  createBox,
  createSphere,
  vec4,
  createEngine,
  createScene,
  createPerspectiveCamera,
  createPointLight,
} from '../lib';

import { memo } from 'react';
import { createGround } from '../lib/meshes';
import { color, randomColor } from '../lib/math/color';

function App() {
  // const [fov, setFov] = useState("150");
  // const [cz, setCZ] = useState(0);
  // const [cx, setCX] = useState(0);
  // const [n, setN] = useState(1);
  // const [f, setF] = useState(99);
  useEffect(() => {
    (async () => {
      const canvas = document.getElementById('webgpu-canvas') as HTMLCanvasElement;

      if (!canvas) {
        console.error('canvas is not exist.');
      }

      const engine = createEngine(canvas, {});
      const scene = createScene(engine, {});

      const camera = createPerspectiveCamera(
        'camera',
        { fov: 70, target: vec4(0, 0, 0), position: vec4(0, 5, -5), up: vec4(0, 1, 1) },
        scene,
      );

      camera.attachControl(canvas);

      const g = createGround('ground1', scene, {
        width: 10,
        height: 10,
        color: color(0.55, 0.55, 0.55),
      });

      g.translate(0, -3, 0);
      const red = color(1, 0, 0);
      const box = createBox('box', scene, {
        width: 0.2,
        height: 0.2,
        depth: 0.2,
        color: red,
      });
      const box1 = createBox('box', scene, {
        width: 0.2,
        height: 0.2,
        depth: 0.4,
        color: red,
      });
      const box2 = createBox('box', scene, {
        width: 0.2,
        height: 0.3,
        depth: 0.2,
        color: red,
      });
      const box3 = createBox('box', scene, {
        width: 0.4,
        height: 0.2,
        depth: 0.4,
        color: red,
      });
      box.translate(-1, -1, 1);
      box1.translate(1, -1, 1);

      box2.translate(-1, -1, -1);
      box3.translate(1, -1, -1);

      const light = createPointLight('light', scene, {
        color: color(1, 1, 1),
        render: false,
        position: vec4(-5, 3, -5),
        intensity: 2.5,
        radius: 70,
      });

      await engine.loop(() => {
        scene.render();
        light.translate(0.05, 0, 0.05);
      }, 500);
    })();
  }, []);
  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '1em',
        }}>
        <canvas
          id='webgpu-canvas'
          width='600'
          height='600
        .'></canvas>
      </div>
      {/* <div className="inputs">
        <div>
          <span>Point Light color</span> <input id="plc" type="color" />
        </div>
        <div>
          <span>Point Light x</span>
          <input id="plx" type="range" min="-5" max="5" step="0.01" value="0" />
        </div>
        <div>
          <span>Point Light y</span>
          <input id="ply" type="range" min="-5" max="5" step="0.01" value="0" />
        </div>
        <div>
          <span>Point Light z</span>
          <input id="plz" type="range" min="-5" max="5" step="0.01" value="0" />
        </div>
        <div>
          <span>Point Light Intensity</span>
          <input id="pli" type="range" min="0" max="10" step="0.05" value="1" />
        </div>
        <div>
          <span>Point Light Radius</span>
          <input id="plr" type="range" min="0" max="50" step="0.1" value="5" />
        </div>

        <div>
          <span>camera.x:{cx}</span>
          <input
            id="cx"
            type="range"
            min="-1"
            max="1"
            step="0.01"
            value={cx}
            onChange={(e) => {
              setCX((e.target.value as any) * 1);
            }}
          />
        </div>

        <div>
          <span>camera.z:{cz}</span>
          <input
            id="cz"
            type="range"
            min="-2"
            max="1"
            step="0.1"
            value={cz}
            onChange={(e) => {
              setCZ((e.target.value as any) * 1);
            }}
          />
        </div>

        <div>
          <span>fov:{fov}</span>
          <input
            onChange={(e) => {
              setFov(e.target.value);
            }}
            id="fov"
            type="range"
            min="0"
            max="180"
            step="1"
            value={fov}
          />
        </div>
        <div>
          <span>n:{n}</span>
          <input
            onChange={(e) => {
              setN((e.target.value as any) * 1);
            }}
            id="n"
            type="range"
            min="-5"
            max="10"
            step="1"
            value={n}
          />
        </div>
        <div>
          <span>f:{f}</span>
          <input
            onChange={(e) => {
              setF((e.target.value as any) * 1);
            }}
            id="f"
            type="range"
            min="1"
            max="100"
            step="1"
            value={f}
          />
        </div>
      </div> */}
    </>
  );
}

export default memo(App);
