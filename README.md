# 🚀 TangoDev - Sitio Web Oficial

Sitio web corporativo de TangoDev, agencia freelance de desarrollo web especializada en crear soluciones digitales modernas y escalables.

## 🛠️ Stack Tecnológico

- **Framework:** Next.js 15 (App Router)
- **UI:** React 19 + TypeScript
- **Estilos:** Tailwind CSS 4
- **Animaciones:** GSAP + ScrollTrigger
- **Tipografías:** Helvetica Neue + PP Neue Montreal

## 🎨 Características

- ✅ Diseño minimalista y profesional
- ✅ Animaciones fluidas y micro-interacciones
- ✅ Totalmente responsive
- ✅ Optimizado para SEO
- ✅ Efectos parallax con GSAP
- ✅ Componente Aurora para backgrounds dinámicos

## 📦 Instalación

```bash
# Clonar repositorio
git clone [tu-repo]

# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Build para producción
npm run build

# Iniciar producción
npm start
```

## 📂 Estructura del Proyecto

```
src/
├── app/              # Páginas y rutas (Next.js App Router)
│   ├── api/         # API Routes
│   │   └── contact/ # Endpoint para formulario de contacto
│   ├── about/       # Página "Nosotros"
│   ├── contact/     # Página de contacto
│   ├── pricing/     # Página de precios
│   ├── projects/    # Portafolio de proyectos
│   └── page.tsx     # Página principal (Home)
├── components/       # Componentes reutilizables
│   ├── Hero.tsx     # Sección hero principal
│   ├── Navigation.tsx # Navbar
│   ├── Services.tsx # Sección de servicios
│   ├── Showcase.tsx # Portfolio/casos de éxito
│   ├── Process.tsx  # Metodología de trabajo
│   ├── Pricing.tsx  # Planes y precios
│   ├── ContactModal.tsx # Modal de contacto
│   ├── FAQ.tsx      # Preguntas frecuentes
│   ├── CTA.tsx      # Call to action
│   └── Footer.tsx   # Footer del sitio
└── pages/            # Componentes de páginas específicas
```

## 🎯 Secciones del Sitio

1. **Hero** - Introducción impactante con animaciones
2. **Servicios** - Desarrollo web, apps, e-commerce, consultoría
3. **Showcase** - Ejemplos de proyectos y capacidades
4. **Proceso** - Metodología de trabajo en 6 fases
5. **FAQ** - Preguntas frecuentes sobre servicios
6. **Pricing** - Planes: Básico, E-Commerce, SaaS
7. **CTA** - Llamada a la acción para contacto

## 🚀 Deploy

Este proyecto está optimizado para deploy en Vercel:

```bash
vercel deploy
```

## 📝 Configuración

### Fuentes Personalizadas
Las fuentes están en `/public/fonts/`:
- Helvetica Neue (Light, Medium, Bold, Heavy)
- PP Neue Montreal (Thin, Book, Medium, Bold)

### Animaciones GSAP
Todas las animaciones están optimizadas con GSAP y ScrollTrigger para máxima performance.

## 🔧 Variables de Entorno

Crear archivo `.env.local` en la raíz del proyecto:

```env
# Resend API Key (opcional pero recomendado para producción)
# Obtén tu API key en: https://resend.com/api-keys
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxx

# Email de destino para recibir los contactos
# Si no se especifica, se usa tangodev08@gmail.com por defecto
CONTACT_EMAIL=tangodev08@gmail.com
```

### Configuración del Formulario de Contacto

El formulario de contacto está configurado para usar **Resend** como servicio de email. Si no configurás `RESEND_API_KEY`, el sistema funcionará en modo desarrollo (los mensajes se mostrarán en la consola del servidor).

**Para producción:**
1. Creá una cuenta en [Resend](https://resend.com)
2. Obtené tu API Key
3. Agregá `RESEND_API_KEY` a tus variables de entorno en Vercel (o tu plataforma de deploy)
4. Configurá el dominio en Resend si querés usar un remitente personalizado

**Nota:** El sistema tiene un fallback automático. Si Resend no está configurado, los mensajes se registrarán en la consola para desarrollo.

## 📄 Licencia

© 2024 TangoDev. Todos los derechos reservados.

---

**Desarrollado con ❤️ en Argentina**
