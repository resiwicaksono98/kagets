import React, { useEffect } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Login from '../views/auth/Login'
import Register from '../views/auth/Register'
import Home from '../views/Home'
import * as Middleware from '../middleware'
import * as News from '../views/news/App'
import * as Complaint from '../views/complaint/App'
import * as Dashboard from '../views/dashboard/App'
import * as Profile from '../views/profile/App'

export default function ReactROuter() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/news" component={News.Index} />
                <Route path="/news/:slug" component={News.Show} />
                <Route path="/login">
                    <Middleware.Guest render={<Login />} />
                </Route>
                <Route path="/register">
                    <Middleware.Guest render={<Register />} />
                </Route>
                <Route path="/profile/:name/upload-profile">
                    <Middleware.Authenticated render={<Profile.Image/>} />
                </Route>
                <Route path="/profile/:name">
                    <Middleware.Authenticated render={<Profile.Index/>} />
                </Route>
                <Route path="/dashboard/:user_id/:slug">
                    <Middleware.Authenticated render={<Dashboard.Show/>}/>
                </Route>
                <Route path="/dashboard/:user_id">
                    <Middleware.Authenticated render={<Dashboard.Index/>}/>
                </Route>
                <Route path="/complaint/:slug/upload-image">
                    <Middleware.Authenticated render={<Complaint.Image/>}/>
                </Route>
                <Route path="/complaint/:slug">
                    <Middleware.Authenticated render={<Complaint.Success/>}/>
                </Route>
                <Route path="/complaint">
                    <Middleware.Authenticated render={<Complaint.Index/>}/>
                </Route>
            </Switch>
        </BrowserRouter>
    )
}
