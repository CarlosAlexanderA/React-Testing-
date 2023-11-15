import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import algoliasearch from 'algoliasearch/lite.js';
import { InstantSearch } from 'react-instantsearch-hooks';

// a4398aa69f26de2fd0c4209ff113a4f9
// 9b124334feae2d987c4747aa8fb31eb9
// const searchClient = algoliasearch(
//   'latency',
//   '9b124334feae2d987c4747aa8fb31eb9'
// );

const searchClient = algoliasearch(
  'TKVYI1ZYJO',
  '9b124334feae2d987c4747aa8fb31eb9'
);

const INDEX_NAME = 'autocomplete_twiiter_accounts';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <InstantSearch
      searchClient={searchClient}
      indexName={INDEX_NAME}
      supressExperimentalWarning
    >
      <App />
    </InstantSearch>
  </React.StrictMode>
);
