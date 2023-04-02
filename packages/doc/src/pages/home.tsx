import { createBox, createSphere, vec3, createEngine, createScene, createPerspectiveCamera, createPointLight,createGround,scale, translate } from "next3d";
import React,{ useEffect } from 'react';
import ReactDOM from 'react-dom';

function Home() {
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