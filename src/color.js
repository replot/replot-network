/* Default base palette */
let defaultPalette = [
  "#4cab92", "#ca0004", "#A59CD9", "#eccc00",
  "#9dbd5f", "#0097bf", "#005c7a", "#fc6000"
]

/* Take a base palette and return a new palette with at least x (= count) colors.
  Base palette must have at least 2 colors */
function getPalette(basePalette,count) {
  let oldPalette = basePalette
  let newPalette = basePalette.slice(0)
  let i = 1
  while (newPalette.length < count) {
    if (i >= oldPalette.length) {
      oldPalette = newPalette
      newPalette = oldPalette.slice(0)
      i = 1
    }
    let midColor = centerColor(oldPalette[i-1],oldPalette[i])
    newPalette.splice(2*i-1,0,midColor)
    i += 1
  }
  return newPalette
}

function centerColor(colorA,colorB) {
  let rA = parseInt(colorA.substring(1,3), 16)
  let rB = parseInt(colorB.substring(1,3), 16)
  let gA = parseInt(colorA.substring(3,5), 16)
  let gB = parseInt(colorB.substring(3,5), 16)
  let bA = parseInt(colorA.substring(5,7), 16)
  let bB = parseInt(colorB.substring(5,7), 16)
  let r = Math.round((rA + rB) / 2).toString(16)
  let g = Math.round((gA + gB) / 2).toString(16)
  let b = Math.round((bA + bB) / 2).toString(16)
  while (r.length < 2) {
    r = "0" + r
  }
  while (g.length < 2) {
    g = "0" + g
  }
  while (b.length < 2) {
    b = "0" + b
  }
  return "#" + r + g + b
}

module.exports = {
  defaultPalette,
  getPalette
}
