import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Homepage from "./pages/home-page"
import MovieDetailPage from "./pages/movie-detail-page"
import AuthCallback from "./pages/auth-callback"
import FavoritePage from "./pages/favorite-page"
import WatchlistPage from "./pages/watchlist-page"
import ProtectedRoute from "./pages/protected-route"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />,
    errorElement: <div>Error loading page</div>,
  },
  {
    path: "/movie/:id",
    element: <MovieDetailPage />,
    errorElement: <div>Error loading movie details</div>,
  },
  {
    path: "/auth/callback",
    element: <AuthCallback />,
  },
  {
    path: "/favorite",
    element: <ProtectedRoute />,
    children: [
      {
        path: "",
        element: <FavoritePage />,
      },
    ],
  },
  {
    path: "/watchlist",
    element: <ProtectedRoute />,
    children: [
      {
        path: "",
        element: <WatchlistPage />,
      },
    ],
  }
])

const App = () => {
  return <RouterProvider router={router} />
}

export default App