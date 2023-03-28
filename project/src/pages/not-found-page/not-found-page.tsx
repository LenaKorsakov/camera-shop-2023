import { Link } from 'react-router-dom';
import { AppRoute } from '../../const/app-route';

import { WarningMessage } from '../../const/warning-message';

type NotFoundPageProps = {
  isCatalog?: boolean;
}

function NotFoundPage({isCatalog}: NotFoundPageProps): JSX.Element {
  return (
    <main>
      <div className="page-content">
        <section className="catalog">
          <div className="container">
            {isCatalog ? <h1 className="title title--h2">{WarningMessage.DataLoadingWarning}</h1> :
              <>
                <h1 className="title title--h2">{WarningMessage.IncorrectURL}</h1>
                <Link className="btn btn--purple" to={AppRoute.Main}>
          Вернуться к каталогу товаров
                </Link>
              </>}
          </div>
        </section>
      </div>
    </main>);
}

export default NotFoundPage;
