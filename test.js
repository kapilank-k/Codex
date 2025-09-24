import fs from "fs";

const prompt = "pixel art of mahatma gandhi standing as if he is speaking, transparent background,full body image,8-bit, FRONTAL VIEW";
const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}`;

async function generateImage() {
  const response = await fetch(url); // fetch is built-in in Node 18+
  const buffer = await response.arrayBuffer();
  fs.writeFileSync("mlk_pixel.png", Buffer.from(buffer));
  console.log("✅ Image saved as mlk_pixel.png");
}

generateImage();
