import React from "react"
import {Motion, spring} from "react-motion"


class Link extends React.PureComponent {
  render() {
    return (
      <Motion
        defaultStyle={{opacity: 0}}
        style={{
          opacity: spring(this.props.opacity, {stiffness: 120, damping: 50})
        }}
      >
        {
          interpolatingStyles =>
            <line
              x1={this.props.x1}
              y1={this.props.y1}
              x2={this.props.x2}
              y2={this.props.y2}
              strokeWidth={this.props.strokeWidth + "px"}
              stroke={this.props.stroke}
              opacity={interpolatingStyles.opacity} />
        }
      </Motion>
    )
  }
}

export default Link
