// import screenshot from 'electron-screenshot-app'
//
// export async function takeScreenshot(displays: Electron.Display[]) {
//   const totalWidth = displays.reduce((sum, display) => sum + display.bounds.width, 0);
//   const totalHeight = Math.max(...displays.map(display => display.bounds.height));
//
//   screenshot({
//     filename: 'dual_screen_screenshot.png',
//     format: 'png',
//     width: totalWidth,
//     height: totalHeight,
//   })
//     .then((imgPath) => {
//       console.log('Screenshot saved to:', imgPath);
//     })
//     .catch((err) => {
//       console.error(err);
//     });
// }