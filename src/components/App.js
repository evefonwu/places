import React from "react";
import PlaceList from "./PlaceList";
import CreatePlace from "./CreatePlace";
import PlaceDetails from "./PlaceDetails";

import Header from "./Header";
import { Switch, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <div>
        <Header />
        <div>
          <Switch>
            <Route exact path="/" component={PlaceList} />
            <Route exact path="/create" component={CreatePlace} />
            <Route path="/place/:id" component={PlaceDetails} />
          </Switch>
        </div>
      </div>
    </div>
  );
}

export default App;
