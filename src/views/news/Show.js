import React, { useEffect, useState } from 'react'
import App from '../../layouts/App'
import axios from 'axios'
import { useParams } from 'react-router'

export default function Show() {
    const { slug } = useParams()
    const [news, setNews] = useState([])
    const [categories, setCategories] = useState([])
    const [state, setState] = useState({});

    const getCategory = async () => {
        let { data } = await axios.get(`api/news/${slug}`)
        setCategories(data.data.category);

    }

    useEffect(() => {
        const getNews = async () => {
            let { data } = await axios.get(`api/news/${slug}`)
            setNews(data.data)
        }

        getNews()
        getCategory()
        return () => {
            setState({}); // This worked for me
        };
    }, [])


    return (
        <App title="Kagets App" className="container">
            <div className="mb-5">
                <h1>{news.title}</h1>
                <span className="text-secondary">
                    {categories.map((category, index) =>
                        category.name 
                    ).reduce((prev, curr) => {
                        return prev === null ? [curr] : [prev, ', ', curr]
                    }, null)} / {news.date}
                </span>
                <hr />
            </div>
            <div className="row">
                <div className="col-md-12 rounded mx-auto d-block text-center mb-5 ">
                    <img src={'http://backend-kagets.test/' + news.picture_path} alt="" />
                </div>
                <div className="container">
                    <h3 className="mb-4">Description</h3>
                    <p><strong>{news.description}</strong></p>
                   
                </div>
            </div>
        </App>
    )
}
