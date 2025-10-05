import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Falta el mensaje" });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Portfolio Form" <${process.env.EMAIL_USER}>`,
      to: "jfornieortega@gmail.com",
      subject: "Nuevo mensaje desde tu portfolio",
      text: message,
    });

    console.log("Correo enviado con éxito:", message);
    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error enviando email:", error);
    res.status(500).json({ error: "Error enviando email" });
  }
}
