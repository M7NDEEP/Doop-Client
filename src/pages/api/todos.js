import { Pool } from 'pg';
import { v4 as uuidv4 } from 'uuid';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export default async function handler(req, res) {
  switch (req.method) {
    case 'GET':
      try {
        const userEmail = req.query.userEmail;
        const todos = await pool.query('SELECT * FROM dooptodo WHERE user_email = $1', [userEmail]);
        res.status(200).json(todos.rows);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
      }
      break;
    case 'POST':
      try {
        const { user_email, title, progress } = req.body;
        const id = uuidv4();
        await pool.query(
          `INSERT INTO dooptodo(id, user_email, title, progress, date) VALUES($1, $2, $3, $4, $5)`,
          [id, user_email, title, progress, Date.now()],
        );
        res.status(201).json({ message: 'Todo created successfully' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
      }
      break;
      case 'DELETE':
        try {
          const id = req.query.id;
          await pool.query(`DELETE FROM dooptodo WHERE id = $1`, [id]);
          res.status(200).json({ message: 'Todo deleted successfully' });
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Internal server error' });
        }
        break;
      case 'PUT':
        try {
          const id = req.query.id;
          const { title, progress } = req.body;
          await pool.query(`UPDATE dooptodo SET title = $1, progress = $2 WHERE id = $3`, [title, progress, id]);
          res.status(200).json({ message: 'Todo updated successfully' });
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Internal server error' });
        }
        break;
  }
}