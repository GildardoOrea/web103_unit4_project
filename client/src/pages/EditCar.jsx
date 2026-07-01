import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import CarForm from '../components/CarForm'
import { getCar, updateCar } from '../services/CarsAPI'
import { calculatePrice } from '../utilities/calcprice'
import { validateCar } from '../utilities/validation'
import '../App.css'

const EditCar = ({ title }) => {
    const { id } = useParams()
    const [car, setCar] = useState(null)
    const [error, setError] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        document.title = title
    }, [title])

    useEffect(() => {
        const fetchCar = async () => {
            const data = await getCar(id)
            setCar(data)
        }
        fetchCar()
    }, [id])

    const handleSubmit = async (e) => {
        e.preventDefault()

        const { valid, message } = validateCar(car)
        if (!valid) {
            setError(message)
            return
        }

        setError('')
        await updateCar(id, { ...car, price: calculatePrice(car) })
        navigate('/customcars')
    }

    if (!car) return <div className='page'><h2>Loading…</h2></div>

    return (
        <div className='page'>
            <h1>Edit Your Build</h1>
            <CarForm
                car={car}
                setCar={setCar}
                onSubmit={handleSubmit}
                error={error}
                submitLabel='Update Car'
            />
        </div>
    )
}

export default EditCar
