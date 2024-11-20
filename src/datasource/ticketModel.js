class TicketModel
{
    constructor(ticketId, ticketName, ticketDescription, ticketStatus, ticketPriority, ticketType, ticketAssignee, ticketReporter, ticketCreatedDate, ticketUpdatedDate)
    {
        this.ticketId = ticketId;
        this.ticketName = ticketName;
        this.ticketDescription = ticketDescription;
        this.ticketStatus = ticketStatus;
        this.ticketPriority = ticketPriority;
        this.ticketType = ticketType;
        this.ticketAssignee = ticketAssignee;
        this.ticketReporter = ticketReporter;
        this.ticketCreatedDate = ticketCreatedDate;
        this.ticketUpdatedDate = ticketUpdatedDate;
    }
}

export default TicketModel;