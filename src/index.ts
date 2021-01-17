import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { VRM, VRMSchema} from '@pixiv/three-vrm'
import {IK, IKChain, IKJoint, IKHelper} from 'three-ik'
import {FBXLoader} from 'three/examples/jsm/loaders/FBXLoader'


window.addEventListener("DOMContentLoaded", () => {
    // canvasの取得
    const canvas = document.getElementById('canvas')

    // シーンの生成
    const scene = new THREE.Scene()

    // カメラの生成
    const camera = new THREE.PerspectiveCamera(
        45, canvas.clientWidth / canvas.clientHeight, 0.1, 1000)
    camera.position.set(0, 1.3, -1)
    camera.rotation.set(0, Math.PI, 0)

    // レンダラーの生成
    const renderer = new THREE.WebGLRenderer()
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(canvas.clientWidth, canvas.clientHeight)
    renderer.setClearColor(0x7fbfff, 1.0)
    canvas.appendChild(renderer.domElement)

    // ライトの生成
    const light = new THREE.DirectionalLight(0xffffff)
    light.position.set(-1, 1, -1).normalize()
    scene.add(light)

    // VRMの読み込み
    const loader = new GLTFLoader()
    loader.load('./AliciaSolid.vrm',
        (gltf) => {
            VRM.from(gltf).then((vrm) => {

                // シーンへの追加
                scene.add(vrm.scene);

                // KeyShape
                vrm.blendShapeProxy.setValue(VRMSchema.BlendShapePresetName.Fun, 1.0);
                vrm.blendShapeProxy.setValue(VRMSchema.BlendShapePresetName.I, 1.0);
                vrm.blendShapeProxy.update();

            })
        }
    )

    // const objs = [];
    // const loaderFBX = new FBXLoader();
    // loaderFBX.load("./Capoeira.fbx", model => {
    //     // model is a THREE.Group (THREE.Object3D)                              
    //     const mixer = new THREE.AnimationMixer(model);
    //     // animations is a list of THREE.AnimationClip                          
    //     mixer.clipAction(model.animations[0]).play();
    //     scene.add(model);
    //     objs.push({ model, mixer });
    // });



    // フレーム毎に呼ばれる
    const update = () => {

        // frame
        requestAnimationFrame(update);
        renderer.render(scene, camera)
    }
    update()
})