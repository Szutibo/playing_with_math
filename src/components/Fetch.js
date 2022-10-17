const appPort = 'http://localhost:3001';

export const getFactorial = async (value) => {
    const result = await fetch(`${appPort}/getfactorialvalue/${value}`);
    if (result.status === 200) {
        return result.json();
    } else {
        throw new Error(
            'HTTP hiba történt, státuszkód: ' + result.status
        );
        
    }
};

export const getFibonacci = async (value) => {
    const result = await fetch(`${appPort}/getfibonaccivalue/${value}`);
    if (result.status === 200) {        
        return result.json();
    } else {
        throw new Error(
            'HTTP hiba történt, státuszkód: ' + result.status
        );
    }
};