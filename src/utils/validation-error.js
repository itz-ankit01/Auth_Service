const { StatusCodes } = require('http-status-codes');
const AppErrors = require('./erro-handler');

class ValidationErrors extends AppErrors {
    constructor(error){
        let errorName = error.name;
        let explanation = [];
        error.errors.forEach((err) => {
            explanation.push(err.message);
        });
        super(
            errorName,
            'Not able to validate the data sent in the request',
            explanation,
            StatusCodes.BAD_REQUEST
        )
    }
}

module.exports = ValidationErrors;