import React from 'react'

const Login = () => {

    return (
        <div className='bg-gray-50 w-full h-screen'>
            <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-6">
                    <div>
                        <img
                            className="mx-auto h-12 w-auto"
                            src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                            alt="Workflow"
                        />
                        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in</h2>
                        <p className="mt-2 text-center text-sm text-gray-600">
                        </p>
                    </div>
                    <form className="mt-8 bg-white p-10 rounded-md shadow-sm border" action="#" method="POST">
                        <input type="hidden" name="remember" defaultValue="true" />
                        <div>
                            <label htmlFor="email-address" className='text-sm'>
                                Enter your portal URL
                            </label>
                            <div className='flex justify-center'>
                                <span class="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                                    http://
                                </span>
                                <input
                                    id="email-address"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="appearance-none  relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder="Your portal url"
                                />
                                 <span class="inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm ">
                                    manyrequest.com
                                </span>
                            </div>
                        </div>


                        <div>
                            <button
                                type="submit"
                                className="group relative w-full flex justify-center mt-3 py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Continue
                            </button>
                        </div>
                    </form>
                    <div className='text-center'>

                    <span className='text-gray-500'>Powered by <a className='text-indigo-600'>ManyRequests</a></span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login