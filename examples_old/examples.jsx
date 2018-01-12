import React from "react"
import ReactDOM from "react-dom"
import SmallNetwork from "./SmallNetwork.jsx"
import LargeNetwork from "./LargeNetwork.jsx"


ReactDOM.render(
  <SmallNetwork />,
  document.getElementById("small-example")
)

ReactDOM.render(
  <LargeNetwork />,
  document.getElementById("large-example")
)
