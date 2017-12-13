const getLinkWeights = (data, linkKey, maxWidth, lineWidth) => {
  let smallestWeight = Infinity
  let largestWeight = 0

  for (let member of data) {
    if (member[linkKey] < smallestWeight && member[linkKey] !== null) {
      smallestWeight = member[linkKey]
    }
    if (member[linkKey] > largestWeight && member[linkKey] !== null) {
      largestWeight = member[linkKey]
    }
  }

  let newData = []
  let stepSize = (maxWidth - lineWidth)/(largestWeight - smallestWeight)

  for (let member of data) {
    if (member[linkKey] == smallestWeight) {
      member["width"] = lineWidth //smallest weight has lineWidth
    } else if (member[linkKey] == largestWeight) {
      member["width"] = maxWidth //largest weight has maxWidth
    } else {
      let ratio = member[linkKey] - smallestWeight
      if (ratio > 0) {
        member["width"] = lineWidth + (ratio * stepSize)
      } else {
        member["width"] = 0 //ratio is negative = value was removed/zero
      }
    }
    newData.push(member)
  }
  return newData
}


export default getLinkWeights
