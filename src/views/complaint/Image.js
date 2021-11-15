import React, { useState } from 'react'
import App from '../../layouts/App'
import axios from 'axios'
import { useEffect } from 'react/cjs/react.development'
import { useHistory, useParams } from 'react-router'

export default function Image() {
    const history = useHistory()
    const [complaint, setComplaint] = useState([])
    const [support_image, setSupportImage] = useState('')
    const { slug } = useParams()
    const [image, setImage] = useState('https://fakeimg.pl/350x200/')

    useEffect(() => {
        const getComplaint = async () => {
            let { data } = await axios.get(`api/dashboard/detail/${slug}`)
            setComplaint(data.data)
        }

        getComplaint()
    }, [])

    const handleChange = e => {
        setSupportImage(e.target.files[0])
        setImage(URL.createObjectURL(e.target.files[0]))
      
    }

    const submitData = e => {
        e.preventDefault()
        const fData = new FormData()
        fData.append('support_image', support_image)
        axios.post(`api/complaint/${slug}/upload-image`, fData)
            .then(res => {
                console.log('response', res)
                history.push(`complaint/${slug}`)
            }).catch(e => {
                console.error('Failure', e);
            })
    }
    return (
        <App title="Verifikasi Image" className="container">
            <div className="row">
                <div className="col-md-12">
                    <div className="card mb-4">
                        <div className="card-header bg-success text-white rounded overflow h4 ">
                            Kirim Bukti Gambar
                        </div>
                        <div className="card-body">
                            <form onSubmit={submitData} encType="multipart/form-data" >
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">Nama </label>
                                    <input type="text" name="name" id="name" disabled className="form-control" value={complaint.name} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="support_image" className="form-label">Gambar Pedukung</label>
                                    <div className="my-2">
                                        <span className="fs-6 fw-light text-secondary"> * Kirimkan Gambar Dengan Jelas Agar Complaint Di Tangani Dengan Cepat</span>
                                    </div>
                                    <img src={image} alt="img-preview" height="250" width="350" />
                                    <input type="file" name="support_image" id="support_image" className="form-control mt-2" onChange={handleChange} />
                                </div>
                                <button type="submit" className="btn btn-success" onClick={submitData}>
                                    Kirim Gambar Pendukung</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </App>
    )
}
