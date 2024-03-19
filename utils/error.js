function mapError(error) {
    if (Array.isArray(error)) {
        return error;
    } else if (error.name == 'ValidationError') {
        return Object
            .values(error.errors)
            .map(err => ({ msg: err.message }));
    } else if (typeof error.message == 'string') {
        return [{ msg: error.message }];
    }
}
module.exports = mapError;