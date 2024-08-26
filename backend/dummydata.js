const mongoose = require('mongoose');
const User = require('./models/User');
const Category = require('./models/Category');

const users = [
    {
        username: "john_doe",
        email: "john@example.com",
        password: "$2a$10$XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
        createdAt: new Date("2024-08-12T08:00:00Z"),
        updatedAt: new Date("2024-08-12T08:00:00Z")
    },
    {
        username: "jane_doe",
        email: "jane@example.com",
        password: "$2a$10$YYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY",
        createdAt: new Date("2024-08-12T09:00:00Z"),
        updatedAt: new Date("2024-08-12T09:00:00Z")
    }
];

const categories = [
    {
        name: "Smartphones",
        description: "Devices that combine a mobile phone with a handheld computer...",
        createdAt: new Date("2024-08-12T08:00:00Z"),
        updatedAt: new Date("2024-08-12T08:00:00Z")
    },
    {
        name: "Laptops",
        description: "Portable computers that combine the components...",
        createdAt: new Date("2024-08-12T08:30:00Z"),
        updatedAt: new Date("2024-08-12T08:30:00Z")
    },
    {
        name: "Tablets",
        description: "Mobile devices with touchscreens...",
        createdAt: new Date("2024-08-12T09:00:00Z"),
        updatedAt: new Date("2024-08-12T09:00:00Z")
    }
];

mongoose.connect('mongodb+srv://japi:japi@cluster0.hlxjpnn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(async () => {
        await User.insertMany(users);
        await Category.insertMany(categories);
        console.log('Dummy data inserted successfully');
        mongoose.connection.close();
    })
    .catch(err => console.error('Error inserting data:', err));

