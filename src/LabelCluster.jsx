import React from "react"
import Label from "./Label.jsx"

class LabelCluster extends React.PureComponent {

  render() {
    let labels = []

    if (this.props.labelsVisible) {
      for (let node of this.props.nodes) {
        let nodeID = node[this.props.nodeKey]
        if (this.props.showLabels && node[this.props.labelKey]) {
          labels.push(
            <Label
              width={this.props.width}
              key={nodeID}
              x={this.props.finalPositions[nodeID].x + 8}
              y={this.props.finalPositions[nodeID].y}
              fill={this.props.graphStyle.labelColor}
              labelText={node[this.props.labelKey]} />
          )
        }
      }
    }

    return (
      <g>
        {labels}
      </g>
    )
  }
}

export default LabelCluster
