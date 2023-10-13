import "./App.css"
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const Header = React.lazy(() => import("./modules/Header/header"));
const Main = React.lazy(() => import("./modules/Main/main"));
const Footer = React.lazy(() => import("./modules/Footer/footer"));
const Error = React.lazy(() => import("./modules/PageNotFound/error404"));
const Authorization = React.lazy(() => import("./modules/Authorization/auth"));
const Search = React.lazy(() => import("./modules/Search/search"));
const SearchResult = React.lazy(() => import("./modules/SearchResult/searchResult"));

const routesData = [
  { path: "*", element: <Main /> },
  { path: "/error", element: <Error /> },
  { path: "/auth", element: <Authorization /> },
  { path: "/search", element: <Search /> },
  { path: "/result", element: <SearchResult /> },
];

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <React.Suspense fallback={<div>Loading...</div>}>
          <Header />
          <main>
            <Routes>
              {routesData.map((route, index) => (
                <Route key={index} path={route.path} element={route.element} />
              ))}
            </Routes>
          </main>
          <Footer />
        </React.Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;
