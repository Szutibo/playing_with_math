const port = 3001;
const frontendPort = 3000;

const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors({ origin: `http://localhost:${frontendPort}` }));
app.use(express.json());

// Factorial value endpoint
app.get('/getfactorialvalue/:value', (req, res) => {
    res.set('Access-Control-Allow-Origin', `http://localhost:${frontendPort}`);
    let result = factorialize(req.params.value);
    if (typeof result === 'string') {
        res.status(400).send(result);
    } else {
        res.status(200).send(String(result));
    }
});

// Fibonacci value endpoint
app.get('/getfibonaccivalue/:value', (req, res) => {
    res.set('Access-Control-Allow-Origin', `http://localhost:${frontendPort}`);
    let result = fibonacciSequence(req.params.value);
    if (typeof result === 'string') {
        res.status(400).send(result);
    } else {
        res.status(200).send(String(result));
    }
});

// Utility functions
function factorialize(number) {
    const regexNumberFormat = /^\d+$/;

    if (number < 0) {
        return 'A megadott szám nem lehet negatív!';
    } else if (number > 170) {
        return '170 a megengedett legnagyobb szám!';
    } else if (number === '1' || number === '0') {
        return 1;
    } else if (!regexNumberFormat.test(number)) {
        return 'Kérem csak számokat adjon meg!';
    } else {
        for (let i = number - 1; i >= 1; i--) {
            number *= i;
        }
        return number;
    }
}

function fibonacciSequence(number) {
    const sequenceOfNumbers = [0, 1];
    const regexNumberFormat = /^\d+$/;

    if (number < 0) {
        return 'A megadott szám nem lehet negatív!';
    } else if (number > 1476) {
        return '1476 a megengedett legnagyobb szám!';
    } else if (!regexNumberFormat.test(number)) {
        return 'Kérem csak számokat adjon meg!';
    } else {
        for (let i = 2; i <= number; i++) {
            sequenceOfNumbers[i] = sequenceOfNumbers[i - 2] + sequenceOfNumbers[i - 1];
        }
        return sequenceOfNumbers[number];
    }
}

app.listen(port, () => console.log(`Listening on port ${port}...`));