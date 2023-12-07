const mongoose = require('mongoose');

const mongoURI = 'mongodb+srv://akashsahu:akash16012001@cluster0.yfc2kyu.mongodb.net/gofoodmern?retryWrites=true&w=majority';

const mongoDB = async () => {
    try {
        await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

        console.log('Connected to MongoDB');

        await fetchData();

        // Close the database connection when done
        // mongoose.connection.close();
    } catch (error) {
        console.error('Error connecting to MongoDB: ', error);
    }
};

async function fetchData() {
    try {
        const fetched_data = mongoose.connection.db.collection("food_items");
        const data = await fetched_data.find({}).toArray();

        const foodCategory = mongoose.connection.db.collection("foodCategory");
        const catData = await foodCategory.find({}).toArray();

        global.food_items = data;
        global.foodCategory = catData;
        console.log(global.food_items);
        console.log(global.foodCategory);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

module.exports = mongoDB;