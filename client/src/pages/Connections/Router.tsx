import { Route, Routes } from 'react-router-dom';
import PrivateRoute from '../../components/Common/PrivateRoute';
import GameList from './GameList';
import GameTable from './GameTable';


export default function Router() {
  return (
    <Routes>
      <Route path='games' element={<PrivateRoute outlet={<GameList />} />} />
      <Route path='games_table' element={<PrivateRoute outlet={<GameTable />} />} />
    </Routes>
  );
}
