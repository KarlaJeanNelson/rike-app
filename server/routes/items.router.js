const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

router.get('/org', rejectUnauthenticated, (req, res) => {
	const { query, user } = req;
	let qryString = ` WHERE loc_id=$1`
	Object.keys(query).forEach((value, index) => (qryString = qryString + ` AND ${value} ILIKE $${index+2}`))
	const sqlText = `SELECT * FROM item_info ${qryString} ORDER BY pickup_end, item_id;`;
	pool.query(sqlText, [user.loc_id, ...Object.values(query)])
		.then((result) => { res.status(200).send(result.rows); })
		.catch((err) => {
			res.status(500).send(err.stack);
		})
});

router.post('/', rejectUnauthenticated, (req, res) => {
	const item = req.body.itemData
	// console.log(req.body);
	let sqlText = 'INSERT INTO items (loc_id, status, food_name, exp_date, qty, qty_unit, number_pkgs, pkg_desc, storage_instructions, prep_instructions, notes, contact_name, contact_phone, contact_email, contact_notes, pickup_start, pickup_end, pickup_notes, created_by)'
	sqlText = sqlText + ' VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19) RETURNING item_id'
	// console.log(sqlText);
	pool.query(sqlText, [item.locId, req.body.status, item.foodName, item.expDate, item.qty, item.qtyUnit, item.numberPkgs, item.pkgDesc, item.storageInstructions, item.prepInstructions, item.notes, item.contactName, item.contactPhone, item.contactEmail, item.contactNotes, item.pickupStart, item.pickupEnd, item.pickupNotes, item.createdById])
		.then((result) => { res.sendStatus(201); })
		.catch((err) => { 
			res.status(500).send(err);
		});
});

module.exports = router;