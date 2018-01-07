const constructNodes = (links, nodes, nodeKey, childKey, parentKey, groupKey, labelKey, pointRadius) => {
  let nodeIDs = new Set()
  let finalNodes = nodes ? nodes : []

  if (nodes) {
    for (let node of nodes) {
      nodeIDs.add(node[nodeKey])
    }
  }

  for (let link of links) {
    for (let linkNode of [link[childKey], link[parentKey]]) {
      if (!nodeIDs.has(linkNode)) {
        if (nodes) {
          console.log(`${linkNode} was found in links, but not in nodes`)
        }
        let newNode = {}
        newNode[nodeKey] = linkNode
        newNode[labelKey] = linkNode
        newNode["radius"] = pointRadius
        if (groupKey) {
          newNode[groupKey] = null
        }
        nodeIDs.add(linkNode)
        finalNodes.push(newNode)
      }
    }
  }

  return finalNodes
}

export default constructNodes
