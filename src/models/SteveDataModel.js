const {pool_steve} = require('../config/db');

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
}

module.exports = SteveData;