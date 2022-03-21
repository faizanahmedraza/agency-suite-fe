import React from 'react'
import { Link } from 'react-router-dom'
import {
    HomeIcon,
    FolderIcon,
    UsersIcon,
    ShoppingCartIcon,
    LightningBoltIcon,
    UserGroupIcon,
    SupportIcon
} from '@heroicons/react/outline'

const Sidebar = () => {
    return (
        <div className='bg-gray-800'>
            <div className='w-60 text-gray-400'>
                <div className='h-[100vh]  py-3'>
                    <ul className='mx-4 text-white'>
                        <li className='bg-gray-900 py-2 px-1 rounded-md'>
                            <Link className='flex' to="/dashboard">
                                <HomeIcon className='w-6' />&nbsp; Dashboard
                            </Link>
                        </li>
                    </ul>
                    <div className='mx-4 py-5'>
                        <span className='font-semibold'>Orders</span>
                        <ul className='my-2 '>
                            <li className='py-2  rounded-md hover:bg-gray-700'>
                                <Link to="/" className='flex '>
                                    <HomeIcon className='w-6' />&nbsp; Request
                                </Link>
                            </li>
                            <li className='flex py-2 rounded-md hover:bg-gray-700'><FolderIcon className='w-6' />&nbsp; Invoices</li>
                            <li className='flex py-2 rounded-md hover:bg-gray-700'><UsersIcon className='w-6' />&nbsp; Clients</li>
                        </ul>

                    </div>
                    <div className='mx-4 py-5'>
                        <span className='font-semibold'>Set up</span>
                        <ul className='my-2'>
                            <li className='flex py-2  rounded-md hover:bg-gray-700'><ShoppingCartIcon className='w-6' />&nbsp; Portal</li>
                            <li className='flex py-2 rounded-md hover:bg-gray-700'>
                                <Link to="/dashboard/services" className='flex'>

                                    <LightningBoltIcon className='w-6' />&nbsp; Services
                                </Link>
                            </li>
                            <li className='flex py-2 rounded-md hover:bg-gray-700'><UserGroupIcon className='w-6' />&nbsp; Team</li>
                            <li className='flex py-2 rounded-md hover:bg-gray-700'><SupportIcon className='w-6' />&nbsp; Onboarding</li>
                        </ul>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sidebar