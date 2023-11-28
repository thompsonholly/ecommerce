const router = require('express').Router();
const { Category, Product } = require('../../models');

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
router.post('/', async (req, res) => {
  try {
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err)
  }
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
// router.delete('/:id', (req, res) => {
//   Category.destroy({
//     where: {
//       id: req.params.id
//     },
//   })
//     .then((deleteCategory) => {
//       res.status(200).json(deleteCategory)
//     })
//     .catch((err) => res.status(500).json(err));

// });

// delete one product by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    const categoryData = await Category.destroy({
      where: {
        category_id: req.params.category_id

      },

    });
    console.log(categoryData)
    if (!categoryData) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
