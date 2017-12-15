const getNodeSizes = (data, nodeWeightKey, maxRadius, nodeRadius) => {
  let smallestWeight = Infinity
  let largestWeight = 0

  for (let member of data) {
    if (member[nodeWeightKey] < smallestWeight && member[nodeWeightKey] !== null) {
      smallestWeight = member[nodeWeightKey]
    }
    if (member[nodeWeightKey] > largestWeight && member[nodeWeightKey] !== null) {
      largestWeight = member[nodeWeightKey]
    }
  }

  let newData = []
  let radius

  let stepSize = (maxRadius - nodeRadius) / (largestWeight - smallestWeight)

  for (let member of data) {
    if (member[nodeWeightKey] == smallestWeight) {
      radius = nodeRadius //smallest weight has minRadius
    } else if (member[nodeWeightKey] == largestWeight) {
      radius = maxRadius //largest weight has maxRadius
    } else {
      let ratio = member[nodeWeightKey] - smallestWeight
      if (ratio > 0) {
        radius = nodeRadius + (ratio * stepSize)
      } else {
        radius = 0 //ratio is negative = value was removed/zero
      }
    }
    member["radius"] = radius
    newData.push(member)
  }
  return newData
}

export default getNodeSizes
