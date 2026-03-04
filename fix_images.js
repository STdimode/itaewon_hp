const fs = require('fs');

const htmlPath = 'cms/Main_v1.cshtml';
let html = fs.readFileSync(htmlPath, 'utf8');

// Also need to check if there are other massive inlined SVGs (like <svg ...> directly in the DOM)
// I can't easily replace actual <svg> tags since they might be needed for the UI exactly, but usually SVG tags aren't too massive unless they are huge paths.
