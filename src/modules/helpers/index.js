export const createInputClassNameByValidationResult = (validationResult) => {
    return validationResult ? 'input isValid' : 'input isError'
}

export const createWrapperClassNameByValidationResult = (validationResult) => {
    return validationResult ? 'input-wrapper' : 'input-wrapper hasErrors'
}
