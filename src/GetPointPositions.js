class GetPointPositions {
  constructor (nodes, links, initialPositions, width, height, IDKey, radius, attractionFactor) {
    this.attractionFactor = attractionFactor
    this.nodes = nodes
    this.edges = links
    this.area = width * height
    this.width = width
    this.height = height
    this.IDKey = IDKey
    this.radius = radius
    this.graph = {}
    for (let node of this.nodes) {
      let nodeID = node[IDKey]
      this.graph[nodeID] = ({ pos: {x: initialPositions[nodeID].x, y: initialPositions[nodeID].y},
        disp: {x:0, y:0}})
    }
  }

  attract(d,k) {
    let force = Math.pow(d,2)/k
    return force * 0.1
  }

  repulse(d,k) {
    let force = Math.pow(k,2)/d
    return force * 0.1
  }

  getPoints() {
    let k
    if (this.edges.length > 400) {
      k = Math.sqrt(this.area/this.nodes.length)/1.5
    }
    else {
      k = Math.sqrt(this.area/this.nodes.length)/2.5
    }

    let timeSteps = 750
    let newPositions = {}

    for (let i=0; i < timeSteps; i++) {
      for (let node1 of this.nodes) {
        let nodeV = this.graph[node1[this.IDKey]]
        nodeV.disp = {x:0, y:0}
        for (let node2 of this.nodes) {
          let nodeU = this.graph[node2[this.IDKey]]
          if (nodeV !== nodeU) {
            let xDiff = nodeV.pos.x - nodeU.pos.x
            let yDiff = nodeV.pos.y - nodeU.pos.y
            let magnitude = Math.sqrt(Math.pow(xDiff,2)+Math.pow(yDiff,2))

            let rForce = this.repulse(magnitude,k)
            nodeV.disp.x += xDiff/magnitude * rForce
            nodeV.disp.y += yDiff/magnitude * rForce
          }
        }
      }

      for (let edge of this.edges) {
        let parentNode = this.graph[edge.parent]
        let childNode = this.graph[edge.child]
        let xDiff = parentNode.pos.x - childNode.pos.x
        let yDiff = parentNode.pos.y - childNode.pos.y

        let magnitude = Math.sqrt(Math.pow(xDiff,2)+Math.pow(yDiff,2))
        let aForce = this.attract(magnitude,k) * this.attractionFactor
        parentNode.disp.x -= xDiff/magnitude * aForce
        parentNode.disp.y -= yDiff/magnitude * aForce

        childNode.disp.x += xDiff/magnitude * aForce
        childNode.disp.y += yDiff/magnitude * aForce
      }

      for (let node of this.nodes) {
        let currNode = this.graph[node[this.IDKey]]
        let magnitude = Math.sqrt(Math.pow(currNode.disp.x,2) + Math.pow(currNode.disp.y,2))
        currNode.pos.x += currNode.disp.x/magnitude
        currNode.pos.y += currNode.disp.y/magnitude
      }
    }

    for (let node of this.nodes) {
      let currNode = this.graph[node[this.IDKey]]
      currNode.pos.x = Math.min(this.width-this.radius, Math.max(this.radius, currNode.pos.x))
      currNode.pos.y = Math.min(this.height-this.radius, Math.max(this.radius, currNode.pos.y))
      newPositions[node[this.IDKey]] = {x: currNode.pos.x, y: currNode.pos.y}
    }
    return newPositions
  }

}

export default GetPointPositions
