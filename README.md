<h1 align="center">
    MyCart: Ecommerce Site
</h1>


# About

MyCart is an ecommerce site developed using the MERN stack (MongoDB, ExpressJS, ReactJS, Node.JS). It delivers an intuitive and streamlined shopping experience for buyers, while equipping sellers with vital tools to handle their inventory and transactions effectively.

## Features

- **User Registration:** MyCart allows users to register as customers or sellers, enabling a tailored shopping experience.

- **Cart System:** Customers can add products to their cart for easy checkout. The cart allows them to review and manage their selections before completing the purchase.

- **Product Search:** MyCart offers a search functionality where customers can find products by name or browse through categories such as Electronics, Clothes, Kitchen, and more.

- **Reviews and Ratings:** Customers can leave reviews and ratings (out of 5) for products they've purchased, providing valuable feedback for sellers and building trust within the community.

- **Seller Dashboard:** Sellers have access to a dedicated dashboard where they can manage their products, view sales data, and gain insights into their store's performance through data visualization.

- **Product Management:** Sellers can add products with detailed information and set their prices. They can also check which customers have added their products to their carts.

- **Order Tracking:** Sellers can monitor the products ordered by customers, helping them stay organized and fulfill orders efficiently.

## Technologies Used

- Frontend: React.js, Redux Toolkit, Styled Components
- Backend: Node.js, Express.js, JWT Token
- Database: MongoDB

<br>

# Installation

```sh
git clone https://github.com/sharan-1999/MyCart_Ecommerce_MERN.git
```
Open 2 terminals in separate windows/tabs.

Setting Up Backend - Open a new terminal 1
```sh
cd backend
npm install
npm run start
```

Create a file called .env in the backend folder.
Inside it write this :

```sh
MONGO_URL = mongodb+srv://Eshop:fXyGOcS8aO1DPcAi@atlascluster.gvpcocm.mongodb.net/

SECRET_KEY = 'secret-key'
```
Use your own MongoDB atlas link for MONGO_URL.

Setting Up frontend - Open a new terminal 2
```sh
cd frontend
npm install
npm run start
```
Now, navigate to `localhost:3000` in the browser to check our frontend application. 
While Backend API will be running at `localhost:5000`.
<br>

Create a file called .env in the frontend folder.
Inside it write this :

```sh
REACT_APP_BASE_URL = "http://localhost:5000"
```
<br>
# Error Solution

If you find/get any error while signing up new user, follow these steps to resolve it:

1. Open to the `src > redux > userHandle.js` file.

2. Add the below code after the import statements under `userHandle.js`:

```javascript
const REACT_APP_BASE_URL = "http://localhost:5000";
```

3. Replace all instances of `process.env.REACT_APP_BASE_URL` with `REACT_APP_BASE_URL`.

This issue might arise due the `.env` file at the frontend, which might work in some cases.
The above steps must resolve the error caused due to AXIOS while signing up new user.


