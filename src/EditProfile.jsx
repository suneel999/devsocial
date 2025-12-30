import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import BASE_URL from './constants'
import UserCard from './userCard'
import axios from 'axios'
import { addUser } from './UserSlice'

const EditProfile = ({ user }) => {
    const [firstName, setFirstName] = useState(user?.firstName || "");
    const [lastName, setLastName] = useState(user?.lastName || "");
    const [age, setAge] = useState(user?.age || "");
    const [gender, setGender] = useState(user?.gender || "");
    const [about, setAbout] = useState(user?.about || "");
    const [photoUrl, setPhotoUrl] = useState(user?.photoUrl || "");
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const saveprofile = async () => {
        try {
            const res = await axios.patch(BASE_URL + "/profile/edit", { firstName, lastName, age, gender, about, photoUrl }, { withCredentials: true });
            console.log(res); // Debug log (optional)

            // Refetch current user to ensure state is synced
            const userRes = await axios.get(BASE_URL + "/profile/view", { withCredentials: true });

            dispatch(addUser(userRes.data));
            return navigate("/");
        } catch (err) {
            console.log(err);
            setError(err?.response?.data || "Update failed");
        }
    }


    return (
        <div className='flex justify-center my-10 gap-10'>
            <div className='flex justify-center mx-10'>
                <div className="card bg-base-100 w-96 shadow-sm ">
                    <div className="card-body items-center text-center">
                        <h2 className="card-title mx-20">Edit Profile</h2>
                        <div>
                            <fieldset className="fieldset mx-5">
                                <legend className="fieldset-legend">First Name</legend>
                                <input type="text" value={firstName} className="input" placeholder="Type here"
                                    onChange={(e) => { setFirstName(e.target.value) }} />
                            </fieldset>
                            <fieldset className="fieldset mx-5 ">
                                <legend className="fieldset-legend">Last Name</legend>
                                <input type="text" value={lastName} className="input" placeholder="Type here"
                                    onChange={(e) => { setLastName(e.target.value) }} />
                            </fieldset>
                            <fieldset className="fieldset mx-5 ">
                                <legend className="fieldset-legend">Age</legend>
                                <input type="text" value={age} className="input" placeholder="Type here"
                                    onChange={(e) => { setAge(e.target.value) }} />
                            </fieldset>
                            <fieldset className="fieldset mx-5 ">
                                <legend className="fieldset-legend">Gender</legend>
                                <input type="text" value={gender} className="input" placeholder="Type here"
                                    onChange={(e) => { setGender(e.target.value) }} />
                            </fieldset>
                            <fieldset className="fieldset mx-5 ">
                                <legend className="fieldset-legend">Photo URL</legend>
                                <input type="text" value={photoUrl} className="input" placeholder="Type here"
                                    onChange={(e) => { setPhotoUrl(e.target.value) }} />
                            </fieldset>
                            <fieldset className="fieldset mx-5 ">
                                <legend className="fieldset-legend">About</legend>
                                <input type="text" value={about} className="input" placeholder="Type here"
                                    onChange={(e) => { setAbout(e.target.value) }} />
                            </fieldset>
                        </div>
                        {error && <p className='text-red-500'> Error: {error}</p>}
                        <div className="card-actions">
                            <button className="btn btn-primary " onClick={saveprofile} >Update</button>
                        </div>
                    </div>
                </div>
            </div>
            <UserCard user={{ firstName, lastName, age, gender, about, photoUrl }} />
        </div>
    )
}

export default EditProfile