/* eslint-disable react/jsx-props-no-spreading */
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { debounce } from 'lodash';
import { Grid } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import ListPage from '../../components/Common/ListPage';
import { allItems } from '../../utils/NavTree';
import VideoGame, { VideoGameProps } from '../../components/VideoGame/VideoGame';


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


export default function GameList() {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState(searchQuery);

  const { data, isLoading, error } = useQuery({
    queryKey: ['games', debouncedSearchQuery, currentPage],
    queryFn: () => fetchGames(debouncedSearchQuery, currentPage),
  });

  const debouncedSetSearchQuery = debounce((value: string) => {
    setDebouncedSearchQuery(value);
  }, 500);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearchQuery(value);
    debouncedSetSearchQuery(value);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const renderList = (items: VideoGameProps[]): JSX.Element => (
    <>
      {items.map((item) => (
        <Grid item xs={12} key={uuidv4()}>
          <VideoGame {...item} />
        </Grid>
      ))}
    </>
  );


  return (
    <ListPage
      headerItem={allItems.gamesList}
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
