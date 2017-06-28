class GetPointPositions {
  constructor (nodes, links, initialPositions, width, height, IDKey, radius) {
    this.nodes = nodes
    this.edges = links
    this.area = width * height
    this.width = width
    this.height = height
    this.IDKey = IDKey
    this.radius = radius
    this.graph = []
    for (let node of this.nodes) {
      let nodeID = node[IDKey]
      this.graph.push({id:nodeID,
        pos: {x: initialPositions[nodeID][0], y: initialPositions[nodeID][1]},
        disp: {x:0, y:0}})
    }
  }

  attract(d,k) {
    let force = Math.pow(d,2)/k
    return force * 0.01
  }

  repulse(d,k) {
    let force = Math.pow(k,2)/d
    return force * 0.01
  }

  getPoints() {
    let k = Math.sqrt(this.area/this.nodes.length)/2.5
    let timeSteps = 750
    let newPositions = {}
    for (let i=0; i < timeSteps; i++) {
      for (let nodeV of this.graph) {
        nodeV.disp = {x:0, y:0}
        for (let nodeU of this.graph) {
          if (nodeV.id !== nodeU.id) {
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
        let parentNode
        let childNode
        for (let node of this.graph) {
          if (node.id == edge.parent) {
            parentNode = node
          } else if (node.id == edge.child) {
            childNode = node
          }
        }
        let xDiff = parentNode.pos.x - childNode.pos.x
        let yDiff = parentNode.pos.y - childNode.pos.y

        let magnitude = Math.sqrt(Math.pow(xDiff,2)+Math.pow(yDiff,2))
        let aForce = this.attract(magnitude,k)

        parentNode.disp.x -= xDiff/magnitude * aForce
        parentNode.disp.y -= yDiff/magnitude * aForce

        childNode.disp.x += xDiff/magnitude * aForce
        childNode.disp.y += yDiff/magnitude * aForce
      }

      for (let node of this.graph) {
        let magnitude = Math.sqrt(Math.pow(node.disp.x,2) + Math.pow(node.disp.y,2))
        node.pos.x += node.disp.x/magnitude
        node.pos.y += node.disp.y/magnitude
      }

    }
    for (let node of this.graph) {
      node.pos.x = Math.min(this.width-this.radius, Math.max(this.radius, node.pos.x))
      node.pos.y = Math.min(this.height-this.radius, Math.max(this.radius, node.pos.y))
      newPositions[node.id] = {x: node.pos.x, y: node.pos.y}
    }
    return newPositions
  }

}

export default GetPointPositions
