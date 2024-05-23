function getHSL(){
    /*
     * Captures and returns hue, saturation, and lightness values from the color selector. 
    */
    return [
        document.getElementById("hue").value,
        document.getElementById("saturation").value,
        document.getElementById("lightness").value,
    ];
}
function getHSL2(){
    /*
     * Captures and returns hue, saturation. and lightness values from the second color selector. 
    */
    return [
        document.getElementById("hue2").value,
        document.getElementById("saturation2").value,
        document.getElementById("lightness2").value,
    ];
}

function setcolor(){ 
    /*
     * Manages the color selector, allowing the user to define the color based on their 
     * chosen hue, saturation, and lightness.
     */

    var [hue, sat, light] = getHSL();

    var color = hexColor(light);

    // Changes the color of the lightness and saturation inputs based on the hue value.
    document.getElementById("lightness").style.backgroundImage = 'linear-gradient(to right, #000000, hsl('+ hue +', 50%, 50%), #FFFFFF)';
    document.getElementById("saturation").style.backgroundImage = 'linear-gradient(to right, #808080, hsl('+ hue +', 50%, 50%))';

    // Sets the background color in the selector to the chosen color and updates the hex code.
    document.getElementById("mainColor").style.backgroundColor = 'hsl('+ hue +', '+ sat +'%, '+ light +'%)';
    document.getElementById("mainColorHex").style.color = color;
    document.getElementById("mainColorHex").innerHTML = rgbToHex(document.getElementById("mainColor").style.backgroundColor);
}

function setcolor2(){
    /*
     * This function manages the second color selector, allowing the user to 
     * define the color based on their chosen hue, saturation, and lightness.
     */
    
    var [hue, sat, light] = getHSL2();

    var color = hexColor(light);

    // Changes the color of the lightness and saturation inputs based on the hue value
    document.getElementById("lightness2").style.backgroundImage = 'linear-gradient(to right, #000000, hsl('+ hue +', 50%, 50%), #FFFFFF)';
    document.getElementById("saturation2").style.backgroundImage = 'linear-gradient(to right, #808080, hsl('+ hue +', 50%, 50%))';

    // Sets the background color in the selector to the chosen color and updates the hex code
    document.getElementById("mainColor2").style.backgroundColor = 'hsl('+ hue +', '+ sat +'%, '+ light +'%)';
    document.getElementById("mainColorHex2").style.color = color;
    document.getElementById("mainColorHex2").innerHTML = rgbToHex(document.getElementById("mainColor2").style.backgroundColor);
}

// Sets the `setColor` functions to execute when the page loads and whenever the user interacts with the inputs.
window.onload = setcolor();
document.getElementById("hue").addEventListener("input", setcolor);
document.getElementById("lightness").addEventListener("input", setcolor);
document.getElementById("saturation").addEventListener("input", setcolor);

window.onload = setcolor2();
document.getElementById("hue2").addEventListener("input", setcolor2);
document.getElementById("lightness2").addEventListener("input", setcolor2);
document.getElementById("saturation2").addEventListener("input", setcolor2);

function analogousColors(){
    /*
     * Analogous colors are the adjacent colors on the hue wheel, separated by a distance of 30°.
     * This function calculates the adjacent colors and generates the palette.
     */

    var [hue, sat, light] = getHSL();

    var color = hexColor(light);

    // Calculates analogous hues.
    var ang1 = Number(hue) - 30;
    if (ang1 < 0) ang1 += 360;
    var ang2 = Number(hue) + 30;
    if (ang2 > 360) ang2 -= 360; 

    setAuxColors(ang1, ang2, sat, light, color);

    mixThreeColors(ang1, hue, ang2, sat, light);

    changeDisplay();
    
}

