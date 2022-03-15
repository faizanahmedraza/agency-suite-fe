import React from 'react'

const Toggler = () => {
    return (
        <div>
            <label className="relative flex justify-center px-2 items-center group text-base leading-6 text-gray-500">
                <input type="checkbox" className="absolute left-1/2 -translate-x-1/2 w-full h-full peer appearance-none rounded-md" />
                <span className="w-14 h-8 flex items-center flex-shrink-0  p-1 bg-gray-300 rounded-full duration-300 ease-in-out peer-checked:bg-indigo-500  after:w-6 after:h-6 after:bg-white after:rounded-full after:shadow-md after:duration-300 peer-checked:after:translate-x-6 group-hover:after:translate-x-1"></span>
            </label>
        </div>
    )
}

export default Toggler