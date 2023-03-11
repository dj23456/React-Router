import React, { useState, useEffect } from 'react'
import swal from 'sweetalert';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function Fetchapi() {

    useEffect(() => {
        getdata();
    }, []);

    const [alldata, setalldata] = useState([]);
    function getdata() {
        fetch('https://dhruvreact-default-rtdb.firebaseio.com/user.json')
            .then(response => response.json())
            .then(json => {
                //console.log(json);
                setalldata(json);
            })
    }

    function deleteHandel(id) {
        fetch(`https://dhruvreact-default-rtdb.firebaseio.com/user/${id}.json`, {
            method: 'DELETE',
        })
            .then(response => response.json())
            .then(json => {

                swal({
                    title: "Success!",
                    text: "You Delete Success!",
                    icon: "success",
                });
                getdata();
            })
    }

    //edit
    const [formvalue, setFormvalue] = useState({
        name: "",
        email: "",
        mobile: ""
    })
    const [userid, setUserid] = useState("");

    const editHandel = (id) => {
        setUserid(id);
        fetch(`https://dhruvreact-default-rtdb.firebaseio.com/user/${id}.json`)
            .then((response) => response.json())
            .then((json) => {
                console.log(json);
                setFormvalue(json);
            });
        handleShow();
    }


    //update
    const onchangeHandel = (e) => {

        setFormvalue({ ...formvalue, [e.target.name]: e.target.value });
        console.log(formvalue);
    }

    const updateHandel = (e) => {
        e.preventDefault();
        fetch(`https://dhruvreact-default-rtdb.firebaseio.com/user/${userid}.json`, {
            method: 'PUT',
            body: JSON.stringify(formvalue),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((json) => {
                swal({
                    title: "Success!",
                    text: "You Update Success!",
                    icon: "success",
                });
                setFormvalue({ ...formvalue, name: "", email: "", mobile: "" });
                getdata();
            });
    }

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <>
            <table class="table table-dark table-hover">
                <tr>
                    <th scope='col'>No</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Mobile</th>
                </tr>
                <tbody>
                    {
                        Object.keys(alldata).map((item, index) => {

                            return (
                                <tr key={item}>
                                    <td>{item}</td>
                                    <td>{alldata[item].name}</td>
                                    <td>{alldata[item].email}</td>
                                    <td>{alldata[item].mobile}</td>
                                    <td><button className='btn btn-primary' onClick={() => editHandel(item)} data-bs-toggle="modal" data-bs-target="#Modal">Edit</button></td>
                                    <td><button className='btn btn-danger' onClick={() => deleteHandel(item)}>Delete</button></td>
                                </tr>
                            )
                        }
                        )}

                </tbody>

            </table>


            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Data</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row g-0">
                        <div className="col-lg-12">
                            <div className="bg-primary h-100 p-5">
                                <form>
                                    <div className="row g-3">
                                        <div className="col-12">
                                            <input type="text" name='name' value={formvalue.name} onChange={onchangeHandel} className="form-control bg-light border-0 px-4" placeholder="Your Name" style={{ height: 55 }} />
                                        </div>
                                        <br></br><br></br><br></br>
                                        <div className="col-12">
                                            <input type="email" name='email' value={formvalue.email} onChange={onchangeHandel} className="form-control bg-light border-0 px-4" placeholder="Your Email" style={{ height: 55 }} />
                                        </div>
                                        <br></br><br></br><br></br>
                                        <div className="col-12">
                                            <input type="number" name='mobile' value={formvalue.mobile} onChange={onchangeHandel} className="form-control bg-light border-0 px-4" placeholder="Your mobile" style={{ height: 55 }} />
                                        </div>
                                        <br></br><br></br><br></br><br></br>
                                        <div className="col-12">
                                            <button onClick={updateHandel} data-bs-dismiss="modal" className="btn btn-secondary w-100 py-3" type="submit">Save</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>

                    </div>


                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>


        </>
    )
}

export default Fetchapi