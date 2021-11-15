import React from 'react'
import Navigation from '../components/Navigation'

export default function App(props) {
    document.title = props.title
    console.log(props.title);
    return (
        <div>
            <Navigation />
            <main className="mt-4">
                <div className="container">
                    {props.children}
                
                </div>
            </main>
        </div>
    )
}
