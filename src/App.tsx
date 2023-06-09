import React from "react";
import PageHeader from "./Common/PageHeader";
import { BrowserRouter } from "react-router-dom";
import PageNavigator from "./PageNavgation";

function App() {
  return (
    <BrowserRouter>
      <PageHeader />
      <PageNavigator />
    </BrowserRouter>
  );
}

export default App;
