import multer from 'multer';

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './public/img'); // Carpeta donde se guardarán los archivos
    } ,
    filename: function (req, file, callback) {
        callback(null, Date.now() + '-' + file.originalname); // Nombre del archivo
    }
});
const uploader = multer({ storage: storage });

export default uploader;