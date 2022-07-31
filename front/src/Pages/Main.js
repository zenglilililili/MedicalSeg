import React from 'react'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Login from './Login'
import Register from './Register'
import Contact from './Contact'
import PatList from './PatList'
import Home from './Home'
import CTList from './CTList'
import Slicelist from './Slicelist'
import Delineate from './Delineate'
import history from '../utils/history'

function Main() {
    return (
        <Router>
            <Routes history={history}>
                <Route path="/login/" exact element={<Login/>}/>
                <Route path="/register/" exact element={<Register/>}/>
                <Route path="/contact/" exact element={<Contact/>}/>
                <Route path="/patList/" exact element={<PatList/>}/>
                <Route path="/home/" exact element={<Home/>}/>
                <Route path="/ctlist/" exact element={<CTList/>}/>
                <Route path="/slicelist/" exact element={<Slicelist/>}/>
                <Route path="/delineate/" exact element={<Delineate/>}/>

            </Routes>
        </Router>
    )
}

export default Main