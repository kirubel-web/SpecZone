const Category = require('../models/Category');

exports.getCategories = async (req, res) => {
    const categories = await Category.find({});
    res.json(categories);
};

exports.createCategory = async (req, res) => {
    const { name, description } = req.body;
    const category = new Category({ name, description });
    await category.save();
    res.status(201).json(category);
};

exports.updateCategory = async (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;

    const category = await Category.findById(id);

    if (category) {
        category.name = name || category.name;
        category.description = description || category.description;

        const updatedCategory = await category.save();
        res.json(updatedCategory);
    } else {
        res.status(404).json({ message: 'Category not found' });
    }
};

exports.deleteCategory = async (req, res) => {
    const { id } = req.params;

    const category = await Category.findById(id);

    if (category) {
        await category.remove();
        res.json({ message: 'Category removed' });
    } else {
        res.status(404).json({ message: 'Category not found' });
    }
};
