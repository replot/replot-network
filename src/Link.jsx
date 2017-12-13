import React from "react"
import {Motion, spring} from "react-motion"


class Link extends React.PureComponent {
  render() {
    return (
      <Motion
        defaultStyle={{
          x1: this.props.startX1,
          y1: this.props.startY1,
          x2: this.props.startX2,
          y2: this.props.startY2,
        }}
        style={{
          x1: spring(this.props.x1, {stiffness: 120, damping: 50}),
          y1: spring(this.props.y1, {stiffness: 120, damping: 50}),
          x2: spring(this.props.x2, {stiffness: 120, damping: 50}),
          y2: spring(this.props.y2, {stiffness: 120, damping: 50}),
        }}
      >
        {
          interpolatingStyles =>
            <line
              x1={interpolatingStyles.x1}
              y1={interpolatingStyles.y1}
              x2={interpolatingStyles.x2}
              y2={interpolatingStyles.y2}
              strokeWidth={this.props.strokeWidth}
              stroke={this.props.stroke}
              opacity={this.props.opacity} />
        }
      </Motion>
    )
  }
}

export default Link
