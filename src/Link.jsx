import React from "react"

class Link extends React.PureComponent {
  render() {
    return (
      <line
        x1={this.props.x1}
        y1={this.props.y1}
        x2={this.props.x2}
        y2={this.props.y2}
        strokeWidth={this.props.strokeWidth + "px"}
        stroke={this.props.stroke}
        opacity={this.props.opacity} />
    )
  }
}

export default Link
