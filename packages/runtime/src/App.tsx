import React, { useEffect, useState } from 'react';
import {
  createBox,
  color,
  vec4,
  createEngine,
  createScene,
  createPerspectiveCamera,
  createPointLight,
  createGround,
} from '../lib';

import { memo } from 'react';

function App() {
  // const [fov, setFov] = useState("150");
  // const [cz, setCZ] = useState(0);
  // const [cx, setCX] = useState(0);
  // const [n, setN] = useState(1);
  // const [f, setF] = useState(99);
  const [pll, setPll] = useState(1);
  const [plx, setPlx] = useState(-5);
  const [ply, setPly] = useState(0);
  const [plz, setPlz] = useState(-3);

  useEffect(() => {
    (async () => {
      const canvas = document.getElementById('webgpu-canvas') as HTMLCanvasElement;

      if (!canvas) {
        console.error('canvas is not exist.');
      }

      const engine = createEngine({});
      const scene = createScene(engine, {});

      const camera = createPerspectiveCamera(
        'camera',
        { fov: 120, target: vec4(0, 0, 0), position: vec4(0, 5, -5), up: vec4(0, 1, 1) },
        scene,
      );
      const d = 100;
      // const camera = createOrthographicCamera(
      //   'c2',
      //   {
      //     position: vec4(0, 10, 0),
      //     up: vec4(0, 0, 1),
      //     target: vec4(0, 0, 0),
      //     l: -d,
      //     r: d,
      //     n: -d,
      //     f: d,
      //     b: -d,
      //     t: d,
      //   },
      //   scene,
      // );

      const g = createGround('ground1', scene, {
        width: 20,
        height: 20,
        color: color(0.35, 0.35, 0.35),
      });

      g.translate(0, -2, 0);
      const red = color(0.95, 0, 0);
      const box = createBox('box', scene, {
        width: 1,
        height: 1,
        depth: 1,
        color: red,
      });
      const box1 = createBox('box', scene, {
        width: 0.4,
        height: 0.2,
        depth: 0.4,
        color: red,
      });

      const box3 = createBox('box', scene, {
        width: 0.4,
        height: 0.2,
        depth: 0.4,
        color: red,
      });
      box.translate(-2, -1, 2);
      box1.translate(2, -1, 2);

      box3.translate(2, -1, -2);

      const light = createPointLight('light', scene, {
        color: color(1, 1, 1),
        render: false,
        position: vec4(plx, ply, plz),
        intensity: pll,
        radius: 80,
      });

      await engine.loop(currentFrame => {
        console.log(light.getPosition());

        scene.render();
      }, 1000);
    })();
  }, []);
  const itemStyle = { display: 'flex', gap: '1em' };
  return (
    <>
      <div
        style={{
          position: 'relative',
        }}>
        <div
          style={{
            position: 'absolute',
            background: 'white',
            top: 1,
            right: 1,
            display: 'flex',
            flexDirection: 'column',
            padding: '1em',
            borderRadius: '4px',
          }}>
          <div style={itemStyle}>
            <div>Point Light color</div> <input id='plc' type='color' />
          </div>
          <div style={itemStyle}>
            <div>Point Light x</div>
            <input
              id='plx'
              type='range'
              min='-5'
              max='5'
              step='0.02'
              onChange={e => {
                setPlx(Number(e.target.value));
              }}
              value={plx}
            />
          </div>
          <div style={itemStyle}>
            <span>Point Light y</span>
            <input id='ply' type='range' min='-5' max='5' step='0.01' />
          </div>
          <div style={itemStyle}>
            <span>Point Light z</span>
            <input id='plz' type='range' min='-5' max='5' step='0.01' />
          </div>
          <div style={itemStyle}>
            <span>Point Light Intensity</span>
            <input
              id='pll'
              type='range'
              min='0'
              max='10'
              step='0.05'
              value={pll}
              onChange={e => {
                setPll(Number(e.target.value));
              }}
            />
          </div>
          <div style={itemStyle}>
            <span>Point Light Radius</span>
            <input id='plr' type='range' min='0' max='50' step='0.1' />
          </div>
        </div>
        <canvas id='webgpu-canvas' width='512' height='512' style={{}}></canvas>
      </div>
      {/* <div className="inputs">
    
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
