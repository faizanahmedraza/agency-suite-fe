import React from 'react'

const Button = ({ label }) => {
    return (
        <div className='mx-auto max-w-[550px]'>
            <button
                type="submit"
                className="group relative h-12 w-full my-4 py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
                {label}
            </button>
        </div>
    )
}

export default Button