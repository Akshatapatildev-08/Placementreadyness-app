import './WorkspaceLayout.css';

export default function WorkspaceLayout({ main, side }) {
  return (
    <div className="workspace-layout">
      <div className="workspace-layout__main">{main}</div>
      <aside className="workspace-layout__side">{side}</aside>
    </div>
  );
}
