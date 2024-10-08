const fs = require('fs');
const path = require('path');
const { processInfoJsonFiles } = require('./test_utils');

const dataFolderPath = path.join(__dirname, '../public/data');

const requiredCategories = ['nombre', 'edad', 'carrera', 'semestre', 'gustos', 'noGustos', 'foto', 'redSocial'];

describe('Verify JSON structure in data folders', () => {

  const folders = fs.readdirSync(dataFolderPath);

  folders.forEach(folder => {
    const jsonFilePath = path.join(dataFolderPath, folder, 'info.json');
    if (fs.existsSync(jsonFilePath)) {
      const jsonData = JSON.parse(fs.readFileSync(jsonFilePath, 'utf-8'));
      test(`Verify JSON structure in folder ${folder}`, () => {
        requiredCategories.forEach(category => {
          expect(jsonData).toHaveProperty(category);
        });
      });
    } else {
      test(`JSON file does not exist in folder ${folder}`, () => {
        expect(false).toBeTruthy();
      });
    }
  });
});


describe('JSON object property check in info.json files', () => {
  
  test('Check if all info.json files have the required properties', async () => {
      const results = await processInfoJsonFiles(dataFolderPath, requiredCategories);
      results.forEach(result => {
          expect(result.hasProps).toBe(true);
      });
  }, 5000);

});

