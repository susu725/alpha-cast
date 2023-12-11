import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import './InputModal.scss'
import { postPlaylistApi, putPlaylistApi } from '../../api/api'

function InputModal({ inputName, playlist, setIsOpenInput, getPlaylists }) {
    const title = inputName.current.innerText
    const [newName, setNewName] = useState(playlist?.name)
    const user_id = localStorage.getItem('user_id')

    // 判斷title決定呼叫哪支API
    const handlePlaylist = async () => {
        try {
            if (title === '編輯名稱') {
                if (playlist?.id === 'podcasts' || playlist?.id === 'favorites') {
                    window.alert('此清單無法重新命名！')
                } else {
                    await putPlaylistApi(playlist?.id, newName)
                }
            } else {
                await postPlaylistApi(user_id, newName)
            }

            setIsOpenInput(false)
            getPlaylists()
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className='input-modal'>
            <div className='title-section'>
                <p className='title'>{title}</p>
                <FontAwesomeIcon icon={faXmark} className='cross-btn' onClick={() => setIsOpenInput(false)} />
            </div>
            <input type='input' value={newName} onChange={(e) => setNewName(e.target.value)} />
            <div className='btn-section'>
                <button className='cancel-btn' onClick={() => setIsOpenInput(false)}>取消</button>
                <button className='save-btn' onClick={handlePlaylist}>儲存</button>
            </div>
        </div>
    )
}

export default InputModal