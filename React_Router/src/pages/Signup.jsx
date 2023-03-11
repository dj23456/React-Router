import React, { useState } from 'react'
import { json, Link, NavLink } from 'react-router-dom';
import swal from 'sweetalert';
import Fetchapi from './Fetchapi';

function Signup() {

    const [formvalue, setFormvalue] = useState({
        name: "",
        email: "",
        password: "",
        returnSecureToken: true
    })

    const onchangeHandel = (e) => {

        setFormvalue({ ...formvalue, [e.target.name]: e.target.value });
        console.log(formvalue);
    }

    const onsubmitHandel = (e) => {
        e.preventDefault();
        if (formvalue.name == "") {
            document.getElementById('name1').innerHTML = "please enter name";
        }
        else {
            document.getElementById('name1').innerHTML = "";
        }
        if(formvalue.email == "") {
            document.getElementById('email1').innerHTML = "please enter email";
        }
    //    else if(formvalue.email == ""){
    //         document.getElementById('email1').innerHTML = "email used";
    //     }
        else {
            document.getElementById('email1').innerHTML = "";
        }
        if(formvalue.password == "") {
            document.getElementById('pass1').innerHTML = "please enter pass";
        }
        else {
            document.getElementById('pass1').innerHTML = "";
        }

        if (formvalue.name !== "" && formvalue.email !== "" && formvalue.password !== "") {
            fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA2e3IXqt36f00SaGeC96ICoJ0ioyqXaNs', {
                method: 'POST',
                body: JSON.stringify(formvalue),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })

                .then((response) => response.json())
                .then((json) => {

                    fetch('https://dhruvreact-default-rtdb.firebaseio.com/user.json', {
                        method: 'POST',
                        body: JSON.stringify(formvalue),
                        headers: {
                            'Content-type': 'application/json; charset=UTF-8',
                        },
                    })
                        .then((response) => response.json())
                        .then((json) => {
                            swal({
                                title: "Success!",
                                text: "You Registered Success!",
                                icon: "success",
                            });
                            setFormvalue({ ...formvalue, name: "", email: "", password: "" });
                        });

                });
        }



    }


    return (
        <>
            <div className="contact_section layout_padding">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h1 className="contact_text"><img src='https://www.freeiconspng.com/thumbs/sign-up-button-png/sign-up-button-png-33.png' width={"115px"}></img></h1>
                            <div className="mail_sectin">
                                <input type="text" className="email-bt" name="name" value={formvalue.name} onChange={onchangeHandel} placeholder="namee" />
                                <span id='name1' style={{ color: "red" }}></span>
                                <input type="email" className="email-bt" name="email" value={formvalue.email} onChange={onchangeHandel} placeholder="mail" />
                                <span id='email1' style={{ color: "red" }}></span>
                                <input type="password" className="email-bt" name="password" value={formvalue.password} onChange={onchangeHandel} placeholder="password" />
                                <span id='pass1' style={{ color: "red" }}></span>
                                <button onClick={onsubmitHandel} className="send_bt" type="submit" style={{ background: "lightblue" }}>Sign Up</button>
                                <NavLink className="nav-link" to="/login">You have already Register____Login Here</NavLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Fetchapi />





        </>
    )
}

export default Signup