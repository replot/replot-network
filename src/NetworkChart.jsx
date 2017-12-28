import React from "react"
import PropTypes from "prop-types"
import {defaultPalette, getPalette} from "./color.js"
import getFinalNodePositions from "./getFinalNodePositions.js"
import getInitialNodePositions from "./getInitialNodePositions.js"
import getLinkWeights from "./getLinkWeights.js"
import getNodeSizes from "./getNodeSizes.js"
import aggregateLinks from "./aggregateLinks.js"
import {Resize, Tooltip} from "replot-core"
import Node from "./Node.jsx"
import Link from "./Link.jsx"
import Label from "./Label.jsx"

class NetworkChart extends React.PureComponent {

  render() {

    let nodeIDSet = new Set()
    let missingNodes = []
    if (this.props.nodes) {
      for (let node of this.props.nodes) {
        nodeIDSet.add(node[this.props.IDKey])
      }
      for (let link of this.props.data) {
        if (!nodeIDSet.has(link[this.props.childKey])) {
          console.log(`${link[this.props.childKey]} was found in links, but not in nodes`)
          nodeIDSet.add(link[this.props.childKey])
          missingNodes.push(link[this.props.childKey])
        }
        if (!nodeIDSet.has(link[this.props.parentKey])) {
          console.log(`${link[this.props.parentKey]} was found in links, but not in nodes`)
          nodeIDSet.add(link[this.props.parentKey])
          missingNodes.push(link[this.props.parentKey])
        }
      }
    } else {
      for (let link of this.props.data) {
        nodeIDSet.add(link[this.props.childKey])
        nodeIDSet.add(link[this.props.parentKey])
      }
    }
    let nodeIDs = Array.from(nodeIDSet)

    const initPositions = getInitialNodePositions(
      nodeIDs, this.props.width,
      this.props.height
    )

    const newPositions = getFinalNodePositions(
      nodeIDs, this.props.data, initPositions,
      this.props.width, this.props.height,
      this.props.maxRadius, this.props.attractionFactor,
      this.props.parentKey, this.props.childKey
    )

    let points = []
    let labels = []
    let groupColor = {}

    if (this.props.groupKey && this.props.nodes) {
      for (let node of this.props.nodes) {
        groupColor[node[this.props.groupKey]] = null
      }
    }

    let palette = getPalette(
      this.props.color, Object.keys(groupColor).length
    )

    let nodes = this.props.nodes ? this.props.nodes : nodeIDs
    if (this.props.nodes && this.props.nodeSizeKey) {
      nodes = getNodeSizes(
        JSON.parse(JSON.stringify(this.props.nodes)),
        this.props.nodeSizeKey, this.props.maxRadius,
        this.props.graphStyle.pointRadius
      )
    }
    if (this.props.nodes) {
      for (let missingNode of missingNodes) {
        let newNode = {}
        newNode[this.props.IDKey] = missingNode
        newNode["radius"] = this.props.graphStyle.pointRadius
        if (this.props.groupKey) {
          newNode[this.props.groupKey] = null
        }
        nodes.push(newNode)
      }
    }

    for (let node of nodes) {
      let nodeID = this.props.nodes ? node[this.props.IDKey] : node

      let color
      if (this.props.groupKey && this.props.nodes) {
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
          x={newPositions[nodeID].x} y={newPositions[nodeID].y}
          radius={this.props.nodeSizeKey && this.props.nodes ? node.radius
          : this.props.graphStyle.pointRadius}
          zoomScale={this.props.zoomScale} fill={color}
          initX={initPositions[nodeID].x} initY={initPositions[nodeID].y}
          activateTooltip={this.props.activateTooltip}
          deactivateTooltip={this.props.deactivateTooltip}
          pointsRest={this.props.pointsRest} />
      )

      if (this.props.showLabels) {
        labels.push(
          <Label
            width={this.props.width}
            key={nodeID}
            initX={initPositions[nodeID].x}
            initY={initPositions[nodeID].y}
            x={newPositions[nodeID].x+8} y={newPositions[nodeID].y}
            fill={this.props.graphStyle.labelColor}
            labelText={this.props.nodes && node[this.props.labelKey] ?
              node[this.props.labelKey] : nodeID}/>
        )
      }
    }

    let lines = []
    let links = this.props.data

    if (this.props.weightedLinks) {
      if (!this.props.linkKey) {
        const aggLinks = aggregateLinks(
          this.props.data, this.parentKey, this.childKey, "_linkWeight"
        )
        links = getLinkWeights(
          aggLinks, "_linkWeight",
          this.props.maxWidth, this.props.graphStyle.lineWidth
        )
      } else {
        links = getLinkWeights(
          JSON.parse(JSON.stringify(this.props.data)), this.props.linkKey,
          this.props.maxWidth, this.props.graphStyle.lineWidth
        )
      }
    }

    let linkIndex = 0
    for (let link of links) {
      linkIndex += 1
      let parentPos = newPositions[link[this.props.parentKey]]
      let childPos = newPositions[link[this.props.childKey]]
      let parentInitPos = initPositions[link[this.props.parentKey]]
      let childInitPos = initPositions[link[this.props.childKey]]
      lines.push(
        <Link x1={parentPos.x} y1={parentPos.y}
          x2={childPos.x} y2={childPos.y}
          startX1={parentInitPos.x}
          startY1={parentInitPos.y}
          startX2={childInitPos.x}
          startY2={childInitPos.y}
          strokeWidth={this.props.weightedLinks ? link.width
          : this.props.graphStyle.lineWidth}
          stroke={this.props.graphStyle.lineColor}
          opacity={this.props.graphStyle.lineOpacity}
          key={`${linkIndex}.${link[this.props.parentKey]}.${link[this.props.childKey]}`}
        />
      )
    }

    return (
      <svg width={this.props.width} height={this.props.height}>
        {lines}
        {points}
        {labels}
      </svg>
    )
  }
}


NetworkChart.defaultProps = {
  width: 800,
  height: 600,
  IDKey: "id",
  parentKey: "parent",
  childKey: "child",
  labelKey: "label",
  color: defaultPalette,
  graphStyle: {
    pointRadius: 5,
    lineWidth: 1,
    lineColor: "#1b1b1b",
    lineOpacity: 0.25,
    labelColor: "#1b1b1b",
  },
  weightedLinks: false,
  maxRadius: 10,
  maxWidth: 10,
  zoomScale: 2,
  showLabels: false,
  attractionFactor: 1,
}

NetworkChart.propTypes = {
  data: PropTypes.array.isRequired,
  nodes: PropTypes.array,
  width: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]),
  height: PropTypes.number,
  IDKey: PropTypes.string,
  parentKey: PropTypes.string,
  childKey: PropTypes.string,
  linkKey: PropTypes.string,
  weightedLinks: PropTypes.bool,
  nodeSizeKey: PropTypes.string,
  maxWidth: PropTypes.number,
  color: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.array
  ]),
  graphStyle: PropTypes.object,
  zoomScale: PropTypes.number,
  showLabels: PropTypes.bool,
  tooltip: PropTypes.bool,
  tooltipColor: PropTypes.string,
  tooltipContents: PropTypes.func
}

export default NetworkChart
