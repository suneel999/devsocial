import React, { useEffect } from 'react'
import axios from 'axios'
import BASE_URL from './constants'
import { useDispatch } from 'react-redux'
import { setFeed } from './FeedSlice'
import { useSelector } from 'react-redux'
import UserCard from './userCard'
const Feed = () => {
  const dispatch = useDispatch()
  const feed = useSelector((store) => store.feed)
  const getfeed = async () => {
    if (feed) {
      return
    }
    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      })

      dispatch(setFeed(res?.data?.data))
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getfeed()
  }, [])

  if (!feed) return;

  if (feed.length <= 0) return <h1 className='flex justify-center my-10'>No new users founds!</h1>

  return (
    feed && (
      <div className='flex justify-center my-10'>
        <UserCard user={feed[0]}></UserCard>
      </div>
    )
  )
}

export default Feed