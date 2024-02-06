import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import NotFound from './pages/NotFound';
import Home from './pages/Home';
import Detail from './pages/Detail';
import "./style/scss/style.scss";
import reportWebVitals from './reportWebVitals';
import Search from './pages/Search';
import List from './pages/List';


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {path: '/', element: <Home />},
      {path: '/list/:option/:page', element: <List />},
      {path: '/detail/:id', element: <Detail />},
      {path: '/search', element: <Search />}
    ]
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
