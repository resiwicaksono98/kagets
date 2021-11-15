import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './sass/navigation.scss'
import { NavLink, useHistory, useParams } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { authenticatedUser } from '../store'


export default function Navigation() {
    const history = useHistory()
    const {user_id} = useParams()
    const [auth, setAuth] = useRecoilState(authenticatedUser)

    const signOutHandler = async () => {
        await axios.post('/logout')
        setAuth({ check: false, user: [] })
        history.push('/login')
    }

    
    return (
        <nav className="navbar navbar-expand-lg navbar-dark border-bottom p-3">
            <div className="container">
                <NavLink className="navbar-brand" to="/">Kagets App</NavLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink exact to="/" className="nav-link ">Beranda</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/news" className="nav-link ">Berita</NavLink>
                        </li>
                        {auth.check ?
                            <>
                                <li className="nav-item">
                                    <NavLink to={`/dashboard/${auth.user.id}`} className="nav-link ">Dashboard</NavLink>
                                </li>
                             
                                <li className="nav-item">
                                    <NavLink to="/complaint" className="nav-link ">Komplaint</NavLink>
                                </li>
                            </>


                            : ''

                        }
                    </ul>

                    {auth.check ?
                        <ul className="navbar-nav mb-2 mb-lg-0">

                            <li className="nav-item dropdown">
                                <NavLink className="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    {auth.user.name}
                                </NavLink>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li><button className="dropdown-item" onClick={e => history.push(`/profile/${auth.user.name}`)}>Profile</button></li>
                                    <li><button className="dropdown-item" onClick={signOutHandler}>Logout</button></li>
                                </ul>
                            </li>

                           
                        </ul>
                        :
                        <ul className="navbar-nav mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink to="/login" className="nav-link auth">Login</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/register" className="nav-link auth">Register</NavLink>
                            </li>

                        </ul>
                    }
                </div>
            </div>
        </nav>

    )
}
