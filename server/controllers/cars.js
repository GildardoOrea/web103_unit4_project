import { pool } from '../config/database.js'

// GET /api/cars  -> all cars
const getCars = async (req, res) => {
    try {
        const results = await pool.query('SELECT * FROM cars ORDER BY id ASC')
        res.status(200).json(results.rows)
    } catch (error) {
        res.status(409).json({ error: error.message })
    }
}

// GET /api/cars/:id  -> single car
const getCarById = async (req, res) => {
    try {
        const { id } = req.params
        const results = await pool.query('SELECT * FROM cars WHERE id = $1', [id])
        if (results.rows.length === 0) {
            return res.status(404).json({ error: 'Car not found' })
        }
        res.status(200).json(results.rows[0])
    } catch (error) {
        res.status(409).json({ error: error.message })
    }
}

// POST /api/cars  -> create car
const createCar = async (req, res) => {
    try {
        const { name, exterior, roof, wheels, interior, price } = req.body
        const results = await pool.query(
            'INSERT INTO cars (name, exterior, roof, wheels, interior, price) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [name, exterior, roof, wheels, interior, price]
        )
        res.status(201).json(results.rows[0])
    } catch (error) {
        res.status(409).json({ error: error.message })
    }
}

// PATCH /api/cars/:id  -> update car
const updateCar = async (req, res) => {
    try {
        const { id } = req.params
        const { name, exterior, roof, wheels, interior, price } = req.body
        const results = await pool.query(
            'UPDATE cars SET name = $1, exterior = $2, roof = $3, wheels = $4, interior = $5, price = $6 WHERE id = $7 RETURNING *',
            [name, exterior, roof, wheels, interior, price, id]
        )
        if (results.rows.length === 0) {
            return res.status(404).json({ error: 'Car not found' })
        }
        res.status(200).json(results.rows[0])
    } catch (error) {
        res.status(409).json({ error: error.message })
    }
}

// DELETE /api/cars/:id  -> delete car
const deleteCar = async (req, res) => {
    try {
        const { id } = req.params
        await pool.query('DELETE FROM cars WHERE id = $1', [id])
        res.status(200).json({ message: 'Car deleted successfully' })
    } catch (error) {
        res.status(409).json({ error: error.message })
    }
}

export default {
    getCars,
    getCarById,
    createCar,
    updateCar,
    deleteCar
}
