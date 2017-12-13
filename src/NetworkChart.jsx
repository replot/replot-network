import React from "react"
import PropTypes from "prop-types"
import {defaultPalette, getPalette} from "./color.js"
import getFinalNodePositions from "./getFinalNodePositions.js"
import getLinkWeights from "./getLinkWeights.js"
import getNodeSizes from "./getNodeSizes.js"
import {Resize, Tooltip} from "replot-core"
import Node from "./Node.jsx"
import Link from "./Link.jsx"
import Label from "./Label.jsx"

class NetworkChart extends React.PureComponent {

  constructor(props) {
    super(props)
    this.positions = this.getRandomPoints()
    this.state = {
      tooltipContents: null,
      mouseOver: false,
      mouseX: null,
      mouseY: null,
      pointsMoving: true
    }
  }

  activateTooltip(data) {
    let newContents
    if (this.props.tooltipContents){
      newContents = this.props.tooltipContents(data)
    }
    else {
      newContents = (
        <div>
          <span>{this.props.IDKey}: {data[this.props.IDKey]}<br/></span>
          {this.props.groupKey &&
          <span>{this.props.groupKey}: {data[this.props.groupKey]}</span>
          }
          {this.props.nodeSize &&
          <span>{this.props.nodeKey}: {data[this.props.nodeKey]}</span>
          }
        </div>
      )
    }
    this.setState({
      tooltipContents: newContents,
      mouseOver: true,
    })
  }

  deactivateTooltip() {
    this.setState({
      mouseOver: false
    })
  }

  updateMousePos(e) {
    this.setState({
      mouseX: e.pageX,
      mouseY: e.pageY - 10
    })
  }

  getRandomPoints() {
    /* Use nodes and ID key to return dict of ID - point position */
    let positions = {}
    for (let node of this.props.nodes) {
      let xPos = Math.floor(Math.random()*(this.props.width))
      let yPos = Math.floor(Math.random()*(this.props.height))
      positions[node[this.props.IDKey]] = {x: xPos, y: yPos}
    }
    return positions
  }

  pointsRest(){
    this.setState({pointsMoving: false})
  }

  render() {

    const newPositions = getFinalNodePositions(
      this.props.nodes, this.props.links, this.positions,
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
          initX={this.positions[nodeID].x} initY={this.positions[nodeID].y}
          activateTooltip={this.activateTooltip.bind(this)}
          deactivateTooltip={this.deactivateTooltip.bind(this)}
          pointsRest={this.pointsRest.bind(this)}/>
      )

      if (this.props.showLabels && node[this.props.labelKey]) {
        labels.push(
          <Label
            width={this.props.width}
            key={nodeID}
            initX={this.positions[nodeID].x}
            initY={this.positions[nodeID].y}
            x={newPositions[nodeID].x+8} y={newPositions[nodeID].y}
            fill={this.props.graphStyle.labelColor}
            labelText={node[this.props.labelKey]}/>
        )
      }
    }

    let lines = []
    let links = this.props.links

    if (this.props.linkWeight) {
      links = getLinkWeights(
        JSON.parse(JSON.stringify(this.props.links)), this.props.linkKey,
        this.props.maxWidth, this.props.graphStyle.lineWidth
      )
    }

    for (let link of links) {
      let parentPos = newPositions[link[this.props.parentKey]]
      let childPos = newPositions[link[this.props.childKey]]
      let parentInitPos = this.positions[link[this.props.parentKey]]
      let childInitPos = this.positions[link[this.props.childKey]]
      lines.push(
        <Link x1={parentPos.x} y1={parentPos.y}
          x2={childPos.x} y2={childPos.y}
          startX1={parentInitPos.x}
          startY1={parentInitPos.y}
          startX2={childInitPos.x}
          startY2={childInitPos.y}
          strokeWidth={this.props.linkWeight ? link.width
          : this.props.graphStyle.lineWidth}
          stroke={this.props.graphStyle.lineColor}
          opacity={this.props.graphStyle.lineOpacity}
          key={`${link[this.props.parentKey]}.${link[this.props.childKey]}`}
        />
      )
    }

    return (
      <div onMouseMove={this.props.tooltip && !this.state.pointsMoving ?
        this.updateMousePos.bind(this) : null}>
        {this.props.tooltip &&
          <Tooltip
            x={this.state.mouseX} y={this.state.mouseY}
            active={this.state.mouseOver}
            contents={this.state.tooltipContents}
            colorScheme={this.props.tooltipColor}
          />
        }
        <svg width={this.props.width} height={this.props.height}>
          {lines}
          {points}
          {labels}
        </svg>
      </div>
    )
  }
}

class NetworkChartResponsive extends React.Component {

  render() {
    return (
      <Resize width={this.props.width}>
        <NetworkChart {...this.props} />
      </Resize>
    )
  }
}

NetworkChartResponsive.defaultProps = {
  width: 800
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
    pointRadius: 5,
    lineWidth: 1,
    lineColor: "#1b1b1b",
    lineOpacity: 0.25,
    labelColor: "#1b1b1b",
  },
  nodeSize: false,
  linkWeight: false,
  nodeKey: "node",
  linkKey: "link",
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
  linkWeight: PropTypes.bool,
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

export default NetworkChartResponsive
