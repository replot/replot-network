import React from "react"
import ReactDOM from "react-dom"
import NetworkChart from "../src/index.jsx"

class ExampleApp extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      nodes: [
        {id: 1, name: "One", age: 10, country: "India"},
        {id: 2, name: "Two", age: 30, country: "India"},
        {id: 3, name: "Three", age: 20, country: "India"},
        {id: 4, name: "Four", age: 50, country: "United States"},
        {id: 5, name: "Five", age: 40, country: "United States"},
        {id: 6, name: "Six", age: 20, country: "China"},
        {id: 7, name: "Seven", age: 10, country: "China"}
      ],
      links: [
        {parent: 2, child: 1},
        {parent: 2, child: 7},
        {parent: 4, child: 3},
        {parent: 4, child: 2},
        {parent: 5, child: 3},
        {parent: 5, child: 6}
      ]
    }
  }

  render() {
    return(
      <div className="container"
        style={{textAlign:"center",fontFamily:"Open Sans"}}>
        <h1 style={{textAlign: "center"}}>Network Chart</h1>
        <NetworkChart nodes={this.state.nodes} links={this.state.links}
          labelKey="name" groupKey="country" />
      </div>
    )
  }
}


ReactDOM.render(
  <ExampleApp />,
  document.getElementById("react-app")
)
