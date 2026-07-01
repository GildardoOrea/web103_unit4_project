import { pool } from './database.js'
import dotenv from 'dotenv'

dotenv.config()

// A few starter cars so the "View Cars" page isn't empty on first run.
const carData = [
    { name: 'Midnight Runner', exterior: 'Midnight Black', roof: 'Sun Roof', wheels: 'Sport', interior: 'Leather', price: 21800 },
    { name: 'Trail Boss', exterior: 'Forest Green', roof: 'Hard Top', wheels: 'Off-Road', interior: 'Cloth', price: 20300 },
    { name: 'Sunny Cruiser', exterior: 'Sunburst Yellow', roof: 'Convertible', wheels: 'Standard', interior: 'Premium Leather', price: 22600 }
]

const createCarsTable = async () => {
    const createTableQuery = `
        DROP TABLE IF EXISTS cars;

        CREATE TABLE IF NOT EXISTS cars (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            exterior VARCHAR(255) NOT NULL,
            roof VARCHAR(255) NOT NULL,
            wheels VARCHAR(255) NOT NULL,
            interior VARCHAR(255) NOT NULL,
            price INTEGER NOT NULL
        );
    `

    try {
        await pool.query(createTableQuery)
        console.log('🎉 cars table created successfully')
    } catch (error) {
        console.error('⚠️ error creating cars table', error)
    }
}

const seedCarsTable = async () => {
    await createCarsTable()

    carData.forEach((car) => {
        const insertQuery = {
            text: 'INSERT INTO cars (name, exterior, roof, wheels, interior, price) VALUES ($1, $2, $3, $4, $5, $6)',
            values: [car.name, car.exterior, car.roof, car.wheels, car.interior, car.price]
        }

        pool.query(insertQuery, (err) => {
            if (err) {
                console.error('⚠️ error inserting car', err)
                return
            }
            console.log(`✅ ${car.name} added successfully`)
        })
    })
}

seedCarsTable()
