import { SMTPClient } from "https://deno.land/x/denomailer/mod.ts";
// Import the load.ts module to auto-import from the .env file and into the process environment
import 'https://deno.land/std@0.205.0/dotenv/load.ts';
const password = Deno.env.get('PASSWORD');
const username = Deno.env.get('USERNAME');
const hostname = Deno.env.get('HOSTNAME');
const reciver = Deno.env.get('RECIVER');
//console.log(password);
console.log('----CLIENT----- \n');

export async function sendMail (message, fullname: string, sender) {
const client = new SMTPClient({
  connection: {
    hostname: hostname,
    port: 465,
    tls: true,
    auth: {
      username: username,
      password: password,
    },
  },
  debug: {
    log: true,
  }
});
try {
  await client.send({
    from: sender,
    to: [reciver],
    // date?:
    subject: fullname,
    content: message,
  });
} catch (error) {
  console.log('ERROR: ', error);
}
await client.close();
}
