import React, { useEffect, useState } from 'react';
import userimage from './imageprofil.jpeg';
import './Profil.css';
import { Container } from '@material-ui/core';
import axiosInstance from '../../axios';
const Id_User = localStorage.getItem('Id_User');

function Profil() {

    const [username, setUsername] = useState('');

    useEffect(() => {
         axiosInstance.get(`auth/users/${Id_User}/`)
         .then((res) => {
            setUsername(res.data.username);
         });
     }, [])

    return (
        <Container>
        <div className="Profil">
            <center>
           <img src={userimage} className="userImage" />
           <p className="userName">{username}</p>
           </center>
        </div>
        </Container>
    )
}

export default Profil