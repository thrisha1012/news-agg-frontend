import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import EverythingCard from './EverythingCard';
import Loader from './Loader';

function SearchResults() {
  const { query } = useParams();
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchSearchResults = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(`https://newsapi.org/v2/everything?q=${query}&page=${page}&pageSize=9&apiKey=ed5ff2570b684cc794663cdcae5a680c`);
        const data = await response.json();
        console.log("API Response:", data); // Debug log
        setSearchResults(data.articles);
      } catch (error) {
        console.error("Error fetching search results:", error);
        setError('Failed to fetch search results. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchSearchResults();
  }, [query, page]);

  return (
    <div>
      <Link to="/" className="back-button">Back to Home</Link>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <div className="text-red-500 mb-4">{error}</div>
      ) : (
        <>
          {searchResults.length === 0 && <div>No results found for "{query}".</div>}
          <div className='my-10 cards grid lg:place-content-center md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 xs:grid-cols-1 xs:gap-4 md:gap-10 lg:gap-14 md:px-16 xs:p-3'>
            {searchResults.map((element, index) => (
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
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default SearchResults;
