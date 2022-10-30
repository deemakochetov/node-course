const multer = require('multer');

const MEGABYTE = 1000000;
const MAX_IMAGE_SIZE = 1 * MEGABYTE;
const ALLOWED_EXTENSIONS = /^(image\/jpg|image\/jpeg|image\/png)$/;

const upload = multer({
  limits: {
    fileSize: MAX_IMAGE_SIZE
  },
  fileFilter(req, file, cb) {
    if (ALLOWED_EXTENSIONS.test(file.mimetype)) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
  }
});

module.exports = upload;
