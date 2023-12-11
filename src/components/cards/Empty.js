import React from 'react'
import './Empty.scss'
import empty from '../../images/empty.png'

function Empty() {
    return (
        <div>
            <div className='empty'>
                <img src={empty} alt='' />
                <p>快去 Spotify 為你的播放清單找些內容吧！</p>
            </div>
        </div>
    )
}

export default Empty