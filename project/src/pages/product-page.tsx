import Header from '../components/header/header';
import ProductContent from '../components/product-content/product-content';
import Footer from '../components/footer/footer';

function ProductPage(): JSX.Element {
  return (
    <>
      <Header/>
      <ProductContent/>
      <a className="up-btn" href="#header">
        <svg width={12} height={18} aria-hidden="true">
          <use xlinkHref="#icon-arrow2" />
        </svg>
      </a>
      <Footer/>
    </>);
}

export default ProductPage;
