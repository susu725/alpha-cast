import React, { useEffect, useState, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import './Carousel.scss'
import carousel1 from '../../images/carousel1.png'
import carousel2 from '../../images/carousel2.png'
import carousel3 from '../../images/carousel3.png'

const data = [
    { id: 1, img: carousel1, title: '鼓舞人心的故事', subtitle: '從非凡的人生故事和成功經歷中獲得靈感' },
    { id: 2, img: carousel2, title: '輕鬆分類與管理', subtitle: '一目了然的分類，讓收藏的 Podcast 保持整潔' },
    { id: 3, img: carousel3, title: 'Spotify 快速同步', subtitle: '透過 Spotify 登入，即刻同步您的收藏，隨時隨地收聽' }
]

function Carousel() {
    const [num, setNum] = useState(0)
    const ulRef = useRef(null)

    useEffect(() => {
        const timeId = setInterval(() => {
            setNum(num + 1)
            if (num >= 2) {
                setNum(0)
            }
        }, 5000)

        for (let i in data) {
            ulRef.current.children[i].style.setProperty('--right', `${num}00%`)
        }

        return () => clearInterval(timeId)
    }, [num])

    const handleCarousel = e => {
        let id = e.target.id

        if (id) {
            if (id === 'left') {
                if (num > 0) {
                    setNum(num - 1)
                }
            } else {
                if (num < 2) {
                    setNum(num + 1)
                }
            }
        }

        for (let i in data) {
            ulRef.current.children[i].style.setProperty('--right', `${num}00%`)
        }
    }

    return (
        <div className='carousel'>
            <div onClick={handleCarousel}>
                <FontAwesomeIcon icon={faChevronLeft} className='icon' id='left' />
                <FontAwesomeIcon icon={faChevronRight} className='icon' id='right' />
            </div>
            <ul ref={ulRef}>
                {data.map(datum => {
                    return (
                        <li key={datum.id}>
                            <img src={datum.img} alt='carousel' />
                            <div className='summary'>
                                <p className='title'>{datum.title}</p>
                                <p className='subtitle'>{datum.subtitle}</p>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default Carousel