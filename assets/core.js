import AOS from "https://unpkg.com/aos@2.3.1/dist/aos.js";
import getContrastColor from './luminance.js';


AOS.init();

console.log(getContrastColor("#ffffff")); // Output: "black"
console.log(getContrastColor("rgb(0, 0, 0)")); // Output: "light"
console.log(getContrastColor({ h: 0, s: 1, v: 1 })); // Output: "light"
