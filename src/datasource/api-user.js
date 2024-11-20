let apiURL= process.env.REACT_APP_API_URL;

const signin = async (user) => {
    try {
        let response = await fetch(`${apiURL}/user/signin`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user)
        });
        return await response.json();
    }catch(err) {
        console.log(err);
    }
}

export {signin};