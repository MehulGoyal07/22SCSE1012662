import { useState } from 'react';
import { createShortUrl } from '../services/api';
import { Log } from '../services/logger';

export default function UrlForm({ onSuccess }) {
  const [url, setUrl] = useState("");
  const [validity, setValidity] = useState(30);
  const [shortcode, setShortcode] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!url) {
      setError("URL is required");
      await Log("error", "component", "Empty URL submitted");
      return;
    }

    try {
      const result = await createShortUrl(url, validity, shortcode);
      onSuccess(result);
      setUrl("");
      setShortcode("");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="url-form">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter long URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <input
          type="number"
          placeholder="Validity (minutes)"
          value={validity}
          onChange={(e) => setValidity(e.target.value)}
          min="1"
        />
        <input
          type="text"
          placeholder="Custom shortcode (optional)"
          value={shortcode}
          onChange={(e) => setShortcode(e.target.value)}
        />
        <button type="submit">Shorten URL</button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
}