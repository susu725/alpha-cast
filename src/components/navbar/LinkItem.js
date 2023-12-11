import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons'
import MgmtModal from '../modals/MgmtModal'
import './LinkItem.scss'

function LinkItem({ playlist, getPlaylists, getPlaylistItems, getPodcasts, getFavorites, setPlaying }) {
    const { id, name, icon } = playlist
    const [isOpen, setIsOpen] = useState(false)
    const params = useParams()

    const handleClose = (e) => {
        setIsOpen(false)
    }

    return (
        <div>
            <div className='link-section' tabIndex='0' style={{ backgroundColor: params.id === id ? '#111111' : '' }}>
                <Link to={`/home/${id}`} className='link'>
                    <p className='icon'>{icon ? icon : '▶️'}</p>
                    <p className='name' style={{ color: params.id === id ? '#FFFFFF' : '' }}>{name}</p>
                </Link>
                <FontAwesomeIcon icon={faEllipsisVertical} className='mgmt-btn' style={{ color: params.id === id ? '#FFFFFF' : '' }} onClick={() => setIsOpen(!isOpen)} />
                {isOpen && (<MgmtModal className='mgmt-modal' playlist={playlist} getPlaylists={getPlaylists} getPlaylistItems={getPlaylistItems} getPodcasts={getPodcasts} getFavorites={getFavorites} setPlaying={setPlaying} />)}
            </div>
            <div className={isOpen ? 'mask-closed' : ''} onClick={handleClose} />
        </div>
    )
}

export default LinkItem