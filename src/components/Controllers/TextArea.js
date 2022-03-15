import React from 'react'

const TextArea = ({label}) => {
    return (
        <div className="m-auto my-10 max-w-[550px]">
            <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                {label}
            </label>
            <textarea
                id="about"
                name="about"
                rows={5}
                className="shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border-2 border-gray-300 rounded-md"
                defaultValue={''}
            />
        </div>
    )
}

export default TextArea