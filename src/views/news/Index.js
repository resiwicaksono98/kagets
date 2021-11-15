import React, { useEffect, useState } from 'react'
import App from '../../layouts/App'
import axios from 'axios'
import './news.scss'

export default function Index() {
    const [news, setNews] = useState([])
    const [links, setLinks] = useState([])
    const [url, setUrl] = useState('api/news/')
    const [categories, setCategories] = useState([])

    useEffect(() => {
        let isMounted = true
        const getNews = async () => {
            let { data } = await axios.get(url)
            if (isMounted) {
                setNews(data.data);
                setLinks(data.meta.links)
                setCategories(data.data)
            }
        }

        getNews()

        return () => { isMounted = false }
    }, [url])

    return (
        <App title="Kagets App" className="container">
            <h2>Semua Berita</h2>
            <hr className="p-1 bg-secondary rounded" />
            <div className="row">
                {news.map((newst, index) => (
                    <div className="col-md-4 py-3 rounded" key={index}>
                        <a href={`news/${newst.slug}`} className="text-decoration-none">
                            <div className="card mb-4 borded border-0" >
                                <img src={'http://backend-kagets.test/' + newst.picture_path} alt={newst.title} className="card-img-top bg-white border border-bottom-2 rounded shadow" height="260px" />
                                <div className="card-body card-bottom rounded ">
                                    <h5 className="text-decoration-none">
                                        {newst.title}
                                    </h5>
                                    <div className=" d-flex justify-content-between py-2 mt-2">
                                        <span className="text-dark">
                                            {newst.date}
                                        </span>
                                        <span className="text-dark">
                                            Rate : <i class="fas fa-star">{newst.rate}</i>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </a>

                    </div>
                ))}

                <nav aria-label="Page navigation example">
                    <ul className="pagination">
                        {links.length > 0 && links.map((link, index) => (
                            <li className={`page-item ${link.active && 'active'}`} key={index}>
                                <button className="page-link" onClick={() => setUrl(link.url)} dangerouslySetInnerHTML={{ __html: link.label }} />
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </App>
    )
}
