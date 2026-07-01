import React from 'react'

// Side-view car whose body is painted with the selected exterior color.
// This is the "visual interface changes in response to a feature" requirement:
// picking a different exterior repaints the car live.
const CarVisual = ({ color = '#888888', convertible = false }) => {
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

            {/* cabin / windows */}
            {!convertible && (
                <path
                    d='M150 100 L235 100 L235 60 Q235 55 245 55 L320 55 L235 100 Z'
                    fill='rgba(255,255,255,0.35)'
                />
            )}
            <path d='M255 100 L318 60 L430 60 L455 100 Z' fill='rgba(180,215,255,0.55)' stroke='rgba(0,0,0,0.25)' strokeWidth='2' />

            {/* door line */}
            <line x1='350' y1='100' x2='350' y2='178' stroke='rgba(0,0,0,0.25)' strokeWidth='2' />

            {/* wheels */}
            <g>
                <circle cx='185' cy='185' r='42' fill='#111' />
                <circle cx='185' cy='185' r='20' fill='#cbd5e1' />
                <circle cx='455' cy='185' r='42' fill='#111' />
                <circle cx='455' cy='185' r='20' fill='#cbd5e1' />
            </g>

            {/* headlight */}
            <circle cx='568' cy='150' r='8' fill='#fde68a' />
        </svg>
    )
}

export default CarVisual
