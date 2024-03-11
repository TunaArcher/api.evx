const pool = require('../config/db');
// const { logger } = require('../utils/logger')

class User {
    constructor(firstname, lastName, email, password) {
        this._firstName = firstname;
        this._lastName = lastName;
        this._email = email;
        this._password = password;
    }

    get firstName() {
        return this._firstName;
    }

    set firstName(firstName) {
        if (!firstName) throw new Error('Invalid first name value.');

        firstName = firstName.trim();
        if (firstName === '') throw new Error('Invalid first name value.');

        this._firstName = firstName;
    }

    get lastName() {
        return this._lastName;
    }

    set lastName(lastName) {
        if (!lastName) throw new Error('Invalid last name value.');

        lastName = lastName.trim();
        if (lastName === '') throw new Error('Invalid last name value.');

        this._lastName = lastName;
    }

    get email() {
        return this._email;
    }

    set email(email) {
        if (email < 0) throw new Error('Invalid email value.');

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
            const sql = `INSERT INTO users (firstname, lastname, email, password) VALUES ('${this.firstName}', '${this.lastName}', '${this.email}', '${this.password}')`;
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

    static async findByEmail(email) {
        const sql = `SELECT * FROM users WHERE email = '${email}'`;
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
