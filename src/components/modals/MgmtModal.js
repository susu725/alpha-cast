import React, { useState, useRef } from 'react'
import InputModal from '../modals/InputModal'
import DeleteModal from '../modals/DeleteModal'
import NewModal from '../modals/NewModal'
import './MgmtModal.scss'

function MgmtModal({ playlist, getPlaylists, getPlaylistItems, getPodcasts, getFavorites, setPlaying }) {
    const [fontColor, setFontColor] = useState([])
    const [isOpenInput, setIsOpenInput] = useState(false)
    const [isOpenDelete, setIsOpenDelete] = useState(false)
    const [isOpenNew, setIsOpenNew] = useState(false)

    const inputName = useRef()

    // 字體顏色變換 + 控制 Modal 開關
    const handleColor = (id) => {
        let fontColor = []

        for (let i = 1; i <= 3; i++) {
            id === i ? fontColor.push('font-color') : fontColor.push('')
        }
        setFontColor(fontColor)

        if (id === 1) {
            setIsOpenInput(true)
        } else if (id === 2) {
            setIsOpenDelete(true)
        } else {
            setIsOpenNew(true)
        }
    }

    // 阻止事件往上傳遞
    const stopEvent = (e) => {
        e.stopPropagation()
    }

    return (
        <div>
            <ul className='mgmt-modal' onClick={stopEvent}>
                <li onClick={() => handleColor(1)} className={fontColor[0]} ref={inputName}>編輯名稱</li>
                <li onClick={() => handleColor(2)} className={fontColor[1]}>刪除分類</li>
                {/* <li onClick={() => handleColor(3)} className={fontColor[2]}>新增 Podcast</li> */}
                <li onClick={() => handleColor(3)} className={fontColor[2]}>{playlist.id === 'podcasts' ? '新增 Podcast' : '新增 Track'}</li>
            </ul>
            {isOpenInput && (<InputModal inputName={inputName} playlist={playlist} setIsOpenInput={setIsOpenInput} getPlaylists={getPlaylists} />)}
            {isOpenDelete && (<DeleteModal playlist={playlist} setIsOpenDelete={setIsOpenDelete} getPlaylists={getPlaylists} />)}
            {isOpenNew && (<NewModal setIsOpenNew={setIsOpenNew} playlist={playlist} getPlaylistItems={getPlaylistItems} getPodcasts={getPodcasts} getFavorites={getFavorites} setPlaying={setPlaying} />)}

            <div className={isOpenInput ? 'mask' : ''} onClick={stopEvent} />
            <div className={isOpenDelete ? 'mask' : ''} onClick={stopEvent} />
            <div className={isOpenNew ? 'mask' : ''} onClick={stopEvent} />
        </div>
    )
}

export default MgmtModal
