const ShortenerService = require('../services/shortener');
const Log = require('logging-middleware');
const AUTH_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJtZWh1bC4yMnNjc2UxMDEyNjYyQGdhbGdvdGlhc3VuaXZlcnNpdHkuZWR1LmluIiwiZXhwIjoxNzUxMDE2Nzc4LCJpYXQiOjE3NTEwMTU4NzgsImlzcyI6IkFmZm9yZCBNZWRpY2FsIFRlY2hub2xvZ2llcyBQcml2YXRlIExpbWl0ZWQiLCJqdGkiOiI3NDAxNzU2Yy0wNzhjLTRmZTAtYTk3Ny1iODJiYjZlOGVkNDUiLCJsb2NhbGUiOiJlbi1JTiIsIm5hbWUiOiJtZWh1bCBnb3lhbCIsInN1YiI6ImI0ZDlkMjFiLTlkYmMtNDU5Mi05ZjA4LWE4ZWUzYTYyZTBkNSJ9LCJlbWFpbCI6Im1laHVsLjIyc2NzZTEwMTI2NjJAZ2FsZ290aWFzdW5pdmVyc2l0eS5lZHUuaW4iLCJuYW1lIjoibWVodWwgZ295YWwiLCJyb2xsTm8iOiIyMnNjc2UxMDEyNjYyIiwiYWNjZXNzQ29kZSI6Ik11YWd2cSIsImNsaWVudElEIjoiYjRkOWQyMWItOWRiYy00NTkyLTlmMDgtYThlZTNhNjJlMGQ1IiwiY2xpZW50U2VjcmV0IjoiTnRBd3RxeVpQUlN5Z0tUdiJ9.1Sf_HAoWqsAYntngoF3fRU3qHt0QnWG3Regr7ytKhiI";

exports.createShortUrl = async(req, res) => {
    try {
        const { url, validity, shortcode } = req.body;
        const { shortCode, expiresAt } = await ShortenerService.createShortUrl(
            url,
            validity,
            shortcode
        );

        res.status(201).json({
            shortLink: `${req.protocol}://${req.get('host')}/${shortCode}`,
            expiry: expiresAt.toISOString()
        });
    } catch (error) {
        await Log("backend", "error", "controller", `Create failed: ${error.message}`, AUTH_TOKEN);
        res.status(400).json({ error: error.message });
    }
};

exports.getUrlStats = async(req, res) => {
    try {
        const url = await Url.findOne({ shortCode: req.params.shortcode });
        if (!url) throw new Error("Shortcode not found");

        if (url.expiresAt < new Date()) {
            await Log("backend", "warn", "handler", "Expired shortcode accessed", AUTH_TOKEN);
            throw new Error("Link expired");
        }

        url.clicks.push({
            ip: req.ip,
            referrer: req.get('Referer'),
            country: req.headers['cf-ipcountry'] || "Unknown"
        });
        await url.save();

        res.json({
            originalUrl: url.originalUrl,
            createdAt: url.createdAt,
            expiry: url.expiresAt,
            totalClicks: url.clicks.length,
            clicks: url.clicks
        });
    } catch (error) {
        await Log("backend", "error", "controller", `Stats failed: ${error.message}`, AUTH_TOKEN);
        res.status(404).json({ error: error.message });
    }
};