import React from 'react'
import SyllabusWiseAnalysis from './SubSection/SyllabusWiseAnalysis'
import QuestionAnalysis from './SubSection/QuestionAnalysis'

const Section2 = () => {
  return (
    <div className='space-y-5'>
      <SyllabusWiseAnalysis/>
      <QuestionAnalysis/>
    </div>
  )
}

export default Section2