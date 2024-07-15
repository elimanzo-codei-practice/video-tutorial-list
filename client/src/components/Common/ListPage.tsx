/* eslint-disable react/jsx-props-no-spreading */
import { Button } from '@mui/material';
import Grid from '@mui/material/Grid';
import { allItems } from '../../utils/NavTree';
import EmptyState from './EmptyState';
import PageHeader from './PageHeader';
import Spinner from './Spinner';


type Props<T> = {
  headerItem: (typeof allItems)[keyof typeof allItems];
  list: Array<T>;
  isLoading: boolean;
  error: Error | null;
  currentPage: number;
  handleNextPage: () => void;
  handlePrevPage: () => void;
  searchQuery: string;
  handleSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  renderItems: (items: T[]) => JSX.Element;
};

export default function ListPage<T>(props: Props<T>) {
  return (
    <>
      <PageHeader
        createLink={props.headerItem.createLink}
        Icon={props.headerItem.Icon}
        title={props.headerItem.name}
      />
      <input
        type='text'
        value={props.searchQuery}
        onChange={props.handleSearchChange}
        placeholder={`Search ${props.headerItem.name}...`}
        style={{
          padding: '10px',
          margin: '10px 0',
          width: 'calc(100% - 20px)', // Adjusts width considering padding
          borderRadius: '5px',
          border: '1px solid #ccc',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          outline: 'none',
          fontSize: '16px',
        }}
      />
      <Grid container spacing={2}>
        <RenderList {...props} />
      </Grid>
    </>
  );
}

function RenderList<T>(props: Omit<Props<T>, 'headerItem'>) {
  if (!props.list) {
    return null;
  }
  else if (props.error) {
    return (
      <div>
        Error:
        <br />
        {props.error.message}
      </div>
    );
  }
  else if (!Array.isArray(props.list) && props.isLoading) {
    return <Spinner />;
  }
  else if (props.list.length === 0) {
    return <EmptyState />;
  }
  else {
    return (
      <>
        {props.renderItems(props.list)}
        <PaginationControls
          currentPage={props.currentPage}
          handleNextPage={props.handleNextPage}
          handlePreviousPage={props.handlePrevPage}
          listLength={props.list.length}
        />
      </>
    );
  }
}

function PaginationControls({
  currentPage, handleNextPage, handlePreviousPage, listLength,
}:
  {
    currentPage: number,
    handleNextPage: () => void,
    handlePreviousPage: () => void,
    listLength: number
  }) {
  return (
    <div style={{ marginTop: '20px', textAlign: 'center' }}>
      <Button onClick={handlePreviousPage} disabled={currentPage === 1}>
        Previous
      </Button>
      <span style={{ margin: '0 10px' }}>
        Page
        {currentPage}
      </span>
      <Button onClick={handleNextPage} disabled={listLength < 10}>
        Next
      </Button>
    </div>
  );
}
