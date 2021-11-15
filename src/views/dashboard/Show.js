import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router';
import App from '../../layouts/App'
import axios from 'axios'
import { useParams } from 'react-router'
import { useRecoilValue } from 'recoil'
import { authenticatedUser } from '../../store'
import { NavLink } from 'react-router-dom';

export default function Show(props) {
    const history = useHistory()
    const auth = useRecoilValue(authenticatedUser)
    const { slug } = useParams()
    const { user_id } = useParams()
    const [complaint, setComplaint] = useState([])

    useEffect(() => {
        let isMounted = true
        const getComplaint = async () => {
            let { data } = await axios.get(`api/dashboard/detail/${slug}`)
            setComplaint(data.data)
        }
     

        getComplaint()
        return () => { isMounted = false }
    }, [])


    return (
        <App title="Kagets App" className="container">
            <div className="mb-5">
                <h1>Detail Komplain Kamu</h1>
                <div className="row">
                    <div className="col-md-8">
                        <div className="card mt-4">
                            <div className="card-body">
                                <div className="mt-2">
                                    <strong>Nama</strong> : {complaint.name}
                                    <hr />
                                </div>
                                <div className="mt-2">
                                    <strong>Mitra</strong> : {complaint.mitra}
                                    <hr />
                                </div>
                                <div className="mt-2">
                                    <strong>Email</strong> : {complaint.email}
                                    <hr />
                                </div>
                                <div className="mt-2">
                                    <strong>No Handphone</strong> : {complaint.no_hp}
                                    <hr />
                                </div>
                                <div className="mt-2">
                                    <strong>Jenis Masalah</strong> : {complaint.problem}
                                    <hr />
                                </div>
                                <div className="mt-2">
                                    <strong>Deskripsi</strong> : {complaint.description}
                                    <hr />
                                </div>
                                <div className="mt-2">
                                    <strong>Gambar Pendukung</strong> : 
                                      <p className="mt-2">
                                      {complaint.support_image ? <img src={ 'http://backend-kagets.test/' + complaint.support_image } alt="img-support" height="150px" />  : <a href={`/complaint/${slug}/upload-image`} className="btn btn-primary">Gambar Kosong, Silahkan Upload Disini</a> }
                                      </p>
                                    <hr />
                                </div>
                                <div className="mt-2">
                                    <strong>Di Buat Pada</strong> : {complaint.created}
                                    <hr />
                                </div>
                                <div className="mt-2">
                                    <strong>Status Keluhan</strong> : <button type="button" class={complaint.status_complaint === 'selesai' ? "btn btn-success" : "btn btn-danger"}>{complaint.status_complaint}</button>
                                    <hr />
                                </div>
                                <div className="mt-2">
                                    <strong c>Pesan</strong> : 
                                    <div className="bg-primary mt-2 text-white rounded-2 py-2 px-2"># {complaint.message}</div>
                                    <hr />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </App>
    )
}
