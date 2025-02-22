const Sequelize = require('sequelize');
const db = require('../db');

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
    rating: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
      validate: {
        min: 0,
        max: 5,
      },
    },
    imageUrl: {
      type: Sequelize.STRING,
      defaultValue:
        'https://assets.hermes.com/is/image/hermesproduct/expert-sneaker--221896ZH92-worn-1-0-0-1000-1000_b.jpg',
      // defaultValue: '',
    },
    categories: {
      type: Sequelize.ENUM('ATHLETIC', 'CASUAL'),
      allowNull: false,
    },
    size: {
      type: Sequelize.INTEGER,
      validate: {
        min: 4,
        max: 12,
      },
    },
});

module.exports = Product;
