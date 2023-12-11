import React, { useEffect, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext'
import HomePage from './HomePage'
import './MainPage.scss'
import { getUserApi } from '../api/api'

function MainPage() {
    const { token, setToken } = useContext(AuthContext)
    const params = useParams()
    const navigate = useNavigate()

    const getUser = async () => {
        const user = await getUserApi()
        localStorage.setItem('user_id', user.id)
    }

    useEffect(() => {
        const hash = window.location.hash
        let token = localStorage.getItem('token')

        if (!token && hash) {
            token = hash.substring(1).split('&').find(elem => elem.startsWith('access_token')).split('=')[1]

            window.location.hash = ''
            localStorage.setItem('token', token)

            getUser()
        }

        setToken(token)

        if (token && params.id === undefined) {
            navigate('/home/podcasts')
        } else if (!token) {
            navigate('/login')
        }

    }, [token])

    return (
        <div>
            {token ? <HomePage /> : <></>}
        </div>
    )
}

export default MainPage