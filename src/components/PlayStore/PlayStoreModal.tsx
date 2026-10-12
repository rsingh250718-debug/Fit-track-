import React, { useState } from 'react';
import { usePWAInstall } from '../../hooks/usePWAInstall';
import {
  X,
  Smartphone,
  Download,
  Copy,
  Check,
  ExternalLink,
  ShieldCheck,
  Sparkles,
  Terminal,
  FileCode,
  Layers,
  CheckCircle2,
} from 'lucide-react';

interface Props {
  onClose: () => void;
}

export const PlayStoreModal: React.FC<Props> = ({ onClose }) => {
  const { isInstallable, isInstalled, triggerInstall } = usePWAInstall();
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [copiedCommand, setCopiedCommand] = useState(false);
  const [activeTab, setActiveTab] = useState<'pwabuilder' | 'bubblewrap' | 'checklist'>('pwabuilder');

  const appUrl = typeof window !== 'undefined' ? window.location.origin : 'https://apexfit.app';

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(appUrl);
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2000);
  };

  const bubblewrapCommand = `npm i -g @bubblewrap/cli\nbubblewrap init --manifest=${appUrl}/manifest.webmanifest\nbubblewrap build`;

  const handleCopyCommand = () => {
    navigator.clipboard.writeText(bubblewrapCommand);
    setCopiedCommand(true);
    setTimeout(() => setCopiedCommand(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 bg-zinc-900/90">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Google Play Store & Android App</h2>
              <p className="text-xs text-zinc-400">Trusted Web Activity (TWA) & Progressive Web App</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-grow">
          {/* Answer Banner */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-950/40 via-zinc-950 to-zinc-950 border border-emerald-500/30 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 font-mono uppercase">
              <ShieldCheck className="w-4 h-4" />
              <span>100% Play Store Ready</span>
            </div>
            <h3 className="text-base font-bold text-white">
              Yes, you can upload this app directly to the Google Play Store!
            </h3>
            <p className="text-xs text-zinc-300 leading-relaxed">
              ApexFit is built with a standard Web App Manifest, Service Worker caching, and adaptive maskable icons. Google natively supports publishing PWAs on Google Play using <strong className="text-white">Trusted Web Activity (TWA)</strong> to produce an Android App Bundle (<code className="text-amber-400 bg-black/40 px-1 py-0.5 rounded">.aab</code>).
            </p>
          </div>

          {/* Direct Install on Device Button (if available) */}
          <div className="p-4 bg-zinc-950/70 border border-zinc-800 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-xs font-semibold text-white block">
                {isInstalled ? 'App Already Installed' : 'Install Directly on Your Device'}
              </span>
              <p className="text-xs text-zinc-400 mt-0.5">
                {isInstalled
                  ? 'Running in standalone native window on your device.'
                  : 'Test the native mobile full-screen experience right now.'}
              </p>
            </div>

            {isInstallable && !isInstalled ? (
              <button
                onClick={triggerInstall}
                className="flex items-center gap-2 px-4 py-2 bg-amber-400 hover:bg-amber-300 text-black text-xs font-bold rounded-xl shadow transition-all self-start sm:self-auto"
              >
                <Download className="w-4 h-4" />
                <span>Install App Now</span>
              </button>
            ) : (
              <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-900/40 px-2.5 py-1 rounded-lg">
                PWA Certified ✓
              </span>
            )}
          </div>

          {/* Live App URL Box */}
          <div className="space-y-1.5">
            <label className="text-xs font-mono uppercase text-zinc-400">
              Your Live Application URL:
            </label>
            <div className="flex items-center gap-2 p-2.5 bg-zinc-950 border border-zinc-800 rounded-xl">
              <input
                type="text"
                readOnly
                value={appUrl}
                className="bg-transparent text-xs font-mono text-zinc-300 flex-grow focus:outline-none truncate"
              />
              <button
                onClick={handleCopyUrl}
                className="flex items-center gap-1.5 px-3 py-1 bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-medium rounded-lg transition-colors flex-shrink-0"
              >
                {copiedUrl ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedUrl ? 'Copied' : 'Copy URL'}</span>
              </button>
            </div>
          </div>

          {/* Method Tabs */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 border-b border-zinc-800 pb-2 text-xs">
              <button
                onClick={() => setActiveTab('pwabuilder')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
                  activeTab === 'pwabuilder'
                    ? 'bg-amber-400 text-black font-bold'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Method 1: PWABuilder (No Code, 2 Mins)
              </button>
              <button
                onClick={() => setActiveTab('bubblewrap')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
                  activeTab === 'bubblewrap'
                    ? 'bg-amber-400 text-black font-bold'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Method 2: Google Bubblewrap CLI
              </button>
              <button
                onClick={() => setActiveTab('checklist')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
                  activeTab === 'checklist'
                    ? 'bg-amber-400 text-black font-bold'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Play Console Checklist
              </button>
            </div>

            {/* TAB 1: PWABuilder */}
            {activeTab === 'pwabuilder' && (
              <div className="space-y-3 text-xs text-zinc-300">
                <ol className="space-y-2.5">
                  <li className="flex items-start gap-2.5 p-3 bg-zinc-950/60 border border-zinc-800/80 rounded-xl">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-amber-400/20 text-amber-400 font-mono text-[11px] font-bold flex items-center justify-center">
                      1
                    </span>
                    <div>
                      <strong className="text-white block">Copy your live App URL above</strong>
                      <span className="text-zinc-400">Click the "Copy URL" button in the box above.</span>
                    </div>
                  </li>

                  <li className="flex items-start gap-2.5 p-3 bg-zinc-950/60 border border-zinc-800/80 rounded-xl">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-amber-400/20 text-amber-400 font-mono text-[11px] font-bold flex items-center justify-center">
                      2
                    </span>
                    <div>
                      <strong className="text-white block">Open PWABuilder.com</strong>
                      <span className="text-zinc-400">
                        Visit{' '}
                        <a
                          href="https://www.pwabuilder.com"
                          target="_blank"
                          rel="noreferrer"
                          className="text-amber-400 underline font-semibold inline-flex items-center gap-0.5"
                        >
                          pwabuilder.com <ExternalLink className="w-3 h-3" />
                        </a>{' '}
                        (created by Microsoft & verified by Google for Play Store packaging).
                      </span>
                    </div>
                  </li>

                  <li className="flex items-start gap-2.5 p-3 bg-zinc-950/60 border border-zinc-800/80 rounded-xl">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-amber-400/20 text-amber-400 font-mono text-[11px] font-bold flex items-center justify-center">
                      3
                    </span>
                    <div>
                      <strong className="text-white block">Generate Android App Bundle (.aab)</strong>
                      <span className="text-zinc-400">
                        Paste your URL, click <em>Start</em>, then click <em>"Package for Stores"</em> → select <strong>Google Play (Android)</strong>.
                      </span>
                    </div>
                  </li>

                  <li className="flex items-start gap-2.5 p-3 bg-zinc-950/60 border border-zinc-800/80 rounded-xl">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-amber-400/20 text-amber-400 font-mono text-[11px] font-bold flex items-center justify-center">
                      4
                    </span>
                    <div>
                      <strong className="text-white block">Upload to Google Play Console</strong>
                      <span className="text-zinc-400">
                        Download the signed package zip containing your <code className="text-amber-400 bg-zinc-900 px-1 py-0.5 rounded">.aab</code> file and upload it to your Google Play Developer Console.
                      </span>
                    </div>
                  </li>
                </ol>
              </div>
            )}

            {/* TAB 2: Bubblewrap */}
            {activeTab === 'bubblewrap' && (
              <div className="space-y-3 text-xs text-zinc-300">
                <p className="text-zinc-400">
                  Google maintains <strong>Bubblewrap</strong>, an open-source CLI for creating, building, and signing Android projects that open your PWA using Trusted Web Activity.
                </p>

                <div className="relative p-3 bg-zinc-950 border border-zinc-800 rounded-xl font-mono text-[11px] text-emerald-400 overflow-x-auto">
                  <pre>{bubblewrapCommand}</pre>
                  <button
                    onClick={handleCopyCommand}
                    className="absolute top-2 right-2 p-1.5 bg-zinc-800 hover:bg-zinc-700 text-white rounded text-xs transition-colors"
                  >
                    {copiedCommand ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>

                <div className="p-3 bg-zinc-950/50 border border-zinc-800 rounded-xl space-y-1">
                  <strong className="text-white block">What Bubblewrap generates:</strong>
                  <ul className="list-disc list-inside space-y-1 text-zinc-400">
                    <li>Full Android Studio project with Gradle configuration</li>
                    <li>Production-ready signed <code className="text-amber-400">app-release-bundle.aab</code></li>
                    <li>Digital Asset Links (<code className="text-amber-400">assetlinks.json</code>) to link ownership</li>
                  </ul>
                </div>
              </div>
            )}

            {/* TAB 3: Checklist */}
            {activeTab === 'checklist' && (
              <div className="space-y-2.5 text-xs">
                {[
                  { text: 'Valid Web App Manifest with Name & Short Name', done: true },
                  { text: 'High-res Icons (192x192, 512x512, Maskable)', done: true },
                  { text: 'Service Worker offline caching & registration', done: true },
                  { text: 'Display mode set to "standalone"', done: true },
                  { text: 'Google Play Developer Account ($25 one-time fee to Google)', done: false },
                  { text: 'Target Android SDK 34+ (Handled automatically by PWABuilder)', done: true },
                  { text: 'Privacy Policy URL & App store listing screenshots', done: false },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-2.5 bg-zinc-950/60 border border-zinc-800 rounded-lg"
                  >
                    <span className={item.done ? 'text-zinc-200' : 'text-zinc-400'}>{item.text}</span>
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                        item.done
                          ? 'bg-emerald-950 text-emerald-400 border border-emerald-900/50'
                          : 'bg-zinc-800 text-zinc-400'
                      }`}
                    >
                      {item.done ? 'Ready' : 'In Console'}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-zinc-800 bg-zinc-900/90">
          <a
            href="https://www.pwabuilder.com"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 text-xs text-amber-400 hover:underline font-semibold"
          >
            <span>Open PWABuilder.com</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <button
            onClick={onClose}
            className="px-5 py-2 bg-amber-400 hover:bg-amber-300 text-black text-xs font-bold rounded-xl transition-all"
          >
            Got It
          </button>
        </div>
      </div>
    </div>
  );
};
