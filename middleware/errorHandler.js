const { errorCodes } = require("../nonvars");

const errorHandler = (err, req, res, next) => {
    const status = res.statusCode || 500;
    const message = err.message || "Something went wrong";
    switch (status) {
        case errorCodes.VALIDATION_ERROR:            
            res.status(status).json({
                success: false,
                title: "Bad request - validation failed",
                status,
                message,
                stackTrace: err.stack
            })
            break;
        case errorCodes.NOT_FOUND:
            res.status(status).json({
                success: false,
                title: "Resource not found",
                status,
                message,
                stackTrace: err.stack
            })
            break;
        case errorCodes.UNAUTHORIZED:
            res.status(status).json({
                success: false,
                title: "Unauthorized access",
                status,
                message,
                stackTrace: err.stack
            })
            break;
        case errorCodes.FORBIDDEN:
            res.status(status).json({
                success: false,
                title: "Forbidden access to update",
                status,
                message,
                stackTrace: err.stack
            })
            break;
        case errorCodes.SERVER_ERROR:
            res.status(status).json({
                success: false,
                title: "Internal server error",
                status,
                message,
                stackTrace: err.stack
            })
            break;
        case errorCodes.ALREADY_EXISTS:
            res.status(status).json({
                success: false,
                title: "Resource already exists",
                status,
                message,
                stackTrace: err.stack
            })
            break;
    
        default:
            console.log('no error handler for this status code');
            break;
    }
}

module.exports = errorHandler