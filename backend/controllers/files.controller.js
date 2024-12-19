import logger from "../utils/logger";

const deleteFile = (path) => {
    fs.unlink(path, (err) => {
        if (err) {
            logger.error("While deleting file", err);
        }
    });
}

export const deleteCourseImage = (imageName) => {
    const imagePath = "./public/course/images/" + imageName;
    deleteFile(imagePath);
}

export const deleteCourseVideo = (videoName) => {
    const videoPath = "./public/course/videos/" + videoName;
    deleteFile(videoPath);
}