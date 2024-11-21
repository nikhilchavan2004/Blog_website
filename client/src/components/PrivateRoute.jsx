import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function PrivateRoute() {
  const { currentUser } = useSelector((state) => state.user);

  // If there's a currentUser, render the child routes (Outlet)
  // If not, redirect to sign-in page
  return currentUser ? <Outlet /> : <Navigate to="/signin" />;
}