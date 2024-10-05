const {glob} = require('glob'); // Importamos el paquete { glob } 
const fs = require('fs'); // Importamos el paquete { fs }

async function findInfoJsonFiles(directory) {
    try {
      return await glob(`${directory}/**/info.json`, { signal: AbortSignal.timeout(5000) });
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

// Function to check if JSON object has required properties
function hasProperties(jsonObj, properties) {
    return properties.every(prop => jsonObj.hasOwnProperty(prop));
}

// Function to read and process each 'info.json' file
async function processInfoJsonFiles(directory, requiredProperties) {
    try {
        return (await findInfoJsonFiles(directory))
            .map(file => {
                const data = fs.readFileSync(file, 'utf8');
                const jsonData = JSON.parse(data);
                const hasProps = hasProperties(jsonData, requiredProperties);
                return { file, hasProps }  
        })
    } catch (err) {
        console.error('Error finding files:', err);
        throw err;
    }
}

module.exports = {
    processInfoJsonFiles,
}