import { useEffect, useState } from 'react';
import AnalyticsCard from '../components/AnalyticsCard';
import { getUrlStats } from '../services/api';
import { Log } from '../services/logger';

export default function StatsPage() {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const demoStats = await getUrlStats('demo123');
        setStats([demoStats]);
        Log("debug", "page", "Successfully loaded analytics");
      } catch (error) {
        Log("error", "page", `Failed to load stats: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };
    
    fetchStats();
  }, []);

  if (loading) return <div className="loading">Loading analytics...</div>;

  return (
    <div className="stats-page">
      <h1>URL Analytics</h1>
      {stats.length > 0 ? (
        stats.map((statData, index) => (
          <AnalyticsCard key={index} data={statData} />
        ))
      ) : (
        <p>No analytics data available</p>
      )}
    </div>
  );
}