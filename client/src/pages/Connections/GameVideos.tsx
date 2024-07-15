/* eslint-disable react/jsx-props-no-spreading */
import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import ListPage from '../../components/Common/ListPage';
import { allItems } from '../../utils/NavTree';
import VideoGameCard, { VideoGameProps } from '../../components/VideoTutorialList/VideoGameCard';


const fetchGames = async (searchInput = '', page = 1) => {
  const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/games`, {
    method: 'POST',
    body: JSON.stringify({ searchInput, page }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Network response was not ok: ${response.statusText}`);
  }

  return response.json();
};


export default function GameVideos() {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState(searchQuery);

  const { data, isLoading, error } = useQuery({
    queryKey: ['games', debouncedSearchQuery, currentPage],
    queryFn: () => fetchGames(debouncedSearchQuery, currentPage),
  });

  useEffect(() => {
    const delay = searchQuery.length > 3 ? 300 : 500;
    const timeoutId = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, delay);

    return () => clearTimeout(timeoutId);
  }, [searchQuery, currentPage]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearchQuery(value);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const renderList = (items: VideoGameProps[]): JSX.Element => (
    <Grid container spacing={2}>
      {items.map((item) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={uuidv4()}>
          <VideoGameCard {...item} />
        </Grid>
      ))}
    </Grid>
  );


  return (
    <ListPage
      headerItem={allItems.gamesVideoTutorials}
      list={data ?? []}
      isLoading={isLoading}
      error={error}
      currentPage={currentPage}
      handleNextPage={handleNextPage}
      handlePrevPage={handlePrevPage}
      searchQuery={searchQuery}
      handleSearchChange={handleSearchChange}
      renderItems={renderList}
    />
  );
}
