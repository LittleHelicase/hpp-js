import test from 'ava'
import Grid from '../../src/grid'
import sinon from 'sinon'

test('Can create an empty grid', t => {
  // when
  const grid = Grid.create(0, 0, () => null)
  // then
  t.deepEqual(grid, {width: 0, height: 0, values: []})
})

test('Uses initializer for cells', t => {
  // given
  const spy = sinon.spy()
  // when
  Grid.create(1, 1, spy)
  // then
  t.truthy(spy.calledOnceWith([0, 0]))
})

test('Uses initializer for horizontal cells', t => {
  // given
  const spy = sinon.spy()
  // when
  Grid.create(2, 1, spy)
  // then
  t.truthy(spy.calledWith([0, 0]))
  t.truthy(spy.calledWith([1, 0]))
})

test('Uses initializer for vertical cells', t => {
  // given
  const spy = sinon.spy()
  // when
  Grid.create(1, 2, spy)
  // then
  t.truthy(spy.calledWith([0, 0]))
  t.truthy(spy.calledWith([0, 1]))
})

test('Sets witdh and height properly', t => {
  // given
  const width = 4
  const height = 5
  // when
  const grid = Grid.create(width, height, () => null)
  // then
  t.is(grid.width, width)
  t.is(grid.height, height)
})

test('creates an array of appropiate size', t => {
  // given
  const width = 3
  const height = 6
  // when
  const grid = Grid.create(width, height, () => null)
  // then
  t.is(grid.values.length, width * height)
})
