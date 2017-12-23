import React from "react"
import PropTypes from "prop-types"
import getFinalNodePositions from "./getFinalNodePositions.js"
import NodeCluster from "./NodeCluster.jsx"
import LinkCluster from "./LinkCluster.jsx"
import LabelCluster from "./LabelCluster.jsx"
import {Set} from "immutable"
import {defaultPalette} from "./color.js"

class NetworkChart extends React.PureComponent {

  constructor(props) {
    super(props)

    this.state = {
      linksVisible: false,
      labelsVisible: false,
      initPositions: null,
      finalPositions: null
    }

    this.pointsRest = this.pointsRest.bind(this)
  }

  pointsRest() {
    this.setState({linksVisible: true, labelsVisible: true})
    this.props.pointsRest()
  }

  componentWillMount() {
    let initPositions = {}
    for (let node of this.props.nodes) {
      let xPos = Math.floor(Math.random()*(this.props.width))
      let yPos = Math.floor(Math.random()*(this.props.height))
      initPositions[node[this.props.nodeKey]] = {x: xPos, y: yPos}
    }

    this.setState({
      initPositions: initPositions,
      finalPositions: getFinalNodePositions(
      this.props.nodes, this.props.links, initPositions,
      this.props.width, this.props.height, this.props.nodeKey,
      this.props.maxRadius, this.props.attractionFactor,
      this.props.parentKey, this.props.childKey)
    })
  }

  didDataChange(newProps, oldProps) {
    if (newProps.nodes.length != oldProps.nodes.length) {
      return true
    } else if (newProps.links.length != oldProps.links.length) {
      return true
    } else {
      const oldLinks = Set(oldProps.links.map(
        (e) => {
          return e[this.props.parentKey] + "." + e[this.props.childKey]
        }
      ))
      const newLinks = Set(newProps.links.map(
        (e) => {
          return e[this.props.parentKey] + "." + e[this.props.childKey]
        }
      ))
      if (!oldLinks.equals(newLinks)) {
        return true
      }
      const oldNodes = Set(oldProps.nodes.map(
        (e) => {
          return e[this.props.nodeKey]
        }
      ))
      const newNodes = Set(newProps.nodes.map(
        (e) => {
          return e[this.props.nodeKey]
        }
      ))
      if (!oldNodes.equals(newNodes)) {
        return true
      }
    }
    return false
  }

  componentWillReceiveProps(nextProps) {
    if (this.didDataChange(nextProps, this.props)) {
      let initPositions = this.props.finalPositions
      if (!(initPositions && initPositions.length > 0)) {
        initPositions = {}
        for (let node of this.props.nodes) {
          let xPos = Math.floor(Math.random()*(this.props.width))
          let yPos = Math.floor(Math.random()*(this.props.height))
          initPositions[node[this.props.nodeKey]] = {x: xPos, y: yPos}
        }
      }
      this.setState({
        initPositions: initPositions,
        finalPositions: getFinalNodePositions(
        nextProps.nodes, nextProps.links, initPositions,
        nextProps.width, nextProps.height, nextProps.nodeKey,
        nextProps.maxRadius, nextProps.attractionFactor,
        nextProps.parentKey, nextProps.childKey)
      })
    }
  }

  render() {
    return (
      <svg width={this.props.width} height={this.props.height}>
        <NodeCluster nodes={this.props.nodes}
          initPositions={this.state.initPositions}
          finalPositions={this.state.finalPositions}
          graphStyle={this.props.graphStyle}
          nodeKey={this.props.nodeKey}
          groupKey={this.props.groupKey}
          color={this.props.color}
          maxRadius={this.props.maxRadius}
          activateTooltip={this.props.activateTooltip}
          deactivateTooltip={this.props.deactivateTooltip}
          pointsRest={this.pointsRest} />
        <LinkCluster links={this.props.links}
          finalPositions={this.state.finalPositions}
          linksVisible={this.state.linksVisible}
          weightedLinks={this.props.weightedLinks}
          graphStyle={this.props.graphStyle}
          parentKey={this.props.parentKey}
          childKey={this.props.childKey} />
        <LabelCluster nodes={this.props.nodes}
          finalPositions={this.state.finalPositions}
          graphStyle={this.props.graphStyle}
          showLabels={this.props.showLabels}
          labelKey={this.props.labelKey}
          nodeKey={this.props.nodeKey}
          labelsVisible={this.state.labelsVisible} />
      </svg>
    )
  }
}


NetworkChart.defaultProps = {
  width: 800,
  height: 600,
  nodeKey: "id",
  parentKey: "parent",
  childKey: "child",
  groupKey: "group",
  labelKey: "label",
  color: defaultPalette,
  graphStyle: {
    nodeRadius: 10,
    lineWidth: "1px",
    lineColor: "#1b1b1b",
    lineOpacity: 0.25,
    labelColor: "#1b1b1b",
  },
  nodeSize: false,
  weightedLinks: false,
  nodeWeightKey: "node",
  linkKey: null,
  maxRadius: 10,
  maxWidth: 10,
  zoomScale: 2,
  showLabels: true,
  tooltip: false,
  attractionFactor: 1,
}

NetworkChart.propTypes = {
  width: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]),
  height: PropTypes.number,
  nodeKey: PropTypes.string,
  parentKey: PropTypes.string,
  childKey: PropTypes.string,
  linkKey: PropTypes.string,
  weightedLinks: PropTypes.bool,
  nodeSize: PropTypes.bool,
  maxWidth: PropTypes.number,
  color: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.array
  ]),
  graphStyle: PropTypes.object,
  zoomScale: PropTypes.number,
  showLabels: PropTypes.bool,
  tooltip: PropTypes.bool,
  tooltipColor: PropTypes.string,
  tooltipContents: PropTypes.func
}

export default NetworkChart
