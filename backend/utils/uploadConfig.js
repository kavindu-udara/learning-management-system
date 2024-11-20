import multer from "multer";

const videoStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/course/videos');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const uploadVideo = multer({ storage: videoStorage });

const courseimageStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/course/images');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
})

const uploadCourseImage = multer({storage: courseimageStorage});

export { uploadVideo, uploadCourseImage };