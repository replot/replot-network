import React from "react"
import SectionContainer from "./SectionContainer.jsx"
import NetworkExampleLinks from "./examples/NetworkExampleLinks.jsx"
import NetworkExampleNodes from "./examples/NetworkExampleNodes.jsx"

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
