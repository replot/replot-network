const getInitialNodePositions = (nodes, width, height, nodeKey) => {
  let positions = {}
  for (let node of nodes) {
    let xPos = Math.floor(Math.random()*(width))
    let yPos = Math.floor(Math.random()*(height))
    positions[node[nodeKey]] = {x: xPos, y: yPos}
  }
  return positions
}

export default getInitialNodePositions
