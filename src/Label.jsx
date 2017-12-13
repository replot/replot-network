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
        defaultStyle={{
          x: this.props.initX,
          y: this.props.initY,
        }}
        style={{
          x: spring(this.props.x, {stiffness: 120, damoing: 50}),
          y: spring(this.props.y, {stiffness: 120, damping: 50})
        }}
      >
        {
          style =>
          <text
            x={style.x} y={style.y} style={{pointerEvents:"none"}}
            alignmentBaseline="middle" textAnchor={textAnchor}
            fill={this.props.fill}>
              {this.props.labelText}
          </text>
        }
      </Motion>
    )
  }
}

export default Label
