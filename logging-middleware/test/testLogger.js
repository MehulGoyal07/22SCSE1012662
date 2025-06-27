const Log = require('../src/logger');
const AUTH_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJtZWh1bC4yMnNjc2UxMDEyNjYyQGdhbGdvdGlhc3VuaXZlcnNpdHkuZWR1LmluIiwiZXhwIjoxNzUxMDE2Nzc4LCJpYXQiOjE3NTEwMTU4NzgsImlzcyI6IkFmZm9yZCBNZWRpY2FsIFRlY2hub2xvZ2llcyBQcml2YXRlIExpbWl0ZWQiLCJqdGkiOiI3NDAxNzU2Yy0wNzhjLTRmZTAtYTk3Ny1iODJiYjZlOGVkNDUiLCJsb2NhbGUiOiJlbi1JTiIsIm5hbWUiOiJtZWh1bCBnb3lhbCIsInN1YiI6ImI0ZDlkMjFiLTlkYmMtNDU5Mi05ZjA4LWE4ZWUzYTYyZTBkNSJ9LCJlbWFpbCI6Im1laHVsLjIyc2NzZTEwMTI2NjJAZ2FsZ290aWFzdW5pdmVyc2l0eS5lZHUuaW4iLCJuYW1lIjoibWVodWwgZ295YWwiLCJyb2xsTm8iOiIyMnNjc2UxMDEyNjYyIiwiYWNjZXNzQ29kZSI6Ik11YWd2cSIsImNsaWVudElEIjoiYjRkOWQyMWItOWRiYy00NTkyLTlmMDgtYThlZTNhNjJlMGQ1IiwiY2xpZW50U2VjcmV0IjoiTnRBd3RxeVpQUlN5Z0tUdiJ9.1Sf_HAoWqsAYntngoF3fRU3qHt0QnWG3Regr7ytKhiI";


(async() => {
    try {
        await Log("backend", "error", "handler", "Test error log", AUTH_TOKEN);

        await Log("frontend", "warn", "component", "Test warning", AUTH_TOKEN);

        await Log("backend", "info", "invalid-package", "This should fail", AUTH_TOKEN);
    } catch (error) {
        console.error("Test failed:", error.message);
    }
})();