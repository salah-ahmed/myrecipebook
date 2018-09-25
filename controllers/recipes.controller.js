import Recipe from '../models/recipes.model';

export const index = (req, res) => {
    Recipe.find().select({
        'title': 1,
        'imgUrl': 1
    })
        .then(recipe => {
            res.send(recipe);
        })
        .catch(err => {
            res.status(500).end();
        });
};

export const featured = (req, res) => {
    res.send({
        imgUrl: 'pic.jpg',
        title: 'Title',
        url: '/recipe-title'
    });
};

export const show = (req, res) => {
    Recipe.findById(req.params.id)
        .then(recipe => {
            if (!recipe) {
                return res.status(404).end();
            }
            res.send(recipe);
        })
        .catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).end();
            }
            return res.status(500).end();
        });
};

export const store = (req, res) => {
    /* TODO : use validate */
    const recipe = new Recipe({
        title: req.body.title,
        imgUrl: req.body.imgUrl,
        ingredients: req.body.ingredients,
        steps: req.body.steps
    });

    recipe.save()
        .then(data => res.status(201).end())
        .catch(err => res.status(500).end());
};

export const destroy = (req, res) => {
    Recipe.findOneAndDelete(req.params.id)
        .then(recipe => {
            if(!recipe) {
                return res.status(404).end();
            }
            return res.status(201).end();
        })
        .catch(err => {
            if(err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).end();
            }
            return res.status(500).send(err);
        });
};

export const update = (req, res) => {
    Recipe.findOneAndUpdate({_id: req.params.id}, req.body)
        .then(recipe => {
            if(!recipe) {
                return res.status(404).end();
            }
            return res.status(201).end();
        })
        .catch(err => {
            if(err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).end();
            }
            return res.status(500).send(err);
        });
};