const axios = require('axios');

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJtZWh1bC4yMnNjc2UxMDEyNjYyQGdhbGdvdGlhc3VuaXZlcnNpdHkuZWR1LmluIiwiZXhwIjoxNzUxMDE1NTE3LCJpYXQiOjE3NTEwMTQ2MTcsImlzcyI6IkFmZm9yZCBNZWRpY2FsIFRlY2hub2xvZ2llcyBQcml2YXRlIExpbWl0ZWQiLCJqdGkiOiJiMWRiMjk0MC1hNjcwLTRjODYtYjU3MS1lYmRjZTE2Y2JlY2UiLCJsb2NhbGUiOiJlbi1JTiIsIm5hbWUiOiJtZWh1bCBnb3lhbCIsInN1YiI6ImI0ZDlkMjFiLTlkYmMtNDU5Mi05ZjA4LWE4ZWUzYTYyZTBkNSJ9LCJlbWFpbCI6Im1laHVsLjIyc2NzZTEwMTI2NjJAZ2FsZ290aWFzdW5pdmVyc2l0eS5lZHUuaW4iLCJuYW1lIjoibWVodWwgZ295YWwiLCJyb2xsTm8iOiIyMnNjc2UxMDEyNjYyIiwiYWNjZXNzQ29kZSI6Ik11YWd2cSIsImNsaWVudElEIjoiYjRkOWQyMWItOWRiYy00NTkyLTlmMDgtYThlZTNhNjJlMGQ1IiwiY2xpZW50U2VjcmV0IjoiTnRBd3RxeVpQUlN5Z0tUdiJ9.245NT40D94JJDX6KYJl4NnrBTeCbCwm2liilHsDu854";

const testLog = async() => {
    try {
        const response = await axios.post(
            'http://20.244.56.144/evaluation-service/logs', {
                stack: "backend",
                level: "error",
                package: "handler",
                message: "test log message"
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        console.log("Log API Success:", response.data);
    } catch (error) {
        console.error("Log API Failed:", error.response.data || error.message);
    }
};

testLog();