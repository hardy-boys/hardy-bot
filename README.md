# Hardy-Bot
A dashboard for loading real-time data widgets to an IoT display

<img width="1680" alt="hardy-bot" src="https://user-images.githubusercontent.com/15896597/43548214-09c3e002-95a3-11e8-8d78-1d56dc893607.png">

**Tools/Technologies Used**

* [React](https://reactjs.org/)
* [Redux](https://redux.js.org/)
* [Material UI](https://material-ui.com/)
* [Node.js](https://nodejs.org/en/) + [Express](http://expressjs.com/)
* [PostgreSQL](https://www.postgresql.org/) + [Sequelize](http://docs.sequelizejs.com/)
* [Socket.io](https://socket.io/)
* [Webpack](https://webpack.js.org/)
* [Streamdata.io](https://streamdata.io/)


## Authors
- [**Raphael Croce**](https://github.com/riffryder)
- [**Matt Lee**](https://github.com/mattacus)
- [**Trevor Sasaki**](https://github.com/Trevsaki)

# Setup

You will to need to register for a few APIs for the widgets, as well as Streamdata.io (link above), a real-time cache proxy allowing you to poll JSON REST APIs and push updates to your dashboard and IoT display. In Streamdata, you will then need to add you

Examples of the APIs we are using:
* Weather: [OpenWeatherMap](https://openweathermap.org/api)
* Stocks: [IEX Group](https://iextrading.com/developer/)
* News: [News API](https://newsapi.org/)
* Traffic: [Bing Maps](https://msdn.microsoft.com/en-us/library/ff701717.aspx)

Run:

```sh
$ npm install

```

Create a .env in the root directory with the following variables:

```sh

```

Also, there is a (Maps API - Mapping) API Key embedded in the Google Maps React component that is restricted and will need to be replaced.

Scripts:
```sh
$ npm run server-dev #for server 
$ npm run react-dev  #for client
```
# Usage
Login or Sign up (currently, it is just using site-wide auth).

## Device Dashboard:
Gives an overview of device information.  Current Particle cloud status (online/offline), memory usage, and currently loaded profile are shown, along with graphs of uptime and network strength.
<img width="1680" alt="hardybot2" src="https://user-images.githubusercontent.com/15896597/43609033-83205726-9668-11e8-9ece-9f1d496a3711.png">

## Device Profiles:
Allows the user to create/delete/update and deploy widget profiles to the Particle device.
<img width="1679" alt="hardybot4" src="https://user-images.githubusercontent.com/15896597/43609347-56366e5c-9669-11e8-985c-67ac86a9f14d.png">

## Widgets Store:
Widget dashboard providing widget overview, real time information, and widget configuration.  Entering this view also will start widget data streaming to the device. 
<img width="1680" alt="hardybot5" src="https://user-images.githubusercontent.com/15896597/43609499-cc2be2e0-9669-11e8-9178-aa668056e599.png">

## Device Location:
Show device location (not fully implemented at the moment)

## User Profile:
View/update user profile information.
<img width="1679" alt="hardybot6" src="https://user-images.githubusercontent.com/15896597/43609687-52a78d7e-966a-11e8-869f-ce249541674c.png">

