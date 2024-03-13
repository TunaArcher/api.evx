const pool = require('../config/db');
// const { logger } = require('../utils/logger')

class User {
    constructor(phone, password, firstname, lastname, email = '') {
        this._phone = phone;
        this._password = password;
        this._firstName = firstname;
        this._lastName = lastname;
        this._email = email;
    }

    get phone() {
        return this._phone;
    }

    set phone(phone) {
        if (!phone) throw new Error('Invalid phone value.');

        phone = phone.trim();
        if (phone === '') throw new Error('Invalid phone value.');

        this._phone = phone;
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

    get password() {
        return this._password;
    }

    set password(password) {
        if (password < 0) throw new Error('Invalid password value.');
        this.password = password;
    }

    async save() {
        try {
            const sql = `
                INSERT INTO users (phone, password, firstname, lastname, email) 
                VALUES ('${this.phone}', '${this.password}', '${this.firstName}', '${this.lastName}', '${this.email}')
            `;
            return await pool.execute(sql);
        } catch (e) {
            if (e.code === 'ER_DUP_ENTRY') return false;
        }
    }

    static async find() {
        const sql = 'SELECT * FROM users';
        const [rows, fields] = await pool.execute(sql);

        return rows;
    }

    static async findByPhone(phone) {
        const sql = `SELECT * FROM users WHERE phone = '${phone}'`;
        console.log(sql)
        const [rows] = await pool.execute(sql);
        return rows[0];
    }

    static async findByIdAndUpdate(id, options) {
        const sql = `UPDATE users SET firstname = "${options.firstName}", lastName = "${options.lastName}", email = ${options.email} WHERE id = "${id}"`;
        await pool.execute(sql);
    }

    static async findByIdAndDelete(id) {
        const sql = `DELETE FROM users WHERE id = "${id}"`;
        await pool.execute(sql);
    }
}

module.exports = User;
