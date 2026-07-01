import React from 'react'
import { getExteriorColor } from '../utilities/calcprice'

// Seat color shown through the windows / open top for each interior option.
const interiorColors = {
    'Cloth': '#9ca3af',
    'Leather': '#c2833a',
    'Premium Leather': '#111827'
}

// Side-view car whose appearance updates to match EVERY selected option:
//   exterior -> body paint color
//   roof     -> hard top / sun-roof panel / open convertible
//   wheels   -> standard / sport (red rims) / off-road (bigger, treaded)
//   interior -> seat color visible through the glass
const CarVisual = ({ car }) => {
    const color = getExteriorColor(car.exterior)
    const seatColor = interiorColors[car.interior] || '#9ca3af'
    const convertible = car.roof === 'Convertible'
    const sunRoof = car.roof === 'Sun Roof'
    const offRoad = car.wheels === 'Off-Road'
    const sport = car.wheels === 'Sport'

    const wheelR = offRoad ? 48 : 40
    const rimColor = sport ? '#dc2626' : '#cbd5e1'

    const Wheel = ({ cx }) => (
        <g>
            <circle cx={cx} cy='185' r={wheelR} fill='#111' />
            {offRoad && (
                <circle cx={cx} cy='185' r={wheelR} fill='none' stroke='#333'
                    strokeWidth='7' strokeDasharray='9 7' />
            )}
            <circle cx={cx} cy='185' r={wheelR * 0.45} fill={rimColor} />
            <circle cx={cx} cy='185' r={wheelR * 0.15} fill='#475569' />
        </g>
    )

    return (
        <svg viewBox='0 0 640 260' className='car-visual' width='100%' xmlns='http://www.w3.org/2000/svg'>
            {/* shadow */}
            <ellipse cx='320' cy='225' rx='250' ry='18' fill='rgba(0,0,0,0.35)' />

            {/* lower body */}
            <path
                d='M60 180 L90 120 Q100 100 130 100 L250 100 L320 55 L440 55 Q470 55 490 90 L560 120 Q580 128 580 150 L580 180 Z'
                fill={color}
                stroke='rgba(0,0,0,0.45)'
                strokeWidth='3'
            />

            {/* interior seats (visible through glass or an open top) */}
            <rect x='300' y='72' width='16' height='30' rx='4' fill={seatColor} />
            <rect x='352' y='72' width='16' height='30' rx='4' fill={seatColor} />

            {convertible ? (
                <>
                    {/* windshield frame only — open top */}
                    <line x1='255' y1='100' x2='318' y2='62' stroke='#333' strokeWidth='5' strokeLinecap='round' />
                    <path d='M255 100 L318 62 L330 100 Z' fill='rgba(180,215,255,0.45)'
                        stroke='rgba(0,0,0,0.25)' strokeWidth='2' />
                </>
            ) : (
                <>
                    {/* solid roof strip */}
                    <path d='M312 62 L436 62 L436 54 Q436 50 430 50 L318 50 Q312 50 312 54 Z'
                        fill={color} stroke='rgba(0,0,0,0.4)' strokeWidth='2' />
                    {/* full greenhouse glass */}
                    <path d='M255 100 L318 62 L430 62 L455 100 Z' fill='rgba(180,215,255,0.45)'
                        stroke='rgba(0,0,0,0.25)' strokeWidth='2' />
                    {/* sun-roof dark panel */}
                    {sunRoof && <rect x='352' y='51' width='58' height='10' rx='3' fill='rgba(25,35,55,0.9)' />}
                </>
            )}

            {/* door line */}
            <line x1='350' y1='100' x2='350' y2='178' stroke='rgba(0,0,0,0.25)' strokeWidth='2' />

            {/* wheels */}
            <Wheel cx={185} />
            <Wheel cx={455} />

            {/* headlight */}
            <circle cx='568' cy='150' r='8' fill='#fde68a' />
        </svg>
    )
}

export default CarVisual
