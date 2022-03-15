import React, { useState } from 'react'
import useAuth from 'src/hooks/useAuth'
import FormImage from 'src/images/login-form.png'
import { Link, useHistory } from 'react-router-dom'
const Login = () => {

    const [user, setUser] = useState({
        email: '',
        password: ''
    })

    const router = useHistory()

    const [error, setError] = useState('')

    const { login } = useAuth()


    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault()

        const data = await login(user)

        if (data.success) {
            return router.push('/')
        }else{
            setError(data.message)
        }

    }


    return (
        <div>
            <div>
                <div className='container border p-5' style={{ marginTop: "10%" }}>
                    <div className='row'>
                        <div className='col-md-6 col-sm-12'>
                            <img src={FormImage} alt="login-form" className="img-fluid" width="400" />
                        </div>
                        <div className='col-md-6'>
                            <h3 className="tx-color-01 mg-b-5">
                                Sign In
                            </h3>
                            <p className="tx-color-03 tx-16 mg-b-40">
                                Welcome! Please sigin in to
                                continue.
                            </p>
                            <span className='text-danger fw-bold'>{error && error}</span>
                            <form onSubmit={onSubmitHandler}>
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1">Email address</label>
                                    <input type="email" name="email" onChange={handleChange} value={user.email} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                                </div>
                                <br />
                                <div className="form-group">
                                    <label htmlFor="exampleInputPassword1">Password</label>
                                    <input type="password" name="password" onChange={handleChange} value={user.password} className="form-control" id="exampleInputPassword1" placeholder="Password" />
                                </div>
                                <div>
                                    <small>Don't have an account ? <Link to="/register">Signup</Link></small>
                                </div>
                                <div className='mt-3'>
                                    <button type="submit" className="btn btn-primary">Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login