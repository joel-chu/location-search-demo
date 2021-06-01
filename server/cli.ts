#!/usr/bin/env node
// mini cli tool
import { createInterface } from 'readline'

import { runImport } from './src/cli'
import { prepareDb } from './src/model/create-table'

// run it
if (require.main === module) {
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout
  })

  rl.question('What do want to do? p(repare) or i(mport) ', (answer: string) => {
    switch (answer) {
      case 'p':
          prepareDb()
            .then(ctn => {
              if (ctn > 0) {
                console.log(`db table created`)
              } else {
                console.error(`something went wrong!`)
              }
            })
        break
      case 'i':
        runImport()
        break
      default:
        console.error(`Don't understand what you want ${answer}`)
    }
    rl.close()
  })
}
