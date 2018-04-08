import test from 'ava'
import Grid from '../../src/grid'
import D2Q4 from '../../src/d2q4'
import Automaton from '../../src/automaton'
import sinon from 'sinon'

test('evolve performs collide and then propagate', t => {
  // given
  const collide = sinon.spy()
  const propagate = sinon.spy()
  const cell = D2Q4.create({})
  const grid = Grid.create(1, 1, () => cell)
  // when
  Automaton.evolve(grid, {collide, propagate})
  // then
  t.truthy(collide.calledBefore(propagate))
})

test('correctly performs collide and propagate step', t => {
  // given
  const emptyCell = D2Q4.create({})
  const upDownCell = D2Q4.create({up: true, down: true})
  const leftCell = D2Q4.create({left: true})
  const rightCell = D2Q4.create({right: true})
  /** initial
   *   ○    ◉    ○
   *  ○ ○  ○ ○  ○ ○
   *   ○    ◉    ○
   */
  const grid = Grid.create(3, 1, ([x, y]) =>
    (x === 1) ? upDownCell : emptyCell)
  // when
  const newGrid = Automaton.evolve(grid)
  // then
  /** after collide
   *   ○    ○    ○
   *  ○ ○  ◉ ◉  ○ ○
   *   ○    ○    ○
   */
  /** after propagate
   *   ○    ○    ○
   *  ◉ ○  ○ ○  ○ ◉
   *   ○    ○    ○
   */
  t.deepEqual(Grid.at(newGrid, 0, 0), leftCell)
  t.deepEqual(Grid.at(newGrid, 1, 0), emptyCell)
  t.deepEqual(Grid.at(newGrid, 2, 0), rightCell)
})
