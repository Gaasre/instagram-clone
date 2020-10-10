import express from 'express';
import signupRouter from './signup';
import loginRouter from './login';

const unprotectedRoutes = express.Router();

unprotectedRoutes.use('/login', loginRouter);
unprotectedRoutes.use('/signup', signupRouter);

export default unprotectedRoutes;