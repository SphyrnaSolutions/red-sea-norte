# Despliegue con Docker

## Requisitos

- Docker
- Docker Compose
- Node.js 22 LTS (para desarrollo local)

## Configuración

1. **Crear archivo `.env` para producción:**

```bash
cp .env.example .env
```

2. **Editar `.env` con tus valores de producción:**

```env
NEXT_PUBLIC_WAGTAIL_URL=https://back.redsea.sphyrnasolutions.com
NEXT_PUBLIC_SITE_HOSTNAME=redsea.sphyrnasolutions.com
```

## Despliegue

### Build y arranque

```bash
docker-compose up -d --build
```

### Ver logs

```bash
docker-compose logs -f frontend
```

### Detener

```bash
docker-compose down
```

## Configuración del Reverse Proxy

El contenedor expone el puerto **3000 internamente** (no mapeado a host).

El contenedor está conectado a dos redes:
- **`redsea-network`** - Red interna del proyecto
- **`dokploy-network`** - Red externa de Dokploy para el reverse proxy

Debes configurar tu reverse proxy (Dokploy, Nginx, Traefik, Caddy) para apuntar a:

**Nombre del contenedor:** `redsea-frontend`
**Puerto interno:** `3000`
**Red:** `dokploy-network`

### Ejemplo con Nginx (en otro contenedor en dokploy-network)

```nginx
upstream frontend {
    server redsea-frontend:3000;
}

server {
    listen 80;
    server_name redsea.sphyrnasolutions.com;

    location / {
        proxy_pass http://frontend;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

### Configuración con Dokploy

Si usas Dokploy, el reverse proxy ya está configurado automáticamente.
Solo asegúrate de que el contenedor esté en la red `dokploy-network` (ya incluido en el compose).

## Healthcheck

El contenedor incluye un healthcheck que verifica cada 30 segundos si el servidor Next.js responde correctamente.

## Variables de Entorno

| Variable | Descripción | Ejemplo |
|----------|-------------|---------|
| `NEXT_PUBLIC_WAGTAIL_URL` | URL del backend Wagtail | `https://back.redsea.sphyrnasolutions.com` |
| `NEXT_PUBLIC_SITE_HOSTNAME` | Hostname del site para multi-site | `redsea.sphyrnasolutions.com` |

## Troubleshooting

### Ver estado del contenedor

```bash
docker-compose ps
```

### Verificar healthcheck

```bash
docker inspect redsea-frontend | grep -A 10 Health
```

### Reconstruir desde cero

```bash
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```
