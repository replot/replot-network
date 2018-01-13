import React from "react"
import NetworkChart from "../../../index.js"
import ComponentContainer from "../CompContainer/ComponentContainer.jsx"
import colors from "../../colors"

const links = [
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
]

class NetworkExampleNodes extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      optionList: [
        {
          optionName: "nodes",
          optionType: "data",
          keyList: ["country"],
          weightKey: "exports",
          initialValue: [
            {country: "Germany", exports: 1283000},
            {country: "European Union", exports: 2659000},
            {country: "Netherlands", exports: 460100},
            {country: "France", exports: 505400},
            {country: "United States", exports: 1471000},
            {country: "Canada", exports: 402400},
            {country: "Belgium", exports: 250800},
            {country: "China", exports: 2011000},
            {country: "Hong Kong", exports: 487700},
            {country: "United Kingdom", exports: 412100},
            {country: "Italy", exports: 436300},
            {country: "Mexico", exports: 359300},
            {country: "Russia", exports: 259300},
            {country: "Spain", exports: 266300},
            {country: "Japan", exports: 641400},
            {country: "Switzerland", exports: 301100},
            {country: "South Korea", exports: 509000},
            {country: "Poland", exports: 188300},
            {country: "Austria", exports: 142900},
            {country: "Czech Republic", exports: 131000},
            {country: "Sweden", exports: 151100},
            {country: "Norway", exports: 102900},
            {country: "Turkey", exports: 152000},
            {country: "Hungary", exports: 89440},
            {country: "Australia", exports: 184300},
            {country: "Denmark", exports: 95970},
            {country: "Taiwan", exports: 314800},
            {country: "Ireland", exports: 125500},
        ]},
        {optionName: "width", name: "Width", optionType: "field", input: "string", initialValue: "98%"},
        {optionName: "height", name: "Height", optionType: "field", input: "number", initialValue: 450},
        {optionName: "nodeRadius", name: "Node Radius", optionType: "field", input: "number", initialValue: 5},
        {optionName: "maxRadius", name: "Max Node Radius", optionType: "field", input: "number", initialValue: 10},
        {optionName: "attractionFactor", name: "Attraction Factor", optionType: "field", input: "number", initialValue: 0.5},
        {optionName: "lineColor", name: "Edge Color", optionType: "field", input: "string", initialValue: colors[this.props.palette].axisColor},
        {optionName: "lineOpacity", name: "Edge Opacity", optionType: "field", input: "number", initialValue: 0.25},
        {optionName: "lineWidth", name: "Edge Width", optionType: "field", input: "number", initialValue: 1},
        {optionName: "weightedLinks", name: "Weighted Edges", optionType: "bool", initialValue: true},
        {optionName: "maxWidth", name: "Max Edge Width", optionType: "field", input: "number", initialValue: 10},
        {optionName: "showLabels", name: "Show Labels", optionType: "bool", initialValue: false},
        {optionName: "labelColor", name: "Label Color", optionType: "field", input: "string", initialValue: colors[this.props.palette].axisColor},
        {optionName: "tooltip", name: "Tooltip", optionType: "bool", initialValue: true},
        {optionName: "tooltipColor", name: "Tooltip Color", optionType: "state", states:["dark","light"], initialValue: "dark"},
        {optionName: "nodeKey", name: "Node", optionType: "hidden", initialValue: "country"},
        {optionName: "nodeWeightKey", name: "Node Weight", optionType: "hidden", initialValue: "exports"},
        {optionName: "labelKey", name: "Label", optionType: "hidden", initialValue: "country"},
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
        color: colors[this.props.palette].body.text,
        padding: 15,
      },
      container: {
        padding: "80px 0px",
      },
    }
    return(
      <div className="container" style={style.container}>
        <h1 style={style.title}> Bilateral Trades with Net Exports </h1>
        <br />
        <ComponentContainer optionList={this.state.optionList}
          palette={this.props.palette}>
          <NetworkChart data={links}
            nodes={this.state.optionList[0].initialValue}/>
        </ComponentContainer>
      </div>
    )
  }
}


export default NetworkExampleNodes
