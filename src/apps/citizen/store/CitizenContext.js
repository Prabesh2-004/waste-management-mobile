import React, { createContext, useCallback, useContext, useRef, useState } from 'react';
import initial from '../../../data/citizen/initialState.json';
import dictionary from '../../../data/citizen/dictionary.json';
import simulations from '../../../data/citizen/simulations.json';
import messages from '../../../data/citizen/messages.json';
import { useToast } from '../../../shared/components/Toast';
import buildReply from '../utils/buildReply';
import { findWasteItem, sampleWasteItem } from '../utils/wasteLookup';

const CitizenContext = createContext(null);

export function CitizenProvider({ children }) {
  const toast = useToast();

  const [authenticated, setAuthenticated] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [user, setUser] = useState(initial.user);
  const [lang, setLang] = useState('en');
  const [page, setPage] = useState('home');
  const [offline, setOffline] = useState(false);
  const [queued, setQueued] = useState(0);
  const [demoOpen, setDemoOpen] = useState(false);
  const [pushEnabled, setPushEnabled] = useState(true);
  const [status, setStatus] = useState(initial.defaultStatus);
  const [timeSlot, setTimeSlot] = useState(initial.defaultTimeSlot);
  const [timeChanged, setTimeChanged] = useState(false);
  const [seenCount, setSeenCount] = useState(0);
  const [notifications, setNotifications] = useState(initial.notifications);
  const [updates, setUpdates] = useState(initial.updates);
  const [programs, setPrograms] = useState(initial.programs);
  const [reports, setReports] = useState(initial.reports);
  const [chat, setChat] = useState(initial.chat);
  const [photo, setPhoto] = useState(null);
  const photoCount = useRef(0);

  const translate = useCallback((key) => (lang === 'ne' && dictionary.ne[key]) || key, [lang]);

  const signIn = useCallback((newUser) => {
    if (newUser) setUser(newUser);
    setPage('home');
    setAuthenticated(true);
  }, []);

  const signOut = useCallback(() => {
    setAuthMode('login');
    setAuthenticated(false);
  }, []);

  const toggleOffline = useCallback(() => {
    const next = !offline;
    setOffline(next);
    if (!next && queued) {
      setReports((list) => list.map((r) => (r.status === 'Waiting to send' ? { ...r, status: 'Pending' } : r)));
      toast(`${queued} saved update${queued > 1 ? 's' : ''} sent to Ward 17.`);
      setQueued(0);
    }
  }, [offline, queued, toast]);

  const notify = useCallback(
    (text) => {
      setNotifications((list) => [{ text, when: 'Just now' }, ...list]);
      if (pushEnabled) toast(text);
    },
    [pushEnabled, toast]
  );

  const addUpdate = useCallback((category, text) => {
    setUpdates((list) => [{ category, text, when: 'Just now' }, ...list]);
  }, []);

  const markNotificationsSeen = useCallback(() => setSeenCount(notifications.length), [notifications.length]);

  const advanceReport = useCallback(() => {
    const target = reports.find((r) => r.status === 'Pending') || reports.find((r) => r.status === 'In Progress');
    if (!target) {
      toast(messages.noOpenReport);
      return;
    }
    const next = target.status === 'Pending' ? 'In Progress' : 'Resolved';
    setReports((list) => list.map((r) => (r.id === target.id ? { ...r, status: next } : r)));
    notify(next === 'In Progress' ? messages.reportInProgress : messages.reportResolved);
  }, [reports, notify, toast]);

  const simulate = useCallback(
    (id) => {
      const action = simulations.find((item) => item.id === id);
      if (!action) return;
      if (action.status) setStatus(action.status);
      if (action.timeSlot) {
        setTimeSlot(action.timeSlot);
        setTimeChanged(true);
      }
      if (action.update) addUpdate(action.update.category, action.update.text);
      if (action.push) notify(action.push);
      if (action.advanceReport) advanceReport();
      if (action.reset) {
        setStatus(initial.defaultStatus);
        setTimeSlot(initial.defaultTimeSlot);
        setTimeChanged(false);
      }
    },
    [addUpdate, notify, advanceReport]
  );

  const setProgramRegistration = useCallback(
    (id, registered) => {
      setPrograms((list) => list.map((p) => (p.id === id ? { ...p, registered } : p)));
      toast(registered ? messages.registered : messages.registrationCancelled);
    },
    [toast]
  );

  const submitReport = useCallback(
    ({ type, note }) => {
      const report = {
        id: Date.now(),
        type,
        status: offline ? 'Waiting to send' : 'Pending',
        date: 'Today',
        note,
      };
      setReports((list) => [report, ...list]);
      if (offline) setQueued((count) => count + 1);
      setPage('help');
      toast(offline ? messages.offlineSaved : messages.reportSubmitted);
    },
    [offline, toast]
  );

  const ask = useCallback(
    (text) => {
      if (!text.trim()) return;
      setChat((list) => [...list, { bot: false, text }, { bot: true, text: buildReply(text, status, timeSlot) }]);
    },
    [status, timeSlot]
  );

  const askAbout = useCallback(
    (name) => {
      setPage('help');
      ask(`Where should I put ${name}?`);
    },
    [ask]
  );

  const startPhoto = useCallback((uri, fileName) => {
    photoCount.current += 1;
    const count = photoCount.current;
    setPhoto({ uri, loading: true, item: null });
    setTimeout(() => {
      const match = findWasteItem(String(fileName || '').replace(/[^a-z]/gi, ' '));
      const item = match || (count % 5 === 0 ? null : sampleWasteItem(count - 1));
      setPhoto({ uri, loading: false, item });
    }, 1600);
  }, []);

  const clearPhoto = useCallback(() => setPhoto(null), []);

  const value = {
    authenticated,
    authMode,
    setAuthMode,
    signIn,
    signOut,
    user,
    lang,
    setLang,
    translate,
    page,
    setPage,
    offline,
    queued,
    toggleOffline,
    pushEnabled,
    setPushEnabled,
    status,
    timeSlot,
    timeChanged,
    notifications,
    unseenCount: Math.max(0, notifications.length - seenCount),
    markNotificationsSeen,
    updates,
    programs,
    setProgramRegistration,
    reports,
    submitReport,
    chat,
    ask,
    askAbout,
    demoOpen,
    toggleDemo: () => setDemoOpen((open) => !open),
    simulate,
    photo,
    startPhoto,
    clearPhoto,
  };

  return <CitizenContext.Provider value={value}>{children}</CitizenContext.Provider>;
}

export function useCitizen() {
  return useContext(CitizenContext);
}
