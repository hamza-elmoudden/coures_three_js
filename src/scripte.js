import * as THREE from "three";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// Create a new Three.js scene
const scene = new THREE.Scene();

// Select the canvas element where the 3D content will be rendered
const canvas = document.querySelector("canvas.webGL");

// Define the size of the rendering area
const size = {
    Width: 900,
    Height: 400,
};

// Create a perspective camera with a 75-degree field of view
// Aspect ratio is based on the size, and the view frustum ranges from 0.1 to 100 units
// - The first parameter (75) is the field of view (FOV) in degrees, defining how wide the view angle is.
// - The second parameter (size.Width / size.Height) sets the aspect ratio to prevent distortion.
// - The third parameter (0.1) is the near clipping plane, meaning objects closer than 0.1 units will not be visible.
// - The fourth parameter (100) is the far clipping plane, meaning objects farther than 100 units will not be visible.
const camera = new THREE.PerspectiveCamera(75, size.Width / size.Height, 0.1, 100);

// Set the initial camera position
camera.position.z = 3;

// Add orbit controls to allow camera manipulation with mouse or touch input
const control = new OrbitControls(camera, canvas);

// Create a cube geometry (1x1x1 dimensions) and a basic material with a custom color
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff3A00 });
const cube = new THREE.Mesh(geometry, material);

// Add the cube to the scene
scene.add(cube);

// Ensure the camera is initially looking at the cube's position
camera.lookAt(cube.position);

// Set up the WebGL renderer and link it to the canvas
const render = new THREE.WebGLRenderer({
    canvas
});

// Set the renderer size to match the defined dimensions
render.setSize(size.Width, size.Height);

// Create a clock to keep track of elapsed time for animations
const clock = new THREE.Clock();

// Animation loop to update the scene and render it on each frame
const Animation = () => {
    // Get the elapsed time since the clock started
    const time = clock.getElapsedTime();

    /**
     * use time for represents the total elapsed time since the clock started. 
     * This ensures that the animations are frame-rate independent, 
     * meaning the animation speed won't vary based on the performance of the device rendering the scene.
     */

    // Animate the cube's rotation on both the X and Y axes over time
    cube.rotation.y = time; // Rotate the cube around the Y-axis
    cube.rotation.x = time; // Rotate the cube around the X-axis

    // Animate the cube's position using sine and cosine functions for smooth oscillation
    cube.position.y = Math.sin(time); // Vertical oscillation
    cube.position.x = Math.cos(time); // Horizontal oscillation

    // Request the next animation frame
    window.requestAnimationFrame(Animation); //or use requestAnimationFrame(Animation)

    // Update the controls to reflect any user interaction
    control.update();

    // Render the scene from the camera's perspective
    render.render(scene, camera);
};

// Start the animation loop
Animation();
