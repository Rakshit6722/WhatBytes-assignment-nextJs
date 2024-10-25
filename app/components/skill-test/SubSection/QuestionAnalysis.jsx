import React from 'react'
import { useSelector } from 'react-redux'
import CircularProgress from '../../common/Graph/CircularProgress'

const QuestionAnalysis = () => {
  const { score } = useSelector(state => state.user);

  return (
    <div className='py-7 px-5 border border-gray-300 rounded-md mb-24'> {/* Add margin-bottom */}
      <div className='flex justify-between items-center'>
        <p className='font-bold'>Question Analysis</p>
        <span className='font-bold text-blue-900 pr-5'>{score}/15</span>
      </div>
      <p className='mt-5 text-[.8rem]'>
        <span className='font-bold text-gray-800'>You scored {score} questions correctly out of 15.</span> However, it still needs some improvements.
      </p>
      <div className='mt-5'>
        <CircularProgress />
      </div>
    </div>
  );
};

export default QuestionAnalysis