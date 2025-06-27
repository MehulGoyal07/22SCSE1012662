import { Log } from '../services/logger';

export default function AnalyticsCard({ data }) {
  if (!data) {
    Log("error", "component", "No data provided to AnalyticsCard");
    return <div className="error">No analytics data available</div>;
  }

  return (
    <div className="analytics-card">
      <h3>Analytics for: {data.shortLink || data.shortCode}</h3>
      <div className="stats-grid">
        <div className="stat-item">
          <span className="stat-label">Original URL:</span>
          <a href={data.originalUrl} target="_blank" rel="noopener noreferrer">
            {data.originalUrl}
          </a>
        </div>
        <div className="stat-item">
          <span className="stat-label">Created:</span>
          <span>{new Date(data.createdAt).toLocaleString()}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Expires:</span>
          <span>{new Date(data.expiry).toLocaleString()}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Total Clicks:</span>
          <span>{data.totalClicks || 0}</span>
        </div>
      </div>

      {data.clicks && data.clicks.length > 0 && (
        <div className="click-history">
          <h4>Click History</h4>
          <table>
            <thead>
              <tr>
                <th>Timestamp</th>
                <th>Location</th>
                <th>Referrer</th>
              </tr>
            </thead>
            <tbody>
              {data.clicks.map((click, index) => (
                <tr key={index}>
                  <td>{new Date(click.timestamp).toLocaleString()}</td>
                  <td>{click.country || 'Unknown'}</td>
                  <td>{click.referrer || 'Direct'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}