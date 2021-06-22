const Koa = require('koa');
const fs = require('fs');
const path = require('path');

const app = new Koa();

app.use((context) => {
  // Serve index.html
  if (context.path === '/') {
    console.log('Sending HTML');
    context.response.body = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Video</title>
      </head>
      <body>
        <video controls height="240" width="320">
          <source src="/placeholder.mp4" type="video/mp4" />
          <source src="/placeholder.ogv" type="video/ogv" />
          <source src="/placeholder.webm" type="video/webm" />
        </video>
      </body>
    </html>
    `;
  } else {
    // Serve video
    const videoPath = path.join(__dirname, 'videos', context.request.path);
    console.log('Sending', videoPath);
    context.response.body = fs.createReadStream(videoPath);
  }

  context.response.status = 200;
});

app.listen(8081, () => console.log(`Listening on port 8081`));
