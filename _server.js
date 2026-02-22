const http = require('http');
const fs = require('fs');
const path = require('path');
const root = __dirname;
const mime = {'.html':'text/html','.css':'text/css','.js':'application/javascript','.png':'image/png','.jpg':'image/jpeg','.svg':'image/svg+xml','.woff2':'font/woff2','.json':'application/json'};
http.createServer((req,res)=>{
  const url = new URL(req.url,'http://localhost');
  let fp = path.join(root, decodeURIComponent(url.pathname));
  if(fp.endsWith(path.sep)) fp += 'index.html';
  if(!fs.existsSync(fp)){res.writeHead(404);res.end('Not found');return;}
  if(fs.statSync(fp).isDirectory()) fp = path.join(fp,'index.html');
  const ext = path.extname(fp);
  res.writeHead(200,{'Content-Type':mime[ext]||'application/octet-stream','Cache-Control':'no-cache'});
  fs.createReadStream(fp).pipe(res);
}).listen(8091,()=>console.log('Server running on http://localhost:8091'));
