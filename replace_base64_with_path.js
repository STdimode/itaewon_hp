const fs = require('fs');

const htmlPath = 'cms/Main_v1.cshtml';
let html = fs.readFileSync(htmlPath, 'utf8');

let count = 1;
// Data URLs might have slightly different format like data:image/svg+xml;utf8,...
const newHtml = html.replace(/data:image\/([^;]+);([^"']+)/g, (match, type, data) => {
    let extension = type;
    if (type.includes('svg')) extension = 'svg';
    else if (type.includes('png')) extension = 'png';
    else if (type.includes('jpeg') || type.includes('jpg')) extension = 'jpg';

    // Check if it's already an unsplash url
    if (match.includes('unsplash.com')) return match;

    const newPath = `/UserData/itaewonmc/Layouts/itaewonmc_Layout/images/asset_${count}.${extension}`;
    count++;
    return newPath;
});

fs.writeFileSync(htmlPath, newHtml);
console.log(`Replaced ${count - 1} data URIs.`);
