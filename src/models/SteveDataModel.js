const { log } = require('winston');
const { pool_steve, pool } = require('../config/db');

class SteveData {
    constructor() {}

    static async findEVStationByName(charge_box_id) {
        const sql = `SELECT * FROM charge_box WHERE charge_box_id = '${charge_box_id}'`;
        const [rows, fields] = await pool_steve.execute(sql);
        return rows[0];
    }

    static async findEVStationConnecterByName(charge_box_id) {
        const sql = `SELECT * FROM connector WHERE charge_box_id = '${charge_box_id}' and connector_id != 0`;
        const [rows, fields] = await pool_steve.execute(sql);
        return rows;
    }

    static async findEVStationConnecterStatus(charge_box_id, connector_pk) {
        const sql = `SELECT * FROM connector
                    left join connector_status on 
                    connector.connector_pk = connector_status.connector_pk
                    left join charge_box on 
                    charge_box.charge_box_id = connector.charge_box_id
                    where  connector.charge_box_id = '${charge_box_id}' and connector_status.connector_pk = '${connector_pk}'
                    order by connector_status.status_timestamp DESC LIMIT 1;`;
        const [rows, fields] = await pool_steve.execute(sql);
        return rows[0];
    }

    static async findStartTrasectionLast(connector_pk, id_tag) {
        const sql = `SELECT * FROM transaction_start where connector_pk = '${connector_pk}' and id_tag = '${id_tag}' 
        order by transaction_pk DESC LIMIT 1;`;
        const [rows, fields] = await pool_steve.execute(sql);
        return rows[0];
    }

    static async insertTransection(options) {
        try {
            const sql = `
                INSERT INTO transactions (type, user_id, credit,transectionstate, cp_id, connecter_id, id_tag, transection_pk, connecter_pk) 
                VALUES ('${options.type}', '${options.user_id}', '${options.credit}', '${options.transectionstate}', '${options.cp_id}', '${options.connecter_id}', '${options.id_tag}', '${options.transection_pk}', '${options.connecter_pk}')`;

            return await pool.execute(sql);
        } catch (e) {
            if (e.code === 'ER_DUP_ENTRY') return false;
        }
    }
}

module.exports = SteveData;
