const fs = require('fs');
const crypto = require('crypto');

const htmlPath = 'cms/Main_v1.cshtml';
let html = fs.readFileSync(htmlPath, 'utf8');

// The user specifies: "if the path of the image in the html code included figma asset, change the path to /UserData/itaewonmc/Layouts/itaewonmc_Layout/images"
// It's possible the user wants the unsplash URLs (which end in utm_source=figma) to be replaced by local paths? No, "figma asset" specifically refers to the `figma:asset/...` files in original React code which were compiled.
// Wait! Earlier I converted `figma:asset/c928059b5968d7fe6b03e6dc8000bd8013816286.png` and others to base64 `data:image/png;base64...`.
// The user probably wants those base64 strings (or the original figma asset paths if I had kept them) replaced with the new path `/UserData/itaewonmc/Layouts/itaewonmc_Layout/images/filename.png`.
// But wait, the user says "included figma asset". Did they mean my base64 strings?
// Let's find out how many base64 images are in the HTML.
