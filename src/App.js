import "./App.css";
import Header from "./modules/Header/header";
import Footer from "./modules/Footer/footer";
import { BrowserRouter } from "react-router-dom";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
         <Header />
        <Footer />
      </BrowserRouter>
    </div>
  );
}
export default App;
