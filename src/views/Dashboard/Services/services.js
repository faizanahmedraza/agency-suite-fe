import React from 'react'
import { Link } from 'react-router-dom'
import {
    PlusCircleIcon
} from "@heroicons/react/outline"
import { Tab } from '@headlessui/react'


const Services = () => {
    return (
        <div className='bg-gray-50 w-full'>
            <div className='container px-6'>
                <div className='py-5 text-gray-500 font-semibold'>
                    <Link to="/dashboard">
                        Dashboard
                    </Link >
                    &nbsp;
                    &gt;
                    &nbsp;
                    <Link to="/dashboard/services">
                        Services
                    </Link>
                </div>
                <div className='grid grid-cols-4 gap-2'>
                    <span className='w-1/5 text-3xl font-bold'>Services</span>
                    <button className='bg-white text-gray-600 font-semibold rounded-md shadow-sm  px-3 py-3'>Manage discount coupons</button>
                    <button className='bg-white text-gray-600 font-semibold rounded-md shadow-sm  px-3 py-3'>Preview service catalog</button>
                    <button className='bg-indigo-600 text-white font-semibold rounded-md shadow-sm  px-3 py-3'>Create service</button>
                </div>
                <div className='bg-white mt-5 py-5 '>
                    <Link to="/dashboard" className='flex justify-between'>
                        <span className='px-5 text-2xl text-indigo-500 font-semibold'>Get Started</span>
                        <span className='w-6 mx-3 text-gray-500'><PlusCircleIcon /></span>
                    </Link>
                </div>
                <div>
                    <Tab.Group>
                        <Tab.List>
                            <Tab>Tab 1</Tab>
                            <Tab>Tab 2</Tab>
                            <Tab>Tab 3</Tab>
                        </Tab.List>
                        <Tab.Panels>
                            <Tab.Panel>Content 1</Tab.Panel>
                            <Tab.Panel>Content 2</Tab.Panel>
                            <Tab.Panel>Content 3</Tab.Panel>
                        </Tab.Panels>
                    </Tab.Group>
                </div>
            </div>
        </div>
    )
}

export default Services