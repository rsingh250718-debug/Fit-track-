import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { registerSW } from 'virtual:pwa-register';

// Register service worker for offline capability and PWA installability
registerSW({
  immediate: true,
  onNeedRefresh() {
    // New version available
  },
  onOfflineReady() {
    // App is ready to work offline
  },
});

createRoot(document.getElementById('root')!).render(<App />);
