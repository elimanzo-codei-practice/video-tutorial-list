/* eslint-disable react/jsx-props-no-spreading */
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { debounce } from 'lodash';
import {
  Grid,
  Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
} from '@mui/material';
import ListPage from '../../components/Common/ListPage';
import { allItems } from '../../utils/NavTree';
import VideoGameRow, { VideoGameProps } from '../../components/VideoGameRow/VideoGameRow';


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

export default function GameTable() {
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

  const renderTable = (items: VideoGameProps[]): JSX.Element => (
    <Grid item xs={12}>
      <TableContainer component={Paper} style={{ maxWidth: '100%' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Cover URI</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Summary</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item) => (
              <VideoGameRow {...item} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  );


  return (
    <ListPage
      headerItem={allItems.gamesTable}
      list={data ?? []}
      isLoading={isLoading}
      error={error}
      currentPage={currentPage}
      handleNextPage={handleNextPage}
      handlePrevPage={handlePrevPage}
      searchQuery={searchQuery}
      handleSearchChange={handleSearchChange}
      renderItems={renderTable}
    />
  );
}
