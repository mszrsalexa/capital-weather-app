# CapitalWeatherApp

This Angular project is designed to display weather information for different EU capital cities. It utilizes [Angular CLI](https://github.com/angular/angular-cli) version 17.0.3.

## Getting started

To run this project locally, make sure you have Node.js and npm installed. The latest LTS version is recommended. You can download the latest LTS version from [Node.Js website](https://nodejs.org/).

### Installing Dependencies

Navigate to the project root directory and run the `npm i` command to install the necessary dependencies.

### Setting up API keys

To use Google Maps (Distance Matrix API, Maps JavaScript API) and OpenWeather APIs in this Angular project, you need to set up API keys. Follow the steps below:

1. Google Maps API Key

   1. Go to the [Google Cloud Console](https://console.cloud.google.com/).
   2. Create a new project or select an existing project.
   3. Navigate to the "APIs & Services" > "Credentials" section.
   4. Create a new API key.

2. OpenWeather API Key

   1. Go to the [OpenWeatherMap API](https://openweathermap.org/appid) and sign up for an account.
   2. Once logged in, navigate to the API keys section.
   3. Generate a new API key.

3. Create a `src/environments/environment.ts` file in your Angular project.

```typescript
export const environment = {
  production: false,
  googleMapsApiKey: "YOUR_GOOGLE_MAPS_API_KEY",
  openWeatherApiKey: "YOUR_OPENWEATHER_API_KEY",
};
```

4. Replace `YOUR_GOOGLE_MAPS_API_KEY` and `YOUR_OPENWEATHER_API_KEY` with the respective API keys obtained in steps 1 and 2.

### Development Server

Start the development server with the `npm run start:proxy` command.

Navigate to `http://localhost:4200/` in your web browser to view the application.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
