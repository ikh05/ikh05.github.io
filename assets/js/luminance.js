export function getContrastColor(input) {
  let r, g, b;

  // Jika input HEX (#RRGGBB atau #RGB)
  if (typeof input === "string" && input.startsWith("#")) {
    let hex = input.replace("#", "");
    if (hex.length === 3) {
      hex = hex.split("").map(x => x + x).join("");
    }
    r = parseInt(hex.substring(0, 2), 16);
    g = parseInt(hex.substring(2, 4), 16);
    b = parseInt(hex.substring(4, 6), 16);
  }

  // Jika input RGBA
  else if (typeof input === "string" && input.startsWith("rgb")) {
    const values = input.match(/\d+(\.\d+)?/g).map(Number);
    r = values[0];
    g = values[1];
    b = values[2];
  }

  // Jika input HSV { h:0-360, s:0-1, v:0-1 }
  else if (typeof input === "object" && "h" in input && "s" in input && "v" in input) {
    let { h, s, v } = input;
    let c = v * s;
    let x = c * (1 - Math.abs((h / 60) % 2 - 1));
    let m = v - c;
    let r1, g1, b1;

    if (h < 60) [r1, g1, b1] = [c, x, 0];
    else if (h < 120) [r1, g1, b1] = [x, c, 0];
    else if (h < 180) [r1, g1, b1] = [0, c, x];
    else if (h < 240) [r1, g1, b1] = [0, x, c];
    else if (h < 300) [r1, g1, b1] = [x, 0, c];
    else [r1, g1, b1] = [c, 0, x];

    r = Math.round((r1 + m) * 255);
    g = Math.round((g1 + m) * 255);
    b = Math.round((b1 + m) * 255);
  }

  // Hitung luminance (persepsi manusia terhadap terang/gelap)
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b);
  
  console.log(luminance, input);
  
  return luminance > 186 ? "black" : "light"; 
}
// contoh penggunaan:
// console.log(getContrastColor("#ffffff")); // Output: "black"
// console.log(getContrastColor("rgb(0, 0, 0)")); // Output: "light"
// console.log(getContrastColor({ h: 0, s: 1, v: 1 })); // Output: "light"