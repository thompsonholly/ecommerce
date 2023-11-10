const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class Category extends Model { }

Category.init(
  {
    // define columns
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    category_name: {
      type: DataTypes.STRING,
      allowNull: false,

    }









    // * `Tag`

    // * `id`

    // * Integer.

    //     * Doesn't allow null values.

    // * Set as primary key.

    //     * Uses auto increment.

    //   * `tag_name`

    // * String.

    // * `ProductTag`

    // * `id`

    // * Integer.

    //     * Doesn't allow null values.

    // * Set as primary key.

    //     * Uses auto increment.

    //   * `product_id`

    // * Integer.

    //     * References the`Product` model's `id`.

    // * `tag_id`

    // * Integer.

    //     * References the`Tag` model's `id`.
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'category',
  }
);

module.exports = Category;
