import React from 'react';
import PageNavigator from "./PageNavigator";
import {BrowserRouter} from "react-router-dom";
import PageHeader from "./Common/PageHeader";
import {store} from "./Store";
import {Provider} from "react-redux";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <main>
          <PageHeader/>
          <PageNavigator/>
        </main>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
