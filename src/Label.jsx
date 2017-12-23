import React from "react"
import {Motion, spring} from "react-motion"


class Label extends React.PureComponent {
  render() {
    let textAnchor = "middle"
    if (this.props.x < this.props.width/2 && this.props.x - (this.props.labelText.length * 8) < 1) {
      textAnchor = "start"
    } else if (this.props.x > this.props.width/2 && this.props.x + (this.props.labelText.length * 8) > this.props.width) {
      textAnchor = "end"
    }
    return (
      <Motion
        defaultStyle={{opacity: 0}}
        style={{
          opacity: spring(1, {stiffness: 120, damping: 50})
        }}
      >
        {
          interpolatingStyles =>
            <g opacity={interpolatingStyles.opacity}>
              <text
                x={this.props.x} y={this.props.y} style={{pointerEvents:"none"}}
                alignmentBaseline="middle" textAnchor={textAnchor}
                fill={this.props.fill}>
                  {this.props.labelText}
              </text>
            </g>
        }
      </Motion>
    )
  }
}

export default Label
