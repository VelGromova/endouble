import modal from './modules/modal'
import * as crs from './modules/crs'
import validation from './modules/validation'
import * as helpers from './modules/helpers'

const inputElements = document.getElementsByClassName('input-wrapper');
for (let elementIndex = 0; elementIndex < inputElements.length; elementIndex++) {
  let wrapper = document.getElementsByClassName('input-wrapper')[elementIndex];
  wrapper.childNodes[1].addEventListener('change', function () {
    let validatorType = this.getAttribute('validator');

    try {
      let validationResult = true;
      let validationMessage = validation[validatorType](this.value);
      if (typeof validationMessage === 'string') {
        validationResult = false
      }

      this.className = helpers.createInputClassNameByValidationResult(validationResult);
      wrapper.className = helpers.createWrapperClassNameByValidationResult(validationResult);
      wrapper.childNodes[3].textContent = validationMessage
    } catch (err) {}
  })
}

document.getElementById('applyButton').addEventListener('click', function () {
  let event = new Event('change');
  let validationFields = {};
  for (let elementIndex = 0; elementIndex < inputElements.length; elementIndex++) {
    let wrapper = document.getElementsByClassName('input-wrapper')[elementIndex];
    wrapper.childNodes[1].dispatchEvent(event);

    let value = wrapper.childNodes[1].value;
    let validator = wrapper.childNodes[1].getAttribute('validator');

    validationFields[validator] = value
  }

  let validationResult = validation.allFields(validationFields);
  modal.setContent('<h3>We cannot start to process your cv. Please check all the fields</h3>');
  if (validationResult === true) {
    modal.setContent('<h3>Thanks for applying this vacancy</h3>');
  }

  modal.open()
  if (validationResult === true) {
    setTimeout(function () {
      window.location.href = window.location.href
    }, 1000)
  }
});
