import axios from 'axios'
const baseURL = 'https://api.spotify.com/v1'

// 新增一個 instance
const axiosInstance = axios.create({
    baseURL: baseURL,
})

// 在axiosInstance 使用 interceptors 方法
axiosInstance.interceptors.request.use(config => {
    const token = localStorage.getItem('token')
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
},
    error => {
        console.error(error)
    }
)

// 取得使用者資料
export const getUserApi = async () => {
    try {
        const { data } = await axiosInstance.get(`${baseURL}/me`)
        return data
    } catch (err) {
        console.log(err)
        return err.response.data.error.status
    }
}

// 取得使用者的所有播放清單
export const getPlaylistsApi = async (user_id) => {
    try {
        const { data } = await axiosInstance.get(`${baseURL}/users/${user_id}/playlists`)
        return data.items
    } catch (err) {
        console.log(err)
        return err.response.data.error.status
    }
}

// 新增清單
export const postPlaylistApi = async (user_id, newName) => {
    try {
        const { data } = await axiosInstance.post(`${baseURL}/users/${user_id}/playlists`, { name: newName })
        return data.items
    } catch (err) {
        console.log(err)
        return err.response.data.error.status
    }
}

// 刪除清單
export const deletePlaylistApi = async (playlist_id) => {
    try {
        const { data } = await axiosInstance.delete(`${baseURL}/playlists/${playlist_id}/followers`)
        return data.items
    } catch (err) {
        console.log(err)
        return err.response.data.error.status
    }
}

// 修改清單
export const putPlaylistApi = async (playlist_id, newName) => {
    try {
        const { data } = await axiosInstance.put(`${baseURL}/playlists/${playlist_id}`, { name: newName })
        return data.items
    } catch (err) {
        console.log(err)
        return err.response.data.error.status
    }
}

// 取得使用者追蹤的所有 Podcasts
export const getPodcastsApi = async () => {
    try {
        const { data } = await axiosInstance.get(`${baseURL}/me/shows`)
        return data.items
    } catch (err) {
        console.log(err)
        return err.response.data.error.status
    }
}

// 追蹤 Podcasts
export const putPodcastsApi = async (id) => {
    try {
        const { data } = await axiosInstance.put(`${baseURL}/me/shows?ids=${id}`)
        return data.items
    } catch (err) {
        console.log(err)
        return err.response.data.error.status
    }
}

// 取消追蹤 Podcast
export const deletePodcastApi = async (id) => {
    try {
        const { data } = await axiosInstance.delete(`${baseURL}/me/shows?ids=${id}`)
        return data.items
    } catch (err) {
        console.log(err)
        return err.response.data.error.status
    }
}

// 取得 Podcast 的所有單輯
export const getEpisodesApi = async (id) => {
    try {
        const { data } = await axiosInstance.get(`${baseURL}/shows/${id}/episodes`)
        return data.items
    } catch (err) {
        console.log(err)
        return err.response.data.error.status
    }
}

// 取得清單內所有 Episodes
export const getPlaylistItemsApi = async (playlist_id, limit, offset) => {
    try {
        const { data } = await axiosInstance.get(`${baseURL}/playlists/${playlist_id}/tracks?limit=${limit}&offset=${offset}`)
        return data.items
    } catch (err) {
        console.log(err)
        return err.response.data.error.status
    }
}

// 新增 Episodes
export const postEpisodesApi = async (playlist_id, uris) => {
    try {
        const { data } = await axiosInstance.post(`${baseURL}/playlists/${playlist_id}/tracks`, { uris })
        return data.items
    } catch (err) {
        console.log(err)
        return err.response.data.error.status
    }
}

// 取得使用者收藏的所有 Episodes
export const getFavoritesApi = async () => {
    try {
        const { data } = await axiosInstance.get(`${baseURL}/me/tracks`)
        return data.items
    } catch (err) {
        console.log(err)
        return err.response.data.error.status
    }
}

// 新增收藏的 Episodes
export const putFavoritesApi = async (ids) => {
    try {
        const { data } = await axiosInstance.put(`${baseURL}/me/tracks`, { ids })
        return data.items
    } catch (err) {
        console.log(err)
        return err.response.data.error.status
    }
}

// 搜尋 Podcast & Track
export const searchApi = async (value, type) => {
    try {
        const { data } = await axiosInstance.get(`${baseURL}/search`, { params: { q: value, type } })
        return data
    } catch (err) {
        console.log(err)
        return err.response.data.error.status
    }
}