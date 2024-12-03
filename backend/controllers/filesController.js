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