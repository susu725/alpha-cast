import React, { useEffect, useState, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretRight, faPause } from '@fortawesome/free-solid-svg-icons'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import './Playing.scss'

function Playing(props) {
    const { id, name, description, release_date, images, audio_preview_url, publisher, playTimeTWFormat, playTimeSecondsFormat } = props?.playing

    // 前一首單輯的 id
    const prevId = useRef(id)
    const audioRef = useRef(null)

    let currentTime = 0
    let durationTime = 0
    let progressPercent = 0

    const [isPlaying, setIsPlaying] = useState(true)
    const [time, setTime] = useState(0)
    const [bar, setBar] = useState({
        width: progressPercent * 92,
        height: '4px',
        borderRadius: '10px',
        backgroundColor: '#FF7F50'
    })

    if (audioRef.current !== null) {
        currentTime = audioRef.current?.currentTime
        durationTime = audioRef.current?.duration
        progressPercent = currentTime / durationTime
    }

    // 若計時器時間大於、等於單輯撥放時間，則歸零計時器並撥放
    const handlePlay = () => {
        if (time >= playTimeSecondsFormat) {
            setTime(0)
        }
        setIsPlaying(true)
    }

    const handlePause = () => {
        setIsPlaying(false)
    }

    const finishedPlaying = () => {
        setIsPlaying(false)
        currentTime = 0
        durationTime = 0
        progressPercent = 0
    }

    const handleProgressBar = event => {
        let clickLocation = event.nativeEvent.offsetX + 1
        currentTime = clickLocation * durationTime / 92
        audioRef.current.currentTime = currentTime
        progressPercent = currentTime / durationTime
        setIsPlaying(true)
        setBar({ ...bar, width: progressPercent * 92 })
    }

    dayjs.extend(duration)
    //  原應顯示 format 後的曲目長度，但因目前只有預覽音檔(且其長度不一)，只好另外計算
    // const playTime = dayjs.duration(duration_ms, 'milliseconds').format('HH:mm:ss')
    const playTime = dayjs.duration(audioRef.current?.duration, 'seconds').format('HH:mm:ss')

    useEffect(() => {
        // 該一單輯與上一單輯不同時，計時器歸零並開始撥放
        if (prevId.current !== id) {
            setTime(0)
            setIsPlaying(true)
            prevId.current = id
        }

        // 若 audio 存在，則判斷現在是否為撥放狀態
        audioRef.current === null
            ? console.log('Audio component is not loaded yet.')
            : isPlaying
                ? audioRef.current.play()
                : audioRef.current.pause()

        setBar({ ...bar, width: progressPercent * 92 })
        // 若現在為撥放狀態且計時器時間小於單輯撥放時間，則計時；若計時器時間大於等於單輯撥放時間，則暫停撥放
        if (isPlaying === true && time < playTimeSecondsFormat) {
            const timeId = setInterval(() => {
                setTime(time + 1)
            }, 1000)
            return () => clearInterval(timeId)
        } else if (time >= playTimeSecondsFormat) {
            setIsPlaying(false)
        }
    }, [isPlaying, time, playTimeSecondsFormat])

    return (
        <div className='playing'>
            {name ?
                <div className='playing-info'>
                    <p className='txt'>正在播放</p>
                    <div>
                        <div className='podcast-info'>
                            <div className='main-info'>
                                <div className='title-section'>
                                    <img src={images[0].url} alt='episode' />
                                    <p className='title'>{name}</p>
                                </div>
                                <div className='subtitle-section'>
                                    <p className='author'>{publisher}</p>
                                </div>
                            </div>
                            <p className='timestamp'>{release_date ? release_date : '0000-00-00'}・{playTimeTWFormat}</p>
                            <p className='description'>{description}</p>
                        </div>

                        <div className='progress-bar'>
                            {isPlaying ?
                                <div className='btn-section' onClick={handlePause}>
                                    <FontAwesomeIcon icon={faPause} className='pause-btn' />
                                </div>
                                :
                                <div className='btn-section' onClick={handlePlay}>
                                    <FontAwesomeIcon icon={faCaretRight} className='play-btn' />
                                </div>
                            }
                            <p>
                                <span className='current'>{dayjs.duration(currentTime, 'seconds').format('HH:mm:ss')} </span>
                                /
                                <span className='finished'> {playTime === 'NaN:NaN:NaN' ? '00:00:00' : playTime}</span>
                            </p>
                            <div className='bar-section' onClick={handleProgressBar}>
                                <div style={bar}></div>
                            </div>
                        </div>

                        <audio ref={audioRef} src={audio_preview_url} onEnded={finishedPlaying} />
                    </div>
                </div>
                :
                <div />
            }
        </div>
    )
}

export default Playing