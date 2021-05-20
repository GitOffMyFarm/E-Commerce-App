const router = require('express').Router();
const { Category, Product } = require('../../models');
//confirmed
router.get('/', async (req, res) => {
  try {
  const categoryData = await Category.findAll({
    include: [Product],
  });
  res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});
//confirmed
router.get('/:id', async (req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [Product],
    });
    if (!categoryData) {
      res.status(404).json({ message: "The Category You're looking for does not exist"})
    };
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', (req, res) => {
  Category.update(
    {
      category_name: req.body.category_name,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((updatedCategory) => {
      res.json(updatedCategory);
    })
    .catch((err) => res.json(err));
});
//confirmed
router.delete('/:id', async (req, res) => {
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id
      }
    });
    if (!categoryData) {
      res.status(404).json({ message: 'The Category You Are Trying To Delete Does Not Exist' });
      return;
    }
    res.status(200).json({message: `Category #${req.params.id} has been deleted.`});
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
