import React, { useState, useEffect } from 'react';
import axios from 'axios'
const AddEditForm = (props) => {
    const role = localStorage.getItem("role")

    console.log(props)
    const [stateTicket, setStateTicket] = useState({
        // id: "",
        title: "",
        status: ""
    })
    // if (role === 'customer') {
    //     console.log("role is cu")
    //     let state = { ...stateTicket }
    //     delete state.status;
    //     setStateTicket(state)
    //     console.log("state", state)
    //     console.log("state", stateTicket)
    // }
    useEffect(() => {
        async function fetchData() {
            const id = props.match.params.id;
            if (id !== 'new') {
                try {
                    console.log("try")
                    const { data } = await axios.get("http://localhost:4000/api/ticket/" + id)
                    console.log("res", data.data.ticket);
                    //clone
                    let state = { ...stateTicket };
                    // //edit
                    if (role === 'customer') {
                        setStateTicket(state.title = data.data.ticket.title);

                    }
                    else {

                        setStateTicket(state.title = data.data.ticket.title);
                        setStateTicket(state.status = data.data.ticket.status);
                    }



                    // //set state
                    setStateTicket(state)
                } catch (err) {
                    console.log("err", err)
                }

            }
            console.log(id)
        }
        fetchData();
    }, []);

    console.log("tiket", stateTicket)

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');

        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
                'authorization': `Bearer ${token}`

            }
        };
        //add
        if (props.match.params.id === 'new') {
            const obj = { ...stateTicket }
            delete obj.status;

            console.log(obj)
            try {
                await axios.post("http://localhost:4000/api/ticket/", obj, config)
                window.location.href = "/home"


            } catch (err) {
                console.log(err)
            }
            //  console.log('submit')
        } else {
            //edit
            const obj = { ...stateTicket }
            delete obj.status;
            try {

                await axios.patch("http://localhost:4000/api/ticket/" + props.match.params.id, obj, config)

                window.location.href = "/home"
            } catch (err) {
                console.log("er", err)
            }

        }
    }
    const handleChange = e => {
        let state = { ...stateTicket }
        state[e.currentTarget.name] = e.currentTarget.value;
        setStateTicket(state)
        console.log(e.currentTarget.value)
    }

    return (
        <>
            <h1>{props.match.params.id === 'new' ? 'Add' : "Edit"} Ticket</h1>
            < form onSubmit={handleSubmit}>


                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input type="text" className="form-control" id="title" name="title" value={stateTicket.title} onChange={handleChange} />
                </div>

                {role !== 'customer' && <div className="form-group">
                    <label htmlFor="Status">status</label>
                    <input type="text" className="form-control" id="status" name="status" value={stateTicket.status} onChange={handleChange} />
                </div>
                }
                <button type="submit" className="btn btn-primary mt-2">{props.match.params.id === 'new' ? 'Add' : "Edit"}</button>
            </form>

        </>
    );
}


export default AddEditForm;