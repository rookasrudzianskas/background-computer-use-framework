import { AppWindow, Boxes, Camera, File, Folder, Image as ImageIcon, Mail, Map, MessageSquare, Music, Phone, Search, Settings, Terminal, Video } from "lucide-react";

const files = ["cua-sandbox", "eval-runs", "screenshots", "datasets"];

function LinuxScene() {
  return (
    <div className="desktop-scene linux-scene">
      <div className="os-top"><span>Applications</span><span>10:43</span><span>cua-qa</span></div>
      <div className="window linux-window">
        <aside><strong>Home</strong><span>Desktop</span><span>Documents</span><span>Downloads</span><span>Pictures</span></aside>
        <main>
          <div className="window-title"><span>Home</span><small>12 items</small></div>
          <div className="folder-grid">{files.map((name) => <span key={name}><Folder size={24} />{name}</span>)}</div>
          <div className="file-list"><span><File size={14} /> README.md <small>2 KB</small></span><span><Terminal size={14} /> run_eval.sh <small>4 KB</small></span><span><File size={14} /> episode-042.json <small>18 KB</small></span></div>
        </main>
      </div>
      <div className="scene-dock"><Folder /><Terminal /><AppWindow /><Settings /></div>
    </div>
  );
}

function WindowsScene() {
  return (
    <div className="desktop-scene windows-scene">
      <div className="app-menubar"><span>KoalaCAD</span><span>File</span><span>Edit</span><span>View</span><span>Tools</span><span>Simulate</span></div>
      <div className="cad-layout">
        <aside><strong>LAYERS</strong>{["Base", "Walls", "Roof", "Trees", "Plumbing"].map(x => <span key={x}>▣ {x}</span>)}</aside>
        <main className="cad-canvas"><div className="cad-grid" /><div className="koala-model"><i /><b /></div><span className="axis">Y<br />╲ Z<br />X</span></main>
        <aside><strong>PROPERTIES</strong><span>H: 0.8m</span><span>W: 0.6m</span><span>D: 0.4m</span><span>Material</span><button>Stress Test</button></aside>
      </div>
      <div className="win-taskbar"><Boxes /><Search size={14} /><Folder /><AppWindow /><Terminal /><span>11:28 AM</span></div>
    </div>
  );
}

function MacScene() {
  return (
    <div className="desktop-scene mac-scene">
      <div className="mac-menu"><strong>● Xcode</strong><span>File</span><span>Edit</span><span>View</span><span>Navigate</span><span>Editor</span><small>Tue Apr 1 9:41 AM</small></div>
      <div className="xcode-window">
        <aside><strong>KoalaSpots</strong><span>Views</span><span>Helpers</span><span>Regions</span><span>Spots</span></aside>
        <main><div className="code-lines"><span>struct SpotMapView: View {'{'}</span><i>var body: some View {'{'}</i><span>Map(coordinateRegion: $region)</span><i>.mapStyle(.imagery)</i><span>.overlay(alignment: .bottom)</span><i>SpotDetailView(spot: spot)</i><span>{'}'}</span></div></main>
        <div className="iphone-preview"><div className="island" /><strong>Uluru</strong><small>Northern Territory</small><div className="map-surface"><Map size={25} /></div></div>
      </div>
      <div className="mac-dock"><Search /><MessageSquare /><Mail /><Music /><ImageIcon /><Settings /></div>
    </div>
  );
}

function AndroidScene() {
  const apps = [Search, Mail, MessageSquare, Video, ImageIcon, Camera, Settings, Phone, Music, Folder];
  return (
    <div className="phone-scene">
      <div className="phone-camera" />
      <div className="phone-time">12:26<small>Tue, Mar 12</small></div>
      <div className="phone-apps">{apps.map((Icon, index) => <span key={index}><Icon size={16} /></span>)}</div>
      <div className="phone-home" />
    </div>
  );
}

export function OsScene({ type }: { type: "linux" | "windows" | "macos" | "android" }) {
  if (type === "linux") return <LinuxScene />;
  if (type === "windows") return <WindowsScene />;
  if (type === "macos") return <MacScene />;
  return <AndroidScene />;
}
