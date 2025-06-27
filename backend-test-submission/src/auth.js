const axios = require('axios');

const authData = {
    email: "mehul.22scse1012662@galgotiasuniversity.edu.in",
    name: "Mehul Goyal",
    rollNo: "22SCSE1012662",
    accessCode: "Muagvq",
    clientID: "b4d9d21b-9dbc-4592-9f08-a8ee3a62e0d5",
    clientSecret: "NtAwtqyZPRSygKTv"
};

const getAuthToken = async() => {
    try {
        const response = await axios.post(
            'http://20.244.56.144/evaluation-service/auth',
            authData
        );
        console.log("Authentication Successful!");
        console.log("Token:", response.data.access_token);
    } catch (error) {
        console.error("Authentication Failed:", error.response.data || error.message);
    }
};

getAuthToken();