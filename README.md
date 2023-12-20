# The Peculiar Project
> Venture into Ransom Riggs' Peculiardom

![Licence](https://img.shields.io/github/license/kayleriegerpatton/peculiar-ui)
![Issues](https://img.shields.io/github/issues/kayleriegerpatton/peculiar-ui)

## About
This full stack, single page web application offers users ways of exploring the content of the [Peculiar Children book series](https://www.ransomriggs.com/books/) by Ransom Riggs.

Discover details about the books' peculiar characters, wander a map of all the known loop locations, and create custom characters with their own unique abilities.

This project uses many of the technologies I learned toward the end of my boot-camp training course, including GraphQL, React, and Apollo-Client as well as the Material-UI framework.

This is a work-in-progress side project I build simply for fun, and there are still a lot of unimplemented features, including a functioning map of locations, a fleshed-out user dashboard, and a search page for all characters. If you want to [contribute](#contributing), feel free!

### Table of Contents
- [Installation & Setup](#getting-started)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

### Additional Links
- [Backend API repo](https://github.com/kayleriegerpatton/peculiar-api)

## Getting Started
To get started, you'll need to clone this repo as well as the [backend API repo](https://github.com/kayleriegerpatton/peculiar-api).

Install the dependencies for both repos. Remember, this is a _very_ side project, so things are probably out of date! Update packages where needed.
```
npm install
```

Setup your MongoDB environment variables in a `.env` file according to the `.envEXAMPLE`:
```
DB_NAME=''
SECRET=''
```

Seed the database with the 12 main characters:
```
node src/seeds/index.js
```

Run both applications with:
```
npm run start
```
<!-- ## Usage -->
<!-- screenshots? user journeys -->
## Contributing
Want to contribute? Great! I hope you'll have some fun.

Follow the [setup instructions](#getting-started), then happy coding!

When you're ready to merge, [open a PR](https://github.com/kayleriegerpatton/peculiar-ui/compare).

## License
MIT License

<a href="https://docs.aws.amazon.com/" target="_blank" rel="noopener noreferrer"> <img src="https://docs.aws.amazon.com/assets/r/images/aws_logo_dark.png" alt="AWS" width="55" height="35"/> </a>
<a href="https://graphql.org/" target="_blank" rel="noopener noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/1119b9f84c0290e0f0b38982099a2bd027a48bf1/icons/graphql/graphql-plain.svg" alt="GraphQL logo" width="40" height="40"/> </a>
<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank" rel="noopener noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" alt="javascript" width="40" height="40"/> </a>
<a href="https://mui.com/" target="_blank" rel="noopener noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/1119b9f84c0290e0f0b38982099a2bd027a48bf1/icons/materialui/materialui-plain.svg" alt="Material UI logo" width="40" height="40"/> </a>
<a href="https://www.mongodb.com/" target="_blank" rel="noopener noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/1119b9f84c0290e0f0b38982099a2bd027a48bf1/icons/mongodb/mongodb-plain-wordmark.svg" alt="MongoDB" width="40" height="40"/> </a>
<a href="https://reactjs.org/" target="_blank" rel="noopener noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg" alt="React.js logo" width="40" height="40"/> </a>

