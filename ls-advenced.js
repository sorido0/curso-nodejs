const fs = require('node:fs/promises');
const path = require('node:path');

const folder = process.argv[2] ?? '.';

async function ls(folder) {
    let file;

    try {
        file = await fs.readdir(folder); // Muestra los archivos del directorio
    } catch {
        console.error(`Esto es un error del dirrectorio ${folder}`);
        process.exit(1);
    }

    const filesPromises = file.map(async (file) => {
        const filePath = path.join(folder, file);
        let fileStats;
        try {
            fileStats = await fs.stat(filePath); // Muesta informacion del archivo
        } catch {
            console.error(`Esto es un error del dirrectorio ${folder}`);
            process.exit(1);
        }

        const isDirectory = fileStats.isDirectory();
        const fileType = isDirectory ? 'd' : 'f';
        const fileZice = fileStats.size.toString().padStart(10, ' ');
        const fileModified = fileStats.mtime.toLocaleString();

        return `${fileType.padEnd(2)} ${file.padEnd(15)}  ${fileZice} ${fileModified.padStart(10)} `;
    });

    const filesInfo = await Promise.all(filesPromises);
    console.log(filesInfo.join('\n'));
}

ls(folder);