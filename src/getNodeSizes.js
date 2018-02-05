const getNodeSizes = (data, nodeWeightKey, maxRadius, minRadius) => {
  let smallestWeight = Infinity
  let largestWeight = 0

  for (let member of data) {
    if (member[nodeWeightKey]) {
      if (member[nodeWeightKey] < smallestWeight) {
        smallestWeight = member[nodeWeightKey]
      }
      if (member[nodeWeightKey] > largestWeight) {
        largestWeight = member[nodeWeightKey]
      }
    }
  }

  let newData = data.slice()
  const slope = (maxRadius - minRadius) / (largestWeight - smallestWeight)

  for (let member of newData) {
    if (member[nodeWeightKey]) {
      member["radius"] = slope*(member[nodeWeightKey] - smallestWeight) + minRadius
    } else {
      member["radius"] = minRadius
    }
  }
  return newData
}

export default getNodeSizes
