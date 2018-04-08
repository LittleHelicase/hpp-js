import test from 'ava'
import D2Q4 from '../../src/d2q4'

test('Empty cell has 0 mass', t => {
  // given
  const cell = D2Q4.create({})
  // when
  const mass = D2Q4.mass(cell)
  // then
  t.is(mass, 0)
})

test('Each direction has the same mass', t => {
  // given
  const cases = ['right', 'left', 'up', 'down']

  cases.forEach((dir) => {
    // given
    const cell = D2Q4.create({[dir]: true})
    // when
    const mass = D2Q4.mass(cell)
    // then
    t.is(mass, 1, `in ${dir} case`)
  })
})

test('a full cell has mass 4', t => {
  // given
  const cell = D2Q4.create({left: true, right: true, up: true, down: true})
  // when
  const mass = D2Q4.mass(cell)
  // then
  t.is(mass, 4)
})
