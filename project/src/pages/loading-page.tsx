import {SpinnerRoundFilled } from 'spinners-react';
import './loading-page.css';

function LoadingPage(): JSX.Element{
  return(
    <main className="page-content decorated-page">
      <div className="container">
        <div className="loader">
          <SpinnerRoundFilled color="#7575e2" size="100"/>
        </div>
      </div>
    </main>
  );
}

export default LoadingPage;
