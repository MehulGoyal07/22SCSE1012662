const express = require('express');
const mongoose = require('mongoose');
const Log = require('logging-middleware');
const shortenerRoutes = require('./routes/shortenerRoutes');
const AUTH_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJtZWh1bC4yMnNjc2UxMDEyNjYyQGdhbGdvdGlhc3VuaXZlcnNpdHkuZWR1LmluIiwiZXhwIjoxNzUxMDE2Nzc4LCJpYXQiOjE3NTEwMTU4NzgsImlzcyI6IkFmZm9yZCBNZWRpY2FsIFRlY2hub2xvZ2llcyBQcml2YXRlIExpbWl0ZWQiLCJqdGkiOiI3NDAxNzU2Yy0wNzhjLTRmZTAtYTk3Ny1iODJiYjZlOGVkNDUiLCJsb2NhbGUiOiJlbi1JTiIsIm5hbWUiOiJtZWh1bCBnb3lhbCIsInN1YiI6ImI0ZDlkMjFiLTlkYmMtNDU5Mi05ZjA4LWE4ZWUzYTYyZTBkNSJ9LCJlbWFpbCI6Im1laHVsLjIyc2NzZTEwMTI2NjJAZ2FsZ290aWFzdW5pdmVyc2l0eS5lZHUuaW4iLCJuYW1lIjoibWVodWwgZ295YWwiLCJyb2xsTm8iOiIyMnNjc2UxMDEyNjYyIiwiYWNjZXNzQ29kZSI6Ik11YWd2cSIsImNsaWVudElEIjoiYjRkOWQyMWItOWRiYy00NTkyLTlmMDgtYThlZTNhNjJlMGQ1IiwiY2xpZW50U2VjcmV0IjoiTnRBd3RxeVpQUlN5Z0tUdiJ9.1Sf_HAoWqsAYntngoF3fRU3qHt0QnWG3Regr7ytKhiI";

const app = express();
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/urlshortener')
    .then(() => Log("backend", "debug", "db", "MongoDB connected", AUTH_TOKEN))
    .catch(err => Log("backend", "fatal", "db", `DB error: ${err.message}`, AUTH_TOKEN));

app.use('/', shortenerRoutes);

app.use((err, req, res, next) => {
    Log("backend", "error", "middleware", `Unhandled error: ${err.message}`, AUTH_TOKEN);
    res.status(500).json({ error: "Internal server error" });
});

module.exports = app;