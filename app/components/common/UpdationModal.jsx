import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { updateScores } from '@/store/slice/slice'

const UpdationModal = ({ logo, handleClose }) => {
    const dispatch = useDispatch()
    const { rank, percentile, score } = useSelector((state) => state.user)

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            rank: rank || '',
            percentile: percentile || '',
            score: score || '',
        },
        mode: 'onChange'
    })

    const onSubmit = (data) => {
        dispatch(updateScores(data))
        console.log('Form Submitted: ', data)
        onClose()
    }

    function onClose() {
        handleClose()
    }

    return (
        <div>
            <div className="fixed inset-0 bg-black h-full w-full bg-opacity-50 z-10" onClick={onClose} />
            <div className="fixed inset-0 z-20 flex justify-center items-center">
                <div className="bg-white rounded-lg p-6 w-full max-w-[80%] sm:max-w-xl space-y-6">
                    <div className="flex justify-between items-center">
                        <h3 className="font-bold text-lg">Update scores</h3>
                        <img src={logo} alt="logo" className="w-8 h-8" />
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        {/* Rank Input */}
                        <div className="space-y-2 flex flex-col sm:flex-row justify-between">
                            <div className="flex items-center gap-2">
                                <div className="flex items-center justify-center w-5 h-5 bg-blue-900 rounded-full">
                                    <span className="text-white text-sm">1</span>
                                </div>
                                <label className="text-sm font-medium">Update your Rank</label>
                            </div>
                            <div className="w-full sm:w-[40%]">
                                <input
                                    type="number"
                                    {...register('rank', {
                                        required: 'Rank is required',
                                        valueAsNumber: true,
                                        min: { value: 1, message: 'Rank must be a positive number' },
                                    })}
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter rank"
                                />
                                {errors.rank && <p className="text-red-600">{errors.rank.message}</p>}
                            </div>
                        </div>

                        {/* Percentile Input */}
                        <div className="space-y-2 flex flex-col sm:flex-row justify-between">
                            <div className="flex items-center gap-2">
                                <div className="flex items-center justify-center w-5 h-5 bg-blue-900 rounded-full">
                                    <span className="text-white text-sm">2</span>
                                </div>
                                <label className="text-sm font-medium">Update your Percentile</label>
                            </div>
                            <div className="w-full sm:w-[40%]">
                                <input
                                    type="number"
                                    {...register('percentile', {
                                        required: 'Percentile is required',
                                        valueAsNumber: true,
                                        min: { value: 0, message: 'Percentile must be at least 0' },
                                        max: { value: 100, message: 'Percentile cannot exceed 100' },
                                    })}
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter percentile"
                                />
                                {errors.percentile && <p className="text-red-600">{errors.percentile.message}</p>}
                            </div>
                        </div>

                        {/* Score Input */}
                        <div className="space-y-2 flex flex-col sm:flex-row justify-between">
                            <div className="flex items-center gap-2">
                                <div className="flex items-center justify-center w-5 h-5 bg-blue-900 rounded-full">
                                    <span className="text-white text-sm">3</span>
                                </div>
                                <label className="text-sm font-medium">Update your Current Score (out of 15)</label>
                            </div>
                            <div className="w-full sm:w-[40%]">
                                <input
                                    type="number"
                                    {...register('score', {
                                        required: 'Score is required',
                                        valueAsNumber: true,
                                        min: { value: 0, message: 'Score must be at least 0' },
                                        max: { value: 15, message: 'Score cannot exceed 15' },
                                    })}
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter score"
                                />
                                {errors.score && <p className="text-red-600">{errors.score.message}</p>}
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex text-[.9rem] font-semibold justify-end gap-3 pt-4">
                            <button
                                onClick={onClose}
                                type="button"
                                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md border-blue-900 border"
                            >
                                cancel
                            </button>
                            <button
                                type="submit"
                                className="px-6 py-2 bg-blue-900 text-white rounded-md hover:bg-blue-800 flex items-center gap-2"
                            >
                                save
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <line x1="5" y1="12" x2="19" y2="12" />
                                    <polyline points="12 5 19 12 12 19" />
                                </svg>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default UpdationModal
