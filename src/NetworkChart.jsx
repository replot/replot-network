import React from "react"
import ReactDOM from "react-dom"

class NetworkChart extends React.Component {
  constructor(props) {
    super(props)
  }

  getRandomPoints() {
    /* Use nodes and ID key to return dict of ID - point position */
    let positions = {}
    for (let node of this.props.nodes) {
      let xPos = Math.floor(Math.random()*(this.props.width-100))+50
      let yPos = Math.floor(Math.random()*(this.props.height-40))+20
      positions[node[this.props.IDKey]] = [xPos, yPos]
    }
    return positions
  }

  render() {
    let positions = this.getRandomPoints()
    console.log(positions)

    let points = []
    let labels = []

    for (let node of this.props.nodes) {
      let nodeID = node[this.props.IDKey]
      points.push(
        <circle key={nodeID}
          cx={positions[nodeID][0]} cy={positions[nodeID][1]}
          r={this.props.pointRadius} fill={this.props.pointColor} />
      )

      if (this.props.labelKey) {
        labels.push(
          <text
            x={positions[nodeID][0]+8} y={positions[nodeID][1]}
            alignmentBaseline="middle" textAnchor="start"
            fill={this.props.lineColor} >
              {node[this.props.labelKey]}
          </text>
        )
      }
    }

    let lines = []
    for (let link of this.props.links) {
      let parentPos = positions[link[this.props.parentKey]]
      let childPos = positions[link[this.props.childKey]]
      lines.push(
        <line x1={parentPos[0]} y1={parentPos[1]}
          x2={childPos[0]} y2={childPos[1]}
          strokeWidth={this.props.lineWidth} stroke={this.props.lineColor}
          opacity={this.props.lineOpacity}
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
  pointRadius: 6,
  pointColor: "red",
  lineWidth: 1,
  lineColor: "#1b1b1b",
  lineOpacity: 0.6,
}

export default NetworkChart
