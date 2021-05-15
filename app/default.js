module.exports = {
  // Default route for requests not matched by any routers.
  // When Express can't find a match for a route, an error will be
  // returned as HTLM (next(err) is not called) and it will never
  // reach your default error handler.
  handler: (req, res, next) => {
    if (!res.headersSent) {
      res.status(404).json({ error: 'Invalid route' })
    } else {
      next()
    }
  }
}
