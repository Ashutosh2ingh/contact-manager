import React, { useState,useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ContactService } from "../ContactService";
import Spinner from "./spinner";

let AddContact=()=>{

    let navigate=useNavigate();

    let [state,setState]=useState({
        loading:false,
        contacts:{
            name:'',
            photo:'',
            mobile:'',
            email:'',
            company:'',
            title:'',
            groupId:'',
        },
        groups:[]
    });

    let updateInput=(event)=>{
        setState({
            ...state,
            contacts:{
                ...state.contacts,
                [event.target.name]:event.target.value
            }
        });
    };

    useEffect(()=>{

        const fetchData= async ()=>{
           const URL=`http://localhost:9000/groups`
           let response=await fetch(URL)
           setState({...state,loading:true});
           let userData=await response.json()
           setState({
                ...state,
                loading:false,
                groups:userData,
            });
        }
        fetchData();
    },[]);

    let submitForm=async (event)=>{
        event.preventDefault();
        try{
            let response=await ContactService.createContact(state.contacts);
            if(response){
                navigate('/list',{replace:true});
            }
        }
        catch(error){
            setState({...state,errorMessage:error.message});
            navigate('/add',{replace:false});
        }
    }

    let {loading,contacts,groups}=state;

    return(
        <React.Fragment>
            {
                 loading?<Spinner/>:<React.Fragment>
                    <section className="add-contact p-3">
                        <div className="container">
                            <div className="row">
                                <div className="col">
                                    <p className="h4 text-success fw-bold">Create Contact</p>
                                    <p className="fst-italic">Here you will get to see a blank form there will be no data will be present there in the form. From here you can create a new member that means you can add a new member in your contact list from here. Here you will store all the data from yourself.</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-4">
                                    <form onSubmit={submitForm}>
                                        <div className="mb-2">
                                            <input required={true} name="name" value={contacts.name} onChange={updateInput} type="text" className="form-control" placeholder="Name"/>
                                        </div>
                                        <div className="mb-2">
                                            <input required={true} name="photo" value={contacts.photo} onChange={updateInput} type="text" className="form-control" placeholder="Photo Url"/>
                                        </div>
                                        <div className="mb-2">
                                            <input required={true} name="mobile" value={contacts.mobile} onChange={updateInput} type="number" className="form-control" placeholder="Mobile"/>
                                        </div>
                                        <div className="mb-2">
                                            <input required={true} name="email" value={contacts.email} onChange={updateInput} type="email" className="form-control" placeholder="Email"/>
                                        </div>
                                        <div className="mb-2">
                                            <input required={true} name="company" value={contacts.company} onChange={updateInput} type="text" className="form-control" placeholder="Company"/>
                                        </div>
                                        <div className="mb-2">
                                            <input required={true} name="title" value={contacts.title} onChange={updateInput} type="text" className="form-control" placeholder="Title"/>
                                        </div>
                                        <div className="mb-2">
                                            <select  required={true} name="groupId" value={contacts.groupId} onChange={updateInput} className="form-control">
                                                <option value="">Select a Group</option>
                                                {
                                                    groups.length>0 &&
                                                    groups.map(groups=>{
                                                        return(
                                                            <option key={groups.id} value={groups.id}>{groups.name}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </div>
                                        <div className="mb-2">
                                            <input type="submit" className="btn btn-success" value="Create" />
                                            <Link to={'/list'} className="btn btn-dark ms-2">Cancel</Link>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </section>
                 </React.Fragment>
            }
        </React.Fragment>
    )
};

export default AddContact;