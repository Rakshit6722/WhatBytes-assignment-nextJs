import React from 'react'
import Test from './SubSection/Test'
import Statistics from './SubSection/Statistics'
import Graph from './SubSection/Graph'

const Section1 = () => {
  return (
    <div className='space-y-5'>
        <Test/>
        <Statistics/>
        <Graph/>
    </div>
  )
}

export default Section1