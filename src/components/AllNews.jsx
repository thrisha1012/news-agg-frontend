import { React, useState, useEffect } from 'react';
import EverythingCard from './EverythingCard';
import Loader from './Loader';
import YouTubeNews from './YouTubeNews';
import axios from 'axios';

function AllNews() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [liveScores, setLiveScores] = useState([]);
  const [scoreLoading, setScoreLoading] = useState(true);

  function handlePrev() {
    if (page > 1) {
      setPage(page - 1);
    }
  }

  function handleNext() {
    if (page < 2) { 
      setPage(page + 1);
    }
  }

  let pageSize = 6;

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    fetch(`http://localhost:3000/all-news?page=${page}&pageSize=${pageSize}`)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Network response was not ok');
      })
      .then(myJson => {
        if (myJson.success) {
          setTotalResults(myJson.data.totalResults);
          setData(myJson.data.articles);
        } else {
          setError(myJson.message || 'An error occurred');
        }
      })
      .catch(error => {
        console.error('Fetch error:', error);
        setError('Failed to fetch news. Please try again later.');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [page]);

  // Fetch live cricket scores
  useEffect(() => {
    const fetchLiveScores = async () => {
      try {
        console.log('Fetching live scores...');
        const response = await axios.get('https://cricapi.com/api/cricket?apikey=9b5f6f74d9mshe0c829a2d3130f0p19bc70jsn8a161300709a');
        console.log('Response:', response);
        if (response.data) {
          setLiveScores(response.data); // Assuming the data is structured correctly
        }
      } catch (error) {
        console.error('Error fetching live scores:', error);
      } finally {
        setScoreLoading(false);
      }
    };

    fetchLiveScores();
}, []);


  return (
    <>
      {error && <div className="text-red-500 mb-4">{error}</div>}

      <div className='my-10 cards grid lg:place-content-center md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 xs:grid-cols-1 xs:gap-4 md:gap-10 lg:gap-14 md:px-16 xs:p-3'>
        {!isLoading ? data.map((element, index) => (
          <EverythingCard
            title={element.title}
            description={element.description}
            imgUrl={element.urlToImage}
            publishedAt={element.publishedAt}
            url={element.url}
            author={element.author}
            source={element.source.name}
            key={index}
          />
        )) : <Loader />}
      </div>

      {!isLoading && data.length > 0 && (
        <div className="pagination flex justify-center gap-14 my-10 items-center">
          <button disabled={page <= 1} className='pagination-btn text-center' onClick={handlePrev}>&larr; Prev</button>
          <p className='font-semibold opacity-80'>{page} of 2</p> {/* Limit to 2 pages */}
          <button className='pagination-btn text-center' disabled={page >= 2} onClick={handleNext}>Next &rarr;</button>
        </div>
      )}

      {/* Live Scores Section */}
      <div className='live-scores my-10'>
        <h2 className='text-xl font-bold'>Live Cricket Scores</h2>
        {scoreLoading ? <Loader /> : (
          <ul className='score-list'>
            {liveScores.map((match, index) => (
              <li key={index} className='score-item'>
                <p>{match.source} vs {match.opponent}</p>
                <p>Score: {match.score}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}

export default AllNews;
