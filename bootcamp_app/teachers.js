const { Pool } = require('pg');

const pool = new Pool({
  user: 'markwhite',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});

const args = process.argv.slice(2);

const tQuery = `
SELECT DISTINCT teachers.name AS teacher, cohorts.name as cohort
FROM assistance_requests
JOIN teachers ON teachers.id = teacher_id
JOIN students ON students.id = student_id
JOIN cohorts ON cohorts.id = cohort_id
WHERE cohorts.name LIKE $1
ORDER BY teacher;
`;

pool.query(tQuery, [`%${args[0]}%`])
  .then(res => {
    res.rows.forEach(row => {
      console.log(`${row.cohort}, ${row.teacher}`)
    })
  })
  .catch(err => {
    console.error('query error', err.stack)
  });