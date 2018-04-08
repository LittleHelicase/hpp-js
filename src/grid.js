
function positionForIndex (idx, width, height) {
  return [(idx % width) | 0, (idx / width) | 0]
}

function indexForXY (x, y, width, height) {
  return x + y * width
}

const Grid = {
  create (width, height, initializer) {
    return {
      width,
      height,
      values: [...Array(width * height)].map((c, idx) => {
        const pos = positionForIndex(idx, width, height)
        return {
          position: pos,
          value: initializer(pos)
        }
      })
    }
  },

  at (grid, x, y) {
    return grid.values[indexForXY(x, y, grid.width, grid.height)].value
  }
}

export default Grid
