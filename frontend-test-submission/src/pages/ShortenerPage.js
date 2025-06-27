import { useState } from 'react';
import UrlForm from '../components/UrlForm';
import UrlList from '../components/UrlList';
import { Log } from '../services/logger';

export default function ShortenerPage() {
  const [shortUrls, setShortUrls] = useState([]);

  const handleSuccess = (newUrl) => {
    setShortUrls([...shortUrls, newUrl]);
    Log("debug", "page", "New URL shortened successfully");
  };

  return (
    <div className="page">
      <h1>URL Shortener</h1>
      <UrlForm onSuccess={handleSuccess} />
      <UrlList urls={shortUrls} />
    </div>
  );
}