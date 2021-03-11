const router = require('express').Router();
const movilesCtrl = require('../controllers/moviles.controller');
const { verificaToken, verificaPermisoUser, verificaParametrosPaginacion, verificaDatosRegistroMovil, verificaDatosUpdateMovil } = require('../middlewares/index');

router.get('/', [verificaToken, verificaPermisoUser, verificaParametrosPaginacion ], movilesCtrl.getMoviles);
router.get('/:id', [verificaToken, verificaPermisoUser ], movilesCtrl.getMovilId);
router.post('/', [verificaToken, verificaPermisoUser, verificaDatosRegistroMovil], movilesCtrl.createMovil);
router.put('/:id', [verificaToken, verificaPermisoUser, verificaDatosUpdateMovil], movilesCtrl.updateMovil);
router.delete('/:id', [verificaToken, verificaPermisoUser], movilesCtrl.deleteMovil);

module.exports = router;