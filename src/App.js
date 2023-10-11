import "./App.css";
import Header from "./modules/Header/header";
import Main from "./modules/Main/main";
import Footer from "./modules/Footer/footer";
import Error from "./modules/Error-page/error";
import Authorization from "./modules/Authorization/auth";
import Search from "./modules/Search/search";
import SearchResult from "./modules/SearchResult/searchResult";
import { BrowserRouter, Routes, Route } from "react-router-dom";

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
        <Header />
        <main>
          <Routes>
            {routesData.map((route, index) => (
              <Route key={index} path={route.path} element={route.element} />
            ))}
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;


