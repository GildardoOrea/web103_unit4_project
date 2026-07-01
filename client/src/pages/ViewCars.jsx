import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getAllCars, deleteCar } from '../services/CarsAPI'
import { getExteriorColor } from '../utilities/calcprice'
import CarVisual from '../components/CarVisual'
import '../App.css'
import '../css/ViewCars.css'

const ViewCars = ({ title }) => {
    const [cars, setCars] = useState([])

    useEffect(() => {
        document.title = title
    }, [title])

    useEffect(() => {
        fetchCars()
    }, [])

    const fetchCars = async () => {
        const data = await getAllCars()
        setCars(data)
    }

    const handleDelete = async (id) => {
        await deleteCar(id)
        fetchCars()
    }

    return (
        <div className='page'>
            <h1>Custom Cars</h1>

            {cars.length === 0 ? (
                <p>No cars yet. <Link to='/'>Build one!</Link></p>
            ) : (
                <div className='car-grid'>
                    {cars.map((car) => (
                        <article key={car.id} className='car-card'>
                            <CarVisual
                                color={getExteriorColor(car.exterior)}
                                convertible={car.roof === 'Convertible'}
                            />
                            <h3>{car.name}</h3>
                            <p className='card-price'>${Number(car.price).toLocaleString()}</p>
                            <p className='card-specs'>
                                {car.exterior} • {car.wheels}
                            </p>
                            <footer>
                                <Link to={`/customcars/${car.id}`} role='button'>Details</Link>
                                <Link to={`/edit/${car.id}`} role='button' className='secondary'>Edit</Link>
                                <button className='contrast' onClick={() => handleDelete(car.id)}>Delete</button>
                            </footer>
                        </article>
                    ))}
                </div>
            )}
        </div>
    )
}

export default ViewCars
