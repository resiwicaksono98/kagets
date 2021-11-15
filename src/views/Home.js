import App from '../layouts/App'
import { HomeBg } from '../assets/App'
import './home.scss'
import { NavLink } from 'react-router-dom'

export default function Home(props) {


    return (
        <App title="Kagets App" className="container">
            <div className="row">
                <div className="col-md-5">
                    <div className=" card text-home text-dark">
                        <div className="title py-2 ">
                            <h2 >Akun Gojek Drivermu Bermasalah?</h2>
                        </div>
                      <div className="text-secondary content mt-3 text-center">
                            Memberikan solusi dari masalah yang dihadapi driver gojek tangerang dalam waktu 3 hari
                      </div>
                      <NavLink to="/complaint"  className="btn btn-success btn-keluhan rounded-pill ">
                          Coba Sekarang
                      </NavLink>
                    </div>
                </div>
                <div className="col-md-7">
                    <img src={HomeBg} alt="homeBg" className="img-fluid  shadow" />
                </div>
            </div>

        </App>
    )
}
