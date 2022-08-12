const path = require('path');
const { v4: uuidv4 } = require('uuid');

const uploadFile = (
   files,
   validExtensions = ['gif', 'jpeg', 'jpg', 'png'],
   folder = ''
) => {
   return new Promise((resolve, reject) => {
      const { file } = files;

      // Obtener la extension del file
      const fileNameSplit = file.name.split('.');
      const extension = fileNameSplit[fileNameSplit.length - 1];

      // Validar la extension
      if (!validExtensions.includes(extension)) {
         return reject(
            `La extension ${extension} no esta permitida. Las permitidas son: ${validExtensions}`
         );
      }

      // Renombrar el archivo
      const tempName = uuidv4() + '.' + extension;
      const uploadPath = path.join(__dirname, '../uploads/', folder, tempName);

      file.mv(uploadPath, function (err) {
         if (err) {
            return reject(err);
         }

         resolve(tempName);
      });
   });
};

module.exports = {
   uploadFile,
};
