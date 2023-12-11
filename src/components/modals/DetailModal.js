import React from 'react'
import EpisodeList from '../../pages/EpisodeList'
import './DetailModal.scss'

function DetailModal({ podcast, setIsOpen, episodes, setPlaying, getPodcasts }) {
    return (
        <div className='detail-modal'>
            <EpisodeList podcast={podcast} setIsOpen={setIsOpen} episodes={episodes} setPlaying={setPlaying} getPodcasts={getPodcasts} />
        </div>
    )
}

export default DetailModal
