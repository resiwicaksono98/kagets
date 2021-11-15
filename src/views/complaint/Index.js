import react, { useEffect, useState } from 'react'
import App from '../../layouts/App'
import axios from 'axios'
import { useHistory } from 'react-router';
import { confirmAlert } from 'react-confirm-alert';
import { useRecoilState } from 'recoil'
import { authenticatedUser } from '../../store'
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-confirm-alert/src/react-confirm-alert.css';
var randomstring = require("randomstring");



export default function Index() {
    const history = useHistory()
    const [auth, setAuth] = useRecoilState(authenticatedUser)
    const [name, setName] = useState('')
    const [mitra_type, setMitraType] = useState('')
    const [phone_number, setPhoneNumber] = useState('')
    const [slug, setSlug] = useState('')
    const [problems, setProblems] = useState([])
    const [problem, setProblem] = useState('')
    const [description, setDescription] = useState('')
    const [errorsP, setErrorsP] = useState([])
    const [errorsD, setErrorsD] = useState([])
    const [user_id, setUserId] = useState('')
    const [complaint, setComplaint] = useState([])
  
    let request = {
        user_id, mitra_type, slug, problem, description
    }


    useEffect(() => {

        let isMounted = true
        if (isMounted) {
            getUsers()
            getProblems()
         
        }
        return () => { isMounted = false }
    }, [])

    const getUsers = async () => {
        let { data } = await axios.get('api/me')
        setUserId(data.data.id);
        setName(data.data.name);
        setMitraType(data.data.mitra_type);
        setPhoneNumber(data.data.phone_number);
        setSlug(data.data.mitra_type.toLowerCase() + '-' + randomstring.generate(10))
        setComplaint(data.data.complaint)

    }
    const getProblems = async () => {
        let { data } = await axios.get('api/problem')
        setProblems(data.data)

    }
    const onChangeProblems = (e) => {
        const selectedValue = e.target.value
        setProblem(selectedValue)
    }

    const submitDialog = async (e) => {
        e.preventDefault()
        confirmAlert({
            title: 'Form Keluhan',
            message: 'Apa Anda Yakin Melanjutkan Keluhan Anda ?',
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
    };

    const notify = () => toast('Maksimal Keluhan Hanya 1 , Dapat Dilakukan Kembali Saat Keluhan Sebelumnya Sudah Berhasil', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,

    });

    const submitHandler = async (e) => {
        const data = complaint.filter(item => item.status_complaint == 'verifikasi')
        try {
            if (data.length >= 1) {
                notify()
            } else {
                let { data } = await axios.post('api/complaint', request);
                console.log('Complaint Berhasil Di Tambahkan');
                history.push(`/complaint/${data.data.slug}/upload-image`)
                window.location.reload()
            
            }


        } catch (e) {
            console.log(request);
            if(problem === ''){
                setErrorsP({problem : 'Anda Belum Memilih Jenis Keluhan'})
            }
            if(description === ''){
                setErrorsD({description: 'Description Wajib Diisi'})
            }
        
           
        }
    }
    return (
        <App title="Kagets App" className="container">
            <div className="row">
                <div className="col-md-12">
                    <div className="card mb-4 rounded">
                        <div className="card-header bg-success text-white rounded overflow h4 text-center ">
                            Form Keluhan
                        </div>
                        <div className="card-body">
                            <form onSubmit={submitDialog} method='post' encType="multipart/form-data" >
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">Nama</label>
                                    <input type="text" disabled name="name" id="name" className="form-control" value={name} onChange={(e) => setUserId(e.target.value)} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="mitra_type" className="form-label">Jenis Mitra</label>
                                    <input type="text" disabled name="mitra_type" id="mitra_type" className="form-control" value={mitra_type} onChange={(e) => setMitraType(e.target.value)} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="mitra_type" className="form-label">Nomor Tertera Di Akun Gojek</label>
                                    <input type="text" disabled name="mitra_type" id="mitra_type" className="form-control" value={phone_number} onChange={(e) => setPhoneNumber(e.target.value)} />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="problem" className="form-label">Jenis Keluhan</label>

                                    <select className="form-control" id="problem" name="problem" onChange={(e) => {
                                        onChangeProblems(e) 
                                    }} >
                                        <option value="Choose Mitra Type" disabled selected defaultValue >Pilih Problem</option>
                                        {problems.map((problem, index) =>
                                            <option key={index} value={problem.name}>{problem.name}</option>
                                        )};
                                    </select>
                                    { errorsP.problem && 
                                        <div className="text-danger mt-2">
                                              {errorsP.problem}
                                        </div>
                                   }
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="descriptions">Deskripsikan Masalahmu</label>
                                    <textarea className="form-control mt-2" value={description} onChange={(e) => setDescription(e.target.value)} id="descriptions" rows="10"></textarea>
                                    { errorsD.description && 
                                        <div className="text-danger mt-2">
                                              {errorsD.description}
                                        </div>
                                   }
                                </div>

                                <button type="submit" className="btn btn-success" >
                                    Kirim Keluhan</button>
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

