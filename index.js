const express = require('express');
const app = express();
app.use(express.json());

let students = [];
let id = 1;

app.post('/api/students', (req, res) => {
  const { name, course, age } = req.body;
  if (!name || !course || !age) return res.status(400).json({ msg: 'Missing data' });
  if (students.some(s => s.name.toLowerCase() === name.toLowerCase())) {
    return res.status(409).json({ msg: 'Duplicate name' });
  }
  const student = { id: id++, name, course, age: Number(age) };
  students.push(student);
  res.status(201).json(student);
});

app.get('/api/students', (req, res) => {
  const { course } = req.query;
  if (course) {
    return res.status(200).json(students.filter(s => s.course.toLowerCase() === course.toLowerCase()));
  }
  res.status(200).json(students);
});

app.get('/api/students/:id', (req, res) => {
  const student = students.find(s => s.id == req.params.id);
  if (!student) return res.status(404).json({ msg: 'Not found' });
  res.status(200).json(student);
});

app.put('/api/students/:id', (req, res) => {
  const student = students.find(s => s.id == req.params.id);
  if (!student) return res.status(404).json({ msg: 'Not found' });

  const { name, course, age } = req.body;
  if (!name || !course || !age) return res.status(400).json({ msg: 'Missing data' });
  if (students.some(s => s.name.toLowerCase() === name.toLowerCase() && s.id !== student.id)) {
    return res.status(409).json({ msg: 'Duplicate name' });
  }

  Object.assign(student, { name, course, age: Number(age) });
  res.status(200).json(student);
});

app.delete('/api/students/:id', (req, res) => {
  const idx = students.findIndex(s => s.id == req.params.id);
  if (idx === -1) return res.status(404).json({ msg: 'Not found' });
  res.status(200).json(students.splice(idx, 1)[0]);
});

app.listen(3000, () => console.log('Server running on 3000'));