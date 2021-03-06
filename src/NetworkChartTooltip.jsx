import React from "react"
import PropTypes from "prop-types"
import {Resize, Tooltip} from "replot-core"
import NetworkChart from "./NetworkChart.jsx"

class NetworkChartTooltip extends React.PureComponent {

  constructor(props) {
    super(props)
    this.state = {
      tooltipContents: null,
      mouseOver: false,
      mouseX: null,
      mouseY: null,
    }
    this.updateMousePosition = this.updateMousePosition.bind(this)
    this.activateTooltip = this.activateTooltip.bind(this)
    this.deactivateTooltip = this.deactivateTooltip.bind(this)
  }

  activateTooltip(data) {
    return () => {
      let newContents
      if (this.props.tooltipContents){
        newContents = this.props.tooltipContents(data)
      }
      else {
        newContents = (
          <div>
            <span>{this.props.nodeKey}: {data[this.props.nodeKey]}<br/></span>
            {this.props.groupKey &&
            <span>{this.props.groupKey}: {data[this.props.groupKey]}</span>
            }
            {this.props.nodeSize &&
            <span>{this.props.nodeWeightKey}: {data[this.props.nodeWeightKey]}</span>
            }
          </div>
        )
      }
      this.setState({
        tooltipContents: newContents,
        mouseOver: true,
      })
    }
  }

  deactivateTooltip() {
    this.setState({
      mouseOver: false
    })
  }

  updateMousePosition(e) {
    if (this.props.tooltip) {
      this.setState({
        mouseX: e.pageX,
        mouseY: e.pageY - 10
      })
    }
  }

  render() {
    return (
      <div onMouseMove={this.updateMousePosition}>
        <NetworkChart
          {...this.props}
          links={this.props.data}
          activateTooltip={this.activateTooltip}
          deactivateTooltip={this.deactivateTooltip}
        />
        {this.props.tooltip &&
          <Tooltip
            x={this.state.mouseX} y={this.state.mouseY}
            active={this.state.mouseOver}
            contents={this.state.tooltipContents}
            colorScheme={this.props.tooltipColor}
          />
        }
      </div>
    )
  }
}

NetworkChartTooltip.defaultProps = {
  nodeKey: "id",
  tooltip: true,
}

NetworkChartTooltip.propTypes = {
  tooltip: PropTypes.bool,
  tooltipColor: PropTypes.string,
  tooltipContents: PropTypes.func,
}

class NetworkChartResponsive extends React.Component {

  render() {
    return (
      <Resize width={this.props.width}>
        <NetworkChartTooltip {...this.props} />
      </Resize>
    )
  }
}

NetworkChartResponsive.defaultProps = {
  width: 800
}


export default NetworkChartResponsive
