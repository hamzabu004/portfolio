type ChartProps = {
  title?: string | null
  kind?: 'bar' | 'line' | null
  xLabel?: string | null
  yLabel?: string | null
  unit?: string | null
  series: string[]
  points?: { x: string; values: number[] }[] | null
  caption?: string | null
}

const W = 640
const H = 300
const M = { top: 20, right: 56, bottom: 44, left: 52 }
const plotW = W - M.left - M.right
const plotH = H - M.top - M.bottom

function niceTicks(max: number, count = 4) {
  if (max <= 0) return [0, 1]
  const raw = max / count
  const mag = 10 ** Math.floor(Math.log10(raw))
  const step = [1, 2, 2.5, 5, 10].map((m) => m * mag).find((s) => s >= raw) ?? raw
  const ticks: number[] = []
  for (let v = 0; v <= max + step * 0.001; v += step) ticks.push(+v.toFixed(10))
  if (ticks.at(-1)! < max) ticks.push(+(ticks.at(-1)! + step).toFixed(10))
  return ticks
}

const fmt = (v: number) =>
  Math.abs(v) >= 1000 ? `${+(v / 1000).toFixed(1)}K` : `${+v.toFixed(2)}`

/** Column with a 4px rounded data-end and a square baseline. */
function barPath(x: number, y: number, w: number, h: number) {
  const r = Math.min(4, w / 2, h)
  return `M${x},${y + h}V${y + r}Q${x},${y} ${x + r},${y}H${x + w - r}Q${x + w},${y} ${x + w},${y + r}V${y + h}Z`
}

/**
 * Small dependency-free SVG chart for project results (bar or line, up to 3 series).
 * Hover any mark for its value; the full numbers are always available in the table view.
 */
export function Chart({ title, kind, xLabel, yLabel, unit, series, points, caption }: ChartProps) {
  const rows = (points ?? []).filter((p) => p.values?.length)
  if (!rows.length || !series.length) return null
  const names = series.slice(0, 3)
  const u = unit ?? ''

  const max = Math.max(...rows.flatMap((r) => r.values.slice(0, names.length)))
  const ticks = niceTicks(max)
  const top = ticks.at(-1)!
  const y = (v: number) => M.top + plotH - (v / top) * plotH
  const band = plotW / rows.length

  const isLine = kind === 'line'
  const groupW = Math.min(band * 0.7, names.length * 24 + (names.length - 1) * 2)
  const barW = (groupW - (names.length - 1) * 2) / names.length
  // Tip labels only when they fit beside their neighbours; otherwise hover + table carry the values.
  const longestLabel = Math.max(...rows.flatMap((r) => r.values.map((v) => `${fmt(v)}${u}`.length)))
  const labelBars = !isLine && (names.length === 1 ? band >= longestLabel * 7 : barW + 2 >= longestLabel * 6.5)

  return (
    <figure className="block chart">
      {title && <h3 className="block-title">{title}</h3>}
      {names.length > 1 && (
        <ul className="chart-legend">
          {names.map((name, i) => (
            <li key={name}>
              <span className={`chart-key ${isLine ? 'is-line' : ''}`} data-series={i} aria-hidden />
              {name}
            </li>
          ))}
        </ul>
      )}
      <svg
        viewBox={`0 0 ${W} ${H}`}
        role="img"
        aria-label={`${title ?? 'Chart'}: ${names.join(', ')}`}
        className="chart-svg"
      >
        {ticks.map((t) => (
          <g key={t}>
            <line x1={M.left} x2={W - M.right} y1={y(t)} y2={y(t)} className={t === 0 ? 'chart-base' : 'chart-grid'} />
            <text x={M.left - 8} y={y(t)} dy="0.32em" textAnchor="end" className="chart-tick">
              {fmt(t)}
            </text>
          </g>
        ))}
        {rows.map((r, i) => (
          <text key={r.x} x={M.left + band * (i + 0.5)} y={H - M.bottom + 18} textAnchor="middle" className="chart-tick">
            {r.x}
          </text>
        ))}
        {xLabel && (
          <text x={M.left + plotW / 2} y={H - 4} textAnchor="middle" className="chart-axis-label">
            {xLabel}
          </text>
        )}
        {yLabel && (
          <text transform={`translate(12 ${M.top + plotH / 2}) rotate(-90)`} textAnchor="middle" className="chart-axis-label">
            {yLabel}
          </text>
        )}

        {!isLine &&
          rows.map((r, i) =>
            names.map((name, s) => {
              const v = r.values[s]
              if (v == null) return null
              const x = M.left + band * (i + 0.5) - groupW / 2 + s * (barW + 2)
              return (
                <g key={`${r.x}-${name}`} className="chart-mark">
                  <rect x={x - 3} y={M.top} width={barW + 6} height={plotH} className="chart-hit">
                    <title>{`${name} · ${r.x}: ${fmt(v)}${u}`}</title>
                  </rect>
                  <path d={barPath(x, y(v), barW, y(0) - y(v))} data-series={s} className="chart-fill" />
                  {labelBars && (
                    <text x={x + barW / 2} y={y(v) - 6} textAnchor="middle" className="chart-value">
                      {fmt(v)}
                      {u}
                    </text>
                  )}
                </g>
              )
            }),
          )}

        {isLine &&
          names.map((name, s) => {
            const pts = rows
              .map((r, i) => ({ x: M.left + band * (i + 0.5), v: r.values[s], label: r.x }))
              .filter((p) => p.v != null)
            const last = pts.at(-1)
            return (
              <g key={name}>
                <polyline points={pts.map((p) => `${p.x},${y(p.v)}`).join(' ')} data-series={s} className="chart-line" />
                {pts.map((p) => (
                  <g key={p.label} className="chart-mark">
                    <circle cx={p.x} cy={y(p.v)} r={12} className="chart-hit">
                      <title>{`${name} · ${p.label}: ${fmt(p.v)}${u}`}</title>
                    </circle>
                    <circle cx={p.x} cy={y(p.v)} r={4} data-series={s} className="chart-dot" />
                  </g>
                ))}
                {last && (
                  <text x={last.x + 10} y={y(last.v)} dy="0.32em" className="chart-value">
                    {fmt(last.v)}
                    {u}
                  </text>
                )}
              </g>
            )
          })}
      </svg>
      <details className="chart-table">
        <summary>Show data</summary>
        <table>
          <thead>
            <tr>
              <th>{xLabel ?? ''}</th>
              {names.map((n) => (
                <th key={n}>{n}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.x}>
                <td>{r.x}</td>
                {names.map((n, s) => (
                  <td key={n}>{r.values[s] != null ? `${r.values[s]}${u}` : '–'}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </details>
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  )
}
