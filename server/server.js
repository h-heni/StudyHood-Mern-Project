const express = require('express');
const cors = require("cors")
const cookieParser = require('cookie-parser');
const app = express();
require('dotenv').config({ path: `config/.env` });

const PORT = process.env.PORT || 3001 ;
// import multer from "multer";
// import helmet from "helmet";
// import morgan from "morgan";
// import path from "path";
const { fileURLToPath }= require("url") ;
// import userRoutes from './routes/user.routes'
// import { register } from './controllers/auth'

// Middelware
// const __filename=fileURLToPath(import.meta.url)
// const __dirname=path.dirname(__filename);
// app.use(express.json());
// app.use(helmet());
// app.use((helmet.crossOriginOpenerPolicy({policy:'same-origin'})));
// app.use(morgan('common'));
// app.use(bodyParser.json({limit:'30mb',extended:true}));
// app.use(bodyParser.urlencoded({limit:'30mb',extended:true}));
// app.use('/assets',express.static(path.join(__dirname,'public/assets')))

// Storage
// const storage = multer.diskStorage({
//     destination:function(req,file,cb){
//         cb(null, "public/assets");
//     },
//     filename:function(req,file,cb){
//         cb(null, file.originalname);
//     }
// });
// const upload= multer({storage})

// Routes
// files
// app.post("/auth/register", upload.single('picture'),register)
// Other Routes
// app.use('/user.routes', userRoutes);
app.use(cors({credentials: true, origin: 'http://localhost:3000'}), express.json() , express.urlencoded({extended:true}));
app.use(cookieParser());
//Mongoose
const db_name = 'mern';
require('./config/mongoose.config')(db_name)

require('./routes/user.routes')(app)


app.listen(process.env.PORT,()=>{
    console.log(`Server is Running at ${process.env.PORT}`);
})

