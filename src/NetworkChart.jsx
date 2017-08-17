import React from "react"
import {defaultPalette, getPalette} from "./color.js"
import {spring, Motion} from "react-motion"
import GetPointPositions from "./GetPointPositions.js"
import PropTypes from "prop-types"
import GetNodeSize from "./GetNodeSize.js"
import {Resize, Tooltip} from "replot-core"

const Node = (props) => {
  return (
    <Motion
      defaultStyle={{ x: props.initX, y: props.initY}}
      style={{
        x: spring(props.x, {stiffness: 120, damping: 50}),
        y: spring(props.y, {stiffness: 120, damping: 50}),
      }}
      onRest={props.pointsRest}
    >
      {
        style =>
        <circle
          cx={style.x} cy={style.y} r={props.radius}
          stroke={props.color} fill={props.fill}
          onMouseOver={props.activateTooltip.bind(this, props.raw)}
          onMouseOut={props.deactivateTooltip}/>
    }
    </Motion>
  )
}

const Path = (props) => {
  return (
    <Motion
      defaultStyle={{
        x1: props.startX1,
        y1: props.startY1,
        x2: props.startX2,
        y2: props.startY2,
      }}
      style={{
        x1: spring(props.x1, {stiffness: 120, damping: 50}),
        y1: spring(props.y1, {stiffness: 120, damping: 50}),
        x2: spring(props.x2, {stiffness: 120, damping: 50}),
        y2: spring(props.y2, {stiffness: 120, damping: 50}),
      }}
    >
      {
        interpolatingStyles =>
          <line
            x1={interpolatingStyles.x1}
            y1={interpolatingStyles.y1}
            x2={interpolatingStyles.x2}
            y2={interpolatingStyles.y2}
            strokeWidth={props.strokeWidth}
            stroke={props.stroke}
            opacity={props.opacity} />
      }
    </Motion>
  )
}

const Label = (props) => {
  return (
    <Motion
      defaultStyle={{
        x: props.initX,
        y: props.initY,
      }}
      style={{
        x: spring(props.x, {stiffness: 120, damoing: 50}),
        y: spring(props.y, {stiffness: 120, damping: 50})
      }}
    >
      {
        style =>
        <text
          x={style.x} y={style.y}
          alignmentBaseline="middle" textAnchor="start"
          fill={props.fill}>
            {props.labelText}
        </text>
      }
    </Motion>
  )
}

class NetworkChart extends React.Component {

  constructor(props) {
    super(props)
    this.positions = this.getRandomPoints()
    this.state = {
      tooltipContents: null,
      mouseOver: false,
      mouseX: null,
      mouseY: null,
      pointsMoving: true
    }
  }

  activateTooltip(data) {
    let newContents
    if (this.props.tooltipContents){
      newContents = this.props.tooltipContents(data)
    }
    else {
      newContents = (
        <div>
          <span>{this.props.IDKey}: {data[this.props.IDKey]}<br/></span>
          {this.props.groupKey &&
          <span>{this.props.groupKey}: {data[this.props.groupKey]}</span>
          }
          {this.props.nodeSize === "on" &&
          <span>{this.props.nodeKey}: {data[this.props.nodeKey]}</span>
          }
        </div>
      )
    }
    this.setState({
      tooltipContents: newContents,
      mouseOver: true,
    })
  }

  deactivateTooltip() {
    this.setState({
      mouseOver: false
    })
  }

  updateMousePos(e) {
    this.setState({
      mouseX: e.pageX,
      mouseY: e.pageY - 10
    })
  }

  getRandomPoints() {
    /* Use nodes and ID key to return dict of ID - point position */
    let positions = {}
    for (let node of this.props.nodes) {
      let xPos = Math.floor(Math.random()*(this.props.width))
      let yPos = Math.floor(Math.random()*(this.props.height))
      positions[node[this.props.IDKey]] = {x: xPos, y: yPos}
    }
    return positions
  }

  pointsRest(){
    this.setState({pointsMoving: false})
  }

