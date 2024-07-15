import React from 'react';
import {
  TableCell,
  TableRow,
  Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';


interface Cover {
  id: number;
  url: string;
}

export interface VideoGameProps {
  cover: Cover;
  name: string;
  summary: string;
}

// eslint-disable-next-line react/function-component-definition
const VideoGameRow: React.FC<VideoGameProps> = ({ cover, name, summary }) => (
  <TableRow>
    <TableCell>
      <Typography variant='body2'>
        {cover?.url != null && <Link to={`https:${cover.url.replace('/t_thumb/', '/t_cover_big/')}`}>{cover.url}</Link>}
      </Typography>
    </TableCell>
    <TableCell>
      <Typography variant='body2'>{name}</Typography>
    </TableCell>
    <TableCell>
      <Typography variant='body2' color='text.secondary'>
        {summary}
      </Typography>
    </TableCell>
  </TableRow>
);

export default VideoGameRow;
