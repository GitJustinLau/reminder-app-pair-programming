import React, { useState } from 'react';

function BMIPage() {
  const [unit, setUnit] = useState(true); // Metric by default
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [results, setResults] = useState('');

  const measureBMI = () => {
    const weightInput = document.getElementById('bmi-weight');
    const weightUnit = document.getElementById('bmi-weight-unit');
    const heightInput = document.getElementById('bmi-height');
    const heightUnit = document.getElementById('bmi-height-unit');

    if (unit) {
      weightUnit.innerHTML = 'KG';
      weightInput.min = 1;
      weightInput.max = 635;
      heightUnit.innerHTML = 'CM';
      heightInput.min = 54;
      heightInput.max = 272;
    } else {
      weightUnit.innerHTML = 'LBS';
      weightInput.min = 2;
      weightInput.max = 1400;
      heightUnit.innerHTML = 'IN';
      heightInput.min = 21;
      heightInput.max = 107;
    }
  };

  const calcBMI = event => {
    event.preventDefault();

    let bmi = null;

    if (unit) {
      const heightInMeters = height / 100;
      bmi = weight / (heightInMeters * heightInMeters);
    } else {
      bmi = (703 * weight) / (height * height);
    }

    bmi = Math.round(bmi * 100) / 100;

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
    <form id="bmi-form" onSubmit={calcBMI}>
      <div className="bmi-label">System:</div>
      <div className="bmi-row">
        <label>
          <input
            type="radio"
            id="bmi-metric"
            name="bmi-measure"
            onChange={() => {
              setUnit(true);
              measureBMI();
            }}
            checked={unit}
          />
          Metric
        </label>
        <label>
          <input
            type="radio"
            id="bmi-imperial"
            name="bmi-measure"
            onChange={() => {
              setUnit(false);
              measureBMI();
            }}
            checked={!unit}
          />
          Imperial
        </label>
      </div>

      <div className="bmi-label">Weight (<span id="bmi-weight-unit">{unit ? 'KG' : 'LBS'}</span>):</div>
      <div className="bmi-row">
        <input
          id="bmi-weight"
          type="number"
          min={unit ? 1 : 2}
          max={unit ? 635 : 1400}
          value={weight}
          onChange={e => setWeight(e.target.value)}
          required
        />
      </div>

      <div className="bmi-label">Height (<span id="bmi-height-unit">{unit ? 'CM' : 'IN'}</span>):</div>
      <div className="bmi-row">
        <input
          id="bmi-height"
          type="number"
          min={unit ? 54 : 21}
          max={unit ? 272 : 107}
          value={height}
          onChange={e => setHeight(e.target.value)}
          required
        />
      </div>

      <input type="submit" value="Calculate BMI" />
      <span id="bmi-results">{results}</span>
    </form>
  );
}

export default BMIPage;
