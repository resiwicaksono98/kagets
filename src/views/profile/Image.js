import React from 'react'
import App from '../../layouts/App'
import axios from 'axios'
import { useEffect, useState } from 'react/cjs/react.development'
import { useHistory, useParams } from 'react-router'
import './image.scss'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-confirm-alert/src/react-confirm-alert.css';



export default function Image() {
    const history = useHistory()
    const [me, setMe] = useState([])
    const [default_image, setDefaultImage] = useState('https://fakeimg.pl/350x200/')
    const [image, setImage] = useState([])
    const [picture_path, setPicturePath] = useState([])

    useEffect(() => {
        const getProfile = async () => {
            let { data } = await axios.get(`api/me`)
            setMe(data.data)
            setPicturePath(data.data.picture_path)
        }
        getProfile()
    }, [])

    const handleChange = e => {
        setPicturePath(e.target.files[0])
        setImage(URL.createObjectURL(e.target.files[0]))
    }

    const notify = () => toast('Yaps, Foto Profile Sudah Di Update', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,

    });

    const submitData = e => {
        e.preventDefault()
        const fData = new FormData()
        fData.append('picture_path', picture_path)
        axios.post(`api/me/${me.id}/update-image-profile`, fData)
            .then(res => {
                console.log('response', res)
                history.push(`/profile/${me.name}`)
                notify()
            }).catch(e => {
                console.error('Failure', e);
            })
    }

    return (
        <App title="Update Image Profile" className="container">
            <div className="row">
                <div className="col-md-12">
                    <div className="card mb-4">
                        <div className="card-header bg-success text-white rounded overflow h4">
                            Profile Picture {me.name}
                        </div>
                        <div className="card-body">
                            <form onSubmit={submitData} encType="multipart/form-data" >
                                <div className="mb-3">
                                    <label htmlFor="picture_path" className="form-label">Foto Diri</label>
                                    <div className="my-2">
                                        <span className="fs-6 fw-light text-secondary"> * Foto Harus Jelas Agar Identifkasi Complaint Mu Cepat Terselesaikan!</span>
                                    </div>
                                    <img src={image != '' ? image : picture_path === '' ? default_image : `http://backend-kagets.test/` + picture_path} alt="img-preview" height="250" width="350" data-bs-toggle="modal" data-bs-target="#preview-img" />
                                    <input type="file" name="picture_path" id="picture_path" className="form-control mt-2" onChange={handleChange} />
                                </div>
                                <button type="submit" className="btn btn-success" onClick={submitData}>
                                    Update Foto Diri</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                {/* Modal */}
                <div className="modal fade " id="preview-img" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div className="modal-dialog modal-xl" width="100%" height="100%">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="staticBackdropLabel">Preview Image Profile</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                            </div>
                            <div className="modal-body" >
                                <img src={image != '' ? image : picture_path === '' ? default_image : `http://backend-kagets.test/` + picture_path} alt="img-preview" height="500px" className="img-fluid rounded mx-auto d-block"  />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </App>
    )
}
