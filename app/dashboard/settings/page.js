"use client";
import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { useUser } from "@clerk/nextjs";
import {
  HiOutlineSun,
  HiOutlineMoon,
  HiOutlineComputerDesktop,
  HiBell,
  HiBellSlash,
  HiOutlineShieldCheck,
  HiOutlineTrash,
  HiOutlineInformationCircle,
  HiCheck,
  HiOutlineBookOpen,
  HiOutlineGlobeAlt,
} from "react-icons/hi2";

const STORAGE_KEY = "ai_course_settings";

const defaultSettings = {
  emailNotifications: false,
  courseCompleteAlert: true,
  weeklyDigest: false,
  marketingEmails: false,
  defaultDifficulty: "Basic",
  defaultChapters: "5",
  language: "English",
  autoSave: true,
};

function SettingSection({ title, description, icon, children }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-6 shadow-sm">
      <div className="flex items-start gap-3 mb-5">
        <div className="p-2 bg-purple-50 dark:bg-purple-900/30 rounded-lg text-primary">
          {icon}
        </div>
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-white">{title}</h3>
          {description && <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{description}</p>}
        </div>
      </div>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

function Toggle({ enabled, onChange, label, description }) {
  return (
    <div className="flex items-center justify-between py-2">
      <div className="flex-1 pr-4">
        <p className="text-sm font-medium text-gray-800 dark:text-gray-200">{label}</p>
        {description && <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{description}</p>}
      </div>
      <button
        onClick={() => onChange(!enabled)}
        className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none ${
          enabled ? "bg-primary" : "bg-gray-200 dark:bg-gray-600"
        }`}
      >
        <span
          className={`inline-block h-5 w-5 rounded-full bg-white shadow transform transition-transform duration-200 ${
            enabled ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </button>
    </div>
  );
}

function ThemeButton({ value, current, icon, label, onClick }) {
  const active = current === value;
  return (
    <button
      onClick={() => onClick(value)}
      className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all w-full ${
        active
          ? "border-primary bg-purple-50 dark:bg-purple-900/20 text-primary"
          : "border-gray-200 dark:border-gray-600 text-gray-500 dark:text-gray-400 hover:border-gray-300"
      }`}
    >
      <div className="text-2xl">{icon}</div>
      <span className="text-xs font-medium">{label}</span>
      {active && <HiCheck className="text-primary text-sm" />}
    </button>
  );
}

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const { user } = useUser();
  const [settings, setSettings] = useState(defaultSettings);
  const [saved, setSaved] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setSettings(JSON.parse(stored));
    } catch (_) {}
  }, []);

  const updateSetting = (key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const saveSettings = () => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch (_) {}
  };

  if (!mounted) return null;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm">
          Manage your preferences and account settings.
        </p>
      </div>

      <div className="space-y-5">
        {/* ── Appearance ── */}
        <SettingSection
          title="Appearance"
          description="Choose how the app looks to you."
          icon={<HiOutlineSun className="text-xl" />}
        >
          <div className="grid grid-cols-3 gap-3">
            <ThemeButton value="light" current={theme} icon={<HiOutlineSun />} label="Light" onClick={setTheme} />
            <ThemeButton value="dark" current={theme} icon={<HiOutlineMoon />} label="Dark" onClick={setTheme} />
            <ThemeButton value="system" current={theme} icon={<HiOutlineComputerDesktop />} label="System" onClick={setTheme} />
          </div>
        </SettingSection>

        {/* ── Notifications ── */}
        <SettingSection
          title="Notifications"
          description={`Email notifications will be sent to ${user?.primaryEmailAddress?.emailAddress || "your account email"}.`}
          icon={<HiBell className="text-xl" />}
        >
          <Toggle
            enabled={settings.emailNotifications}
            onChange={(v) => updateSetting("emailNotifications", v)}
            label="Email Notifications"
            description="Receive important updates about your courses via email."
          />
          <div className={`transition-all ${settings.emailNotifications ? "opacity-100" : "opacity-40 pointer-events-none"}`}>
            <Toggle
              enabled={settings.courseCompleteAlert}
              onChange={(v) => updateSetting("courseCompleteAlert", v)}
              label="Course Completion Alerts"
              description="Get notified when a course you're studying is fully generated."
            />
            <Toggle
              enabled={settings.weeklyDigest}
              onChange={(v) => updateSetting("weeklyDigest", v)}
              label="Weekly Digest"
              description="A summary of your learning progress every week."
            />
            <Toggle
              enabled={settings.marketingEmails}
              onChange={(v) => updateSetting("marketingEmails", v)}
              label="Tips & Feature Updates"
              description="Occasional emails about new AI features and course tips."
            />
          </div>
          {!settings.emailNotifications && (
            <p className="text-xs text-gray-400 dark:text-gray-500 flex items-center gap-1 mt-1">
              <HiBellSlash className="text-sm" /> Enable email notifications to configure individual alerts.
            </p>
          )}
        </SettingSection>

        {/* ── Course Defaults ── */}
        <SettingSection
          title="Course Defaults"
          description="Pre-fill values when creating a new course."
          icon={<HiOutlineBookOpen className="text-xl" />}
        >
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Default Difficulty
              </label>
              <select
                value={settings.defaultDifficulty}
                onChange={(e) => updateSetting("defaultDifficulty", e.target.value)}
                className="w-full border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-2 text-sm bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/40"
              >
                {["Basic", "Intermediate", "Advance"].map((l) => (
                  <option key={l}>{l}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Default Chapters
              </label>
              <select
                value={settings.defaultChapters}
                onChange={(e) => updateSetting("defaultChapters", e.target.value)}
                className="w-full border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-2 text-sm bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/40"
              >
                {["3","4","5","6","7","8","10"].map((n) => (
                  <option key={n}>{n}</option>
                ))}
              </select>
            </div>
          </div>
          <Toggle
            enabled={settings.autoSave}
            onChange={(v) => updateSetting("autoSave", v)}
            label="Auto-save Progress"
            description="Automatically save your course creation progress."
          />
        </SettingSection>

        {/* ── Language & Region ── */}
        <SettingSection
          title="Language & Region"
          description="Set your preferred language for course content."
          icon={<HiOutlineGlobeAlt className="text-xl" />}
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Language
            </label>
            <select
              value={settings.language}
              onChange={(e) => updateSetting("language", e.target.value)}
              className="w-full border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-2 text-sm bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/40"
            >
              {["English", "Spanish", "French", "German", "Hindi", "Arabic", "Chinese"].map((l) => (
                <option key={l}>{l}</option>
              ))}
            </select>
          </div>
        </SettingSection>

        {/* ── Privacy & Security ── */}
        <SettingSection
          title="Privacy & Security"
          description="Manage your account data and privacy."
          icon={<HiOutlineShieldCheck className="text-xl" />}
        >
          <div className="flex items-center justify-between py-2">
            <div>
              <p className="text-sm font-medium text-gray-800 dark:text-gray-200">Connected Account</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                {user?.primaryEmailAddress?.emailAddress}
              </p>
            </div>
            <span className="text-xs bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 px-2 py-1 rounded-full font-medium">
              Active
            </span>
          </div>
          <hr className="border-gray-100 dark:border-gray-700" />
          <div className="flex items-center justify-between py-2">
            <div>
              <p className="text-sm font-medium text-red-600 dark:text-red-400">Delete All My Courses</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                Permanently remove all courses you've created.
              </p>
            </div>
            <button className="flex items-center gap-1 text-xs text-red-500 border border-red-200 dark:border-red-800 px-3 py-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
              <HiOutlineTrash /> Delete
            </button>
          </div>
        </SettingSection>

        {/* ── About ── */}
        <SettingSection
          title="About"
          icon={<HiOutlineInformationCircle className="text-xl" />}
        >
          <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex justify-between"><span>App Version</span><span className="font-mono text-gray-800 dark:text-gray-200">1.0.0</span></div>
            <div className="flex justify-between"><span>AI Model</span><span className="font-mono text-gray-800 dark:text-gray-200">Gemini 2.5 Flash</span></div>
            <div className="flex justify-between"><span>Database</span><span className="font-mono text-gray-800 dark:text-gray-200">Neon PostgreSQL</span></div>
            <div className="flex justify-between"><span>Auth</span><span className="font-mono text-gray-800 dark:text-gray-200">Clerk</span></div>
          </div>
        </SettingSection>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            onClick={saveSettings}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-medium text-sm transition-all ${
              saved
                ? "bg-green-500 text-white"
                : "bg-primary text-white hover:opacity-90"
            }`}
          >
            {saved ? <><HiCheck /> Saved!</> : "Save Settings"}
          </button>
        </div>
      </div>
    </div>
  );
}
