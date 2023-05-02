## Camera Shop
# Camera Shop is a one-page application (SPA) that was made using REACT and REDUX.
Camera shop is an online supermarket where users can buy various cameras.
This web application has an easy and intuitive user-friendly interface that makes shopping even faster and more enjoyable!
## Description
I present to you the Camera Shop web application for searching, comparing, and buying various photo and video cameras.
The application is oriented to the Russian market, perhaps in the future, it will be translated into other languages.

The application has four active pages: a main page, a product catalog (with pagination), a page for each camera with details and product description and a basket page, where the purchase will take place. 
The main page has a simple familiar design: we can see that each product is presented as a card with two buttons: clicking on the bright purple button add the product to basket, clicking on the white one will take you to the page where you can find out details about the product.

![Main](https://github.com/LenaKorsakov/camera-shop-2023/blob/main/project/screenshots/main.png)

In the lower right corner of the catalog there is pagination, which allows the user to move between the pages of the catalog with 9 product cards on each page. Moving is available both by clicking on any of the available pages, and by clicking the "Next" and "Previous" buttons.

![Pagination](https://github.com/LenaKorsakov/camera-shop-2023/blob/main/project/screenshots/pagination.png)

The user has the ability to sort products in the catalog by price or by popularity (number of reviews) in ascending or descending order.
To do this, toggle buttons are provided.

![Sorting](https://github.com/LenaKorsakov/camera-shop-2023/blob/main/project/screenshots/sorting.png)

But the most interesting feature is the ability to filter cameras very precisely!
Firstly, the user can manually enter the desired price range (the price indicated in the placeholder will dynamically change depending on the selected filters, prompting the user for a possible range.
Secondly, other types of filters are available, made in the form of convenient checkboxes: by camera type, by user level, by category. Multiple selection of filters is possible.
Finally, we see that all selected filters (as well as sorting) are saved in the URL, allowing the user to send the link to the application to anyone, without losing the desired filters.

![Filtering](https://github.com/LenaKorsakov/camera-shop-2023/blob/main/project/screenshots/filter.png)

In the upper right corner of the home page is a form to search the product catalog. When the user enters the initial letters of the camera names into it, it will offer a drop-down list of suitable products from the catalog, clicking on any of which will take the user to the page of this product.
The feature of this form is its accessibility: it is possible to control, move through it and select the product using the keyboard.
And the drop-down list also can be scrolled through using the wheel of the computer mouse

![Search-form](https://github.com/LenaKorsakov/camera-shop-2023/blob/main/project/screenshots/search-form.png)

We go to the page with details about each product.
Firstly, tabs were used in the interface, switching between them you can read the characteristics of this product and its detailed description.
Secondly, a convenient slider has been implemented on this page, in which similar products are presented in the form of already familiar cards, the user can scroll through them and buy one of them.

![Product-page](https://github.com/LenaKorsakov/camera-shop-2023/blob/main/project/screenshots/tab-slider.png)

Below the slider is a block with product reviews. The user has the opportunity to click on the button: "Leave a review", then a convenient form for writing a review in the form of a pop-up will appear, in which validation is provided for the user to enter the necessary data.

![Review-form](https://github.com/LenaKorsakov/camera-shop-2023/blob/main/project/screenshots/review-form.png)

After submitting a valid comment, a popup will appear with information for the user that his review was successfully sent, and the review will immediately appear first in the general list of reviews.

![Reviews](https://github.com/LenaKorsakov/camera-shop-2023/blob/main/project/screenshots/review-form.png)

## Stack
- ReactJS,
- Typescript,
- React Router Dom,
- Redux Toolkit,
- Axios,
- Jest.

## Demo site
 <a href='https://camera-shop-korsakova.vercel.app'> GO TO SITE ---> </a>

## How to run app:

- Clone repository:
```bash
git clone git@github.com:LenaKorsakov/camera-shop-2023.git
```

- Install dependencies repository:

```bash
npm install
```

- Run application:

```bash
npm start
```

- Check tests
```bash
npm test
```
