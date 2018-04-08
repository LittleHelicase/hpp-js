import test from 'ava'
import D2Q4 from '../../src/d2q4'

test('conserves momentum if cells are empty', t => {
  // given
  const cell = D2Q4.create({})
  // when
  const newCell = D2Q4.collide(cell)
  // then
  t.deepEqual(newCell, [0, 0, 0, 0])
})

function pairsToMap (pairs) {
  return Object.assign(...pairs.map(([k, v]) => ({[k]: v})))
}

test('collision does nothing if directions are orthogonal', t => {
  // given
  const orthogonals = [
    ['left', 'up'], ['left', 'down'], ['right', 'up'], ['right', 'down']
  ]

  orthogonals.forEach(ortho => {
    // given
    const cell = D2Q4.create(pairsToMap(ortho.map(v => [v, 1])))
    // when
    const newCell = D2Q4.collide(cell)
    // then
    t.deepEqual(cell, newCell, `for case ${ortho}`)
  })
})

test('pure opposites create collisions', t => {
  // given
  const opposites = [
    { before: ['left', 'right'], after: ['up', 'down'] },
    { before: ['up', 'down'], after: ['left', 'right'] }
  ]

  opposites.forEach(opps => {
    // given
    const preCell = D2Q4.create(pairsToMap(opps.before.map(v => [v, 1])))
    const postCell = D2Q4.create(pairsToMap(opps.after.map(v => [v, 1])))
    // when
    const newCell = D2Q4.collide(preCell)
    // then
    t.deepEqual(newCell, postCell, `for case ${opps.before} -> ${opps.after}`)
  })
})
