const shortid = require('shortid');
const Url = require('../models/Url');
const Log = require('logging-middleware');
const AUTH_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJtZWh1bC4yMnNjc2UxMDEyNjYyQGdhbGdvdGlhc3VuaXZlcnNpdHkuZWR1LmluIiwiZXhwIjoxNzUxMDE2Nzc4LCJpYXQiOjE3NTEwMTU4NzgsImlzcyI6IkFmZm9yZCBNZWRpY2FsIFRlY2hub2xvZ2llcyBQcml2YXRlIExpbWl0ZWQiLCJqdGkiOiI3NDAxNzU2Yy0wNzhjLTRmZTAtYTk3Ny1iODJiYjZlOGVkNDUiLCJsb2NhbGUiOiJlbi1JTiIsIm5hbWUiOiJtZWh1bCBnb3lhbCIsInN1YiI6ImI0ZDlkMjFiLTlkYmMtNDU5Mi05ZjA4LWE4ZWUzYTYyZTBkNSJ9LCJlbWFpbCI6Im1laHVsLjIyc2NzZTEwMTI2NjJAZ2FsZ290aWFzdW5pdmVyc2l0eS5lZHUuaW4iLCJuYW1lIjoibWVodWwgZ295YWwiLCJyb2xsTm8iOiIyMnNjc2UxMDEyNjYyIiwiYWNjZXNzQ29kZSI6Ik11YWd2cSIsImNsaWVudElEIjoiYjRkOWQyMWItOWRiYy00NTkyLTlmMDgtYThlZTNhNjJlMGQ1IiwiY2xpZW50U2VjcmV0IjoiTnRBd3RxeVpQUlN5Z0tUdiJ9.1Sf_HAoWqsAYntngoF3fRU3qHt0QnWG3Regr7ytKhiI";

class ShortenerService {
    static async createShortUrl(originalUrl, validity = 30, customShortCode = null) {
        try {
            if (!this.isValidUrl(originalUrl)) {
                await Log("backend", "error", "handler", "Invalid URL format", AUTH_TOKEN);
                throw new Error("Invalid URL");
            }

            const shortCode = customShortCode || shortid.generate();
            if (customShortCode && !this.isValidShortCode(customShortCode)) {
                await Log("backend", "error", "handler", "Invalid custom shortcode", AUTH_TOKEN);
                throw new Error("Shortcode must be alphanumeric (3-16 chars)");
            }

            const exists = await Url.findOne({ shortCode });
            if (exists) throw new Error("Shortcode already in use");

            const expiresAt = new Date(Date.now() + validity * 60000);
            const url = new Url({ originalUrl, shortCode, expiresAt });
            await url.save();

            await Log("backend", "debug", "db", `Created shortcode: ${shortCode}`, AUTH_TOKEN);
            return { shortCode, expiresAt };
        } catch (error) {
            await Log("backend", "error", "handler", `Shortener error: ${error.message}`, AUTH_TOKEN);
            throw error;
        }
    }

    static isValidUrl(url) {
        try {
            new URL(url);
            return true;
        } catch {
            return false;
        }
    }

    static isValidShortCode(code) {
        return /^[a-zA-Z0-9_-]{3,16}$/.test(code);
    }
}

module.exports = ShortenerService;