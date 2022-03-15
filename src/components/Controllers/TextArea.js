import React from 'react'

const TextArea = () => {
    return (
        <div className="m-auto my-10 w-[500px]">
            <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                What services are you selling? *
            </label>
            <textarea
                id="about"
                name="about"
                rows={3}
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                defaultValue={''}
            />
        </div>
    )
}

export default TextArea