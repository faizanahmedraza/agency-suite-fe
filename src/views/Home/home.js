import React from 'react'
import useAuth from 'src/hooks/useAuth'

const Home = () => {

    const { logout, user } = useAuth()

    const t0 = user.code.split('_')[0]
    const t1 = user.code.split('_')[1]

    console.log(user)
    return (
        <div>
            <div>

                <h3>Home</h3>
                <div className='bg-danger '>
                    <h5 className='text-end'>Joe@email.com</h5>
                    <h5 className='text-center'> Impact Assesment</h5>
                </div>
                {/* <div>
                    T0 Code : {t0}
                    <br />
                    T1 Code : {t1}
                </div> */}
            </div>
            <button onClick={() => logout()}>Logout</button>
        </div>
    )
}

export default Home