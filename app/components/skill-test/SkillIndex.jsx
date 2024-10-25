import React from 'react'
import Section1 from './Section1'
import Section2 from './Section2'

const SkillIndex = () => {
    return (
        <div className='w-[95%] mx-auto p-5'>
            <div className='font-custom w-full space-y-5'>
                <span className='text-gray-500 text-[1.05rem] font-semibold'>
                    Skill Test
                </span>

                <div className='space-y-5 lg:flex lg:space-y-0 gap-5'>
                    <div className='lg:w-[60%]'>
                        <Section1 />
                    </div>
                    <div className='lg:w-[40%]'>
                        <Section2 />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SkillIndex