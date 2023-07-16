import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import axios from 'axios';

function App() {
  return (
    <BrowserRouter>
      <h1>Hello React Router</h1>
      <Route path="/">
        <Home />
      </Route>
      <Route path="/about">
        <About />
      </Route>
    </BrowserRouter>
  );
}

function TweetList() {
  return <h2>TweetList</h2>;
}

function TweetForm() {
  return <h2>TweetForm</h2>;
}

export default App;