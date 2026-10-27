import Home from '../pages/Home/Home.jsx';
import Items from '../pages/Items/Items.jsx';
import ItemDetails from '../pages/Items/ItemDetails.jsx';
import Report from '../pages/Report/Report.jsx';

export const PublicRoutes = [
  { path: '/', element: <Home /> },
  { path: '/items', element: <Items /> },
  { path: '/items/:id', element: <ItemDetails /> },
  { path: '/report', element: <Report /> },
];

export const ProtectedRoutes = [];