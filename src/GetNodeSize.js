class GetNodeSize {
  constructor(data, nodeKey, maxRadius, pointRadius) {
    this.data = data
    this.nodeKey = nodeKey
    this.pointRadius = pointRadius
    this.maxRadius = maxRadius

    this.smallestWeight = Infinity
    this.largestWeight = 0

    this.sortedData = JSON.parse(JSON.stringify(this.data))
    this.sortedData.sort((a, b) => a[this.weightKey] - b[this.weightKey])

    for (let member of this.sortedData) {
      if (member[this.nodeKey] < this.smallestWeight && member[this.nodeKey] !== null) {
        this.smallestWeight = member[this.nodeKey]
      }
      if (member[this.nodeKey] > this.largestWeight && member[this.nodeKey] !== null) {
        this.largestWeight = member[this.nodeKey]
      }
    }
  }

  nodeSizes() {
    let newData = []
    let radius

    let stepSize = (this.maxRadius-this.pointRadius)/(this.largestWeight-this.smallestWeight)

    for (let member of this.data) {
      if (member[this.nodeKey] == this.smallestWeight) {
        radius = this.pointRadius //smallest weight has minRadius
      } else if (member[this.nodeKey] == this.largestWeight) {
        radius = this.maxRadius //largest weight has maxRadius
      } else {
        let ratio = member[this.nodeKey] - this.smallestWeight
        if (ratio > 0) {
          radius = this.pointRadius + (ratio * stepSize)
        } else {
          radius = 0 //ratio is negative = value was removed/zero
        }
      }
      member["radius"] = radius
      newData.push(member)
    }
    console.log(newData)
    return newData
  }
}

export default GetNodeSize
