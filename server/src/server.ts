// src/server.ts
// koa server basic setup
import app from './app'

// Process.env will always be comprised of strings, so we typecast the port to a
// number.
const PORT:number = Number(process.env.PORT) || 3388

app.listen(PORT, () => {
  console.log(`Server started on ${PORT} point your brower at http://localhost:3388`)
})
