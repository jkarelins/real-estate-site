# What's this project is about

Real estate for sale & for rent website. Real estate website's visitors can easily filter their searches by type, location, price, and other predefined and custom criteria. Each property goes with a detailed description, community and property features, location, price, and a great image gallery.
Buyer of real estate can find contacts of seller. In case seller enabled online appointment feature for advertisement - buyer can fill form to make online appointment request.

# Technologies Used

- React
- Redux
- Redux-Thunk
- Github
- Express
- PostgresQL

# User roles

Admin
-full site management, adds management & user management -> admin panel

Real Estate agency
-Can add multiple adds
-can have multiple accounts for real estate agents

Development Company
-Can add news / Can publish New Projects

Seller of one RE
-can sell or rent one RE for free each month, also can edit existing advertisement, but can not change adress

Buyer of RE
-can find all real estates
-make appointment to view
-get contacts email / phone number of seller
-see all details of advertisement

# Advertisements

Sell
-Flat
-House
-Garage/Storage
-New Projects

For Rent
-Flat
-House
-Garage/Storage

# Calendar to view Real Estate - make appointment

-Fill form
-Client & company receives e-mails
-If Company confirm appointment -> customer receive second email

---

# Datastructure for db:

# Advertisement

isForSale: Boolean,
isForRent: Boolean,
realEstateType: TEXT - can select from categories

adress
postcode
city
price
Year of construction
year of last renovation
Living space
Number of rooms/bedrooms/bathrooms
description
Status: Available/sold
Energy label
Heating
Warm water - Boiler/central
Location Description
Garden - optional
Type of parking

Extras(especially for rent):
e.g.:
optical internet
free parking
city view/nature view / cannal view
air conditioner
bath

# User

username: TEXT,
password: TEXT,
email: TEXT,
phoneNumber: Text,

-Roles
isAdmin: Boolean,
isREAgency: Boolean,
isREManager: Boolean,
isREAgent: Boolean,
isDevCompany: Boolean,
isPrivatePerson: Boolean,

# Calendar

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
