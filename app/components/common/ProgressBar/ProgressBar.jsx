import React from 'react'

const ProgressBar = ({ title, percentage, color }) => {

    const getLighterColor = (color) => {
        return `${color}40`
    }

    return (
        <div className='mb-6 font-custom'>
            <div className='text-gray-700 mb-2'>{title}</div>
            <div className='flex items-center justify-between'>
                <div
                    className='relative h-3 w-[85%] rounded-full overflow-hidden'
                    style={{ backgroundColor: getLighterColor(color) }}
                >
                    <div
                        className='absolute top-0 left-0 h-full rounded-full transition-all duration-500 ease-out'
                        style={{
                            width: `${percentage}%`,
                            backgroundColor: color
                        }}
                    />
                </div>
                <span className={`text-sm font-bold mt-1 float-right`} style={{color:color}}>{percentage}%</span>
            </div>
        </div>
    )
}

export default ProgressBar