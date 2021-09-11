import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import Register from "./"
const Register = (props) => {
    const [stateUser, setStateUser] = useState({

        name: "",
        email: "",
        password: "",
        passwordConfirm: "",

    })
    // useEffect(() => {
    //     async function fetchData() {


    //         const res = await axios.get("http://localhost:3000/Users/")
    //         console.log(res)
    //         //clone
    //         let state = { ...stateUser };
    //         //edit
    //         // setStateUser(state.id = data.id);
    //         // setStateUser(state.name = data.name);
    //         // setStateUser(state.catogrie = data.catogrie);
    //         // setStateUser(state.img = data.img);
    //         // setStateUser(state.price = data.price);

    //         //set state
    //         setStateUser(state)

    //     }
    //     fetchData();
    // }, []);



    const handleSubmit = async (e) => {
        e.preventDefault();
        //add
        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
            }
        };

        const obj = { ...stateUser }
        console.log(obj)
        try {
            const { data } = await axios.post("http://localhost:4000/api/users/signup", obj, config);
            console.log("re", data)
            console.log("user", data.data.user)
            localStorage.setItem("token", data.token);
            localStorage.setItem("role", data.data.user.role);
            props.history.replace('/home')
            // if (data.data.user.role === 'admin') {
            //     props.history.push("http://localhost:4000/admin")

            // } else {
            //     props.history.replace('/home')

            // }
        }
        catch (err) {
            console.log("err", err)
        }
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
            <h1> Register</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" className="form-control" id="name" name="name" value={stateUser.name} onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" className="form-control" id="email" name="email" value={stateUser.email} onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label htmlFor="password">password</label>
                    <input type="text" className="form-control" id="password" name="password" value={stateUser.password} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="passwordConfirm">confirm password</label>
                    <input type="text" className="form-control" id="passwordConfirm" name="passwordConfirm" value={stateUser.passwordConfirm} onChange={handleChange} />
                </div>
                <button type="submit" className="btn btn-primary">Register</button>
            </form>

        </>
    );
}


export default Register;