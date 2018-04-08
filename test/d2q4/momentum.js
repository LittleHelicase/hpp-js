import test from 'ava'
import D2Q4 from '../../src/d2q4'

test('Empty cell has 0 momentum in both directions', t => {
  // given
  const cell = D2Q4.create({left: false, right: false, up: false, down: false})
  // when
  const momentum = D2Q4.momentum(cell)
  // then
  t.is(momentum[0], 0, 'has no horizontal momentum')
  t.is(momentum[1], 0, 'has no vertical momentum')
})

test('Directional cells have their corresponding directions', t => {
  // given
  const cases = [
    {momentum: [1, 0], dir: 'right'},
    {momentum: [-1, 0], dir: 'left'},
    {momentum: [0, 1], dir: 'up'},
    {momentum: [0, -1], dir: 'down'}
  ]

  cases.forEach((c) => {
    // given
    const cell = D2Q4.create({[c.dir]: true})
    // when
    const momentum = D2Q4.momentum(cell)
    // then
    t.is(momentum[0], c.momentum[0], `in ${c.dir} case`)
    t.is(momentum[1], c.momentum[1], `in ${c.dir} case`)
  })
})

test('left and right spots equal out', t => {
  // given
  const cell = D2Q4.create({left: true, right: true})
  // when
  const momentum = D2Q4.momentum(cell)
  // then
  t.is(momentum[0], 0)
})

test('up and down spots equal out', t => {
  // given
  const cell = D2Q4.create({up: true, down: true})
  // when
  const momentum = D2Q4.momentum(cell)
  // then
  t.is(momentum[1], 0)
})
