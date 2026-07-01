import React, { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { getCar, deleteCar } from '../services/CarsAPI'
import { getOptionPrice } from '../utilities/calcprice'
import CarVisual from '../components/CarVisual'
import '../App.css'
import '../css/CarDetails.css'

const CarDetails = ({ title }) => {
    const { id } = useParams()
    const [car, setCar] = useState(null)
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

    const handleDelete = async () => {
        await deleteCar(id)
        navigate('/customcars')
    }

    if (!car) return <div className='page'><h2>Loading…</h2></div>

    const rows = [
        { label: 'Exterior', value: car.exterior, feature: 'exterior' },
        { label: 'Roof', value: car.roof, feature: 'roof' },
        { label: 'Wheels', value: car.wheels, feature: 'wheels' },
        { label: 'Interior', value: car.interior, feature: 'interior' }
    ]

    return (
        <div className='page'>
            <h1>{car.name}</h1>

            <div className='detail-layout'>
                <div className='detail-preview'>
                    <CarVisual car={car} />
                </div>

                <article className='detail-specs'>
                    <table>
                        <tbody>
                            {rows.map((row) => (
                                <tr key={row.label}>
                                    <td>{row.label}</td>
                                    <td>{row.value}</td>
                                    <td className='right'>
                                        +${getOptionPrice(row.feature, row.value).toLocaleString()}
                                    </td>
                                </tr>
                            ))}
                            <tr className='total'>
                                <td><strong>Total</strong></td>
                                <td></td>
                                <td className='right'><strong>${Number(car.price).toLocaleString()}</strong></td>
                            </tr>
                        </tbody>
                    </table>

                    <footer>
                        <Link to={`/edit/${car.id}`} role='button'>Edit</Link>
                        <button className='contrast' onClick={handleDelete}>Delete</button>
                        <Link to='/customcars' role='button' className='secondary'>Back</Link>
                    </footer>
                </article>
            </div>
        </div>
    )
}

export default CarDetails
