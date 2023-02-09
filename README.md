# Marathon Planner

This is an application built in VueJS to search YouTube videos and organize a watching schedule.

## Stack

- Vue 3
- Vuetify
- Vite

## Details

The idea behind this app is to allow an user to search on YouTube's APi and get the following information:

- First 200 videos in the search result;
- Top 5 words used in titles;
- Top 5 words used in descriptions
- A Schedule of videos to watch each day;

### Most used words algorithm

The algorithm for getting the top used words uses the following criteria

-> removes special characters (\_,!,@,etc) and links

-> clear spaces

-> remove words smaller than 3 characters

### Schedule

To create the schedule, the app follows these rules:

- The video cannot be longer than the longest available time provided by the user
- If the video duration is greater than a specific day available time, but it's still smaller than the highest available, it'll be allocated on the next available day
- The user can watch as many videos as possible in a day as long as the available time limit is respected

## Examples

![Searching for youtube videos](/docs/images/search-with-results.png "Search")
![User availability](/docs/images/availability-form.png "Availability")
![Watching schedule](/docs/images/schedule.png "Schedule")

## Running locally

Clone this repo on your local machine, then run the following command to install the dependencies

```bash
yarn
```

Before starting the project locally, you need to get an API KEY to be able to consume YouTube's API. [See this article](https://developers.google.com/youtube/registering_an_application) to understand how to create your onw credentials

After you get the API KEY, create a `.env` file on the root of the project and then copy the content from `.env.example` and paste your KEY

When you have everything ready, just run the following command to start the app

```bash
yarn dev
```

## Testing

To run the tests, use the following commands

```bash
yarn test
```

or

```bash
yarn coverage
```

### Improvements

this project can be improved by:

- Increasing test coverage;
- Improving UX of search and availability setup
- Improving code organization on the view components
