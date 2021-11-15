import axios from 'axios'
import React, { useState } from 'react'
import { useParams } from 'react-router'
import { useEffect } from 'react/cjs/react.development'
import App from '../../layouts/App'
import LogoSuccess from '../../assets/success.jpg'

export default function Success() {
    const { slug } = useParams()
    const [complaint, setComplaint] = useState([])
    const [name, setName] = useState('')
    const [state, setState] = useState({});

    useEffect(() => {
        const getComplaint = async () => {
            let { data } = await axios.get(`api/complaint/${slug}`)
            setComplaint(data.data)
            setName(data.data.user.name);
        }

        getComplaint()
        return () => {
            setState({}); // This worked for me
        };
    }, [])
    return (
        <App title="Kaget App" className="container">
            <div className="d-flex justify-content-center align-items-center mt-5">
                <div className="row">
                    <div className="col-md-12">
                        <h3 className="text-dark">Yeay!! {name} Complaint Kamu Sedang Kami Verifikasi</h3><br />
                        <h4 className="text-secondary text-center">Tunggu 1-3 X 24 Jam Kami Akan Menghubungimu Di Dashboard Akun</h4>
                        <img src={LogoSuccess} className="rounded mx-auto d-block" height="400px" alt="" />
                    </div>
                </div>


             
            </div>
        </App>
    )
}
