export default function UrlList({ urls }) {
  if (urls.length === 0) return null;

  return (
    <div className="url-list">
      <h2>Your Short URLs</h2>
      <ul>
        {urls.map((url, index) => (
          <li key={index}>
            <a href={url.shortLink} target="_blank" rel="noopener noreferrer">
              {url.shortLink}
            </a>
            <span>Expires: {new Date(url.expiry).toLocaleString()}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}