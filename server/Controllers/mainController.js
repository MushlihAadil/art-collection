const { Collection, Artwork } = require('../models');

class MainController {
    static async getAllCollection (req, res, next) {
        try {
            const {page, sort} = req.query;
            const paramsQuerySQL = {}

            //sorting
            if (sort) {
                const ordering = sort[0] === "-" ? "DESC" : "ASC";
                const columnName = ordering === "DESC" ? sort.slice(1) : sort;
                paramsQuerySQL.order = [
                    [columnName, ordering]
                ]
            };

            //pagination
            let limit = 10;
            let pageNumber = 1;
            if (page) {
                // eg: limit = 10
                // page 1 --> row 1 - 10 --> offset 0, limit = 10
                // page 2 --> row 10 - 20 --> offset 10, limit = 10
                // page 3 --> row 20 - 30 --> offset 20, limit = 10

                // offset = limit * (pageNumber -1)
                if(page.size) {
                    limit = page.size;
                    paramsQuerySQL.limit = limit; 
                };

                if(page.number) {
                    pageNumber = page.number;
                    paramsQuerySQL.offset = limit * (pageNumber - 1); 
                };
            };

            let {count} = await Collection.findAndCountAll(
                {paramsQuerySQL}
            )

            let data = await Collection.findAll({
                include: Artwork,
                order: [['artId', 'ASC']]
            })

            res.status(200).json({
                page: pageNumber,
                data: data,
                totalData: count,
                totalPage: Math.ceil(count/limit),
                dataPerPage: limit
            })

        } catch (err) {
          next(err)
        //   console.log(err)    
        }
    }

    static async addCollection (req, res, next) {
        try {
            const { artId } = req.params
            let artwork = await Artwork.findByPk(artId);
            if (!artwork) throw {name: "ArtworkNotFound"}

            const { notes} = artwork
            await Collection.create({
                artId: artId,
                userId: req.user.id,
                notes: notes
            });
            res.status(201).json({
                artId: artId,
                userId: req.user.id,
                notes: notes
            });
        } catch (err) {
            next(err);
        }
    }

    static async updateCollection (req, res, next) {
        try {
            let { notes } = req.body;
            let updateCollection = await Collection.update(
                { notes },
                {
                    where: {
                        id: req.params.id
                    },
                }
            );
            if (!updateCollection) throw { name: "CollectionNotFound" };

            const collection = await Collection.findByPk(req.params.id);
            if (!collection) throw { name: "CollectionNotFound" };

            res.status(200).json({collection});
        } catch (err) {
            next(err);
        }
    }

    static async deleteCollection (req, res, next) {
        try {
            let { id } = req.params;
            let collection = await Collection.findByPk(id);
            if (!collection) throw { name: "CollectionNotFound" };

            await Collection.destroy({ where: { id: id } }); 

            res.status(200).json({ message: `Colection by id ${id} has been deleted` });
        } catch (err) {
            next(err);
        }
    }
}

module.exports = MainController;