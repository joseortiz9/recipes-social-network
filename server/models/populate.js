const faker = require('@faker-js/faker'),
    sequelize = require('../database'),
    {FileStatus, File} = require('./File'),
    {User} = require('./User'),
    {Hashtag, Category, Utensil, RecipeFile, Measure, Product, Recipe} = require('./Recipe'),
    recipeBook = require('./RecipeBook');

const generateDataAsync = (num, fun) => {
    const promises = new Array(num)
        .fill(undefined)
        .map(fun)
    return Promise.all(promises);
}

const populateAll = async () => {
    await FileStatus.create({name: 'Ok'});
    await FileStatus.create({name: 'Processing'});
    await FileStatus.create({name: 'Error'});
    const okStatus = await FileStatus.findOne({where: {name: 'Ok'}});
    const createFile = async () => {
        return {
            name: faker.image.food(),
            url: faker.image.food(),
            size: 100,
            statusId: okStatus.id,
        }
    }
    const files = await generateDataAsync(5, createFile);
    await File.bulkCreate(files);

    const createUser = async () => {
        return {
            fullName: faker.name.findName(),
            username: faker.random.word(),
            type: 'user',
            status: 'active',
            email: faker.internet.email(),
            password: 'ef797c8118f02dfb649607dd5d3f8c7623048c9c063d532cc95c5ed7a898a64f',
            pictureId: (await File.findOne({order: sequelize.random()})).id
        }
    }
    let users = await generateDataAsync(5, createUser);
    await User.bulkCreate(users);

    await Category.create({name: 'breakfast'});
    await Category.create({name: 'lunch'});
    await Category.create({name: 'dinner'});
    await Category.create({name: 'brunch'});

    await Hashtag.create({name: 'Russian'});
    await Hashtag.create({name: 'Mexican'});
    await Hashtag.create({name: 'American'});
    await Hashtag.create({name: 'Latin'});
    await Hashtag.create({name: 'Free of sugar'});
    await Hashtag.create({name: 'Vegetarian'});

    await Measure.create({name: 'gr'});
    await Measure.create({name: 'spoon'});
    await Measure.create({name: 'ml'});
    await Measure.create({name: 'cup'});
    await Measure.create({name: 'piece'});
    await Measure.create({name: 'kg'});

    await Utensil.create({name: 'pot'});
    await Utensil.create({name: 'knife'});
    await Utensil.create({name: 'measure spoon'});
    await Utensil.create({name: 'measure cup'});
    await Utensil.create({name: 'peeler'});
    await Utensil.create({name: 'frying pan'});
    await Utensil.create({name: 'cutting board'});
    await Utensil.create({name: 'colander'});
    await Utensil.create({name: 'bowl'});
    await Utensil.create({name: 'whisk'});

    const randomMeasure = async () => (await Measure.findOne({order: sequelize.random()})).id;
    await Product.create({name: 'Salt', defaultMeasureId: await randomMeasure()});
    await Product.create({name: 'Pepper', defaultMeasureId: await randomMeasure()});
    await Product.create({name: 'All-purpose flour', defaultMeasureId: await randomMeasure()});
    await Product.create({name: 'Sugar', defaultMeasureId: await randomMeasure()});
    await Product.create({name: 'Chicken', defaultMeasureId: await randomMeasure()});
    await Product.create({name: 'Beef', defaultMeasureId: await randomMeasure()});
    await Product.create({name: 'Canned tomatoes', defaultMeasureId: await randomMeasure()});
    await Product.create({name: 'Tomato souce', defaultMeasureId: await randomMeasure()});
    await Product.create({name: 'Canned beans', defaultMeasureId: await randomMeasure()});
    await Product.create({name: 'Eggs', defaultMeasureId: await randomMeasure()});
    await Product.create({name: 'Milk', defaultMeasureId: await randomMeasure()});
    await Product.create({name: 'Cheese', defaultMeasureId: await randomMeasure()});
    await Product.create({name: 'Almonds', defaultMeasureId: await randomMeasure()});
    await Product.create({name: 'Oregano', defaultMeasureId: await randomMeasure()});
    await Product.create({name: 'Paprika', defaultMeasureId: await randomMeasure()});
};

populateAll()
    .then(() => console.log('All table populated'))
    .catch(error => console.error(error))
    .finally(() => process.exit(0))