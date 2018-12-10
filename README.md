# RIKE

#### 40% of food in the United States is never eaten, yet 1 in 8 Americans struggles with food insecurity.
RIKE is taking a small step to bridge this disconnect by connecting restaurants with surplus food and soup kitchens that are equipped to distribute it.

## Getting Started

### Prerequisites
The following applications must be installed:
- [Node.js](https://nodejs.org/)
- [PostgreSQL](https://www.postgresql.org/download/)

### Local Installment
To run the app locally, follow these steps:
1. Clone this GitHub repo in the directory of your choice.
2. Navigate into the rike-app directory (`cd rike-app`).
3. Install dependencies (`npm install` or `yarn`).
4. Create a .env file with `SERVER_SESSION_SECRET=`[a twenty-character, randomly generated, alphanumeric string].
5. Create a PostgreSQL database on `localhost` called `rike`.
6. In the `rike` database, run the queries in the `database.sql` file.
7. Almost there! Back in your terminal, type `npm run server` or `yarn run server` (depending on which package manager you used to install dependencies).
8. Open another terminal (and `cd` to your `rike-app` directory). Type `npm run client` or `yarn run client`.
9. The app should open in a browser window.

### Local Setup
#### Donor Registration
1. Click the user icon on the far right side of the navbar.
2. Click the `REGISTER` button at the bottom of the form that appears.
3. Fill out the fields on the user registration form. Use `Location code` **bbc27b5a-50f4-4f2d-91e1-7475a99f3b4a**. (The location code must match the `loc_id` of one of the locations in the PostgreSQL database.)
4. Click the `REGISTER` button.
5. You should be taken to a user homepage with options to view your org's donations or create a new donation.

#### Rescuer Registration
1. Follow the steps above, but use `Location code` **b11d693f-9d86-4552-8f05-2dc82ce3e4e2**.
2. Upon registration, you should be taken to a user homepage with options to view your org's rescues or browse available donations.

### Features
Like all apps, this one is a work in progress. Feel free to create issues or pull requests. (No promises on turnaround, though ... sorry!)

## Future Features
In no particular order, features I would like to add include:
- [ ] Allow donors to see information about the rescuer (org and contact person) of a donation.
- [ ] Allow donors to edit donations.
- [ ] Allow rescuers to add notes to their pickup information.
- [ ] Allow users to sort and filter lists.
- [ ] Add location features.