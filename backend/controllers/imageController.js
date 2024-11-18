import path from 'path';
import fs from 'fs';

export const showImage = async (req, res, next) => {
    const { fileName } = req.params;

    if (!fileName) {
        return res.status(400).json({ message: "Image is required" });
    }

    const imagePath = path.resolve("../backend/public/course/images/", fileName);

    if (!fs.existsSync(imagePath)) {
        return res.status(404).json({ message: "Image file not found on server" });
    }

    res.sendFile(imagePath);
}