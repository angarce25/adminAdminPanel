## Como empezar mi adminPanel :rocket:

### Instalación

Para comenzar a usar nuestra aplicación en tu entorno local, sigue estos pasos:

#### Clona el repositorio:

```bash
git clone https://github.com/angarce25/adminAdminPanel.git
```

#### Instala las dependencias:

```bash
cd adminAdminPanel/ECOMMADMINPANEL
npm install

cd adminAdminPanel/backend
npm install
```

#### Inicia el servidor:

##### En backend:

```bash
nodemon start
```

##### En frontend

```bash
ng build
ng serve
```

Finalmente, abre tu navegador web y visita [http://localhost:4200](http://localhost:4200)

## Deployment :stars:

También puedes simplemente visitar nuestro despliegue de la aplicación: [enlace al despliegue](https://adminpanelmean.netlify.app/)

## Features
La aplicación ofrece las siguientes funcionalidades principales:

- Registro de usuarios.

- Creación de productos, eliminación de productos, actualización de productos y listado.

- Seguridad: La seguridad de los datos de los usuarios es una prioridad. Implementamos medidas de seguridad robustas para proteger la información confidencial.
He implementado protección de rutas, y la idea es asegurarnos que todos los usuarios para poder acceder a los datos estén logeadas. Se ha implementado rate-limit para limitar los intentos de la contraseña.
## Tech Stack :cd:
Nuestra aplicación utiliza el siguiente stack tecnológico:

**Client:** ![Angular](https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white) ![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white)


**Lenguage:** ![HTML](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white) ![CSS](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white) ![TS](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white) ![JAVASCRIPT](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)

**Server:** ![NPM](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white) ![Node](https://img.shields.io/badge/Node%20js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)![Express](https://img.shields.io/badge/Express%20js-000000?style=for-the-badge&logo=express&logoColor=white)![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)

**Testing:** ![Postman](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=Postman&logoColor=white)

### Informe de Seguridad para adminpanelmean.netlify.app

#### Descripción del Sitio
El sitio adminpanelmean.netlify.app es un panel de administración para un sistema de comercio electrónico denominado "E-Commerce Admin Panel".

#### Hallazgos de Seguridad

Durante el análisis de seguridad del sitio, se utilizaron las siguientes herramientas:

1. **OWASP ZAP (Zed Attack Proxy):**
- Se utilizó OWASP ZAP para realizar escaneos automáticos en busca de vulnerabilidades comunes en aplicaciones web.
### Informe de Escaneo de ZAP

#### Detalles del Escaneo

- **Fecha y Hora del Escaneo:** Mon 29 Apr 2024, 08:49:31
- **Versión de ZAP:** 2.14.0

#### Resumen del Escaneo

##### Recuento de Alertas por Riesgo y Confianza

|               | User Confirmed | High | Medium | Low | Total |
|---------------|----------------|------|--------|-----|-------|
| **High**      | 0              | 0    | 0      | 0   | 0     |
| **Medium**    | 0              | 1    | 1      | 0   | 2     |
| **Low**       | 0              | 0    | 1      | 0   | 1     |
| **Info**      | 0              | 0    | 2      | 2   | 4     |
| **Total**     | 0              | 1    | 4      | 2   | 7     |

##### Alertas por Tipo de Alerta

| Tipo de Alerta                                           | Riesgo   | Cantidad |
|----------------------------------------------------------|----------|----------|
| Content Security Policy (CSP) Header Not Set             | Medium   | 3        |
| Missing Anti-clickjacking Header                         | Medium   | 1        |
| X-Content-Type-Options Header Missing                    | Low      | 6        |
| Information Disclosure - Suspicious Comments             | Info     | 6        |
| Modern Web Application                                   | Info     | 1        |
| Re-examine Cache-control Directives                      | Info     | 1        |
| Retrieved from Cache                                     | Info     | 13       |

#### Detalles de las Alertas

##### Riesgo Medio, Confianza Alta (1 Alerta)

- **Tipo de Alerta:** Content Security Policy (CSP) Header Not Set
- **URL:** [https://adminpanelmean.netlify.app/](https://adminpanelmean.netlify.app/)
- **Explicación:** Esta alerta indica que el encabezado de política de seguridad de contenido (CSP) no está configurado en el sitio. La CSP es una capa adicional de seguridad que ayuda a prevenir los ataques de inyección de scripts maliciosos, como Cross-Site Scripting (XSS).
- **Solución:** Implementar una política de CSP adecuada para restringir las fuentes de scripts ejecutables en el sitio y mitigar el riesgo de inyección de scripts.

##### Riesgo Medio, Confianza Media (1 Alerta)

- **Tipo de Alerta:** Missing Anti-clickjacking Header
- **URL:** [https://adminpanelmean.netlify.app/](https://adminpanelmean.netlify.app/)
- **Explicación:** Esta alerta indica que falta el encabezado Anti-clickjacking en el sitio. Este encabezado ayuda a prevenir los ataques de clickjacking, donde un atacante oculta elementos maliciosos en una página web superpuesta para engañar al usuario para que haga clic en ellos.
- **Solución:** Configurar el encabezado Anti-clickjacking para proteger el sitio contra este tipo de ataques.

##### Riesgo Bajo, Confianza Media (1 Alerta)

- **Tipo de Alerta:** X-Content-Type-Options Header Missing
- **URL:** [https://adminpanelmean.netlify.app/](https://adminpanelmean.netlify.app/)
- **Explicación:** Esta alerta indica que falta el encabezado X-Content-Type-Options en el sitio. Este encabezado ayuda a prevenir ataques de sniffing de tipo MIME que pueden conducir a vulnerabilidades de seguridad.
- **Solución:** Configurar el encabezado X-Content-Type-Options para mejorar la protección del sitio contra este tipo de ataques.

##### Riesgo Informativo, Confianza Media (2 Alertas)

- **Tipo de Alerta:** Modern Web Application
- **URL:** [https://adminpanelmean.netlify.app/](https://adminpanelmean.netlify.app/)
- **Explicación:** Esta alerta indica que el sitio utiliza tecnologías y prácticas modernas de desarrollo web. Mientras que esto no es necesariamente una vulnerabilidad, puede proporcionar información útil para evaluar la seguridad y la robustez del sitio.
- **Solución:** Realizar una revisión exhaustiva del código y las configuraciones del sitio para asegurarse de que se sigan las mejores prácticas de seguridad y desarrollo.

- **Tipo de Alerta:** Retrieved from Cache
- **URL:** [https://adminpanelmean.netlify.app/](https://adminpanelmean.netlify.app/)
- **Explicación:** Esta alerta indica que algunas respuestas del sitio fueron recuperadas de la caché. Si bien esto puede mejorar el rendimiento del sitio, también puede exponer información sensible a usuarios no autorizados si no se configura correctamente.
- **Solución:** Revisar y ajustar las configuraciones de caché para garantizar que la información sensible no se almacene ni se entregue incorrectamente desde la caché.



2. **Nmap:**
- Se realizó un escaneo de puertos con Nmap para identificar posibles servicios y configuraciones de red que podrían representar riesgos de seguridad.
   ![Nmap](/ecomadminpanel/src/assets/img/nmap.png) 

3. **Nikton:**
- es una herramienta de línea de comandos que se utiliza para realizar escaneos de puertos, rastreos de ruta y otras tareas relacionadas con el análisis y diagnóstico de redes. Puede ser útil para identificar hosts activos y puertos abiertos en una red.
 ![Nikton](/ecomadminpanel/src/assets/img/nikton.png)

 4. **Hping3:**
- es una herramienta de línea de comandos que se utiliza para realizar escaneos de puertos, rastreos de ruta y otras tareas relacionadas con el análisis y diagnóstico de redes. Puede ser útil para identificar hosts activos y puertos abiertos en una red.
 ![Hping3](/ecomadminpanel/src/assets/img/hping3.png)

 5. **webWhat:**
- En resumen, la salida proporciona información sobre la ubicación del servidor, los códigos de estado HTTP, detalles sobre el servidor web utilizado, algunos encabezados HTTP específicos y una indicación del propósito del sitio web (panel de administración para un sistema de comercio electrónico).
![webWhat](/ecomadminpanel/src/assets/img/whatweb.png)

6. **Wapalayzer:**
- Es una herramienta de código abierto que identifica las tecnologías utilizadas en sitios web. Al analizar un sitio web, Wappalyzer puede proporcionar información sobre las tecnologías específicas que se utilizan en el backend y frontend del sitio.
 ![webWhat](/ecomadminpanel/src/assets/img/wapalyzer.png)
 7. **Burpsuite:**
- es una suite de herramientas diseñada principalmente para pruebas de seguridad en aplicaciones web. En este caso he interceptado la información del login y puedo obtener el token para poder accceder a todas las rutas de mi web.
 ![Burpsuite](/ecomadminpanel/src/assets/img/burpsuite.png)



#### Recomendaciones de Mejora

Basado en los hallazgos anteriores, se sugieren las siguientes mejoras para aumentar la seguridad del sitio:

1. **Escaneo de Vulnerabilidades Regular:**
- Realizar escaneos de seguridad regulares utilizando herramientas como OWASP ZAP o Burp Suite para identificar posibles vulnerabilidades y asegurarse de que el sitio esté siempre protegido contra amenazas conocidas.

2. **Actualización Regular de Componentes:**
- Mantener todos los componentes del sitio, incluidos scripts, frameworks y plugins, actualizados a sus versiones más recientes para mitigar posibles vulnerabilidades conocidas.

3. **Auditoría de Código:**
- Realizar auditorías regulares del código del sitio para identificar y corregir posibles vulnerabilidades de seguridad, como inyección de SQL, Cross-Site Scripting (XSS) y otros ataques comunes.

4. **Políticas de Seguridad de Contenido (CSP):**
- Implementar políticas de seguridad de contenido (CSP) para mitigar los riesgos de Cross-Site Scripting (XSS) y otros ataques basados en contenido.

5. **Seguimiento de Cabeceras de Seguridad:**
- Asegurarse de que todas las cabeceras de seguridad, como Strict-Transport-Security (HSTS), Content-Security-Policy (CSP) y X-Frame-Options, estén correctamente configuradas y sean monitoreadas regularmente.

#### Fecha de Evaluación
Este informe se basa en una evaluación realizada el [29/04/2024].


## ¡Gracias!
