import React,{useState,useEffect} from "react";
import { Link } from "react-router-dom";
import Spinner from "./spinner";
import { ContactService } from "../ContactService";

let ContactList = () => {

    let [query,setQuery]=useState({
        text:''
    })

    let [state,setState]=useState({
        loading:false,
        contacts:[],
        filteredContacts:[],
        errorMessage:''
    });

    useEffect(()=>{

        const fetchData= async ()=>{
           const URL=`http://localhost:9000/contacts`
           let response=await fetch(URL)
           setState({...state,loading:true});
           let userData=await response.json()
           setState({
                ...state,
                loading:false,
                contacts:userData,
                filteredContacts:userData
            });
        }
        fetchData();
    },[]);

    let clickDelete= async(contactId)=>{
        try{
            let response=await ContactService.deleteContact(contactId);
            if(response){
                const URL=`http://localhost:9000/contacts`
                let response=await fetch(URL)
                setState({...state,loading:true});
                let userData=await response.json()
                setState({
                    ...state,
                    loading:false,
                    contacts:userData,
                    filteredContacts:userData
                });
            }
        }
        catch(error){
            setState({
                ...state,
                loading:false,
                errorMessage:error.message 
            })
        }
    };

    let searchContacts=(event)=>{
        setQuery({...query,text:event.target.value});
        let theContacts=state.contacts.filter(contacts=>{
            return contacts.name.toLowerCase().includes(event.target.value.toLowerCase())
        });
        setState({
            ...state,
            filteredContacts:theContacts
        })
    }

    let {loading,contacts,filteredContacts,errorMessage}=state;

    return (
        <React.Fragment>
            <section className="contact-search p-3">
                <div className="container">
                    <div className="grid">
                        <div className="row">
                            <div className="col">
                                <p className="h3 fw-bold">Contact Directory
                                    <Link to={'/add'} className="btn btn-primary ms-2">
                                        <i className="fa fa-plus-circle me-2" />
                                        New
                                    </Link>
                                </p>
                                <p className="fst-italic">This is the contact list of all my colleagues, friends. Here you will get the basic details of all the members which is present in my contact list. Here you will get only name, phone and email. To get further you have to use the buttons given. </p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col md-6">
                                <form className="row">
                                    <div className="col">
                                        <div className="mb-2">
                                            <input name="text" value={query.text} onChange={searchContacts} type="text" className="form-control" placeholder="Search Name" />
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="mb-2">
                                            <input type="submit" className="btn btn-outline-dark" value="Search" />
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {
                loading? <Spinner/>:<React.Fragment>
                    <section className="contact-list">
                        <div className="container">
                            <div className="row">
                                {
                                    filteredContacts.length>0 && filteredContacts.map(contact=>{
                                        return(
                                            <div className="col-md-6" key={contact.id}>
                                                <div className="card my-2">
                                                    <div className="card-body">
                                                        <div className="row align-items-center d-flex justify-content-around">
                                                            <div className="col-md-4">
                                                                <img src={contact.photo} alt="" className="contact-img"></img>
                                                            </div>
                                                            <div className="col-md-7">
                                                                <ul className="list-group">
                                                                    <li className="list-group-item list-group-item-action">
                                                                        Name: <span className="fw-bold">{contact.name}</span>
                                                                    </li>
                                                                    <li className="list-group-item list-group-item-action">
                                                                        Mobile: <span className="fw-bold">{contact.mobile}</span>
                                                                    </li>
                                                                    <li className="list-group-item list-group-item-action">
                                                                        Email: <span className="fw-bold">{contact.email}</span>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                            <div className="col-md-1 d-flex flex-column align-items-center">
                                                                <Link to={`/view/${contact.id}`} className="btn btn-warning my-1">
                                                                    <i className="fa fa-eye" />
                                                                </Link>
                                                                <Link to={`/edit/${contact.id}`} className="btn btn-primary my-1">
                                                                    <i className="fa fa-pen" />
                                                                </Link>
                                                                <button className="btn btn-danger" onClick={()=>clickDelete(contact.id)}>
                                                                    <i className="fa fa-trash" />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </section>
                </React.Fragment>
            }
        </React.Fragment>
    )
};

export default ContactList;
