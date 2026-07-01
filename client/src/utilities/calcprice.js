// Base price of every build, before any options are added.
export const BASE_PRICE = 18000

// All customizable features and their options. Each option carries its own
// price add-on. Exterior options also carry a color used for the visual preview.
export const options = {
    exterior: [
        { name: 'Pearl White', price: 0, color: '#e5e7eb' },
        { name: 'Midnight Black', price: 300, color: '#1a1a1a' },
        { name: 'Blue Blaze', price: 400, color: '#2563eb' },
        { name: 'Crimson Red', price: 400, color: '#b91c1c' },
        { name: 'Forest Green', price: 500, color: '#15803d' },
        { name: 'Sunburst Yellow', price: 600, color: '#eab308' }
    ],
    roof: [
        { name: 'Hard Top', price: 0 },
        { name: 'Sun Roof', price: 800 },
        { name: 'Convertible', price: 1500 }
    ],
    wheels: [
        { name: 'Standard', price: 0 },
        { name: 'Sport', price: 1200 },
        { name: 'Off-Road', price: 1800 }
    ],
    interior: [
        { name: 'Cloth', price: 0 },
        { name: 'Leather', price: 1500 },
        { name: 'Premium Leather', price: 2500 }
    ]
}

// Look up the add-on price of one selected option.
export const getOptionPrice = (feature, name) => {
    const option = options[feature]?.find((o) => o.name === name)
    return option ? option.price : 0
}

// Look up the hex color for a chosen exterior (used by the car preview).
export const getExteriorColor = (name) => {
    const option = options.exterior.find((o) => o.name === name)
    return option ? option.color : '#888888'
}

// Total price = base + every selected option add-on.
export const calculatePrice = (car) => {
    return (
        BASE_PRICE +
        getOptionPrice('exterior', car.exterior) +
        getOptionPrice('roof', car.roof) +
        getOptionPrice('wheels', car.wheels) +
        getOptionPrice('interior', car.interior)
    )
}
