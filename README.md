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

## API
replot-network is designed to create beautiful network charts right out of the box.
The only *required* input is properly formatted data.

### Basic Usage
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

![ScreenshotNetworkDefault](img/default.png)

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
![ScreenshotDefaultDimensions](img/dim_default.png) | ![ScreenshotWidth600pxHeight450px](img/w600_h450.png) | ![ScreenshotWidth50%Height450px](img/w50_percent.png)

### Attraction Factor
Users may pass in a number to the `attractionFactor` prop to specify the density of network nodes.

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
![ScreenshotDefault](img/default.png) | ![ScreenshotAttractionFactors5](img/attractionFactors_5.png)

### Link Styles

#### Link Color
Users may pass in a hex color string to the `lineColor` prop to specify the color of network links.

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
- `lineColor` defaults to `"#1b1b1b"`

#### Link Opacity
Users may pass in a number between 0-1 to the `lineOpacity` prop to specify the opacity of network links.

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
Users may pass in a number to the `lineWidth` prop to specify the width of network links in pixels.

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
![ScreenshotLinkColor52b3d9](img/link_52b3d9.png) | ![ScreenshotLinkOpacity1](img/link_op1.png) | ![ScreenshotLinkWidth5px](img/link_5px.png)

#### Weighted Links
Link widths may be weighted when the `weightedLinks` prop is set to `true`. You may also supply the key of link weights to the `linkKey`props and the maximum link width in pixels to the `maxWidth` prop. Link widths will range between widths defined by the `lineWidth` and `maxWidth` props.

```javascript
render() {
  return(
    <NetworkChart 
        data={trades} nodes={nodes} parentKey="exporter" childKey="importer"
        weightedLinks={true}
        linkKey="volume"
        maxWidth={15}
    />
  )
}
```
- `weightedLinks` defaults to `false`
- `linkKey` defaults to `null`
- `maxWidth` defaults to `10`

If `weightedLinks` is set to `true`, but no `linkKey` is supplied, link widths are weighted by how many times the same link appears in the data.

 Default                   | weightedLinks={true} linkKey="volume" | weightedLinks={true} linkKey="volume" maxWidth={15}       
:-------------------------:|:-------------------------:|:-------------------------:
![ScreenshotDefault](img/default.png) | ![ScreenshotWeightedLinks](img/weighted_links.png) | ![ScreenshotMaxWidth15px](img/maxwidth_15.png)

### Node Labels
Node labels are hidden by default. Users may choose to display the labels and optionally specify the keys for labels. 

```javascript
render() {
  return(
    <NetworkChart 
        data={trades} nodes={nodes} parentKey="exporter" childKey="importer"
        showLabels={true}
        labelKey="country"
    />
  )
}
```
- `showLabels` defaults to `false`, `true` displays the labels
- `labelKey` defaults to `null`

If no `nodes` or no `labelKey` is supplied, the labels display their IDs.

#### Node Label Color
Users may pass in a hex color string to the `labelColor` prop to specify the color of node labels.

```javascript
render() {
  return(
    <NetworkChart 
        data={trades} nodes={nodes} parentKey="exporter" childKey="importer"
        showLabels={true}
        labelColor="#52b3d9"
    />
  )
}
```
- `labelColor` defaults to `"#1b1b1b"`

showLabels={true} | showLabels={true} labelKey="country" | showLabels={true} labelColor="#52b3d9"    
:-------------------------:|:-------------------------:|:-------------------------:
![ScreenshotShowLabels](img/show_labels.png) | ![ScreenshotShowLabelsLabelKey](img/show_labels_key.png) | ![ScreenshotShowLabelsLabelColor](img/label_color.png)

### Node Styles

#### Node Color
Node color may be specified through 2 different mechanisms, both through a `color` prop.
If none of the mechanisms are specified, NetworkChart defaults to a built in
color palette.

##### Group Color
Users may supply the `nodes`, `nodeKey`, and `groupKey` props to color nodes by groups. `nodeKey` is the key of node IDs and `groupKey` is the key of node groups.

```
GROUP COLORING CODE
```
- `nodes` defaults to `null`
- `nodeKey` defaults to `id`
- `groupKey` defaults to `null`

##### User-provided Color Palette
Users can specify a list of colors to use as a palette, passed to the `color` prop.

```javascript
render() {
  let colors = [
    "#fea9ac", "#fc858f", "#f46b72", "#de836e",
    "#caa56f", "#adcc6f", "#8ebc57", "#799b3f"
  ]

  return(
    <NetworkChart 
        data={trades} nodes={nodes} parentKey="exporter" childKey="importer" groupKey="region"
        color={colors}
    />
  )
}
```

##### User-provided Color Function
Users can also specify a function to assign colors to different data series. Expected arguments to the function are the index of the data series (from 0) and the title of the data series (if it exists).

```javascript
colorMe(data) {
  if (data.region === "Europe"){
    return "green"
  } else {
    return "blue"
  }
}

render() {
  return(
    <NetworkChart 
        data={trades} nodes={nodes} parentKey="exporter" childKey="importer" groupKey="region"
        color={this.colorMe}
    />
  )
}
```

Default                    | color={colors}            | color={this.colorMe}    
:-------------------------:|:-------------------------:|:-------------------------:
![ScreenshotDefaultGroup](img/default_group.png) | ![ScreenshotGroupColorArray](img/color_array.png) | ![ScreenshotGroupColorFunction](img/color_function.png)

#### Node Radius
Users may pass in a number to the `nodeRadius` prop to specify the radius of network nodes in pixels.

```javascript
render() {
  return(
    <NetworkChart 
        data={trades} nodes={nodes} parentKey="exporter" childKey="importer"
        nodeRadius={10}
    />
  )
}
```
- `nodeRadius` defaults to `5`

 Default                   | nodeRadius={10}         
:-------------------------:|:-------------------------:
![ScreenshotDefault](img/default.png) | ![ScreenshotNodeRadius10](img/radius_10.png)

#### Weighted Nodes
Node radiuses may be weighted when the `nodes`, `nodeKey`, and `nodeWeightKey` props are supplied. `nodeKey` is the key of node IDs and `nodeWeightKey` is the key of node weights. Node radiuses will range between radiuses defined by the `nodeRadius` and `maxRadius` props.

```javascript
render() {
  return(
    <NetworkChart 
        data={trades} parentKey="exporter" childKey="importer"
        nodes={nodes}
        nodeKey="country"
        nodeWeightKey="exports"
        maxWidth={20}
    />
  )
}
```
- `nodes` defaults to `null`
- `nodeKey` defaults to `id`
- `nodeWeightKey` defaults to `null`
- `maxRadius` defaults to `10`

 Default                   | nodeWeightKey="exports"   | nodeWeightKey="exports" maxWidth={20}
:-------------------------:|:-------------------------:|:-------------------------:
![ScreenshotDefault](img/default.png) | ![ScreenshotWeightedNodes](img/weighted_nodes.png) | ![ScreenshotMaxRadius20px](img/maxradius_20.png)

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
![ScreenshotDefaultTooltip](img/tooltip_light.png) | ![ScreenshotTooltipDark](img/tooltip_dark.png) | ![ScreenshotTooltipOff](img/tooltip_off.png)

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
        tooltipContents={this.fillTooltip}
    />
  )
}
```

![ScreenshotTooltipCustom](img/tooltip_custom.png)
