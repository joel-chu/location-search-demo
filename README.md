# location search demo

- Demo UI: It's React using [PreactX](https://preactjs.com/) engine (its the same, only much better)
- Server: Koa TS, run without compile stage, using [esbuild](https://esbuild.github.io/) that parse TS files in sub-second speed (almost matching Rust based [deno.js](https://deno.land/)). Database using sqlite with [TypeORM](https://typeorm.io/)
- CLI: There is a semi-interactive cli inside the `server/` folder. just `cd server && npm run cli`. It's for generating table and import the csv to the database. There is another one (explain in later section)
- Unit test: inside the `server/` folder is using [ava.js](https://github.com/avajs/ava). Inside the `demo-ui/` is using stock Jest+enzyme, just some snapshot. No e2e.

## How to run this demo

- clone this repo, run `node ./install.js`. Then `cd location-search-demo/server && npm run serve` then just point your browser to `http://localhost:3388`
- Or build the docker file `docker build . -t <username>/location-search-demo` then run it `docker run -p 3388:3388 -d <username>/location-search-demo`


Have fun :)

---

Joel Chu (c) 2021
