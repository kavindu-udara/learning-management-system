import CourseCategory from "../models/courseCategory.model.js";
import logger from "../utils/logger.js";

const seedData = [
    { name: 'Programming' },
    { name: 'Design' },
    { name: 'Marketing' },
    { name: 'Finance' },
    { name: 'Health & Fitness' }
]

export const seedCategories = async () => {
    try {
        // clear the collection
        await CourseCategory.deleteMany({});
        console.log(`Cleared existing data`);

        // insert new data
        await CourseCategory.insertMany(seedData);
        console.log(`Seeded database successfully`, seedData);

        logger.log('Database Seed Success : ' + seedData);
    } catch (err) {
        console.log('Error seeding the database : ', err);
        logger.log('Error seeding the database : ' + err);
        process.exit(1);
    }
}