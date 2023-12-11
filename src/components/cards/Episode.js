import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretRight } from '@fortawesome/free-solid-svg-icons'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import './Episode.scss'

function Episode({ episode, setPlaying, playlist, comeFrom, newEpisodes, setNewEpisodes }) {
    const { id, name, description, release_date, duration_ms, images, audio_preview_url, uri } = episode
    const [clickCss, setClickCss] = useState('episode')
    const [isClicked, setIsClicked] = useState(false)

    // API 資料格式問題，採用此方式
    const publisher = episode.artists ? episode.artists[0].name : episode.podcastName
    const handlePlay = e => {
        if (audio_preview_url) {
            setPlaying({ id, name, description, release_date, images, audio_preview_url, publisher, playTimeTWFormat, playTimeSecondsFormat })
        } else {
            setPlaying({})
        }

        e.stopPropagation()
    }

    dayjs.extend(duration)
    const playTimeTWFormat = dayjs.duration(duration_ms, 'milliseconds').format(' mm 分 ss 秒')
    const playTimeSecondsFormat = duration_ms / 1000

    // 批量新增
    const handleCss = () => {
        if (isClicked === false) {
            setClickCss('episode click')
            setIsClicked(true)

            if (playlist.id === 'favorites') {
                setNewEpisodes([...newEpisodes, id])
            } else {
                setNewEpisodes([...newEpisodes, uri])
            }
        } else if (isClicked === true) {
            setClickCss('episode')
            setIsClicked(false)

            if (playlist.id === 'favorites') {
                newEpisodes.map((newEpisode, idx) => {
                    if (newEpisode === id) {
                        newEpisodes.splice(idx, 1)
                    }
                    return newEpisodes
                })
            } else {
                newEpisodes.map((newEpisode, idx) => {
                    if (newEpisode === uri) {
                        newEpisodes.splice(idx, 1)
                    }
                    return newEpisodes
                })
            }
        }
    }

    return (
        <div className={clickCss} onClick={comeFrom ? handleCss : null}>
            <img src={images[1].url} alt='episode' />
            <div className='episode-summary'>
                <div className='title-section'>
                    <p className='name'>{name}</p>
                </div>
                <p className='description'>{description ? description : publisher}</p>
                <div className='timestamp'>
                    <div onClick={handlePlay}>
                        <FontAwesomeIcon icon={faCaretRight} className='play' />
                    </div>
                    <p>{release_date ? release_date : '0000-00-00'}・{playTimeTWFormat}</p>
                </div>
            </div>
        </div>
    )
}

export default Episode