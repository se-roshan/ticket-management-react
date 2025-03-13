// // import { StrictMode } from 'react'
// // import { createRoot } from 'react-dom/client'
// // import './index.css'
// // import App from './App.jsx'
// // import $ from "jquery";
// // import "bootstrap/dist/css/bootstrap.min.css"; // ✅ Global Bootstrap Import
// // import "bootstrap/dist/js/bootstrap.bundle.min.js"; // ✅ Include Bootstrap JavaScript (for modals, tooltips, etc.)

// // //import "bootstrap/dist/css/bootstrap.min.css";
// // import "select2/dist/css/select2.min.css";
// // import "select2/dist/js/select2.min.js";

// // createRoot(document.getElementById('root')).render(
// //   // <StrictMode>
// //     <App />
// //   // </StrictMode>,
// // )

// import $ from "jquery";
// window.$ = window.jQuery = $; // ✅ Ensure jQuery is globally available

// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.bundle.min.js";

// import "select2/dist/css/select2.min.css";
// import "select2/dist/js/select2.min.js"; // ✅ Ensure this loads AFTER jQuery

// import { StrictMode } from "react";
// import { createRoot } from "react-dom/client";
// import "./index.css";
// import App from "./App.jsx";

// // Debugging logs
// console.log("jQuery version:", $.fn.jquery);
// console.log("Is Select2 available?", typeof $.fn.select2);

// createRoot(document.getElementById("root")).render(
//   // <StrictMode>
//   <App />
//   // </StrictMode>,
// );

import $ from "jquery"; 
window.$ = window.jQuery = $; // ✅ Make jQuery globally available

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

// ✅ Use "select2.full.min.js" to ensure all dependencies are included
import "select2/dist/css/select2.min.css";
import "select2/dist/js/select2.full.min.js"; 

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

// Debugging logs
console.log("jQuery version:", $.fn.jquery);
console.log("Is Select2 available?", typeof $.fn.select2);

createRoot(document.getElementById("root")).render(<App />);
