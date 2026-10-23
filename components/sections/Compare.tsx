type Cell = "yes" | "no" | "some";

const ROWS: [string, Cell, Cell, Cell][] = [
  ["Finds risky code, secrets and packages", "yes", "no", "yes"],
  ["Finds AWS misconfigurations", "no", "yes", "yes"],
  ["Proves an API flaw is exploitable", "no", "no", "yes"],
  ["Links a code flaw to the data and people it exposes", "no", "some", "yes"],
  ["One ship / block verdict per release", "no", "no", "yes"],
  ["Signed evidence for every release", "no", "no", "yes"],
];

const label: Record<Cell, string> = { yes: "Yes", no: "—", some: "Some" };

export function Compare() {
  return (
    <section className="section stacked">
      <div className="intro">
        <div className="kicker">T+06:00 · Why not just a scanner</div>
        <h2 className="h2">Scanners say what might be wrong. ControlMesh proves what is.</h2>
      </div>
      <div className="table-wrap">
        <table className="compare">
          <thead>
            <tr>
              <th scope="col">What you need</th>
              <th scope="col">Code scanner</th>
              <th scope="col">Cloud posture tool</th>
              <th scope="col" className="us">ControlMesh</th>
            </tr>
          </thead>
          <tbody>
            {ROWS.map(([need, a, b, c]) => (
              <tr key={need}>
                <th scope="row">{need}</th>
                <td className={`cell-${a}`}>{label[a]}</td>
                <td className={`cell-${b}`}>{label[b]}</td>
                <td className={`cell-${c} us`}>{label[c]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="muted small">Tool categories, not named products. Some commercial platforms combine several of these.</p>
    </section>
  );
}
