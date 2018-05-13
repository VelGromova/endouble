const validator = {
  trim: (str) => str.replace(/^\s+|\s+$/, ''),

  validate: (value, regExp) => RegExp(regExp).test(value),

  validateEmail: (email) => validator.validate(
    validator.trim(email).toLowerCase(),
    /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
  ),

  validateString: (string) => validator.validate(
    validator.trim(string),
    /^[a-zA-Z]{2,}$/
  ),

  validatePhone: (phone) => validator.validate(
    validator.trim(phone),
    /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
  )
}

const inputElements = document.getElementsByClassName('input-wrapper')

for (let elementIndex = 0; elementIndex < inputElements.length; elementIndex++) {
  let wrapper = document.getElementsByClassName('input-wrapper')[elementIndex]
  wrapper.childNodes[1].addEventListener('change', function () {
    let validatorType = this.getAttribute('validator')
    function createInputClassNameByValidationResult(validationResult) {
      return validationResult ? 'input isValid' : 'input isError'
    }

    function createWrapperClassNameByValidationResult(validationResult) {
      return validationResult ? 'input-wrapper' : 'input-wrapper hasErrors'
    }

    switch (validatorType) {
      case 'string':
        this.className = createInputClassNameByValidationResult(validator.validateString(this.value))
        wrapper.className = createWrapperClassNameByValidationResult(validator.validateString(this.value))
        break

      case 'email':
        this.className = createInputClassNameByValidationResult(validator.validateEmail(this.value))
        wrapper.className = createWrapperClassNameByValidationResult(validator.validateEmail(this.value))
        break

      case 'phone':
        this.className = createInputClassNameByValidationResult(validator.validatePhone(this.value))
        wrapper.className = createWrapperClassNameByValidationResult(validator.validatePhone(this.value))
        break
    }
  })
}
