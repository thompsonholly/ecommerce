const router = require('express').Router();
const { Tag, Product, ProductTag, Category } = require('../../models');

// The `/api/tags` endpoint

// find all tags
// be sure to include its associated Product data
router.get('/', async (req, res) => {
  try {
    const tagData = await Tag.findAll();
    res.status(200).json(tagData)
  } catch (error) {
    res.status(500).json(error);
  }
});

// find a single tag by its `id`
// be sure to include its associated Product data
router.get('/:id', async (req, res) => {
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product, through: ProductTag }]
    });
    if (!tagData) {
      res.status(404).json({ message: 'No tag found with that id!' });
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// create a new tag
router.post('/', (req, res) => {
  Tag.create(req.body)
    .then((newTag) => {
      res.status(200).json(newTag);
    })
    .catch((err) => res.status(500).json(err));
});

// update a tag's name by its `id` value
router.put('/:id', (req, res) => {
  Tag.update(
    req.body,
    {
      where: {
        id: req.params.id,
      }
    })
    .then((updateTag) => {
      res.status(200).json(updateTag)
    })
    .catch((err) => res.status(500).json(err));
});

// delete on tag by its `id` value
router.delete('/:id', (req, res) => {
  Tag.destroy({
    where: {
      id: req.params.id
    },
  })
    .then((deleteTag) => {
      res.status(200).json(deleteTag);
    })

    .catch((err) => res.status(500).json(err));
});

module.exports = router;
