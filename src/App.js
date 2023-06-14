import React from 'react';
import './App.css';
import { Routes,Route,Navigate } from 'react-router-dom';
import NavBar from './components/navbar';
import ContactList from './components/ContactList';
import AddContact from './components/AddContact';
import ViewContact from './components/ViewContact';
import EditContact from './components/EditContact';

let App=()=> {
  return (
    <React.Fragment>
      <NavBar/>
      <Routes>
        <Route path={'/'} element={<Navigate to={'/list'}/>}/>
        <Route path={'/list'} element={<ContactList/>}/>
        <Route path={'/add'} element={<AddContact/>}/>
        <Route path={'/view/:contactId'} element={<ViewContact/>}/>
        <Route path={'/edit/:contactId'} element={<EditContact/>}/>
      </Routes>
    </React.Fragment>
  );
}

export default App;
