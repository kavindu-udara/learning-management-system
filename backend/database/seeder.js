import { seedCategories } from "./courseCategory.seed.js";
import { connectDatabase, disconnectDatabse } from "./databaseConnect.js";

await connectDatabase();
console.log('Connected to the database');

console.log('Seed course categories');
await seedCategories();

disconnectDatabse();
console.log('Database connection closed');
