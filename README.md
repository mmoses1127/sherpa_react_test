# README: Sherpa React Test

# Overview

This application allows has basic authentication (using protected routes)
for two users who will login to do two different sets of
controls and set settings intervals for either temperature or fan speed.

- User A will create a list of temperatures in a 24h period.
- Each list item will contain 3 values: Start time, end time, temperature
(accuracy of 0.1) value (no lower than 0, no higher than 100).
- User A can delete, edit and add new list items.
- User A can also switch the temperature view from Fahrenheit to Celsius in a
separate page.
- Consider the server only takes in measurements in Celsius.
- User B will create a list of fan intensities in a 24h period.
- Each list item will contain 3 values: Start time, end time, intensity value (low,
medium, high).
- User B can delete, edit and add new list items.
- User B can also switch the intensity from [low, medium, high] to [1, 2, 3].
- Consider the server only takes in number values [1,2,3].

# Deployment

1. This application features a React/Redux frontend and a Ruby on Rails backend linked at a PostgreSQL database.
2. The frontend folder is contained in the root, which is the backend of the application. 
3. Version and dependency information is available in the root Gemfile (Ruby) and the frontend folder package.json (JS).
4. In a terminal at the root, make sure that you have Ruby and rbenv, then 'bundle install'. 
5. Once you have all the Ruby dependencies installed, make sure your database is running ('sudo service postgresql start' if using Postgres).
6. Run 'rails s' to start the Rails server (this app is set to use Puma on port 5000).
7. Run 'rails db:create' then 'rails db:migrate' then 'rails db:seed' to create, structure, and populate the database with users and user types.
8. Cd into the 'frontend' folder, make sure your environment has Node Version Manager (nvm) and Node Package Manager (npm), then install JS dependencies with 'npm install'.
9. Once you have all dependencies installed, run 'npm start'. This should serve the site to your browser at 'http://localhost:3000/' (the frontend is using port 3000).

# Login

Sign up is currently disabled but below are the login credentials for the two user types:

- User A: email: a@test.io password: 'password'
- User B: email: b@test.io password: 'password'

# Development Notes

## Styling

- Styling is accomplished via utility classes, using the [TailwindCSS](https://tailwindcss.com/) framework.
- Pixel-perfect rendering was not prioritized in this project - clarity and functionality were made a priority.
- A few default settings and variables are declared in the index.css file.

## Optional Functions

A few commented-out functions remain in the code base. These are functions I would recommend to improve the application, but were not explicitly required by the client.

- I suspect that allowing fan speed or temperature interval settings that overlap each other would cause unpredictable results. Therefore, a custom validation to prevent overlapping entries is included (location: 'temperature_setting.rb' and 'speed_setting.rb').

- A user signup thunk action is included in case signup functionality is desired (location: 'session.js').

- A validation requiring end times to be after start times when creating or updating setting items has been included and is active due to its logical importance (location: 'temperature_setting.rb' and 'speed_setting.rb').

## Errors and Validations

Where possible, validations are present and redundant both on the backend (model validations and DB validations) and on the frontend (alert and returns). Login errors are rendered to the user as text on the web page, while server errors are made avilable via console.log for discrete information.

## Contact

- Developer: Michael Moses
- GitHub: github.com/mmoses1127
- Email: [mmoses1127@gmail.com](mmoses1127@gmail.com)
- Favorite Color: green :green_heart:
