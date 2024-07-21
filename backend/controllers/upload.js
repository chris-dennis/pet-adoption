// const multer = require('multer');
// const path = require('path');
// const fs = require('fs');
//
// const uploadsDir = path.join(__dirname, '..', 'uploads');
// if (!fs.existsSync(uploadsDir)) {
//     fs.mkdirSync(uploadsDir);
// }
//
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, uploadsDir);
//     },
//     filename: (req, file, cb) => {
//         cb(null, `${Date.now()}-${file.originalname}`);
//     }
// });
//
// const upload = multer({ storage });
//
// exports.uploadImage = (req, res) => {
//     console.log('Received upload request');
//     upload.single('image')(req, res, (err) => {
//         if (err) {
//             console.error('Upload error:', err.message);
//             return res.status(500).json({ error: err.message });
//         }
//         console.log('File uploaded successfully:', req.file);
//         res.json({ url: `/uploads/${req.file.filename}` });
//     });
// };
