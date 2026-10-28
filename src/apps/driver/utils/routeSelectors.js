export function pickCurrentRoute(routes) {
  return (
    routes.find((route) => route.status === 'In Progress') ||
    routes.find((route) => route.status === 'Delayed') ||
    routes.find((route) => route.status === 'Upcoming') ||
    null
  );
}
