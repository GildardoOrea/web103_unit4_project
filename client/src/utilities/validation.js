// Feature combinations that are not allowed. Each rule links a value in one
// feature to an incompatible value in another feature.
const incompatibleCombos = [
    {
        feature1: 'roof', value1: 'Convertible',
        feature2: 'wheels', value2: 'Off-Road',
        message: "A Convertible roof can't be paired with Off-Road wheels."
    },
    {
        feature1: 'roof', value1: 'Sun Roof',
        feature2: 'wheels', value2: 'Off-Road',
        message: "A Sun Roof can't be paired with Off-Road wheels."
    },
    {
        feature1: 'interior', value1: 'Premium Leather',
        feature2: 'roof', value2: 'Convertible',
        message: "Premium Leather can't be paired with a Convertible roof (weather damage)."
    }
]

// Checks a finished build. Returns { valid, message } — used on form submit.
export const validateCar = (car) => {
    for (const rule of incompatibleCombos) {
        if (car[rule.feature1] === rule.value1 && car[rule.feature2] === rule.value2) {
            return { valid: false, message: rule.message }
        }
    }
    return { valid: true, message: '' }
}
