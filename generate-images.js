const { createCanvas } = require('canvas');
const fs = require('fs');

function createOGImage() {
  const canvas = createCanvas(1200, 630);
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#080c10';
  ctx.fillRect(0, 0, 1200, 630);

  ctx.strokeStyle = 'rgba(240, 165, 0, 0.06)';
  ctx.lineWidth = 1;
  for (let x = 0; x <= 1200; x += 60) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, 630);
    ctx.stroke();
  }
  for (let y = 0; y <= 630; y += 60) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(1200, y);
    ctx.stroke();
  }

  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 72px sans-serif';
  ctx.fillText('SolarAI', 60, 150);

  ctx.fillStyle = '#f0a500';
  ctx.font = '24px monospace';
  ctx.fillText('Midwest Data Center Power Advisory', 60, 195);

  ctx.fillStyle = '#445566';
  ctx.font = '16px monospace';
  ctx.fillText('NABCEP Certified · ICC Certified · solaraiusa.com', 60, 600);

  const gradient = ctx.createRadialGradient(1050, 315, 0, 1050, 315, 400);
  gradient.addColorStop(0, 'rgba(240, 165, 0, 0.15)');
  gradient.addColorStop(1, 'transparent');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 1200, 630);

  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync('public/og-image.png', buffer);
  console.log('OG Image created: public/og-image.png');
}

function createFavicon() {
  const canvas = createCanvas(32, 32);
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#080c10';
  ctx.fillRect(0, 0, 32, 32);

  ctx.beginPath();
  ctx.arc(16, 16, 10, 0, Math.PI * 2);
  ctx.fillStyle = '#f0a500';
  ctx.fill();

  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync('public/favicon.png', buffer);
  console.log('PNG favicon created: public/favicon.png');

  const pngBuffer = buffer;

  const icoHeader = Buffer.alloc(6);
  icoHeader.writeUInt16LE(0, 0);
  icoHeader.writeUInt16LE(1, 2);
  icoHeader.writeUInt16LE(1, 4);

  const icoEntry = Buffer.alloc(16);
  icoEntry.writeUInt8(32, 0);
  icoEntry.writeUInt8(32, 1);
  icoEntry.writeUInt8(0, 2);
  icoEntry.writeUInt8(0, 3);
  icoEntry.writeUInt16LE(1, 4);
  icoEntry.writeUInt16LE(32, 6);
  icoEntry.writeUInt32LE(pngBuffer.length, 8);
  icoEntry.writeUInt32LE(22, 12);

  const icoBuffer = Buffer.concat([icoHeader, icoEntry, pngBuffer]);
  fs.writeFileSync('public/favicon.ico', icoBuffer);
  console.log('ICO favicon created: public/favicon.ico');
}

createOGImage();
createFavicon();