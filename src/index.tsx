import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import StarRating from './Components/StarRating';



function Test() {
  const [movieRating, setMovieRating] = useState(0)
  return (
    <>
      <StarRating color='green' maxRating={10} onMovieRating={setMovieRating} />
      <span>This move is rated as {movieRating}</span>
    </>
  )
}


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    {/* <App /> */}
    <StarRating maxRating={10} />
    <StarRating maxRating={10} color='blue' size='24' />

    <Test />

  </React.StrictMode>
);




