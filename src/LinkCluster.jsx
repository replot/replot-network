import React from "react"
import PropTypes from "prop-types"
import getLinkWeights from "./getLinkWeights.js"
import aggregateLinks from "./aggregateLinks.js"
import Link from "./Link.jsx"

class LinkCluster extends React.PureComponent {

  render() {

    let lines = []
    let links = this.props.links

    if (this.props.weightedLinks) {
      if (!this.props.linkKey) {
        let aggLinks = aggregateLinks(
          this.props.links, this.props.parentKey, this.props.childKey, "_linkWeight"
        )
        links = getLinkWeights(
          aggLinks, "_linkWeight",
          this.props.maxLineWidth, this.props.lineWidth
        )
      } else {
        links = getLinkWeights(
          this.props.links, this.props.linkKey,
          this.props.maxLineWidth, this.props.lineWidth
        )
      }
    }

    if (this.props.linksVisible) {
      let linkIndex = 0
      for (let link of links) {
        linkIndex += 1
        let parentPos = this.props.finalPositions[link[this.props.parentKey]]
        let childPos = this.props.finalPositions[link[this.props.childKey]]
        lines.push(
          <Link x1={parentPos.x} y1={parentPos.y}
            x2={childPos.x} y2={childPos.y}
            strokeWidth={this.props.weightedLinks ? link.width
            : this.props.lineWidth}
            stroke={this.props.lineColor}
            opacity={this.props.lineOpacity}
            key={`${linkIndex}.${link[this.props.parentKey]}.${link[this.props.childKey]}`}
          />
        )
      }
    }

    return (
      <g>
        {lines}
      </g>
    )
  }
}

export default LinkCluster
