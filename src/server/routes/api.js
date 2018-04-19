const Router = require('koa-router')

const router = new Router()

const apt = require('../apt')


const BASE_URL = `/api/v1/apt_validity_check`

/**
 * Check the validity of an APT (autorisation provisoire de travail) identified
 * by the given demarches-simplifiees.fr's ID and applicant's bithday date.
 */
router.get(`${BASE_URL}/:ds_id/:date`, async (ctx) => {
  try {
    const data = await apt.getFromJson(ctx.params.ds_id, ctx.params.date)
    if (data.length) {
      ctx.body = {
        status: 'success',
        data: data,
      }
    } else {
      ctx.status = 404
      ctx.body = {
        status: 'not found',
        message: 'Invalid APT.',
      }
    }
  } catch (err) {
    console.log(err)
  }
})

module.exports = router
