import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

// Tipos para el formulario
interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  'project-type': string;
  budget?: string;
  message: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: ContactFormData = await request.json();
    
    // Validar campos requeridos
    if (!body.name || !body.email || !body['project-type'] || !body.message) {
      return NextResponse.json(
        { error: 'Faltan campos requeridos' },
        { status: 400 }
      );
    }

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: 'Email inválido' },
        { status: 400 }
      );
    }

    // Mapear tipos de proyecto
    const projectTypeMap: Record<string, string> = {
      'landing': 'Landing Page',
      'website': 'Sitio Web Corporativo',
      'ecommerce': 'E-commerce',
      'webapp': 'Aplicación Web',
      'saas': 'SaaS / Plataforma',
      'other': 'Otro'
    };

    const projectType = projectTypeMap[body['project-type']] || body['project-type'];
    const budget = body.budget || 'No especificado';

    // Preparar el contenido del email
    const emailContent = `
Nueva solicitud de contacto desde TangoDev

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

INFORMACIÓN DE CONTACTO
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Nombre: ${body.name}
Email: ${body.email}
${body.phone ? `Teléfono: ${body.phone}` : ''}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

DETALLES DEL PROYECTO
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Tipo de proyecto: ${projectType}
Presupuesto estimado: ${budget}

Mensaje:
${body.message}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Fecha: ${new Date().toLocaleString('es-AR', { 
  timeZone: 'America/Argentina/Buenos_Aires',
  dateStyle: 'full',
  timeStyle: 'long'
})}
    `.trim();

    // Intentar enviar con Resend si está configurado
    const resendApiKey = process.env.RESEND_API_KEY;
    const recipientEmail = process.env.CONTACT_EMAIL || 'tangodev08@gmail.com';

    if (resendApiKey) {
      try {
        const resend = new Resend(resendApiKey);

        const { data, error } = await resend.emails.send({
          from: 'TangoDev <onboarding@resend.dev>', // Cambiar a tu dominio cuando lo configures
          to: recipientEmail,
          replyTo: body.email,
          subject: `Nueva solicitud: ${projectType} - ${body.name}`,
          text: emailContent,
          html: `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #1c1917; color: #e7e5e4;">
              <h2 style="color: #d9ff00; margin-bottom: 20px;">Nueva solicitud de contacto desde TangoDev</h2>
              
              <div style="background-color: #292524; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                <h3 style="color: #fafaf9; margin-top: 0; margin-bottom: 15px;">INFORMACIÓN DE CONTACTO</h3>
                <p style="color: #d6d3d1; margin: 8px 0;"><strong>Nombre:</strong> ${body.name}</p>
                <p style="color: #d6d3d1; margin: 8px 0;"><strong>Email:</strong> ${body.email}</p>
                ${body.phone ? `<p style="color: #d6d3d1; margin: 8px 0;"><strong>Teléfono:</strong> ${body.phone}</p>` : ''}
              </div>

              <div style="background-color: #292524; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                <h3 style="color: #fafaf9; margin-top: 0; margin-bottom: 15px;">DETALLES DEL PROYECTO</h3>
                <p style="color: #d6d3d1; margin: 8px 0;"><strong>Tipo de proyecto:</strong> ${projectType}</p>
                <p style="color: #d6d3d1; margin: 8px 0;"><strong>Presupuesto estimado:</strong> ${budget}</p>
              </div>

              <div style="background-color: #292524; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                <h3 style="color: #fafaf9; margin-top: 0; margin-bottom: 15px;">MENSAJE</h3>
                <p style="color: #d6d3d1; white-space: pre-wrap; line-height: 1.6;">${body.message}</p>
              </div>

              <p style="color: #a8a29e; font-size: 12px; margin-top: 30px; text-align: center;">
                Fecha: ${new Date().toLocaleString('es-AR', { 
                  timeZone: 'America/Argentina/Buenos_Aires',
                  dateStyle: 'full',
                  timeStyle: 'long'
                })}
              </p>
            </div>
          `,
        });

        if (error) {
          console.error('Error de Resend:', error);
          throw new Error('Error al enviar email con Resend');
        }

        console.log('Email enviado exitosamente con Resend:', data?.id);

        return NextResponse.json(
          { 
            success: true, 
            message: 'Mensaje enviado exitosamente',
            method: 'resend'
          },
          { status: 200 }
        );
      } catch (resendError) {
        console.error('Error con Resend, intentando fallback:', resendError);
        // Continuar con el fallback
      }
    }

    // Fallback: Guardar en consola (para desarrollo) o usar otro servicio
    // En producción, podrías guardar en una base de datos o usar otro servicio
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('NUEVA SOLICITUD DE CONTACTO');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(emailContent);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

    // Si no hay Resend configurado, retornar éxito pero con advertencia
    return NextResponse.json(
      { 
        success: true, 
        message: 'Mensaje recibido (modo desarrollo - ver consola)',
        method: 'console',
        warning: !resendApiKey ? 'RESEND_API_KEY no configurado. Configura las variables de entorno para enviar emails.' : undefined
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error en API de contacto:', error);
    return NextResponse.json(
      { 
        error: 'Error al procesar la solicitud',
        details: error instanceof Error ? error.message : 'Error desconocido'
      },
      { status: 500 }
    );
  }
}

