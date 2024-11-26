import fs from "fs";
import CoursePart from "../models/coursePartModel.js";
import WatchHistory from "../models/watchHistoryModel.js";

export const showVideo = async (req, res, next) => {

    const { historyId } = req.params;

    if (!historyId) {
        return res.status(400).json({ message: "History ID is required" });
    }

    const watchHistory = await WatchHistory.findById(historyId);

    if (!watchHistory) {
        return res.status(404).json({ message: "History not found" });
    }

    if (watchHistory.isLocked) {
        return res.status(400).json({ message: "This video is locked" });
    }

    const partId = watchHistory.coursePartId;

    const coursePart = await CoursePart.findById(partId);

    if (!coursePart) {
        return res.status(404).json({ message: "Course part not found" });
    }

    const fileName = coursePart.videoUrl;

    if (!fileName) {
        return res.status(404).json({ message: "Video file not found", coursePart: coursePart });
    } else {
        const videoPath = "../backend/public/course/videos/" + fileName;
        const stat = fs.statSync(videoPath);
        const fileSize = stat.size;
        const range = req.headers.range;

        if (range) {
            const parts = range.replace(/bytes=/, "").split("-");
            const start = parseInt(parts[0], 10);
            const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

            const chunkSize = (end - start) + 1;
            const file = fs.createReadStream(videoPath, { start, end });
            const head = {
                "Content-Range": `bytes ${start}-${end}/${fileSize}`,
                "Accept-Ranges": "bytes",
                "Content-Length": chunkSize,
                "Content-Type": "video/mp4",
            };

            res.writeHead(206, head);
            file.pipe(res);
        } else {
            const head = {
                "Content-Length": fileSize,
                "Content-Type": "video/mp4",
            };
            res.writeHead(200, head);
            fs.createReadStream(videoPath).pipe(res);
        }
    }
}

export const unlockVideo = async (req, res, next) => {

    const { historyId } = req.params;

    if (!historyId) {
        return res.status(400).json({ message: "History ID is required" });
    }

    const watchHistory = await WatchHistory.findById(historyId);

    if (!watchHistory) {
        return res.status(404).json({ message: "History not found" });
    }

    watchHistory.isLocked = false;
    await watchHistory.save();

    return res.status(200).json({ message: "History updated", watchHistory });
}