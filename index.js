import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
// initialize configuration
dotenv.config();

import bodyParser from 'body-parser';
import db from './models';
import unprotectedRoutes from './routes/unprotected';
import protectedRoutes from './routes/protected';
import verifyToken from './middlewares/jwt';

const app = express();
const protectedApp = express.Router();

// Body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Logging
app.use(morgan('dev'));

app.use(unprotectedRoutes);
app.use(protectedApp);

protectedApp.use(verifyToken)
protectedApp.use('/api', protectedRoutes);

// db.sequelize.sync();
db.sequelize.sync().then(() => {
  console.log("Database sync.");
  app.listen(process.env.PORT, () =>
    console.log(`Server listening on port ${process.env.PORT}!`),
  );
});