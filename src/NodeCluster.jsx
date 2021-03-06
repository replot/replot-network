import React from "react"
import getNodeSizes from "./getNodeSizes.js"
import Node from "./Node.jsx"
import {getPalette} from "./color.js"

class NodeCluster extends React.PureComponent {

  render() {

    let points = []
    let groupColor = {}

    if (this.props.groupKey) {
      for (let node of this.props.nodes) {
        groupColor[node[this.props.groupKey]] = null
      }
    }

    let palette
    if (this.props.color instanceof Array) {
      palette = getPalette(this.props.color, Object.keys(groupColor).length)
    }

    let nodes = this.props.nodes
    if (this.props.nodeWeightKey) {
      nodes = getNodeSizes(
        this.props.nodes, this.props.nodeWeightKey,
        this.props.maxRadius, this.props.minRadius
      )
    }

    for (let node of nodes) {
      let nodeID = node[this.props.nodeKey]

      let color
      if (this.props.color instanceof Function) {
        color = this.props.color(node)
      } else if (this.props.groupKey) {
        if (groupColor[node[this.props.groupKey]]) {
          color = groupColor[node[this.props.groupKey]]
        } else {
          color = palette.shift()
          groupColor[node[this.props.groupKey]] = color
        }
      } else {
        color = this.props.color[0]
      }
      points.push(
        <Node key={nodeID} raw={node}
          x={this.props.finalPositions[nodeID].x} y={this.props.finalPositions[nodeID].y}
          radius={this.props.nodeWeightKey && node.radius ? node.radius
          : this.props.nodeRadius}
          zoomScale={this.props.zoomScale} fill={color}
          initX={this.props.initPositions[nodeID].x}
          initY={this.props.initPositions[nodeID].y}
          activateTooltip={this.props.activateTooltip}
          deactivateTooltip={this.props.deactivateTooltip}
          animate={this.props.animate} />
      )

    }

    return (
      <g>
        {points}
      </g>
    )
  }
}

export default NodeCluster
