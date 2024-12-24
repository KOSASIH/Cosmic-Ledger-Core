// src/utils/apiResponse.js

const apiResponse = (res, status, message, data = null) => {
    return res.status(status).json({
        status,
        message,
        data,
    });
};

module.exports = apiResponse;
