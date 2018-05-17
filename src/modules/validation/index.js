import validate from 'validate.js'
import constraints from './constraints'

const getErrorOrTrue = (errors, type) => errors[type] ? errors[type][0] : true;

export default {
    email: (email) => getErrorOrTrue(validate({ email }, constraints), 'email'),
    firstName: (firstName) => getErrorOrTrue(validate({ firstName }, constraints), 'firstName'),
    lastName: (lastName) => getErrorOrTrue(validate({ lastName }, constraints), 'lastName'),
    motivation: (motivation) => getErrorOrTrue(validate({ motivation }, constraints), 'motivation'),
    phone: (phone) => getErrorOrTrue(validate({ phone }, constraints), 'phone'),
    city: (city) => getErrorOrTrue(validate({ city }, constraints), 'city'),
    country: (country) => getErrorOrTrue(validate({ country }, constraints), 'country'),

    allFields: (allFields) => {
        let errors = validate(allFields, constraints)

        return typeof errors === 'object' ? errors : true
    }
}
