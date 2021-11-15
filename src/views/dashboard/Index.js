import axios from 'axios'
import React, { useEffect, useState } from 'react'
import App from '../../layouts/App'
import { useHistory, useParams } from 'react-router'
import { useRecoilValue } from 'recoil'
import { authenticatedUser } from '../../store'

export default function Index(props) {
    const auth = useRecoilValue(authenticatedUser)
    const history = useHistory()
    const {user_id} = useParams()
    const [state, setState] = useState({});
    const [complaint, setComplaint] = useState([])
    const [url, setUrl] = useState(`api/dashboard/${user_id}`)

    const finished = complaint.filter(item => item.status_complaint == 'selesai')
    const aliasFinish = complaint.filter(item => item.status_complaint != 'selesai')

    useEffect(() => {
        let isMounted = true
        const getComplaint = async () => {
            let { data } = await axios.get(url)
            if (isMounted) {
                setComplaint(data.data);
            }
        }
        getComplaint()

        return () => { isMounted = false }
    }, [url])
    return (
        <App title="Dashboard">
            <h3 className="text-center">Hai {auth.user.name}</h3>
            <hr />
            <div className="mt-4">
                <h3>Complaint In The Proccess.</h3>
                <div className="row">
                    { aliasFinish.length != 0 ? aliasFinish.map((comp, index) => (
                        <div className="col-md-4 py-3" key={index}>
                                <div className= {comp.status_complaint === 'verifikasi' ? "card mb-4 bg-primary rounded-xl" : comp.status_complaint === 'butuh_file' ? "card mb-4 bg-secondary rounded-xl text-dark" : "card mb-4 bg-danger rounded-xl" }  >
                                    <a href={`detail/${comp.slug}`} className="text-decoration-none">
                                        <div className="card-body">
                                            <h5>
                                                <h4 className="text-decoration-none text-primary text-white">
                                                    {comp.mitra_type}
                                                </h4>
                                                <hr className="bg-white"/>
                                            </h5>
                                            <div className="mt-4">
                                                <span className="text-white">
                                                Status : <button type="button" class="btn btn-light rounded-xl "><strong>{comp.status_complaint}</strong></button>
                                                </span>
                                            </div>
                                            <div className="mt-3">
                                                <span className="text-white">
                                                    Di Buat Tanggal : {comp.created}
                                                </span>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                        </div>
                    )): <span className="text-secondary px-4">- Anda Belum Mengajukan Komplaint </span>}
                </div>
            </div>
            <div className="mt-4">
                <h3>Complaint Finished.</h3>
                <div className="row">
                    {finished.map((comp, index) => (
                        <div className="col-md-4 py-3" key={index}>
                                <div className= {comp.status_complaint === 'verifikasi' ? "card mb-4 bg-primary rounded-xl"  : "card mb-4 bg-success rounded-xl" }  >
                                    <a href={`detail/${comp.slug}`} className="text-decoration-none">
                                        <div className="card-body">
                                            <h5>
                                                <h4 className="text-decoration-none text-primary text-white">
                                                    {comp.mitra_type}
                                                </h4>
                                                <hr className="bg-white"/>
                                            </h5>
                                            <div className="mt-4">
                                            <span className="text-white">
                                                Status : <button type="button" class="btn btn-light rounded-xl "><strong>{comp.status_complaint}</strong></button>
                                                </span>
                                            </div>
                                            <div className="mt-2">
                                                <span className="text-white">
                                                    Di Buat Tanggal : {comp.created}
                                                </span>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                        </div>
                    ))}
                </div>
            </div>
        </App>

    )
}
