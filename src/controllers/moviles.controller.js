const { movilModel } = require('../db/database');

const movilesCtrl = {};

movilesCtrl.getMoviles = async (req, res) => {
    try {
        const { /*limit,*/ page, paginationMin, paginationMax } = req.query;
        
        let max = 0, min = 0;
        let pagination = [];

        // const results = await movilModel.findAll({ attributes: { exclude: ['createdAt', 'updatedAt'] } });
        const results = await movilModel.paginate({
            paginate: 10, 
            page: parseInt(page),
            attributes: ['id', 'marca', 'modelo', 'stock']
        });

        if (parseInt(paginationMin) > 0 && parseInt(paginationMax) > 0) {
            if ( results.pages <= 10 ){
                min = 1;
                max = results.pages;
            }else {
                if ( parseInt(page) >= parseInt(paginationMin) && parseInt(page) <= parseInt(paginationMax) ) {
                    min = parseInt(paginationMin);
                    max = parseInt(paginationMax);
                }else if (parseInt(page) > parseInt(paginationMax)) {
                    min = (parseInt(page) - 10 + 1);
                    max = parseInt(page);
                }else if (parseInt(page) < parseInt(paginationMin)) {
                    min = parseInt(page);
                    max = (parseInt(page) + 10) - 1;
                }
            }
                
            for (let index = min; index <= max; index++) {
                pagination.push(index);            
            }
        }
        
        let resultado = ({
            docs: results.docs,
            totalPages: results.pages,
            totalDocs: results.total,
            page: parseInt(page), // ENVIADO POR PARAMETRO (Pagina Actual)
            limit: 10, // parseInt(limit), // ENVIADO POR PARAMETRO (Limite de registros por pagina)
            hasPrevPage: (parseInt(page) <= 1 ? false : true ), // CALCULAR
            prevPage: (parseInt(page) <= 1 ? null : parseInt(page)-1), // CALCULAR
            hasNextPage: (parseInt(page) < results.pages ? true : false ), // CALCULAR
            nextPage: (parseInt(page) < results.pages ? parseInt(page)+1 : null ), // CALCULAR,
            pagination: pagination
        });

        res.status(200).json({ status: 200, error: false, message: '', results: resultado});         

    } catch (err) {
        return res.json({ status: 401, error: true, message: err.message, results: "" });
    }
};

movilesCtrl.getMovilId = async (req, res) => {
    const { id } = req.params;

    try {
        const results = await movilModel.findOne({
            attributes: { exclude: ['createdAt', 'updatedAt'] },
            where: { id: id }
        });

        res.status(200).json({ status: 200, error: false, message: '', results });

    } catch (err) {
        return res.json({ status: 401, error: true, message: err.message, results: "" });
    }
};

movilesCtrl.createMovil = async (req, res) => {
    try {
        const newMovil = req.body;
        
        const results = await movilModel.create(newMovil);
        
        res.status(200).json({ status: 200, error: false, message: '', results});

    } catch (err) {
        return res.json({ status: 401, error: true, message: err.message, results: "" });
    }
};

movilesCtrl.updateMovil = async (req, res) => {
    const { id } = req.params;

    try {
        const results = await movilModel.update(req.body, {where: {id: id} });

        res.status(200).json({ status: 200, error: false, message: '', results});

    } catch (err) {
        return res.json({ status: 401, error: true, message: err.message, results: "" });
    }
};

movilesCtrl.deleteMovil = async (req, res) => {
    const { id } = req.params;

    try {        
        const results = await movilModel.destroy({where: {id: id} });

        res.status(200).json({ status: 200, error: false, message: '', results});
        
    } catch (err) {
        return res.json({ status: 401, error: true, message: err.message, results: "" });
    }
};

module.exports = movilesCtrl;