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

    const initPositions = getInitialNodePositions(
      this.props.nodes, this.props.width,
      this.props.height, this.props.IDKey
    )

    const newPositions = getFinalNodePositions(
      this.props.nodes, this.props.links, initPositions,
      this.props.width, this.props.height, this.props.IDKey,
      this.props.maxRadius, this.props.attractionFactor,
      this.props.parentKey, this.props.childKey
    )

    let points = []
    let labels = []
    let groupColor = {}

    if (this.props.groupKey) {
      for (let node of this.props.nodes) {
        groupColor[node[this.props.groupKey]] = null
      }
    }

    let palette = getPalette(
      this.props.color, Object.keys(groupColor).length
    )

    let nodes = this.props.nodes
    if (this.props.nodeSize) {
      nodes = getNodeSizes(
        JSON.parse(JSON.stringify(this.props.nodes)),
        this.props.nodeKey, this.props.maxRadius,
        this.props.graphStyle.pointRadius
      )
    }

    for (let node of nodes) {
      let nodeID = node[this.props.IDKey]

      let color
      if (this.props.groupKey) {
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
          radius={this.props.nodeSize ? node.radius
          : this.props.graphStyle.pointRadius}
          zoomScale={this.props.zoomScale} fill={color}
          initX={initPositions[nodeID].x} initY={initPositions[nodeID].y}
          activateTooltip={this.props.activateTooltip}
          deactivateTooltip={this.props.deactivateTooltip}
          pointsRest={this.props.pointsRest} />
      )

      if (this.props.showLabels && node[this.props.labelKey]) {
        labels.push(
          <Label
            width={this.props.width}
            key={nodeID}
            initX={initPositions[nodeID].x}
            initY={initPositions[nodeID].y}
            x={newPositions[nodeID].x+8} y={newPositions[nodeID].y}
            fill={this.props.graphStyle.labelColor}
            labelText={node[this.props.labelKey]}/>
        )
      }
    }

    let lines = []
    let links = this.props.links

    if (this.props.weightedLinks) {
      if (!this.props.linkKey) {
        const aggLinks = aggregateLinks(
          this.props.links, this.parentKey, this.childKey, "_linkWeight"
        )
        links = getLinkWeights(
          aggLinks, "_linkWeight",
          this.props.maxWidth, this.props.graphStyle.lineWidth
        )
      } else {
        links = getLinkWeights(
          JSON.parse(JSON.stringify(this.props.links)), this.props.linkKey,
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
  groupKey: "group",
  labelKey: "label",
  color: defaultPalette,
  graphStyle: {
    pointRadius: 10,
    lineWidth: 1,
    lineColor: "#1b1b1b",
    lineOpacity: 0.25,
    labelColor: "#1b1b1b",
  },
  nodeSize: false,
  weightedLinks: false,
  nodeKey: "node",
  linkKey: null,
  maxRadius: 10,
  maxWidth: 10,
  zoomScale: 2,
  showLabels: true,
  tooltip: false,
  attractionFactor: 1,
}

NetworkChart.propTypes = {
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
  nodeSize: PropTypes.bool,
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
