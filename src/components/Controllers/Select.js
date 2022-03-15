import React from 'react'

const Select = ({ label, options }) => {
    return (
        <div className="m-auto my-10 max-w-[500px]">
            <label htmlFor="country" className="block text-sm font-medium text-gray-700 ">
                What stage is your business at? *
            </label>
            <select
                id="country"
                name="country"
                autoComplete="country-name"
                className="mt-1 block w-full h-12 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
                <option className='sm:text-sm'>No option selected</option>
                {options.map(option => (
                    <option className='sm:text-sm' key={option.id}>{option.name}</option>
                ))}
            </select>
        </div>
    )
}

export default Select
