import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import Podcast from '../cards/Podcast'
import Episode from '../cards/Episode'
import './NewModal.scss'
import { searchApi, putPodcastsApi, postEpisodesApi, putFavoritesApi } from '../../api/api'

function NewModal({ setIsOpenNew, playlist, getPlaylistItems, getPodcasts, getFavorites, setPlaying }) {
    const { id } = playlist
    const [keyword, setKeyword] = useState('')
    const [hasResults, setHasResults] = useState(false)
    const [podcasts, setPodcasts] = useState([])
    const [episodes, setEpisodes] = useState([])

    const [newPodcasts, setNewPodcasts] = useState([])
    const [newEpisodes, setNewEpisodes] = useState([])

    const search = async (value) => {
        try {
            if (id === 'podcasts') {
                const podcasts = await searchApi(value, 'show')
                setPodcasts(podcasts.shows.items)
            } else {
                const episodes = await searchApi(value, 'track')
                setEpisodes(episodes.tracks.items)
            }
        } catch (err) {
            console.log(err)
        }
    }

    const putPodcasts = async () => {
        try {
            await putPodcastsApi(newPodcasts)
            getPodcasts()
        } catch (err) {
            console.log(err)
        }
    }

    const postEpisodes = async () => {
        try {
            await postEpisodesApi(id, newEpisodes)
            getPlaylistItems(id)
        } catch (err) {
            console.log(err)
        }
    }

    const putFavorites = async () => {
        try {
            await putFavoritesApi(newEpisodes)
            getFavorites()
        } catch (err) {
            console.log(err)
        }
    }

    const handleAddItem = () => {
        if (id === 'podcasts') {
            putPodcasts()
        } else if (id === 'favorites') {
            putFavorites()
        } else {
            postEpisodes()
        }

        setIsOpenNew(false)
    }

    // 控制初始進入畫面為空白，並於輸入字串後顯示搜尋結果
    const handleSearchInput = (e) => {
        setKeyword(e.target.value)
        setHasResults(true)

        if (e.target.value) {
            search(e.target.value)
        }
    }
    if (!keyword && hasResults !== false) {
        setHasResults(false)
    }

    // 搜尋並map出來
    let searchResults
    if (id === 'podcasts') {
        searchResults = podcasts?.filter(item => {
            return item.name.toLowerCase().includes(keyword) || item.name.toUpperCase().includes(keyword)
        })
    } else {
        searchResults = episodes?.filter(item => {
            return item.name.toLowerCase().includes(keyword) || item.name.toUpperCase().includes(keyword)
        })
    }

    let renderResults
    if (id === 'podcasts') {
        renderResults = searchResults?.map(podcast => {
            return <Podcast key={podcast.id} podcast={podcast} comeFrom='NewModal' newPodcasts={newPodcasts} setNewPodcasts={setNewPodcasts} />
        })
    } else {
        renderResults = searchResults?.map(episode => {
            const { album } = episode
            episode.audio_preview_url = episode.preview_url
            episode.images = album.images
            episode.release_date = album.release_date
            return <Episode key={episode.id} episode={episode} setPlaying={setPlaying} playlist={playlist} comeFrom='NewModal' newEpisodes={newEpisodes} setNewEpisodes={setNewEpisodes} />
        })
    }

    return (
        <div className='new-modal'>
            <div className='search'>
                <div className='title-section'>
                    <p className='title'>{id === 'podcasts' ? '新增 Podcast' : '新增 Track'}</p>
                    <FontAwesomeIcon icon={faXmark} className='cross-btn' onClick={() => setIsOpenNew(false)} />
                </div>
                <div className='input-section'>
                    <FontAwesomeIcon icon={faMagnifyingGlass} className='magnifier' />
                    <input type='input'
                        value={keyword}
                        placeholder=' 開始搜尋 ...'
                        onChange={handleSearchInput} />
                </div>
            </div>
            <div className='podcast-list'>
                {hasResults ?
                    searchResults !== undefined && searchResults.length > 0 ?
                        <div>
                            <p className='have-results'>搜尋結果</p>
                            <div className={id === 'podcasts' ? 'podcasts' : 'episodes'}>
                                {renderResults}
                            </div>
                        </div>
                        : <p className='no-result'>查無結果</p>
                    : <div />
                }
            </div>
            <div className='btn-section'>
                <button className='cancel-btn' onClick={() => setIsOpenNew(false)}>取消</button>
                <button className='new-btn' onClick={handleAddItem}>確認新增</button>
            </div>
        </div>
    )
}

export default NewModal