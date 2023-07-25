const fs = require('node:fs/promises');

fs.readdir('.')
    .then((files) => {
        files.forEach((file) => {
            console.log(file);
        }
        )
    })
    .catch((err) => {
        console.error("Esto es un error del dirrectorio ", err);
    }
    )
    .finally(() => {
        console.log("Proceso terminado");
        process.exit(0);
    }
    )
