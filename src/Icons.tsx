export function FolderIcon({ small = false }: { small?: boolean }) {
  return (
    <span className={small ? "folder-icon folder-icon-small" : "folder-icon"} aria-hidden="true">
      <span />
    </span>
  );
}

export function SaveIcon() {
  return <span className="save-icon" aria-hidden="true"><i /><i /></span>;
}

export function NotepadIcon() {
  return <span className="notepad-icon" aria-hidden="true"><i /><i /><i /><i /></span>;
}

export function TimelineIcon() {
  return <span className="timeline-icon" aria-hidden="true"><i /><i /><i /></span>;
}

export function EmailIcon() {
  return <span className="email-icon" aria-hidden="true"><i /></span>;
}
