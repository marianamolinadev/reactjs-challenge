import "./App.css";

import Search from "./Components/Search";
import { TotalViewsContext } from "./Contexts/TotalViewsContext";
import { SpinnerContext } from "./Contexts/SpinnerContext";
import { useState } from "react";
import Loading from "./Components/Loading";

function App() {
  const [totalViews, setTotalViews] = useState(0);
  const [spinner, setSpinner] = useState(false);

  return (
    <div>
      <SpinnerContext.Provider value={{ spinner, setSpinner }}>
        {spinner && <Loading />}
        <TotalViewsContext.Provider value={{ totalViews, setTotalViews }}>
          <Search />
        </TotalViewsContext.Provider>
      </SpinnerContext.Provider>
    </div>
  );
}

export default App;
