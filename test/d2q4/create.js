import test from 'ava'
import D2Q4 from '../../src/d2q4'

test('Creates by default empty spots', t => {
  // when
  const cell = D2Q4.create({})
  // then
  t.deepEqual(cell, [0, 0, 0, 0])
})

test('Cell order is "left, top, right, bottom"', t => {
  // given
  const dirs = [
    {dir: 'left', index: 0},
    {dir: 'up', index: 1},
    {dir: 'right', index: 2},
    {dir: 'down', index: 3}
  ]

  dirs.forEach((c) => {
    // when
    const cell = D2Q4.create({[c.dir]: true})
    // then
    t.is(cell[c.index], 1, `for direction "${c.dir}"`)
  })
})
