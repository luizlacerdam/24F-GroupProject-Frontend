import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { create } from "../datasource/api-ticket";
import TicketModel from "../datasource/TicketModel";

const AddTicket = () => {

    let navigate = useNavigate();
    let [values, setValues] = useState(new TicketModel());

    const handleChange = (event) => {
        const {name, value} = event.target;
        setTicket((prevFormData) => ({ ...prevFormData, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        let newTicket =
            new TicketModel(
                values.customerId,
                values.status,
                values.description,
                values.priority
            );
        await create(newTicket).then(response => {
            if(response && response.id) {
                alert('Ticket created successfully with id: ' + response.id);
                navigate('/tickets');
            } else {
                alert('Ticket creation failed!');
                console.log(response.message);
            }
        }).catch(err => {
            alert(err.message); 
            console.log(err)
        });
    };
}
    
    return (
        <div className="container" style={{ paddingTop: 80 }}>
            <div className="row">
                <div className=" offset-md-3 col-md-6">
                    <h1 className="text-center">Add Ticket</h1>

                    <form onSubmit={handleSubmit} className="form">
                        <div className="form-group">
                            <input type="hidden" name="id" value={values.id || ''} />
                            <label htmlFor="ticketName">User Name</label>
                            <input type="text" 
                            name="ticketName" 
                            placeholder="Enter the ticket name" 
                            value={values.ticketName || ''} 
                            onChange={handleChange} 
                            className="form-control" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );