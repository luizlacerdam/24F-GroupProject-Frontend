import { useEffect, useState } from "react";
import { list, remove } from "../datasource/api-ticket";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/auth-helper";

const ListTickets = () => {

    let [ticketList, setTicketList] = useState([]);
    let [isLoading, setLoading] = useState(true);

    useEffect(() => {
        list().then((response) => {
            if(response){
                setTicketList(response);
                setLoading(false);
            }
        }).catch(err => {
            alert(err.message);
            console.log(err);
            setLoading(false);
        });
    }, []);

    const handleRemove = (ticketId) => {
        if(!isAuthenticated()){
            alert('You need to be logged in to delete a ticket!');
        }else{
            if(window.confirm('Are you sure you want to delete this ticket?')){
                remove(ticketId).then(response => {
                    if(response && response.message){
                        alert(response.message);
                        setTicketList(ticketList.filter(ticket => ticket.id !== ticketId));
                    }else{
                        alert('Ticket deletion failed!');
                        console.log(response.message);
                    }
                }).catch(err => {
                    alert(err.message);
                    console.log(err);
                });
            };
        }
    };

    return (
        <div className="container" style={{ paddingTop: 80 }}>
            <div className="row">
                <div className=" offset-md-3 col-md-6">
                    <h1 className="text-center">Tickets</h1>
                    <Link to="/add-ticket" className="btn btn-raised btn-primary">Add Ticket</Link>
                    {isLoading ? (
                        <div className="text-center">
                            <div className="spinner-border" role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                        </div>
                    ) : (
                        <table className="table table-bordered table-striped">
                            <thead>
                                <tr>
                                    <th>Customer Id</th>
                                    <th>Status</th>
                                    <th>Description</th>
                                    <th>Priority</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {ticketList.map((ticket, index) => (
                                    <tr key={index}>
                                        <td>{ticket.customerId}</td>
                                        <td>{ticket.status}</td>
                                        <td>{ticket.description}</td>
                                        <td>{ticket.priority}</td>
                                        <td>
                                            <Link to={`/edit-ticket/${ticket.id}`} className="btn btn-raised btn-primary">Edit</Link>
                                            <button onClick={() => handleRemove(ticket.id)} className="btn btn-raised btn-danger">Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ListTickets;