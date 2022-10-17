import React, { useEffect, useState } from 'react';
import { getFactorial, getFibonacci } from './components/Fetch';
import { buttonChecker, validate } from './components/Utility';
import './style.css';

// MUI imports
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const Home = () => {
    const [stateData, setStateData] = useState({
        factorialValue: '',
        fibonacciValue: '',
        factorialValueResult: '',
        fibonacciValueResult: ''
    });
    const [httpError, setHttpError] = useState('');
    const [formErrors, setFormErrors] = useState([]);
    const [factorialButtonDisabled, setFactorialButtonDisabled] = useState(true);
    const [fibonacciButtonDisabled, setFibonacciButtonDisabled] = useState(true);

    const fetchFactorialValue = async () => {
        try {
            const result = await getFactorial(stateData.factorialValue);
            if (typeof(result) != 'undefined') {
                setStateData({ ...stateData, factorialValueResult: result });
            }
        } catch (error) {
            setHttpError(error.message);
        }
    }

    const fetchFibonacciValue = async () => {
        try {
            const result = await getFibonacci(stateData.fibonacciValue);
            if (typeof(result) != 'undefined') {
                setStateData({ ...stateData, fibonacciValueResult: result });
            }
        } catch (error) {
            setHttpError(error.message);
        }
    }

    useEffect(() => {
        setFormErrors(validate(stateData));
    }, [stateData])

    return (
        <main>
            <h1>Faktoriális és Fibonacci érték kalkulátor</h1>
            <hr></hr>
            <div onKeyUp={() => {
                buttonChecker(stateData, formErrors, setFibonacciButtonDisabled, setFactorialButtonDisabled);
            }} className='container'>
                <section className='factorialBox'>
                    <TextField
                        className='textField'
                        onChange={(e) => setStateData({ ...stateData, factorialValue: e.target.value })}
                        onKeyUp={() => {
                            setHttpError('');
                            setStateData({ ...stateData, factorialValueResult: '' });
                        }}
                        label='Faktoriális érték'
                        type='number'
                        value={stateData.factorialValue}
                        size='medium'
                    />
                    <label style={{ display: 'block' }}>{formErrors.factorialValue}</label>
                    <Button
                        disabled={factorialButtonDisabled}
                        onClick={() => fetchFactorialValue()}
                        variant='contained'
                        size='large'
                    >Faktoriális érték</Button>
                    <div className='resultBox'>
                        {stateData.factorialValueResult}
                    </div>
                </section>
                <hr></hr>
                <section className='fibonacciBox'>
                    <TextField
                        className='textField'
                        onChange={(e) => setStateData({ ...stateData, fibonacciValue: e.target.value })}
                        onKeyUp={() => {
                            setHttpError('');
                            setStateData({ ...stateData, fibonacciValueResult: '' });
                        }}
                        label='Fibonacci érték'
                        type='number'
                        value={stateData.fibonacciValue}
                        size='normal'
                    />
                    <label style={{ display: 'block' }}>{formErrors.fibonacciValue}</label>
                    <Button
                        size='large'
                        disabled={fibonacciButtonDisabled}
                        onClick={() => fetchFibonacciValue()}
                        variant='contained'
                    >Fibonacci érték</Button>
                    <div className='resultBox'>
                        {stateData.fibonacciValueResult}
                    </div>
                </section>
                <div className='errorContainer'>
                    {httpError}
                </div>
            </div>
        </main>
    )
}

export default Home