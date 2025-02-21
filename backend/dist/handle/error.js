"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleDatabaseError = void 0;
exports.handleBadRequestResponse = handleBadRequestResponse;
exports.handleValidationFailureResponse = handleValidationFailureResponse;
exports.handleUnauthorizedResponse = handleUnauthorizedResponse;
exports.handleForbiddenResponse = handleForbiddenResponse;
exports.handleNotFoundResponse = handleNotFoundResponse;
exports.handleMethodNotAllowedResponse = handleMethodNotAllowedResponse;
exports.handleConflictResponse = handleConflictResponse;
exports.handleUnprocessableEntityResponse = handleUnprocessableEntityResponse;
exports.handleServerError = handleServerError;
exports.handleLoggingError = handleLoggingError;
const http_status_codes_1 = require("http-status-codes");
function handleBadRequestResponse(res, message) {
    res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ message });
}
function handleValidationFailureResponse(res, message) {
    res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ message });
}
function handleUnauthorizedResponse(res, message) {
    res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({ message });
}
function handleForbiddenResponse(res, message) {
    res.status(http_status_codes_1.StatusCodes.FORBIDDEN).json({ message });
}
function handleNotFoundResponse(res, message) {
    res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({ message });
}
function handleMethodNotAllowedResponse(res, method) {
    res.status(http_status_codes_1.StatusCodes.METHOD_NOT_ALLOWED).json({
        message: `Method ${method} not allowed`,
    });
}
function handleConflictResponse(res, message) {
    res.status(http_status_codes_1.StatusCodes.CONFLICT).json({ message });
}
function handleUnprocessableEntityResponse(res, message) {
    res.status(http_status_codes_1.StatusCodes.UNPROCESSABLE_ENTITY).json({ message });
}
function handleServerError(res, message) {
    res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ error: `Internal server error: ${message}` });
}
const handleDatabaseError = (res, err, errorMessage) => {
    if (err && err.code === 'P1000' && err.message.includes('5432')) {
        return handleServerError(res, 'Unable to connect to the database server. Please try again later.');
    }
    else {
        console.error('Error creating material:', errorMessage);
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ error: errorMessage });
    }
};
exports.handleDatabaseError = handleDatabaseError;
function handleLoggingError(err) {
    console.error('An error occurred:', err);
}
