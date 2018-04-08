import React from "react"

class Node extends React.PureComponent {

  render () {
    let cx = this.props.x
    let cy = this.props.y
    let animatedStyle = {}
    if (this.props.animate) {
      cx = this.props.initX
      cy = this.props.initY
      animatedStyle = {
        transition: "transform 1.5s",
        transform: `translate(${this.props.x - this.props.initX}px,${this.props.y - this.props.initY}px)`
      }
    }
    return (
      <circle
        cx={cx} cy={cy} r={this.props.radius}
        stroke={this.props.color} fill={this.props.fill}
        onMouseOver={this.props.activateTooltip(this.props.raw)}
        onMouseOut={this.props.deactivateTooltip}
        style={animatedStyle}
        >
      </circle>
    )
  }
}

export default Node
