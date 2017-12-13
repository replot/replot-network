import React from "react"
import {spring, Motion} from "react-motion"

class Node extends React.PureComponent {
  render () {
    return (
      <Motion
        defaultStyle={{ x: this.props.initX, y: this.props.initY}}
        style={{
          x: spring(this.props.x, {stiffness: 120, damping: 50}),
          y: spring(this.props.y, {stiffness: 120, damping: 50}),
        }}
        onRest={this.props.pointsRest}
      >
        {
          style =>
          <circle
            cx={style.x} cy={style.y} r={this.props.radius}
            stroke={this.props.color} fill={this.props.fill}
            onMouseOver={this.props.activateTooltip.bind(this, this.props.raw)}
            onMouseOut={this.props.deactivateTooltip}>
          </circle>
        }
      </Motion>
    )
  }
}

export default Node
