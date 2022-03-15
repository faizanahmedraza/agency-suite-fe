import React from 'react'

const Input = ({ label , smallLabel }) => {
    return (
        <div className='my-10'>
            <div className='w-[500px] m-auto'>
                <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                    {label}
                </label>
                <small>{smallLabel && smallLabel}</small>
                <input
                    type="text"
                    name="first-name"
                    id="first-name"
                    autoComplete="given-name"
                    className="mt-1  h-12 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm  border-gray-300  rounded-md"

                />
            </div>
        </div>
    )
}

export default Input