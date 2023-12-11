import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import './DeleteModal.scss'
import { deletePlaylistApi } from '../../api/api'

function DeleteModal({ playlist, setIsOpenDelete, getPlaylists }) {
    const { id, name, icon } = playlist

    const deletePlaylist = async () => {
        try {
            if (id === 'podcasts' || id === 'favorites') {
                window.alert('此清單無法刪除！')
            } else {
                await deletePlaylistApi(id)
                getPlaylists()
            }
            setIsOpenDelete(false)
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className='delete-modal'>
            <div className='title-section'>
                <p className='title'>刪除分類</p>
                <FontAwesomeIcon icon={faXmark} className='cross-btn' onClick={() => setIsOpenDelete(false)} />
            </div>
            <p className='sub-title'>您確定要繼續刪除 <span>{icon}</span><span>{name}</span> 分類嗎？</p>
            <div className='btn-section'>
                <button className='cancel-btn' onClick={() => setIsOpenDelete(false)}>取消</button>
                <button className='delete-btn' onClick={deletePlaylist}>刪除</button>
            </div>
        </div>
    )
}

export default DeleteModal
