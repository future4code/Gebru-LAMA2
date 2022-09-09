import { app } from './app'
import { userRouter } from "./routes/UserRouter"
import { showRouter } from './routes/ShowRouter'

app.use('/user',userRouter.post("/signup"))
app.use('/show/', showRouter)
