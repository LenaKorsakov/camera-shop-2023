import {SpinnerRoundFilled } from 'spinners-react';
import './loading-page.css';

function LoadingPage(): JSX.Element{
  return(
    <main className="page-content">
      <div className="container">
        <div className="loader" data-testid = 'loader'>
          <SpinnerRoundFilled color="#7575e2" size="150"/>
        </div>
      </div>
    </main>
  );
}

export default LoadingPage;
