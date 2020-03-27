# What's this project is about

- [Deployed Version](https://immense-thicket-08284.herokuapp.com/)

Real estate for sale & for rent website. Real estate website's visitors can easily filter their searches by type, location, price, and other predefined and custom criteria. Each property goes with a detailed description, community and property features, location, price, and a great image gallery.
Buyer of real estate can find contacts of seller. In case seller enabled online appointment feature for advertisement - buyer can fill form to make online appointment request.

# Technologies Used

- [React](https://reactjs.org/)
- [Redux](https://redux.js.org/)
- [Redux-Thunk](https://github.com/reduxjs/redux-thunk)
- [GitHub](http://github.com)
- [Express](https://expressjs.com/)
- [PostgresQL](https://www.postgresql.org/)
- [Docker](https://www.docker.com/)

# Basic Design mockups for project

#### Image of Single advertisement page

![Image of Single advertisement page](https://github.com/jkarelins/real-estate-site/blob/master/images/One_Advertisement_page.png?raw=true)

#### Image of Search Page

![Image of Search Page](https://github.com/jkarelins/real-estate-site/blob/master/images/Search_page.png?raw=true)

#### Top Visited Advertisements

![Top Visited Advertisements](https://github.com/jkarelins/real-estate-site/blob/master/images/Top_rated_real_estate.png?raw=true)

## Advertisements

#### Sell

- Flat
- House
- Garage/Storage
- New Projects

#### For Rent

- Flat
- House
- Garage/Storage

## Calendar to view Real Estate - make appointment

- Fill form
- Client & company receives e-mails
- If Company confirm appointment -> customer receive second email

---

# Datastructure for db

#### Advertisement

![Advertisement data structure](https://github.com/jkarelins/real-estate-site/blob/master/images/advert-data-table.png?raw=true)

-isForSale: Boolean,
-isForRent: Boolean,
-realEstateType: TEXT - can select from categories

-adress
-postcode
-city
-price
-Year of construction
-year of last renovation
-Living space
-Number of rooms/bedrooms/bathrooms
-description
-Status: Available/sold
-Energy label
-Heating
-Warm water - Boiler/central
-Location Description
-Garden - optional
-Type of parking

Extras(especially for rent):
e.g.:
optical internet
free parking
city view/nature view / cannal view
air conditioner
bath

## User

username: TEXT,
password: TEXT,
email: TEXT,
phoneNumber: Text,

#### User roles

![User Roles](https://github.com/jkarelins/real-estate-site/blob/master/images/user-roles-updated.png?raw=true)

## Calendar

Used to make a new appointment:

Each calendar event has:
-hasOne Customer
-hasOne Seller
-date: Date
-time: time
-message: TEXT
-customer PhoneNumber
-customer Email
-canceledByCustomer: Boolean
-canceledBySeller: Boolean

# Abbreviations

RE - real estate
