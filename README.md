# azure-webanalytics-client

A web client for viewing the data collected by the
[azure-webanalytics](https://github.com/teggno/azure-webanalytics) application.

It is a **progressive web application** (PWA), hence can be installed on a
phone's home screen.

## Features

- Lets the user enter the base URL of her API that provides the analytics data.
  This is the private installation of
  [azure-webanalytics](https://github.com/teggno/azure-webanalytics). The URL is
  stored in the browser's LocalStorage.
- Displays a table with URLs in the first and the number of page views in the
  second column. The table is sorted descending by the number of page views. It
  displays the page views of the previous 24 hours.

## Roadmap

- New view: Diagram with total of all pages over time (time on x axis)
- Let the user choose which measures to display: sessions, page views, visitors
- Add a new column to the table in the page views page. The new column should
  display the number of page views on the previous day ([today - 2; today - 1])
- Add a sparkline column to the table in the page views page.
- Daily push notification in the progressive web app.
