import multer from "multer";

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "src/assets");
	},
	filename: function (req, file, cb) {
		cb(null, `${Date.now()}-${file.originalname}`);
	},
});

export const upload = multer({storage, fileFilter: (req, file, cb) => {
	const allowedFiles = ["image/jpeg", "image/jpg", "image/png"];
  if(allowedFiles.includes(file.mimetype)) {
    cb(null, true)
  } else {
    cb(null, false)
  }
}});
