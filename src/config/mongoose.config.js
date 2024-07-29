import { connect, Types } from "mongoose";

const connectDB = async () => {
    const URI =  "mongodb+srv://marcosgiannasio:<password>@cluster0.hqipxhf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

    const options = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: "Products",
    };

    try {
        await connect(URI, options);
        console.log("Conectado a la base de datos");
    } catch (error) {
        console.error(error.message);
        return "Error al conectar a la base de datos";
    }
};

const isValidId = (id) => {
    return Types.ObjectId.isValid(id);
};

export default { connectDB, isValidId };