function complementaryColor(){
    /*
     * Complementary color sits directly opposite on the color wheel, separated by a distance of 180°.
     * This function calculates the complementary color and generates the palette.
     */

    var [hue, sat, light] = getHSL();

    var color = hexColor(light);

    // Calculates the complementary hue.
    var comp = Number(hue)+180;
    if (comp > 360) comp -= 360;

    // Sets the background color in the `auxColor` to the calculated color and updates the hex code.
    document.getElementById("auxColor").style.backgroundColor = 'hsl('+ comp +', '+ sat +'%, '+ light +'%)';
    document.getElementById("auxColorHex").innerHTML = rgbToHex(document.getElementById("auxColor").style.backgroundColor);
    document.getElementById("auxColorHex").style.color = color;

    mixTwoColors(hue, comp, sat, sat, light, light);

    changeDisplay();
}

function splitColors(){
    /*
     * Split complementary colors are the analogous colors of the complementary color.
     * The function calculates the split complementary colors and generates the palette. 
     */
    var [hue, sat, light] = getHSL();

    var color = hexColor(light);

    // Calculates split complementary color hues.
    var comp1 = Number(hue) + 150;
    if (comp1 > 360) comp1 -= 360;
    var comp2 = Number(hue) + 210;
    if (comp2 > 360) comp2 -= 360;

    setAuxColors(comp1, comp2, sat, light, color);

    mixThreeColors(comp1, hue, comp2, sat, light);

    changeDisplay();
}

function triadicColors(){
    /*
     * Triadic colors are evenly spaced, with a distance of 120° between them.
     * This function calculates the triadic colors and generates the palette.
     */
    var [hue, sat, light] = getHSL();

    var color = hexColor(light);

    // Calculates the triadic color hues.
    var tri1 = Number(hue) + 120;
    if (tri1 > 360) tri1 -= 360;
    var tri2 = tri1 + 120;
    if (tri2 > 360) tri2 -= 360;

    setAuxColors(tri1, tri2, sat, light, color);
    
    mixThreeColors(hue, tri1, tri2, sat, light);

    changeDisplay();
}

function mixingColors(){
    /*
     * Generates the palette by mixing two user-selected colors at varying percentages.
     */

    var [hue1, sat1, light1] = getHSL();
    var [hue2, sat2, light2] = getHSL2();

    mixTwoColors(hue1, hue2, sat1, sat2, light1, light2);

    changeDisplay();
}

var hasExecuted; // Constrols how many times `turnPastelMono` is called
function monoColors(){
    /*
     * Generates the monochromatic palette by varying the lightness of a chosen color. 
     */

    var [hue, sat, light] = getHSL();

    var lightness = [98, 84, 70, 56, 42, 28, 14];

    var i = 1;

    lightness.forEach(l =>{
        createColor(hue, sat, l, hexColor(l), i);
        i++;
    });
    hasExecuted = false; // Every time a new Monochromatic Palette is generate able `turnPastelMono` to be executed.
    changeDisplay();
}

function turnNeon(){
    /*
     * Neon colors are brightful colors with high saturation.
     * This function converts palette colors to neon by setting saturation to 100
     * and adjust lightness for vibrancy.
     */
    var colors = getColors();

    var i = 1

    colors.forEach(color => {
        var [h, s, l] = rgbToHsl(color.style.backgroundColor);

        s = 100;
        if (l < 35) l = 35;

        createColor(h, s, l, hexColor(l), i);

        i++;
    });
}

function turnPastel(){
    /*
     * Pastel colors are soft colors with high lightness. 
     * This function converts palette colors to pastel by setting lightness to 70
     * and adjust saturation for delicacy.
    */
    var colors = getColors();

    var i = 1;

    colors.forEach(color => {

        var [h, s, l] = rgbToHsl(color.style.backgroundColor);

        if (s > 50) s = 50; 
        if (l < 65) l = 65;

        createColor(h, s, l, hexColor(l), i);

        i++;
    });
}

function turnNeonMono(){
    /*
     * This function converts the monochromatic palette colors to neon by setting saturation to 100.
     * Lighness remains the same.
     */
    var colors = getColors();

    var i = 1;

    colors.forEach(color => {
        var [h, s, l] = rgbToHsl(color.style.backgroundColor);
        s = 100;
        createColor(h, s, l, hexColor(l), i);
        i++;
    });

    hasExecuted = false; // Allows to turn pastel again.
}

