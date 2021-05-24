const createdUpdatedAt = () => {
  const dateTime = Date.now()
  return {
    createdAt: dateTime,
    updatedAt: dateTime
  }
}

module.exports = {
  createdUpdatedAt
}
