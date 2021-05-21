const router = require('express').Router();
const { Tag, Product, ProductTag, Category } = require('../../models');
const { update } = require('../../models/Product');

//Confirmed
router.get('/', async (req, res) => {
  try {
    const tagData = await Tag.findAll({
      include: [
        {
          model: Product,
          through: ProductTag,
          as: 'product_assigned',
        },
      ],
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Confirmed
router.get('/:id', async (req, res) => {
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [
        {
          model: Product,
          through: ProductTag,
          as: 'product_assigned',
        },
      ],
    });
    if (!tagData) {
      res.status(404).json({ message: "The Tag You Are Trying To Find Does Not Exist" })
    };
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Confirmed
router.post('/', async (req, res) => {
  try {
    const tagData = await Tag.create(req.body);
    res.status(200).json(tagData);
  } catch (err) {
    res.status(400).json(err);
  }
});

//Confirmed
router.put('/:id', (req, res) => {
  Tag.update(
    {
      tag_name: req.body.tag_name,
    },
    {
      where: {
        id: req.params.id,
      },
      returning: true,
    },
  )
  .then((updatedTag) => {
    res.json(updatedTag);
  })
  .catch((err) => res.json(err));
});

//Confirmed
router.delete('/:id', async (req, res) => {
  try {
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id
      },
    });
    if (!tagData) {
      res.status(404).json({ message: 'The Tag You Are Trying to Delete Does Not Exist' });
      return;
    }
    res.status(200).json({ message: `Tag #${req.params.id} has been deleted` });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
