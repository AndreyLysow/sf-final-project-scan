import "./App.css";
import Footer from "./components/Footer/footer";
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
