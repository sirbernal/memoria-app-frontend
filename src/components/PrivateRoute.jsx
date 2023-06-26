import { Route, Navigate } from 'react-router-dom';

export function PrivateRoute({ children, isAuthenticated, ...rest }) {
  return (
    <Route
      {...rest}
      element={
        isAuthenticated ? (
          children
        ) : (
          <Navigate to="/login" replace state={{ from: rest.path }} />
        )
      }
    />
  );
}