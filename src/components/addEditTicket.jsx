import React, { useState, useEffect } from 'react';
import axios from 'axios'
const AddEditForm = (props) => {
    console.log(props)
    const [stateTicket, setStateTicket] = useState({
        id: "",
        title: "",
        status: ""


    })
    useEffect(() => {
        async function fetchData() {
            const id = props.match.params.id;
            if (id !== 'new') {

                const res = await axios.get("http://localhost:4000/api/ticket/" + id)
                console.log("res", res);
                //clone
                let state = { ...stateTicket };
                // //edit
                setStateTicket(state.title = stateTicket.title);
                setStateTicket(state.status = stateTicket.status);


                // //set state
                setStateTicket(state)

            }
            console.log(id)
        }
        fetchData();
    }, []);



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
            console.log(obj)
            await axios.post("http://localhost:4000/api/ticket/", obj, config)
            //  console.log('submit')
        } else {
            //edit
            const obj = { ...stateTicket }
            //delete id
            delete obj.id;
            await axios.patch("http://localhost:4000/api/ticket/" + stateTicket.id, obj, config)

        }
        window.location.href = "/home"
    }
    const handleChange = e => {
        let state = { ...stateTicket }
        state[e.currentTarget.name] = e.currentTarget.value;
        setStateTicket(state)
        console.log(e.currentTarget.value)
    }

    return (
        <>
            <h1>{props.match.params.id === 'new' ? 'Add' : "Edit"} Product</h1>
            <form onSubmit={handleSubmit}>


                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input type="text" className="form-control" id="title" name="title" value={stateTicket.title} onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label htmlFor="Status">status</label>
                    <input type="text" className="form-control" id="status" name="status" value={stateTicket.status} onChange={handleChange} />
                </div>

                <button type="submit" className="btn btn-primary">{props.match.params.id === 'new' ? 'Add' : "Edit"}</button>
            </form>

        </>
    );
}


export default AddEditForm;