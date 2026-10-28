import React, { createContext, useCallback, useContext, useState } from 'react';
import profile from '../../../data/driver/profile.json';
import routeData from '../../../data/driver/routes.json';
import programData from '../../../data/driver/programs.json';
import alertData from '../../../data/driver/alerts.json';
import issueOptions from '../../../data/driver/issueOptions.json';
import messages from '../../../data/driver/messages.json';
import { useToast } from '../../../shared/components/Toast';
import { pickCurrentRoute } from '../utils/routeSelectors';

const DriverContext = createContext(null);

const delayPattern = new RegExp(issueOptions.delayPattern, 'i');

export function DriverProvider({ children }) {
  const toast = useToast();

  const [authenticated, setAuthenticated] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [user, setUser] = useState(profile.user);
  const [page, setPage] = useState('home');
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [offline, setOffline] = useState(false);
  const [queued, setQueued] = useState(0);
  const [routes, setRoutes] = useState(routeData);
  const [programs, setPrograms] = useState(programData);
  const [alerts, setAlerts] = useState(alertData);
  const [logged, setLogged] = useState([]);

  const send = useCallback(
    (message) => {
      if (offline) {
        setQueued((count) => count + 1);
        toast(messages.offlineSaved);
      } else {
        toast(message);
      }
    },
    [offline, toast]
  );

  const updateRoute = useCallback((number, changes) => {
    setRoutes((list) => list.map((route) => (route.number === number ? { ...route, ...changes } : route)));
  }, []);

  const signIn = useCallback((newUser) => {
    if (newUser) setUser(newUser);
    setPage('home');
    setAuthenticated(true);
  }, []);

  const signOut = useCallback(() => {
    setAuthMode('login');
    setAuthenticated(false);
  }, []);

  const goTo = useCallback((key) => {
    setPage(key);
    setSelectedRoute(null);
  }, []);

  const openRoute = useCallback((number) => {
    setSelectedRoute(number);
    setPage('collection');
  }, []);

  const toggleOffline = useCallback(() => {
    const next = !offline;
    setOffline(next);
    if (!next && queued) {
      toast(`${queued} saved update${queued > 1 ? 's' : ''} synced.`);
      setQueued(0);
    }
  }, [offline, queued, toast]);

  const startCollection = useCallback(
    (number) => {
      const other = routes.find((route) => route.status === 'In Progress' && route.number !== number);
      if (other) {
        toast(`Finish Route ${other.number} first.`);
        return;
      }
      updateRoute(number, { status: 'In Progress' });
      send(`Collection started. Ward ${profile.ward} sees Route ${number} In Progress. Citizens are told your vehicle is approaching.`);
    },
    [routes, toast, updateRoute, send]
  );

  const submitCollection = useCallback(
    (number, { status, weight, reason }) => {
      const kg = status === 'Unable to Complete' ? 0 : Number(weight) || 0;
      updateRoute(number, { status, weight: kg, ...(status !== 'Completed' ? { reason } : {}) });
      setSelectedRoute(number);
      const recorded = kg
        ? ` ${kg} kg (${(kg / 1000).toFixed(2)} t) recorded. Ward ${profile.ward} and KMC totals are updated.`
        : ' Ward and KMC are told this route is not completed.';
      const citizens = status === 'Completed' ? ' Citizens are told their waste was collected.' : '';
      send(`Collection updated successfully.${recorded}${citizens}`);
    },
    [updateRoute, send]
  );

  const collectArea = useCallback(
    (number) => {
      const route = routes.find((item) => item.number === number);
      if (!route) return;
      const done = Math.min(5, route.areasDone + 1);
      updateRoute(number, { areasDone: done });
      toast(done >= 5 ? messages.allAreasDone : `Area collected. Next: ${route.areas[done]}`);
    },
    [routes, updateRoute, toast]
  );

  const simulateWardChange = useCallback(() => {
    updateRoute(messages.wardRouteNumber, { time: messages.wardRouteTime });
    setAlerts((list) => [{ id: `ward-${Date.now()}`, text: messages.wardAlert }, ...list]);
    toast(messages.wardChanged);
  }, [updateRoute, toast]);

  const reportIssue = useCallback(
    (kind, option) => {
      const active = routes.find((route) => route.status === 'In Progress');
      const delays = kind === 'Vehicle' || delayPattern.test(option);
      let extra = '';
      if (active && delays) {
        updateRoute(active.number, { status: 'Delayed' });
        extra = ` Route ${active.number} is now Delayed; citizens are told the next expected time.`;
      }
      setLogged((list) => [`${kind}: ${option}`, ...list]);
      send(`${messages.reportSubmitted}${extra}`);
    },
    [routes, updateRoute, send]
  );

  const submitLeave = useCallback(
    (reason, date) => {
      setLogged((list) => [`Leave: ${reason}, ${date}`, ...list]);
      send(messages.absenceSent);
    },
    [send]
  );

  const registerProgram = useCallback(
    (id) => {
      setPrograms((list) => list.map((item) => (item.id === id ? { ...item, registered: true } : item)));
      send(messages.registered);
    },
    [send]
  );

  const value = {
    authenticated,
    authMode,
    setAuthMode,
    signIn,
    signOut,
    user,
    page,
    goTo,
    selectedRoute,
    setSelectedRoute,
    openRoute,
    offline,
    queued,
    toggleOffline,
    routes,
    currentRoute: pickCurrentRoute(routes),
    startCollection,
    submitCollection,
    collectArea,
    simulateWardChange,
    alerts,
    logged,
    reportIssue,
    submitLeave,
    programs,
    registerProgram,
  };

  return <DriverContext.Provider value={value}>{children}</DriverContext.Provider>;
}

export function useDriver() {
  return useContext(DriverContext);
}
