//function is a catch all for any route that doesn't exist; logic = create an error that makes sense when 
//we reach a url that doesn't exists set the response state to 404 page not found and go to the next middleware 
//while passing in the created error
const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`)
    res.status(404)
    next(error)
}
//gets statusCode and error message and responds with a json message specifying the error and the stack trace
// handles a database error also
const errorHandler = (err, req, res, next) => {
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode
    let message = err.message

    //If Mongoose not found error, set to 404 and change message
    if (err.name === 'Cast error' && err.kind === 'ObjectId') {
        statusCode = 404
        message = 'Resource not found'
    }

    res.status(statusCode).json({
        message: message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack
    })
    res.end()
}

export { notFound, errorHandler } 