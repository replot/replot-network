import React from "react"


class Label extends React.PureComponent {
  render() {
    let textAnchor = "middle"
    if (this.props.x < this.props.width/2 && this.props.x - (this.props.labelText.length * 8) < 1) {
      textAnchor = "start"
    } else if (this.props.x > this.props.width/2 && this.props.x + (this.props.labelText.length * 8) > this.props.width) {
      textAnchor = "end"
    }
    return (
      <g>
        <text
          x={this.props.x} y={this.props.y} style={{pointerEvents:"none"}}
          alignmentBaseline="middle" textAnchor={textAnchor}
          fontSize={this.props.fontSize} fontFamily={this.props.fontFamily}
          fill={this.props.fill}>
            {this.props.labelText}
        </text>
      </g>
    )
  }
}

export default Label
