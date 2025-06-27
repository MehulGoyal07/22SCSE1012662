const axios = require('axios');

const registerData = {
    email: "mehul.22scse1012662@galgotiasuniversity.edu.in",
    name: "Mehul Goyal",
    mobileNo: "9548551920",
    githubUsername: "MehulGoyal07",
    rollNo: "22SCSE1012662",
    accessCode: "Muagvq"
};

const register = async() => {
    try {
        const response = await axios.post(
            'http://20.244.56.144/evaluation-service/register',
            registerData
        );
        console.log("Registration Successful!");
        console.log("Client ID:", response.data.clientID);
        console.log("Client Secret:", response.data.clientSecret);
        // Save these credentials securely (they cannot be retrieved again)
    } catch (error) {
        console.error("Registration Failed:", error.response.data || error.message);
    }
};

register();