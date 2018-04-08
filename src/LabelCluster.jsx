import React from "react"
import Label from "./Label.jsx"

class LabelCluster extends React.PureComponent {

  render() {
    let labels = []

    if (this.props.labelsVisible && this.props.showLabels) {
      for (let node of this.props.nodes) {
        let nodeID = node[this.props.nodeKey]
        labels.push(
          <Label
            width={this.props.width}
            key={nodeID}
            x={this.props.finalPositions[nodeID].x + 8}
            y={this.props.finalPositions[nodeID].y}
            fill={this.props.labelColor}
            fontSize={this.props.labelFontSize}
            fontFamily={this.props.labelFontFamily}
            labelText={this.props.labelKey ? node[this.props.labelKey] : nodeID} />
        )
      }
    }

    return (
      <g style={{opacity: this.props.linksVisible? 1: 0, transition: "opacity 1s"}}>
        {labels}
      </g>
    )
  }
}

export default LabelCluster
