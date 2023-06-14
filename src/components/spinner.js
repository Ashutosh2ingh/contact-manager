import React from "react";
import spinnnerimg from '../image/Loading_2.gif';

let Spinner = () =>{
    return(
        <React.Fragment>
            <div>
                <img src={spinnnerimg}  alt="" className="d-block m-auto" style={{width:'100px'}}></img>
            </div>
        </React.Fragment>
    )
};
export default Spinner;