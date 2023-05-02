import express from "express"
import cors from "cors"
import * as dotenv from 'dotenv'
import { Configuration, OpenAIApi } from "openai"

dotenv.config();

console.log(process.env.OPENAI_API_KEY)

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const app = express();
app.use(cors())
app.use(express.json())

app.get('/', async (req, res) => {
    res.status(200).send({
        message: "hello from imageGen"
    })
})


app.post('/', async (req, res) => {
    try {
        const prompt = req.body.prompt

        const response = await openai.createImage({
            prompt: `${prompt}`,
            n: 1,
            size: '512x512'
        })
        // bot = []
        res.status(200).send({ bot: response['data'].data[0].url })
        // console.log(bot)

    } catch (error) {
        console.log(error);
        res.status(500).send({ error })
    }
})


app.listen(3000, () => {
    console.log('Server is running on port 3000')
})
// const response = await openai.createImage({
//     prompt: `${prompt}`,
//     n: 1,
//     size: "512x512",
//   });
