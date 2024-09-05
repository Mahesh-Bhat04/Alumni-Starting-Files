import React, { useEffect, useState } from 'react'
import {token} from '../config'
import {toast} from 'react-toastify'

const useFetchData = (url) => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchData = async() => {
            setLoading(true)
            try {
                
                const res = await fetch(url, {
                    headers:{Authorization: `Bearer ${token}`
                }})
                const result = await res.json()

                if(!res.ok){
                    throw new error(result.message)
                }
                setData(result.data)
                setLoading(false)
                // toast.success(result.message)
            } catch (error) {
                setLoading(false)
                setError(error.message)
            }
        }
        fetchData()
    }, [url])
  return {
    data,
    loading,
    error
  }
}

export default useFetchData