import axios from 'axios'
import React from 'react'
import { useEffect, useState } from 'react/cjs/react.development'
import App from '../../layouts/App'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { confirmAlert } from 'react-confirm-alert';
import { useHistory, useParams } from 'react-router';


function Index() {
    const history = useHistory()
    const [me, setMe] = useState([])
    const [name, setName] = useState('')
    const [mitra_type, setMitraType] = useState('')
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [phone_number, setPhoneNumber] = useState('')
    const [address, setAddress] = useState('')
    const [default_image, setDefaultImage] = useState('https://fakeimg.pl/350x200/')
    const [image, setImage] = useState([])
    const [picture_path, setPicturePath] = useState([])
    const request = { name, email, mitra_type, username, phone_number, address, picture_path }

    useEffect(() => {
        let isMounted = true
        const getProfile = async () => {
            let { data } = await axios.get('api/me')
            setMe(data.data)
            setName(data.data.name)
            setEmail(data.data.email)
            setUsername(data.data.username)
            setPhoneNumber(data.data.phone_number)
            setAddress(data.data.address)
            setImage(data.data.picture_path)
            setMitraType(data.data.mitra_type)


        }

        getProfile()

        return () => { isMounted = false }
    }, [])

    const handleChange = e => {
        // setPicturePath(URL.createObjectURL(e.target.files[0]))
        setPicturePath(e.target.files[0])
        const fData = new FormData()
        fData.append('picture_path', setPicturePath)
    }



    const submitDialog = async (e) => {
        e.preventDefault()
        confirmAlert({
            title: 'Form Update',
            message: 'Apa Anda Yakin Untuk Update Data Diri Anda?',
            buttons: [
                {
                    label: 'Ya',
                    onClick: () => submitHandler()
                },
                {
                    label: 'Tidak',
                }
            ]
        });
    }

    const submitHandler = async (e) => {
        try {
           
            let { data } = await axios.post(`api/me/${me.id}`, request)
            console.log('Complaint Berhasil Di Tambahkan');
            console.log(data.data);
            console.log(request);
        } catch (error) {
            console.log(error);
            console.log(request);
        }
    }


    return (
        <App title={`profile`} className="container">
            <h4>Profile {me.name} / {me.mitra_type} </h4>
            <div className="row mt-4">
                <div className="col-md-12">
                    <div className="card mb-4">
                        <div className="card-header bg-success text-white rounded overflow h4">
                            Data Diri
                        </div>
                        <div className="card-body">
                            <form onSubmit={submitDialog} method='post' encType="multipart/form-data" >
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">Nama</label>
                                    <input type="text" name="name" id="name" className="form-control" defaultValue={me.name} onChange={(e) => setName(e.target.value)} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Jenis Mitra</label>
                                    <input type="email" name="email" id="email" className="form-control" defaultValue={me.email} onChange={(e) => setEmail(e.target.value)} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="username" className="form-label">Username</label>
                                    <input type="text" name="username" id="username" className="form-control" defaultValue={me.username} onChange={(e) => setUsername(e.target.value)} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="phone_number" className="form-label">Nomer Handphone</label>
                                    <input type="text" name="phone_number" id="phone_number" className="form-control" defaultValue={me.phone_number} onChange={(e) => setPhoneNumber(e.target.value)} />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="address">Alamat</label>
                                    <textarea className="form-control mt-2" defaultValue={me.address} onChange={(e) => setAddress(e.target.value)} id="address" rows="10"></textarea>
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="picture_path" className="form-label">Foto Diri</label><br />
                                    <img src={picture_path != '' ? picture_path : image === '' ? default_image : `http://backend-kagets.test/` + image} alt="img-preview" height="250" width="350" onClick={()=> history.push(`/profile/${me.name}/upload-profile`)}/>
                               
                                </div>

                                <button type="submit" className="btn btn-success" >
                                    Update Profile</button>
                                <ToastContainer
                                />
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </App>
    )
}

export default Index
