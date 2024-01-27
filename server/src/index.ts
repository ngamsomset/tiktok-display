import express, { Request, Response } from 'express';
import querystring from 'querystring';
import cors from 'cors';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.listen(port, () => {
  console.log(`server running on ${port}`);
});

app.get('/auth', (req: Request, res: Response) => {
  const csrf = Math.random().toString(36).substring(2);
  res.cookie('csrf', csrf, { maxAge: 60000 });

  let url = 'https://www.tiktok.com/v2/auth/authorize/';
  url += `?client_key=${process.env.CLIENT_KEY}`;
  url += '&scope=user.info.basic,user.info.profile,user.info.stats,video.list';
  url += '&response_type=code';
  url += `&redirect_uri=${process.env.REDIRECT_URL}`;
  url += '&state=' + csrf;
  res.json({ url: url });
});

app.post('/accesstoken', async (req: Request, res: Response) => {
  try {
    const { code } = req.body;
    const decode = decodeURI(code);
    const token = 'https://open.tiktokapis.com/v2/oauth/token/';
    const params = {
      client_key: `${process.env.CLIENT_KEY}`,
      client_secret: `${process.env.SECRETS}`,
      code: decode,
      grant_type: 'authorization_code',
      redirect_uri: `${process.env.REDIRECT_URL}`,
    };

    const response = await axios.post(token, querystring.stringify(params), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Cache-Control': 'no-cache',
      },
    });

    if (response.data.access_token) {
      const videoStream = await axios.post(
        'https://open.tiktokapis.com/v2/video/list/?fields=id,title,video_description,duration,cover_image_url,embed_link',
        {
          max_count: 20,
        },
        {
          headers: {
            Authorization: `Bearer ${response.data.access_token}`,
            'Content-Type': 'application/json',
          },
        },
      );

      res.send(videoStream.data.data.videos);
    }
  } catch (error) {
    console.error('Error happened:', (error as Error).message);
    res.status(500).send('An error occurred during the login process.');
  }
});
