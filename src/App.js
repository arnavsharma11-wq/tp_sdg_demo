import React, { useState, useRef, useEffect } from "react";

// ===== SHARED STYLES =====
const C = { bg: "#131313", card: "#1A1A1A", bdr: "#222222", txt: "#9E9E9E", hi: "#E5E0DB", accent: "#7C3AED", green: "#10B981", amber: "#F59E0B", red: "#EF4444", cyan: "#06B6D4", orange: "#F97316" };
const btn = (c, o, x = {}) => ({ padding: "10px 22px", borderRadius: 8, border: o ? `1.5px solid ${c}` : "none", background: o ? "transparent" : c, color: o ? c : "#000", fontSize: 13, fontWeight: 700, cursor: "pointer", ...x });
const cardS = { background: C.card, borderRadius: 12, border: `1px solid ${C.bdr}`, padding: 20 };
const imgS = { width: "100%", borderRadius: 8, border: `1px solid ${C.bdr}` };
function HT({ s = 9 }) { return <span style={{ display: "inline-block", width: 0, height: 0, borderLeft: `${s/2}px solid transparent`, borderRight: `${s/2}px solid transparent`, borderBottom: `${s}px solid ${C.red}`, marginLeft: 4, verticalAlign: "middle" }} />; }
const stageC = [C.accent, "#8B5CF6", C.red, C.cyan, C.orange, C.green];
const stageL = ["Seed", "Generate", "Critique", "Curate", "Comply", "Package"];
function Nav({ stage, setStage }) {
  return (<div style={{ display: "flex", alignItems: "center", gap: 3, marginBottom: 12 }}>{stageL.map((l, i) => (<div key={i} style={{ display: "flex", alignItems: "center" }}><div onClick={() => setStage(i)} title={l} style={{ width: 34, height: 34, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, cursor: "pointer", background: stage === i ? stageC[i] + "22" : stage > i ? C.green + "18" : C.card, border: `2px solid ${stage === i ? stageC[i] : stage > i ? C.green : C.bdr}`, color: stage === i ? "#fff" : stage > i ? C.green : C.txt }}>{stage > i ? "✓" : i + 1}</div>{i < 5 && <div style={{ width: 8, height: 2, background: stage > i ? C.green + "44" : C.bdr }} />}</div>))}<span style={{ marginLeft: 6, fontSize: 10, color: C.txt }}>{stage < 3 ? "GENERATION" : "CURATION"}</span></div>);
}

