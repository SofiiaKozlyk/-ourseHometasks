import React, { useEffect, useState } from 'react';
import './App.css';
import { fetchExhibits } from './api/exhibitActions';
import StipePage from './layouts/StipePage';
import { ExhibitPropsI } from './api/exhibitActions';

function App() {
  const [exhibits, setExhibits] = useState<ExhibitPropsI[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchExhibits()
      .then((response) => {
        setExhibits(response.data);
      })
      .catch((error) => {
        console.error("Error fetching exhibits:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <StipePage exhibits={exhibits} />
    </div>
  );
}

export default App;
