import { sendMail } from "./client.ts";
const server = Deno.listen({ port: 8080});

for await (const conn of server) {
  (async () => {
    const httpConn = Deno.serveHttp(conn);
    for await (const requestEvent of httpConn) {
      // ... handle requestEvent ...
			if (requestEvent.request.method == "POST") {

  			const requestBody = await requestEvent.request.text();
				const params = new URLSearchParams(requestBody);
        const message = params.get('message');
				const fullname = params.get('fullname');
        const sender = params.get('contact-email');
				console.log('requestEvent.params:\n', params);

        // send message to client
        sendMail(message, fullname, sender)

        // TODO: redirect
        requestEvent.respondWith(Response.redirect('https://www.wikipedia.de/'));
      }
    }
  })();
}
