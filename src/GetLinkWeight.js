class GetLinkWeight {
  constructor(data, linkKey, maxWidth, lineWidth) {
    this.data = data
    this.linkKey = linkKey
    this.lineWidth = lineWidth
    this.maxWidth = maxWidth

    this.smallestWeight = Infinity
    this.largestWeight = 0

    for (let member of this.data) {
      if (member[this.linkKey] < this.smallestWeight && member[this.linkKey] !== null) {
        this.smallestWeight = member[this.linkKey]
      }
      if (member[this.linkKey] > this.largestWeight && member[this.linkKey] !== null) {
        this.largestWeight = member[this.linkKey]
      }
    }
  }

  linkWeights() {
    let newData = []
    let stepSize = (this.maxWidth-this.lineWidth)/(this.largestWeight-this.smallestWeight)

    for (let member of this.data) {
      if (member[this.linkKey] == this.smallestWeight) {
        member["width"] = this.lineWidth //smallest weight has lineWidth
      } else if (member[this.linkKey] == this.largestWeight) {
        member["width"] = this.maxWidth //largest weight has maxWidth
      } else {
        let ratio = member[this.linkKey] - this.smallestWeight
        if (ratio > 0) {
          member["width"] = this.lineWidth + (ratio * stepSize)
        } else {
          member["width"] = 0 //ratio is negative = value was removed/zero
        }
      }
      newData.push(member)
    }
    console.log(newData)
    return newData
  }
}

export default GetLinkWeight
