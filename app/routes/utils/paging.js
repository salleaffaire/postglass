
const getPagingParameters = (query) => {
  const { page, limit } = { ...query }

  return {
    page: parseInt(page),
    limit: parseInt(limit)
  }
}

module.exports = {
  getPagingParameters
}
