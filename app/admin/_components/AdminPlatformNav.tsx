'use client';

import AdminAccountSelector from './AdminAccountSelector';
import { navLinkStyle, navStyle, smallStyle } from './adminStyles';
import { useActivePlatform, type AdPlatform } from './useActivePlatform';

const selectStyle = {
  width: '100%',
  borderRadius: 12,
  border: '1px solid #cbd5e1',
  padding: '10px 12px',
  fontWeight: 800,
  color: '#0f172a',
  background: '#ffffff'
};

function PlatformSelector() {
  const { platform, setPlatform } = useActivePlatform();

  return (
    <div style={{ marginBottom: 16 }}>
      <label style={{ display: 'block', marginBottom: 6, color: '#64748b', fontSize: 12, fontWeight: 800 }}>
        Platform
      </label>
      <select style={selectStyle} value={platform} onChange={(event) => setPlatform(event.target.value as AdPlatform)}>
        <option value="google_ads">Google Ads</option>
        <option value="meta_ads">Facebook / Meta Ads</option>
      </select>
    </div>
  );
}

export default function AdminPlatformNav() {
  const { platform } = useActivePlatform();
  const isMeta = platform === 'meta_ads';

  return (
    <>
      <PlatformSelector />
      <AdminAccountSelector />
      <nav style={navStyle}>
        <a style={navLinkStyle} href="/admin">Dashboard</a>
        {isMeta ? (
          <>
            <a style={navLinkStyle} href="/admin/meta-ads">Meta Ads Intelligence</a>
            <a style={navLinkStyle} href="/admin/creative-review">Creative Review</a>
            <a style={navLinkStyle} href="/admin/snapshot-preview">Snapshot Preview</a>
            <a style={navLinkStyle} href="/admin/change-history">Change History</a>
            <a style={navLinkStyle} href="/admin/ad-review">Ad Review</a>
          </>
        ) : (
          <>
            <a style={navLinkStyle} href="/admin/google-ads">Google Ads Intelligence</a>
            <a style={navLinkStyle} href="/admin/live-query-preview">Live Query Preview</a>
            <a style={navLinkStyle} href="/admin/snapshot-preview">Snapshot Preview</a>
            <a style={navLinkStyle} href="/admin/change-history">Change History</a>
            <a style={navLinkStyle} href="/admin/ad-review">Ad Review</a>
          </>
        )}
        <a style={navLinkStyle} href="/admin/themes">Theme Editor</a>
        <a style={navLinkStyle} href="/admin/url-builder">URL Builder</a>
        <a style={navLinkStyle} href="/admin/leads">Leads</a>
        {!isMeta ? <a style={navLinkStyle} href="/sell?theme=repairs&city=Plano">View Landing Page</a> : null}
        <a style={{ ...navLinkStyle, marginTop: 24 }} href="/admin/connection-settings">Connection Settings</a>
        <span style={{ ...smallStyle, display: 'block', marginTop: 8, color: '#64748b' }}>
          {isMeta ? 'Meta is mock-only for now.' : 'Google Ads is the active analyzer.'}
        </span>
      </nav>
    </>
  );
}
