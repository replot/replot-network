import React from "react"
import NetworkChart from "../index.js"
import {ComponentContainer, ColorTheme} from "replot-helpers"

class NetworkExampleLinks extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      optionList: [
        {
          optionName: "data",
          optionType: "data",
          keyList: ["exporter", "importer"],
          weightKey: "volume",
          initialValue: [
            {exporter: "Germany", importer: "European Union", volume: 1468990},
            {exporter: "Netherlands", importer: "European Union", volume: 798744},
            {exporter: "European Union", importer: "France", volume: 745931},
            {exporter: "European Union", importer: "United States", volume: 631868},
            {exporter: "Canada", importer: "United States", volume: 615908},
            {exporter: "Belgium", importer: "European Union", volume: 628796},
            {exporter: "China", importer: "Hong Kong", volume: 496359},
            {exporter: "China", importer: "United States", volume: 554573},
            {exporter: "European Union", importer: "United Kingdom", volume: 580318},
            {exporter: "China", importer: "European Union", volume: 547015},
            {exporter: "Italy", importer: "European Union", volume: 539556},
            {exporter: "Mexico", importer: "United States", volume: 501114},
            {exporter: "Russia", importer: "European Union", volume: 395834},
            {exporter: "Spain", importer: "European Union", volume: 365191},
            {exporter: "China", importer: "Japan", volume: 311146},
            {exporter: "European Union", importer: "Switzerland", volume: 300133},
            {exporter: "South Korea", importer: "China", volume: 251471},
            {exporter: "Poland", importer: "European Union", volume: 267854},
            {exporter: "European Union", importer: "Austria", volume: 244913},
            {exporter: "Czech Republic", importer: "European Union", volume: 225091},
            {exporter: "Japan", importer: "United States", volume: 206464},
            {exporter: "European Union", importer: "Sweden", volume: 204849},
            {exporter: "China", importer: "Germany", volume: 187293},
            {exporter: "Norway", importer: "European Union", volume: 179502},
            {exporter: "Germany", importer: "United States", volume: 184247},
            {exporter: "European Union", importer: "Turkey", volume: 158206},
            {exporter: "Hungary", importer: "European Union", volume: 154862},
            {exporter: "European Union", importer: "Japan", volume: 143807},
            {exporter: "Australia", importer: "China", volume: 128725},
            {exporter: "European Union", importer: "Denmark", volume: 129951},
            {exporter: "Taiwan", importer: "China", volume: 124502},
            {exporter: "United Kingdom", importer: "United States", volume: 116675},
            {exporter: "Germany", importer: "Switzerland", volume: 115041},
            {exporter: "Ireland", importer: "European Union", volume: 105853},
        ]},
        {optionName: "width", name: "Width", optionType: "field", input: "string", initialValue: "98%"},
        {optionName: "height", name: "Height", optionType: "field", input: "number", initialValue: 450},
        {optionName: "nodeRadius", name: "Node Radius", optionType: "field", input: "number", initialValue: 5},
        {optionName: "attractionFactor", name: "Attraction Factor", optionType: "field", input: "number", initialValue: 0.5},
        {optionName: "lineColor", name: "Edge Color", optionType: "field", input: "string", initialValue: ColorTheme[this.props.palette].axisColor},
        {optionName: "lineOpacity", name: "Edge Opacity", optionType: "field", input: "number", initialValue: 0.25},
        {optionName: "lineWidth", name: "Unweighted Edge Width", optionType: "field", input: "number", initialValue: 1},
        {optionName: "weightedLinks", name: "Weighted Edges", optionType: "bool", initialValue: true},
        {optionName: "minLineWidth", name: "Min Edge Width", optionType: "field", input: "number", initialValue: 1},
        {optionName: "maxLineWidth", name: "Max Edge Width", optionType: "field", input: "number", initialValue: 10},
        {optionName: "showLabels", name: "Show Labels", optionType: "bool", initialValue: false},
        {optionName: "labelColor", name: "Label Color", optionType: "field", input: "string", initialValue: ColorTheme[this.props.palette].axisColor},
        {optionName: "tooltip", name: "Tooltip", optionType: "bool", initialValue: true},
        {optionName: "tooltipColor", name: "Tooltip Color", optionType: "state", states:["dark","light"], initialValue: "dark"},
        {optionName: "parentKey", name: "Parent", optionType: "hidden", initialValue: "exporter"},
        {optionName: "childKey", name: "Child", optionType: "hidden", initialValue: "importer"},
        {optionName: "linkKey", name: "Edge", optionType: "hidden", initialValue: "volume"},
      ]
    }
  }

  render() {
    let style = {
      title: {
        fontSize: "45px",
        color: ColorTheme[this.props.palette].body.text,
        padding: 15,
      },
      container: {
        padding: "80px 0px",
      },
    }
    return(
      <div className="container" style={style.container}>
        <h1 style={style.title}> Bilateral Trades </h1>
        <br />
        <ComponentContainer optionList={this.state.optionList}
          palette={this.props.palette}>
          <NetworkChart data={this.state.optionList[0].initialValue}/>
        </ComponentContainer>
      </div>
    )
  }
}


export default NetworkExampleLinks
