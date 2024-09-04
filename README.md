<h1 align="center">
    MyCart: Ecommerce Site
</h1>


# About

MyCart is an ecommerce site developed using the MERN stack (MongoDB, ExpressJS, ReactJS, Node.JS). It delivers an intuitive and streamlined shopping experience for buyers, while equipping sellers with vital tools to handle their inventory and transactions effectively.

## Features

- **User Registration:** MyCart allows users to sign up as either customers or sellers, providing a personalized shopping experience tailored to their role.

- **Cart System:** Customers can add items to their cart for an easier checkout experience, with options to review and adjust their selections before completing their purchase.

- **Product Search:** MyCart features a search tool that enables customers to find products by name or browse categories such as Electronics, Clothing, and Kitchenware.

- **Reviews and Ratings:** Customers can leave reviews and rate products on a 5-star scale, offering valuable feedback to sellers and enhancing community trust.

- **Seller Dashboard:** Sellers have access to a dedicated dashboard to manage their inventory, track sales metrics, and analyze store performance using data visualization tools (note: actual numbers are not yet displayed).

- **Product Management:** Sellers can their list products with comprehensive descriptions and set their prices with discounts, while also tracking which customers have added their items to their shopping carts.

- **Order Tracking:** Sellers can monitor customer orders to stay organized and efficiently manage the fulfillment process.

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


