# The Quarantine Streaming Source

[Demo](https://katiebullock.github.io/quarantine-streaming/)

The Quarantine Streaming Source is a site designed to help people figure out what to watch while they are staying home and protecting themselves and others during these COVID times. It makes calls to [The Movie DB](https://www.themoviedb.org/) to gather this week's top trending movies and tv shows and where they're streaming. If the user already has a movie or tv show in mind, they can also search right on The Quarantine Streaming Source site.

## Summary

- [Built With](#built-with)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Authors](#authors)
- [Acknowledgments](#acknowledgments)

## Built With

- [Node.js](https://nodejs.org/en/)
- [Webpack](https://webpack.js.org/)
- [Babel](https://babeljs.io/)

## Getting Started

These instructions will get a copy of the project up and running on your local machine.

### Prerequisites

Node.js is a JavaScript runtime engine. You will need to have the latest stable version of Node installed. If you already have Node.js installed, type `node -v` in your terminal. If you do not have Node installed, take a look at the next section to see how to install it.

This project provides an API Key in the code. For security reasons, this isn't always the case. You may need to register for the API and include the API Key in the code.

### Installing

1. Clone the repository:

   `git clone https://github.com/KatieBullock/quarantine-streaming`

2. Install NPM packages:

   `npm install`

3. Run Webpack:

   `npm run start`

### Registering for the API

1. Get a free API Key at [The Movie DB](https://www.themoviedb.org/documentation/api).

2. Enter your API Key in `apiKey.js`:

   `const API_KEY = "REPLACE KEY";`

## Usage

The Quarantine Streaming Source updates regularly to provide the user the latest trending media. By clicking the arrow buttons in each section, the user can page through the hottest movies and shows. When she finds one she's interested in, she can click in the dropdowns to see where she can buy it, rent it, or stream it. If she clicks on the title or poster image, she can visit [The Movie DB](https://www.themoviedb.org/) to learn more about her choice. The user can also search at the bottom of the page. This will provide her with links to more information on The Movie DB site.

## Authors

- **Katie Bullock** - _Developed App_ -
  [KatieBullock](https://github.com/KatieBullock)

## Acknowledgments

- Thank you to Matina Patsos and Jamal Taylor with Albany Can Code for guidance and support on this project.
- Thank you to [The Movie DB](https://www.themoviedb.org/) for access to the API.
