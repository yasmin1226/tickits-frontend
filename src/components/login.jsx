import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import Register from "./"
const LogIn = (props) => {
    const [stateUser, setStateUser] = useState({


        email: "",
        password: "",


    })

    const [err, setErr] =
        useState("")


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stateUser.email || !stateUser.password) {
            setErr("you must provide email and password")
            console.log("empy")
        } else if (stateUser.password.length < 9) {
            setErr(" password must be at least 9")

        } else {

            const config = {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
                }
            };

            const obj = { ...stateUser }
            console.log(obj)
            try {
                const { data } = await axios.post("http://localhost:4000/api/users/login", obj, config);
                console.log("re", data)
                console.log("user", data.data.user)
                localStorage.setItem("token", data.token);
                localStorage.setItem("role", data.data.user.role);
                props.history.replace('/')
                if (data.data.user.role === 'admin') {
                    window.location.href = "http://localhost:4000/admin"



                } else {
                    props.history.replace('/')

                }
            }
            catch (err) {
                console.log("catch")
                console.log("err", err)
            }
        }
        //add
        //  console.log('submit')





        //   props.history.replace('/admin')
    }
    const handleChange = e => {
        let state = { ...stateUser }
        state[e.currentTarget.name] = e.currentTarget.value;
        setStateUser(state)
        console.log(e.currentTarget.value)
    }

    return (
        <>
            <h1> LogIn</h1>
            <span style={{ color: 'red' }}>{err}</span>
            <form onSubmit={handleSubmit}>

                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" className="form-control" id="email" name="email" value={stateUser.email} onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label htmlFor="password">password</label>
                    <input type="text" className="form-control" id="password" name="password" value={stateUser.password} onChange={handleChange} />
                </div>

                <button type="submit" className="btn btn-primary mt-4">LogIn</button>
            </form>

        </>
    );
}


export default LogIn;