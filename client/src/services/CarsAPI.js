const BASE_URL = '/api/cars'

export const getAllCars = async () => {
    try {
        const response = await fetch(BASE_URL)
        return await response.json()
    } catch (error) {
        console.error('Error fetching cars:', error)
        return []
    }
}

export const getCar = async (id) => {
    try {
        const response = await fetch(`${BASE_URL}/${id}`)
        return await response.json()
    } catch (error) {
        console.error(`Error fetching car ${id}:`, error)
        return null
    }
}

export const createCar = async (car) => {
    try {
        const response = await fetch(BASE_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(car)
        })
        return await response.json()
    } catch (error) {
        console.error('Error creating car:', error)
    }
}

export const updateCar = async (id, car) => {
    try {
        const response = await fetch(`${BASE_URL}/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(car)
        })
        return await response.json()
    } catch (error) {
        console.error(`Error updating car ${id}:`, error)
    }
}

export const deleteCar = async (id) => {
    try {
        const response = await fetch(`${BASE_URL}/${id}`, { method: 'DELETE' })
        return await response.json()
    } catch (error) {
        console.error(`Error deleting car ${id}:`, error)
    }
}
