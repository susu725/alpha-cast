import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import Episode from '../components/cards/Episode'
import './EpisodeList.scss'
import { deletePodcastApi } from '../api/api'

function EpisodeList({ podcast, setIsOpen, episodes, setPlaying, getPodcasts }) {
    const { id, name, publisher, description, images } = podcast
    const deletePodcast = async () => {
        try {
            await deletePodcastApi(id)
            setIsOpen(false)
            getPodcasts()
        } catch (err) {
            console.log(err)
        }
    }

    const renderEpisodes = episodes.map(episode => {
        episode.podcastName = name
        return <Episode key={episode.id} episode={episode} setPlaying={setPlaying} />
    })

    return (
        <div className='episode-list' key={id}>
            <div className='podcast-info'>
                <img src={images[1].url} alt='podcast' />
                <div className='summary'>
                    <div>
                        <p className='name'>{name}</p>
                        <FontAwesomeIcon icon={faXmark} className='cross-btn' onClick={() => setIsOpen(false)} />
                    </div>
                    <p className='author'>{publisher}</p>
                    <p className='description'>{description}</p>
                    <button className='del-btn' onClick={deletePodcast}>刪除</button>
                </div>
            </div>
            <div className='episodes'>
                {renderEpisodes}
            </div>
            <div className='footer' />
        </div >
    )
}

export default EpisodeList