import { getToken } from "../../components/auth/auth-helper";
let apiURL = process.env.REACT_APP_API_URL;

const list = async () => {
    try {
        let response = await fetch(`${apiURL}/admin/tickets`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        });
        return await response.json();
    }catch(err) {
        console.log(err);
    }
}

const create = async (ticket) => {
    try {
        let response = await fetch(`${apiURL}/admin/tickets`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getToken()}`
            },
            body: JSON.stringify(ticket)
        });
        return await response.json();
    }catch(err) {
        console.log(err);
    }
}

const remove = async (ticketId) => {
    try {
        let response = await fetch(`${apiURL}/admin/tickets/${ticketId}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getToken()}`
            },
            body: JSON.stringify()
        });
        return await response.json();
    }catch(err) {
        console.log(err);
    }
}

const update = async (ticketId, ticket) => {
    try {
        let response = await fetch(`${apiURL}/admin/tickets/${ticketId}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getToken()}`
            },
            body: JSON.stringify(ticket)
        });
        return await response.json();
    }catch(err) {
        console.log(err);
    }
}

const read = async (ticketId) => {
    try {
        let response = await fetch(`${apiURL}/admin/tickets/${ticketId}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        });
        return await response.json();
    }catch(err) {
        console.log(err);
    }
}

export { list, create, remove, update, read };