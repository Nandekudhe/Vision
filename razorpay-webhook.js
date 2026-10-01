export default async (req) => {
  if (req.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  const body = await req.text();

  console.log("Razorpay webhook received:", body);

  return new Response("OK", { status: 200 });
};