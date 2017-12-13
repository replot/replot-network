const getNodeSizes = (data, nodeKey, maxRadius, pointRadius) => {
  let smallestWeight = Infinity
  let largestWeight = 0

  for (let member of data) {
    if (member[nodeKey] < smallestWeight && member[nodeKey] !== null) {
      smallestWeight = member[nodeKey]
    }
    if (member[nodeKey] > largestWeight && member[nodeKey] !== null) {
      largestWeight = member[nodeKey]
    }
  }

  let newData = []
  let radius

  let stepSize = (maxRadius-pointRadius)/(largestWeight-smallestWeight)

  for (let member of data) {
    if (member[nodeKey] == smallestWeight) {
      radius = pointRadius //smallest weight has minRadius
    } else if (member[nodeKey] == largestWeight) {
      radius = maxRadius //largest weight has maxRadius
    } else {
      let ratio = member[nodeKey] - smallestWeight
      if (ratio > 0) {
        radius = pointRadius + (ratio * stepSize)
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
