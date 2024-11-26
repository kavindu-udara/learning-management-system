import multer from "multer";

const formatFilename = (filename) => {
    return filename.replace(/\s+/g, '-'); // Replace one or more spaces with "-"
};

const videoStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/course/videos');
    },
    filename: (req, file, cb) => {
        const formatedFilename = formatFilename(file.originalname);
        cb(null, Date.now() + '-' + formatedFilename);
    }
});
const uploadVideo = multer({ storage: videoStorage });

const courseimageStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/course/images');
    },
    filename: (req, file, cb) => {
        const formatedFilename = formatFilename(file.originalname);
        cb(null, Date.now() + '-' + formatedFilename);
    }
})
const uploadCourseImage = multer({ storage: courseimageStorage });

const profileImageStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/user/profileImages');
    },
    filename: (req, file, cb) => {
        const formatedFilename = formatFilename(file.originalname);
        cb(null, Date.now() + '-' + req.body.userId + formatedFilename);
    }
});
const uploadProfileImage = multer({ storage: profileImageStorage });

export { uploadVideo, uploadCourseImage, uploadProfileImage };