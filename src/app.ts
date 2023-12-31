import express, { json, urlencoded } from 'express';
import RootRouter from './routes';
import cors from 'cors';
import userRoute from './routes/userRouter';
import bookerRoute from './routes/bookerRouter';
import OperatorRoute from './routes/operatorRouter';
import ApproverRoute from './routes/approverRouter';

function App(port: number) {
    const app = express();

    app.use(cors({
        origin: [process.env.CLIENT_DOMAIN as string, process.env.CLIENT_DOMAIN_HOST as string]
    }))
    app.use(json());
    app.use(urlencoded({ extended: true }));
    app.get('', (req, res) => {
        res.status(200).send({
            message: 'Kết nối thành công!'
        })
    })
    app.use('/api/v1', RootRouter)
    app.use('/api/v1' , userRoute)
    app.use('/api/v1' ,bookerRoute)
    app.use('/api/v1' ,OperatorRoute)
    app.use('/api/v1' ,ApproverRoute)


    app.listen(port, () => {
        console.log(`The application is listening on port ${port}!`);
    })
}
export default App
