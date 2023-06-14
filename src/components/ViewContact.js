import userEvent from "@testing-library/user-event";
import React,{useState,useEffect} from "react";
import { Link, useParams, } from "react-router-dom";
import Spinner from "./spinner";
import { ContactService } from "../ContactService";

let ViewContact=()=>{

    let {contactId}=useParams();

    let [state,setState]=useState({
        loading:false,
        contacts:{},
        group:{}
    });

    useEffect(()=>{

        const fetchData= async ()=>{
           const URL=`http://localhost:9000/contacts/${contactId}`
           let response=await fetch(URL)
           setState({...state,loading:true});
           let userData=await response.json()
           let groupResponse=await ContactService.getGroup(userData);
           setState({
                ...state,
                loading:false,
                contacts:userData,
                group:groupResponse.data
            });
        }
        fetchData();
    },[contactId]);

    let {loading,contacts,group}=state;

    return(
        <React.Fragment>
            <section className="view-contact-intro p-3">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <p className="h3 text-warning fw-bold">View Contact</p>
                            <p className="fst-italic">Here you will get all the contact information of the selected members. This is only read only data that means from here you can not change any of the details of the selected person. Here you can also see that from which group the selected members belongs.</p>
                        </div>
                    </div>
                </div>
            </section>
            {
                loading?<Spinner/>:<React.Fragment>
                    {
                        Object.keys(contacts).length>0 && Object.keys(group).length>0 &&
                        <section className="view-contact mt-3">
                            <div className="container">
                                <div className="row align-items-center">
                                    <div className="col-md-4">
                                        <img src={contacts.photo} alt="" className="contact-img"></img>
                                    </div>
                                    <div className="col-md-8">
                                        <ul className="list-group">
                                            <li className="list-group-item list-group-item-action">
                                                Name: <span className="fw-bold">{contacts.name}</span>
                                            </li>
                                            <li className="list-group-item list-group-item-action">
                                                Mobile: <span className="fw-bold">{contacts.mobile}</span>
                                            </li>
                                            <li className="list-group-item list-group-item-action">
                                                Email: <span className="fw-bold">{contacts.email}</span>
                                            </li>
                                            <li className="list-group-item list-group-item-action">
                                                Company: <span className="fw-bold">{contacts.company}</span>
                                            </li>
                                            <li className="list-group-item list-group-item-action">
                                                Title: <span className="fw-bold">{contacts.title}</span>
                                            </li>
                                            <li className="list-group-item list-group-item-action">
                                                Group: <span className="fw-bold">{group.name}</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <Link to={'/list'} className="btn btn-warning">Back</Link>
                                    </div>
                                </div>
                            </div>
                        </section>
                    }
                </React.Fragment>
            }
        </React.Fragment>
    )
};

export default ViewContact;