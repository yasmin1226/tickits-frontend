import React, { useState, useEffect } from 'react';
import axios from 'axios'
const Tickets = (props) => {
    console.log("tikets pro", props.history)
    const [stateTickets, setStateTickets] = useState([])
    useEffect(() => {
        async function fetchData() {
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
                    'authorization': `Bearer ${token}`

                }
            };
            const role = localStorage.getItem("role")
            console.log("token", token);
            if (role === 'customer') {

                try {

                    const { data } = await axios.get("http://localhost:4000/api/ticket/myTickets", config)
                    console.log("Mytickets", data.data.tickets)
                    // const tikets=
                    //clone
                    let state = [...stateTickets];

                    //edit
                    setStateTickets(state = data.data.tickets)

                    setStateTickets(state);
                } catch (err) {
                    console.log(err);
                }

            } else {
                try {
                    const { data } = await axios.get("http://localhost:4000/api/ticket/", config)
                    console.log("tickets", data.data)

                } catch (err) {
                    console.log(err)
                }

            }
            // console.log(id)
        }
        fetchData();
    }, []);//

    const deleteTicket = async (id) => {


        const token = localStorage.getItem('token');

        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
                'authorization': `Bearer ${token}`

            }
        };


        try {
            await axios.delete(`http://localhost:4000/api/ticket/${id}`, config);
        } catch (err) {
            console.log(err)
        }
    }



    return (
        <>
            <h1>Tickets</h1>
            <button className="btn btn-primary mb-4"
                onClick={() => window.location.href = '/add-edit-ticket'}>Add</button>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">ID</th>

                        <th scope="col">Title</th>
                        <th scope="col">Status</th>
                        <th scope="col">Last updated</th>
                        <th scope="col">Update</th>
                        <th scope="col">Delete</th>




                    </tr>
                </thead>
                <tbody>
                    {stateTickets.length && stateTickets.map((ticket) =>
                        <tr key={ticket._id}>
                            <td scope="col">{ticket._id}</td>
                            <td scope="col">{ticket.title}</td>
                            <td scope="col">{ticket.status}</td>
                            <td scope="col">{ticket.updatedAt}</td>
                            <td scope="col">
                                <input type="button" className="btn btn-primary" value="UpDdate" onClick={() => window.location.href = `/add-edit-ticket/${ticket._id}`} />
                            </td>
                            <td scope="col">

                                <input type="button" className="btn btn-danger" value="Delete" onClick={() => deleteTicket(ticket._id)} />

                            </td>
                        </tr>
                    )}
                </tbody>
            </table>



        </>
    );
}


export default Tickets;