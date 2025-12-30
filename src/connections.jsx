import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import BASE_URL from "./constants";
import { addConnection } from "./ConnectionSlice";

const Connections = () => {
    const connections = useSelector((store) => store.connection);
    const dispatch = useDispatch();

    const fetchConnections = async () => {
        try {
            const res = await axios.get(
                BASE_URL + "/user/connections",
                { withCredentials: true }
            );
            dispatch(addConnection(res?.data?.data));
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchConnections();
    }, []);

    // ✅ handle empty state FIRST
    if (!connections) {
        return;
    }
    if (connections.length === 0) {
        return <p>No connections</p>;
    }

    return (
        <div className="text-center my-10 w-1/2 mx-auto">
            <h1 className="text-bold text-2xl">Connections</h1>
            {connections.map((conn) => (
                <div className="flex flex-col my-5 border border-gray-200 p-5 rounded-lg" key={conn.id}>
                    <h2 className="text-bold">{conn.firstName + " " + conn.lastName}</h2>

                    <p className="text-bold">{conn.email}</p>
                </div>
            ))}



        </div>
    );
};

export default Connections;
