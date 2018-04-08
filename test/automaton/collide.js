import test from 'ava'
import Grid from '../../src/grid'
import D2Q4 from '../../src/d2q4'
import Automaton from '../../src/automaton'

test('Cells are copied during collision', t => {
  // given
  const cellDirs = {up: true, down: true}
  var cell = D2Q4.create(cellDirs)
  const grid = Grid.create(1, 1, () => cell)
  // when
  const newGrid = Automaton.collide(grid)
  // then
  t.deepEqual(cell, D2Q4.create({up: true, down: true}), 'initial value didn\'t change')
  t.deepEqual(newGrid.values[0].value, D2Q4.collide(cell), 'value in grid changed')
})

test('Grid collisions performs collisions in all cells', t => {
  // given
  const cell = D2Q4.create({left: true, right: true})
  const grid = Grid.create(2, 2, () => cell)
  // when
  const newGrid = Automaton.collide(grid)
  // then
  newGrid.values.forEach((c) => {
    t.deepEqual(c.value, D2Q4.collide(cell))
  })
})