  render() {

    let p = new GetPointPositions(this.props.nodes, this.props.links, this.positions,
      this.props.width, this.props.height, this.props.IDKey, this.props.maxRadius)
    let newPositions = p.getPoints()

    let points = []
    let labels = []
    let groupColor = {}

    if (this.props.groupKey) {
      for (let node of this.props.nodes) {
        groupColor[node[this.props.groupKey]] = null
      }
    }

    let palette = getPalette(
      this.props.color, Object.keys(groupColor).length
    )


    if (this.props.nodeSize == "on") {
      let newNodes = new GetNodeSize(JSON.parse(JSON.stringify(this.props.nodes)), this.props.nodeKey, this.props.maxRadius, this.props.pointRadius)
      let sizedData = newNodes.nodeSizes()

      for (let node of sizedData) {
        let nodeID = node[this.props.IDKey]

        let color
        if (this.props.groupKey) {
          if (groupColor[node[this.props.groupKey]]) {
            color = groupColor[node[this.props.groupKey]]
          } else {
            color = palette.shift()
            groupColor[node[this.props.groupKey]] = color
          }
        } else {
          color = this.props.color[0]
        }

        points.push(
          <Node key={nodeID} raw={node}
            x={newPositions[nodeID].x} y={newPositions[nodeID].y}
            radius={node.radius} fill={color}
            initX={this.positions[nodeID].x} initY={this.positions[nodeID].y}
            activateTooltip={this.activateTooltip.bind(this)}
            deactivateTooltip={this.deactivateTooltip.bind(this)}
            pointsRest={this.pointsRest.bind(this)}/>
        )
      }
    } else {
      for (let node of this.props.nodes) {
        let nodeID = node[this.props.IDKey]

        let color
        if (this.props.groupKey) {
          if (groupColor[node[this.props.groupKey]]) {
            color = groupColor[node[this.props.groupKey]]
          } else {
            color = palette.shift()
            groupColor[node[this.props.groupKey]] = color
          }
        } else {
          color = this.props.color[0]
        }
        points.push(
          <Node key={nodeID} raw={node}
            x={newPositions[nodeID].x} y={newPositions[nodeID].y}
            radius={this.props.pointRadius} fill={color}
            initX={this.positions[nodeID].x} initY={this.positions[nodeID].y}
            activateTooltip={this.activateTooltip.bind(this)}
            deactivateTooltip={this.deactivateTooltip.bind(this)}
            pointsRest={this.pointsRest.bind(this)}/>
        )

        if (this.props.labelKey) {
          labels.push(
            <Label
              key={nodeID}
              initX={this.positions[nodeID].x}
              initY={this.positions[nodeID].y}
              x={newPositions[nodeID].x+8} y={newPositions[nodeID].y}
              fill={this.props.labelColor}
              labelText={node[this.props.labelKey]}/>
          )
        }
      }
    }

    let lines = []
    for (let link of this.props.links) {
      let parentPos = newPositions[link[this.props.parentKey]]
      let childPos = newPositions[link[this.props.childKey]]
      let parentInitPos = this.positions[link[this.props.parentKey]]
      let childInitPos = this.positions[link[this.props.childKey]]
      lines.push(
        <Path x1={parentPos.x} y1={parentPos.y}
          x2={childPos.x} y2={childPos.y}
          startX1={parentInitPos.x}
          startY1={parentInitPos.y}
          startX2={childInitPos.x}
          startY2={childInitPos.y}
          strokeWidth={this.props.lineWidth}
          stroke={this.props.lineColor}
          opacity={this.props.lineOpacity}
          key={[link[this.props.parentKey], link[this.props.childKey]]}
        />
      )
    }

    return (
      <div onMouseMove={this.props.tooltip && !this.state.pointsMoving ?
        this.updateMousePos.bind(this) : null}>
        {this.props.tooltip &&
          <Tooltip
            x={this.state.mouseX} y={this.state.mouseY}
            active={this.state.mouseOver}
            contents={this.state.tooltipContents}
            colorScheme={this.props.tooltipColor}
          />
        }
        <svg width={this.props.width} height={this.props.height}>
          {lines}
          {points}
          {labels}
        </svg>
      </div>
    )
  }
}

class NetworkChartResponsive extends React.Component {

  render() {
    return (
      <Resize width={this.props.width}>
        <NetworkChart {...this.props} />
      </Resize>
    )
  }
}

NetworkChartResponsive.defaultProps = {
  width: 800
}


NetworkChart.defaultProps = {
  width: 800,
  height: 600,
  IDKey: "id",
  parentKey: "parent",
  childKey: "child",
  groupKey: "group",
  labelKey: "label",
  pointRadius: 5,
  color: defaultPalette,
  lineWidth: 1,
  lineColor: "#1b1b1b",
  lineOpacity: 0.25,
  labelColor: "#1b1b1b",
  nodeSize: "off",
  nodeKey: "node",
  maxRadius: 10,
  tooltip: true
}

NetworkChart.propTypes = {
  width: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]),
  height: PropTypes.number,
  IDKey: PropTypes.string,
  parentKey: PropTypes.string,
  childKey: PropTypes.string,
  pointRadius: PropTypes.number,
  color: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.array
  ]),
  lineWidth: PropTypes.number,
  lineColor: PropTypes.string,
  lineOpacity: PropTypes.number,
  labelColor: PropTypes.string,
  tooltip: PropTypes.bool,
  tooltipColor: PropTypes.string,
  tooltipContents: PropTypes.func
}

export default NetworkChartResponsive
