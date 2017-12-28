const getFinalNodePositions = (nodes, links, initialPositions,
  width, height, radius, attractionFactor, parentKey, childKey) => {

  const attract = (d,k) => {
    let force = Math.pow(d,2)/k
    return force * 0.1
  }

  const repulse = (d,k) => {
    let force = Math.pow(k,2)/d
    return force * 0.1
  }

  const area = width * height
  let graph = {}

  for (let node of nodes) {
    graph[node] = ({
      pos: {x: initialPositions[node].x, y: initialPositions[node].y},
      disp: {x:0, y:0}
    })
  }

  let k
  if (links.length > 400) {
    k = Math.sqrt(area/nodes.length)/1.5
  }
  else {
    k = Math.sqrt(area/nodes.length)/2.5
  }

  let timeSteps = 750
  let newPositions = {}

  for (let i=0; i < timeSteps; i++) {
    for (let node1 of nodes) {
      let nodeV = graph[node1]
      nodeV.disp = {x:0, y:0}
      for (let node2 of nodes) {
        let nodeU = graph[node2]
        if (nodeV !== nodeU) {
          let xDiff = nodeV.pos.x - nodeU.pos.x
          let yDiff = nodeV.pos.y - nodeU.pos.y
          let magnitude = Math.sqrt(Math.pow(xDiff,2)+Math.pow(yDiff,2))

          let rForce = repulse(magnitude,k)
          nodeV.disp.x += xDiff/magnitude * rForce
          nodeV.disp.y += yDiff/magnitude * rForce
        }
      }
    }

    for (let edge of links) {
      let parentNode = graph[edge[parentKey]]
      let childNode = graph[edge[childKey]]
      let xDiff = parentNode.pos.x - childNode.pos.x
      let yDiff = parentNode.pos.y - childNode.pos.y

      let magnitude = Math.sqrt(Math.pow(xDiff,2)+Math.pow(yDiff,2))
      let aForce = attract(magnitude,k) * attractionFactor
      parentNode.disp.x -= xDiff/magnitude * aForce
      parentNode.disp.y -= yDiff/magnitude * aForce

      childNode.disp.x += xDiff/magnitude * aForce
      childNode.disp.y += yDiff/magnitude * aForce
    }

    for (let node of nodes) {
      let currNode = graph[node]
      let magnitude = Math.sqrt(Math.pow(currNode.disp.x,2) + Math.pow(currNode.disp.y,2))
      currNode.pos.x += currNode.disp.x/magnitude
      currNode.pos.y += currNode.disp.y/magnitude
    }
  }

  for (let node of nodes) {
    let currNode = graph[node]
    currNode.pos.x = Math.min(width-radius, Math.max(radius, currNode.pos.x))
    currNode.pos.y = Math.min(height-radius, Math.max(radius, currNode.pos.y))
    newPositions[node] = {x: currNode.pos.x, y: currNode.pos.y}
  }
  return newPositions

}

export default getFinalNodePositions
