import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const listDbs = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        const admin = mongoose.connection.db.admin();
        const dbs = await admin.listDatabases();
        console.log(dbs);
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};
listDbs();
