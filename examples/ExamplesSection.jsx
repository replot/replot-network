import React from "react"
import {SectionContainer} from "replot-helpers"
import NetworkExampleLinks from "./NetworkExampleLinks.jsx"
import NetworkExampleNodes from "./NetworkExampleNodes.jsx"

class ExamplesSection extends React.Component {

  render() {
    return(
      <SectionContainer>
        <NetworkExampleLinks palette={this.props.palette} />
        <NetworkExampleNodes palette={this.props.palette} />
      </SectionContainer>
    )
  }

}

export default ExamplesSection
