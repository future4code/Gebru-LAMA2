import { app } from './app'
import { userRouter } from "./routes/UserRouter"
import { showRouter } from './routes/ShowRouter'
import { bandRouter } from './routes/BandRouter'

app.use('/user',userRouter.post("/signup"))
app.use('/user',userRouter.post("/login"))
app.use('/user',userRouter.get("/users"))
app.use('/user',userRouter.get("/users/:id"))
app.use('/show/', showRouter)
app.use("/band", bandRouter.post("/bands"))
app.use("/band", bandRouter.get("/bands/:id"))
