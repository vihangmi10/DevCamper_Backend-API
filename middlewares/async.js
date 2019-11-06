// This is a middleware that will take in a function with req, res next parameter and try to resolve it. If it resolves it will execute the function and send a response.
// If it fails it will send the error that is caught to next so that the error handler middleware can take it from there.
// This function needs to be wrapped around an async function to avoid writing try catch every time.

const asyncHandler = fn => (req,res,next) => Promise.resolve(fn(req,res,next)).catch(next);

module.exports = asyncHandler;
