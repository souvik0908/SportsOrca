import React, { useEffect, useState } from 'react';

function App() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {

    fetch('http://localhost:5000/api/upcoming-games')
      .then(response => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(data => {
        if (data.response) {
          setMatches(data.response);
        }
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setError("Failed to fetch data");
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <h1>Upcoming Basketball Matches</h1>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      
        {matches.map(match => (
          <div key={match.id}>
            <div className='match'>
              <div className='match-details'>
            <img src={match.home_logo} alt={match.home_team} width="30" /> {match.home_team}
            </div>
            {' vs '}
            <div className='match-details'>
              <img src={match.away_logo} alt={match.away_team} width="30" /> {match.away_team}
            </div>
            {' on '}
            {new Date(match.date).toLocaleString()}
            </div>
          </div>
        ))}
      
    </div>
  );
}

export default App;
