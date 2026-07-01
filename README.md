# Bolt Bucket — Unit 4 Project 4: DIY Delight

Bolt Bucket is a car personalizer built with React and a Render PostgreSQL database.
Users build a custom car by choosing an exterior color, roof, wheels, and interior,
watch the price update live, then save, view, edit, and delete their builds.

## Required Features

The following **required** functionality is completed:

- [x] **The web app uses React to display data from an API.**
- [x] **Data is supplied to the app using a Render PostgreSQL database.**
  - [x] The web app uses a Render PostgreSQL database.
  - [x] The PostgreSQL database includes a table (`cars`) that matches the data displayed in the web app.
- [x] **The web app has a well-structured user interface.**
  - [x] The app provides multiple customizable features (exterior, roof, wheels, interior).
  - [x] Each customizable feature has multiple options to choose from.
  - [x] The price of the car changes dynamically as different options are selected.
  - [x] The visual interface changes in response to a customizable feature (the car preview repaints when the exterior color changes).
- [x] **The web app allows the user to save a new custom car.**
  - [x] The user can submit their choices to save the car.
  - [x] Users can view a list of all submitted cars.
  - [x] Impossible feature combinations show an appropriate error message.
- [x] **Saved cars can be updated and deleted.**
  - [x] Users can edit a submitted car from the list view.
  - [x] Users can delete a submitted car from the list view.

## Stretch Features

The following **stretch** functionality is implemented:

- [x] User is alerted to impossible combos early — conflicting options are disabled in the form before submission.

## Video Walkthrough

Here's a walkthrough of implemented features:

<!-- Replace the line below with your own GIF (record with Kap, LICEcap, or ScreenToGif) -->
<img src='' title='Video Walkthrough' width='' alt='Video Walkthrough' />

## Notes

Describe any challenges encountered while building the app here.

## Project Structure

```
server/
  config/
    database.js      # Postgres connection pool
    reset.js         # drops + creates the cars table, seeds sample cars
  controllers/
    cars.js          # get / getById / create / update / delete
  routes/
    cars.js          # /api/cars routes
  server.js          # mounts /api/cars
client/src/
  services/CarsAPI.js       # fetch calls to the API
  utilities/calcprice.js    # option data + price calculation
  utilities/validation.js   # impossible-combo rules
  components/CarForm.jsx     # shared build form
  components/CarVisual.jsx   # SVG car that recolors with the exterior
  pages/                     # CreateCar, ViewCars, CarDetails, EditCar
```

## Getting Started

1. `npm install`
2. Create a **Render PostgreSQL** database and fill in `server/.env`:
   ```
   PGDATABASE="{Database}"
   PGHOST="{Hostname}.oregon-postgres.render.com"
   PGPASSWORD="{Password}"
   PGPORT={Port}
   PGUSER="{Username}"
   ```
3. Create the table and seed data: `cd server && node config/reset.js`
4. From the project root, run `npm run dev`
5. Open the client (Vite prints the URL, usually http://localhost:5173)

## License

    Copyright 2026

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
