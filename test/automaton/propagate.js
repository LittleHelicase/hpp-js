import test from 'ava'
import Grid from '../../src/grid'
import D2Q4 from '../../src/d2q4'
import Automaton from '../../src/automaton'

test('Propagation reflects properly', t => {
  // given
  const emptyCell = D2Q4.create({})
  const grid = Grid.create(1, 1, () => emptyCell)
  // when
  const newGrid = Automaton.propagate(grid)
  // then
  t.deepEqual(Grid.at(newGrid, 0, 0), emptyCell)
})

test('Propagation moves spots to the left', t => {
  // given
  const leftCell = D2Q4.create({left: true})
  const emptyCell = D2Q4.create({})
  const grid = Grid.create(2, 1, ([x, y]) =>
    (x === 1) ? leftCell : emptyCell)
  // when
  const newGrid = Automaton.propagate(grid)
  // then
  t.deepEqual(Grid.at(newGrid, 0, 0), leftCell)
  t.deepEqual(Grid.at(newGrid, 1, 0), emptyCell)
})

test('Propagation moves spots to the right', t => {
  // given
  const rightCell = D2Q4.create({right: true})
  const emptyCell = D2Q4.create({})
  const grid = Grid.create(2, 1, ([x, y]) =>
    (x === 0) ? rightCell : emptyCell)
  // when
  const newGrid = Automaton.propagate(grid)
  // then
  t.deepEqual(Grid.at(newGrid, 0, 0), emptyCell)
  t.deepEqual(Grid.at(newGrid, 1, 0), rightCell)
})

test('Propagation moves spots up', t => {
  // given
  const upCell = D2Q4.create({up: true})
  const emptyCell = D2Q4.create({})
  const grid = Grid.create(1, 2, ([x, y]) =>
    (y === 1) ? upCell : emptyCell)
  // when
  const newGrid = Automaton.propagate(grid)
  // then
  t.deepEqual(Grid.at(newGrid, 0, 0), upCell)
  t.deepEqual(Grid.at(newGrid, 0, 1), emptyCell)
})

test('Propagation moves spots down', t => {
  // given
  const downCell = D2Q4.create({down: true})
  const emptyCell = D2Q4.create({})
  const grid = Grid.create(1, 2, ([x, y]) =>
    (y === 0) ? downCell : emptyCell)
  // when
  const newGrid = Automaton.propagate(grid)
  // then
  t.deepEqual(Grid.at(newGrid, 0, 0), emptyCell)
  t.deepEqual(Grid.at(newGrid, 0, 1), downCell)
})

function twice (fn) {
  return (arg) => fn(fn(arg))
}

test('Sequences of propagations do work', t => {
  // given
  const leftCell = D2Q4.create({left: true})
  const grid = Grid.create(1, 1, () => leftCell)
  // when
  const newGrid = twice(Automaton.propagate)(grid)
  // then
  // gets reflected twice
  t.deepEqual(Grid.at(newGrid, 0, 0), leftCell)
})
