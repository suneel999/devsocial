import axios from "axios";
import BASE_URL from "./constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequest, removeRequest } from "./RequestSlice";
import { useEffect } from "react";

const Requests = () => {
    const dispatch = useDispatch();
    const requests = useSelector((store) => store.requests);

    const reviewRequest = async (status, id) => {
        try {
            const res = await axios.post(BASE_URL + "/request/review/" + status + "/" + id, {}, { withCredentials: true });
            dispatch(removeRequest(id));
        } catch (err) {
            console.error(err);
        }
    }

    const fetchRequests = async () => {
        try {
            const res = await axios.get(
                BASE_URL + "/user/connections/received",
                { withCredentials: true }
            );
            dispatch(addRequest(res?.data?.data));
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchRequests();
    }, []);

    if (!requests) {
        return;
    }
    if (requests.length === 0) {
        return <p className="text-center my-10 text-xl font-bold">No requests</p>;
    }

    return (
        <div className="text-center my-10 w-1/2 mx-auto">
            <h1 className="text-bold text-2xl">Requests</h1>
            {requests.map((req) => (
                <div className="flex flex-col my-5 border border-gray-200 p-5 rounded-lg" key={req.requestId}>
                    <h2 className="text-bold">{req.firstName + " " + req.lastName}</h2>
                    <p className="text-bold">{req.email}</p>
                    <div className="flex justify-center gap-2 mt-4">
                        <button className="btn btn-primary" onClick={() => reviewRequest("accepted", req.requestId)}>Accept</button>
                        <button className="btn btn-secondary" onClick={() => reviewRequest("rejected", req.requestId)}>Reject</button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Requests;