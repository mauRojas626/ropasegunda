import React from 'react';

const Prenda = React.lazy(() => import('../views/pages/principal/Prenda'));
const Prendas = React.lazy(() => import('../views/pages/principal/Prendas'));
const Pago = React.lazy(() => import('../views/pages/principal/Pago'));
const Comprados = React.lazy(() => import('../views/pages/principal/Comprados'));
const Entrega = React.lazy(() => import('../views/pages/principal/SolicitudEnvio'));
const Perfil = React.lazy(() => import('../views/pages/principal/InformacionUsuario'));
const EnVenta = React.lazy(() => import('../views/pages/principal/EnVenta'));
const Nuevo = React.lazy(() => import('../views/pages/principal/NuevaPrenda'));
const Admin = React.lazy(() => import('../views/pages/principal/Administrador'));

const routes = [
  { path: '/', exact: true, name: 'Inicio' },
  { path: '/principal', exact: true, name: 'Principal', component: Prendas },
  { path: '/prenda', exact: true, name: 'Detalle', component: Prenda },
  { path: '/prendas', exact: true, name: 'Prendas', component: Prendas },
  { path: '/pago', exact: true, name: 'Pago', component: Pago },
  { path: '/comprados', exact: true, name: 'Comprados', component: Comprados },
  { path: '/comprados/pago', exact: true, name: 'Pago', component: Pago },
  { path: '/comprados/entrega', exact: true, name: 'Entrega', component: Entrega },
  { path: '/perfil', exact: true, name: 'Perfil', component: Perfil },
  { path: '/en-venta/nuevo', exact: true, name: 'Nuevo', component: Nuevo },
  { path: '/en-venta/editar', exact: true, name: 'Editar', component: Nuevo },
  { path: '/en-venta', exact: true, name: 'En Venta', component: EnVenta },
  { path: '/admin', exact: true, name: 'Admin', component: Admin }
];

export default routes;
