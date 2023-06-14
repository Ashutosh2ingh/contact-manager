import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate} from "react-router-dom";
import { ContactService } from "../ContactService";
import Spinner from "./spinner";

let EditContact=()=>{

    let {contactId}=useParams();
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
            groupId:''
        },
        groups:[],
        erroMessage:''
    });

    useEffect( ()=>{

        const fetchData= async ()=>{
            const URL=`http://localhost:9000/contacts/${contactId}`
            const groupURL=`http://localhost:9000/groups`
            let groupresponse=await fetch(groupURL)
            let response=await fetch(URL)
            setState({...state,loading:true});
            let userData=await response.json()
            let groupData=await groupresponse.json()
            setState({
                 ...state,
                 loading:false,
                 contacts:userData,
                 groups:groupData
             });
         }
         fetchData();
    },[contactId]);

    let updateInput=(event)=>{
        setState({
            ...state,
            contacts:{
                ...state.contacts,
                [event.target.name]:event.target.value
            }
        });
    };

    let submitForm =async (event) =>{
        event.preventDefault();
        try{
            let response=await ContactService.updateContact(state.contacts,contactId);
            if(response){
                navigate('/list',{replace:true});
            }
        }
        catch(error){
            setState({...state,errorMessage:error.message});
            navigate(`/edit/${contactId}`,{replace:false});
        }
    };

    let {loading,contacts,groups}=state;

    return(
        <React.Fragment>
            {
                loading?<Spinner/>:<React.Fragment>
                     <section className="add-contact p-3">
                        <div className="container">
                            <div className="row">
                                <div className="col">
                                    <p className="h4 text-primary fw-bold">Edit Contact</p>
                                    <p className="fst-italic">Here firstly you will get to see all the present data of the selected member. But this is changeable data that means here you can see the data as well as you can also change the data too. you can change everything here. You can change the images too. </p>
                                </div>
                            </div>
                            <div className="row align-items-center">
                                <div className="col-md-4">
                                    <form onSubmit={submitForm}>
                                        <div className="mb-2">
                                            <input required="true" name="name" value={contacts.name} onChange={updateInput} type="text" className="form-control" placeholder="Name"/>
                                        </div>
                                        <div className="mb-2">
                                            <input required="true" name="photo" value={contacts.photo} onChange={updateInput} type="text" className="form-control" placeholder="Photo Url"/>
                                        </div>
                                        <div className="mb-2">
                                            <input required="true" name="mobile" value={contacts.mobile} onChange={updateInput} type="number" className="form-control" placeholder="Mobile"/>
                                        </div>
                                        <div className="mb-2">
                                            <input required="true" name="email" value={contacts.email} onChange={updateInput} type="email" className="form-control" placeholder="Email"/>
                                        </div>
                                        <div className="mb-2">
                                            <input required="true" name="company" value={contacts.company} onChange={updateInput} type="text" className="form-control" placeholder="Company"/>
                                        </div>
                                        <div className="mb-2">
                                            <input required="true" name="title" value={contacts.title} onChange={updateInput} type="text" className="form-control" placeholder="Title"/>
                                        </div>
                                        <div className="mb-2">
                                            <select required="true" name="groupId" value={contacts.groupId} onChange={updateInput} className="form-control">
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
                                            <input type="submit" className="btn btn-primary" value="Update" />
                                            <Link to={'/list'} className="btn btn-dark ms-2">Cancel</Link>
                                        </div>
                                    </form>
                                </div>
                                <div className="col-md-6">
                                    <img src={contacts.photo} alt="" className="contact-img"></img>
                                </div>
                            </div>
                        </div>
                    </section>
                </React.Fragment>
            }
        </React.Fragment>
    )
};

export default EditContact;