import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    // Valida que los datos necesarios están presentes
    if (!name || !email || !message) {
      return NextResponse.json({ message: 'Faltan campos requeridos.' }, { status: 400 });
    }

    // Configura el transportador de Nodemailer usando las variables de entorno
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_SERVER_USER,
        pass: process.env.EMAIL_SERVER_PASSWORD, // Usa la contraseña de aplicación generada
      },
    });

    // Opciones del correo
    const mailOptions = {
      from: `"${name}" <${process.env.EMAIL_SERVER_USER}>`, // El remitente que verás
      to: 'miriampsykolog@gmail.com', // Tu correo de destino
      replyTo: email, // Para que puedas responder directamente al remitente
      subject: `Ny melding fra kontaktskjema: ${name}`,
      html: `
        <h1>Ny melding fra ${name}</h1>
        <p><strong>E-post:</strong> ${email}</p>
        <p><strong>Melding:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    };

    // Envía el correo
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: 'Meldingen ble sendt!' }, { status: 200 });

  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ message: 'Noe gikk galt ved sending av melding.' }, { status: 500 });
  }
}