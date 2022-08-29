const { writeFileSync } = require("fs");
const sharp = require("sharp");

const svg =
  '<svg width="240" height="240"><g transform="translate(120, 120)"><path d="M1.1183932797263092,-119.99478820545443A120,120,0,1,1,-89.95513379256059,-79.42338386371186L-34.19179641151624,-29.25612855716601A45,45,0,1,0,1.1183932797263043,-44.98610003625412Z" fill="#ef3024"></path><path d="M-84.7693748729842,-77.71198803044145A115,115,0,0,1,-5.699751643429664,-114.85866458915157L-2.8853273603151877,-44.90740346561819A45,45,0,0,0,-32.723781292413946,-30.88938552199216Z" fill="#ffcb03"></path><path d="M-3.3856753935391968,-109.9478840275227A110,110,0,0,1,-1.0371369041679066,-109.9951105597063L-0.904717724645599,-44.99090447900233Z" fill="#13a463"></path><text transform="translate(50.19646766777467,55.72535000947102)" font-size="12px" font-family="Trebuchet MS" fill="white">86.66%</text><text transform="translate(-51.30667097532949,-54.704894784921045)" font-size="12px" font-family="Trebuchet MS" fill="white">12.7%</text><text transform="translate(-24.605652939572636,-70.84886621123376)" font-size="12px" font-family="Trebuchet MS" fill="white"></text></g></svg>';
const buffer = Buffer.from(svg);
sharp(buffer)
  .png()
  .toBuffer()
  .then((b) => {
    const string = "data:image/png;base64," + b.toString("base64");
    writeFileSync("out.txt", string);
  });
