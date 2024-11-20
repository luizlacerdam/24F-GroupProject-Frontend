import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { read, update } from "../datasource/api-ticket";
import TicketModel from "../datasource/TicketModel";

const EditTicket = () => {
    
    let navigate = useNavigate();
    let { id } = useParams();
    let [values, setTicket] = useState(new TicketModel());

    useEffect(() => {
        read(id).then(response => {
            setTicket(
                new TicketModel(
                    response.customerId,
                    response.status,
                    response.description,
                    response.priority
                )
            );
        }).catch(err => {
            alert(err.message);
            console.log(err);
        });
    }, [id]);

    const handleChange = (event) => {
        const {name, value} = event.target;
        setTicket((prevFormData) => ({ ...prevFormData, [name]: value }));
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        let updatedTicket =
            new TicketModel(
                values.customerId,
                values.status,
                values.description,
                values.priority
            );

        update(id, updatedTicket).then(response => {
            if(response && response.id) {
                alert('Ticket updated successfully with id: ' + response.id);
                navigate('/tickets');
            } else {
                alert('Ticket update failed!');
                console.log(response.message);
            }
        }).catch(err => {
            alert(err.message);
            console.log(err);
        });
    };

    return (
        <div className="container" style={{ paddingTop: 80 }}>
            <div className="row">
                <div className=" offset-md-3 col-md-6">
                    <h1 className="text-center">Edit Ticket</h1>

                    <form onSubmit={handleSubmit} className="form">
                        <div className="form-group">
                            <input type="hidden" name="id" value={values.id || ''} />
                            <label htmlFor="customerId">Customer id</label>
                            <input type="text" 
                            name="customerId" 
                            placeholder="Enter the customer id" 
                            value={values.customerId || ''} 
                            onChange={handleChange} 
                            className="form-control" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="status">Status</label>
                            <input type="text" 
                            name="status" 
                            placeholder="Enter the status" 
                            value={values.status || ''} 
                            onChange={handleChange} 
                            className="form-control" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <input type="text" 
                            name="description" 
                            placeholder="Enter the description" 
                            value={values.description || ''} 
                            onChange={handleChange} 
                            className="form-control" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="priority">Priority</label>
                            <input type="text" 
                            name="priority" 
                            placeholder="Enter the priority" 
                            value={values.priority || ''} 
                            onChange={handleChange} 
                            className="form-control" />
                        </div>
                        <div className="form-group">
                            <button className="btn btn-primary">Update</button>
                            <Link to="/tickets" className="btn btn-secondary">Cancel</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditTicket;