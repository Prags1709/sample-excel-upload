const BaseValidator = require("./base-validator");
let Joi = require('joi');
const { isEmpty } = require('lodash');

class UserValidator extends BaseValidator {
    constructor(type) {
        super();
        this.type = type
    }

    static listValidator() {
        const objectSchema = Joi.object({
            name: Joi.string().required(),
            age: Joi.number().integer().min(18).required(),
            salary: Joi.number().integer().min(0).required(),
            phone_number: Joi.string().pattern(/^\d{10}$/).required(),
        });

        const userDataSchema = Joi.array().items(objectSchema);

        return userDataSchema;
    }

    validate(data) {
        if (isEmpty(data)) {
            this.errors = [];
            return true;
        }
        let schema;
        switch (this.type) {
            case 'list': {
                schema = UserValidator.listValidator();
                break;
            }
            default:
                break;
        }
        return super.validate(data, schema);
    }
}

module.exports = UserValidator;