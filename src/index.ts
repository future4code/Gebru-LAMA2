import { app } from './app'
import { showRouter } from './routes/ShowRouter'

app.use('/show/', showRouter)