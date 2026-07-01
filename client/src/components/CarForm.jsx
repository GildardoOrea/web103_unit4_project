import React from 'react'
import { options, calculatePrice, getExteriorColor } from '../utilities/calcprice'
import { getConflicts } from '../utilities/validation'
import CarVisual from './CarVisual'
import '../css/CarForm.css'

const features = [
    { key: 'exterior', label: 'Exterior' },
    { key: 'roof', label: 'Roof' },
    { key: 'wheels', label: 'Wheels' },
    { key: 'interior', label: 'Interior' }
]

// Shared build form used by both Create and Edit pages.
const CarForm = ({ car, setCar, onSubmit, error, submitLabel }) => {
    // Options that would create an impossible combo, given current picks.
    const conflicts = getConflicts(car)
    const isDisabled = (feature, value) =>
        conflicts.some((c) => c.feature === feature && c.value === value)

    const selectOption = (feature, value) => {
        setCar({ ...car, [feature]: value })
    }

    return (
        <div className='car-form'>
            <div className='car-preview'>
                <CarVisual
                    color={getExteriorColor(car.exterior)}
                    convertible={car.roof === 'Convertible'}
                />
                <h2 className='price'>${calculatePrice(car).toLocaleString()}</h2>
                <p className='summary'>
                    {car.exterior} • {car.roof} • {car.wheels} • {car.interior}
                </p>
            </div>

            <form onSubmit={onSubmit} className='car-options'>
                <label>
                    Name your build
                    <input
                        type='text'
                        value={car.name}
                        onChange={(e) => setCar({ ...car, name: e.target.value })}
                        placeholder='My Dream Car'
                        required
                    />
                </label>

                {features.map((f) => (
                    <fieldset key={f.key}>
                        <legend>{f.label}</legend>
                        <div className='option-group'>
                            {options[f.key].map((opt) => {
                                const disabled = isDisabled(f.key, opt.name)
                                const selected = car[f.key] === opt.name
                                return (
                                    <button
                                        type='button'
                                        key={opt.name}
                                        className={`option-btn${selected ? ' selected' : ''}${disabled ? ' disabled' : ''}`}
                                        onClick={() => !disabled && selectOption(f.key, opt.name)}
                                        disabled={disabled}
                                        title={disabled ? 'Not available with your current selection' : ''}
                                    >
                                        {f.key === 'exterior' && (
                                            <span className='swatch' style={{ background: opt.color }} />
                                        )}
                                        <span>{opt.name}</span>
                                        {opt.price > 0 && <small>+${opt.price}</small>}
                                    </button>
                                )
                            })}
                        </div>
                    </fieldset>
                ))}

                {error && <p className='error'>⚠️ {error}</p>}

                <button type='submit' className='submit-btn'>{submitLabel}</button>
            </form>
        </div>
    )
}

export default CarForm
