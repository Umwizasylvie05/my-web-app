const http = require('node:http');

const hostname = '127.0.0.1';
const port = 9000;

// Set your desired credentials
const AUTH_USER = 'admin';
const AUTH_PASS = 'secret123';

const server = http.createServer((req, res) => {
  const authHeader = req.headers.authorization;

  // 1. Check if the Authorization header is missing
  if (!authHeader) {
    res.writeHead(401, {
      'WWW-Authenticate': 'Basic realm="Secure Area"',
      'Content-Type': 'text/plain',
    });
    return res.end('Authentication required.\n');
  }

  // 2. Decode the Base64 credentials ("Basic <base64>")
  const base64Credentials = authHeader.split(' ')[1];
  const credentials = Buffer.from(base64Credentials, 'base64').toString('utf-8');
  const [username, password] = credentials.split(':');

  // 3. Verify username and password
  if (username === AUTH_USER && password === AUTH_PASS) {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello, World! You are authenticated.\n');
  } else {
    res.writeHead(401, {
      'WWW-Authenticate': 'Basic realm="Secure Area"',
      'Content-Type': 'text/plain',
    });
    res.end('Invalid credentials.\n');
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
