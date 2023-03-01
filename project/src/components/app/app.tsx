import { Route, Routes } from 'react-router-dom';

import BasketPage from '../../pages/basket-page/basket-page';
import MainPage from '../../pages/main-page/main-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import ProductPage from '../../pages/product-page/product-page';

import { AppRoute } from '../../const/app-route';

function App(): JSX.Element {
  return (
    <Routes>
      <Route
        path={AppRoute.Main}
        element={<MainPage/>}
      >
      </Route>
      <Route
        path={`${AppRoute.Catalog}:pageNum`}
        element={<MainPage/>}
      >
      </Route>
      <Route
        path={`${AppRoute.Product}/:id`}
        element={<ProductPage/>}
      >
      </Route>
      <Route
        path={AppRoute.Basket}
        element={<BasketPage/>}
      >
      </Route>
      <Route
        path={AppRoute.NotFound}
        element={<NotFoundPage/>}
      >
      </Route>
    </Routes>
  );
}

export default App;
