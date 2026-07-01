import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import CarForm from '../components/CarForm'
import { createCar } from '../services/CarsAPI'
import { calculatePrice } from '../utilities/calcprice'
import { validateCar } from '../utilities/validation'
import '../App.css'

const defaultCar = {
    name: '',
    exterior: 'Pearl White',
    roof: 'Hard Top',
    wheels: 'Standard',
    interior: 'Cloth'
}

const CreateCar = ({ title }) => {
    const [car, setCar] = useState(defaultCar)
    const [error, setError] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        document.title = title
    }, [title])

    const handleSubmit = async (e) => {
        e.preventDefault()

        // Block impossible feature combinations before saving.
        const { valid, message } = validateCar(car)
        if (!valid) {
            setError(message)
            return
        }

        setError('')
        await createCar({ ...car, price: calculatePrice(car) })
        navigate('/customcars')
    }

    return (
        <div className='page'>
            <h1>Build Your Bolt Bucket</h1>
            <CarForm
                car={car}
                setCar={setCar}
                onSubmit={handleSubmit}
                error={error}
                submitLabel='Save Car'
            />
        </div>
    )
}

export default CreateCar
