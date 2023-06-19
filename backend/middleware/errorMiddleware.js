const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`)
  res.status(404)
  next(error)
}

// Overide Express default error handler
const errorHandler = (err, req, res, next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode
  let message = err.message

  // If Mongoose not found error, set to 404 and change message
  if (err.name === "CastError" && err.kind === "ObjectId") {
    statusCode = 404
    message = "Resource not found"
  }
  // Send stack trace instead of HTML page
  res.status(statusCode).json({
    message: message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack
  })
}

export { notFound, errorHandler }
