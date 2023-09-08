const CLIENT_URL: string = process.env.CLIENT_URL || "http://localhost:5173";

const allowedOrigins: string[] = [CLIENT_URL];

export { allowedOrigins };
