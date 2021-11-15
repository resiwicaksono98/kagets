import React, { useEffect, useState } from 'react'
import App from '../../layouts/App'
import axios from 'axios'
import { useHistory } from 'react-router'
import { useSetRecoilState } from 'recoil'
import { authenticatedUser } from '../../store'
import { NavLink } from 'react-router-dom'

export default function Register() {
    const history = useHistory()
    const setAuth = useSetRecoilState(authenticatedUser)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [password_confirmation, setPasswordConfirmation] = useState('')
    const [mitra_type, setMitraType] = useState('')
    const [categories, setCategories] = useState([])
    const [errors, setErrors] = useState('')
    const [state, setState] = useState({});
    let request = {
        name, email, password, password_confirmation, mitra_type
    }

    useEffect(() => {
        getMitraType()
    },[])

    const getMitraType = async () => {
        let { data } = await axios.get('api/category')
        setCategories(data.data)

    }

    const submitHandler = async (e) => {
        e.preventDefault()
        try {
            let { data } = await axios.post('/register', request)
            setAuth({
                user: data.user,
                check: true
            })
            history.push('/')
        } catch ({response}) {
          setErrors(response.data.errors);          
        }
    }

    return (
        <App title="Register">
            <div className="row">
                <div className="col-md-12">
                    <div className="card mb-4">
                        <div className="card-header bg-success text-white rounded overflow h4">
                            Register
                        </div>
                        <div className="card-body">
                            <form onSubmit={submitHandler}>
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">Nama</label>
                                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} name="name" id="name" className="form-control" placeholder="Nama Lengkap"/>
                                    { errors.name && 
                                        <div className="text-danger mt-2">
                                              {errors.name[0]}
                                        </div>
                                   }
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} name="email" id="email" className="form-control" placeholder="Email Aktif" />
                                    { errors.email && 
                                        <div className="text-danger mt-2">
                                              {errors.email[0]}
                                        </div>
                                   }
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} name="password" id="password" className="form-control" placeholder="Password"/>
                                    { errors.password && 
                                        <div className="text-danger mt-2">
                                              {errors.password[0]}
                                        </div>
                                   }
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password_confirmation" className="form-label">Konfirmasi Password</label>
                                    <input type="password" value={password_confirmation} onChange={(e) => setPasswordConfirmation(e.target.value)} name="password_confirmation" id="password_confirmation" className="form-control" placeholder="Masukkan Ulang Password" />
                                  
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="mitra_type" className="form-label">Jenis Mitra</label>
                                    <select className="form-control" id="mitra_type" onChange={(e) => setMitraType(e.target.value)} value={mitra_type}>
                                        {categories.map((category, index) => 
                                            <option key={index} value={category.name}>{category.name}</option>
                                        )};
                                    </select>
                                </div>
                                <div className="mb-2">
                                    <p>Sudah Punya Akun? <NavLink to="/login" className="text-decoration-none">Login Sekarang</NavLink></p>
                                </div>
                                <button type="submit" className="btn btn-success">Register</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </App>
    )
}