function turnPastelMono(){
    /*
     * This function converts the monochromatic palette colors to pastel by increasing their 
     * lightness and adjusting their saturation.
     */

    if(hasExecuted) return;
    var colors = getColors();
    var light = [100, 85, 70, 60, 50, 40, 30];

    var i = 1;

    colors.forEach(color => {
        var [h, s, l] = rgbToHsl(color.style.backgroundColor);
        console.log(l);
        l = light[i-1];
        console.log(l);
        if (s > 40) s = 40; 
        createColor(h, s, l, hexColor(l), i);

        i++;
    });
    hasExecuted = true;
}

function mixThreeColors(hue1, hue2, hue3, sat, light){
    /*
   * Mixes three distinct hues to generate the palette. 
   * It's used by `analogousColors`, `splitColors`, and `triadicColors` functions.
   * All colors share the same saturation and lightness.
   * 
   * @param {number} hue1: First hue. (averaged with `hue2` for colors 2 and 3)
   * @param {number} hue2: Second hue. (averaged with `hue2` & `hue3` for colors 2, 3, 5 & 6)
   * @param {number} hue3: Third hue. (averaged with `hue2` for colors 5 and 6)
   * @param {number} sat: Saturation value.
   * @param {number} light: Lightness value.
   */
    
    var color = hexColor(light);

    var colors = [1, 0.65, 0.35, 0];
    var colors2 = [0.65, 0.35, 0];
    var i = 1;

    colors.forEach(c =>{
        createColor(calculateHue(hue1, hue2, c, (1-c), i), sat, light, color, i);
        i++;
    });
    colors2.forEach(c =>{
        createColor(calculateHue(hue2, hue3, c, (1-c), i), sat, light, color, i);
        i++;
    });
}

function mixTwoColors(hue1, hue2, sat1, sat2, light1, light2){
    /*
   * Mixes two distinct hues with varying weights to generate the palette. 
   * It's used by `complementaryColor` and `mixingColors` functions.
   * All values are averaged to blend colors.
   * 
   * @param {number} hue1: First hue.
   * @param {number} hue2: Second hue.
   * @param {number} sat1: First saturation.
   * @param {number} sat2: Second saturation.
   * @param {number} light1: First lightness.
   * @param {number} light2: Second lightness.
   */

    var per = [1, 0.875, 0.625, 0.5, 0.375, 0.125, 0];
    
    var i = 1;
    per.forEach(p =>{
        var sat = (sat1*p)+(sat2*(1-p));
        var light = (light1*p)+(light2*(1-p));
        var color = hexColor(light);
        createColor(calculateHue(hue1, hue2, p, (1-p), i), sat, light, color, i);
        i++;
    });
    
}

function getColors(){
    /*
     * Captures and returns the palette colors.
     */
    return [
        document.getElementById("color1"),
        document.getElementById("color2"),
        document.getElementById("color3"),
        document.getElementById("color4"),
        document.getElementById("color5"),
        document.getElementById("color6"),
        document.getElementById("color7"),
    ]
}

function setAuxColors(hue1, hue2, sat, light, color){
    /*
     * Applies the color and its hex code to the auxiliary colors.
     * Adjusts text color based on lightness for better contrast.
     * Auxiliary colors share the same saturation and lightness.
     *
     * @param {number} hue1: First hue value.
     * @param {number} hue2: Second hue value.
     * @param {number} sat: Saturation value.
     * @param {number} light: Lightness value.
     * @param {string} color: "#FFFFFF" (white) or "#000000" (black).
     */
    document.getElementById("auxColor").style.backgroundColor = 'hsl('+ hue1 +', '+ sat +'%, '+ light +'%)';
    document.getElementById("auxColorHex").innerHTML = rgbToHex(document.getElementById("auxColor").style.backgroundColor);
    document.getElementById("auxColorHex").style.color = color;
    document.getElementById("auxColor2").style.backgroundColor = 'hsl('+ hue2 +', '+ sat +'%, '+ light +'%)';
    document.getElementById("auxColorHex2").innerHTML = rgbToHex(document.getElementById("auxColor2").style.backgroundColor);
    document.getElementById("auxColorHex2").style.color = color;
}

