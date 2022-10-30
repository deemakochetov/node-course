const multer = require('multer');

const MEGABYTE = 1000000;
const MAX_IMAGE_SIZE = 1 * MEGABYTE;

const upload = multer({
  dest: 'uploads/',
  limits: {
    fileSize: MAX_IMAGE_SIZE
  },
  fileFilter(req, file, cb) {
    if (
      file.mimetype === 'image/png' ||
      file.mimetype === 'image/jpg' ||
      file.mimetype === 'image/jpeg'
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
  }
});

module.exports = upload;
