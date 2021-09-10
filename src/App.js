import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useState } from "react";
import "./App.css";
import Details from "./Components/Details";
import Loading from "./Components/Loading";
import Search from "./Components/Search";
import { VideoViewsContext } from "./Contexts/VideoViewsContext";
import { SpinnerContext } from "./Contexts/SpinnerContext";

function App() {
  // Used to save last watched video and to have a total views counter
  const [videoViews, setVideoViews] = useState({ count: 0, lastViewed: null });
  // Used to show or hide a loader spinner
  const [spinner, setSpinner] = useState(false);

  return (
    <div id="app-container">
      <SpinnerContext.Provider value={{ spinner, setSpinner }}>
        {spinner && <Loading />}
        <VideoViewsContext.Provider value={{ videoViews, setVideoViews }}>
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
        </VideoViewsContext.Provider>
      </SpinnerContext.Provider>
    </div>
  );
}

export default App;
