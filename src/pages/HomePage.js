import React, { useEffect, useContext, useState, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext'
import Navbar from '../components/navbar/Navbar'
import Greet from '../components/cards/Greet'
import PodcastList from './PodcastList'
import Episode from '../components/cards/Episode'
import Empty from '../components/cards/Empty'
import Playing from '../components/cards/Playing'
import './HomePage.scss'
import { getPlaylistItemsApi, getPodcastsApi, getFavoritesApi } from '../api/api'

function HomePage() {
    const { token, setToken } = useContext(AuthContext)
    const [episodes, setEpisodes] = useState([])
    const [podcasts, setPodcasts] = useState([])

    // 在按下撥放按鈕時，將資料傳進 playing card
    const [playing, setPlaying] = useState({})

    const params = useParams()
    const navigate = useNavigate()

    const test = useRef(null)

    // 一般播放清單
    const getPlaylistItems = async () => {
        try {
            const episodes = await getPlaylistItemsApi(params.id, 100, 0)
            if (episodes === 401) {
                logout()
            } else {
                setEpisodes(episodes)
            }
        } catch (err) {
            console.log(err)
        }
    }

    // podcast 播放清單
    const getPodcasts = async () => {
        try {
            const podcasts = await getPodcastsApi()
            if (podcasts === 401) {
                logout()
            } else {
                setPodcasts(podcasts)
            }
        } catch (err) {
            console.log(err)
        }
    }

    // Favorite 播放清單
    const getFavorites = async () => {
        try {
            const favorites = await getFavoritesApi()
            if (favorites === 401) {
                logout()
            } else {
                setEpisodes(favorites)
            }
        } catch (err) {
            console.log(err)
        }
    }

    const logout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('user_id')
        setToken(null)
        navigate('/login')
    }

    const renderEpisodes = episodes.map(item => {
        const { track } = item
        const { album } = track
        const episode = track
        episode.images = album.images
        episode.release_date = album.release_date
        episode.audio_preview_url = track.preview_url
        return <Episode key={episode.id} episode={episode} playing={playing} setPlaying={setPlaying} />
    })

    useEffect(() => {
        if (!token) {
            logout()
        }

        if (params.id === 'podcasts') {
            getPodcasts()
        } else if (params.id === 'favorites') {
            getFavorites()
        } else {
            getPlaylistItems()
        }
    }, [params])

    return (
        <div className='home-page'>
            <Navbar getPlaylistItems={getPlaylistItems} getPodcasts={getPodcasts} getFavorites={getFavorites} setPlaying={setPlaying} />
            <div className='container' ref={test}>
                <Greet />
                <div className='main'>
                    {
                        params.id === 'podcasts' ?
                            podcasts.length > 0 ? <PodcastList podcasts={podcasts} setPlaying={setPlaying} getPodcasts={getPodcasts} /> : <Empty />
                            :
                            episodes.length > 0 ? <div className='episodes'>{renderEpisodes}</div> : <Empty />
                    }
                    <Playing playing={playing} />
                </div>
            </div>
        </div>
    )
}

export default HomePage