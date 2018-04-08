
import D2Q4 from './d2q4'
import Grid from './grid'

function left (grid, [x, y]) {
  if (x < grid.width - 1) return Grid.at(grid, x + 1, y)[D2Q4.LEFT]
  else return Grid.at(grid, x, y)[D2Q4.RIGHT] // reflect on border
}

function up (grid, [x, y]) {
  if (y < grid.height - 1) return Grid.at(grid, x, y + 1)[D2Q4.UP]
  else return Grid.at(grid, x, y)[D2Q4.DOWN] // reflect on border
}

function right (grid, [x, y]) {
  if (x > 0) return Grid.at(grid, x - 1, y)[D2Q4.RIGHT]
  else return Grid.at(grid, x, y)[D2Q4.LEFT] // reflect on border
}

function down (grid, [x, y]) {
  if (y > 0) return Grid.at(grid, x, y - 1)[D2Q4.DOWN]
  else return Grid.at(grid, x, y)[D2Q4.UP] // reflect on border
}

const compose = (f2, f1) => (arg) => f2(f1(arg))

const Automaton = {
  propagate (grid) {
    return Grid.create(grid.width, grid.height, (pos) =>
      [left(grid, pos), up(grid, pos), right(grid, pos), down(grid, pos)])
  },

  collide (grid) {
    return Grid.create(grid.width, grid.height, ([x, y]) =>
      D2Q4.collide(Grid.at(grid, x, y)))
  },

  evolve (grid, at = Automaton) {
    return compose(at.propagate, at.collide)(grid)
  }
}

export default Automaton
