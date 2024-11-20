class TicketModel
{
    constructor(customerId, status, description, priority) {
        this.customerId = customerId;
        this.status = status;
        this.description = description;
        this.priority = priority;
    }
}

export default TicketModel;