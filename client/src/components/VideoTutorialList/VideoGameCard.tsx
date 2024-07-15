import React from 'react';
import {
  Card, CardContent, CardMedia, Typography,
} from '@mui/material';


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
const VideoGameCard: React.FC<VideoGameProps> = ({ cover, name, summary }) => (
  <Card sx={{
    maxWidth: 345, height: 400, overflow: 'hidden', marginTop: 10, boxShadow: 3, borderRadius: 2,
  }}
  >
    {cover != null && (
    <CardMedia
      component='img'
      height='140'
      image={`https:${cover.url.replace('/t_thumb/', '/t_cover_big/')}`}
      alt={`${name} cover`}
    />
    )}
    <CardContent sx={{ maxHeight: 260, overflowY: 'auto' }}>
      <Typography gutterBottom variant='h5' component='div'>
        {name}
      </Typography>
      <Typography variant='body2' color='text.secondary'>
        {summary}
      </Typography>
    </CardContent>
  </Card>

);

export default VideoGameCard;
