import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from './ProtectedRoute.jsx';
import PublicRoute from './PublicRoute.jsx';
import { PublicRoutes, ProtectedRoutes } from '../constants/routesConfig.jsx';

function AppRoutes() {
  
  function createRoute(routeObj, Component) {
    return(
      <Route key={routeObj.path} path={routeObj.path} element={
        <Component>
          {routeObj.element}
        </Component>
      }/>
    );
    
  }
  
  return(
    <Routes>
      
      {
        PublicRoutes.map((route) => createRoute(route, PublicRoute))
      }
      
      {
        ProtectedRoutes.map((route) => createRoute(route, ProtectedRoute))
      }
      <Route path="*" element={<Navigate to="/" replace/>}/>
    </Routes>
  );
}

export default AppRoutes;