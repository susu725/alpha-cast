import React from 'react'
import Podcast from '../components/cards/Podcast'
import './PodcastList.scss'

function PodcastList({ podcasts, setPlaying, getPodcasts }) {
    const renderPodcasts = podcasts.map(item => {
        const podcast = item.show
        return <Podcast key={podcast.id} podcast={podcast} setPlaying={setPlaying} getPodcasts={getPodcasts} />
    })

    return (
        <div className='podcast-list'>
            {renderPodcasts}
        </div>
    )
}

export default PodcastList