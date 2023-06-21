import express, { Application, NextFunction, Request, Response } from 'express';
// import usersService from './app/modules/users.service'

import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import routes from './app/routes';

import httpStatus from 'http-status';
// import { generateFacultyId } from './app/modules/user/user.untills';
// import { UserRoutes } from './app/modules/user/user.route';
// import { AcademicSemesterRoutes } from './app/modules/academicSemester/academicSemester.route';

const app: Application = express();

app.use(cors());
//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

console.log(app.get('env'));
//application routes
// app.use('/api/v1/users/', UserRoutes);

// app.use('/api/v1/academic-semesters', AcademicSemesterRoutes);

app.use('/api/v1/', routes);

// //testing
// app.get('/', async(req: Request, res: Response, next: NextFunction) => {

// throw new Error("Testing error logger")
// })

// global error handler
app.use(globalErrorHandler);

//handle not found
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Not Found',
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'API Not found',
      },
    ],
  });
  next();
});



// const testId = async() =>{
//   const testId = generateFacultyId();
//   console.log(testId);
// }
// testId()


export default app;
