import { sendMail } from "./client.ts";
const server = Deno.listen({ port: 8080});

for await (const conn of server) {
  (async () => {
    const httpConn = Deno.serveHttp(conn);
    for await (const requestEvent of httpConn) {
      // ... handle requestEvent ...
			if (requestEvent.request.method == "POST") {
  			console.log(requestEvent);
  			//const requestBody = await requestEvent.request.formData();
  			const requestBody = await requestEvent.request.text();
				console.log(requestBody);
				const params = new URLSearchParams(requestBody);
				console.log(params);
				console.log(params.get('fullname'))
			  requestEvent.respondWith(new Response("Dings\n"));
			} else {
				requestEvent.respondWith(new Response("nein\n"))
			}
    }
  })();
}
