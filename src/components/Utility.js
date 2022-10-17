export const buttonChecker = (stateData, formErrors, setFibonacciButtonDisabled, setFactorialButtonDisabled) => {
    if (stateData.fibonacciValue) {
        (!formErrors.fibonacciValue)
            ? setFibonacciButtonDisabled(false)
            : setFibonacciButtonDisabled(true);
    } else {
        setFibonacciButtonDisabled(true)
    }
    if (stateData.factorialValue) {
        (!formErrors.factorialValue)
            ? setFactorialButtonDisabled(false)
            : setFactorialButtonDisabled(true);
    } else {
        setFactorialButtonDisabled(true)
    }
};

export const validate = (values) => {
    const { factorialValue, fibonacciValue } = values;
    const errors = [];
    const properNumberFormat = /^\d+$/;

    if (factorialValue) {
        !properNumberFormat.test(factorialValue) && (errors.factorialValue = 'Kérem csak pozitív számokat adjon meg!');
    }
    if (fibonacciValue) {
        !properNumberFormat.test(fibonacciValue) && (errors.fibonacciValue = 'Kérem csak pozitív számokat adjon meg!');
    }
    if (factorialValue > 170) {
        errors.factorialValue = '170 a megengedett legnagyobb szám!';
    }
    if (fibonacciValue > 1476) {
        errors.fibonacciValue = '1476 a megengedett legnagyobb szám!';
    }

    return errors;
}