// ===== WAREHOUSE SVGs =====
function WH_Seed({ style }) {
  return (<svg viewBox="0 0 400 260" style={style} xmlns="http://www.w3.org/2000/svg"><rect width="400" height="140" fill="#6b6b6b"/><rect y="140" width="400" height="120" fill="#4a4a4a"/><line x1="0" y1="180" x2="400" y2="180" stroke="#555" strokeWidth="1" strokeDasharray="8,4"/><rect x="20" y="30" width="80" height="110" fill="#8B6914" stroke="#6B4F10" strokeWidth="2" rx="2"/><rect x="24" y="38" width="72" height="20" fill="#A07820"/><rect x="24" y="64" width="72" height="20" fill="#A07820"/><rect x="24" y="90" width="72" height="20" fill="#A07820"/><rect x="28" y="40" width="18" height="14" fill="#C4A24E"/><rect x="50" y="42" width="14" height="12" fill="#D4B25E"/><rect x="300" y="30" width="80" height="110" fill="#8B6914" stroke="#6B4F10" strokeWidth="2" rx="2"/><rect x="304" y="38" width="72" height="20" fill="#A07820"/><rect x="304" y="64" width="72" height="20" fill="#A07820"/><rect x="308" y="40" width="18" height="14" fill="#C4A24E"/><rect x="150" y="160" width="50" height="30" fill="#9B7420" stroke="#7B5410" rx="2"/><rect x="80" y="3" width="60" height="5" fill="#ddd" rx="2"/><rect x="260" y="3" width="60" height="5" fill="#ddd" rx="2"/><text x="200" y="252" textAnchor="middle" fill="#888" fontSize="9" fontFamily="sans-serif">SEED — Warehouse Floor (Empty)</text></svg>);
}
function WH_Gen1({ style, showBoxes, showFaces, facesOk }) {
  return (<svg viewBox="0 0 400 260" style={style} xmlns="http://www.w3.org/2000/svg"><rect width="400" height="140" fill="#6b6b6b"/><rect y="140" width="400" height="120" fill="#4a4a4a"/><rect x="20" y="30" width="80" height="110" fill="#8B6914" stroke="#6B4F10" strokeWidth="2" rx="2"/><rect x="24" y="38" width="72" height="20" fill="#A07820"/><rect x="24" y="64" width="72" height="20" fill="#A07820"/><rect x="300" y="30" width="80" height="110" fill="#8B6914" stroke="#6B4F10" strokeWidth="2" rx="2"/><rect x="304" y="38" width="72" height="20" fill="#A07820"/><rect x="220" y="155" width="55" height="28" fill="#E8A020" rx="3"/><rect x="275" y="163" width="5" height="32" fill="#C88010"/><rect x="220" y="183" width="10" height="10" rx="5" fill="#333"/><rect x="258" y="183" width="10" height="10" rx="5" fill="#333"/><circle cx="200" cy="130" r="7" fill={facesOk?"#10B981":"#FFB07C"}/><rect x="192" y="124" width="16" height="4" fill="#FFD700" rx="1"/><rect x="194" y="137" width="12" height="20" fill="#FF6B00" rx="2"/><circle cx="115" cy="105" r="6" fill={facesOk?"#10B981":"#D4A06C"}/><rect x="109" y="111" width="12" height="18" fill="#2563EB" rx="2"/><circle cx="320" cy="168" r="6" fill={facesOk?"#10B981":"#FFB07C"}/><rect x="312" y="162" width="16" height="4" fill="#FFD700" rx="1"/><rect x="314" y="174" width="12" height="16" fill="#FF6B00" rx="2"/><rect x="140" y="172" width="45" height="22" fill="#9B7420" rx="2"/>
  {showBoxes&&<><rect x="215" y="148" width="70" height="50" fill="none" stroke={C.cyan} strokeWidth="2" strokeDasharray="4,2"/><text x="217" y="146" fill={C.cyan} fontSize="7" fontWeight="bold">forklift (0.97)</text><rect x="188" y="123" width="24" height="40" fill="none" stroke={C.amber} strokeWidth="2" strokeDasharray="4,2"/><text x="190" y="121" fill={C.amber} fontSize="7" fontWeight="bold">worker_ppe (0.94)</text><rect x="104" y="98" width="22" height="36" fill="none" stroke={C.red} strokeWidth="2" strokeDasharray="4,2"/><text x="80" y="96" fill={C.red} fontSize="7" fontWeight="bold">worker_no_ppe ⚠</text><rect x="308" y="161" width="24" height="34" fill="none" stroke={C.amber} strokeWidth="2" strokeDasharray="4,2"/><rect x="15" y="25" width="90" height="120" fill="none" stroke={C.green} strokeWidth="2" strokeDasharray="4,2"/><text x="17" y="23" fill={C.green} fontSize="7" fontWeight="bold">shelf_unit (0.98)</text></>}
  {showFaces&&<><rect x="192" y="122" width="16" height="16" fill="none" stroke={facesOk?C.green:C.red} strokeWidth="2"/><rect x="108" y="98" width="14" height="14" fill="none" stroke={facesOk?C.green:C.red} strokeWidth="2"/><rect x="313" y="161" width="14" height="14" fill="none" stroke={facesOk?C.green:C.red} strokeWidth="2"/></>}
  <text x="200" y="252" textAnchor="middle" fill="#888" fontSize="8">SYNTH #1 — Workers + Forklift + Safety Violation</text></svg>);
}
function WH_Gen2({ style }) {
  return (<svg viewBox="0 0 400 260" style={style} xmlns="http://www.w3.org/2000/svg"><rect width="400" height="140" fill="#2a2a3a"/><rect y="140" width="400" height="120" fill="#222233"/><circle cx="110" cy="12" r="25" fill="#FFE08030"/><circle cx="290" cy="12" r="25" fill="#FFE08030"/><rect x="80" y="3" width="60" height="5" fill="#FFE080" rx="2"/><rect x="260" y="3" width="60" height="5" fill="#FFE080" rx="2"/><rect x="20" y="30" width="80" height="110" fill="#6B5010" stroke="#5B4008" strokeWidth="2" rx="2"/><rect x="24" y="38" width="72" height="20" fill="#806010"/><rect x="24" y="64" width="72" height="20" fill="#806010"/><rect x="300" y="30" width="80" height="110" fill="#6B5010" stroke="#5B4008" strokeWidth="2" rx="2"/><rect x="304" y="38" width="72" height="20" fill="#806010"/><rect x="160" y="165" width="22" height="16" fill="#A08030" rx="1" transform="rotate(15,171,173)"/><rect x="185" y="170" width="18" height="14" fill="#B09040" rx="1" transform="rotate(-8,194,177)"/><rect x="175" y="185" width="20" height="15" fill="#907020" rx="1" transform="rotate(5,185,192)"/><polygon points="260,190 255,208 265,208" fill="#FF6600"/><rect x="252" y="208" width="16" height="3" fill="#FF6600" rx="1"/><text x="200" y="252" textAnchor="middle" fill="#777" fontSize="8">SYNTH #2 — Night Shift + Spilled Cargo (Edge Case)</text></svg>);
}
function WH_Gen3({ style }) {
  return (<svg viewBox="0 0 400 260" style={style} xmlns="http://www.w3.org/2000/svg"><rect width="400" height="140" fill="#5a5a5a"/><rect y="140" width="400" height="120" fill="#4a4a4a"/><rect x="10" y="25" width="60" height="115" fill="#8B6914" stroke="#6B4F10" strokeWidth="1.5" rx="2"/><rect x="14" y="33" width="52" height="16" fill="#A07820"/><rect x="14" y="55" width="52" height="16" fill="#A07820"/><rect x="80" y="25" width="60" height="115" fill="#8B6914" stroke="#6B4F10" strokeWidth="1.5" rx="2"/><rect x="84" y="33" width="52" height="16" fill="#A07820"/><rect x="260" y="25" width="60" height="115" fill="#8B6914" stroke="#6B4F10" strokeWidth="1.5" rx="2"/><rect x="330" y="25" width="60" height="115" fill="#8B6914" stroke="#6B4F10" strokeWidth="1.5" rx="2"/><rect x="155" y="152" width="45" height="22" fill="#E8A020" rx="2"/><rect x="200" y="160" width="5" height="25" fill="#C88010"/><rect x="280" y="178" width="40" height="20" fill="#E8A020" rx="2"/>{[[175,138],[120,155],[340,165],[50,150],[290,152]].map(([x,y],i)=><g key={i}><circle cx={x} cy={y} r={5} fill="#FFB07C"/><rect x={x-6} y={y-7} width={12} height={3} fill="#FFD700" rx="1"/><rect x={x-4} y={y+5} width={8} height={14} fill={i%2===0?"#FF6B00":"#2563EB"} rx="1"/></g>)}<text x="200" y="252" textAnchor="middle" fill="#888" fontSize="8">SYNTH #3 — High Traffic (Stress Test)</text></svg>);
}
function WH_Gen4({ style }) {
  return (<svg viewBox="0 0 400 260" style={style} xmlns="http://www.w3.org/2000/svg"><rect width="400" height="140" fill="#5a5a5a"/><rect y="140" width="400" height="120" fill="#4a4a4a"/><rect x="20" y="30" width="80" height="110" fill="#8B6914" stroke="#6B4F10" strokeWidth="2" rx="2"/><rect x="24" y="38" width="72" height="20" fill="#A07820"/><rect x="300" y="30" width="80" height="110" fill="#8B6914" stroke="#6B4F10" strokeWidth="2" rx="2"/><circle cx="105" cy="80" r="6" fill="#FFB07C"/><rect x="98" y="73" width="14" height="4" fill="#FFD700" rx="1"/><rect x="99" y="86" width="12" height="16" fill="#FF6B00" rx="1"/><rect x="180" y="150" width="50" height="25" fill="#E8A020" rx="2"/><rect x="230" y="158" width="5" height="28" fill="#C88010"/><rect x="160" y="110" width="60" height="65" fill="#9B7420" stroke="#7B5410" strokeWidth="1.5" rx="2"/><rect x="163" y="115" width="25" height="16" fill="#C4A24E" rx="1"/><rect x="191" y="115" width="25" height="16" fill="#B4922E" rx="1"/><rect x="163" y="136" width="25" height="16" fill="#D4B25E" rx="1"/><rect x="191" y="136" width="25" height="16" fill="#C4A24E" rx="1"/><rect x="163" y="155" width="54" height="16" fill="#B4922E" rx="1"/><polygon points="340,180 335,198 345,198" fill="#FFD700"/><text x="338" y="194" fill="#333" fontSize="5" fontWeight="bold" textAnchor="middle">!</text><text x="200" y="252" textAnchor="middle" fill="#888" fontSize="8">SYNTH #4 — Partial Occlusion (Edge Case)</text></svg>);
}

// ===== DASHCAM SVGs =====
function DC_Seed({ style }) {
  return (<svg viewBox="0 0 400 225" style={style} xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="dsky" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#87CEEB"/><stop offset="100%" stopColor="#B0D4E8"/></linearGradient></defs><rect width="400" height="110" fill="url(#dsky)"/><rect x="25" y="58" width="33" height="52" fill="#8899AA" rx="2"/><rect x="65" y="45" width="28" height="65" fill="#7788AA" rx="2"/><rect x="300" y="54" width="37" height="56" fill="#8899AA" rx="2"/><rect x="345" y="42" width="28" height="68" fill="#7788AA" rx="2"/><circle cx="125" cy="80" r="16" fill="#4A7A4A"/><circle cx="275" cy="76" r="18" fill="#4A7A4A"/><polygon points="0,225 400,225 285,110 115,110" fill="#555"/><line x1="200" y1="225" x2="200" y2="125" stroke="#FFD700" strokeWidth="2.5" strokeDasharray="10,7"/><line x1="65" y1="225" x2="135" y2="110" stroke="#fff" strokeWidth="2"/><line x1="335" y1="225" x2="265" y2="110" stroke="#fff" strokeWidth="2"/><polygon points="0,225 65,225 135,110 115,110 0,170" fill="#999"/><polygon points="400,225 335,225 265,110 285,110 400,170" fill="#999"/>{[0,1,2,3,4].map(i=><rect key={i} x={150+i*18} y="195" width="8" height="22" fill="#fff" opacity="0.6"/>)}<rect x="290" y="66" width="3" height="44" fill="#444"/><rect x="285" y="59" width="13" height="23" fill="#333" rx="3"/><circle cx="291" cy="66" r="3" fill="#2ECC40"/><rect x="8" y="200" width="110" height="18" fill="#00000088" rx="3"/><text x="14" y="213" fill="#0F0" fontSize="8" fontFamily="monospace">2026-04-07 14:32:18</text><text x="200" y="220" textAnchor="middle" fill="#888" fontSize="8">SEED — Dashcam, Clear Day, Intersection</text></svg>);
}
function DC_Gen1({ style, showBoxes, showFaces, facesOk }) {
  return (<svg viewBox="0 0 400 225" style={style} xmlns="http://www.w3.org/2000/svg"><rect width="400" height="110" fill="#87CEEB"/><rect x="25" y="58" width="33" height="52" fill="#8899AA" rx="2"/><rect x="300" y="54" width="37" height="56" fill="#8899AA" rx="2"/><circle cx="125" cy="80" r="16" fill="#4A7A4A"/><circle cx="275" cy="76" r="18" fill="#4A7A4A"/><polygon points="0,225 400,225 285,110 115,110" fill="#555"/><line x1="200" y1="225" x2="200" y2="125" stroke="#FFD70088" strokeWidth="2" strokeDasharray="10,7"/><line x1="65" y1="225" x2="135" y2="110" stroke="#fff" strokeWidth="2"/><line x1="335" y1="225" x2="265" y2="110" stroke="#fff" strokeWidth="2"/><polygon points="0,225 65,225 135,110 115,110 0,170" fill="#999"/><polygon points="400,225 335,225 265,110 285,110 400,170" fill="#999"/>
  <rect x="158" y="130" width="33" height="20" fill="#CC3333" rx="3"/><rect x="163" y="126" width="24" height="8" fill="#AA2222" rx="2"/><rect x="168" y="148" width="14" height="5" fill="#fff" rx="1"/><circle cx="165" cy="150" r="3" fill="#222"/><circle cx="185" cy="150" r="3" fill="#222"/>
  <circle cx="225" cy="175" r="5" fill={facesOk?"#10B981":"#FFB07C"}/><rect x="220" y="180" width="10" height="16" fill="#2563EB" rx="1"/><circle cx="82" cy="190" r="5" fill={facesOk?"#10B981":"#D4A06C"}/><rect x="77" y="195" width="10" height="18" fill="#E74C3C" rx="1"/><circle cx="290" cy="162" r="4" fill={facesOk?"#10B981":"#FFB07C"}/><rect x="286" y="166" width="8" height="12" fill="#27AE60" rx="1"/><circle cx="290" cy="182" r="5" fill="none" stroke="#555" strokeWidth="1.5"/>
  <rect x="290" y="66" width="3" height="44" fill="#444"/><rect x="285" y="59" width="13" height="23" fill="#333" rx="3"/><circle cx="291" cy="76" r="3" fill="#FF0000"/>
  {showBoxes&&<><rect x="152" y="122" width="40" height="32" fill="none" stroke={C.cyan} strokeWidth="1.5" strokeDasharray="3,2"/><text x="154" y="120" fill={C.cyan} fontSize="6" fontWeight="bold">vehicle (0.96)</text><rect x="216" y="168" width="18" height="34" fill="none" stroke={C.amber} strokeWidth="1.5" strokeDasharray="3,2"/><text x="218" y="166" fill={C.amber} fontSize="6" fontWeight="bold">pedestrian (0.94)</text><rect x="73" y="183" width="18" height="34" fill="none" stroke={C.amber} strokeWidth="1.5" strokeDasharray="3,2"/><rect x="282" y="155" width="16" height="32" fill="none" stroke="#8B5CF6" strokeWidth="1.5" strokeDasharray="3,2"/><text x="284" y="153" fill="#8B5CF6" fontSize="6" fontWeight="bold">cyclist (0.89)</text></>}
  {showFaces&&<><rect x="218" y="169" width="14" height="14" fill="none" stroke={facesOk?C.green:C.red} strokeWidth="2"/><rect x="75" y="184" width="14" height="14" fill="none" stroke={facesOk?C.green:C.red} strokeWidth="2"/><rect x="283" y="157" width="14" height="14" fill="none" stroke={facesOk?C.green:C.red} strokeWidth="2"/><rect x="165" y="146" width="18" height="8" fill="none" stroke={facesOk?C.green:C.red} strokeWidth="1.5"/></>}
  <rect x="8" y="200" width="110" height="18" fill="#00000088" rx="3"/><text x="14" y="213" fill="#0F0" fontSize="8" fontFamily="monospace">2026-04-07 14:32:22</text><text x="200" y="220" textAnchor="middle" fill="#888" fontSize="7">SYNTH #1 — Pedestrian Crossing + Red Light</text></svg>);
}
function DC_Gen2({ style }) {
  return (<svg viewBox="0 0 400 225" style={style} xmlns="http://www.w3.org/2000/svg"><rect width="400" height="110" fill="#6A7A8A"/><rect x="25" y="58" width="33" height="52" fill="#5A6A7A" rx="2"/><rect x="300" y="54" width="37" height="56" fill="#5A6A7A" rx="2"/><circle cx="125" cy="80" r="16" fill="#3A5A3A"/><circle cx="275" cy="76" r="18" fill="#3A5A3A"/><polygon points="0,225 400,225 285,110 115,110" fill="#3A3A3A"/><rect x="100" y="170" width="200" height="45" fill="#3A3A4A" opacity="0.4" rx="2"/><line x1="200" y1="225" x2="200" y2="125" stroke="#FFD70066" strokeWidth="2" strokeDasharray="10,7"/><line x1="65" y1="225" x2="135" y2="110" stroke="#fff6" strokeWidth="2"/><line x1="335" y1="225" x2="265" y2="110" stroke="#fff6" strokeWidth="2"/>{Array.from({length:20},(_,i)=><line key={i} x1={15+i*20} y1={10+(i%4)*8} x2={12+i*20} y2={22+(i%4)*8} stroke="#AACC" strokeWidth="1"/>)}<ellipse cx="220" cy="148" rx="8" ry="4" fill="#FF000066"/><ellipse cx="260" cy="148" rx="8" ry="4" fill="#FF000066"/><rect x="205" y="140" width="70" height="18" fill="#33333388" rx="4"/><path d="M 0,225 Q 200,40 400,225" fill="none" stroke="#00000033" strokeWidth="3"/><rect x="8" y="200" width="110" height="18" fill="#00000088" rx="3"/><text x="14" y="213" fill="#0F0" fontSize="8" fontFamily="monospace">2026-04-07 19:15:44</text><text x="200" y="220" textAnchor="middle" fill="#777" fontSize="7">SYNTH #2 — Heavy Rain + Wet Road</text></svg>);
}
function DC_Gen3({ style }) {
  return (<svg viewBox="0 0 400 225" style={style} xmlns="http://www.w3.org/2000/svg"><rect width="400" height="110" fill="#0D1520"/><rect x="25" y="58" width="33" height="52" fill="#1A2535" rx="2"/><rect x="300" y="54" width="37" height="56" fill="#1A2535" rx="2"/><rect x="30" y="66" width="8" height="5" fill="#FFE08060"/><rect x="310" y="62" width="8" height="5" fill="#FFE08050"/><polygon points="0,225 400,225 285,110 115,110" fill="#1A1A1A"/><polygon points="150,225 250,225 220,140 180,140" fill="#FFE08010"/><line x1="200" y1="225" x2="200" y2="125" stroke="#FFD70044" strokeWidth="2" strokeDasharray="10,7"/><line x1="65" y1="225" x2="135" y2="110" stroke="#fff3" strokeWidth="2"/><line x1="335" y1="225" x2="265" y2="110" stroke="#fff3" strokeWidth="2"/><circle cx="240" cy="145" r="12" fill="#FFE08040"/><circle cx="240" cy="145" r="6" fill="#FFFFAA80"/><circle cx="260" cy="145" r="12" fill="#FFE08040"/><circle cx="260" cy="145" r="6" fill="#FFFFAA80"/><circle cx="100" cy="190" r="5" fill="#AA8866"/><rect x="95" y="195" width="10" height="14" fill="#333" rx="1"/><rect x="350" y="40" width="3" height="70" fill="#444"/><circle cx="351" cy="40" r="8" fill="#FFD70030"/><circle cx="351" cy="40" r="3" fill="#FFD700"/><rect x="8" y="200" width="110" height="18" fill="#00000088" rx="3"/><text x="14" y="213" fill="#0F0" fontSize="8" fontFamily="monospace">2026-04-07 23:47:03</text><text x="200" y="220" textAnchor="middle" fill="#555" fontSize="7">SYNTH #3 — Night + Headlight Glare</text></svg>);
}
function DC_Gen4({ style }) {
  return (<svg viewBox="0 0 400 225" style={style} xmlns="http://www.w3.org/2000/svg"><rect width="400" height="110" fill="#AAB8C8"/><rect x="25" y="58" width="33" height="52" fill="#8899AA" rx="2"/><rect x="300" y="54" width="37" height="56" fill="#8899AA" rx="2"/><polygon points="0,225 400,225 285,110 115,110" fill="#555"/><line x1="200" y1="225" x2="200" y2="125" stroke="#FFD700" strokeWidth="2" strokeDasharray="10,7"/><line x1="65" y1="225" x2="135" y2="110" stroke="#fff" strokeWidth="2"/><line x1="335" y1="225" x2="265" y2="110" stroke="#fff" strokeWidth="2"/><polygon points="0,225 65,225 135,110 115,110 0,170" fill="#999"/><polygon points="400,225 335,225 265,110 285,110 400,170" fill="#999"/>{[170,190,210,230,250].map((x,i)=><g key={i}><polygon points={`${x},${180-i*4} ${x-4},${194-i*4} ${x+4},${194-i*4}`} fill="#FF6600"/><rect x={x-5} y={193-i*4} width="10" height="3" fill="#FF6600" rx="1"/></g>)}<rect x="140" y="162" width="70" height="8" fill="#FF6600" rx="2"/><rect x="290" y="155" width="45" height="24" fill="#E8A020" rx="3"/><rect x="302" y="145" width="22" height="12" fill="#C88010" rx="2"/><polygon points="130,140 120,158 140,158" fill="#FFD700" stroke="#000" strokeWidth="1.5"/><text x="130" y="154" textAnchor="middle" fill="#000" fontSize="8" fontWeight="bold">!</text><circle cx="250" cy="165" r="4" fill="#FFB07C"/><rect x="244" y="158" width="12" height="3" fill="#FF6600" rx="1"/><rect x="245" y="169" width="10" height="14" fill="#FF6600" rx="1"/><rect x="8" y="200" width="110" height="18" fill="#00000088" rx="3"/><text x="14" y="213" fill="#0F0" fontSize="8" fontFamily="monospace">2026-04-07 10:08:31</text><text x="200" y="220" textAnchor="middle" fill="#888" fontSize="7">SYNTH #4 — Construction Zone</text></svg>);
}

// ===== VIDEO FRAME SCRUBBER =====
function FrameScrubber({ totalFrames = 300, fps = 30, showFaces, facesOk }) {
  const [frame, setFrame] = useState(0);
  const [playing, setPlaying] = useState(false);
  const intervalRef = useRef(null);
  useEffect(() => {
    if (playing) { intervalRef.current = setInterval(() => setFrame(f => f >= totalFrames - 1 ? (setPlaying(false), 0) : f + 1), 1000 / fps); }
    else clearInterval(intervalRef.current);
    return () => clearInterval(intervalRef.current);
  }, [playing, totalFrames, fps]);
  const sec = (frame / fps).toFixed(1);
  const objects = [
    { id: "P001", cls: "pedestrian", x: 30 + frame * 0.15, y: 55, w: 6, h: 14, color: C.amber },
    { id: "V001", cls: "vehicle", x: 40, y: 42 + frame * 0.02, w: 12, h: 8, color: C.cyan },
    { id: "P002", cls: "pedestrian", x: 18 + frame * 0.06, y: 62, w: 5, h: 12, color: C.amber },
    { id: "C001", cls: "cyclist", x: 72 - frame * 0.05, y: 52, w: 5, h: 10, color: "#8B5CF6" },
  ];
  return (
    <div>
      <div style={{ position: "relative", width: "100%", aspectRatio: "16/9", borderRadius: 8, overflow: "hidden", background: `linear-gradient(180deg, #87CEEB ${40 - frame * 0.01}%, #6a6a6a 40%, #555 41%, #444 100%)`, border: `1px solid ${C.bdr}`, marginBottom: 8 }}>
        {/* Road perspective */}
        <div style={{ position: "absolute", bottom: 0, left: "15%", right: "15%", height: "58%", background: "#444", clipPath: "polygon(30% 0%, 70% 0%, 100% 100%, 0% 100%)" }} />
        {/* Sidewalks */}
        <div style={{ position: "absolute", bottom: 0, left: 0, width: "22%", height: "58%", background: "#888", clipPath: "polygon(60% 0%, 100% 0%, 100% 100%, 0% 100%)" }} />
        <div style={{ position: "absolute", bottom: 0, right: 0, width: "22%", height: "58%", background: "#888", clipPath: "polygon(0% 0%, 40% 0%, 100% 100%, 0% 100%)" }} />
        {/* Buildings */}
        <div style={{ position: "absolute", left: "5%", top: "15%", width: "8%", height: "28%", background: "#7788AA", borderRadius: 2 }} />
        <div style={{ position: "absolute", left: "15%", top: "10%", width: "6%", height: "33%", background: "#8899AA", borderRadius: 2 }} />
        <div style={{ position: "absolute", right: "6%", top: "12%", width: "9%", height: "30%", background: "#7788AA", borderRadius: 2 }} />
        {/* Trees */}
        <div style={{ position: "absolute", left: "28%", top: "22%", width: "10%", height: "10%", background: "#4A7A4A", borderRadius: "50%" }} />
        <div style={{ position: "absolute", right: "22%", top: "19%", width: "11%", height: "11%", background: "#4A7A4A", borderRadius: "50%" }} />
        {/* Lane markings animated */}
        {[0,1,2,3].map(i => <div key={i} style={{ position: "absolute", left: "49.5%", bottom: `${10 + i * 18 - (frame % 18)}%`, width: "1%", height: "6%", background: "#FFD700", opacity: 0.7 }} />)}
        {/* Side lane lines */}
        <div style={{ position: "absolute", bottom: 0, left: "22%", width: "1px", height: "58%", background: "#fff", opacity: 0.6, transformOrigin: "bottom center", transform: "perspective(200px) rotateY(-2deg)" }} />
        <div style={{ position: "absolute", bottom: 0, right: "22%", width: "1px", height: "58%", background: "#fff", opacity: 0.6, transformOrigin: "bottom center", transform: "perspective(200px) rotateY(2deg)" }} />
        {/* Crosswalk */}
        <div style={{ position: "absolute", bottom: "30%", left: "30%", width: "40%", display: "flex", gap: "2%", justifyContent: "center" }}>
          {[0,1,2,3,4].map(i => <div key={i} style={{ width: "4%", height: 6, background: "#fff", opacity: 0.5 }} />)}
        </div>
        {/* Traffic light */}
        <div style={{ position: "absolute", top: "18%", right: "24%", width: 8, height: 22, background: "#333", borderRadius: 3, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 2 }}>
          <div style={{ width: 5, height: 5, borderRadius: "50%", background: frame > 150 ? "#2ECC40" : "#FF0000" }} />
        </div>
        {/* Objects with tracking boxes */}
        {objects.map(obj => (
          <div key={obj.id} style={{ position: "absolute", left: `${obj.x}%`, top: `${obj.y}%`, width: `${obj.w}%`, height: `${obj.h}%`, border: `2px solid ${obj.color}`, borderRadius: 2, transition: "left .03s, top .03s" }}>
            <div style={{ position: "absolute", top: -12, left: 0, fontSize: 7, fontWeight: 700, color: obj.color, background: "#000A", padding: "1px 3px", borderRadius: 2, whiteSpace: "nowrap" }}>{obj.id}: {obj.cls}</div>
          </div>
        ))}
        {/* Face detection overlay */}
        {showFaces && objects.filter(o => o.cls !== "vehicle").map(obj => (
          <div key={obj.id + "_face"} style={{ position: "absolute", left: `${obj.x + 1}%`, top: `${obj.y}%`, width: `${obj.w - 2}%`, height: `${obj.h * 0.4}%`, border: `2px solid ${facesOk ? C.green : C.red}`, borderRadius: 2, background: facesOk ? C.green + "20" : C.red + "10", transition: "left .03s" }}>
            <div style={{ position: "absolute", top: -10, left: 0, fontSize: 5, fontWeight: 700, color: facesOk ? C.green : C.red, background: "#000B", padding: "1px 2px", borderRadius: 2, whiteSpace: "nowrap" }}>{facesOk ? "✓" : "⚠"}</div>
          </div>
        ))}
        {/* License plate detection */}
        {showFaces && <div style={{ position: "absolute", left: `${objects[1].x + 3}%`, top: `${objects[1].y + 6}%`, width: "6%", height: "2%", border: `1.5px solid ${facesOk ? C.green : C.red}`, borderRadius: 1 }}><div style={{ position: "absolute", top: -10, left: 0, fontSize: 5, fontWeight: 700, color: facesOk ? C.green : C.red, background: "#000B", padding: "1px 2px", borderRadius: 2, whiteSpace: "nowrap" }}>{facesOk ? "✓ PLATE" : "⚠ PLATE"}</div></div>}
        {/* HUD */}
        <div style={{ position: "absolute", top: 6, left: 6, background: "#000A", padding: "3px 8px", borderRadius: 4, fontSize: 9, fontFamily: "monospace", color: "#0F0" }}>● REC {fps}fps</div>
        <div style={{ position: "absolute", bottom: 6, left: 6, background: "#000A", padding: "3px 8px", borderRadius: 4, fontSize: 9, fontFamily: "monospace", color: "#0F0" }}>Frame {frame}/{totalFrames} · {sec}s</div>
        <div style={{ position: "absolute", bottom: 6, right: 6, background: "#000A", padding: "3px 8px", borderRadius: 4, fontSize: 9, fontFamily: "monospace", color: C.amber }}>{objects.length} objects tracked</div>
      </div>
      {/* Controls */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
        <button onClick={() => setPlaying(!playing)} style={btn(C.cyan, true, { padding: "5px 12px", fontSize: 11 })}>{playing ? "⏸ Pause" : "▶ Play"}</button>
        <input type="range" min={0} max={totalFrames - 1} value={frame} onChange={e => { setPlaying(false); setFrame(+e.target.value); }} style={{ flex: 1, accentColor: C.cyan }} />
        <span style={{ fontSize: 10, color: C.txt, fontFamily: "monospace", minWidth: 50 }}>{sec}s</span>
      </div>
      {/* Temporal annotation timeline */}
      <div style={{ position: "relative", height: 48, borderRadius: 6, background: C.bg, border: `1px solid ${C.bdr}`, overflow: "hidden" }}>
        {objects.map((obj, i) => (
          <div key={obj.id} style={{ position: "absolute", top: 4 + i * 11, left: `${(i === 0 ? 10 : i === 1 ? 0 : i === 2 ? 20 : 5)}%`, width: `${(i === 0 ? 80 : i === 1 ? 100 : i === 2 ? 60 : 65)}%`, height: 8, background: obj.color + "44", borderRadius: 3 }}>
            <div style={{ fontSize: 6, fontWeight: 700, color: obj.color, padding: "0 3px", lineHeight: "8px" }}>{obj.id}</div>
          </div>
        ))}
        <div style={{ position: "absolute", top: 0, bottom: 0, left: `${(frame / totalFrames) * 100}%`, width: 2, background: "#fff", transition: "left .03s" }} />
      </div>
      <div style={{ fontSize: 8, color: C.txt, marginTop: 4 }}>↑ Temporal annotation timeline — colored bars show per-object tracking duration, white line = current frame</div>
    </div>
  );
}

// ===== CHAT BUBBLE =====
function ChatBubble({ turn, labels }) {
  const isCust = turn.role === "customer";
  return (<div style={{ display: "flex", justifyContent: isCust ? "flex-start" : "flex-end", marginBottom: 5 }}><div style={{ maxWidth: "85%", padding: "7px 10px", borderRadius: isCust ? "8px 8px 8px 2px" : "8px 8px 2px 8px", background: isCust ? "#1a1020" : "#0a1a18", border: `1px solid ${isCust ? "#EF444422" : "#10B98122"}` }}><div style={{ fontSize: 8, fontWeight: 700, color: isCust ? C.red : C.green, marginBottom: 2, display: "flex", alignItems: "center", gap: 3 }}>{isCust ? "👤 Customer" : "🎧 Agent"}{labels && <><span style={{ padding: "1px 4px", borderRadius: 3, fontSize: 7, background: (isCust ? C.red : C.green) + "18", color: isCust ? C.red : C.green }}>{turn.sentiment}</span><span style={{ padding: "1px 4px", borderRadius: 3, fontSize: 7, background: C.accent + "18", color: C.accent }}>{turn.intent}</span></>}{turn.pii && labels && <span style={{ padding: "1px 4px", borderRadius: 3, fontSize: 6, background: C.red + "22", color: C.red }}>PII</span>}</div><div style={{ fontSize: 10, color: C.hi, lineHeight: 1.5 }}>{turn.text}</div></div></div>);
}

// ===== SEED CONVO =====
const SEED_CHAT = [
  { role: "customer", text: "My FitPulse band stopped tracking my heart rate during workouts. This is the third time this month!", sentiment: "angry", intent: "device_malfunction" },
  { role: "agent", text: "I'm really sorry about the recurring heart rate issues. I understand how frustrating that must be. Let me look into your device diagnostics right away.", sentiment: "empathetic", intent: "acknowledge" },
  { role: "customer", text: "I paid $249 for this thing and it can't even do the ONE thing it's supposed to do.", sentiment: "angry", intent: "value_complaint" },
];
const GEN_CHAT = [
  { role: "customer", text: "This is UNBELIEVABLE. My FitPulse Pro dies after 4 hours. The box says 7-day battery life. SEVEN DAYS. I want my money back RIGHT NOW.", sentiment: "furious", intent: "battery_complaint", pii: false },
  { role: "agent", text: "I hear you — that battery performance is way below what you should be getting. Let me help fix this.", sentiment: "empathetic", intent: "de_escalation", pii: false },
  { role: "customer", text: "Fix it? I've already 'fixed' it three times with your useless firmware updates. I want a refund or I'm posting this everywhere.", sentiment: "threatening", intent: "refund_demand", pii: false },
  { role: "agent", text: "I completely understand. Let me escalate this — I can process a full refund or send a replacement Pro unit with expedited shipping. Which would you prefer?", sentiment: "empathetic", intent: "offer_resolution", pii: false },
  { role: "customer", text: "...fine. Send me a replacement. But if this one has the same issue, I WILL be getting that refund.", sentiment: "reluctant", intent: "accept_resolution", pii: false },
  { role: "agent", text: "Absolutely fair. I'm also flagging your account for priority support. You'll get a tracking number within 2 hours.", sentiment: "proactive", intent: "confirm_action", pii: false },
];

// ===== COMPLIANCE REPORT =====
function ComplianceReport({ type, onClose }) {
  const data = {
    warehouse: { title: "Warehouse Safety — Image SDG", client: "Global Logistics Co.", id: "TP-SDG-WH-2026-0407", items: "423 annotated images", format: "COCO/VOC/YOLO", faces: "847 face instances replaced", plates: "N/A", diversity: "FID: 12.8", regulations: ["GDPR Art. 89", "CCPA/CPRA", "EU AI Act Art. 10", "ISO 27001", "SOC 2 Type II", "OSHA Compliance"] },
    driving: { title: "Autonomous Driving — Video SDG", client: "AV OEM [Confidential]", id: "TP-SDG-AV-2026-0407", items: "168 video clips (10s @ 30fps, 504K frames)", format: "MP4 H.264 + COCO-video JSON", faces: "847 face instances replaced", plates: "312 license plates masked", diversity: "FID: 12.4 · Temporal coherence: 0.94", regulations: ["GDPR Art. 89", "CCPA/CPRA", "EU AI Act Art. 10", "ISO 27001", "SOC 2 Type II", "NHTSA AV Guidelines"] },
    support: { title: "Customer Support — Text SDG", client: "FitPulse Inc.", id: "TP-SDG-CX-2026-0407", items: "1,723 conversations (10,683 turns)", format: "JSON, JSONL, CSV, Parquet", faces: "N/A", plates: "N/A", diversity: "Self-BLEU: 0.31 · Distinct-2: 0.87 · Entropy: 7.42", regulations: ["GDPR Art. 89", "CCPA/CPRA", "EU AI Act Art. 10", "SOC 2 Type II"] },
  }[type];
  const piiData = type === "support" ? "4,291 PII entities: Names (1,847), Emails (623), Addresses (412), Order IDs (891), Financial (518)" : type === "driving" ? "847 faces replaced (RetinaFace+ArcFace), 312 plates masked, metadata scrubbed" : "847 face instances replaced (synthetic replacement, not blur), EXIF/GPS scrubbed";
  return (
    <div style={{ ...cardS, borderColor: C.orange + "44" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
        <div style={{ fontSize: 14, fontWeight: 800, color: "#fff" }}>📋 TP.ai Compliance Report</div>
        <button onClick={onClose} style={{ background: "none", border: "none", color: C.txt, cursor: "pointer", fontSize: 14 }}>✕</button>
      </div>
      <div style={{ padding: 14, borderRadius: 8, background: C.bg, border: `1px solid ${C.bdr}`, fontFamily: "monospace", fontSize: 10, color: C.txt, lineHeight: 2 }}>
        <div style={{ fontSize: 10, fontWeight: 700, color: C.orange, letterSpacing: 1, marginBottom: 6 }}>SDG-COMPLIANCE-RPT-{data.id}</div>
        <strong style={{ color: C.hi }}>Report:</strong> {data.title}<br/>
        <strong style={{ color: C.hi }}>Client:</strong> {data.client}<br/>
        <strong style={{ color: C.hi }}>Date:</strong> {new Date().toISOString().split("T")[0]}<br/>
        <strong style={{ color: C.hi }}>Prepared By:</strong> TP.ai Data Services<br/>
        <div style={{ borderBottom: `1px solid ${C.bdr}`, margin: "8px 0" }}/>
        <div style={{ fontSize: 9, fontWeight: 700, color: C.cyan, letterSpacing: 1, marginBottom: 2 }}>1. DATASET SUMMARY</div>
        Delivered: <strong style={{ color: C.hi }}>{data.items}</strong><br/>Format: {data.format}<br/>
        <div style={{ fontSize: 9, fontWeight: 700, color: C.cyan, letterSpacing: 1, marginTop: 6, marginBottom: 2 }}>2. QUALITY ASSURANCE</div>
        Diversity metrics: {data.diversity}<br/>Human naturalness: <strong style={{ color: C.hi }}>4.3/5.0</strong><br/>
        <div style={{ fontSize: 9, fontWeight: 700, color: C.cyan, letterSpacing: 1, marginTop: 6, marginBottom: 2 }}>3. PRIVACY & DE-IDENTIFICATION</div>
        {piiData}<br/>Re-identification risk: <strong style={{ color: C.green }}>0.003</strong> (target &lt;0.01) ✓<br/>
        <div style={{ fontSize: 9, fontWeight: 700, color: C.cyan, letterSpacing: 1, marginTop: 6, marginBottom: 2 }}>4. REGULATORY COMPLIANCE</div>
        <div style={{ display: "flex", gap: 4, flexWrap: "wrap", marginBottom: 6 }}>
          {data.regulations.map(r => <span key={r} style={{ padding: "2px 6px", borderRadius: 4, fontSize: 8, fontWeight: 700, background: C.green + "15", color: C.green }}>✓ {r}</span>)}
        </div>
        <div style={{ fontSize: 9, fontWeight: 700, color: C.cyan, letterSpacing: 1, marginTop: 6, marginBottom: 2 }}>5. DELIVERABLES</div>
        ☑ Synthetic dataset with annotations<br/>☑ Prompt templates & generation configs<br/>☑ De-identification audit log<br/>☑ License & ToS snapshots with dates<br/>☑ This compliance report (PDF)<br/>
        <div style={{ fontSize: 9, fontWeight: 700, color: C.cyan, letterSpacing: 1, marginTop: 6, marginBottom: 2 }}>6. HUMAN-IN-THE-LOOP SIGN-OFF</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 4 }}>
          {["Domain Expert", "Prompt Engineer", "Expert Critic", "Privacy Officer", "QA / Auditor", "Data Librarian"].map(r => (
            <div key={r} style={{ padding: 4, borderRadius: 4, background: C.card, border: `1px solid ${C.bdr}` }}>
              <div style={{ fontSize: 8, fontWeight: 700, color: C.amber }}>{r}</div>
              <div style={{ fontSize: 8, color: C.hi, marginTop: 3, borderTop: `1px dotted ${C.bdr}`, paddingTop: 2 }}>Sign: __________</div>
            </div>
          ))}
        </div>
        <div style={{ borderTop: `1px solid ${C.bdr}`, paddingTop: 6, marginTop: 8, textAlign: "center", fontSize: 8 }}><strong style={{ color: C.hi }}>TP.ai Data Services</strong> · TP · Confidential</div>
      </div>
    </div>
  );
}

// ===== GENERIC PIPELINE ENGINE =====
function PipelineDemo({ type, onBack }) {
  const [stage, setStage] = useState(0);
  const [genOn, setGenOn] = useState(false);
  const [genProg, setGenProg] = useState(0);
  const [genDone, setGenDone] = useState(false);
  const [ratings, setRatings] = useState({});
  const [approvals, setApprovals] = useState({});
  const [filters, setFilters] = useState({});
  const [filterDone, setFilterDone] = useState(false);
  const [piiDone, setPiiDone] = useState(false);
  const [deIdDone, setDeIdDone] = useState(false);
  const [privacyOk, setPrivacyOk] = useState(false);
  const [labelsOk, setLabelsOk] = useState(false);
  const [packed, setPacked] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [editing, setEditing] = useState(null);

  const runGen = () => { setGenOn(true); setGenProg(0); const st = Date.now(); const t = () => { const p = Math.min(100, ((Date.now() - st) / 3000) * 100); setGenProg(p); if (p < 100) requestAnimationFrame(t); else { setGenOn(false); setGenDone(true); } }; requestAnimationFrame(t); };

  const conf = {
    warehouse: { label: "Warehouse Safety · Image SDG", color: C.amber, icon: "🏭", prompts: ["Workers + Forklift + PPE Violations", "Night Shift + Spilled Cargo", "High-Traffic Stress Test", "Partial Occlusion Edge Case"], genLabel: "images", vol: 500, piiLabel: "3 faces detected", deIdLabel: "Faces replaced (synthetic, not blur)" },
    driving: { label: "Self-Driving · Video SDG", color: C.cyan, icon: "🚗", prompts: ["Pedestrian Crossing + Red Light", "Heavy Rain + Wet Road", "Night + Headlight Glare", "Construction Zone + Lane Shift"], genLabel: "video clips", vol: 200, piiLabel: "3 faces + 1 license plate", deIdLabel: "Faces replaced + plates masked across all frames" },
    support: { label: "Angry Customer Support · Text SDG", color: C.red, icon: "💬", prompts: ["Battery Rage → Refund Demand", "Sleep Tracking Sarcasm", "Skin Rash + Legal Threat", "Subscription Price Hike Fury"], genLabel: "conversations", vol: 2000, piiLabel: "4,291 PII entities (names, emails, addresses, order IDs)", deIdLabel: "Entity-level masking applied" },
  }[type];

  const tc = conf.color;

  return (
    <div style={{ minHeight: "100vh", background: C.bg, color: C.txt, fontFamily: "'TP Sans', 'DM Sans', sans-serif" }}>
      <div>
        <div style={{ padding: "0 24px", height: 56, background: "hsl(0,0%,5%)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <img src="/tp-ai-data-services-logo.png" alt="TP.ai DataServices" style={{ height: 20, width: "auto", objectFit: "contain" }} />
          <button style={btn(C.txt, true, { padding: "5px 12px", fontSize: 10 })} onClick={onBack}>← All Journeys</button>
        </div>
        <div style={{ height: 2, background: "linear-gradient(90deg, #5b21b6 0%, #9071f0 100%)" }} />
      </div>
      <div style={{ padding: "10px 24px" }}>
        <Nav stage={stage} setStage={setStage} />

        {/* STAGE 1: SEED */}
        {stage === 0 && (
          <div style={{ display: "flex", gap: 16 }}>
            <div style={{ flex: "0 0 340px" }}>
              <div style={cardS}>
                <div style={{ fontSize: 18, fontWeight: 800, color: "#fff", marginBottom: 8 }}><span style={{ color: C.accent }}>1.</span> Seed & Configure</div>
                <div style={{ fontSize: 11, fontWeight: 700, color: C.hi, marginBottom: 6, display: "flex", alignItems: "center" }}>📁 Seed Data <HT /> <span style={{ fontSize: 9, color: C.amber, marginLeft: 4 }}>Domain Experts</span></div>
                {type === "warehouse" && <WH_Seed style={{ ...imgS, marginBottom: 8 }} />}
                {type === "driving" && <DC_Seed style={{ ...imgS, marginBottom: 8 }} />}
                {type === "support" && (
                  <div style={{ padding: 10, borderRadius: 8, background: C.bg, border: `1px solid ${C.red}33`, marginBottom: 8, maxHeight: 140, overflow: "auto" }}>
                    {SEED_CHAT.map((t, i) => <ChatBubble key={i} turn={t} labels={false} />)}
                  </div>
                )}
                <div style={{ fontSize: 9, color: C.txt, marginBottom: 10 }}>Client-provided seed {type === "support" ? "conversation" : type === "driving" ? "dashcam recording" : "warehouse photo"}</div>
                <button style={btn(C.accent, false, { width: "100%" })} onClick={() => setStage(1)}>Config Complete → Generate</button>
              </div>
            </div>
            <div style={{ flex: 1 }}>
              <div style={cardS}>
                <div style={{ fontSize: 12, fontWeight: 700, color: C.hi, marginBottom: 4, display: "flex", alignItems: "center" }}>✏️ Prompt Templates <HT /> <span style={{ fontSize: 9, color: C.amber, marginLeft: 4 }}>Prompt Engineers</span></div>
                {conf.prompts.map((p, i) => (
                  <div key={i} style={{ padding: 10, borderRadius: 8, background: C.bg, border: `1px solid ${i < 3 ? tc + "44" : C.bdr}`, marginBottom: 6, display: "flex", alignItems: "center", gap: 8 }}>
                    <input type="checkbox" defaultChecked={i < 3} style={{ accentColor: tc }} />
                    <span style={{ fontSize: 11, fontWeight: 700, color: C.hi, flex: 1 }}>{p}</span>
                    <button onClick={() => setEditing(editing === i ? null : i)} style={{ fontSize: 9, padding: "2px 8px", borderRadius: 4, background: tc + "18", color: tc, border: "none", cursor: "pointer", fontWeight: 600 }}>{editing === i ? "Close" : "Edit"}</button>
                    {editing === i && <div style={{ position: "absolute" }}></div>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* STAGE 2: GENERATE */}
        {stage === 1 && (
          <div style={{ display: "flex", gap: 16 }}>
            <div style={{ flex: "0 0 280px" }}>
              <div style={cardS}>
                <div style={{ fontSize: 18, fontWeight: 800, color: "#fff", marginBottom: 10 }}><span style={{ color: "#8B5CF6" }}>2.</span> Generate</div>
                {!genOn && !genDone && <button style={btn("#8B5CF6", false, { width: "100%" })} onClick={runGen}>🧠 Generate {conf.genLabel}</button>}
                {genOn && <div><div style={{ height: 5, borderRadius: 3, background: C.bdr, overflow: "hidden", marginBottom: 6 }}><div style={{ height: "100%", width: `${genProg}%`, background: "#8B5CF6", borderRadius: 3, transition: "width .05s" }} /></div><div style={{ fontSize: 10, color: "#8B5CF6", fontWeight: 600 }}>{Math.round(genProg)}%</div></div>}
                {genDone && <div><div style={{ fontSize: 12, color: C.green, fontWeight: 600, marginBottom: 6 }}>✓ {conf.vol} {conf.genLabel} generated</div><div style={{ padding: 5, borderRadius: 5, background: C.amber + "10", border: `1px solid ${C.amber}33`, marginBottom: 8, fontSize: 9, color: C.amber, display: "flex", alignItems: "center", gap: 3 }}><HT s={6}/> QA validated</div><button style={btn(tc, false, { width: "100%" })} onClick={() => setStage(2)}>Critique →</button></div>}
              </div>
            </div>
            <div style={{ flex: 1 }}>
              <div style={cardS}>
                <div style={{ fontSize: 12, fontWeight: 700, color: C.hi, marginBottom: 8 }}>Generated Output</div>
                <div style={{ opacity: genDone ? 1 : genOn ? 0.3 : 0.12, transition: "opacity 1s" }}>
                  {type === "warehouse" && <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}><WH_Gen1 style={imgS} /><WH_Gen2 style={imgS} /><WH_Gen3 style={imgS} /><WH_Gen4 style={imgS} /></div>}
                  {type === "driving" && <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}><DC_Gen1 style={imgS} /><DC_Gen2 style={imgS} /><DC_Gen3 style={imgS} /><DC_Gen4 style={imgS} /></div>}
                  {type === "support" && <div style={{ padding: 10, borderRadius: 8, background: C.bg, border: `1px solid ${C.bdr}`, maxHeight: 280, overflow: "auto" }}>{GEN_CHAT.map((t, i) => <ChatBubble key={i} turn={t} labels={false} />)}</div>}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STAGE 3: CRITIQUE */}
        {stage === 2 && (
          <div style={{ display: "flex", gap: 16 }}>
            <div style={{ flex: "0 0 280px" }}>
              <div style={cardS}>
                <div style={{ fontSize: 18, fontWeight: 800, color: "#fff", marginBottom: 4 }}><span style={{ color: C.red }}>3.</span> Critique & Iterate</div>
                <div style={{ fontSize: 10, color: C.red, fontWeight: 700, marginBottom: 8 }}>🔄 ITERATIVE LOOP</div>
                <div style={{ padding: 6, borderRadius: 5, background: C.amber + "10", border: `1px solid ${C.amber}33`, marginBottom: 8, fontSize: 9, color: C.amber }}><HT s={6}/> Expert Critics rate naturalness & accuracy</div>
                {Object.values(approvals).filter(v => v).length >= 4 && <button style={btn(tc, false, { width: "100%" })} onClick={() => setStage(3)}>Quality Gate →</button>}
              </div>
            </div>
            <div style={{ flex: 1 }}>
              <div style={cardS}>
                <div style={{ fontSize: 12, fontWeight: 700, color: C.hi, marginBottom: 8 }}>Rate & Approve</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                  {conf.prompts.map((p, i) => {
                    const whVariants = [WH_Gen1, WH_Gen2, WH_Gen3, WH_Gen4];
                    const dcVariants = [DC_Gen1, DC_Gen2, DC_Gen3, DC_Gen4];
                    const autoScores = [0.94, 0.82, 0.91, 0.76];
                    const WHComp = whVariants[i] || WH_Gen1;
                    const DCComp = dcVariants[i] || DC_Gen1;
                    return (
                    <div key={i} style={{ borderRadius: 8, overflow: "hidden", background: C.bg, border: `1px solid ${approvals[i] === "ok" ? C.green + "55" : approvals[i] === "no" ? C.red + "55" : C.bdr}` }}>
                      {type === "warehouse" && <WHComp style={imgS} />}
                      {type === "driving" && <DCComp style={imgS} />}
                      {type === "support" && (
                        <div style={{ padding: 8, maxHeight: 80, overflow: "hidden", borderBottom: `1px solid ${C.bdr}` }}>
                          {GEN_CHAT.slice(i * 2, i * 2 + 2).map((t, j) => <ChatBubble key={j} turn={t} />)}
                        </div>
                      )}
                      <div style={{ padding: 10 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                          <span style={{ fontSize: 10, fontWeight: 700, color: C.hi }}>#{i+1} {p.split("+")[0].split("→")[0].trim()}</span>
                          <span style={{ fontSize: 9, color: autoScores[i] > 0.85 ? C.green : C.amber, fontWeight: 600 }}>Auto: {autoScores[i]}</span>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 6 }}>
                          <span style={{ fontSize: 9, color: C.txt }}>Naturalness:</span>
                          {[1,2,3,4,5].map(s => <span key={s} onClick={() => setRatings(r => ({ ...r, [i]: s }))} style={{ fontSize: 14, cursor: "pointer", filter: (ratings[i]||0) >= s ? "none" : "grayscale(1) opacity(0.25)" }}>⭐</span>)}
                        </div>
                        <div style={{ display: "flex", gap: 4 }}>
                          <button onClick={() => setApprovals(a => ({ ...a, [i]: "ok" }))} style={btn(C.green, approvals[i] !== "ok", { padding: "4px 10px", fontSize: 9, flex: 1 })}>✓ Approve</button>
                          <button onClick={() => setApprovals(a => ({ ...a, [i]: "no" }))} style={btn(C.red, approvals[i] !== "no", { padding: "4px 10px", fontSize: 9, flex: 1 })}>✗ Reject</button>
                        </div>
                      </div>
                    </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STAGE 4: CURATE */}
        {stage === 3 && (
          <div style={{ display: "flex", gap: 16 }}>
            <div style={{ flex: "0 0 280px" }}>
              <div style={cardS}>
                <div style={{ fontSize: 18, fontWeight: 800, color: "#fff", marginBottom: 10 }}><span style={{ color: C.cyan }}>4.</span> Curate & Filter</div>
                {["Quality Filter", "Deduplication", "Safety Screen", "Domain Route"].map((f, i) => (
                  <label key={f} style={{ display: "flex", alignItems: "center", gap: 5, padding: 6, marginBottom: 3, borderRadius: 5, background: filters[i] ? C.cyan + "10" : C.bg, border: `1px solid ${filters[i] ? C.cyan + "33" : C.bdr}`, cursor: "pointer" }}>
                    <input type="checkbox" checked={!!filters[i]} onChange={e => setFilters(p => ({ ...p, [i]: e.target.checked }))} style={{ accentColor: C.cyan }} />
                    <span style={{ fontSize: 10, color: C.hi, flex: 1 }}>{f}</span>{i >= 2 && <HT s={6} />}
                  </label>
                ))}
                {!filterDone && <button style={btn(C.cyan, false, { width: "100%", marginTop: 8 })} onClick={() => setTimeout(() => setFilterDone(true), 1500)}>Run Curation</button>}
                {filterDone && <div style={{ marginTop: 8 }}><div style={{ fontSize: 11, color: C.green, fontWeight: 600, marginBottom: 6 }}>✓ Curation complete</div><button style={btn(tc, false, { width: "100%" })} onClick={() => setStage(4)}>Compliance →</button></div>}
              </div>
            </div>
            <div style={{ flex: 1 }}>
              <div style={cardS}>
                <div style={{ fontSize: 12, fontWeight: 700, color: C.hi, marginBottom: 8 }}>Curation Funnel</div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8 }}>
                  {[{ l: "Input", n: conf.vol }, { l: "Quality", n: Math.round(conf.vol * 0.95) }, { l: "Dedup", n: Math.round(conf.vol * 0.9) }, { l: "Safety", n: Math.round(conf.vol * 0.87), h: 1 }, { l: "Routed", n: Math.round(conf.vol * 0.84), h: 1 }, { l: "Final", n: Math.round(conf.vol * 0.84) }].map((f, i) => (
                    <div key={i} style={{ padding: 12, borderRadius: 8, background: C.bg, border: `1px solid ${filterDone ? C.green + "33" : C.bdr}`, opacity: filterDone ? 1 : 0.3, transition: "all .5s", transitionDelay: `${i * 150}ms`, textAlign: "center" }}>
                      <div style={{ fontSize: 20, fontWeight: 800, color: i === 5 ? C.green : C.hi }}>{f.n}</div>
                      <div style={{ fontSize: 9, color: C.txt }}>{f.l}{f.h ? " 👥" : ""}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STAGE 5: COMPLY */}
        {stage === 4 && (
          <div style={{ display: "flex", gap: 16 }}>
            <div style={{ flex: "0 0 280px" }}>
              <div style={cardS}>
                <div style={{ fontSize: 18, fontWeight: 800, color: "#fff", marginBottom: 10 }}><span style={{ color: C.orange }}>5.</span> Compliance & Privacy</div>
                {!piiDone && <button style={btn(C.orange, false, { width: "100%" })} onClick={() => setTimeout(() => setPiiDone(true), 2000)}>🔍 Detect PII</button>}
                {piiDone && !deIdDone && <div><div style={{ fontSize: 10, color: C.green, fontWeight: 600, marginBottom: 4 }}>✓ {conf.piiLabel}</div><button style={btn(C.orange, false, { width: "100%" })} onClick={() => setDeIdDone(true)}>🎭 De-identify</button></div>}
                {deIdDone && !privacyOk && (
                  <div style={{ padding: 10, borderRadius: 8, background: "#1a1500", border: `2px solid ${C.amber}`, marginTop: 4 }}>
                    <div style={{ fontSize: 10, fontWeight: 700, color: C.amber, display: "flex", alignItems: "center", gap: 3, marginBottom: 4 }}><HT s={6}/> Privacy Officer</div>
                    <div style={{ fontSize: 9, color: C.txt, marginBottom: 6 }}>{conf.deIdLabel}</div>
                    <div style={{ display: "flex", gap: 5 }}>
                      <button style={btn(C.green, false, { padding: "5px 10px", fontSize: 10 })} onClick={() => setPrivacyOk(true)}>✓ Approve</button>
                      <button style={btn(C.red, true, { padding: "5px 10px", fontSize: 10 })} onClick={() => { setDeIdDone(false); setPiiDone(false); }}>✗ Revise</button>
                    </div>
                  </div>
                )}
                {privacyOk && <div style={{ marginTop: 8 }}><div style={{ fontSize: 11, color: C.green, fontWeight: 600, marginBottom: 6 }}>✓ Privacy Audit Passed</div><button style={btn(tc, false, { width: "100%" })} onClick={() => setStage(5)}>Annotate →</button></div>}
              </div>
            </div>
            <div style={{ flex: 1 }}>
              <div style={cardS}>
                <div style={{ fontSize: 12, fontWeight: 700, color: C.hi, marginBottom: 8 }}>De-identification Preview</div>
                {type === "warehouse" && <WH_Gen1 style={{ ...imgS }} showFaces={piiDone} facesOk={deIdDone} />}
                {type === "driving" && <FrameScrubber totalFrames={300} fps={10} showFaces={piiDone} facesOk={deIdDone} />}
                {type === "support" && (
                  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    {[{ b: 'Order number is FP-2847391. Name is Sarah Mitchell.', a: 'Order number is [ORDER_ID]. Name is [CUSTOMER_NAME].', e: ["ORDER_ID", "PERSON_NAME"] },
                      { b: 'Medical bill is $347.00. Email: sarah.m@gmail.com', a: 'Medical bill is [AMOUNT]. Email: [EMAIL_REDACTED]', e: ["FINANCIAL", "EMAIL"] }
                    ].map((ex, i) => (
                      <div key={i} style={{ padding: 10, borderRadius: 8, background: C.bg, border: `1px solid ${deIdDone ? C.green + "33" : C.bdr}` }}>
                        <div style={{ fontSize: 9, fontWeight: 700, color: C.red, marginBottom: 2 }}>BEFORE</div>
                        <div style={{ fontSize: 10, color: C.txt, fontFamily: "monospace", marginBottom: 4 }}>{ex.b}</div>
                        {piiDone && <><div style={{ fontSize: 9, fontWeight: 700, color: deIdDone ? C.green : C.amber, marginBottom: 2 }}>{deIdDone ? "AFTER (MASKED)" : "DETECTED"}</div>{deIdDone && <div style={{ fontSize: 10, color: C.green, fontFamily: "monospace", marginBottom: 4 }}>{ex.a}</div>}<div style={{ display: "flex", gap: 3 }}>{ex.e.map(e => <span key={e} style={{ padding: "1px 5px", borderRadius: 3, fontSize: 8, fontWeight: 700, background: (deIdDone ? C.green : C.red) + "18", color: deIdDone ? C.green : C.red }}>{e}</span>)}</div></>}
                      </div>
                    ))}
                  </div>
                )}
                <div style={{ fontSize: 9, color: C.txt, marginTop: 6 }}>{!piiDone ? "Run detection to identify PII" : !deIdDone ? "PII detected. Click de-identify." : "✓ All PII de-identified. Re-identification risk: 0.003"}</div>
              </div>
            </div>
          </div>
        )}

        {/* STAGE 6: PACKAGE */}
        {stage === 5 && (
          <div style={{ display: "flex", gap: 16 }}>
            <div style={{ flex: "0 0 300px" }}>
              <div style={cardS}>
                <div style={{ fontSize: 18, fontWeight: 800, color: "#fff", marginBottom: 10 }}><span style={{ color: C.green }}>6.</span> Annotate & Package</div>
                {!labelsOk && <div style={{ padding: 8, borderRadius: 6, background: C.amber + "10", border: `1px solid ${C.amber}33`, marginBottom: 8 }}><div style={{ fontSize: 9, fontWeight: 700, color: C.amber, display: "flex", alignItems: "center", gap: 3, marginBottom: 3 }}><HT s={6}/> Labelers & Data Librarians</div><button style={btn(C.green, false, { padding: "6px 12px", fontSize: 10 })} onClick={() => setLabelsOk(true)}>✓ Approve Annotations</button></div>}
                {labelsOk && !packed && <button style={btn(C.green, false, { width: "100%" })} onClick={() => setTimeout(() => setPacked(true), 1000)}>📦 Package</button>}
                {packed && (
                  <div>
                    <div style={{ fontSize: 14, color: C.green, fontWeight: 700, marginBottom: 6 }}>🎉 Complete!</div>
                    <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
                      <button style={btn(C.orange, false, { flex: 1, fontSize: 10 })} onClick={() => setShowReport(true)}>📋 Report</button>
                      <button style={btn(tc, true, { flex: 1, fontSize: 10 })} onClick={onBack}>New Journey</button>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div style={{ flex: 1 }}>
              {showReport ? <ComplianceReport type={type} onClose={() => setShowReport(false)} /> : (
                <div style={cardS}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: C.hi, marginBottom: 8 }}>Annotated Output</div>
                  {type === "warehouse" && <WH_Gen1 style={{ ...imgS, marginBottom: 8 }} showBoxes={true} facesOk={true} />}
                  {type === "driving" && <FrameScrubber totalFrames={300} fps={10} />}
                  {type === "support" && <div style={{ padding: 10, borderRadius: 8, background: C.bg, border: `1px solid ${C.bdr}`, maxHeight: 200, overflow: "auto", marginBottom: 8 }}>{GEN_CHAT.map((t, i) => <ChatBubble key={i} turn={t} labels={true} />)}</div>}
                  <div style={{ fontSize: 10, fontWeight: 700, color: C.hi, marginBottom: 4 }}>Provenance</div>
                  <div style={{ padding: 8, borderRadius: 6, background: C.bg, border: `1px solid ${C.bdr}` }}>
                    {[{ k: "Source", v: "TP.ai SDG Pipeline v2.0" }, { k: "Model", v: type === "support" ? "Gemini 2.0 Flash" : type === "driving" ? "NVIDIA Cosmos" : "FLUX.1 + ControlNet" }, { k: "PII", v: "Fully de-identified" }, { k: "ToS Snapshot", v: new Date().toISOString().split("T")[0] }, { k: "Quality", v: "0.94 (mean)" }].map((m, i) => (
                      <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "2px 0", borderBottom: i < 4 ? `1px solid ${C.bdr}` : "none" }}>
                        <span style={{ fontSize: 9, color: C.txt }}>{m.k}</span><span style={{ fontSize: 9, color: C.green, fontWeight: 600 }}>{m.v}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ===== MAIN APP =====
export default function App() {
  const [journey, setJourney] = useState(null);
  const [hov, setHov] = useState(null);

  if (journey) return <PipelineDemo type={journey} onBack={() => setJourney(null)} />;

  return (
    <div style={{ minHeight: "100vh", background: C.bg, color: C.txt, fontFamily: "'TP Sans', 'DM Sans', sans-serif" }}>
      <div>
        <div style={{ padding: "0 28px", height: 56, background: "hsl(0,0%,5%)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <img src="/tp-ai-data-services-logo.png" alt="TP.ai DataServices" style={{ height: 20, width: "auto", objectFit: "contain" }} />
          <img src="/TP-logo.png" alt="TP" style={{ height: 26, width: "auto", objectFit: "contain" }} />
        </div>
        <div style={{ height: 2, background: "linear-gradient(90deg, #5b21b6 0%, #9071f0 100%)" }} />
      </div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "calc(100vh - 56px)", padding: 32 }}>
        <img src="/tp-ai-data-services-logo.png" alt="TP.ai DataServices" style={{ height: 26, width: "auto", objectFit: "contain", opacity: 0.92, marginBottom: 12 }} />
        <span style={{ display: "block", fontSize: "1.1rem", fontWeight: 700, letterSpacing: "0.32em", textTransform: "uppercase", color: "rgba(210,195,225,0.5)", marginBottom: "0.55rem", textAlign: "center" }}>Introducing</span>
        <h1 style={{ fontSize: "clamp(2.4rem, 6.5vw, 5rem)", fontWeight: 900, color: "#fff", lineHeight: 1.04, letterSpacing: "-0.025em", marginBottom: "0.55rem", textShadow: "0 0 40px rgba(144,113,240,0.25), 0 2px 20px rgba(0,0,0,0.5)", textAlign: "center" }}>
          TP.ai <span style={{ color: "#9071f0" }}>Data</span>Gen
        </h1>
        <p style={{ fontSize: 16, color: C.txt, textAlign: "center", maxWidth: 640, lineHeight: 1.6, marginBottom: 12 }}>
          Synthetic Data Generation &amp; Curation Platform — end-to-end pipelines with human-in-the-loop quality, regulatory compliance, and full provenance across text, image, and video.
        </p>
        <p style={{ fontSize: 12, color: C.accent, textAlign: "center", marginBottom: 40 }}>Choose a demo journey to experience the full 6-stage pipeline ↓</p>

        <div style={{ display: "flex", gap: 18, flexWrap: "wrap", justifyContent: "center", marginBottom: 48 }}>
          {[
            { k: "warehouse", icon: "🏭", title: "Warehouse Safety", sub: "Image SDG", desc: "Generate synthetic warehouse images with workers, forklifts, safety violations, and edge cases from a single seed photo.", color: C.amber, brief: "Logistics client · 500 annotated images" },
            { k: "driving", icon: "🚗", title: "Self-Driving Car", sub: "Video SDG", desc: "Generate dashcam video clips with pedestrians, rain, night driving, and construction zones for perception training.", color: C.cyan, brief: "AV OEM · 200 video clips · 30fps" },
            { k: "support", icon: "💬", title: "Angry Customer Support", sub: "Text SDG", desc: "Generate customer support conversations with angry, sarcastic, and threatening customers for support AI training.", color: C.red, brief: "FitPulse wearable · 2,000 conversations" },
          ].map(j => (
            <div key={j.k}
              onMouseEnter={() => setHov(j.k)} onMouseLeave={() => setHov(null)}
              onClick={() => setJourney(j.k)}
              style={{ width: 290, padding: "28px 22px", borderRadius: 14, cursor: "pointer", transition: "all .35s cubic-bezier(.17,.67,.35,1.15)", border: `1px solid ${hov === j.k ? j.color + "66" : C.bdr}`, background: hov === j.k ? j.color + "08" : C.card, transform: hov === j.k ? "translateY(-4px)" : "none", boxShadow: hov === j.k ? `0 14px 40px ${j.color}18` : "none" }}>
              <div style={{ fontSize: 36, marginBottom: 10 }}>{j.icon}</div>
              <div style={{ fontSize: 20, fontWeight: 700, color: j.color, marginBottom: 2 }}>{j.title}</div>
              <div style={{ fontSize: 10, fontWeight: 700, color: j.color, letterSpacing: 1, opacity: 0.7, marginBottom: 8 }}>{j.sub}</div>
              <div style={{ fontSize: 12, color: C.txt, lineHeight: 1.5, marginBottom: 10 }}>{j.desc}</div>
              <div style={{ padding: "4px 10px", borderRadius: 6, background: j.color + "12", border: `1px solid ${j.color}22`, fontSize: 10, color: j.color, fontWeight: 600, display: "inline-block" }}>{j.brief}</div>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center" }}>
          <div style={{ padding: "8px 14px", borderRadius: 6, background: C.red + "10", border: `1px solid ${C.red}22`, fontSize: 10, color: C.red, fontWeight: 600 }}><HT s={7} /> Human-in-the-loop at every stage</div>
          <div style={{ padding: "8px 14px", borderRadius: 6, background: C.green + "10", border: `1px solid ${C.green}22`, fontSize: 10, color: C.green, fontWeight: 600 }}>🔒 GDPR · HIPAA · EU AI Act · SOC 2</div>
          <div style={{ padding: "8px 14px", borderRadius: 6, background: C.accent + "10", border: `1px solid ${C.accent}22`, fontSize: 10, color: C.accent, fontWeight: 600 }}>📋 Full compliance report per delivery</div>
        </div>
      </div>
    </div>
  );
}