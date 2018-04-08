import React from "react"
import Label from "./Label.jsx"

class LabelCluster extends React.PureComponent {

  constructor(props) {
    super(props)
    this.state = {opacity: 0}
  }

  componentDidMount() {
    this.setState({opacity: 1})
  }

  render() {
    let labels = []

    if (this.props.showLabels) {
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

    let animatedStyle = {opacity: 1}

    if (this.props.animate) {
      animatedStyle = {opacity: this.state.opacity, transition: "opacity 1s 1.5s"}
    }

    return (
      <g style={animatedStyle}>
        {labels}
      </g>
    )
  }
}

export default LabelCluster
