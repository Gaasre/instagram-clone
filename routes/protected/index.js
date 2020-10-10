import express from 'express';
import userRouter from './user';
import feedRouter from './feed';
import postRouter from './post';
import likeRouter from './like';
import followRouter from './follow';
import commentRouter from './comment';

const protectedRoutes = express.Router();

protectedRoutes.use('/user', userRouter);
protectedRoutes.use('/post', postRouter);
protectedRoutes.use('/feed', feedRouter);
protectedRoutes.use('/like', likeRouter);
protectedRoutes.use('/follow', followRouter);
protectedRoutes.use('/comment', commentRouter);

export default protectedRoutes;