const {Artwork} = require('../models');

class PublicController {
    // Get all artworks available
    static async getAllArtwork (req, res, next) {
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

            let {count, rows} = await Artwork.findAndCountAll(paramsQuerySQL)

            let data = await Artwork.findAll()

            res.status(200).json({
                page: pageNumber,
                data: rows,
                totalData: count,
                totalPage: Math.ceil(count/limit),
                dataPerPage: limit
            })

        } catch (err) {
          next(err)
          console.log(err)    
        }
    }
    // Get all artworks available by id
    static async getOneArtwork (req, res, next) {
        try {
            let {id} = req.params;
            let artwork = await Artwork.findByPk(id)
                if (!artwork) throw {name: "notFoundArtwork"}

            res.status(200).json({artwork})
            sequelize_query
        } catch (err) {
          next(err)  
        }
    }
}

module.exports = PublicController;