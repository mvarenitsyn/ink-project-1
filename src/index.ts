import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import {Request, Response} from 'express'

const app = express()
app.use(cors())
app.use(bodyParser())

const port = process.env.PORT || 3003

const videos = [
    {id: 1, title: 'About JS - 01', author: 'it-incubator.eu'},
    {id: 2, title: 'About JS - 02', author: 'it-incubator.eu'},
    {id: 3, title: 'About JS - 03', author: 'it-incubator.eu'},
    {id: 4, title: 'About JS - 04', author: 'it-incubator.eu'},
    {id: 5, title: 'About JS - 05', author: 'it-incubator.eu'},
]

app.get('/', (req:Request, res:Response) =>  {
    res.status(200).send('Hello, dear?!');
})

app.get('/videos', (req:Request, res:Response) =>  {
    res.status(200).send(videos);
})

app.get('/videos/:videoId', (req:Request, res:Response) =>  {
    const videoIndex = videos.findIndex(item => item.id === +req.params.videoId)

    if(videoIndex>=0) {
        res.status(200).send(videos[videoIndex])
    } else {
        res.status(404)
    }
    res.end();
})

app.post('/videos', (req:Request, res:Response) => {
    const newVideo = {
        id: +(new Date()),
        title: req.body.title,
        author: 'Mikhail'
    }

    if(newVideo.title) {
        videos.push(newVideo)
        res.status(201).send(newVideo)
    } else {
        res.status(400).send(handleError('Field is incorrect', 'title'))
    }
})

app.put('/videos/:id', (req:Request, res:Response) =>  {
    const updateIndex = videos.findIndex(item => item.id === +req.params.id)
    if(updateIndex>=0) {
        if(req.body.title.length <= 40) {
            videos[updateIndex].title = req.body.title
            res.status(204)
        } else {
            res.status(400).send(handleError('Input has exceeded maximum length of 40 symbols', 'title'))
        }
    } else {
        res.status(404)
    }
    res.end()

})

app.delete('/videos/:id', (req:Request, res:Response) => {
    const delIndex = videos.findIndex(item => item.id === +req.params.id)

    if(delIndex>=0) {

        videos.splice(delIndex, 1)
        res.status(204)

    } else {
        res.status(404)
    }
    res.end()

})




app.listen(port, () => {
    console.log(`Server up and running op port ${port}`)
})

const handleError = (message:String, field:String) => {
    return JSON.parse(`{ "errorMessages": [
        {
            "message" = "${message}",
            "field" = "${field}"
        }
    ]}`)
}