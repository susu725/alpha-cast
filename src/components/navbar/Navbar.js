import React, { useEffect, useContext, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext'
import LinkItem from './LinkItem'
import InputModal from '../modals/InputModal'
import './Navbar.scss'
import triangle from '../../images/triangle.png'
import rectangle from '../../images/rectangle.png'
import { getPlaylistsApi } from '../../api/api'

function Navbar({ getPlaylistItems, getPodcasts, getFavorites, setPlaying }) {
    const { token, setToken } = useContext(AuthContext)
    const [playlists, setPlaylists] = useState([])
    const [isOpenInput, setIsOpenInput] = useState(false)
    const inputName = useRef()
    const navigate = useNavigate()
    const user_id = localStorage.getItem('user_id')

    // 呼叫 API，取得該使用者所有撥放清單
    const getPlaylists = async () => {
        try {
            if (user_id) {
                const playlists = await getPlaylistsApi(user_id)
                setPlaylists(playlists)
            }

        } catch (err) {
            console.log(err)
        }
    }

    const podcasts = { id: 'podcasts', name: 'Podcast 和節目', icon: '📺' }
    const favorites = { id: 'favorites', name: '已收藏', icon: '❤️' }

    const logout = () => {
        if (token) {
            localStorage.removeItem('token')
            localStorage.removeItem('user_id')
            setToken(null)
            navigate('/login')
        }
    }

    const renderPlaylists = playlists.map(playlist => {
        return (
            <LinkItem key={playlist.id} playlist={playlist} getPlaylists={getPlaylists} getPlaylistItems={getPlaylistItems} setPlaying={setPlaying} />
        )
    })

    useEffect(() => {
        getPlaylists()
    }, [user_id])

    return (
        <div>
            <div className='navbar'>
                <div className='logo'>
                    <img src={triangle} alt='' />
                    <img src={rectangle} alt='' />
                    <p>ALPHA Cast</p>
                </div>
                <div className='links'>
                    {renderPlaylists}
                    <LinkItem key={podcasts.id} playlist={podcasts} getPodcasts={getPodcasts} />
                    <LinkItem key={favorites.id} playlist={favorites} getFavorites={getFavorites} setPlaying={setPlaying} />
                    <button className='add-btn' ref={inputName} onClick={() => setIsOpenInput(true)}>新增分類</button>
                    <button className='add-btn' onClick={logout}>登出</button>
                </div>
                {isOpenInput && (<InputModal inputName={inputName} setIsOpenInput={setIsOpenInput} getPlaylists={getPlaylists} />)}
            </div>
            <div className={isOpenInput ? 'mask' : ''} />
        </div>
    )
}

export default Navbar