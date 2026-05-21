# Laboratorio 11 — User Dashboard

Dashboard hecho con Web Components nativos y Vite.

## Cómo correrlo

```bash
npm install
npm run dev
```

## Personalización

### Textos del usuario

En `index.html`, cambia los atributos del `<user-card>`:

```html
<user-card avatar="A" name="Alonso" role="Profesor"></user-card>
```

- `avatar`: la letra del círculo.
- `name`: el nombre.
- `role`: el rol que aparece debajo.

Ejemplo:

```html
<user-card avatar="M" name="María López" role="Estudiante"></user-card>
```

### Texto del aviso

En `index.html`, el texto entre las etiquetas del `<warning-badge>`:

```html
<warning-badge>Sesión por expirar</warning-badge>
```

Ejemplo:

```html
<warning-badge>Tu sesión expira en 5 minutos</warning-badge>
```

### Cantón inicial del clima

En `index.html`, el atributo `location` del `<weather-time>` (también se puede cambiar desde el selector en pantalla):

```html
<weather-time location="liberia+guanacaste"></weather-time>
```

Ejemplo:

```html
<weather-time location="nicoya+guanacaste"></weather-time>
```

Para agregar o quitar cantones, edita la lista `CANTONES` en `src/components/WeatherTime.js`:

```js
const CANTONES = [
  { value: "liberia+guanacaste", label: "Liberia" },
  { value: "nicoya+guanacaste",  label: "Nicoya" },
  // agrega más aquí...
];
```

### Colores

#### Fondo de la página
En `index.html`, dentro de `<style>`:

```css
body {
  background: #0a0f1e;
}
```

#### Tarjeta de usuario (azul)
En `src/components/UserCard.js`, dentro de `:host`:

```css
background: linear-gradient(160deg, #2563eb 0%, #1e3a8a 100%);
```

Ejemplo (cambiar a morado):

```css
background: linear-gradient(160deg, #7c3aed 0%, #4c1d95 100%);
```

#### Tarjeta del clima (verde)
En `src/components/WeatherTime.js`, dentro de `:host`:

```css
background: linear-gradient(160deg, #0d9488 0%, #064e3b 100%);
```

#### Aviso de sesión (amarillo)
En `src/components/WarningBadge.js`, dentro de `:host`:

```css
border: 1px solid rgba(234, 179, 8, 0.4);
background: linear-gradient(180deg, rgba(234,179,8,0.14), rgba(234,179,8,0.06));
color: #fde68a;
```

#### Botón "Saludar"
En `src/components/UserCard.js`, dentro de `button`:

```css
background: #fff;
color: #1e3a8a;
```