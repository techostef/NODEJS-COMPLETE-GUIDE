import fs from 'fs';
import { RequestListener } from 'http';
import methodEnum from '../enums/methodEnum';

const requestHandler: RequestListener = (req, res) => {
  const { url } = req;
  const method: keyof typeof methodEnum = req.method as any;
  if (url === '/') {
    res.write('<html>');
    res.write('<body>');
    res.write('<form action="/message" method="post"><div><input type="text" name="message" /> <button type="submit">submit</button></form></div>')
    res.write('</body>');
    res.write('</html>');
    return res.end();
  }
  if (url === '/message' && method === 'POST') {
    let body: any[] = [];
    req.on('data', (chunk) => {
      if (chunk) {
        body.push(chunk);
      }
    })
    req.on('end', () => {
      const parseBody = Buffer.concat(body).toString();
      const message = parseBody.split('=')[1];
      fs.writeFileSync('files/message.text', message);
    })
    res.statusCode = 302;
    res.setHeader('Location', '/end');
    return res.end();
  }
  res.setHeader('Content-Type', 'text/html');
  res.write('<html>');
  res.write('<body>');
  res.write('<div>test</div>')
  res.write('</body>');
  res.write('</html>');
  res.end();
}

export default requestHandler;