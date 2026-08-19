const fs = require('fs');

const hexColor = '4338CA'; // Indigo from Master App
const c = `%23${hexColor}`;

// Higher opacities for "very visible"
const svg = `data:image/svg+xml,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' width='400' height='400' fill='none'>`)}` +
  `%3Ccircle cx='80' cy='65' r='3.5' fill='${c}' opacity='.25'/%3E` +
  `%3Cellipse cx='80' cy='65' rx='22' ry='9' stroke='${c}' stroke-width='1.2' opacity='.20' transform='rotate(-35 80 65)'/%3E` +
  `%3Cellipse cx='80' cy='65' rx='22' ry='9' stroke='${c}' stroke-width='1.2' opacity='.20' transform='rotate(35 80 65)'/%3E` +
  `%3Cellipse cx='80' cy='65' rx='22' ry='9' stroke='${c}' stroke-width='1.2' opacity='.20'/%3E` +
  `%3Cpath d='M300 75v22l-6 14h28l-6-14V75z' stroke='${c}' stroke-width='1.2' opacity='.20' stroke-linejoin='round'/%3E` +
  `%3Cline x1='295' y1='80' x2='317' y2='80' stroke='${c}' stroke-width='1' opacity='.15'/%3E` +
  `%3Ccircle cx='306' cy='100' r='2' fill='${c}' opacity='.15'/%3E` +
  `%3Ccircle cx='200' cy='200' r='12' stroke='${c}' stroke-width='1.2' opacity='.20'/%3E` +
  `%3Ccircle cx='200' cy='200' r='5' stroke='${c}' stroke-width='1.2' opacity='.20'/%3E` +
  `%3Cline x1='200' y1='188' x2='200' y2='193' stroke='${c}' stroke-width='1.2' opacity='.20'/%3E` +
  `%3Cline x1='200' y1='207' x2='200' y2='212' stroke='${c}' stroke-width='1.2' opacity='.20'/%3E` +
  `%3Cline x1='188' y1='200' x2='193' y2='200' stroke='${c}' stroke-width='1.2' opacity='.20'/%3E` +
  `%3Cline x1='207' y1='200' x2='212' y2='200' stroke='${c}' stroke-width='1.2' opacity='.20'/%3E` +
  `%3Cpath d='M90 320h25v-30h30v30h25' stroke='${c}' stroke-width='1.2' opacity='.20' stroke-linecap='round' stroke-linejoin='round'/%3E` +
  `%3Ccircle cx='115' cy='320' r='3' fill='${c}' opacity='.20'/%3E` +
  `%3Ccircle cx='145' cy='290' r='3' fill='${c}' opacity='.20'/%3E` +
  `%3Cpath d='M345 25q14 18-2 36q-16 18 2 36' stroke='${c}' stroke-width='1.2' opacity='.20'/%3E` +
  `%3Cpath d='M358 25q-14 18 2 36q16 18-2 36' stroke='${c}' stroke-width='1.2' opacity='.20'/%3E` +
  `%3Cline x1='343' y1='43' x2='360' y2='43' stroke='${c}' stroke-width='1' opacity='.15'/%3E` +
  `%3Cline x1='343' y1='61' x2='360' y2='61' stroke='${c}' stroke-width='1' opacity='.15'/%3E` +
  `%3Cline x1='343' y1='79' x2='360' y2='79' stroke='${c}' stroke-width='1' opacity='.15'/%3E` +
  `%3Cpath d='M50 180h16l-12 14 12 14h-16' stroke='${c}' stroke-width='1.5' opacity='.25' stroke-linejoin='round' stroke-linecap='round'/%3E` +
  `%3Cpath d='M352 245h-18M340 245v18M348 245v16' stroke='${c}' stroke-width='1.5' opacity='.20' stroke-linecap='round'/%3E` +
  `%3Cpath d='M55 345l5 5 10-20h12' stroke='${c}' stroke-width='1.2' opacity='.20' stroke-linejoin='round' stroke-linecap='round'/%3E` +
  `%3Ctext x='250' y='365' font-family='monospace' font-size='10' font-weight='bold' fill='${c}' opacity='.20'%3E01101%3C/text%3E` +
  `%3Ccircle cx='370' cy='165' r='4' fill='${c}' opacity='.25'/%3E` +
  `%3Ccircle cx='386' cy='152' r='3' fill='${c}' opacity='.20'/%3E` +
  `%3Cline x1='374' y1='162' x2='384' y2='154' stroke='${c}' stroke-width='1.2' opacity='.20'/%3E` +
  `%3Ccircle cx='356' cy='153' r='2.5' fill='${c}' opacity='.20'/%3E` +
  `%3Cline x1='367' y1='163' x2='358' y2='155' stroke='${c}' stroke-width='1.2' opacity='.20'/%3E` +
  `%3Cpath d='M180 55v14M173 62h14' stroke='${c}' stroke-width='1.5' opacity='.20' stroke-linecap='round'/%3E` +
  `%3Cpath d='M255 148c6-10 18-10 18 0s-12 10-18 0c-6-10-18-10-18 0s12 10 18 0' stroke='${c}' stroke-width='1.2' opacity='.20'/%3E` +
  `%3Ccircle cx='160' cy='345' r='2' fill='${c}' opacity='.20'/%3E` +
  `%3Ccircle cx='170' cy='338' r='1.5' fill='${c}' opacity='.20'/%3E` +
  `%3Ccircle cx='152' cy='352' r='1.5' fill='${c}' opacity='.20'/%3E` +
  `%3Cpath d='M280 200l12 20h-24z' stroke='${c}' stroke-width='1.2' opacity='.20' stroke-linejoin='round'/%3E` +
  `%3Cpath d='M20 260h8l4-6 8 12 8-12 8 12 4-6h8' stroke='${c}' stroke-width='1' opacity='.20' stroke-linecap='round' stroke-linejoin='round'/%3E` +
  `%3C/svg%3E`;

// Also create a white/transparent version for the dark login background!
const w = `%23FFFFFF`;
const svgDark = `data:image/svg+xml,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' width='400' height='400' fill='none'>`)}` +
  `%3Ccircle cx='80' cy='65' r='3.5' fill='${w}' opacity='.20'/%3E` +
  `%3Cellipse cx='80' cy='65' rx='22' ry='9' stroke='${w}' stroke-width='1.2' opacity='.15' transform='rotate(-35 80 65)'/%3E` +
  `%3Cellipse cx='80' cy='65' rx='22' ry='9' stroke='${w}' stroke-width='1.2' opacity='.15' transform='rotate(35 80 65)'/%3E` +
  `%3Cellipse cx='80' cy='65' rx='22' ry='9' stroke='${w}' stroke-width='1.2' opacity='.15'/%3E` +
  `%3Cpath d='M300 75v22l-6 14h28l-6-14V75z' stroke='${w}' stroke-width='1.2' opacity='.15' stroke-linejoin='round'/%3E` +
  `%3Cline x1='295' y1='80' x2='317' y2='80' stroke='${w}' stroke-width='1' opacity='.10'/%3E` +
  `%3Ccircle cx='306' cy='100' r='2' fill='${w}' opacity='.10'/%3E` +
  `%3Ccircle cx='200' cy='200' r='12' stroke='${w}' stroke-width='1.2' opacity='.15'/%3E` +
  `%3Ccircle cx='200' cy='200' r='5' stroke='${w}' stroke-width='1.2' opacity='.15'/%3E` +
  `%3Cline x1='200' y1='188' x2='200' y2='193' stroke='${w}' stroke-width='1.2' opacity='.15'/%3E` +
  `%3Cline x1='200' y1='207' x2='200' y2='212' stroke='${w}' stroke-width='1.2' opacity='.15'/%3E` +
  `%3Cline x1='188' y1='200' x2='193' y2='200' stroke='${w}' stroke-width='1.2' opacity='.15'/%3E` +
  `%3Cline x1='207' y1='200' x2='212' y2='200' stroke='${w}' stroke-width='1.2' opacity='.15'/%3E` +
  `%3Cpath d='M90 320h25v-30h30v30h25' stroke='${w}' stroke-width='1.2' opacity='.15' stroke-linecap='round' stroke-linejoin='round'/%3E` +
  `%3Ccircle cx='115' cy='320' r='3' fill='${w}' opacity='.15'/%3E` +
  `%3Ccircle cx='145' cy='290' r='3' fill='${w}' opacity='.15'/%3E` +
  `%3Cpath d='M345 25q14 18-2 36q-16 18 2 36' stroke='${w}' stroke-width='1.2' opacity='.15'/%3E` +
  `%3Cpath d='M358 25q-14 18 2 36q16 18-2 36' stroke='${w}' stroke-width='1.2' opacity='.15'/%3E` +
  `%3Cline x1='343' y1='43' x2='360' y2='43' stroke='${w}' stroke-width='1' opacity='.10'/%3E` +
  `%3Cline x1='343' y1='61' x2='360' y2='61' stroke='${w}' stroke-width='1' opacity='.10'/%3E` +
  `%3Cline x1='343' y1='79' x2='360' y2='79' stroke='${w}' stroke-width='1' opacity='.10'/%3E` +
  `%3Cpath d='M50 180h16l-12 14 12 14h-16' stroke='${w}' stroke-width='1.5' opacity='.20' stroke-linejoin='round' stroke-linecap='round'/%3E` +
  `%3Cpath d='M352 245h-18M340 245v18M348 245v16' stroke='${w}' stroke-width='1.5' opacity='.15' stroke-linecap='round'/%3E` +
  `%3Cpath d='M55 345l5 5 10-20h12' stroke='${w}' stroke-width='1.2' opacity='.15' stroke-linejoin='round' stroke-linecap='round'/%3E` +
  `%3Ctext x='250' y='365' font-family='monospace' font-size='10' font-weight='bold' fill='${w}' opacity='.15'%3E01101%3C/text%3E` +
  `%3Ccircle cx='370' cy='165' r='4' fill='${w}' opacity='.20'/%3E` +
  `%3Ccircle cx='386' cy='152' r='3' fill='${w}' opacity='.15'/%3E` +
  `%3Cline x1='374' y1='162' x2='384' y2='154' stroke='${w}' stroke-width='1.2' opacity='.15'/%3E` +
  `%3Ccircle cx='356' cy='153' r='2.5' fill='${w}' opacity='.15'/%3E` +
  `%3Cline x1='367' y1='163' x2='358' y2='155' stroke='${w}' stroke-width='1.2' opacity='.15'/%3E` +
  `%3Cpath d='M180 55v14M173 62h14' stroke='${w}' stroke-width='1.5' opacity='.15' stroke-linecap='round'/%3E` +
  `%3Cpath d='M255 148c6-10 18-10 18 0s-12 10-18 0c-6-10-18-10-18 0s12 10 18 0' stroke='${w}' stroke-width='1.2' opacity='.15'/%3E` +
  `%3Ccircle cx='160' cy='345' r='2' fill='${w}' opacity='.15'/%3E` +
  `%3Ccircle cx='170' cy='338' r='1.5' fill='${w}' opacity='.15'/%3E` +
  `%3Ccircle cx='152' cy='352' r='1.5' fill='${w}' opacity='.15'/%3E` +
  `%3Cpath d='M280 200l12 20h-24z' stroke='${w}' stroke-width='1.2' opacity='.15' stroke-linejoin='round'/%3E` +
  `%3Cpath d='M20 260h8l4-6 8 12 8-12 8 12 4-6h8' stroke='${w}' stroke-width='1' opacity='.15' stroke-linecap='round' stroke-linejoin='round'/%3E` +
  `%3C/svg%3E`;

fs.writeFileSync('C:/Users/kpand/.gemini/antigravity/scratch/svg_high_opacity.js', 
  `module.exports = { lightSvg: "${svg}", darkSvg: "${svgDark}" };`
);
