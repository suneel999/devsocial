import React from 'react'
import { useDispatch } from 'react-redux'
import { removeFeed } from './FeedSlice'
import axios from 'axios'
import BASE_URL from './constants'
const UserCard = ({ user }) => {
    const { firstName, lastName, age, gender } = user;
    const dispatch = useDispatch()
    const handleSendRequest = async (status, userId) => {
        try {
            const res = await axios.post(
                BASE_URL + "/send/" + status + "/" + userId, {},
                { withCredentials: true }
            );
            dispatch(removeFeed(userId));
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div className='flex justify-center'>
            <div className="card bg-base-100 w-96 shadow-sm">
                <figure>
                    <img
                        src={user?.photoUrl}
                        alt="photo_url" />
                </figure>
                <div className="card-body">
                    <h2 className="card-title">{firstName + " " + lastName}</h2>
                    <p>{gender + ", " + age}</p>
                    <p>{user?.about}</p>
                    <div className="card-actions justify-end gap-2">
                        <button className="btn btn-primary" onClick={() => handleSendRequest("ignored", user.id)}>igonre</button>
                        <button className="btn btn-secondary" onClick={() => handleSendRequest("interested", user.id)}>send request</button>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default UserCard