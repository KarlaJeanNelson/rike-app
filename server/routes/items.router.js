const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

router.get('/', rejectUnauthenticated, (req, res) => {
	// console.log(req.query);
	const { query, params } = req;
	let qryString = `SELECT * FROM item_info WHERE ''=''`;
	if (query) {
		Object.keys(query).forEach((value, index) => (qryString = qryString + ` AND ${value}=$${index+1}`))
	}
	const sqlText = `${qryString} ORDER BY pickup_end, item_id;`
	// console.log(sqlText, [ ...Object.values(query) ]);
	pool.query(sqlText, [...Object.values(query)])
		.then((result) => { res.status(200).send(result.rows); })
		.catch((err) => {
			res.status(500).send(err.stack);
		})
})

router.get('/org/:id', rejectUnauthenticated, (req, res) => {
	const { query, params } = req;
	let qryString = `SELECT * FROM item_info WHERE (loc_id=$1 OR pickup_org_id=$1)`;
	if (query) {
		Object.keys(query).forEach((value, index) => (qryString = qryString + ` AND ${value}=$${index+2}`))
	}
	const sqlText = `${qryString} ORDER BY pickup_end, item_id;`
	// console.log(sqlText, [params.id, ...Object.values(query)]);
	pool.query(sqlText, [params.id, ...Object.values(query)])
		.then((result) => { res.status(200).send(result.rows); })
		.catch((err) => {
			res.status(500).send(err.stack);
		})
})

router.post('/', rejectUnauthenticated, (req, res) => {
	const item = req.body.itemData
	// console.log(req.body);
	let sqlText = 'INSERT INTO items (loc_id, status, food_name, exp_date, qty, qty_unit, number_pkgs, pkg_desc, storage_instructions, prep_instructions, notes, contact_name, contact_phone, contact_email, contact_notes, pickup_start, pickup_end, pickup_notes, created_by)'
	sqlText = sqlText + ' VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19) RETURNING item_id'
	// console.log(sqlText);
	pool.query(sqlText, [item.locId, req.body.status, item.foodName, item.expDate, item.qty, item.qtyUnit, item.numberPkgs, item.pkgDesc, item.storageInstructions, item.prepInstructions, item.notes, item.contactName, item.contactPhone, item.contactEmail, item.contactNotes, item.pickupStart, item.pickupEnd, item.pickupNotes, item.createdById])
		.then((result) => { res.sendStatus(201); })
		.catch((err) => { 
			res.status(500).send(err.stack);
		});
});

router.put('/:id', rejectUnauthenticated, (req, res) => {
	const { body, params } = req;
	let sqlText = `UPDATE items SET`;
	let keys = Object.keys(body);
	keys.forEach((item, index) => sqlText = sqlText + ` ${item}=$${index+2},`);
	sqlText = sqlText.substr(0, sqlText.length-1);
	sqlText = sqlText + ` WHERE item_id=$1;`;
	console.log(sqlText, Object.values(body), params.id);
	pool.query(sqlText, [params.id, ...Object.values(body)])
		.then((result) => res.sendStatus(200))
		.catch((err) => res.status(500).send(err.stack))
})

router.post('/:id/pickups', rejectUnauthenticated, (req, res) => {
	const { params, body } = req;
	sqlText = 'INSERT INTO pickups (item_id, loc_id, created_by, status) VALUES ($1, $2, $3, $4)';
	pool.query(sqlText, [params.id, body.loc_id, body.created_by, 'scheduled'])
		.then(result => { res.sendStatus(201) })
		.catch(err => { res.status(500).send(err.stack)})
})

module.exports = router;