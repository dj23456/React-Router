import React from 'react'
import { useState } from 'react';
import {Link,NavLink,useNavigate} from 'react-router-dom';
import swal from 'sweetalert';


function Login() {
    const redirect=useNavigate();
    const [formvalue,setFormvalue]=useState({
        email:"",
        password:"",
        returnSecureToken:true
    })
    const onchangeHandel=(e)=>{

        setFormvalue({...formvalue,[e.target.name]:e.target.value});
        console.log(formvalue);
    }
    const onLogin=(e)=>{
        e.preventDefault();
        fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA2e3IXqt36f00SaGeC96ICoJ0ioyqXaNs', {
            method: 'POST',
            body: JSON.stringify(formvalue),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
            })
            .then((response) => response.json())
            .then((json) => {
                if(formvalue.email !== json.email)
                {
                    swal({
                        title: "email not match",
                        text: "You Login Failed due wrong email ",
                        icon: "error",
                        
                    });
                    return redirect('/login');
                }
                // console.log(json)
                if(json.registered==true)
                {  
                      localStorage.setItem('email',json.email);
                    swal({
                        title: "Success!",
                        text: "You Login Success!",
                        icon: "success",
                       
                    });
                    return redirect('/index');
                }
                else
                {
                    swal({
                        title: "error!",
                        text: "You Login Failed due wrong email or password!",
                        icon: "warning",
                        
                    });
                    return redirect('/login');
                }
                 

            });

    }    


    return (
        <>
            <div className="contact_section layout_padding">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h1 className="contact_text"><img src='https://www.pngall.com/wp-content/uploads/5/Login-Button-PNG-Download-Image.png' width={"200px"}></img></h1>
                            <div className="mail_sectin">
                                <input type="email" className="email-bt" onChange={onchangeHandel} value={formvalue.email} placeholder="Email" name="email" />
                                <input type="password" className="email-bt" onChange={onchangeHandel} value={formvalue.password} placeholder="password" name="password" />

                                <div className="send_bt" onClick={onLogin}><a href="#">Login</a>
                                </div>
                                
                                <NavLink className="nav-link" to="/signup"><p>You are not Register____Register Here</p></NavLink>
                                
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>

        </>
    )
}

export default Login