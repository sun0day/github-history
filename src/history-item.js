/**
 * history item
 * 
 * @param {number} lastVisitTime
 * @param {title} string
 * @param {url} string
 * @param {visitCount} number
 */

export const isIssue = (url) => {
  return /\/issues\/\d+/.test(url)
}

export const isPR = url => {
  return /\/pull\/\d+/.test(url)
}

export const isDiscussion = url => {
  return /\/discussions\/\d+/.test(url)
}

export const isCode = url => {
  return /github.com\/.+\/.+\/blob\/.+/.test(url)
}

export const getRepo = url => {
  const result = url.match(/https:\/\/github.com\/([^\/]+\/[^\/]+)/)

  return result && result[1]
}

export const filterItem = (items, options) => items.filter(item => {
  if (!options) {
    return !!getRepo(item.url)
  }

  const { keyword, type } = options
  const lowKeyword = keyword.toLocaleLowerCase()

  if (keyword &&
    item.url.toLocaleLowerCase().indexOf(lowKeyword) < 0 &&
    item.title.toLocaleLowerCase().indexOf(lowKeyword) < 0
  ) {
    return false
  }
  const typeKey = type.toLocaleLowerCase()

  if (typeKey === 'all') {
    return true
  }
  return !!item[typeKey]
})

export const transformItem = items => {
  return items.map(item => ({
    ...item,
    issue: isIssue(item.url),
    pr: isPR(item.url),
    discussions: isDiscussion(item.url),
    code: isCode(item.url),
    repo: getRepo(item.url)
  }))
}
