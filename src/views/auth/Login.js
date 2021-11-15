import React, { useState } from 'react'
import App from '../../layouts/App'
import axios from 'axios'
import { useHistory } from 'react-router'
import { useSetRecoilState } from 'recoil'
import { authenticatedUser } from '../../store'
import { NavLink } from 'react-router-dom'


export default function Login() {
    const history = useHistory()
    const setAuth = useSetRecoilState(authenticatedUser)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState('')
    let credentials = { email, password }
    const submitHandler = async (e) => {
        e.preventDefault()
        try {
            await axios.get('/sanctum/csrf-cookie')
            await axios.post('/login', credentials)
            let { data } = await axios.get('/api/me')
            setAuth({ user: data.data, check: true })
            history.push('/')

        } catch ({ response }) {
            if (response.data.errors.email[0] === 'These credentials do not match our records.') {
                setErrors('Email Atau Password Anda Salah')
            } else {
                setErrors(response.data.errors)
            }
            console.log(errors);
        }
    }
    return (
        <App title="Login">
            <div className="row">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-header bg-success text-white rounded overflow h4">
                            Login
                        </div>
                        <div className="card-body rounded">
                            {errors === 'Email Atau Password Anda Salah' ?
                                <div className="text-danger mt-2 text-center">
                                    {errors}
                                </div> : ''
                            }
                            <form onSubmit={submitHandler}>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} name="email" id="email" className="form-control" placeholder="Masukkan Email" />
                                    {errors.email &&
                                        <div className="text-danger mt-2">
                                            {errors.email[0]}
                                        </div>
                                    }
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} name="password" id="password" className="form-control" placeholder="Masukkan Password" />
                                    {errors.password &&
                                        <div className="text-danger mt-2">
                                            {errors.password[0]}
                                        </div>
                                    }
                                </div>
                                <div className="mb-2">
                                    <p>Belum Punya Akun? <NavLink to="/register" className="text-decoration-none">Daftar Sekarang</NavLink></p>
                                </div>
                                <button type="submit" className="btn btn-success">Login</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </App>
    )
}
