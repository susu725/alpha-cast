import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'
import './Greet.scss'
import avatarPic from '../../images/avatar.png'
import { getUserApi } from '../../api/api'

function Greet() {
    const [user, setUser] = useState({})

    const getUser = async () => {
        const user = await getUserApi()
        setUser(user)
    }

    useEffect(() => {
        getUser()
    }, [])

    return (
        <div className='greet'>
            <div className='title'>
                <p>早安</p>
            </div>
            <div className='user-info'>
                <img src={user.images === undefined ? avatarPic : user.images.length > 0 ? user.images[0].url : avatarPic} alt='user' />
                <p>{user.display_name}</p>
                <FontAwesomeIcon icon={faAngleDown} className='user-btn' />
            </div>
        </div>
    )
}

export default Greet