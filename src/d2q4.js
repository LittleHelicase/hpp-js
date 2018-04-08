
export default {
  LEFT: 0,
  UP: 1,
  RIGHT: 2,
  DOWN: 3,

  /**
   * Create a D2Q4 cell via named parameters
   * @param {Object} values A mapping of named directions to
   * booleans that indicate whether a spot is filled or not.
   * @returns {Array<bool>} An array of booleans that encodes a D2Q4 cell
   * in the order [left, up, right, down].
   *
   * @example
   * D2Q4.create({left: true, up: true, right: false, down: false})
   */
  create ({left = false, up = false, right = false, down = false}) {
    return [left | 0, up | 0, right | 0, down | 0]
  },

  /**
   * Performs a collision (local operation) on one cell.
   * @param {Array<bool>} cell The D2Q4 cell that is processed by the
   * collision operator.
   */
  collide ([left, up, right, down]) {
    if (left && right && !up && !down) { // left – right collision
      return [down, right, up, left]
    } else if (up && down && !left && !right) { // up – down collision
      return [down, right, up, left]
    }
    return [left, up, right, down]
  },

  /**
   * Calculate the momentum of a cell.
   * @param {Array<bool>} cell The D2Q4 cell that is used to calculate the momentum.
   * @returns {Array<int>} A 2D vector that encodes the momentum stored inside the cell.
   * This is simply [0, 0] if there is no momentum or [(+/-)1, (+/-)1].
   */
  momentum ([left, up, right, down]) {
    return [right - left, up - down]
  },

  mass ([left, up, right, down]) {
    return left + up + right + down
  }
}
