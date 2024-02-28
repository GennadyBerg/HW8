const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

const authRoutes = require('./routes/authRoutes');
const validationRoutes = require('./routes/validationRoutes');
const errorMiddleware = require('./middleware/errorMiddleware');
const { ApiError } = require('./middleware/ApiError');

app.use('/api/auth', authRoutes);
app.use('/validate', validationRoutes);
app.use((req, res ,next) => next(new ApiError(404, 'Route not found.')))

// Подключаем middleware для обработки ошибок
app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Сервер запущен по адресу http://localhost:${PORT}`);
});
