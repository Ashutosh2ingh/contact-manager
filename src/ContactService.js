import axios from "axios";

export class ContactService{
    static serverURL=`http://localhost:9000`;

    static createContact(contacts){
        let dataURL=`${this.serverURL}/contacts`;
        return axios.post(dataURL,contacts);
    }

    static updateContact(contacts,contactId){
        let dataURL=`${this.serverURL}/contacts/${contactId}`;
        return axios.put(dataURL,contacts);
    }

    static deleteContact(contactId){
        let dataURL=`${this.serverURL}/contacts/${contactId}`
        return axios.delete(dataURL);
    }

    static getGroups(){
        let dataURL=`${this.serverURL}/groups`;
        return axios.get(dataURL);
    }
    static getGroup(contacts){
        let groupId=contacts.groupId;
        let dataURL=`${this.serverURL}/groups/${groupId}`;
        return axios.get(dataURL);
    }
}