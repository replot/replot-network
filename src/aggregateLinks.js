const aggregateLinks = (links, parentKey, childKey, linkKey) => {
  let newLinks = {}

  for (let link of links) {
    let linkID = link[parentKey] + "-" + link[childKey]
    if (linkID in newLinks) {
      newLinks[linkID][linkKey] += 1
    } else {
      newLinks[linkID] = link
      newLinks[linkID][linkKey] = 1
    }
  }

  return Object.values(newLinks)
}


export default aggregateLinks
