const getInitialNodePositions = (nodes, width, height) => {
  let positions = {}
  for (let node of nodes) {
    let xPos = Math.floor(Math.random()*(width))
    let yPos = Math.floor(Math.random()*(height))
    positions[node] = {x: xPos, y: yPos}
  }
  return positions
}

export default getInitialNodePositions
