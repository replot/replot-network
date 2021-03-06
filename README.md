# replot-network: Network charts for react
Intelligent and customizable network chart components for react.

## Installation
Only works with React projects. React must be installed separately.
```bash
npm install replot-network
```

Then with a module bundler like webpack/browserify that supports CommonJS/ES2015 modules, use as you would anything else.

```javascript
import {NetworkChart} from 'replot-network'
```

## Quick Start

replot-network is designed to create beautiful network charts right out of the box.
The only *required* input is properly formatted data.

In the simplest case, just supply data and specify the keys for parents and childs of links:

``` javascript
render() {
    let trades = [
      {exporter: "Germany", importer: "European Union", volume: 1468990},
      {exporter: "Netherlands", importer: "European Union", volume: 798744},
      {exporter: "European Union", importer: "France", volume: 745931},
      ...
    ]

    return(
        <NetworkChart
            data={trades}
            parentKey="exporter"
            childKey="importer"
        />
    )
}
```
- `data` is the only required props
- `parentKey` defaults to `"parent"`
- `childKey` defaults to `"child"`

![ScreenshotNetworkDefault](https://github.com/replot/replot-network/raw/master/img/default.png)

## API

### Dimensions
Dimensions may be specified by passing in `width` and `height` props with numbers, in the unit of pixels.

```javascript
render() {
  return(
    <NetworkChart
        data={trades} parentKey="exporter" childKey="importer"
        width={600}
        height={450}
    />
  )
}
```
- `width` defaults to `800`
- `height` defaults to `600`

Width dimensions may also be specified with a string, as a percentage. The width
will then be calculated as a proportion of the parent container.

```javascript
render() {
  return(
    <NetworkChart
        data={trades} parentKey="exporter" childKey="importer"
        width="50%"
        height={450}
    />
  )
}
```

 Default                   | width={600} height={450}  | width="50%" height={450}        
:-------------------------:|:-------------------------:|:-------------------------:
![ScreenshotDefaultDimensions](https://github.com/replot/replot-network/raw/master/img/dim_default.png) | ![ScreenshotWidth600pxHeight450px](https://github.com/replot/replot-network/raw/master/img/w600_h450.png) | ![ScreenshotWidth50%Height450px](https://github.com/replot/replot-network/raw/master/img/w50_percent.png)

### Link Styles
#### Link Color
Link color may be specified by passing in `lineColor` prop with a hex string.

```javascript
render() {
  return(
    <NetworkChart
        data={trades} parentKey="exporter" childKey="importer"
        lineColor="#52b3d9"
    />
  )
}
```
- `lineColor` defaults to `"#AAA"`

#### Link Opacity
Link opacity may be specified by passing in `lineOpacity` prop with a number between 0 to 1.

```javascript
render() {
  return(
    <NetworkChart
        data={trades} parentKey="exporter" childKey="importer"
        lineOpacity={1}
    />
  )
}
```
- `lineOpacity` defaults to `0.25`

#### Link Width
Link width may be specified by passing in `lineWidth` prop with a number in the unit of pixels.

```javascript
render() {
  return(
    <NetworkChart
        data={trades} parentKey="exporter" childKey="importer"
        lineWidth={5}
    />
  )
}
```
- `lineWidth` defaults to `1`

lineColor="#52b3d9"        | lineOpacity={1}           | lineWidth={5}        
:-------------------------:|:-------------------------:|:-------------------------:
![ScreenshotLinkColor52b3d9](https://github.com/replot/replot-network/raw/master/img/link_52b3d9.png) | ![ScreenshotLinkOpacity1](https://github.com/replot/replot-network/raw/master/img/link_op1.png) | ![ScreenshotLinkWidth5px](https://github.com/replot/replot-network/raw/master/img/link_5px.png)

### Weighted Links
Link width may be weighted by setting the `weightedLinks` prop to `true`. Optionally, supply the `linkKey` prop with the key of link weights and/or to the `minLineWidth` and `maxLineWidth` props with the minimum and maximum link widths in the unit of pixels.

Weighted link widths will range between `minLineWidth` and `maxLineWidth`.

```javascript
render() {
  return(
    <NetworkChart
        data={trades} parentKey="exporter" childKey="importer"
        weightedLinks={true}
        linkKey="volume"
        minLineWidth={1}
        maxLineWidth={20}
    />
  )
}
```
- `weightedLinks` defaults to `false`
- `linkKey` defaults to `null`
- `minLineWidth` defaults to `1`
- `maxLineWidth` defaults to `10`

If `weightedLinks` is `true`, but no `linkKey` is supplied, link width is weighted by how many times the same link appears in data.

 Default                   | linkKey="volume" | linkKey="volume" maxLineWidth={20}
:-------------------------:|:-------------------------:|:-------------------------:
![ScreenshotDefault](https://github.com/replot/replot-network/raw/master/img/default.png) | ![ScreenshotWeightedLinks](https://github.com/replot/replot-network/raw/master/img/weighted_links.png) | ![ScreenshotMaxWidth20px](https://github.com/replot/replot-network/raw/master/img/maxwidth_20.png)

### Node Color
Node color may be specified through 2 different mechanisms, both through a `color` prop.
If none of the mechanisms are specified, NetworkChart defaults to a built-in
color palette.

#### Group Color
Users can supply the `nodes`, `nodeKey`, and `groupKey` props to color nodes by groups. `nodeKey` is the key of node IDs and `groupKey` is the key of node groups.

```
render() {
  let nodes = [
    {region: "America", country: "Canada", exports: 402400},
    {region: "Europe", country: "Belgium", exports: 250800},
    {region: "Asia", country: "China", exports: 2011000},
    ...
  ]

  return(
    <NetworkChart
        data={trades} parentKey="exporter" childKey="importer"
        nodes={nodes}
        nodeKey="country"
        groupKey="region"
    />
  )
}
```
- `nodes` defaults to `null`
- `nodeKey` defaults to `id`
- `groupKey` defaults to `null`

Default | groupKey="region"    
:-------------------------:|:-------------------------:
![ScreenshotDefault](https://github.com/replot/replot-network/raw/master/img/default.png) | ![ScreenshotGroupKey](https://github.com/replot/replot-network/raw/master/img/group_key.png)

#### User-provided Color Palette
Users can specify a list of colors to use as a palette, passed to the `color` prop.

```javascript
render() {
  let colors = ["#fea9ac", "#f46b72", "#caa56f", "#8ebc57"]

  return(
    <NetworkChart
        data={trades} parentKey="exporter" childKey="importer"
        nodes={nodes} nodeKey="country" groupKey="region"
        color={colors}
    />
  )
}
```

color={colors} | color={colors} groupKey="region"    
:-------------------------:|:-------------------------:
![ScreenshotColor](https://github.com/replot/replot-network/raw/master/img/color.png) | ![ScreenshotColorGroupKey](https://github.com/replot/replot-network/raw/master/img/color_group_key.png)

#### User-provided Color function
When `node` and `nodeKey` are supplied, users can also specify a function to assign colors to different nodes. Expected argument to the function is the data for each node.

```javascript

colorByExports(node) {
  if (node['exports'] > 1000000){
    return "red"
  } else {
    return "black"
  }
}

render() {
  return(
    <NetworkChart
        data={trades} parentKey="exporter" childKey="importer"
        nodes={nodes} nodeKey="country"
        color={this.colorByExports}
    />
  )
}
```

![ScreenshotColorFunction](https://github.com/replot/replot-network/raw/master/img/color_function.png)

### Node Radius
Node radius may be specified by passing in `nodeRadius` prop with a number in the unit of pixels.

```javascript
render() {
  return(
    <NetworkChart
        data={trades} parentKey="exporter" childKey="importer"
        nodeRadius={10}
    />
  )
}
```
- `nodeRadius` defaults to `5`

 Default                   | nodeRadius={10}         
:-------------------------:|:-------------------------:
![ScreenshotDefault](https://github.com/replot/replot-network/raw/master/img/default.png) | ![ScreenshotNodeRadius10](https://github.com/replot/replot-network/raw/master/img/radius_10.png)

### Weighted Nodes
Node radius may be weighted by supplying `nodes`, `nodeKey`, and `nodeWeightKey` props. `nodeKey` is the key of node IDs and `nodeWeightKey` is the key of node weights.

Optionally, supply the `minRadius` and `maxRadius` props with the minimum and maximum node radiuses in the unit of pixels. Weighted node radius will range between `minRadius` and `maxRadius`.

```javascript
render() {
  let nodes = [
    {region: "America", country: "Canada", exports: 402400},
    {region: "Europe", country: "Belgium", exports: 250800},
    {region: "Asia", country: "China", exports: 2011000},
    ...
  ]

  return(
    <NetworkChart
        data={trades} parentKey="exporter" childKey="importer"
        nodes={nodes}
        nodeKey="country"
        nodeWeightKey="exports"
        minRadius={5}
        maxRadius={20}
    />
  )
}
```
- `nodes` defaults to `null`
- `nodeKey` defaults to `id`
- `nodeWeightKey` defaults to `null`
- `minRadius` defaults to `5`
- `maxRadius` defaults to `10`

 Default                   | nodeWeightKey="exports"   | nodeWeightKey="exports" maxRadius={20}
:-------------------------:|:-------------------------:|:-------------------------:
![ScreenshotDefault](https://github.com/replot/replot-network/raw/master/img/default.png) | ![ScreenshotWeightedNodes](https://github.com/replot/replot-network/raw/master/img/weighted_nodes.png) | ![ScreenshotMaxRadius20px](https://github.com/replot/replot-network/raw/master/img/maxradius_20.png)

### Node Labels
Node labels may be switched on by setting the `showLabels` prop to `true`.

```javascript
render() {
  return(
    <NetworkChart
        data={trades} parentKey="exporter" childKey="importer"
        showLabels={true}
    />
  )
}
```
- `showLabels` defaults to `false`, `true` displays the labels

Node labels display their IDs by default when switched on.

#### Node Label Color
Node label color may be specified by passing in `labelColor` prop with a hex string.

```javascript
render() {
  return(
    <NetworkChart
        data={trades} parentKey="exporter" childKey="importer"
        showLabels={true}
        labelColor="#52b3d9"
    />
  )
}
```
- `labelColor` defaults to `"#AAA"`

showLabels={true} | showLabels={true} labelColor="#52b3d9"    
:-------------------------:|:-------------------------:
![ScreenshotShowLabels](https://github.com/replot/replot-network/raw/master/img/show_labels.png) | ![ScreenshotShowLabelsLabelColor](https://github.com/replot/replot-network/raw/master/img/label_color.png)

#### Node Label Font Size
Node label font size may be specified by passing in `labelFontSize` prop with a number.

```javascript
render() {
  return(
    <NetworkChart
        data={trades} parentKey="exporter" childKey="importer"
        showLabels={true}
        labelFontSize={20}
    />
  )
}
```
- `labelFontSize` defaults to `null`

If `labelFontSize` is not specified, labels are displayed in medium fonts.

#### Node Label Font Family
Node label font family may be specified by passing in `labelFontFamily` prop with a string.

```javascript
render() {
  return(
    <NetworkChart
        data={trades} parentKey="exporter" childKey="importer"
        showLabels={true}
        labelFontFamily="Courier"
    />
  )
}
```
- `labelFontFamily` defaults to `null`

If `labelFontFamily` is not specified, labels inherit font family.

labelFontSize={20} | labelFontFamily="Courier"
:-------------------------:|:-------------------------:
![ScreenshotLabelFontSize](https://github.com/replot/replot-network/raw/master/img/label_font_size.png) | ![ScreenshotLabelFontFamily](https://github.com/replot/replot-network/raw/master/img/label_font_family.png)

Optionally, supply the the `nodes`, `nodeKey`, and `labelKey` props to specify the label contents. `nodeKey` is the key of node IDs and `groupKey` is the key of node labels.

```
render() {
  let nodes = [
    {region: "America", country: "Canada", exports: 402400},
    {region: "Europe", country: "Belgium", exports: 250800},
    {region: "Asia", country: "China", exports: 2011000},
    ...
  ]

  return(
    <NetworkChart
        data={trades} parentKey="exporter" childKey="importer"
        showLabels={true}
        nodes={nodes}
        nodeKey="country"
        labelKey="region"
    />
  )
}
```
- `nodes` defaults to `null`
- `nodeKey` defaults to `id`
- `labelKey` defaults to `null`

![ScreenshotNetworkShowLabelsLabelKey](https://github.com/replot/replot-network/raw/master/img/label_key.png)

### Attraction Factor
Density of nodes may be specified by passing in `attractionFactor` prop with a number.

```javascript
render() {
  return(
    <NetworkChart
        data={trades} parentKey="exporter" childKey="importer"
        attractionFactor={5}
    />
  )
}
```
- `attractionFactor` defaults to `1`

 Default                   | attractionFactors={5}         
:-------------------------:|:-------------------------:
![ScreenshotDefault](https://github.com/replot/replot-network/raw/master/img/default.png) | ![ScreenshotAttractionFactors5](https://github.com/replot/replot-network/raw/master/img/attractionFactors_5.png)

### Tooltip
Tooltips can display more specific information about a data series.

```javascript
render() {
  return(
    <NetworkChart
        data={trades} parentKey="exporter" childKey="importer"
        tooltip={true}
        tooltipColor="light"
    />
  )
}
```
- `tooltip` defaults to `true`, `false` turns the tooltip off
- `tooltipColor` defaults to `light`, it can be set to `light` or `dark`
- `tooltipContents` defaults to data associated with the node (ID, group and weight if applicable)

Default (tooltipColor="light")|tooltipColor="dark"|tooltip={false}   
:-------------------------:|:-------------------------:|:-------------------------:
![ScreenshotDefaultTooltip](https://github.com/replot/replot-network/raw/master/img/tooltip_light.png) | ![ScreenshotTooltipDark](https://github.com/replot/replot-network/raw/master/img/tooltip_dark.png) | ![ScreenshotTooltipOff](https://github.com/replot/replot-network/raw/master/img/tooltip_off.png)

#### User-provided Tooltip Function
Users can customize what is displayed inside the tooltip with a function. Expected arguments to the function are the title of the location and the data for the specific location hovered over. The function should return JSX.

```javascript
fillTooltip(data){
  return(
    <div>
      <span>The data for this node looks like: {JSON.stringify(data)}</span>
    </div>
  )
}

render() {
  return(
    <NetworkChart
        data={trades} parentKey="exporter" childKey="importer"
        tooltip={true}
        tooltipColor="dark"
        tooltipContents={this.fillTooltip}
    />
  )
}
```

![ScreenshotTooltipCustom](https://github.com/replot/replot-network/raw/master/img/tooltip_custom.png)

### Animation
Users can control the initial animation of the network chart, nodes falling into their positions.

- `animate` defaults to `true`, `false` turns off the animation.
