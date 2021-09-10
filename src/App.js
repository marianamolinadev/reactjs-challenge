import "./App.css";

import Search from "./Components/Search";
import Details from "./Components/Details";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { TotalViewsContext } from "./Contexts/TotalViewsContext";
import { SpinnerContext } from "./Contexts/SpinnerContext";
import { useState } from "react";
import Loading from "./Components/Loading";

function App() {
  const [totalViews, setTotalViews] = useState(0);

  const [spinner, setSpinner] = useState(false);

  return (
    <div id="app-container">
      <SpinnerContext.Provider value={{ spinner, setSpinner }}>
        {spinner && <Loading />}
        <TotalViewsContext.Provider value={{ totalViews, setTotalViews }}>
          <Router>
            <Switch>
              <Route path="/details/:id">
                <Details />
              </Route>
              <Route path="/">
                <Search />
              </Route>
            </Switch>
          </Router>
        </TotalViewsContext.Provider>
      </SpinnerContext.Provider>
    </div>
  );
}

export default App;
