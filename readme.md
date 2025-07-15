# Ontario Politics Tracker

**Ontario Politics Tracker** is a full-stack web application that tracks, categorizes, and displays Ontario political news articles.\
It automatically fetches articles from major Canadian news outlets, categorizes them by topic, and presents them in a searchable and filterable interface.

Built with **Express.js**, **PostgreSQL**, **React**, and scheduled with **node-cron**.

---

## Features

- Automatically fetches recent Ontario-related articles every hour
- Stores and deduplicates articles in PostgreSQL
- Categorizes articles into predefined policy topics using keyword matching
- REST API to retrieve and filter articles
- Responsive React frontend with:
  - Search
  - Filters (news outlet, category, date)
  - Pagination

---

## Screenshot

![Home Page](/src-shared/screenshots/webpage.png)

---

## Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** PostgreSQL
- **Scheduler:** node-cron
- **Frontend:** React.js, Vite
- **Others:** dotenv, nodemon, CORS

---

## Project Structure

```
src-server/
├── app.js               # Express server entrypoint
├── db.js                # PostgreSQL connection pool setup
├── controllers/         # Route controllers
├── data/                # Category keywords for article classification
├── helpers/             # Utility functions & news fetcher
├── models/              # Database queries
├── routes/              # Express routes
├── scheduler/           # Cron jobs
├── services/            # Article refresh service

src-client/
├── src/                  # React components and data
    ├── App.jsx           # React app entrypoint
    ├── components/       # Layout, NewsFeed, SearchBar, Filters, etc.
├── public/               # Website assets
```

---

## Setup & Installation

### Prerequisites

- Node.js >= 18
- PostgreSQL >= 13

### Clone the repository

```bash
git clone https://github.com/your-username/ontario-politics-tracker.git
cd ontario-politics-tracker
```
 
### Install dependencies

```bash
npm install
```

### Configure environment

Create a `.env` file in the root:

```env
PORT=3000
NEWS_API_KEY=your_newsapi_key_here
PG_USER=your_pg_user
PG_PASSWORD=your_pg_password
PG_HOST=localhost
PG_DATABASE=ontario_politics_tracker
PG_PORT=5432
```

### Set up PostgreSQL

Run the SQL schema to create the `article` table:

```sql
CREATE TABLE article (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    author TEXT,
    source TEXT NOT NULL,
    description TEXT,
    url TEXT UNIQUE NOT NULL,
    published_at TIMESTAMP,
    categories TEXT[]
);
```

### Start the app

Development (server + client):

```bash
npm run dev
```

Frontend only:

```bash
cd src-client
npm run client
```

Backend only:

```bash
cd src-server
npm start
```

Visit: [http://localhost:5173](http://localhost:5173)

---

## Scheduled Jobs

The backend uses `node-cron` to fetch and refresh articles every hour.\
You can adjust the frequency in `src-server/scheduler/scheduler.js`.

---

## API Endpoints

### POST `/articles/post`

Insert an article manually:

```json
{
  "title": "...",
  "author": "...",
  "source": "...",
  "description": "...",
  "url": "...",
  "publishedAt": "...",
  "categories": ["health", "education"]
}
```

### GET `/articles/get`

Query articles with filters:

- `q` — search term
- `outlets` — comma-separated outlets
- `categories` — comma-separated categories
- `sort` — `asc` or `desc`
- `limit`, `offset` — pagination

Example:

```
/articles/get?q=hospital&categories=health&sort=desc&limit=10&offset=0
```

---

## Author

**Peter Montgomery McCall**\
[GitHub](https://github.com/your-username)

---