function createColor(hue, sat, light, color, i){
    /*
     * Applies the color and its hex code to the element at index 'i'.
     * Adjusts text color based on lightness for better contrast.
     *
     * @param {number} hue: Hue value.
     * @param {number} sat: Saturation value.
     * @param {number} light: Lightness value.
     * @param {string} color: "#FFFFFF" (white) or "#000000" (black).
     * @param {number} i: Index (1 to 7).
     */
    document.getElementById(`color${i}`).style.backgroundColor = 'hsl('+hue+', '+sat+'%, '+light+'%)';
    document.getElementById(`colorHex${i}`).style.color = color;
    document.getElementById(`colorHex${i}`).innerHTML = rgbToHex(document.getElementById(`color${i}`).style.backgroundColor);
}

function changeDisplay(){
    /*
     * Displays the palettes, auxiliary colors and the Neon and Pastel buttons.
     * The display is adjusted to desktop and mobile devices.
     */
    document.getElementById("palette").style.display = 'flex';
    if(window.innerWidth > 830) document.getElementById("webButtons").style.display = 'flex';
    else document.getElementById("mobileButtons").style.display = 'flex';
    document.getElementById("auxColors").style.display = 'flex';
}

function rgbToHex(color){
    /*
     * Converts an RGB color to its hexadecimal code.
     *
     * @param {string} color: RGB color "rgb(r, g, b)".
     */
    color = color.slice(4, -1);
    var [r, g, b] = color.split(', ').map(Number);
    var values = [r, g, b].map(value => {
        let hex = value.toString(16);
        if (hex.length < 2){
            hex = "0" + hex;
        }
        return hex.toUpperCase();
    });
    [r, g, b] = values;
    var hex = "#" + r + g + b;
    return hex;
}

function hexColor(light){
    /*
     * Determines the hex code for the selected color based on the specified lightness.
     *
     * @param {number} light: Lightness value.
    */
    if (Number(light) < 51) return "#FFFFFF";
    else return "#000000";
}

function rgbToHsl(color){
    /*
     * Converts an RGB color to its hue, saturation, and lightness values (HSL).
     *
     * @param {string} color: RGB color "rgb(r, g, b)".
     */
    color = color.slice(4, -1);
    var [r, g, b] = color.split(', ').map(Number);
    r /= 255;
    g /= 255;
    b /= 255;
    var h, s, l;
    var max = Math.max(r, g, b);
    var min = Math.min(r, g, b);
    l = (max+min)/2;
    if(max == min){
        h = s = 0;
    }
    else{
        var diff = max - min;
        if (l > 0.5) s = diff/(2 - max - min);
        else s = diff / (max + min);
        switch(max){
            case r: 
                h = (g - b) / diff + (g < b ? 6 : 0); 
                break;
            case g: 
                h = (b - r) / diff + 2; 
                break;
            case b: 
                h = (r - g) / diff + 4; 
                break;
        }
    }
    h /= 6;
    return [h*360, s*100, l*100];
}

function calculateHue(hue1, hue2, per1, per2, i){
    /*
     * Finds the hue between two colors based on weights.
     * Handles special case for opposite colors (180 degrees apart). 
     * 
     * @param {number} hue1: First hue value.
     * @param {number} hue2: Second hue value.
     * @param {number} per1: First percentage.
     * @param {number} per2: Second percentage.
     * @param {number} i: Index (1-7).
     */
    hue1 = (hue1 % 360 + 360) % 360;
    hue2 = (hue2 % 360 + 360) % 360;

     if (Math.abs(hue1 - hue2) > 170 && Math.abs(hue1 - hue2) < 190) {
        var num = [0, 1, 2, 3, 4, 5, 6];
        return (hue1+(num[i-1]*30));
    }

    var rad1 = (hue1 * Math.PI) / 180;
    var rad2 = (hue2 * Math.PI) / 180;

    var x = Math.cos(rad1) * per1 + Math.cos(rad2) * per2;
    var y = Math.sin(rad1) * per1 + Math.sin(rad2) * per2;

    var huerad = Math.atan2(y, x);
    var hue = (huerad * 180) / Math.PI;

    if (hue < 0) hue += 360;
    return hue;
}
