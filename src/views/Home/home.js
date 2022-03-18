import React from 'react'
import { PlayIcon } from '@heroicons/react/solid'
 

const Home = () => {

    return (
        <div className='bg-gray-50'>
            <div className='container text-center  mx-auto py-10'>
                <h1 className='font-extrabold text-6xl'>Client Portal Software <br /> For Agencies</h1>
                <br />
                <p className='text-gray-600'>Manage your clients, team members, projects, billing, automations, all in one easy <br /> to use platform.</p>
                <br/>
                <div className='flex justify-center gap-2 '>
                    <div >
                        <button className='bg-indigo-600  text-white py-4 px-8 rounded-md font-semibold underline shadow-sm'>Try for free</button>
                    </div>
                    <div>
                        <button className='bg-white flex text-indigo-600 p-4 rounded-md font-semibold shadow-sm'><PlayIcon className='w-6 h-6'/> Watch Demo</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home