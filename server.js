const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

const authRoutes = require('./routes/authRoutes');
const validationRoutes = require('./routes/validationRoutes');
const errorMiddleware = require('./middleware/errorMiddleware');
const { ApiError } = require('./middleware/ApiError');
const { passport } = require('./middleware/passport-middleware');

app.use(passport.initialize());
app.use('/api/auth', authRoutes);
app.use('/validate', validationRoutes);
app.use((req, res ,next) => next(new ApiError(404, 'Route not found.')))

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Сервер запущен по адресу http://localhost:${PORT}`);
});

