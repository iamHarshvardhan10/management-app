import mongoose from "mongoose";


export const dabaseConnection = async () => {
    await mongoose.connect(process.env.MONGODB_URl).then(() => {
        console.log('Mongo Db Connected')
    }).catch((error) => {
        console.log('Mongo Db Connection Failed')
        console.log(error.message)
        process.exit(1)
    })
}