const sections = [
  ["work", "Work"],
  ["about", "About"],
  ["experience", "Experience"],
  ["contact", "Contact"],
];

export default function Header() {
  return (
    <header className="top">
      <div className="top-in wrap">
        <a className="brand" href="#top">Anshit Sharma</a>
        <nav aria-label="Sections">
          <ol className="nav">
            {sections.map(([id, label]) => (
              <li key={id}><a href={`#${id}`}>{label}</a></li>
            ))}
          </ol>
        </nav>
        <span className="trk" aria-hidden="true"><i /></span>
      </div>
    </header>
  );
}
