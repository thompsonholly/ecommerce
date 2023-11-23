const router = require('express').Router();
const { Category, Product, Tag, ProductTag } = require('../../models');

// The `/api/categories` endpoint

// find all categories
// be sure to include its associated Products
router.get('/', async (req, res) => {

  try {
    const categoryData = await Category.findAll({
      include: [{ model: Product }],

    });
    res.status(200).json(categoryData)
  } catch (error) {
    res.status(500).json(error);
  }
});

// find one category by its `id` value
// be sure to include its associated Products
router.get('/:id', async (req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }]
    });
    if (!categoryData) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }

});

// create a new category
router.post('/', (req, res) => {
  Category.create(req.body)
    .then((newCategory) => {
      res.status(200).json(newCategory)
    })
    .catch((err) => res.status(500).json(err))
});


// update a category by its `id` value
router.put('/:id', (req, res) => {

  Category.update(
    req.body,
    {
      where: {
        id: req.params.id,
      },
    })

    .then((updateCategory) => {
      res.status(200).json(updateCategory)
    })
    .catch((err) => res.status(500).json(err));
});



// delete a category by its `id` value
router.delete('/:id', (req, res) => {
  Category.destroy({
    where: {
      id: req.params.id
    },
  })
    .then((deleteCategory) => {
      res.status(200).json(deleteCategory)
    })
    .catch((err) => res.status(500).json(err));

});

module.exports = router;
