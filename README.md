# Network Chart for react
Customizable network chart components for react.

```javascript
render() {
  let characters = [
    {id: "Juliet", group: "Capulet"},
    {id: "Tybalt", group: "Capulet"},
    {id: "Lady Capulet", group: "Capulet"},
    {id: "Capulet", group: "Capulet"},
    {id: "Gregory", group: "Servants"},
    {id: "Sampson", group: "Servants"},
    {id: "Nurse", group: "Servants"},
    {id: "Peter", group: "Servants"},
    {id: "Romeo", group: "Montague"},
    {id: "Benvolio", group: "Montague"},
    {id: "Lady Montague", group: "Montague"},
    {id: "Montague", group: "Montague"},
    {id: "Balthasar", group: "Servants"},
    {id: "Abraham", group: "Servants"},
    {id: "Prince of Verona", group: "Verona"},
    {id: "Paris", group: "Verona"},
    {id: "Mercutio", group: "Verona"},
    {id: "Friar Lawrence", group: "Verona"},
    {id: "Friar John", group: "Verona"},
  ]
  let relationships = [
      {parent: "Juliet", child: "Tybalt"},
      {parent: "Juliet", child: "Lady Capulet"},
      {parent: "Juliet", child: "Capulet"},
      {parent: "Juliet", child: "Nurse"},
      {parent: "Juliet", child: "Romeo"},
      {parent: "Capulet", child: "Lady Capulet"},
      {parent: "Paris", child: "Juliet"},
      {parent: "Romeo", child: "Benvolio"},
      {parent: "Romeo", child: "Tybalt"},
      {parent: "Romeo", child: "Montague"},
      {parent: "Romeo", child: "Lady Montague"},
      {parent: "Romeo", child: "Balthasar"},
      {parent: "Romeo", child: "Mercutio"},
      {parent: "Montague", child: "Lady Montague"},
      {parent: "Tybalt", child: "Mercutio"},
      {parent: "Mercutio", child: "Prince of Verona"},
      {parent: "Paris", child: "Prince of Verona"},
      {parent: "Friar Lawrence", child: "Juliet"},
      {parent: "Friar Lawrence", child: "Romeo"},
      {parent: "Friar Lawrence", child: "Friar John"},
      {parent: "Nurse", child: "Gregory"},
      {parent: "Nurse", child: "Sampson"},
      {parent: "Nurse", child: "Peter"},
      {parent: "Balthasar", child: "Abraham"},
    ]
  return (
    <NetworkChart nodes={characters}
    links={relationships}
    groupKey="group"
    labelKey="id" />
  )
}
```

- `nodes` and `links` are the only required props
- `groupKey` defaults to `"group"`
- `labelKey` defaults to `"label"`

### Tooltip
NetworkCharts are capable of utilizing a tooltip to display more specific information
about the nodes. By default, the tooltip is on, but can be deactivated by
passing in a `tooltip` prop with a value of false. The tooltip features two different
color schemes, dark and light, which can be specified by a
`tooltipColor` prop, with a value of "dark" or "light".

```javascript
render() {
  ...

  return(
    <NetworkChart nodes={characters}
    links={relationships} tooltipColor="light" />
  )
}
```

#### Customizing Tooltip contents
By default, the tooltip will display the id of a node, the group (if one exists),
and the weight (if one exists). The user can customize exactly what is
displayed inside the tooltip by passing in a `tooltipContents` prop in the form
of a Javascript function. The user can expect to receive raw data (in object form)
for the node being hovered over in the network. The function should return JSX,
which can utilize some or all of the provided values.

```javascript
fillTooltip(data){
  return (
    <div>
      The name of this node is {data.name}
    </div>
  )
}

render() {
  ...

  return(
    <NetworkChart nodes={characters}
    links={relationships} tooltipContents={this.fillTooltip}/>
  )
}
```

### Chart Customization
- `width` defaults to `800`
  - specify the width of the chart
- `height` defaults to `600`
  - specify the height of the chart
- `pointRadius` defaults to `5.5`
  - specify the radius of the nodes in the chart
- `color` defaults to preset palette
  - specify an array of color hex codes, e.g. `["#F1856E", "#9AC7BF", "#C0D9A0"]`
  - specify a function
- `lineWidth` defaults to `1`
  - specify the width of the lines connecting the nodes
- `lineColor` defaults to `"#1b1b1b"`
  - specify the color of the lines connecting the nodes
- `lineOpacity` defaults to `0.25`
  - specify the opacity of the lines connecting the nodes
- `labelColor` defaults to `"#1b1b1b"`
  - specify the color of the node labels

### Data Customization
- `parentKey` defaults to `"parent"`
  - specify the source of an link
- `childKey` defaults to `"child"`
  - specify the target of an link
- `labelKey` defaults to `"label"`
  - specify what to label the nodes by
