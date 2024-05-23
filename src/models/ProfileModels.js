const pool = require('../config/db');
// const { logger } = require('../utils/logger')

class Profile {

    constructor(phone, firstname, lastname, email = '') {
        this._phone = phone;
        this._firstName = firstname;
        this._lastName = lastname;
        this._email = email;
    }

    get phone() {
        return this._phone;
    }

    set phone(phone) {
        this._phone = _phone;
    }

    get firstName() {
        return this._firstName;
    }

    set firstName(firstName) {
        this._firstName = firstName;
    }

    get lastName() {
        return this._lastName;
    }

    set lastName(lastName) {
        this._lastName = lastName;
    }

    get email() {
        return this._email;
    }

    set email(email) {
        this._email = email;
    }

    static async findByIdAndUpdate(id, options) {
        const sql = `UPDATE users SET phone = "${options.phone}", firstname = "${options.firstName}", lastName = "${options.lastName}", email = "${options.email}"  WHERE id = ${id}`;
        let [row] = await pool.execute(sql);
        return row;
    }
}

module.exports = Profile;
