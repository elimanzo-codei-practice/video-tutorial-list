import { Route, Routes } from 'react-router-dom';
import PrivateRoute from '../../components/Common/PrivateRoute';
import GameList from './GameList';
import GameTable from './GameTable';
import GameVideos from './GameVideos';


export default function Router() {
  return (
    <Routes>
      <Route path='games' element={<PrivateRoute outlet={<GameList />} />} />
      <Route path='games_table' element={<PrivateRoute outlet={<GameTable />} />} />
      <Route path='games_video_tutorials' element={<PrivateRoute outlet={<GameVideos />} />} />
    </Routes>
  );
}
