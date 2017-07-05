import React from "react"
import {defaultPalette, getPalette} from "./color.js"
import {spring, Motion} from "react-motion"
import GetPointPositions from "./GetPointPositions.js"
import PropTypes from "prop-types"

const Node = (props) => {
  return (
    <Motion
      defaultStyle={{ x: props.initX, y: props.initY}}
      style={{
        x: spring(props.x, {stiffness: 120, damping: 50}),
        y: spring(props.y, {stiffness: 120, damping: 50}),
      }}
    >
      {
        style =>
        <circle
          cx={style.x} cy={style.y} r={props.radius}
          stroke={props.color} fill={props.fill}/>
    }
    </Motion>
  )
}

const Path = (props) => {
  return (
    <Motion
      defaultStyle={{
        x1: props.startX1,
        y1: props.startY1,
        x2: props.startX2,
        y2: props.startY2,
      }}
      style={{
        x1: spring(props.x1, {stiffness: 120, damping: 50}),
        y1: spring(props.y1, {stiffness: 120, damping: 50}),
        x2: spring(props.x2, {stiffness: 120, damping: 50}),
        y2: spring(props.y2, {stiffness: 120, damping: 50}),
      }}
    >
      {
        interpolatingStyles =>
          <line
            x1={interpolatingStyles.x1}
            y1={interpolatingStyles.y1}
            x2={interpolatingStyles.x2}
            y2={interpolatingStyles.y2}
            strokeWidth={props.strokeWidth}
            stroke={props.stroke}
            opacity={props.opacity} />
      }
    </Motion>
  )
}

class NetworkChart extends React.Component {
  constructor(props) {
    super(props)
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

  render() {
    let positions = this.getRandomPoints()

    let p = new GetPointPositions(this.props.nodes, this.props.links, positions,
      this.props.width, this.props.height, this.props.IDKey, this.props.pointRadius)
    let newPositions = p.getPoints()

    let points = []
    let labels = []
    let groupColor = {}

    if (this.props.groupKey) {
      for (let node of this.props.nodes) {
        groupColor[node[this.props.groupKey]] = null
      }
    }

    let palette = getPalette(
      this.props.pointColor, Object.keys(groupColor).length
    )

    for (let node of this.props.nodes) {
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
        color = this.props.pointColor[0]
      }
      points.push(
        <Node key={nodeID}
          x={newPositions[nodeID].x} y={newPositions[nodeID].y}
          radius={this.props.pointRadius} fill={color}
          initX={positions[nodeID].x} initY={positions[nodeID].y}/>
      )

      if (this.props.labelKey) {
        labels.push(
          <text
            key={nodeID}
            x={newPositions[nodeID].x+8} y={newPositions[nodeID].y}
            alignmentBaseline="middle" textAnchor="start"
            fill={this.props.labelColor} >
              {node[this.props.labelKey]}
          </text>
        )
      }
    }
    let lines = []
    for (let link of this.props.links) {
      let parentPos = newPositions[link[this.props.parentKey]]
      let childPos = newPositions[link[this.props.childKey]]
      let parentInitPos = positions[link[this.props.parentKey]]
      let childInitPos = positions[link[this.props.childKey]]
      lines.push(
        <Path x1={parentPos.x} y1={parentPos.y}
          x2={childPos.x} y2={childPos.y}
          startX1={parentInitPos.x}
          startY1={parentInitPos.y}
          startX2={childInitPos.x}
          startY2={childInitPos.y}
          strokeWidth={this.props.lineWidth}
          stroke={this.props.lineColor}
          opacity={this.props.lineOpacity}
          key={[link[this.props.parentKey], link[this.props.childKey]]}
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
  pointRadius: 5.5,
  pointColor: defaultPalette,
  lineWidth: 1,
  lineColor: "#1b1b1b",
  lineOpacity: 0.25,
  labelColor: "#1b1b1b",
}

NetworkChart.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  IDKey: PropTypes.string,
  parentKey: PropTypes.string,
  childKey: PropTypes.string,
  pointRadius: PropTypes.number,
  lineWidth: PropTypes.number,
  lineColor: PropTypes.string,
  lineOpacity: PropTypes.number,
  labelColor: PropTypes.string,
}

export default NetworkChart
