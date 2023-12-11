import React from 'react'
import Carousel from '../components/carousel/Carousel'
import './LoginPage.scss'
import logo from '../images/logo.png'

function LoginPage() {
    const CLIENT_ID = process.env.REACT_APP_CLIENT_ID
    const REDIRECT_URI = 'https://susu725.github.io/alpha-cast'
    const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize'
    const RESPONSE_TYPE = 'token'
    const SCOPE = 'user-read-private user-read-email user-library-read user-library-modify playlist-read-private playlist-read-collaborative playlist-modify-public playlist-modify-private'

    return (
        <div className='login-page'>
            <div className='login'>
                <img src={logo} alt='logo' />
                <p className='title'>Connecting Stories That Matter</p>
                <div className='summary'>
                    <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`}>
                        <button>使用 SPOTIFY 帳號登入</button>
                    </a>
                    <p className='subtitle'>沒有帳號嗎？<span>註冊帳號</span></p>
                </div>
            </div>
            <Carousel />
        </div>
    )
}

export default LoginPage