import { Pool } from 'pg';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export default async function handler(req, res) {
  if (req.method === 'POST') {
    if (req.url === '/auth/signup') { // Check the filename instead of req.url
      const { email, password } = req.body;
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(password, salt);

      try {
        await pool.query(`INSERT INTO auth (email, password) VALUES($1, $2)`, [email, hashedPassword]);
        const token = jwt.sign({ email }, 'secret', { expiresIn: '1hr' });
        res.status(201).json({ email, token });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
      }
    } else if (req.url === '/auth/login') { // Check the filename instead of req.url
      const { email, password } = req.body;

      try {
        const users = await pool.query(`SELECT * FROM auth WHERE email = $1`, [email]);
        if (!users.rows.length) {
          return res.status(404).json({ detail: 'User does not exist!' });
        }

        const success = await bcrypt.compare(password, users.rows[0].password);
        const token = jwt.sign({ email }, 'secret', { expiresIn: '1hr' });

        if (success) {
          res.status(200).json({ email: users.rows[0].email, token });
        } else {
          res.status(401).json({ detail: 'Login Failed' });
        }
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
      }
    } else {
      res.status(404).json({ error: 'Invalid route' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
