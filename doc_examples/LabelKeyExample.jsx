import React from "react"
import NetworkChart from "../index.js"

class LabelKeyExample extends React.Component {

  render() {
    const trades = [
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

    const netExports = [
      {region: "Europe", country: "Germany", exports: 1283000},
      {region: "Europe", country: "European Union", exports: 2659000},
      {region: "Europe", country: "Netherlands", exports: 460100},
      {region: "Europe", country: "France", exports: 505400},
      {region: "America", country: "United States", exports: 1471000},
      {region: "America", country: "Canada", exports: 402400},
      {region: "Europe", country: "Belgium", exports: 250800},
      {region: "Asia", country: "China", exports: 2011000},
      {region: "Asia", country: "Hong Kong", exports: 487700},
      {region: "Europe", country: "United Kingdom", exports: 412100},
      {region: "Europe", country: "Italy", exports: 436300},
      {region: "America", country: "Mexico", exports: 359300},
      {region: "Asia", country: "Russia", exports: 259300},
      {region: "Europe", country: "Spain", exports: 266300},
      {region: "Asia", country: "Japan", exports: 641400},
      {region: "Europe", country: "Switzerland", exports: 301100},
      {region: "Asia", country: "South Korea", exports: 509000},
      {region: "Europe", country: "Poland", exports: 188300},
      {region: "Europe", country: "Austria", exports: 142900},
      {region: "Europe", country: "Czech Republic", exports: 131000},
      {region: "Europe", country: "Sweden", exports: 151100},
      {region: "Europe", country: "Norway", exports: 102900},
      {region: "Asia", country: "Turkey", exports: 152000},
      {region: "Europe", country: "Hungary", exports: 89440},
      {region: "Oceania", country: "Australia", exports: 184300},
      {region: "Europe", country: "Denmark", exports: 95970},
      {region: "Asia", country: "Taiwan", exports: 314800},
      {region: "Europe", country: "Ireland", exports: 125500},
    ]

    return(
      <div>
        <NetworkChart
            data={trades}
            parentKey="exporter"
            childKey="importer"
            showLabels={true}
            nodes={netExports}
            nodeKey="country"
            labelKey="region"
        />
      </div>
    )
  }
}


export default LabelKeyExample
