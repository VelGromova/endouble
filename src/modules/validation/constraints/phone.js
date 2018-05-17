import validate from 'validate.js'

export default {
    presence: true,
    format: {
        pattern: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im,
        message: (value) =>  validate.format("^%{phone} is not valid phone number", { phone: value })
    }
}
