import React, { useState } from 'react'
import DetailModal from '../modals/DetailModal'
import './Podcast.scss'
import { getEpisodesApi } from '../../api/api'

function Podcast({ podcast, setPlaying, comeFrom, newPodcasts, setNewPodcasts, getPodcasts }) {
    const { id, name, publisher, images } = podcast
    const [episodes, setEpisodes] = useState([])
    const [isOpen, setIsOpen] = useState(false)
    const [clickCss, setClickCss] = useState('podcast')
    const [isClicked, setIsClicked] = useState(false)

    // 根據 podcast 的 id 取得該 podcast 中所有 episodes
    const getEpisodes = async () => {
        try {
            const episodes = await getEpisodesApi(id)
            setEpisodes(episodes)
            setIsOpen(true)
        } catch (err) {
            console.log(err)
        }
    }

    // 批量新增
    const handleCss = () => {
        if (isClicked === false) {
            setClickCss('podcast click')
            setIsClicked(true)
            setNewPodcasts([...newPodcasts, id])
        } else if (isClicked === true) {
            setClickCss('podcast')
            setIsClicked(false)

            newPodcasts.map((newPodcast, idx) => {
                if (newPodcast === id) {
                    newPodcasts.splice(idx, 1)
                }

                return newPodcasts
            })
        }
    }

    return (
        <div>
            <div className={clickCss} onClick={comeFrom ? handleCss : null}>
                <div className='cover'>
                    <img src={images[1].url} alt='podcast' />
                </div>
                <div className='summary'>
                    <p className='name'>{name}</p>
                    <p className='author'>{publisher}</p>
                    <button className='more-btn' onClick={getEpisodes}>更多</button>
                </div>
            </div>
            {isOpen && (<DetailModal className='detail-modal' podcast={podcast} setIsOpen={setIsOpen} episodes={episodes} setPlaying={setPlaying} getPodcasts={getPodcasts} />)}
            <div className={isOpen ? 'mask' : ''} />
        </div>
    )
}

export default Podcast