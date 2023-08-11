import {useState} from 'react';
import "./BMI.scss"

function BMI() {
    const [unit, setUnit] = useState(true); // Metric by default
    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');
    const [results, setResults] = useState('');

    const handleUnitChange = newUnit => {
        setUnit(newUnit);
        measureBMI(newUnit);
    };

    const measureBMI = newUnit => {
        if (newUnit) {
            setWeightRange(1, 635);
            setHeightRange(54, 272);
        } else {
            setWeightRange(2, 1400);
            setHeightRange(21, 107);
        }
    };

    const setWeightRange = (min, max) => {
        setWeight({
            value: weight.value || '',
            min: min,
            max: max
        });
    };

    const setHeightRange = (min, max) => {
        setHeight({
            value: height.value || '',
            min: min,
            max: max
        });
    };

    const calcBMI = event => {
        event.preventDefault();

        let bmi = null;

        if (unit) {
            const heightInMeters = height.value / 100;
            bmi = weight.value / (heightInMeters * heightInMeters);
        } else {
            bmi = (703 * weight.value) / (height.value * height.value);
        } bmi = Math.round(bmi * 100) / 100;

        if (bmi < 18.5) {
            setResults(`${bmi} - Underweight`);
        } else if (bmi < 25) {
            setResults(`${bmi} - Normal weight`);
        } else if (bmi < 30) {
            setResults(`${bmi} - Pre-obesity`);
        } else if (bmi < 35) {
            setResults(`${bmi} - Obesity class I`);
        } else if (bmi < 40) {
            setResults(`${bmi} - Obesity class II`);
        } else {
            setResults(`${bmi} - Obesity class III`);
        }
    };

    return (
        <form className="bmi" id="bmi__form"
            onSubmit={calcBMI}>
            <div className='bmi__container'>
                <h3 className="bmi__label">System:</h3>
                <div className="bmi__row">
                    <label>
                        <input type="radio" className='bmi__metric' id="bmi__metric" name="bmi__measure"
                            onChange={
                                () => handleUnitChange(true)
                            }
                            checked={unit}/>
                        Metric
                    </label>
                    <label>
                        <input type="radio" className='bmi__imperial' id="bmi__imperial" name="bmi__measure"
                            onChange={
                                () => handleUnitChange(false)
                            }
                            checked={
                                !unit
                            }/>
                        Imperial
                    </label>
                </div>

                <div className="bmi__label">Weight (<span id="bmi__weight-unit">
                        {
                        unit ? 'KG' : 'LBS'
                    }</span>):</div>
                <div className="bmi__row">
                    <input id="bmi__weight" type="number"
                        min={
                            weight.min
                        }
                        max={
                            weight.max
                        }
                        value={
                            weight.value
                        }
                        onChange={
                            e => setWeight({
                                ...weight,
                                value: e.target.value
                            })
                        }
                        required/>
                </div>

                <div className="bmi__label">Height (<span id="bmi__height-unit">
                        {
                        unit ? 'CM' : 'IN'
                    }</span>):</div>
                <div className="bmi__row">
                    <input id="bmi__height" type="number"
                        min={
                            height.min
                        }
                        max={
                            height.max
                        }
                        value={
                            height.value
                        }
                        onChange={
                            e => setHeight({
                                ...height,
                                value: e.target.value
                            })
                        }
                        required/>
                </div>

                <button type="submit">Calculate BMI</button>
                <p id="bmi__results">
                    {results}</p>
            </div>
        </form>
    );
}

export default BMI;
