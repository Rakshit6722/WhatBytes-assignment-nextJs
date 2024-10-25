import React from 'react'
import ProgressBar from './ProgressBar'

const ProgressBarDisplay = () => {

    const items = [
        {
            title: "HTML Tools, Forms, History",
            percentage: 80,
            color: "#4285f4"
        },
        {
            title: "Tags & References in HTML",
            percentage: 60,
            color: "#fb923c"
        },
        {
            title: "Tables & References in HTML",
            percentage: 24,
            color: "#ef4444"
        },
        {
            title: "Tables & CSS Basics",
            percentage: 96,
            color: "#22c55e"
        }
    ]

    return (
        <div className='p-5'>
            {
                items.map((item, index) => {
                    return <ProgressBar
                        key={index}
                        title={item.title}
                        percentage={item.percentage}
                        color={item.color}
                    />
                })
            }
        </div>
    )
}

export default ProgressBarDisplay