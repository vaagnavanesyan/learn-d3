const { writeFileSync } = require("fs");
const sharp = require("sharp");

const svg =
  '<svg width="240" height="240"><g transform="translate(120, 120)"><path d="M-2.2043642384652355e-14,-120A120,120,0,0,0,-51.09351498780868,108.57924629592236L-19.160068120428253,40.717217360970885A45,45,0,0,1,-8.266365894244634e-15,-45Z" stroke="white" stroke-width="2px" fill="#EF3124"></path><path d="M-48.96461852998332,104.05511103359227A115,115,0,0,0,114.09319065116496,14.413321859894907L44.645161559151504,5.639995510393659A45,45,0,0,1,-19.160068120428253,40.717217360970885Z" stroke="white" stroke-width="2px" fill="#2FC26E"></path><path d="M109.13261714459257,13.786655692073388A110,110,0,0,0,46.83572207215793,-99.53097577126218L19.160068120428242,-40.71721736097089A45,45,0,0,1,44.645161559151504,5.639995510393659Z" stroke="white" stroke-width="2px" fill="#B6BCC3"></path><path d="M44.706825614332566,-95.00684050893207A105,105,0,0,0,-8.682933837298954e-14,-105L-3.721257358842409e-14,-45A45,45,0,0,1,19.160068120428242,-40.71721736097089Z" stroke="white" stroke-width="2px" fill="#007AFF"></path><text transform="translate(-73.19375714540607,-16.360743104740656)" font-size="17px" font-family="SF Pro Text" font-weight="500" fill="white">43%</text><text transform="translate(36.13152555762869,65.72300100328974)" font-size="17px" font-family="SF Pro Text" font-weight="500" fill="white">30%</text><text transform="translate(65.72300100328974,-36.13152555762869)" font-size="17px" font-family="SF Pro Text" font-weight="500" fill="white">20%</text><text transform="translate(16.360743104740635,-73.19375714540607)" font-size="17px" font-family="SF Pro Text" font-weight="500" fill="white"></text></g></svg>';
const buffer = Buffer.from(svg);
sharp(buffer)
  .png()
  .toBuffer()
  .then((b) => {
    const string = "data:image/png;base64," + b.toString("base64");
    writeFileSync("out.txt", string);
    writeFileSync('out.png', b)
  });
