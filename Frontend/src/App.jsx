import React, { useEffect } from "react";
import {
  Routes,
  Route,
  useNavigationType,
  useLocation,
} from "react-router-dom";
import Frame from "./pages/Frame";
import Signup from "./pages/Signup";
import Stocks from "./pages/Stocks";
import Login from "./pages/Login";
import Virtual from "./pages/Virtual";
import Transactions from "./pages/Transactions";

function App() {
  const action = useNavigationType();
  const location = useLocation();
  const pathname = location.pathname;
  const symbols = ['META', 'AAPL', 'GOOGL', 'IBM', 'MCD', 'TSLA', 'AMZN', 'MSFT', 'NFLX', 'KO'];

  useEffect(() => {
    if (action !== "POP") {
      window.scrollTo(0, 0);
    }
  }, [action, pathname]);

  useEffect(() => {
    let title = "";
    let metaDescription = "";

    switch (pathname) {
      case "/":
        title = "";
        metaDescription = "";
        break;
    }

    if (title) {
      document.title = title;
    }

    if (metaDescription) {
      const metaDescriptionTag = document.querySelector(
        'head > meta[name="description"]'
      );
      if (metaDescriptionTag) {
        metaDescriptionTag.content = metaDescription;
      }
    }
  }, [pathname]);

  return (
    <Routes>
      <Route path="/" element={<Frame />} />
      <Route path="Signup" element={<Signup />} />
      <Route path="Stocks" element={<Stocks symbols={symbols} defaultSymbol="META" />} />
      <Route path="Virtual" element={<Virtual/>}/>
      <Route path="Login" element={<Login/>}/>
      <Route path="Transactions" element={<Transactions/>}/>
    </Routes>
  );
}

export default App;
