const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const usuarioRouter = require('./routes/usuarioRoutes');
const authRouter = require('./routes/authRoutes');
const projectRouter = require('./routes/projectRoutes');
const taskRouter = require('./routes/taskRoutes');

const app = express();

app.use(cors({
    origin: "*"
}));

app.use(morgan('dev'));

app.use(express.json());

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/usuarios', usuarioRouter);
app.use('/api/v1/projects', projectRouter);
app.use('/api/v1/tasks', taskRouter);

module.exports = app;