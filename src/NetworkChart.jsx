import React from "react"
import PropTypes from "prop-types"
import getFinalNodePositions from "./getFinalNodePositions.js"
import constructNodes from "./constructNodes.js"
import NodeCluster from "./NodeCluster.jsx"
import LinkCluster from "./LinkCluster.jsx"
import LabelCluster from "./LabelCluster.jsx"
import {Set as ImmutableSet} from "immutable"
import {defaultPalette} from "./color.js"

class NetworkChart extends React.PureComponent {

  constructor(props) {
    super(props)

    this.state = {
      linksVisible: false,
      labelsVisible: false,
      initPositions: null,
      finalPositions: null,
      nodes: null,
    }

    this.pointsRest = this.pointsRest.bind(this)
  }

  pointsRest() {
    this.setState({linksVisible: true, labelsVisible: true})
    this.props.pointsRest()
  }

  componentWillMount() {
    let nodes = constructNodes(this.props.links, this.props.nodes, this.props.nodeKey,
      this.props.childKey, this.props.parentKey, this.props.groupKey,
      this.props.labelKey, this.props.graphStyle.nodeRadius)

    let initPositions = {}
    for (let node of nodes) {
      let xPos = Math.floor(Math.random()*(this.props.width))
      let yPos = Math.floor(Math.random()*(this.props.height))
      initPositions[node[this.props.nodeKey]] = {x: xPos, y: yPos}
    }
    this.setState({
      initPositions: initPositions,
      finalPositions: getFinalNodePositions(
      nodes, this.props.links, initPositions,
      this.props.width, this.props.height, this.props.nodeKey,
      this.props.maxRadius, this.props.attractionFactor,
      this.props.parentKey, this.props.childKey),
      nodes: ImmutableSet(nodes)
    })
  }

  didDataChange(newProps, oldProps) {
    if (newProps.nodes && oldProps.nodes) {
      if (newProps.nodes.length != oldProps.nodes.length) {
        return true
      }
      const oldNodes = ImmutableSet(oldProps.nodes.map(
        (e) => {
          return e[this.props.nodeKey]
        }
      ))
      const newNodes = ImmutableSet(newProps.nodes.map(
        (e) => {
          return e[this.props.nodeKey]
        }
      ))
      if (!oldNodes.equals(newNodes)) {
        return true
      }
    } else if (newProps.nodes || oldProps.nodes) {
      return true
    }

    if (newProps.data.length != oldProps.data.length) {
      return true
    }
    const oldLinks = ImmutableSet(oldProps.data.map(
      (e) => {
        return e[this.props.parentKey] + "." + e[this.props.childKey]
      }
    ))
    const newLinks = ImmutableSet(newProps.data.map(
      (e) => {
        return e[this.props.parentKey] + "." + e[this.props.childKey]
      }
    ))
    if (!oldLinks.equals(newLinks)) {
      return true
    }
    return false
  }

  componentWillReceiveProps(nextProps) {
    if (this.didDataChange(nextProps, this.props)) {
      let nodes = constructNodes(nextProps.links, nextProps.nodes, nextProps.nodeKey,
        nextProps.childKey, nextProps.parentKey, nextProps.groupKey,
        nextProps.labelKey, nextProps.graphStyle.nodeRadius)

      let initPositions = {}
      for (let node of nodes) {
        let xPos = Math.floor(Math.random()*(this.props.width))
        let yPos = Math.floor(Math.random()*(this.props.height))
        initPositions[node[this.props.nodeKey]] = {x: xPos, y: yPos}
      }
      this.setState({
        initPositions: initPositions,
        finalPositions: getFinalNodePositions(
        nodes, nextProps.links, initPositions,
        nextProps.width, nextProps.height, nextProps.nodeKey,
        nextProps.maxRadius, nextProps.attractionFactor,
        nextProps.parentKey, nextProps.childKey),
        nodes: ImmutableSet(nodes)
      })
    }
  }

  render() {
    return (
      <svg width={this.props.width} height={this.props.height}>
        <LinkCluster links={this.props.links}
          finalPositions={this.state.finalPositions}
          linksVisible={this.state.linksVisible}
          weightedLinks={this.props.weightedLinks}
          graphStyle={this.props.graphStyle}
          parentKey={this.props.parentKey}
          childKey={this.props.childKey} />
        <NodeCluster nodes={this.state.nodes.toList()}
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
        <LabelCluster nodes={this.state.nodes.toList()}
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
  showLabels: false,
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
}

export default NetworkChart
