import React, { useState, useRef, useEffect } from "react";

// ===== SHARED STYLES =====
const C = { bg: "#131313", card: "#1A1A1A", bdr: "#222222", txt: "#9E9E9E", hi: "#E5E0DB", accent: "#7C3AED", green: "#10B981", amber: "#F59E0B", red: "#EF4444", cyan: "#06B6D4", orange: "#F97316" };
const btn = (c, o, x = {}) => ({ padding: "10px 22px", borderRadius: 8, border: o ? `1.5px solid ${c}` : "none", background: o ? "transparent" : c, color: o ? c : "#000", fontSize: 15, fontWeight: 700, cursor: "pointer", ...x });
const cardS = { background: C.card, borderRadius: 12, border: `1px solid ${C.bdr}`, padding: 20 };
const imgS = { width: "100%", borderRadius: 8, border: `1px solid ${C.bdr}` };
function HT({ s = 9 }) { return <span style={{ display: "inline-block", width: 0, height: 0, borderLeft: `${s/2}px solid transparent`, borderRight: `${s/2}px solid transparent`, borderBottom: `${s}px solid ${C.red}`, marginLeft: 4, verticalAlign: "middle" }} />; }
const stageC = [C.accent, "#8B5CF6", C.red, C.cyan, C.orange, C.green];
const stageL = ["Seed", "Generate", "Critique", "Curate", "Comply", "Package"];
function Nav({ stage, setStage }) {
  return (<div style={{ display: "flex", alignItems: "center", gap: 3, marginBottom: 12 }}>{stageL.map((l, i) => (<div key={i} style={{ display: "flex", alignItems: "center" }}><div onClick={() => setStage(i)} title={l} style={{ width: 34, height: 34, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 700, cursor: "pointer", background: stage === i ? stageC[i] + "22" : stage > i ? C.green + "18" : C.card, border: `2px solid ${stage === i ? stageC[i] : stage > i ? C.green : C.bdr}`, color: stage === i ? "#fff" : stage > i ? C.green : C.txt }}>{stage > i ? "✓" : i + 1}</div>{i < 5 && <div style={{ width: 8, height: 2, background: stage > i ? C.green + "44" : C.bdr }} />}</div>))}<span style={{ marginLeft: 6, fontSize: 13, color: C.txt }}>{stage < 3 ? "GENERATION" : "CURATION"}</span></div>);
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
        <div style={{ position: "absolute", bottom: 0, left: "15%", right: "15%", height: "58%", background: "#444", clipPath: "polygon(30% 0%, 70% 0%, 100% 100%, 0% 100%)" }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, width: "22%", height: "58%", background: "#888", clipPath: "polygon(60% 0%, 100% 0%, 100% 100%, 0% 100%)" }} />
        <div style={{ position: "absolute", bottom: 0, right: 0, width: "22%", height: "58%", background: "#888", clipPath: "polygon(0% 0%, 40% 0%, 100% 100%, 0% 100%)" }} />
        <div style={{ position: "absolute", left: "5%", top: "15%", width: "8%", height: "28%", background: "#7788AA", borderRadius: 2 }} />
        <div style={{ position: "absolute", left: "15%", top: "10%", width: "6%", height: "33%", background: "#8899AA", borderRadius: 2 }} />
        <div style={{ position: "absolute", right: "6%", top: "12%", width: "9%", height: "30%", background: "#7788AA", borderRadius: 2 }} />
        <div style={{ position: "absolute", left: "28%", top: "22%", width: "10%", height: "10%", background: "#4A7A4A", borderRadius: "50%" }} />
        <div style={{ position: "absolute", right: "22%", top: "19%", width: "11%", height: "11%", background: "#4A7A4A", borderRadius: "50%" }} />
        {[0,1,2,3].map(i => <div key={i} style={{ position: "absolute", left: "49.5%", bottom: `${10 + i * 18 - (frame % 18)}%`, width: "1%", height: "6%", background: "#FFD700", opacity: 0.7 }} />)}
        <div style={{ position: "absolute", bottom: 0, left: "22%", width: "1px", height: "58%", background: "#fff", opacity: 0.6, transformOrigin: "bottom center", transform: "perspective(200px) rotateY(-2deg)" }} />
        <div style={{ position: "absolute", bottom: 0, right: "22%", width: "1px", height: "58%", background: "#fff", opacity: 0.6, transformOrigin: "bottom center", transform: "perspective(200px) rotateY(2deg)" }} />
        <div style={{ position: "absolute", bottom: "30%", left: "30%", width: "40%", display: "flex", gap: "2%", justifyContent: "center" }}>
          {[0,1,2,3,4].map(i => <div key={i} style={{ width: "4%", height: 6, background: "#fff", opacity: 0.5 }} />)}
        </div>
        <div style={{ position: "absolute", top: "18%", right: "24%", width: 8, height: 22, background: "#333", borderRadius: 3, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 2 }}>
          <div style={{ width: 5, height: 5, borderRadius: "50%", background: frame > 150 ? "#2ECC40" : "#FF0000" }} />
        </div>
        {objects.map(obj => (
          <div key={obj.id} style={{ position: "absolute", left: `${obj.x}%`, top: `${obj.y}%`, width: `${obj.w}%`, height: `${obj.h}%`, border: `2px solid ${obj.color}`, borderRadius: 2, transition: "left .03s, top .03s" }}>
            <div style={{ position: "absolute", top: -12, left: 0, fontSize: 11, fontWeight: 700, color: obj.color, background: "#000A", padding: "1px 3px", borderRadius: 2, whiteSpace: "nowrap" }}>{obj.id}: {obj.cls}</div>
          </div>
        ))}
        {showFaces && objects.filter(o => o.cls !== "vehicle").map(obj => (
          <div key={obj.id + "_face"} style={{ position: "absolute", left: `${obj.x + 1}%`, top: `${obj.y}%`, width: `${obj.w - 2}%`, height: `${obj.h * 0.4}%`, border: `2px solid ${facesOk ? C.green : C.red}`, borderRadius: 2, background: facesOk ? C.green + "20" : C.red + "10", transition: "left .03s" }}>
            <div style={{ position: "absolute", top: -10, left: 0, fontSize: 5, fontWeight: 700, color: facesOk ? C.green : C.red, background: "#000B", padding: "1px 2px", borderRadius: 2, whiteSpace: "nowrap" }}>{facesOk ? "✓" : "⚠"}</div>
          </div>
        ))}
        {showFaces && <div style={{ position: "absolute", left: `${objects[1].x + 3}%`, top: `${objects[1].y + 6}%`, width: "6%", height: "2%", border: `1.5px solid ${facesOk ? C.green : C.red}`, borderRadius: 1 }}><div style={{ position: "absolute", top: -10, left: 0, fontSize: 5, fontWeight: 700, color: facesOk ? C.green : C.red, background: "#000B", padding: "1px 2px", borderRadius: 2, whiteSpace: "nowrap" }}>{facesOk ? "✓ PLATE" : "⚠ PLATE"}</div></div>}
        <div style={{ position: "absolute", top: 6, left: 6, background: "#000A", padding: "3px 8px", borderRadius: 4, fontSize: 12, fontFamily: "monospace", color: "#0F0" }}>● REC {fps}fps</div>
        <div style={{ position: "absolute", bottom: 6, left: 6, background: "#000A", padding: "3px 8px", borderRadius: 4, fontSize: 12, fontFamily: "monospace", color: "#0F0" }}>Frame {frame}/{totalFrames} · {sec}s</div>
        <div style={{ position: "absolute", bottom: 6, right: 6, background: "#000A", padding: "3px 8px", borderRadius: 4, fontSize: 12, fontFamily: "monospace", color: C.amber }}>{objects.length} objects tracked</div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
        <button onClick={() => setPlaying(!playing)} style={btn(C.cyan, true, { padding: "5px 12px", fontSize: 13 })}>{playing ? "⏸ Pause" : "▶ Play"}</button>
        <input type="range" min={0} max={totalFrames - 1} value={frame} onChange={e => { setPlaying(false); setFrame(+e.target.value); }} style={{ flex: 1, accentColor: C.cyan }} />
        <span style={{ fontSize: 13, color: C.txt, fontFamily: "monospace", minWidth: 50 }}>{sec}s</span>
      </div>
      <div style={{ position: "relative", height: 48, borderRadius: 6, background: C.bg, border: `1px solid ${C.bdr}`, overflow: "hidden" }}>
        {objects.map((obj, i) => (
          <div key={obj.id} style={{ position: "absolute", top: 4 + i * 11, left: `${(i === 0 ? 10 : i === 1 ? 0 : i === 2 ? 20 : 5)}%`, width: `${(i === 0 ? 80 : i === 1 ? 100 : i === 2 ? 60 : 65)}%`, height: 8, background: obj.color + "44", borderRadius: 3 }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: obj.color, padding: "0 3px", lineHeight: "8px" }}>{obj.id}</div>
          </div>
        ))}
        <div style={{ position: "absolute", top: 0, bottom: 0, left: `${(frame / totalFrames) * 100}%`, width: 2, background: "#fff", transition: "left .03s" }} />
      </div>
      <div style={{ fontSize: 12, color: C.txt, marginTop: 4 }}>↑ Temporal annotation timeline — colored bars show per-object tracking duration, white line = current frame</div>
    </div>
  );
}

// ===== CHAT BUBBLE =====
function ChatBubble({ turn, labels }) {
  const isCust = turn.role === "customer";
  return (<div style={{ display: "flex", justifyContent: isCust ? "flex-start" : "flex-end", marginBottom: 5 }}><div style={{ maxWidth: "85%", padding: "7px 10px", borderRadius: isCust ? "8px 8px 8px 2px" : "8px 8px 2px 8px", background: isCust ? "#1a1020" : "#0a1a18", border: `1px solid ${isCust ? "#EF444422" : "#10B98122"}` }}><div style={{ fontSize: 12, fontWeight: 700, color: isCust ? C.red : C.green, marginBottom: 2, display: "flex", alignItems: "center", gap: 3 }}>{isCust ? "👤 Customer" : "🎧 Agent"}{labels && <><span style={{ padding: "1px 4px", borderRadius: 3, fontSize: 11, background: (isCust ? C.red : C.green) + "18", color: isCust ? C.red : C.green }}>{turn.sentiment}</span><span style={{ padding: "1px 4px", borderRadius: 3, fontSize: 11, background: C.accent + "18", color: C.accent }}>{turn.intent}</span></>}{turn.pii && labels && <span style={{ padding: "1px 4px", borderRadius: 3, fontSize: 10, background: C.red + "22", color: C.red }}>PII</span>}</div><div style={{ fontSize: 13, color: C.hi, lineHeight: 1.5 }}>{turn.text}</div></div></div>);
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
        <div style={{ fontSize: 16, fontWeight: 800, color: "#fff" }}>📋 TP.ai Compliance Report</div>
        <button onClick={onClose} style={{ background: "none", border: "none", color: C.txt, cursor: "pointer", fontSize: 16 }}>✕</button>
      </div>
      <div style={{ padding: 14, borderRadius: 8, background: C.bg, border: `1px solid ${C.bdr}`, fontFamily: "monospace", fontSize: 13, color: C.txt, lineHeight: 2 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: C.orange, letterSpacing: 1, marginBottom: 6 }}>SDG-COMPLIANCE-RPT-{data.id}</div>
        <strong style={{ color: C.hi }}>Report:</strong> {data.title}<br/>
        <strong style={{ color: C.hi }}>Client:</strong> {data.client}<br/>
        <strong style={{ color: C.hi }}>Date:</strong> {new Date().toISOString().split("T")[0]}<br/>
        <strong style={{ color: C.hi }}>Prepared By:</strong> TP.ai Data Services<br/>
        <div style={{ borderBottom: `1px solid ${C.bdr}`, margin: "8px 0" }}/>
        <div style={{ fontSize: 12, fontWeight: 700, color: C.cyan, letterSpacing: 1, marginBottom: 2 }}>1. DATASET SUMMARY</div>
        Delivered: <strong style={{ color: C.hi }}>{data.items}</strong><br/>Format: {data.format}<br/>
        <div style={{ fontSize: 12, fontWeight: 700, color: C.cyan, letterSpacing: 1, marginTop: 6, marginBottom: 2 }}>2. QUALITY ASSURANCE</div>
        Diversity metrics: {data.diversity}<br/>Human naturalness: <strong style={{ color: C.hi }}>4.3/5.0</strong><br/>
        <div style={{ fontSize: 12, fontWeight: 700, color: C.cyan, letterSpacing: 1, marginTop: 6, marginBottom: 2 }}>3. PRIVACY & DE-IDENTIFICATION</div>
        {piiData}<br/>Re-identification risk: <strong style={{ color: C.green }}>0.003</strong> (target &lt;0.01) ✓<br/>
        <div style={{ fontSize: 12, fontWeight: 700, color: C.cyan, letterSpacing: 1, marginTop: 6, marginBottom: 2 }}>4. REGULATORY COMPLIANCE</div>
        <div style={{ display: "flex", gap: 4, flexWrap: "wrap", marginBottom: 6 }}>
          {data.regulations.map(r => <span key={r} style={{ padding: "2px 6px", borderRadius: 4, fontSize: 12, fontWeight: 700, background: C.green + "15", color: C.green }}>✓ {r}</span>)}
        </div>
        <div style={{ fontSize: 12, fontWeight: 700, color: C.cyan, letterSpacing: 1, marginTop: 6, marginBottom: 2 }}>5. DELIVERABLES</div>
        ☑ Synthetic dataset with annotations<br/>☑ Prompt templates & generation configs<br/>☑ De-identification audit log<br/>☑ License & ToS snapshots with dates<br/>☑ This compliance report (PDF)<br/>
        <div style={{ fontSize: 12, fontWeight: 700, color: C.cyan, letterSpacing: 1, marginTop: 6, marginBottom: 2 }}>6. HUMAN-IN-THE-LOOP SIGN-OFF</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 4 }}>
          {["Domain Expert", "Prompt Engineer", "Expert Critic", "Privacy Officer", "QA / Auditor", "Data Librarian"].map(r => (
            <div key={r} style={{ padding: 4, borderRadius: 4, background: C.card, border: `1px solid ${C.bdr}` }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: C.amber }}>{r}</div>
              <div style={{ fontSize: 12, color: C.hi, marginTop: 3, borderTop: `1px dotted ${C.bdr}`, paddingTop: 2 }}>Sign: __________</div>
            </div>
          ))}
        </div>
        <div style={{ borderTop: `1px solid ${C.bdr}`, paddingTop: 6, marginTop: 8, textAlign: "center", fontSize: 12 }}><strong style={{ color: C.hi }}>TP.ai Data Services</strong> · TP · Confidential</div>
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
    <div style={{ background: C.bg, color: C.txt, fontFamily: "'TP Sans', 'DM Sans', sans-serif", minHeight: "calc(100vh - 112px)" }}>
      <div style={{ padding: "8px 24px", display: "flex", alignItems: "center", gap: 12, borderBottom: `1px solid ${C.bdr}` }}>
        <button style={btn(C.txt, true, { padding: "4px 10px", fontSize: 13 })} onClick={onBack}>← All Journeys</button>
        <span style={{ fontSize: 13, color: tc, fontWeight: 700 }}>{conf.icon} {conf.label}</span>
      </div>
      <div style={{ padding: "10px 24px" }}>
        <Nav stage={stage} setStage={setStage} />

        {stage === 0 && (
          <div style={{ display: "flex", gap: 16 }}>
            <div style={{ flex: "0 0 340px" }}>
              <div style={cardS}>
                <div style={{ fontSize: 18, fontWeight: 800, color: "#fff", marginBottom: 8 }}><span style={{ color: C.accent }}>1.</span> Seed & Configure</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: C.hi, marginBottom: 6, display: "flex", alignItems: "center" }}>📁 Seed Data <HT /> <span style={{ fontSize: 12, color: C.amber, marginLeft: 4 }}>Domain Experts</span></div>
                {type === "warehouse" && <WH_Seed style={{ ...imgS, marginBottom: 8 }} />}
                {type === "driving" && <DC_Seed style={{ ...imgS, marginBottom: 8 }} />}
                {type === "support" && (
                  <div style={{ padding: 10, borderRadius: 8, background: C.bg, border: `1px solid ${C.red}33`, marginBottom: 8, maxHeight: 140, overflow: "auto" }}>
                    {SEED_CHAT.map((t, i) => <ChatBubble key={i} turn={t} labels={false} />)}
                  </div>
                )}
                <div style={{ fontSize: 12, color: C.txt, marginBottom: 10 }}>Client-provided seed {type === "support" ? "conversation" : type === "driving" ? "dashcam recording" : "warehouse photo"}</div>
                <button style={btn(C.accent, false, { width: "100%" })} onClick={() => setStage(1)}>Config Complete → Generate</button>
              </div>
            </div>
            <div style={{ flex: 1 }}>
              <div style={cardS}>
                <div style={{ fontSize: 14, fontWeight: 700, color: C.hi, marginBottom: 4, display: "flex", alignItems: "center" }}>✏️ Prompt Templates <HT /> <span style={{ fontSize: 12, color: C.amber, marginLeft: 4 }}>Prompt Engineers</span></div>
                {conf.prompts.map((p, i) => (
                  <div key={i} style={{ padding: 10, borderRadius: 8, background: C.bg, border: `1px solid ${i < 3 ? tc + "44" : C.bdr}`, marginBottom: 6, display: "flex", alignItems: "center", gap: 8 }}>
                    <input type="checkbox" defaultChecked={i < 3} style={{ accentColor: tc }} />
                    <span style={{ fontSize: 13, fontWeight: 700, color: C.hi, flex: 1 }}>{p}</span>
                    <button onClick={() => setEditing(editing === i ? null : i)} style={{ fontSize: 12, padding: "2px 8px", borderRadius: 4, background: tc + "18", color: tc, border: "none", cursor: "pointer", fontWeight: 600 }}>{editing === i ? "Close" : "Edit"}</button>
                    {editing === i && <div style={{ position: "absolute" }}></div>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {stage === 1 && (
          <div style={{ display: "flex", gap: 16 }}>
            <div style={{ flex: "0 0 280px" }}>
              <div style={cardS}>
                <div style={{ fontSize: 18, fontWeight: 800, color: "#fff", marginBottom: 10 }}><span style={{ color: "#8B5CF6" }}>2.</span> Generate</div>
                {!genOn && !genDone && <button style={btn("#8B5CF6", false, { width: "100%" })} onClick={runGen}>🧠 Generate {conf.genLabel}</button>}
                {genOn && <div><div style={{ height: 5, borderRadius: 3, background: C.bdr, overflow: "hidden", marginBottom: 6 }}><div style={{ height: "100%", width: `${genProg}%`, background: "#8B5CF6", borderRadius: 3, transition: "width .05s" }} /></div><div style={{ fontSize: 13, color: "#8B5CF6", fontWeight: 600 }}>{Math.round(genProg)}%</div></div>}
                {genDone && <div><div style={{ fontSize: 14, color: C.green, fontWeight: 600, marginBottom: 6 }}>✓ {conf.vol} {conf.genLabel} generated</div><div style={{ padding: 5, borderRadius: 5, background: C.amber + "10", border: `1px solid ${C.amber}33`, marginBottom: 8, fontSize: 12, color: C.amber, display: "flex", alignItems: "center", gap: 3 }}><HT s={6}/> QA validated</div><button style={btn(tc, false, { width: "100%" })} onClick={() => setStage(2)}>Critique →</button></div>}
              </div>
            </div>
            <div style={{ flex: 1 }}>
              <div style={cardS}>
                <div style={{ fontSize: 14, fontWeight: 700, color: C.hi, marginBottom: 8 }}>Generated Output</div>
                <div style={{ opacity: genDone ? 1 : genOn ? 0.3 : 0.12, transition: "opacity 1s" }}>
                  {type === "warehouse" && <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}><WH_Gen1 style={imgS} /><WH_Gen2 style={imgS} /><WH_Gen3 style={imgS} /><WH_Gen4 style={imgS} /></div>}
                  {type === "driving" && <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}><DC_Gen1 style={imgS} /><DC_Gen2 style={imgS} /><DC_Gen3 style={imgS} /><DC_Gen4 style={imgS} /></div>}
                  {type === "support" && <div style={{ padding: 10, borderRadius: 8, background: C.bg, border: `1px solid ${C.bdr}`, maxHeight: 280, overflow: "auto" }}>{GEN_CHAT.map((t, i) => <ChatBubble key={i} turn={t} labels={false} />)}</div>}
                </div>
              </div>
            </div>
          </div>
        )}

        {stage === 2 && (
          <div style={{ display: "flex", gap: 16 }}>
            <div style={{ flex: "0 0 280px" }}>
              <div style={cardS}>
                <div style={{ fontSize: 18, fontWeight: 800, color: "#fff", marginBottom: 4 }}><span style={{ color: C.red }}>3.</span> Critique & Iterate</div>
                <div style={{ fontSize: 13, color: C.red, fontWeight: 700, marginBottom: 8 }}>🔄 ITERATIVE LOOP</div>
                <div style={{ padding: 6, borderRadius: 5, background: C.amber + "10", border: `1px solid ${C.amber}33`, marginBottom: 8, fontSize: 12, color: C.amber }}><HT s={6}/> Expert Critics rate naturalness & accuracy</div>
                {Object.values(approvals).filter(v => v).length >= 4 && <button style={btn(tc, false, { width: "100%" })} onClick={() => setStage(3)}>Quality Gate →</button>}
              </div>
            </div>
            <div style={{ flex: 1 }}>
              <div style={cardS}>
                <div style={{ fontSize: 14, fontWeight: 700, color: C.hi, marginBottom: 8 }}>Rate & Approve</div>
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
                          <span style={{ fontSize: 13, fontWeight: 700, color: C.hi }}>#{i+1} {p.split("+")[0].split("→")[0].trim()}</span>
                          <span style={{ fontSize: 12, color: autoScores[i] > 0.85 ? C.green : C.amber, fontWeight: 600 }}>Auto: {autoScores[i]}</span>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 6 }}>
                          <span style={{ fontSize: 12, color: C.txt }}>Naturalness:</span>
                          {[1,2,3,4,5].map(s => <span key={s} onClick={() => setRatings(r => ({ ...r, [i]: s }))} style={{ fontSize: 16, cursor: "pointer", filter: (ratings[i]||0) >= s ? "none" : "grayscale(1) opacity(0.25)" }}>⭐</span>)}
                        </div>
                        <div style={{ display: "flex", gap: 4 }}>
                          <button onClick={() => setApprovals(a => ({ ...a, [i]: "ok" }))} style={btn(C.green, approvals[i] !== "ok", { padding: "4px 10px", fontSize: 12, flex: 1 })}>✓ Approve</button>
                          <button onClick={() => setApprovals(a => ({ ...a, [i]: "no" }))} style={btn(C.red, approvals[i] !== "no", { padding: "4px 10px", fontSize: 12, flex: 1 })}>✗ Reject</button>
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

        {stage === 3 && (
          <div style={{ display: "flex", gap: 16 }}>
            <div style={{ flex: "0 0 280px" }}>
              <div style={cardS}>
                <div style={{ fontSize: 18, fontWeight: 800, color: "#fff", marginBottom: 10 }}><span style={{ color: C.cyan }}>4.</span> Curate & Filter</div>
                {["Quality Filter", "Deduplication", "Safety Screen", "Domain Route"].map((f, i) => (
                  <label key={f} style={{ display: "flex", alignItems: "center", gap: 5, padding: 6, marginBottom: 3, borderRadius: 5, background: filters[i] ? C.cyan + "10" : C.bg, border: `1px solid ${filters[i] ? C.cyan + "33" : C.bdr}`, cursor: "pointer" }}>
                    <input type="checkbox" checked={!!filters[i]} onChange={e => setFilters(p => ({ ...p, [i]: e.target.checked }))} style={{ accentColor: C.cyan }} />
                    <span style={{ fontSize: 13, color: C.hi, flex: 1 }}>{f}</span>{i >= 2 && <HT s={6} />}
                  </label>
                ))}
                {!filterDone && <button style={btn(C.cyan, false, { width: "100%", marginTop: 8 })} onClick={() => setTimeout(() => setFilterDone(true), 1500)}>Run Curation</button>}
                {filterDone && <div style={{ marginTop: 8 }}><div style={{ fontSize: 13, color: C.green, fontWeight: 600, marginBottom: 6 }}>✓ Curation complete</div><button style={btn(tc, false, { width: "100%" })} onClick={() => setStage(4)}>Compliance →</button></div>}
              </div>
            </div>
            <div style={{ flex: 1 }}>
              <div style={cardS}>
                <div style={{ fontSize: 14, fontWeight: 700, color: C.hi, marginBottom: 8 }}>Curation Funnel</div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8 }}>
                  {[{ l: "Input", n: conf.vol }, { l: "Quality", n: Math.round(conf.vol * 0.95) }, { l: "Dedup", n: Math.round(conf.vol * 0.9) }, { l: "Safety", n: Math.round(conf.vol * 0.87), h: 1 }, { l: "Routed", n: Math.round(conf.vol * 0.84), h: 1 }, { l: "Final", n: Math.round(conf.vol * 0.84) }].map((f, i) => (
                    <div key={i} style={{ padding: 12, borderRadius: 8, background: C.bg, border: `1px solid ${filterDone ? C.green + "33" : C.bdr}`, opacity: filterDone ? 1 : 0.3, transition: "all .5s", transitionDelay: `${i * 150}ms`, textAlign: "center" }}>
                      <div style={{ fontSize: 20, fontWeight: 800, color: i === 5 ? C.green : C.hi }}>{f.n}</div>
                      <div style={{ fontSize: 12, color: C.txt }}>{f.l}{f.h ? " 👥" : ""}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {stage === 4 && (
          <div style={{ display: "flex", gap: 16 }}>
            <div style={{ flex: "0 0 280px" }}>
              <div style={cardS}>
                <div style={{ fontSize: 18, fontWeight: 800, color: "#fff", marginBottom: 10 }}><span style={{ color: C.orange }}>5.</span> Compliance & Privacy</div>
                {!piiDone && <button style={btn(C.orange, false, { width: "100%" })} onClick={() => setTimeout(() => setPiiDone(true), 2000)}>🔍 Detect PII</button>}
                {piiDone && !deIdDone && <div><div style={{ fontSize: 13, color: C.green, fontWeight: 600, marginBottom: 4 }}>✓ {conf.piiLabel}</div><button style={btn(C.orange, false, { width: "100%" })} onClick={() => setDeIdDone(true)}>🎭 De-identify</button></div>}
                {deIdDone && !privacyOk && (
                  <div style={{ padding: 10, borderRadius: 8, background: "#1a1500", border: `2px solid ${C.amber}`, marginTop: 4 }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: C.amber, display: "flex", alignItems: "center", gap: 3, marginBottom: 4 }}><HT s={6}/> Privacy Officer</div>
                    <div style={{ fontSize: 12, color: C.txt, marginBottom: 6 }}>{conf.deIdLabel}</div>
                    <div style={{ display: "flex", gap: 5 }}>
                      <button style={btn(C.green, false, { padding: "5px 10px", fontSize: 13 })} onClick={() => setPrivacyOk(true)}>✓ Approve</button>
                      <button style={btn(C.red, true, { padding: "5px 10px", fontSize: 13 })} onClick={() => { setDeIdDone(false); setPiiDone(false); }}>✗ Revise</button>
                    </div>
                  </div>
                )}
                {privacyOk && <div style={{ marginTop: 8 }}><div style={{ fontSize: 13, color: C.green, fontWeight: 600, marginBottom: 6 }}>✓ Privacy Audit Passed</div><button style={btn(tc, false, { width: "100%" })} onClick={() => setStage(5)}>Annotate →</button></div>}
              </div>
            </div>
            <div style={{ flex: 1 }}>
              <div style={cardS}>
                <div style={{ fontSize: 14, fontWeight: 700, color: C.hi, marginBottom: 8 }}>De-identification Preview</div>
                {type === "warehouse" && <WH_Gen1 style={{ ...imgS }} showFaces={piiDone} facesOk={deIdDone} />}
                {type === "driving" && <FrameScrubber totalFrames={300} fps={10} showFaces={piiDone} facesOk={deIdDone} />}
                {type === "support" && (
                  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    {[{ b: 'Order number is FP-2847391. Name is Sarah Mitchell.', a: 'Order number is [ORDER_ID]. Name is [CUSTOMER_NAME].', e: ["ORDER_ID", "PERSON_NAME"] },
                      { b: 'Medical bill is $347.00. Email: sarah.m@gmail.com', a: 'Medical bill is [AMOUNT]. Email: [EMAIL_REDACTED]', e: ["FINANCIAL", "EMAIL"] }
                    ].map((ex, i) => (
                      <div key={i} style={{ padding: 10, borderRadius: 8, background: C.bg, border: `1px solid ${deIdDone ? C.green + "33" : C.bdr}` }}>
                        <div style={{ fontSize: 12, fontWeight: 700, color: C.red, marginBottom: 2 }}>BEFORE</div>
                        <div style={{ fontSize: 13, color: C.txt, fontFamily: "monospace", marginBottom: 4 }}>{ex.b}</div>
                        {piiDone && <><div style={{ fontSize: 12, fontWeight: 700, color: deIdDone ? C.green : C.amber, marginBottom: 2 }}>{deIdDone ? "AFTER (MASKED)" : "DETECTED"}</div>{deIdDone && <div style={{ fontSize: 13, color: C.green, fontFamily: "monospace", marginBottom: 4 }}>{ex.a}</div>}<div style={{ display: "flex", gap: 3 }}>{ex.e.map(e => <span key={e} style={{ padding: "1px 5px", borderRadius: 3, fontSize: 12, fontWeight: 700, background: (deIdDone ? C.green : C.red) + "18", color: deIdDone ? C.green : C.red }}>{e}</span>)}</div></>}
                      </div>
                    ))}
                  </div>
                )}
                <div style={{ fontSize: 12, color: C.txt, marginTop: 6 }}>{!piiDone ? "Run detection to identify PII" : !deIdDone ? "PII detected. Click de-identify." : "✓ All PII de-identified. Re-identification risk: 0.003"}</div>
              </div>
            </div>
          </div>
        )}

        {stage === 5 && (
          <div style={{ display: "flex", gap: 16 }}>
            <div style={{ flex: "0 0 300px" }}>
              <div style={cardS}>
                <div style={{ fontSize: 18, fontWeight: 800, color: "#fff", marginBottom: 10 }}><span style={{ color: C.green }}>6.</span> Annotate & Package</div>
                {!labelsOk && <div style={{ padding: 8, borderRadius: 6, background: C.amber + "10", border: `1px solid ${C.amber}33`, marginBottom: 8 }}><div style={{ fontSize: 12, fontWeight: 700, color: C.amber, display: "flex", alignItems: "center", gap: 3, marginBottom: 3 }}><HT s={6}/> Labelers & Data Librarians</div><button style={btn(C.green, false, { padding: "6px 12px", fontSize: 13 })} onClick={() => setLabelsOk(true)}>✓ Approve Annotations</button></div>}
                {labelsOk && !packed && <button style={btn(C.green, false, { width: "100%" })} onClick={() => setTimeout(() => setPacked(true), 1000)}>📦 Package</button>}
                {packed && (
                  <div>
                    <div style={{ fontSize: 16, color: C.green, fontWeight: 700, marginBottom: 6 }}>🎉 Complete!</div>
                    <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
                      <button style={btn(C.orange, false, { flex: 1, fontSize: 13 })} onClick={() => setShowReport(true)}>📋 Report</button>
                      <button style={btn(tc, true, { flex: 1, fontSize: 13 })} onClick={onBack}>New Journey</button>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div style={{ flex: 1 }}>
              {showReport ? <ComplianceReport type={type} onClose={() => setShowReport(false)} /> : (
                <div style={cardS}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: C.hi, marginBottom: 8 }}>Annotated Output</div>
                  {type === "warehouse" && <WH_Gen1 style={{ ...imgS, marginBottom: 8 }} showBoxes={true} facesOk={true} />}
                  {type === "driving" && <FrameScrubber totalFrames={300} fps={10} />}
                  {type === "support" && <div style={{ padding: 10, borderRadius: 8, background: C.bg, border: `1px solid ${C.bdr}`, maxHeight: 200, overflow: "auto", marginBottom: 8 }}>{GEN_CHAT.map((t, i) => <ChatBubble key={i} turn={t} labels={true} />)}</div>}
                  <div style={{ fontSize: 13, fontWeight: 700, color: C.hi, marginBottom: 4 }}>Provenance</div>
                  <div style={{ padding: 8, borderRadius: 6, background: C.bg, border: `1px solid ${C.bdr}` }}>
                    {[{ k: "Source", v: "TP.ai SDG Pipeline v2.0" }, { k: "Model", v: type === "support" ? "Gemini 2.0 Flash" : type === "driving" ? "NVIDIA Cosmos" : "FLUX.1 + ControlNet" }, { k: "PII", v: "Fully de-identified" }, { k: "ToS Snapshot", v: new Date().toISOString().split("T")[0] }, { k: "Quality", v: "0.94 (mean)" }].map((m, i) => (
                      <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "2px 0", borderBottom: i < 4 ? `1px solid ${C.bdr}` : "none" }}>
                        <span style={{ fontSize: 12, color: C.txt }}>{m.k}</span><span style={{ fontSize: 12, color: C.green, fontWeight: 600 }}>{m.v}</span>
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

// ===== TAB BAR =====
function TabBar({ activeTab, setActiveTab }) {
  const TABS = ["Synthetic Data Generation", "Human Data Generation", "Human Data Collection"];
  return (
    <div style={{ background: "hsl(0,0%,6%)", borderBottom: `1px solid ${C.bdr}` }}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        {TABS.map((label, i) => (
          <button key={i} onClick={() => setActiveTab(i)} style={{
            background: "none", border: "none", borderBottom: `2px solid ${activeTab === i ? C.accent : "transparent"}`,
            color: activeTab === i ? "#fff" : C.txt,
            cursor: "pointer", fontSize: 15, fontWeight: activeTab === i ? 700 : 500,
            fontFamily: "'TP Sans', 'DM Sans', sans-serif",
            padding: "14px 32px", letterSpacing: "0.01em", whiteSpace: "nowrap",
            transition: "color .15s, border-color .15s",
          }}>
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}

// ===== DEMO NAV (shared) =====
function DemoNav({ stage, stageLabels, stageColors, maxStage, advance, label }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 3, marginBottom: 16 }}>
      {stageLabels.map((l, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center" }}>
          <div onClick={() => i <= maxStage && advance(i)} title={l} style={{ width: 34, height: 34, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, fontWeight: 700, cursor: i <= maxStage ? "pointer" : "default", background: stage === i ? stageColors[i] + "22" : i < stage ? C.green + "18" : C.card, border: `2px solid ${stage === i ? stageColors[i] : i < stage ? C.green : C.bdr}`, color: stage === i ? "#fff" : i < stage ? C.green : C.txt }}>
            {i < stage ? "✓" : i + 1}
          </div>
          {i < stageLabels.length - 1 && <div style={{ width: 8, height: 2, background: i < stage ? C.green + "44" : C.bdr }} />}
        </div>
      ))}
      <span style={{ marginLeft: 8, fontSize: 20, color: C.txt, fontWeight: 700, letterSpacing: "0.08em" }}>{label}</span>
    </div>
  );
}

// ===== CHIP SELECTOR (shared) =====
function ChipGroup({ label, options, value, onChange, color }) {
  return (
    <div style={{ marginBottom: 10 }}>
      <div style={{ fontSize: 20, fontWeight: 700, color: C.hi, marginBottom: 5 }}>{label}</div>
      <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
        {options.map(o => (
          <button key={o} onClick={() => onChange(o)} style={{ padding: "4px 10px", borderRadius: 6, fontSize: 20, fontWeight: 600, border: `1px solid ${value === o ? color : C.bdr}`, background: value === o ? color + "20" : C.bg, color: value === o ? color : C.txt, cursor: "pointer", fontFamily: "'TP Sans','DM Sans',sans-serif" }}>{o}</button>
        ))}
      </div>
    </div>
  );
}

// ===== HDG: AUTHORED CONTENT =====
const HDG_AUTHORED = {
  "Customer Support": [
    { role: "customer", text: "I placed an order three days ago and it still hasn't shipped. I need this for tomorrow.", sentiment: "frustrated", intent: "shipping_inquiry" },
    { role: "agent", text: "I completely understand. Let me pull up your order right now.", sentiment: "empathetic", intent: "acknowledge" },
    { role: "customer", text: "Order #FP-4872. I already paid for standard delivery.", sentiment: "urgent", intent: "provide_info" },
    { role: "agent", text: "I see it — there was a carrier pickup delay. I'm escalating to priority shipping now.", sentiment: "proactive", intent: "resolve" },
    { role: "customer", text: "Will it actually arrive tomorrow? I've heard this before.", sentiment: "skeptical", intent: "confirm" },
    { role: "agent", text: "90% confidence with overnight courier. I'm also crediting 20% for the delay.", sentiment: "reassuring", intent: "offer_resolution" },
  ],
  "Healthcare Intake": [
    { role: "customer", text: "I've had chest pressure since this morning — it radiates to my left arm.", sentiment: "worried", intent: "symptom_report" },
    { role: "agent", text: "How long does each episode last? Does it happen at rest or only during activity?", sentiment: "clinical", intent: "assess" },
    { role: "customer", text: "About 10 minutes each time. It happened once just sitting still.", sentiment: "concerned", intent: "provide_info" },
    { role: "agent", text: "Left-arm radiation combined with rest-onset pressure requires immediate evaluation. Go to urgent care now.", sentiment: "urgent", intent: "escalate" },
    { role: "customer", text: "Is it that serious? I thought I'd just wait and see.", sentiment: "hesitant", intent: "clarify" },
    { role: "agent", text: "Yes. Please don't drive yourself. Call someone now or dial emergency services.", sentiment: "firm", intent: "confirm" },
  ],
  "Legal Q&A": [
    { role: "customer", text: "A vendor took $120k upfront and delivered nothing. I have 40 emails proving it.", sentiment: "frustrated", intent: "complaint" },
    { role: "agent", text: "Has the contract's dispute resolution clause been triggered in writing?", sentiment: "clinical", intent: "clarify" },
    { role: "customer", text: "Yes — three certified letters sent over six months.", sentiment: "certain", intent: "confirm" },
    { role: "agent", text: "That's clear material breach. You can pursue full recovery plus consequential damages.", sentiment: "confident", intent: "advise" },
    { role: "customer", text: "Can they countersue me for anything?", sentiment: "anxious", intent: "risk_inquiry" },
    { role: "agent", text: "Given your documentation, countersue risk is minimal. We file next week.", sentiment: "reassuring", intent: "close" },
  ],
  "Technical Support": [
    { role: "customer", text: "My API integration keeps returning 401 on POST requests only, using the correct key.", sentiment: "confused", intent: "bug_report" },
    { role: "agent", text: "Is Content-Type set to application/json on those POST requests?", sentiment: "focused", intent: "diagnose" },
    { role: "customer", text: "No — I was using text/plain. Could that affect authentication?", sentiment: "curious", intent: "clarify" },
    { role: "agent", text: "Yes. Some middleware rejects mismatched headers before auth runs. Switch to application/json.", sentiment: "helpful", intent: "resolve" },
    { role: "customer", text: "That fixed it immediately. That's a terrible design choice.", sentiment: "relieved", intent: "feedback" },
    { role: "agent", text: "Agreed. I'll add it to the known issues doc. Thanks for the clean repro case.", sentiment: "collegial", intent: "close" },
  ],
};
const HDG_FLAGS = ["Off-policy", "Factual error", "Too short", "Unsafe content", "Unnatural phrasing"];
const HDG_INTENT_TAGS = ["billing_dispute", "escalation", "de_escalation", "refund_request", "technical_issue", "clarification", "resolution"];
const HDG_SENT_TAGS = ["frustrated", "empathetic", "urgent", "neutral", "relieved", "adversarial"];
const HDG_DIFF_TAGS = ["baseline", "moderate", "edge_case", "adversarial"];

// ===== HUMAN DATA GENERATION DEMO (CHAT CONVERSATIONS) =====
function ChatHDGDemo({ onBack }) {
  const [stage, setStage] = useState(0);
  const [maxStage, setMaxStage] = useState(0);
  const [domain, setDomain] = useState("Customer Support");
  const [persona, setPersona] = useState("Frustrated User");
  const [difficulty, setDifficulty] = useState("Moderate");
  const [authoring, setAuthoring] = useState(false);
  const [authorProg, setAuthorProg] = useState(0);
  const [authorDone, setAuthorDone] = useState(false);
  const [ratings, setRatings] = useState({});
  const [flags, setFlags] = useState({});
  const [qaApproved, setQaApproved] = useState(null);
  const [appliedIntent, setAppliedIntent] = useState([]);
  const [appliedSentiment, setAppliedSentiment] = useState([]);
  const [appliedDiff, setAppliedDiff] = useState("");
  const [labelsDone, setLabelsDone] = useState(false);
  const [packed, setPacked] = useState(false);

  const advance = (n) => { setStage(n); setMaxStage(m => Math.max(m, n)); };
  const runAuthor = () => {
    setAuthoring(true); setAuthorProg(0);
    const st = Date.now();
    const t = () => { const p = Math.min(100, ((Date.now() - st) / 2500) * 100); setAuthorProg(p); if (p < 100) requestAnimationFrame(t); else { setAuthoring(false); setAuthorDone(true); } };
    requestAnimationFrame(t);
  };
  const reset = () => { setStage(0); setMaxStage(0); setAuthorDone(false); setAuthorProg(0); setAuthoring(false); setRatings({}); setFlags({}); setQaApproved(null); setAppliedIntent([]); setAppliedSentiment([]); setAppliedDiff(""); setLabelsDone(false); setPacked(false); };

  const chat = HDG_AUTHORED[domain] || HDG_AUTHORED["Customer Support"];
  const avgRating = Object.keys(ratings).length ? (Object.values(ratings).reduce((a, b) => a + b, 0) / Object.values(ratings).length).toFixed(1) : null;
  const flagCount = Object.values(flags).filter(Boolean).length;
  const STAGE_C = [C.accent, "#8B5CF6", C.amber, C.cyan, C.green];
  const STAGE_L = ["Brief", "Author", "QA", "Label", "Package"];
  const tc = C.accent;

  return (
    <div style={{ background: C.bg, color: C.txt, fontFamily: "'TP Sans','DM Sans',sans-serif", minHeight: "calc(100vh - 112px)", padding: "10px 24px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10, borderBottom: `1px solid ${C.bdr}`, paddingBottom: 8 }}>
        <button style={btn(C.txt, true, { padding: "4px 10px", fontSize: 13 })} onClick={onBack}>← Use Cases</button>
        <span style={{ fontSize: 12, fontWeight: 700, color: C.txt, letterSpacing: "0.1em", textTransform: "uppercase" }}>Conversation Data Generation</span>
      </div>
      <DemoNav stage={stage} stageLabels={STAGE_L} stageColors={STAGE_C} maxStage={maxStage} advance={advance} label="" />

      {/* STAGE 0: BRIEF */}
      {stage === 0 && (
        <div style={{ display: "flex", gap: 16 }}>
          <div style={{ flex: "0 0 320px" }}>
            <div style={cardS}>
              <div style={{ fontSize: 36, fontWeight: 800, color: "#fff", marginBottom: 12 }}><span style={{ color: C.accent }}>1.</span> Task Brief</div>
              <ChipGroup label="Domain" options={["Customer Support","Healthcare Intake","Legal Q&A","Technical Support"]} value={domain} onChange={setDomain} color={C.accent} />
              <ChipGroup label="Persona" options={["Frustrated User","Expert Professional","Confused Novice","Adversarial Actor"]} value={persona} onChange={setPersona} color={C.accent} />
              <ChipGroup label="Difficulty" options={["Baseline","Moderate","Edge Case","Adversarial"]} value={difficulty} onChange={setDifficulty} color={C.accent} />
              <button style={btn(C.accent, false, { width: "100%", marginTop: 8 })} onClick={() => advance(1)}>Commission Task →</button>
            </div>
          </div>
          <div style={{ flex: 1 }}>
            <div style={cardS}>
              <div style={{ fontSize: 22, fontWeight: 700, color: C.hi, marginBottom: 10 }}>Task Brief Preview</div>
              <div style={{ padding: 14, borderRadius: 8, background: C.bg, border: `1px solid ${C.bdr}`, fontFamily: "monospace", fontSize: 20, color: C.txt, lineHeight: 2 }}>
                <div style={{ color: C.accent, fontWeight: 700, marginBottom: 4 }}>TASK-{Date.now().toString(36).toUpperCase().slice(-6)}</div>
                {[["Domain", domain], ["Persona", persona], ["Difficulty", difficulty], ["Target turns", difficulty === "Baseline" ? "4–6" : difficulty === "Moderate" ? "6–8" : "8–12"], ["Language", "English (en-US)"], ["Format", "Chat conversation"]].map(([k, v]) => (
                  <div key={k}><strong style={{ color: C.hi }}>{k}:</strong> {v}<br/></div>
                ))}
                <div style={{ marginTop: 6 }}><strong style={{ color: C.hi }}>Status:</strong> <span style={{ color: C.amber }}>⏳ Pending assignment</span></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* STAGE 1: AUTHOR */}
      {stage === 1 && (
        <div style={{ display: "flex", gap: 16 }}>
          <div style={{ flex: "0 0 280px" }}>
            <div style={cardS}>
              <div style={{ fontSize: 36, fontWeight: 800, color: "#fff", marginBottom: 10 }}><span style={{ color: "#8B5CF6" }}>2.</span> Authoring</div>
              <div style={{ fontSize: 20, color: C.txt, marginBottom: 10 }}>Contributor receives the brief and writes the conversation.</div>
              {!authoring && !authorDone && <button style={btn("#8B5CF6", false, { width: "100%" })} onClick={runAuthor}>✍️ Simulate Authoring</button>}
              {authoring && <div><div style={{ fontSize: 20, color: "#8B5CF6", fontWeight: 600, marginBottom: 6 }}>Contributor writing...</div><div style={{ height: 5, borderRadius: 3, background: C.bdr, overflow: "hidden", marginBottom: 4 }}><div style={{ height: "100%", width: `${authorProg}%`, background: "#8B5CF6", transition: "width .05s" }} /></div><div style={{ fontSize: 18, color: C.txt }}>{Math.round(authorProg)}%</div></div>}
              {authorDone && <div><div style={{ fontSize: 22, color: C.green, fontWeight: 600, marginBottom: 6 }}>✓ Submission received</div><div style={{ padding: 8, borderRadius: 6, background: C.green + "10", border: `1px solid ${C.green}22`, fontSize: 18, color: C.green, marginBottom: 10 }}>Contributor CTR-4471 · {chat.length} turns · 0m ago</div><button style={btn(C.accent, false, { width: "100%" })} onClick={() => advance(2)}>Send to QA →</button></div>}
            </div>
          </div>
          <div style={{ flex: 1 }}>
            <div style={cardS}>
              <div style={{ fontSize: 22, fontWeight: 700, color: C.hi, marginBottom: 8 }}>Authored Output — {domain}</div>
              <div style={{ opacity: authorDone ? 1 : authoring ? 0.2 : 0.06, transition: "opacity .8s", padding: 10, borderRadius: 8, background: C.bg, border: `1px solid ${C.bdr}` }}>
                {chat.map((t, i) => <ChatBubble key={i} turn={t} labels={false} />)}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* STAGE 2: QA */}
      {stage === 2 && (
        <div style={{ display: "flex", gap: 16 }}>
          <div style={{ flex: "0 0 280px" }}>
            <div style={cardS}>
              <div style={{ fontSize: 36, fontWeight: 800, color: "#fff", marginBottom: 8 }}><span style={{ color: C.amber }}>3.</span> QA Review</div>
              <div style={{ fontSize: 20, fontWeight: 700, color: C.hi, marginBottom: 6 }}>Quality Flags</div>
              {HDG_FLAGS.map(f => (
                <label key={f} style={{ display: "flex", alignItems: "center", gap: 6, padding: "5px 6px", borderRadius: 5, marginBottom: 3, background: flags[f] ? C.red + "10" : C.bg, border: `1px solid ${flags[f] ? C.red + "44" : C.bdr}`, cursor: "pointer" }}>
                  <input type="checkbox" checked={!!flags[f]} onChange={e => setFlags(p => ({ ...p, [f]: e.target.checked }))} style={{ accentColor: C.red }} />
                  <span style={{ fontSize: 20, color: C.hi }}>{f}</span>
                </label>
              ))}
              <div style={{ marginTop: 10 }}>
                {flagCount > 0 && <div style={{ fontSize: 18, color: C.red, marginBottom: 6 }}>⚠ {flagCount} flag(s) — resolve before approving</div>}
                {avgRating && flagCount === 0 && !qaApproved && (
                  <div style={{ display: "flex", gap: 5 }}>
                    <button style={btn(C.green, false, { flex: 1, padding: "6px 10px", fontSize: 20 })} onClick={() => setQaApproved(true)}>✓ Approve</button>
                    <button style={btn(C.red, true, { flex: 1, padding: "6px 10px", fontSize: 20 })} onClick={() => { setStage(1); setAuthorDone(false); setAuthorProg(0); setRatings({}); setFlags({}); }}>✗ Reject</button>
                  </div>
                )}
                {!avgRating && !flagCount && <div style={{ fontSize: 18, color: C.txt }}>Rate all turns to enable approval</div>}
                {qaApproved && <div><div style={{ fontSize: 22, color: C.green, fontWeight: 600, marginBottom: 6 }}>✓ QA Passed · Avg {avgRating}/5.0</div><button style={btn(C.cyan, false, { width: "100%" })} onClick={() => advance(3)}>Label →</button></div>}
              </div>
            </div>
          </div>
          <div style={{ flex: 1 }}>
            <div style={cardS}>
              <div style={{ fontSize: 22, fontWeight: 700, color: C.hi, marginBottom: 8 }}>Rate Each Turn</div>
              {chat.map((turn, i) => (
                <div key={i} style={{ padding: 10, borderRadius: 8, background: C.bg, border: `1px solid ${ratings[i] ? C.bdr : C.bdr}`, marginBottom: 6 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                    <span style={{ fontSize: 18, fontWeight: 700, color: turn.role === "customer" ? C.red : C.green }}>{turn.role === "customer" ? "👤 User" : "🎧 Agent"} · Turn {i + 1}</span>
                    <div style={{ display: "flex", gap: 2 }}>{[1,2,3,4,5].map(s => <span key={s} onClick={() => setRatings(r => ({ ...r, [i]: s }))} style={{ fontSize: 28, cursor: "pointer", filter: (ratings[i]||0) >= s ? "none" : "grayscale(1) opacity(0.18)" }}>⭐</span>)}</div>
                  </div>
                  <div style={{ fontSize: 20, color: C.hi, lineHeight: 1.4 }}>{turn.text}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* STAGE 3: LABEL */}
      {stage === 3 && (
        <div style={{ display: "flex", gap: 16 }}>
          <div style={{ flex: "0 0 300px" }}>
            <div style={cardS}>
              <div style={{ fontSize: 36, fontWeight: 800, color: "#fff", marginBottom: 10 }}><span style={{ color: C.cyan }}>4.</span> Metadata Labels</div>
              <div style={{ marginBottom: 10 }}>
                <div style={{ fontSize: 20, fontWeight: 700, color: C.hi, marginBottom: 5 }}>Intent Tags</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                  {HDG_INTENT_TAGS.map(t => <button key={t} onClick={() => setAppliedIntent(a => a.includes(t) ? a.filter(x => x !== t) : [...a, t])} style={{ padding: "3px 8px", borderRadius: 4, fontSize: 18, fontWeight: 600, border: `1px solid ${appliedIntent.includes(t) ? C.accent : C.bdr}`, background: appliedIntent.includes(t) ? C.accent + "20" : C.bg, color: appliedIntent.includes(t) ? C.accent : C.txt, cursor: "pointer", fontFamily: "'TP Sans','DM Sans',sans-serif" }}>{t}</button>)}
                </div>
              </div>
              <div style={{ marginBottom: 10 }}>
                <div style={{ fontSize: 20, fontWeight: 700, color: C.hi, marginBottom: 5 }}>Sentiment Tags</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                  {HDG_SENT_TAGS.map(t => <button key={t} onClick={() => setAppliedSentiment(a => a.includes(t) ? a.filter(x => x !== t) : [...a, t])} style={{ padding: "3px 8px", borderRadius: 4, fontSize: 18, fontWeight: 600, border: `1px solid ${appliedSentiment.includes(t) ? C.cyan : C.bdr}`, background: appliedSentiment.includes(t) ? C.cyan + "20" : C.bg, color: appliedSentiment.includes(t) ? C.cyan : C.txt, cursor: "pointer", fontFamily: "'TP Sans','DM Sans',sans-serif" }}>{t}</button>)}
                </div>
              </div>
              <div style={{ marginBottom: 12 }}>
                <div style={{ fontSize: 20, fontWeight: 700, color: C.hi, marginBottom: 5 }}>Difficulty</div>
                <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                  {HDG_DIFF_TAGS.map(t => <button key={t} onClick={() => setAppliedDiff(t)} style={{ padding: "3px 8px", borderRadius: 4, fontSize: 18, fontWeight: 600, border: `1px solid ${appliedDiff === t ? C.amber : C.bdr}`, background: appliedDiff === t ? C.amber + "20" : C.bg, color: appliedDiff === t ? C.amber : C.txt, cursor: "pointer", fontFamily: "'TP Sans','DM Sans',sans-serif" }}>{t}</button>)}
                </div>
              </div>
              {appliedIntent.length > 0 && appliedDiff && !labelsDone && <button style={btn(C.cyan, false, { width: "100%" })} onClick={() => setLabelsDone(true)}>✓ Confirm Labels</button>}
              {labelsDone && <div><div style={{ fontSize: 22, color: C.green, fontWeight: 600, marginBottom: 6 }}>✓ Labels confirmed</div><button style={btn(C.green, false, { width: "100%" })} onClick={() => advance(4)}>Package →</button></div>}
            </div>
          </div>
          <div style={{ flex: 1 }}>
            <div style={cardS}>
              <div style={{ fontSize: 22, fontWeight: 700, color: C.hi, marginBottom: 8 }}>Annotated Record Preview</div>
              <div style={{ maxHeight: 360, overflow: "auto" }}>
                {chat.map((turn, i) => (
                  <div key={i} style={{ padding: 8, borderRadius: 6, background: C.bg, border: `1px solid ${C.bdr}`, marginBottom: 5 }}>
                    <div style={{ display: "flex", gap: 4, flexWrap: "wrap", marginBottom: 4 }}>
                      <span style={{ padding: "1px 5px", borderRadius: 3, fontSize: 14, fontWeight: 700, background: (turn.role === "customer" ? C.red : C.green) + "20", color: turn.role === "customer" ? C.red : C.green }}>{turn.role}</span>
                      <span style={{ padding: "1px 5px", borderRadius: 3, fontSize: 14, background: C.accent + "18", color: C.accent }}>{turn.sentiment}</span>
                      {appliedIntent[0] && <span style={{ padding: "1px 5px", borderRadius: 3, fontSize: 14, background: C.cyan + "18", color: C.cyan }}>{appliedIntent[0]}</span>}
                      {appliedDiff && <span style={{ padding: "1px 5px", borderRadius: 3, fontSize: 14, background: C.amber + "18", color: C.amber }}>{appliedDiff}</span>}
                    </div>
                    <div style={{ fontSize: 20, color: C.hi, lineHeight: 1.4 }}>{turn.text}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* STAGE 4: PACKAGE */}
      {stage === 4 && (
        <div style={{ display: "flex", gap: 16 }}>
          <div style={{ flex: "0 0 300px" }}>
            <div style={cardS}>
              <div style={{ fontSize: 36, fontWeight: 800, color: "#fff", marginBottom: 10 }}><span style={{ color: C.green }}>5.</span> Package & Deliver</div>
              {!packed && <button style={btn(C.green, false, { width: "100%" })} onClick={() => setTimeout(() => setPacked(true), 1000)}>📦 Package Record</button>}
              {packed && <div><div style={{ fontSize: 24, color: C.green, fontWeight: 700, marginBottom: 10 }}>🎉 Delivered to corpus</div><button style={btn(C.accent, true, { width: "100%", fontSize: 20 })} onClick={reset}>New Task</button></div>}
            </div>
          </div>
          <div style={{ flex: 1 }}>
            <div style={cardS}>
              <div style={{ fontSize: 22, fontWeight: 700, color: C.hi, marginBottom: 8 }}>Provenance Record</div>
              <div style={{ padding: 14, borderRadius: 8, background: C.bg, border: `1px solid ${C.bdr}`, fontFamily: "monospace", fontSize: 20, color: C.txt, lineHeight: 2 }}>
                <div style={{ color: C.green, fontWeight: 700, fontSize: 18, letterSpacing: 1, marginBottom: 6 }}>HDG-{Date.now().toString(36).toUpperCase().slice(-10)}</div>
                {[["Domain", domain], ["Persona", persona], ["Difficulty", appliedDiff || difficulty], ["Contributor", "CTR-4471 (anonymized)"], ["Submitted", new Date().toISOString()], ["QA Score", avgRating + " / 5.0 ✓"], ["Turns", chat.length], ["Intent Tags", appliedIntent.join(", ") || "—"], ["Sentiment Tags", appliedSentiment.join(", ") || "—"], ["Format", "JSONL · UTF-8"], ["Pipeline", "TP.ai HDG v1.0"], ["Status", packed ? "✓ Delivered" : "⏳ Pending"]].map(([k, v], i) => (
                  <div key={k}><strong style={{ color: C.hi }}>{k}:</strong> <span style={{ color: k === "Status" ? (packed ? C.green : C.amber) : k === "QA Score" ? C.green : "inherit" }}>{v}</span><br/></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ===== PODCAST HDG — DATA =====
const PODCAST_LOCALES = [
  { key: "mandarin",   label: "Mandarin",  flag: "🇨🇳", region: "China" },
  { key: "japanese",   label: "Japanese",  flag: "🇯🇵", region: "Japan" },
  { key: "english-ea", label: "English",   flag: "🌍", region: "Kenya · Nigeria · S. Africa · Uganda" },
  { key: "hindi",      label: "Hindi",     flag: "🇮🇳", region: "India" },
];
const PODCAST_TOPICS = ["Travel","Nature","Science","History","Philosophy","Culture"];
const PODCAST_TRANSCRIPTS = {
  Travel: [
    { spk:"A", ts:"00:00:04", text:"Welcome to today's conversation. We're exploring the coastlines of East Africa — a region that often gets overlooked on the travel circuit." },
    { spk:"B", ts:"00:00:13", text:"Absolutely. What draws people once they discover it is that combination of ancient Swahili architecture and those incredible white-sand beaches." },
    { spk:"A", ts:"00:00:24", text:"And the food scene has exploded. The influence of Indian spices in coastal Kenyan cuisine is something visitors rarely expect." },
    { spk:"B", ts:"00:00:34", text:"Mombasa's old town alone could keep you busy for a week. The Fort Jesus ruins, the narrow streets — it's a living museum." },
    { spk:"A", ts:"00:00:44", text:"If you had to pick one underrated destination in the region, what would it be?" },
    { spk:"B", ts:"00:00:51", text:"Lamu Island. No cars, donkeys on cobblestone streets, and arguably the best seafood I have ever had." },
  ],
  Nature: [
    { spk:"A", ts:"00:00:03", text:"Today we're looking at coral reef ecosystems and why their recovery is both more fragile and more hopeful than most people realise." },
    { spk:"B", ts:"00:00:13", text:"The fragility is well-documented. But there are reefs in the Indian Ocean recovering faster than models predicted." },
    { spk:"A", ts:"00:00:24", text:"What's driving that? Is it reduced human activity or something more biological?" },
    { spk:"B", ts:"00:00:30", text:"Mostly biological. Certain coral species have shown thermal tolerance that simply was not there twenty years ago." },
    { spk:"A", ts:"00:00:40", text:"Which raises the question of whether selective breeding of heat-resistant corals could accelerate recovery at scale." },
    { spk:"B", ts:"00:00:50", text:"That's the heart of the assisted evolution debate — genuinely controversial in marine biology circles." },
  ],
  Science: [
    { spk:"A", ts:"00:00:05", text:"The paper that caught my attention this week was on protein folding using diffusion models — a different paradigm from AlphaFold entirely." },
    { spk:"B", ts:"00:00:16", text:"AlphaFold was essentially a structure prediction engine. Diffusion approaches treat the folding pathway as a generative process." },
    { spk:"A", ts:"00:00:26", text:"Which opens the door to modelling not just the final structure but the intermediate states — where most drug-target interactions happen." },
    { spk:"B", ts:"00:00:36", text:"Exactly. And that's the pharmacological holy grail. Understanding conformational change mid-fold." },
    { spk:"A", ts:"00:00:44", text:"The compute requirements are still prohibitive for most labs though. This is a resource inequality problem as much as a scientific one." },
    { spk:"B", ts:"00:00:54", text:"Agreed. Unless cloud access democratises it, these tools stay concentrated in well-funded institutions." },
  ],
  History: [
    { spk:"A", ts:"00:00:04", text:"We often think of the Silk Road as a trade route for goods, but it was arguably more important as a conduit for ideas." },
    { spk:"B", ts:"00:00:13", text:"Papermaking, printing, the spread of Buddhism, even early epidemics — all travelled that corridor." },
    { spk:"A", ts:"00:00:22", text:"What's less appreciated is how many of those exchanges happened not at endpoints but at the oasis cities in between. Samarkand. Dunhuang." },
    { spk:"B", ts:"00:00:32", text:"Those were the real nodes of the network. Cosmopolitan places where merchants, monks, and diplomats shared the same caravanserai." },
    { spk:"A", ts:"00:00:42", text:"The Dunhuang caves alone contain texts in seventeen languages. That's not trade — that's civilisation cross-pollinating." },
    { spk:"B", ts:"00:00:52", text:"And much of that content was only rediscovered in the early twentieth century. We're still processing what was lost and found there." },
  ],
  Philosophy: [
    { spk:"A", ts:"00:00:06", text:"I want to revisit the problem of free will through the lens of compatibilism, because I think it gets unfairly dismissed." },
    { spk:"B", ts:"00:00:15", text:"The hard determinist critique is compelling — if every neural event is caused by prior states, in what sense is anything chosen?" },
    { spk:"A", ts:"00:00:25", text:"But compatibilists aren't denying causation. They redefine freedom as acting according to your own reasons rather than external coercion." },
    { spk:"B", ts:"00:00:35", text:"Which is a semantic move some find satisfying and others find evasive. Does that redefinition preserve moral responsibility?" },
    { spk:"A", ts:"00:00:46", text:"I think it does. Holding someone responsible doesn't require uncaused cause — it requires that their deliberation be part of the causal chain." },
    { spk:"B", ts:"00:00:57", text:"That's where I partially land too. But I still worry about what it means for punishment in a deterministic universe." },
  ],
  Culture: [
    { spk:"A", ts:"00:00:05", text:"The resurgence of traditional weaving in the Andes isn't just a craft revival — it's a language preservation movement." },
    { spk:"B", ts:"00:00:14", text:"Because the patterns encode meaning. Specific communities, lineages, cosmologies — it's textile as text." },
    { spk:"A", ts:"00:00:23", text:"And what's remarkable is that younger weavers aren't treating it as museum-worthy. They're innovating within the tradition." },
    { spk:"B", ts:"00:00:33", text:"Which is exactly how living cultures work. Any tradition treated as frozen has already stopped being one." },
    { spk:"A", ts:"00:00:43", text:"The market forces are complicated though. Global demand creates pressure to standardise designs that were locally specific." },
    { spk:"B", ts:"00:00:53", text:"That tension between authenticity and accessibility is the central challenge for every indigenous craft tradition entering the global economy." },
  ],
};

// ===== PODCAST HDG DEMO =====
function PodcastHDGDemo({ onBack }) {
  const [stage, setStage] = useState(0);
  const [maxStage, setMaxStage] = useState(0);
  const [selectedLocales, setSelectedLocales] = useState(["english-ea"]);
  const [selectedTopic, setSelectedTopic] = useState("Travel");
  const [numSpeakers, setNumSpeakers] = useState(2);
  const [recFormat, setRecFormat] = useState("Dual-channel");
  const [generating, setGenerating] = useState(false);
  const [genProg, setGenProg] = useState(0);
  const [genDone, setGenDone] = useState(false);
  const [activeSpeaker, setActiveSpeaker] = useState(0);
  const [transcriptEdits, setTranscriptEdits] = useState({});
  const [speakerEdits, setSpeakerEdits] = useState({});
  const [editingWord, setEditingWord] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [accuracy, setAccuracy] = useState(85);
  const [qaChecks, setQaChecks] = useState({ clarity: null, uniqueness: null, balance: null, confidence: null });
  const [published, setPublished] = useState(false);
  const generatingRef = useRef(false);
  const localeIdxRef  = useRef(0);    // which locale is currently being spoken

  const advance = n => { setStage(n); setMaxStage(m => Math.max(m, n)); };
  const STAGE_C = ["#F97316", "#8B5CF6", C.cyan, C.amber, C.green];
  const STAGE_L = ["Design", "Generate", "Transcribe", "QA", "Publish"];
  const SPEAKER_COLORS = ["#7C3AED","#06B6D4","#F97316","#10B981"];
  const SPK_LABELS = numSpeakers === 1 ? ["Host"] : ["Host","Guest"];
  const WAVE_ANIMS = ["audioBar1","audioBar2","audioBar3","audioBar4","audioBar2","audioBar1","audioBar3","audioBar4","audioBar2","audioBar1","audioBar3","audioBar4"];

  const transcript = PODCAST_TRANSCRIPTS[selectedTopic] || PODCAST_TRANSCRIPTS.Travel;
  const activeTranscript = numSpeakers === 1 ? transcript.filter(l => l.spk === "A") : transcript;

  // Cancel speech when component unmounts
  useEffect(() => () => { window.speechSynthesis && window.speechSynthesis.cancel(); }, []);

  useEffect(() => {
    const edits = Object.keys(transcriptEdits).length + Object.keys(speakerEdits).length;
    setAccuracy(Math.min(99, 85 + edits * 3.5));
  }, [transcriptEdits, speakerEdits]);

  const runGenerate = () => {
    generatingRef.current = true;
    setGenerating(true); setGenProg(0); setActiveSpeaker(0);
    window.speechSynthesis.cancel();

    const lines = numSpeakers === 1
      ? (PODCAST_TRANSCRIPTS[selectedTopic] || PODCAST_TRANSCRIPTS.Travel).filter(l => l.spk === "A")
      : (PODCAST_TRANSCRIPTS[selectedTopic] || PODCAST_TRANSCRIPTS.Travel);

    // Map each locale to a BCP-47 language tag so the browser picks the right voice
    const LOCALE_LANG = {
      "mandarin":   "zh-CN",
      "japanese":   "ja-JP",
      "english-ea": "en-GB",
      "hindi":      "hi-IN",
    };

    // Pick the best two voices for a locale: prefer Google/Premium/Neural, then lang match, then any en
    const getVoicesForLocale = (localeKey) => {
      const all = window.speechSynthesis.getVoices();
      const lang = LOCALE_LANG[localeKey] || "en-US";
      const prefix = lang.split("-")[0];
      // Score: neural/Google voices score highest
      const scored = all
        .filter(v => v.lang.startsWith(prefix))
        .map(v => ({ v, score: (v.name.includes("Google") ? 4 : 0) + (v.name.includes("Premium") ? 3 : 0) + (v.name.includes("Neural") ? 2 : 0) + (v.lang === lang ? 1 : 0) }))
        .sort((a, b) => b.score - a.score)
        .map(x => x.v);
      // Fall back to English if no locale voices exist
      const pool = scored.length >= 2 ? scored : all.filter(v => v.lang.startsWith("en")).sort((a, b) =>
        ((b.name.includes("Google")?4:0)+(b.name.includes("Premium")?3:0)) -
        ((a.name.includes("Google")?4:0)+(a.name.includes("Premium")?3:0))
      );
      return [pool[0] || null, pool[Math.min(1, pool.length - 1)] || null];
    };

    const localeCount = selectedLocales.length;
    localeIdxRef.current = 0;

    // Play through every selected locale in sequence — each gets the full transcript
    const playLocale = (localeIdx) => {
      if (!generatingRef.current) return;
      localeIdxRef.current = localeIdx;
      if (localeIdx >= localeCount) {
        // All locales done
        generatingRef.current = false;
        setGenerating(false); setGenDone(true); setGenProg(100);
        return;
      }
      const localeKey = selectedLocales[localeIdx];
      const lang = LOCALE_LANG[localeKey] || "en-US";
      const [voiceA, voiceB] = getVoicesForLocale(localeKey);

      const speakLine = (lineIdx) => {
        if (!generatingRef.current) return;
        if (lineIdx >= lines.length) {
          // Locale done — brief pause then next locale
          setTimeout(() => playLocale(localeIdx + 1), 700);
          return;
        }
        const line = lines[lineIdx];
        const utt = new SpeechSynthesisUtterance(line.text);
        utt.lang   = lang;
        utt.voice  = line.spk === "A" ? voiceA : voiceB;
        // Subtle, natural-sounding differences between speakers
        utt.pitch  = line.spk === "A" ? 1.05 : 0.92;
        utt.rate   = line.spk === "A" ? 0.88 : 0.93;
        utt.volume = 1.0;
        setActiveSpeaker(line.spk === "A" ? 0 : 1);
        utt.onend  = () => setTimeout(() => speakLine(lineIdx + 1), 320);
        utt.onerror = () => setTimeout(() => speakLine(lineIdx + 1), 100);
        window.speechSynthesis.speak(utt);
      };

      speakLine(0);
    };

    // Progress bar: per-locale segment + smooth fill within each segment.
    // Each locale gets an equal slice of 0–100. Within the slice we crawl
    // at ~0.55/tick (200 ms) ≈ 2.75%/s, which fits a ~30 s transcript well.
    const SEG = 100 / localeCount;
    const pollProgress = () => {
      if (!generatingRef.current) return;
      setGenProg(prev => {
        const segStart = localeIdxRef.current * SEG;
        const segEnd   = (localeIdxRef.current + 1) * SEG - 0.5;
        // Crawl within current segment; don't overshoot into next locale's slice
        return prev < segEnd ? Math.min(segEnd, prev + 0.55) : prev;
      });
      setTimeout(pollProgress, 200);
    };
    pollProgress();

    // Start speaking — wait for voices if not yet loaded
    const startSpeech = () => playLocale(0);
    if (window.speechSynthesis.getVoices().length > 0) {
      startSpeech();
    } else {
      window.speechSynthesis.onvoiceschanged = startSpeech;
    }
  };

  const qaItems = [
    { key:"clarity",    label:"Audio clarity",           desc:"SNR > 20 dB, no clipping detected" },
    { key:"uniqueness", label:"Topic uniqueness",         desc:"No duplicate segments found" },
    { key:"balance",    label:"Speaker balance",          desc: numSpeakers === 2 ? "45–55% split achieved" : "Solo recording — N/A" },
    { key:"confidence", label:"Transcription confidence", desc:`${Math.round(accuracy)}% word accuracy` },
  ];
  const allQADone = qaItems.every(q => qaChecks[q.key] !== null);
  const allQAPass = qaItems.every(q => qaChecks[q.key] === "approve");
  const sessionHours = (selectedLocales.length * 0.75).toFixed(1);

  return (
    <div style={{ background:C.bg, color:C.txt, fontFamily:"'TP Sans','DM Sans',sans-serif", minHeight:"calc(100vh - 112px)", padding:"10px 24px" }}>
      <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:10, borderBottom:`1px solid ${C.bdr}`, paddingBottom:8 }}>
        <button style={btn(C.txt, true, { padding:"4px 10px", fontSize:13 })} onClick={onBack}>← Use Cases</button>
        <span style={{ fontSize:12, fontWeight:700, color:C.txt, letterSpacing:"0.1em", textTransform:"uppercase" }}>Podcast-Style Human Audio Generation</span>
      </div>
      <DemoNav stage={stage} stageLabels={STAGE_L} stageColors={STAGE_C} maxStage={maxStage} advance={advance} label="" />

      {/* ── STAGE 0: DESIGN ── */}
      {stage === 0 && (
        <div style={{ display:"flex", gap:16 }}>
          <div style={{ flex:"0 0 320px" }}>
            <div style={cardS}>
              <div style={{ fontSize:26, fontWeight:800, color:"#fff", marginBottom:14 }}><span style={{ color:"#F97316" }}>1.</span> Generation Design</div>

              {/* Locale multi-select */}
              <div style={{ marginBottom:12 }}>
                <div style={{ fontSize:13, fontWeight:700, color:C.hi, marginBottom:6 }}>Locale</div>
                {PODCAST_LOCALES.map(loc => (
                  <div key={loc.key} onClick={() => setSelectedLocales(prev => prev.includes(loc.key) ? prev.filter(x => x !== loc.key) : [...prev, loc.key])}
                    style={{ display:"flex", alignItems:"center", gap:8, padding:"7px 10px", borderRadius:8, cursor:"pointer", marginBottom:5,
                      border:`1px solid ${selectedLocales.includes(loc.key) ? "#F97316" : C.bdr}`,
                      background:selectedLocales.includes(loc.key) ? "#F9731614" : C.bg, transition:"border-color .15s, background .15s" }}>
                    <span style={{ fontSize:20 }}>{loc.flag}</span>
                    <div style={{ flex:1 }}>
                      <div style={{ fontSize:13, fontWeight:700, color:selectedLocales.includes(loc.key) ? "#F97316" : C.hi }}>{loc.label}</div>
                      <div style={{ fontSize:11, color:C.txt }}>{loc.region}</div>
                    </div>
                    <div style={{ width:16, height:16, borderRadius:4, border:`2px solid ${selectedLocales.includes(loc.key) ? "#F97316" : C.bdr}`, background:selectedLocales.includes(loc.key) ? "#F97316" : "transparent", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                      {selectedLocales.includes(loc.key) && <span style={{ color:"#fff", fontSize:10, fontWeight:900 }}>✓</span>}
                    </div>
                  </div>
                ))}
              </div>

              <ChipGroup label="Podcast Topic" options={PODCAST_TOPICS} value={selectedTopic} onChange={setSelectedTopic} color="#F97316" />

              <div style={{ marginBottom:12 }}>
                <div style={{ fontSize:13, fontWeight:700, color:C.hi, marginBottom:6 }}>Number of Speakers</div>
                <div style={{ display:"flex", gap:8 }}>
                  {[1,2].map(n => (
                    <button key={n} onClick={() => setNumSpeakers(n)} style={{ flex:1, padding:"8px 0", borderRadius:8, fontSize:14, fontWeight:700, border:`1px solid ${numSpeakers===n ? "#F97316" : C.bdr}`, background:numSpeakers===n ? "#F9731614" : C.bg, color:numSpeakers===n ? "#F97316" : C.txt, cursor:"pointer", fontFamily:"inherit" }}>
                      {n === 1 ? "Solo (1)" : "Duo (2)"}
                    </button>
                  ))}
                </div>
              </div>

              <ChipGroup label="Recording Format" options={["Dual-channel","Single-channel"]} value={recFormat} onChange={setRecFormat} color="#F97316" />

              <button style={btn("#F97316", false, { width:"100%", marginTop:8 })} onClick={() => advance(1)} disabled={selectedLocales.length === 0}>
                Generate Podcast Tasks →
              </button>
            </div>
          </div>

          <div style={{ flex:1 }}>
            <div style={cardS}>
              <div style={{ fontSize:17, fontWeight:700, color:C.hi, marginBottom:12 }}>Task Specification Preview</div>
              <div style={{ padding:14, borderRadius:8, background:C.bg, border:`1px solid ${C.bdr}`, fontFamily:"monospace", fontSize:13, color:C.txt, lineHeight:2.1, marginBottom:12 }}>
                <div style={{ color:"#F97316", fontWeight:700, marginBottom:6, fontSize:14 }}>PODCAST-{Date.now().toString(36).toUpperCase().slice(-6)}</div>
                {[
                  ["Locales", selectedLocales.length === 0 ? "—" : selectedLocales.map(k => PODCAST_LOCALES.find(l=>l.key===k)?.label).join(", ")],
                  ["Topic", selectedTopic],
                  ["Speakers", numSpeakers === 1 ? "1 (solo host)" : "2 (host + guest)"],
                  ["Format", recFormat],
                  ["Target duration", `${numSpeakers === 1 ? "8–12" : "15–25"} min per locale`],
                  ["Authoring mode", "Human-authored (not scripted)"],
                  ["Delivery format", "WAV · 48 kHz · 24-bit"],
                  ["Transcript format", "WebVTT + JSONL"],
                  ["Source", "✦ Human-generated audio (authored, not scraped)"],
                ].map(([k,v]) => (
                  <div key={k}><strong style={{ color:C.hi }}>{k}:</strong> <span style={{ color:k==="Source"?"#10B981":"inherit" }}>{v}</span><br/></div>
                ))}
              </div>
              <div style={{ padding:"10px 14px", borderRadius:8, background:"#10B98112", border:"1px solid #10B98133", display:"flex", alignItems:"center", gap:8 }}>
                <span style={{ fontSize:18 }}>✦</span>
                <span style={{ fontSize:13, color:"#10B981", fontWeight:600 }}>Human-generated audio — authored, not scraped. Fully licensed for AI training.</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── STAGE 1: GENERATE ── */}
      {stage === 1 && (
        <div style={{ display:"flex", gap:16 }}>
          <div style={{ flex:"0 0 240px" }}>
            <div style={cardS}>
              <div style={{ fontSize:26, fontWeight:800, color:"#fff", marginBottom:10 }}><span style={{ color:"#8B5CF6" }}>2.</span> Recording</div>
              <div style={{ fontSize:13, color:C.txt, marginBottom:14, lineHeight:1.6 }}>Contributors record the podcast live. Each locale is a separate session.</div>
              {!generating && !genDone && <button style={btn("#8B5CF6", false, { width:"100%" })} onClick={runGenerate}>▶ Start Recording Session</button>}
              {generating && (
                <div>
                  <div style={{ fontSize:13, color:"#8B5CF6", fontWeight:700, marginBottom:8 }}>Recording in progress…</div>
                  <div style={{ height:5, borderRadius:3, background:C.bdr, overflow:"hidden", marginBottom:6 }}>
                    <div style={{ height:"100%", width:`${genProg}%`, background:"#8B5CF6", transition:"width .05s" }} />
                  </div>
                  <div style={{ fontSize:12, color:C.txt, marginBottom:12 }}>{Math.round(genProg)}%</div>
                </div>
              )}
              {genDone && (
                <div>
                  <div style={{ fontSize:14, color:C.green, fontWeight:700, marginBottom:8 }}>✓ Session complete</div>
                  <div style={{ padding:"6px 10px", borderRadius:6, background:C.green+"10", border:`1px solid ${C.green}33`, fontSize:13, color:C.green, marginBottom:12, lineHeight:1.6 }}>
                    {selectedLocales.length} locale{selectedLocales.length!==1?"s":""} · {numSpeakers} speaker{numSpeakers!==1?"s":""} · {recFormat}
                  </div>
                  <button style={btn(C.accent, false, { width:"100%" })} onClick={() => advance(2)}>Send to Transcription →</button>
                </div>
              )}

              <div style={{ marginTop:14 }}>
                <div style={{ fontSize:11, fontWeight:700, color:C.txt, marginBottom:8, letterSpacing:"0.08em", textTransform:"uppercase" }}>Sessions</div>
                {selectedLocales.map((lKey, idx) => {
                  const loc = PODCAST_LOCALES.find(l=>l.key===lKey);
                  const segSize = 100 / selectedLocales.length;
                  const done = genDone || genProg >= (idx+1)*segSize;
                  const segProg = Math.min(100, Math.max(0, (genProg - idx*segSize) / segSize * 100));
                  return (
                    <div key={lKey} style={{ padding:"6px 8px", borderRadius:6, background:C.bg, border:`1px solid ${done?C.green+"44":generating&&segProg>0?"#8B5CF644":C.bdr}`, marginBottom:5, transition:"border-color .3s" }}>
                      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:3 }}>
                        <span style={{ fontSize:13, color:done?C.green:generating&&segProg>0?"#8B5CF6":C.txt, fontWeight:600 }}>{loc?.flag} {loc?.label}</span>
                        <span style={{ fontSize:11, color:done?C.green:C.txt }}>{done?"✓ Done":generating&&segProg>0?`${Math.round(segProg)}%`:"Queued"}</span>
                      </div>
                      {(generating||genDone) && <div style={{ height:3, borderRadius:2, background:C.bdr }}><div style={{ height:"100%", width:`${done?100:segProg}%`, background:done?C.green:"#8B5CF6", transition:"width .1s" }} /></div>}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Studio monitor */}
          <div style={{ flex:1 }}>
            <div style={cardS}>
              <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:16 }}>
                <div style={{ fontSize:17, fontWeight:700, color:C.hi }}>Studio Monitor</div>
                <div style={{ marginLeft:"auto", display:"flex", alignItems:"center", gap:6, padding:"3px 10px", borderRadius:20, background:generating?"#EF444420":genDone?"#10B98120":"#33333330", border:`1px solid ${generating?"#EF444455":genDone?"#10B98155":"#333"}` }}>
                  <div style={{ width:7, height:7, borderRadius:"50%", background:generating?"#EF4444":genDone?"#10B981":"#555", boxShadow:generating?"0 0 8px #EF4444":"none" }} />
                  <span style={{ fontSize:12, fontWeight:700, color:generating?"#EF4444":genDone?"#10B981":"#555" }}>{generating?"● REC":genDone?"✓ CAPTURED":"○ READY"}</span>
                </div>
              </div>

              <div style={{ display:"flex", gap:14, marginBottom:16 }}>
                {SPK_LABELS.map((label,si) => {
                  const color = SPEAKER_COLORS[si];
                  const isActive = generating && activeSpeaker === si;
                  return (
                    <div key={si} style={{ flex:1, padding:16, borderRadius:10, background:`radial-gradient(ellipse at 50% 100%, ${color}15 0%, #12121E 70%)`, border:`1.5px solid ${isActive?color:"#ffffff10"}`, boxShadow:isActive?`0 0 24px ${color}33`:"none", transition:"border-color .3s, box-shadow .3s" }}>
                      <div style={{ fontSize:14, fontWeight:700, color:isActive?color:C.txt, marginBottom:14 }}>{label}</div>
                      <div style={{ display:"flex", alignItems:"center", gap:2, height:44, justifyContent:"center" }}>
                        {WAVE_ANIMS.map((anim,wi) => (
                          <div key={wi} style={{ width:3, borderRadius:2, background:isActive?color:"#2a2a3a", height:isActive?undefined:4, animation:isActive?`${anim} ${0.42+(wi%3)*0.13}s ${wi*0.055}s ease-in-out infinite`:"none" }} />
                        ))}
                      </div>
                      <div style={{ marginTop:10, fontSize:11, color:isActive?color:"#555", textAlign:"center", fontFamily:"monospace", letterSpacing:"0.06em" }}>
                        {isActive?"● SPEAKING":generating?"◦ LISTENING":genDone?"✓ RECORDED":"○ STANDBY"}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div style={{ display:"flex", gap:8, flexWrap:"wrap", marginBottom:14 }}>
                <span style={{ padding:"3px 10px", borderRadius:20, background:"#8B5CF620", border:"1px solid #8B5CF640", fontSize:12, color:"#8B5CF6" }}>🎙️ {selectedTopic}</span>
                <span style={{ padding:"3px 10px", borderRadius:20, background:"#F9731614", border:"1px solid #F9731640", fontSize:12, color:"#F97316" }}>{recFormat}</span>
                <span style={{ padding:"3px 10px", borderRadius:20, background:"#10B98112", border:"1px solid #10B98130", fontSize:12, color:"#10B981" }}>✦ Human-authored</span>
              </div>

              <div style={{ padding:"10px 14px", borderRadius:8, background:C.bg, border:`1px solid ${C.bdr}` }}>
                <div style={{ display:"flex", justifyContent:"space-between", marginBottom:6, fontSize:12, color:C.txt }}>
                  <span>Session progress</span>
                  <span style={{ fontFamily:"monospace", color:genDone?C.green:"#8B5CF6" }}>{Math.round(genProg)}%</span>
                </div>
                <div style={{ height:6, borderRadius:3, background:C.bdr }}>
                  <div style={{ height:"100%", borderRadius:3, width:`${genProg}%`, background:genDone?C.green:"linear-gradient(90deg,#8B5CF6,#7C3AED)", transition:"width .05s" }} />
                </div>
                <div style={{ display:"flex", justifyContent:"space-between", marginTop:6, fontSize:11, color:"#555" }}>
                  <span>0:00</span><span>{numSpeakers===1?"10:00":"20:00"}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── STAGE 2: TRANSCRIBE ── */}
      {stage === 2 && (
        <div style={{ display:"flex", gap:16 }}>
          <div style={{ flex:"0 0 260px" }}>
            <div style={cardS}>
              <div style={{ fontSize:26, fontWeight:800, color:"#fff", marginBottom:10 }}><span style={{ color:C.cyan }}>3.</span> Transcription</div>
              <div style={{ fontSize:13, color:C.txt, marginBottom:12, lineHeight:1.6 }}>Auto-transcription generated. Click any <strong style={{ color:C.hi }}>word</strong> to correct it. Click a <strong style={{ color:C.hi }}>speaker badge</strong> to swap attribution.</div>
              <div style={{ padding:"10px 12px", borderRadius:8, background:C.bg, border:`1px solid ${C.bdr}`, marginBottom:14 }}>
                <div style={{ display:"flex", justifyContent:"space-between", marginBottom:8 }}>
                  <span style={{ fontSize:13, fontWeight:700, color:C.hi }}>Word Accuracy</span>
                  <span style={{ fontSize:18, fontWeight:800, color:accuracy>=98?C.green:C.amber, fontFamily:"monospace" }}>{Math.round(accuracy)}%</span>
                </div>
                <div style={{ height:8, borderRadius:4, background:C.bdr }}>
                  <div style={{ height:"100%", borderRadius:4, width:`${accuracy}%`, background:accuracy>=98?C.green:`linear-gradient(90deg,${C.amber},#F97316)`, transition:"width .5s, background .5s" }} />
                </div>
                <div style={{ fontSize:11, color:C.txt, marginTop:5 }}>Target: 98–99% · {Object.keys(transcriptEdits).length+Object.keys(speakerEdits).length} correction{(Object.keys(transcriptEdits).length+Object.keys(speakerEdits).length)!==1?"s":""} applied</div>
              </div>
              <div style={{ padding:"8px 10px", borderRadius:6, background:"#06B6D412", border:"1px solid #06B6D430", fontSize:12, color:C.cyan, lineHeight:1.6, marginBottom:14 }}>
                💡 Make corrections to push accuracy to 98%+
              </div>
              {accuracy >= 98 && <button style={btn(C.cyan, false, { width:"100%" })} onClick={() => advance(3)}>Confirm Transcript →</button>}
            </div>
          </div>

          <div style={{ flex:1 }}>
            <div style={cardS}>
              <div style={{ fontSize:15, fontWeight:700, color:C.hi, marginBottom:12 }}>Interactive Transcript — {selectedTopic}</div>
              <div style={{ maxHeight:420, overflowY:"auto" }}>
                {activeTranscript.map((line, li) => {
                  const spkColor = line.spk==="A" ? SPEAKER_COLORS[0] : SPEAKER_COLORS[1];
                  const curLabel = speakerEdits[li] || (line.spk==="A" ? SPK_LABELS[0] : SPK_LABELS[1]);
                  const words = (transcriptEdits[li] || line.text).split(" ");
                  return (
                    <div key={li} style={{ padding:"10px 12px", borderRadius:8, background:C.bg, border:`1px solid ${C.bdr}`, marginBottom:8 }}>
                      <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:7 }}>
                        <button onClick={() => setSpeakerEdits(e => ({ ...e, [li]: curLabel===SPK_LABELS[0] ? (SPK_LABELS[1]||SPK_LABELS[0]) : SPK_LABELS[0] }))}
                          style={{ padding:"2px 8px", borderRadius:4, fontSize:12, fontWeight:700, border:`1px solid ${spkColor}44`, background:spkColor+"18", color:spkColor, cursor:"pointer", fontFamily:"inherit" }}>{curLabel}</button>
                        <span style={{ fontSize:11, color:"#555", fontFamily:"monospace" }}>{line.ts}</span>
                        {speakerEdits[li] && <span style={{ fontSize:11, color:C.amber }}>✎ reassigned</span>}
                      </div>
                      <div style={{ fontSize:14, color:C.hi, lineHeight:1.8, display:"flex", flexWrap:"wrap", gap:3 }}>
                        {words.map((word,wi) => {
                          const isEditing = editingWord?.li===li && editingWord?.wi===wi;
                          return isEditing ? (
                            <input key={wi} autoFocus value={editValue} onChange={e => setEditValue(e.target.value)}
                              onBlur={() => { if(editValue.trim()){ const nw=[...words]; nw[wi]=editValue.trim(); setTranscriptEdits(e=>({...e,[li]:nw.join(" ")})); } setEditingWord(null); setEditValue(""); }}
                              onKeyDown={e => { if(e.key==="Enter"||e.key==="Escape") e.target.blur(); }}
                              style={{ width:Math.max(60,editValue.length*9), fontSize:14, fontFamily:"inherit", background:"#7C3AED22", border:"1px solid #7C3AED", borderRadius:3, color:"#fff", padding:"0 4px", outline:"none" }} />
                          ) : (
                            <span key={wi} onClick={() => { setEditingWord({li,wi}); setEditValue(word); }}
                              style={{ cursor:"pointer", borderRadius:3, padding:"1px 3px", background:transcriptEdits[li]?"#7C3AED0E":"transparent", borderBottom:"1px dashed #ffffff18", color:transcriptEdits[li]?C.accent:C.hi, transition:"background .12s" }}
                              onMouseEnter={e=>e.currentTarget.style.background="#7C3AED22"}
                              onMouseLeave={e=>e.currentTarget.style.background=transcriptEdits[li]?"#7C3AED0E":"transparent"}>
                              {word}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── STAGE 3: QA ── */}
      {stage === 3 && (
        <div style={{ display:"flex", gap:16 }}>
          <div style={{ flex:"0 0 300px" }}>
            <div style={cardS}>
              <div style={{ fontSize:26, fontWeight:800, color:"#fff", marginBottom:10 }}><span style={{ color:C.amber }}>4.</span> Quality Assurance</div>
              <div style={{ fontSize:13, color:C.txt, marginBottom:14, lineHeight:1.6 }}>Review each check and approve or flag for re-record.</div>
              {qaItems.map(({ key, label, desc }) => (
                <div key={key} style={{ padding:"10px 12px", borderRadius:8, background:C.bg, border:`1px solid ${qaChecks[key]==="approve"?C.green+"55":qaChecks[key]==="flag"?C.red+"55":C.bdr}`, marginBottom:8, transition:"border-color .2s" }}>
                  <div style={{ fontSize:14, fontWeight:700, color:C.hi, marginBottom:2 }}>{label}</div>
                  <div style={{ fontSize:12, color:C.txt, marginBottom:8 }}>{desc}</div>
                  <div style={{ display:"flex", gap:6 }}>
                    <button onClick={() => setQaChecks(q=>({...q,[key]:"approve"}))} style={{ flex:1, padding:"4px 0", borderRadius:5, fontSize:12, fontWeight:700, border:`1px solid ${qaChecks[key]==="approve"?C.green:C.bdr}`, background:qaChecks[key]==="approve"?C.green+"20":C.bg, color:qaChecks[key]==="approve"?C.green:C.txt, cursor:"pointer", fontFamily:"inherit" }}>✅ Approve</button>
                    <button onClick={() => setQaChecks(q=>({...q,[key]:"flag"}))} style={{ flex:1, padding:"4px 0", borderRadius:5, fontSize:12, fontWeight:700, border:`1px solid ${qaChecks[key]==="flag"?C.red:C.bdr}`, background:qaChecks[key]==="flag"?C.red+"20":C.bg, color:qaChecks[key]==="flag"?C.red:C.txt, cursor:"pointer", fontFamily:"inherit" }}>🚩 Re-record</button>
                  </div>
                </div>
              ))}
              {allQADone && allQAPass && <button style={btn(C.green, false, { width:"100%", marginTop:4 })} onClick={() => advance(4)}>Publish Dataset →</button>}
              {allQADone && !allQAPass && (
                <div style={{ marginTop:8 }}>
                  <div style={{ fontSize:13, color:C.red, marginBottom:10, padding:"8px 10px", borderRadius:6, background:C.red+"12", border:`1px solid ${C.red}33` }}>
                    ⚠ {qaItems.filter(q=>qaChecks[q.key]==="flag").length} item(s) flagged:<br/>
                    <span style={{ color:C.hi }}>
                      {qaItems.filter(q=>qaChecks[q.key]==="flag").map(q=>q.label).join(", ")}
                    </span>
                  </div>
                  <button style={btn(C.amber, false, { width:"100%" })} onClick={() => {
                    setGenerating(false); setGenDone(false); setGenProg(0);
                    setQaChecks({ clarity:null, uniqueness:null, balance:null, confidence:null });
                    advance(1);
                  }}>↩ Re-record Flagged Sessions</button>
                </div>
              )}
            </div>
          </div>

          <div style={{ flex:1 }}>
            <div style={cardS}>
              <div style={{ fontSize:15, fontWeight:700, color:C.hi, marginBottom:14 }}>QA Dashboard</div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:14 }}>
                {[
                  { label:"Recordings reviewed", val:selectedLocales.length, color:C.cyan },
                  { label:"Speakers", val:numSpeakers, color:"#8B5CF6" },
                  { label:"Transcript accuracy", val:`${Math.round(accuracy)}%`, color:accuracy>=98?C.green:C.amber },
                  { label:"Checks completed", val:`${Object.values(qaChecks).filter(v=>v!==null).length} / ${qaItems.length}`, color:"#F97316" },
                ].map(({label,val,color}) => (
                  <div key={label} style={{ padding:"14px 16px", borderRadius:10, background:C.bg, border:`1px solid ${C.bdr}` }}>
                    <div style={{ fontSize:24, fontWeight:800, color, marginBottom:4 }}>{val}</div>
                    <div style={{ fontSize:12, color:C.txt }}>{label}</div>
                  </div>
                ))}
              </div>
              <div style={{ padding:"12px 14px", borderRadius:8, background:C.bg, border:`1px solid ${C.bdr}` }}>
                {qaItems.map(({key,label}) => (
                  <div key={key} style={{ display:"flex", alignItems:"center", gap:8, padding:"6px 0", borderBottom:`1px solid ${C.bdr}` }}>
                    <span style={{ fontSize:16 }}>{qaChecks[key]==="approve"?"✅":qaChecks[key]==="flag"?"🚩":"⬜"}</span>
                    <span style={{ fontSize:13, color:qaChecks[key]==="approve"?C.green:qaChecks[key]==="flag"?C.red:C.txt }}>{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── STAGE 4: PUBLISH ── */}
      {stage === 4 && (
        <div style={{ display:"flex", gap:16 }}>
          <div style={{ flex:"0 0 280px" }}>
            <div style={cardS}>
              <div style={{ fontSize:26, fontWeight:800, color:"#fff", marginBottom:10 }}><span style={{ color:C.green }}>5.</span> Dataset Complete</div>
              {!published ? (
                <>
                  <div style={{ fontSize:13, color:C.txt, marginBottom:16, lineHeight:1.6 }}>All QA checks passed. Audio + transcripts ready for training corpus ingestion.</div>
                  <button style={btn(C.green, false, { width:"100%" })} onClick={() => setTimeout(()=>setPublished(true),800)}>🚀 Publish to Training Corpus</button>
                </>
              ) : (
                <div>
                  <div style={{ fontSize:20, color:C.green, fontWeight:800, marginBottom:10 }}>🎉 Published!</div>
                  <div style={{ padding:"8px 12px", borderRadius:6, background:C.green+"12", border:`1px solid ${C.green}33`, fontSize:13, color:C.green, marginBottom:14, lineHeight:1.7 }}>
                    Dataset added to corpus.<br/>Available for training pipeline ingestion.
                  </div>
                  <button style={btn("#F97316", true, { width:"100%", fontSize:13 })} onClick={() => { setStage(0); setMaxStage(0); setGenerating(false); setGenDone(false); setGenProg(0); setTranscriptEdits({}); setSpeakerEdits({}); setQaChecks({clarity:null,uniqueness:null,balance:null,confidence:null}); setPublished(false); setAccuracy(85); }}>↺ New Session</button>
                </div>
              )}
            </div>
          </div>

          <div style={{ flex:1 }}>
            <div style={cardS}>
              <div style={{ fontSize:15, fontWeight:700, color:C.hi, marginBottom:14 }}>Dataset Summary</div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:10, marginBottom:14 }}>
                {[
                  { label:"Hours generated", val:`${sessionHours}h`, color:C.green },
                  { label:"Locales covered", val:selectedLocales.length, color:C.cyan },
                  { label:"Topics covered", val:1, color:"#8B5CF6" },
                  { label:"Speakers", val:numSpeakers, color:"#F97316" },
                  { label:"Recording format", val:recFormat.replace("-channel","ch"), color:C.amber },
                  { label:"Transcript accuracy", val:`${Math.round(accuracy)}%`, color:C.green },
                ].map(({label,val,color}) => (
                  <div key={label} style={{ padding:"14px 16px", borderRadius:10, background:C.bg, border:`1px solid ${published?color+"44":C.bdr}`, transition:"border-color .4s" }}>
                    <div style={{ fontSize:22, fontWeight:800, color, marginBottom:4 }}>{val}</div>
                    <div style={{ fontSize:12, color:C.txt }}>{label}</div>
                  </div>
                ))}
              </div>
              <div style={{ padding:"12px 14px", borderRadius:8, background:C.bg, border:`1px solid ${C.bdr}`, fontFamily:"monospace", fontSize:13, lineHeight:2 }}>
                <div style={{ color:C.green, fontWeight:700, marginBottom:4 }}>PODCAST-HDG-{Date.now().toString(36).toUpperCase().slice(-8)}</div>
                {[
                  ["Locales", selectedLocales.map(k=>PODCAST_LOCALES.find(l=>l.key===k)?.label).join(", ")],
                  ["Topic", selectedTopic],
                  ["Audio format", "WAV · 48 kHz · 24-bit"],
                  ["Transcript", "WebVTT + JSONL"],
                  ["Source", "Human-generated (authored)"],
                  ["License", "TP.ai Training License v2.0"],
                  ["Status", published?"✓ Published":"⏳ Pending"],
                ].map(([k,v]) => (
                  <div key={k}><strong style={{ color:C.hi }}>{k}:</strong> <span style={{ color:k==="Status"?(published?C.green:C.amber):k==="Source"?"#10B981":"inherit" }}>{v}</span><br/></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ===== HUMAN DATA GENERATION — USE CASE SELECTOR =====
function HumanDataGenDemo() {
  const [useCase, setUseCase] = useState(null);
  if (useCase === "chat")    return <ChatHDGDemo    onBack={() => setUseCase(null)} />;
  if (useCase === "podcast") return <PodcastHDGDemo onBack={() => setUseCase(null)} />;
  return (
    <div style={{ background:C.bg, color:C.txt, fontFamily:"'TP Sans','DM Sans',sans-serif", minHeight:"calc(100vh - 112px)", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"32px 24px" }}>
      <div style={{ fontSize:12, fontWeight:700, color:C.txt, letterSpacing:"0.14em", textTransform:"uppercase", marginBottom:8, textAlign:"center" }}>Human Data Generation</div>
      <div style={{ fontSize:28, fontWeight:800, color:C.hi, marginBottom:32, textAlign:"center" }}>Select a use case</div>
      <div style={{ display:"flex", gap:20, flexWrap:"wrap", justifyContent:"center", width:"100%", maxWidth:900 }}>
        {[
          { key:"chat",    icon:"💬", label:"Conversation Data Generation",          color:C.accent,  desc:"Human-authored chat conversations across domains. QA-reviewed, intent-labelled, and packaged for LLM alignment training.",                                        tag:"5 stages · HDG v1.0" },
          { key:"podcast", icon:"🎙️", label:"Podcast-Style Human Audio Generation", color:"#F97316", desc:"Human-recorded podcast audio across locales and topics. Transcribed, diarized, QA-checked, and published to the training corpus.", tag:"5 stages · PODCAST-HDG v1.0" },
        ].map(({ key, icon, label, color, desc, tag }) => (
          <div key={key} onClick={() => setUseCase(key)}
            style={{ flex:"1 1 340px", maxWidth:420, padding:"32px 28px", borderRadius:16, cursor:"pointer", border:`1px solid ${color}44`, background:C.card, transition:"border-color .2s, box-shadow .2s, transform .2s" }}
            onMouseEnter={e => { e.currentTarget.style.borderColor=color; e.currentTarget.style.boxShadow=`0 12px 40px ${color}22`; e.currentTarget.style.transform="translateY(-3px)"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor=color+"44"; e.currentTarget.style.boxShadow="none"; e.currentTarget.style.transform="none"; }}>
            <div style={{ fontSize:36, marginBottom:14 }}>{icon}</div>
            <div style={{ fontSize:18, fontWeight:700, color, marginBottom:10, lineHeight:1.3 }}>{label}</div>
            <div style={{ fontSize:14, color:C.txt, lineHeight:1.7, marginBottom:14 }}>{desc}</div>
            <div style={{ fontSize:12, color, fontWeight:600, letterSpacing:"0.05em" }}>{tag} →</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ===== PERSON CLIPARTS =====
const PERSON_SVGS = [
  // 0: Short straight hair, collared shirt
  c => <svg viewBox="0 0 80 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position:"absolute",inset:0,width:"100%",height:"100%" }} preserveAspectRatio="xMidYMax meet">
    <rect x="8" y="62" width="64" height="38" rx="8" fill={c} opacity="0.55"/>
    <path d="M32 62 L40 73 L48 62" stroke="white" strokeWidth="1.5" opacity="0.25" fill="none"/>
    <rect x="33" y="47" width="14" height="18" rx="3" fill={c} opacity="0.72"/>
    <ellipse cx="40" cy="32" rx="19" ry="21" fill={c} opacity="0.85"/>
    <path d="M21 27 Q21 11 40 11 Q59 11 59 27 Q57 17 40 17 Q23 17 21 27Z" fill={c} opacity="1"/>
    <ellipse cx="33" cy="26" rx="4" ry="3" fill="white" opacity="0.2"/>
  </svg>,
  // 1: Long flowing hair
  c => <svg viewBox="0 0 80 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position:"absolute",inset:0,width:"100%",height:"100%" }} preserveAspectRatio="xMidYMax meet">
    <rect x="10" y="62" width="60" height="38" rx="8" fill={c} opacity="0.55"/>
    <rect x="33" y="47" width="14" height="18" rx="3" fill={c} opacity="0.72"/>
    <ellipse cx="40" cy="33" rx="18" ry="20" fill={c} opacity="0.85"/>
    <path d="M22 28 Q17 52 22 68 Q16 62 16 40 Q16 12 40 11 Q64 12 64 40 Q64 62 58 68 Q63 52 58 28" fill={c} opacity="0.95"/>
    <ellipse cx="33" cy="26" rx="4" ry="3" fill="white" opacity="0.2"/>
  </svg>,
  // 2: Curly / afro hair
  c => <svg viewBox="0 0 80 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position:"absolute",inset:0,width:"100%",height:"100%" }} preserveAspectRatio="xMidYMax meet">
    <rect x="10" y="62" width="60" height="38" rx="8" fill={c} opacity="0.55"/>
    <rect x="33" y="48" width="14" height="17" rx="3" fill={c} opacity="0.72"/>
    <ellipse cx="40" cy="36" rx="17" ry="19" fill={c} opacity="0.85"/>
    <ellipse cx="40" cy="23" rx="24" ry="20" fill={c} opacity="0.98"/>
    <ellipse cx="33" cy="31" rx="4" ry="3" fill="white" opacity="0.2"/>
  </svg>,
  // 3: Hair bun on top
  c => <svg viewBox="0 0 80 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position:"absolute",inset:0,width:"100%",height:"100%" }} preserveAspectRatio="xMidYMax meet">
    <rect x="10" y="62" width="60" height="38" rx="8" fill={c} opacity="0.55"/>
    <path d="M26 62 Q40 56 54 62" stroke="white" strokeWidth="1.5" opacity="0.2" fill="none"/>
    <rect x="33" y="48" width="14" height="17" rx="3" fill={c} opacity="0.72"/>
    <ellipse cx="40" cy="35" rx="17" ry="19" fill={c} opacity="0.85"/>
    <path d="M23 28 Q23 16 40 16 Q57 16 57 28 Q55 18 40 18 Q25 18 23 28Z" fill={c} opacity="0.98"/>
    <circle cx="40" cy="11" r="9" fill={c} opacity="1"/>
    <ellipse cx="33" cy="28" rx="4" ry="3" fill="white" opacity="0.2"/>
  </svg>,
  // 4: Buzzcut, wide shoulders / t-shirt
  c => <svg viewBox="0 0 80 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position:"absolute",inset:0,width:"100%",height:"100%" }} preserveAspectRatio="xMidYMax meet">
    <path d="M4 100 L4 66 Q4 62 20 60 L60 60 Q76 62 76 66 L76 100Z" fill={c} opacity="0.55"/>
    <rect x="33" y="48" width="14" height="15" rx="3" fill={c} opacity="0.72"/>
    <path d="M22 36 Q22 14 40 14 Q58 14 58 36 Q58 52 40 53 Q22 52 22 36Z" fill={c} opacity="0.85"/>
    <rect x="22" y="14" width="36" height="9" rx="4" fill={c} opacity="1"/>
    <ellipse cx="33" cy="28" rx="4" ry="3" fill="white" opacity="0.2"/>
  </svg>,
  // 5: Side-swept hair + glasses
  c => <svg viewBox="0 0 80 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position:"absolute",inset:0,width:"100%",height:"100%" }} preserveAspectRatio="xMidYMax meet">
    <rect x="8" y="62" width="64" height="38" rx="8" fill={c} opacity="0.55"/>
    <path d="M32 62 L26 74 L40 68 L54 74 L48 62" fill={c} opacity="0.7"/>
    <rect x="33" y="47" width="14" height="18" rx="3" fill={c} opacity="0.72"/>
    <ellipse cx="40" cy="33" rx="18" ry="20" fill={c} opacity="0.85"/>
    <path d="M22 27 Q22 11 40 11 Q55 11 59 19 Q52 13 38 15 Q24 17 24 27Z" fill={c} opacity="1"/>
    <rect x="27" y="30" width="10" height="7" rx="3" fill="none" stroke="white" strokeWidth="1.3" opacity="0.35"/>
    <rect x="43" y="30" width="10" height="7" rx="3" fill="none" stroke="white" strokeWidth="1.3" opacity="0.35"/>
    <line x1="37" y1="33" x2="43" y2="33" stroke="white" strokeWidth="1.3" opacity="0.35"/>
    <ellipse cx="33" cy="26" rx="3.5" ry="2.5" fill="white" opacity="0.18"/>
  </svg>,
];

// ===== PERSON TILE =====
function PersonTile({ name, color, index, isSpeaking, captureRunning }) {
  const WAVE_ANIMS = ["audioBar2","audioBar1","audioBar4","audioBar3","audioBar2","audioBar4","audioBar1","audioBar3","audioBar2"];
  const WAVE_HEIGHTS = [5,9,13,18,13,9,5,9,13];
  return (
    <div style={{ position:"relative", background:`radial-gradient(ellipse at 50% 70%, ${color}22 0%, #16162A 55%, #0D0D1C 100%)`, borderRadius:6, overflow:"hidden", border:`2px solid ${isSpeaking ? color : "#ffffff0b"}`, transition:"border-color .35s, box-shadow .35s", boxShadow: isSpeaking ? `0 0 22px ${color}55` : "none", minHeight:0 }}>
      {/* Clipart person — fills tile */}
      {PERSON_SVGS[index % PERSON_SVGS.length](color)}
      {/* Video shimmer overlay */}
      {captureRunning && <div style={{ position:"absolute", inset:0, background:`linear-gradient(110deg, transparent 38%, ${color}09 50%, transparent 62%)`, backgroundSize:"200% 100%", animation:"videoShimmer 3.5s linear infinite", pointerEvents:"none" }} />}
      {/* Bottom gradient + name + waveform */}
      <div style={{ position:"absolute", bottom:0, left:0, right:0, background:"linear-gradient(to top, #000000BB 0%, #00000044 60%, transparent 100%)", padding:"18px 6px 5px", display:"flex", flexDirection:"column", alignItems:"center", gap:3 }}>
        {isSpeaking && captureRunning && (
          <div style={{ display:"flex", alignItems:"center", gap:2, height:20 }}>
            {WAVE_HEIGHTS.map((h,i) => (
              <div key={i} style={{ width:3, borderRadius:2, background:color, height:h, animation:`${WAVE_ANIMS[i]} ${0.42+(i%3)*0.13}s ${i*0.055}s ease-in-out infinite` }} />
            ))}
          </div>
        )}
        <div style={{ fontSize:18, fontWeight: isSpeaking ? 700 : 500, color: isSpeaking ? "#fff" : "#ccc", whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis", maxWidth:"95%", textShadow:"0 1px 4px #000" }}>{name}</div>
      </div>
    </div>
  );
}

// ===== MEETING GRID VISUAL =====
function MeetingGrid({ participants, lang, captureRunning, captureDone, activeSpeaker, currentSession }) {
  const NAME_MAP = {
    English:    ["Sarah M.","James K.","Emily R.","David L.","Alex T.","Lisa C.","Chris B.","Kate W.","Ryan P.","Mia S."],
    French:     ["Marie D.","Pierre L.","Sophie B.","Lucas M.","Camille R.","Antoine V.","Léa P.","Julien F."],
    German:     ["Anna S.","Thomas M.","Laura K.","Felix B.","Hannah W.","Markus R.","Clara J.","Stefan H."],
    Spanish:    ["Ana G.","Carlos M.","Laura R.","Miguel T.","Sofía L.","Javier P.","Isabel C.","Diego V."],
    Portuguese: ["João S.","Ana P.","Pedro C.","Maria L.","Bruno F.","Carla M.","Rui V.","Inês D."],
    Italian:    ["Marco R.","Giulia B.","Luca M.","Chiara F.","Antonio V.","Elena S.","Paolo C.","Francesca T."],
    Japanese:   ["Yuki T.","Kenji S.","Aiko M.","Ryo K.","Hana N.","Takeshi W.","Mika O.","Sho F."],
    Korean:     ["Min-jun L.","Ji-yeon K.","Soo-hyun P.","Hyun-woo C.","Ye-jin K.","Ji-hoon L.","Na-rae O.","Dong-hyun S."],
  };
  const names = (NAME_MAP[lang] || NAME_MAP.English).slice(0, participants);
  const COLORS = ["#7C3AED","#06B6D4","#10B981","#F59E0B","#EF4444","#8B5CF6","#F97316","#EC4899","#14B8A6","#6366F1"];
  const cols = participants <= 2 ? 2 : participants <= 4 ? 2 : participants <= 6 ? 3 : 4;
  const speaking = captureRunning ? activeSpeaker % participants : -1;

  return (
    <div style={{ background: "#0E0E1C", borderRadius: 10, overflow: "hidden", width: "100%", aspectRatio: "16/9", display: "flex", flexDirection: "column" }}>
      {/* Top bar */}
      <div style={{ background: "#07070F", padding: "6px 14px", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: captureRunning ? "#EF4444" : captureDone ? "#10B981" : "#333", boxShadow: captureRunning ? "0 0 7px #EF444499" : "none", transition: "background .3s" }} />
          <span style={{ fontSize: 17, color: captureRunning ? "#EF4444" : captureDone ? "#10B981" : "#444", fontFamily: "monospace", fontWeight: 700 }}>{captureRunning ? "● REC" : captureDone ? "✓ CAPTURED" : "○ STANDBY"}</span>
          {currentSession && <span style={{ fontSize: 15, color: "#444", marginLeft: 6 }}>{currentSession.id}</span>}
        </div>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <span style={{ fontSize: 15, color: "#666" }}>{lang} · {participants} participants</span>
          {captureRunning && <span style={{ padding: "1px 6px", borderRadius: 3, background: "#EF444420", border: "1px solid #EF444455", fontSize: 14, color: "#EF4444", fontWeight: 700, letterSpacing: "0.05em" }}>LIVE</span>}
        </div>
      </div>
      {/* Video grid */}
      <div style={{ flex: 1, display: "grid", gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: 3, padding: 3, background: "#0A0A16", minHeight: 0 }}>
        {names.map((name, i) => (
          <PersonTile key={i} name={name} color={COLORS[i % COLORS.length]} index={i} isSpeaking={i === speaking} captureRunning={captureRunning} />
        ))}
      </div>
      {/* Bottom toolbar */}
      <div style={{ background: "#07070F", padding: "6px 14px", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, flexShrink: 0 }}>
        {[["🎙️", captureRunning ? "Recording" : "Standby", captureRunning ? "#10B981" : "#EF4444"],["📝","Live Transcript","#7C3AED"],["🔒","E2E Encrypted","#06B6D4"],["📷","Cam Off","#555"]].map(([ic,lbl,col]) => (
          <div key={lbl} style={{ padding: "2px 9px", borderRadius: 3, background: col+"18", border: `1px solid ${col}44`, fontSize: 14, color: col, display: "flex", gap: 4, alignItems: "center" }}><span>{ic}</span><span>{lbl}</span></div>
        ))}
      </div>
    </div>
  );
}

// ===== MEETING DATA COLLECTION DEMO =====
function MeetingDataCollectDemo({ onBack }) {
  const [stage, setStage] = useState(0);
  const [maxStage, setMaxStage] = useState(0);
  const [meetingType, setMeetingType] = useState("5-person");
  const [selectedLangs, setSelectedLangs] = useState(["English", "French"]);
  const [sessionCount, setSessionCount] = useState(12);
  const [formats, setFormats] = useState({ agenda: true, brainstorm: false, notes: true, closure: false });
  const [sessionStatuses, setSessionStatuses] = useState({});
  const [captureRunning, setCaptureRunning] = useState(false);
  const [captureDone, setCaptureDone] = useState(false);
  const [autoQC, setAutoQC] = useState(false);
  const [humanReview, setHumanReview] = useState(false);
  const [qcRunning, setQcRunning] = useState(false);
  const [qcDone, setQcDone] = useState(false);
  const [qcPass, setQcPass] = useState(0);
  const [qcFail, setQcFail] = useState(0);
  const [selectedSess, setSelectedSess] = useState(null);
  const [validations, setValidations] = useState({});
  const [delivered, setDelivered] = useState(false);
  const [activeSpeaker, setActiveSpeaker] = useState(0);

  // Short meeting phrases — spoken on each speaker rotation
  const MEETING_PHRASES = [
    "I agree, let's move forward with that.",
    "Can we revisit the timeline briefly?",
    "I'd like to flag a concern on this.",
    "Good point — let me add to that.",
    "Who's taking ownership of this item?",
    "Let's align on this before we close.",
    "I think we have consensus here.",
    "Can you clarify the scope a bit?",
    "That works for me. Any objections?",
    "Let's table this and follow up async.",
    "I need two minutes on the next item.",
    "Agreed — we'll action that by Friday.",
  ];

  // Cancel speech on unmount
  useEffect(() => () => { window.speechSynthesis && window.speechSynthesis.cancel(); }, []);

  useEffect(() => {
    if (!captureRunning) return;
    const iv = setInterval(() => setActiveSpeaker(s => s + 1), 2200);
    return () => { clearInterval(iv); window.speechSynthesis.cancel(); };
  }, [captureRunning]);

  // Speak a short phrase for whichever participant just became active
  useEffect(() => {
    if (!captureRunning) return;
    const numPax = PAX[meetingType] || 5;
    const spkIdx = activeSpeaker % numPax;

    window.speechSynthesis.cancel();
    const phrase = MEETING_PHRASES[activeSpeaker % MEETING_PHRASES.length];

    const speak = () => {
      const all = window.speechSynthesis.getVoices();
      const pool = all.filter(v => v.lang.startsWith("en"));
      const voices = pool.length > 0 ? pool : all;

      const utt = new SpeechSynthesisUtterance(phrase);
      // Each participant gets a distinct pitch so they sound like different people
      utt.voice  = voices[spkIdx % voices.length] || null;
      utt.pitch  = 0.82 + spkIdx * 0.10;   // 0.82–1.72 spread across up to 10 speakers
      utt.rate   = 0.88 + (spkIdx % 3) * 0.06;
      utt.volume = 1.0;
      window.speechSynthesis.speak(utt);
    };

    if (window.speechSynthesis.getVoices().length > 0) {
      speak();
    } else {
      window.speechSynthesis.onvoiceschanged = speak;
    }

    return () => window.speechSynthesis.cancel();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeSpeaker, captureRunning]);

  const LANGS = ["English","Portuguese","French","Italian","German","Spanish","Japanese","Korean"];
  const FMT_LABELS = { agenda:"Agenda discussion", brainstorm:"Brainstorming", notes:"Note-taking", closure:"Meeting closure" };
  const PAX = { "1:1":2, "3-person":3, "5-person":5, "10-person":10 };
  const DURS = [58,62,47,71,55,63,49,68,52,60,57,64,46,73,51,66];
  const STAGE_C = [C.cyan,"#8B5CF6",C.amber,C.orange,C.green];
  const STAGE_L = ["Setup","Capture","QC","Docs","Deliver"];

  const advance = n => { setStage(n); setMaxStage(m => Math.max(m, n)); };
  const langList = selectedLangs.length > 0 ? selectedLangs : ["English"];
  const activeFmts = Object.entries(formats).filter(([,v])=>v).map(([k])=>FMT_LABELS[k]);
  const sessionList = Array.from({ length: Math.min(sessionCount, 16) }, (_, i) => ({
    id: `MTG-${String(i+1).padStart(3,"0")}`,
    lang: langList[i % langList.length],
    participants: PAX[meetingType],
    dur: `${DURS[i % DURS.length]}m`,
    format: activeFmts.length > 0 ? activeFmts[i % activeFmts.length] : "Agenda discussion",
    issue: i === 2 ? "⚠️ Audio quality" : i === 7 ? "⚠️ Agenda adherence" : null
  }));

  const runCapture = () => {
    setCaptureRunning(true);
    let i = 0;
    const tick = () => {
      if (i >= sessionList.length) { setCaptureRunning(false); setCaptureDone(true); return; }
      const id = sessionList[i].id;
      setSessionStatuses(s => ({ ...s, [id]: "recording" }));
      setTimeout(() => { setSessionStatuses(s => ({ ...s, [id]: "completed" })); i++; setTimeout(tick, 60); }, 320);
    };
    tick();
  };

  const runQC = () => {
    setQcRunning(true); setQcPass(0); setQcFail(0);
    const total = sessionList.length;
    const failTarget = Math.max(1, Math.round(total * 0.04));
    const passTarget = total - failTarget;
    let p = 0, f = 0;
    const tick = () => {
      if (p + f >= total) { setQcRunning(false); setQcDone(true); return; }
      if (p < passTarget) { p++; setQcPass(p); }
      else { f++; setQcFail(f); }
      setTimeout(tick, 90);
    };
    tick();
  };

  const NOTES = ["Q2 roadmap aligned. Budget approved. Headcount tabled for next quarter.","Brainstorm yielded 9 feature concepts. Customer onboarding pain points identified.","1:1 feedback shared. Performance targets reviewed. L&D plan drafted.","APAC localization strategy confirmed. Translation vendor shortlisted.","Sprint retro complete. 3 process blockers identified and assigned."];
  const AGENDAS = ["1. Q2 Planning → 2. Budget Review → 3. Headcount → 4. AOB","Open ideation — AI features · UX gaps · Integration wishlist","Performance check-in · Goal alignment · Dev plan","Market entry: APAC · Vendor review · Timeline","Sprint retro · Blockers · Shoutouts"];
  const ACTIONS_ARR = [["Maria: Share roadmap by EOW","Tom: Send budget delta to Finance","All: Review headcount doc before Thu"],["Ana: Compile ideas in Confluence","Dev lead: Score feasibility Fri"],["Manager: Send L&D plan to HR","Report: Complete self-assessment form"],["PM: Issue RFQ to 3 vendors","Legal: Review localization contracts"],["Scrum master: Update Jira backlog","Team: Add retro items to shared doc"]];
  const getArtifact = id => { const i = (parseInt(id.replace("MTG-",""))-1) % NOTES.length; return { notes: NOTES[i], agenda: AGENDAS[i], actions: ACTIONS_ARR[i] }; };

  const completedList = sessionList.filter(s => sessionStatuses[s.id] === "completed");
  const reviewSet = completedList.slice(0, 8);
  const allValidated = reviewSet.length > 0 && reviewSet.every(s => validations[s.id]);
  const uniqueLangs = [...new Set(sessionList.map(s => s.lang))];

  return (
    <div style={{ background: C.bg, color: C.txt, fontFamily: "'TP Sans','DM Sans',sans-serif", minHeight: "calc(100vh - 112px)", padding: "10px 24px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10, borderBottom: `1px solid ${C.bdr}`, paddingBottom: 8 }}>
        <button style={btn(C.txt, true, { padding: "4px 10px", fontSize: 13 })} onClick={onBack}>← Use Cases</button>
        <span style={{ fontSize: 12, fontWeight: 700, color: C.txt, letterSpacing: "0.1em", textTransform: "uppercase" }}>Multilingual Online Meeting Data Collection</span>
      </div>
      <DemoNav stage={stage} stageLabels={STAGE_L} stageColors={STAGE_C} maxStage={maxStage} advance={advance} label="" />

      {/* STAGE 0 — SETUP */}
      {stage === 0 && (
        <div style={{ display: "flex", gap: 16 }}>
          <div style={{ flex: "0 0 320px" }}>
            <div style={cardS}>
              <div style={{ fontSize: 18, fontWeight: 800, color: "#fff", marginBottom: 12 }}><span style={{ color: C.cyan }}>1.</span> Collection Setup</div>
              <ChipGroup label="Meeting Type" options={["1:1","3-person","5-person","10-person"]} value={meetingType} onChange={setMeetingType} color={C.cyan} />
              <div style={{ marginBottom: 10 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: C.hi, marginBottom: 5 }}>Languages</div>
                <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
                  {LANGS.map(l => (
                    <button key={l} onClick={() => setSelectedLangs(prev => prev.includes(l) ? prev.filter(x=>x!==l) : [...prev, l])}
                      style={{ padding: "4px 10px", borderRadius: 6, fontSize: 12, fontWeight: 600, border: `1px solid ${selectedLangs.includes(l) ? C.cyan : C.bdr}`, background: selectedLangs.includes(l) ? C.cyan+"20" : C.bg, color: selectedLangs.includes(l) ? C.cyan : C.txt, cursor: "pointer", fontFamily: "inherit" }}>{l}</button>
                  ))}
                </div>
              </div>
              <div style={{ marginBottom: 10 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: C.hi }}>Sessions</span>
                  <span style={{ fontSize: 13, color: C.cyan, fontFamily: "monospace" }}>{sessionCount}</span>
                </div>
                <input type="range" min={5} max={50} value={sessionCount} onChange={e => setSessionCount(+e.target.value)} style={{ width: "100%", accentColor: C.cyan }} />
              </div>
              <div style={{ marginBottom: 12 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: C.hi, marginBottom: 6 }}>Meeting Formats</div>
                {Object.entries(FMT_LABELS).map(([k, label]) => (
                  <label key={k} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 5, cursor: "pointer", fontSize: 13, color: formats[k] ? C.hi : C.txt }}>
                    <input type="checkbox" checked={formats[k]} onChange={() => setFormats(f => ({...f, [k]: !f[k]}))} style={{ accentColor: C.cyan }} />
                    {label}
                  </label>
                ))}
              </div>
              <button style={btn(C.cyan, false, { width: "100%" })} onClick={() => advance(1)}>Launch Collection Campaign →</button>
            </div>
          </div>
          <div style={{ flex: 1 }}>
            <div style={cardS}>
              <div style={{ fontSize: 15, fontWeight: 700, color: C.hi, marginBottom: 10 }}>Campaign Brief</div>
              <div style={{ padding: 14, borderRadius: 8, background: C.bg, border: `1px solid ${C.bdr}`, fontFamily: "monospace", fontSize: 13, color: C.txt, lineHeight: 2 }}>
                <div style={{ color: C.cyan, fontWeight: 700, marginBottom: 4 }}>MTGDC-{Date.now().toString(36).toUpperCase().slice(-6)}</div>
                {[["Type","Online Meeting Recording"],["Meeting size",meetingType],["Languages",langList.join(", ")],["Sessions",sessionCount],["Formats",activeFmts.length>0?activeFmts.join(", "):"—"],["Consent","✓ GDPR + Regional"],["Transcription","✓ Auto-transcribe on ingest"],["PII","✓ Speaker de-identification"],["Status","⏳ Ready to launch"]].map(([k,v]) => (
                  <div key={k}><strong style={{ color: C.hi }}>{k}:</strong> <span style={{ color: k==="Consent"||k==="Transcription"||k==="PII" ? C.green : k==="Status" ? C.amber : "inherit" }}>{v}</span><br/></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* STAGE 1 — CAPTURE */}
      {stage === 1 && (() => {
        const recordingSession = sessionList.find(s => sessionStatuses[s.id] === "recording");
        const lastCompleted = [...sessionList].reverse().find(s => sessionStatuses[s.id] === "completed");
        const displaySession = recordingSession || lastCompleted || sessionList[0];
        return (
          <div style={{ display: "flex", gap: 14 }}>
            {/* Left: controls */}
            <div style={{ flex: "0 0 240px" }}>
              <div style={cardS}>
                <div style={{ fontSize: 16, fontWeight: 800, color: "#fff", marginBottom: 10 }}><span style={{ color: "#8B5CF6" }}>2.</span> Live Capture</div>
                {!captureRunning && !captureDone && <button style={btn("#8B5CF6", false, { width: "100%" })} onClick={runCapture}>▶ Start Recording Sessions</button>}
                {captureRunning && (
                  <div>
                    <div style={{ fontSize: 13, color: "#8B5CF6", fontWeight: 600, marginBottom: 6 }}>Sessions recording...</div>
                    <div style={{ height: 4, borderRadius: 3, background: C.bdr, overflow: "hidden", marginBottom: 6 }}>
                      <div style={{ height: "100%", width: `${(completedList.length / sessionList.length) * 100}%`, background: "#8B5CF6", transition: "width .2s" }} />
                    </div>
                    <div style={{ fontSize: 13, color: C.txt, marginBottom: 4 }}>{completedList.length} / {sessionList.length} completed</div>
                    {recordingSession && <div style={{ fontSize: 12, color: "#8B5CF6", fontFamily: "monospace" }}>▶ {recordingSession.id} · {recordingSession.lang}</div>}
                  </div>
                )}
                {captureDone && (
                  <div>
                    <div style={{ fontSize: 13, color: C.green, fontWeight: 700, marginBottom: 6 }}>✓ {sessionList.length} sessions captured</div>
                    <div style={{ padding: 8, borderRadius: 6, background: C.green+"10", border: `1px solid ${C.green}22`, fontSize: 12, color: C.green, marginBottom: 6 }}>Speaker IDs de-identified · Transcripts generated</div>
                    {sessionList.filter(s=>s.issue).length > 0 && <div style={{ padding: 8, borderRadius: 6, background: C.amber+"10", border: `1px solid ${C.amber}22`, fontSize: 12, color: C.amber, marginBottom: 8 }}>{sessionList.filter(s=>s.issue).length} sessions flagged</div>}
                    <button style={btn(C.amber, false, { width: "100%" })} onClick={() => advance(2)}>Run QC →</button>
                  </div>
                )}
              </div>
            </div>
            {/* Middle: meeting visual */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <MeetingGrid
                participants={PAX[meetingType]}
                lang={langList[0]}
                captureRunning={captureRunning}
                captureDone={captureDone}
                activeSpeaker={activeSpeaker}
                currentSession={displaySession}
              />
            </div>
            {/* Right: session log */}
            <div style={{ flex: "0 0 240px" }}>
              <div style={cardS}>
                <div style={{ fontSize: 13, fontWeight: 700, color: C.hi, marginBottom: 8 }}>Session Log</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 3, maxHeight: 360, overflowY: "auto" }}>
                  {sessionList.map(s => {
                    const status = sessionStatuses[s.id] || "scheduled";
                    const statusColor = status==="completed" ? C.green : status==="recording" ? "#8B5CF6" : C.txt+"44";
                    return (
                      <div key={s.id} style={{ display: "flex", alignItems: "center", gap: 6, padding: "4px 8px", borderRadius: 5, background: status==="recording" ? "#8B5CF608" : C.bg, border: `1px solid ${status==="completed"&&s.issue ? C.amber+"44" : status==="recording" ? "#8B5CF644" : C.bdr}`, fontSize: 11, transition: "all .3s" }}>
                        <span style={{ color: statusColor, width: 8, flexShrink: 0 }}>{status==="completed" ? "●" : status==="recording" ? "◉" : "○"}</span>
                        <span style={{ fontFamily: "monospace", color: C.hi, minWidth: 50 }}>{s.id}</span>
                        <span style={{ color: C.cyan, flex: 1 }}>{s.lang}</span>
                        {s.issue && status==="completed" && <span style={{ color: C.amber, fontSize: 9 }}>⚠️</span>}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        );
      })()}

      {/* STAGE 2 — QC */}
      {stage === 2 && (
        <div style={{ display: "flex", gap: 16 }}>
          <div style={{ flex: "0 0 280px" }}>
            <div style={cardS}>
              <div style={{ fontSize: 18, fontWeight: 800, color: "#fff", marginBottom: 12 }}><span style={{ color: C.amber }}>3.</span> Quality Control</div>
              {[["autoQC",autoQC,setAutoQC,"Automated QC","Speech quality · Agenda completeness · Duration"],["humanReview",humanReview,setHumanReview,"Human Review","Spot-check flagged sessions"]].map(([key,val,set,label,desc]) => (
                <label key={key} style={{ display: "flex", alignItems: "flex-start", gap: 8, marginBottom: 10, cursor: "pointer" }}>
                  <input type="checkbox" checked={val} onChange={() => set(v=>!v)} style={{ marginTop: 2, accentColor: C.amber }} />
                  <div><div style={{ fontSize: 13, fontWeight: 700, color: val ? C.hi : C.txt }}>{label}</div><div style={{ fontSize: 11, color: C.txt }}>{desc}</div></div>
                </label>
              ))}
              {!qcRunning && !qcDone && <button style={btn(C.amber, false, { width: "100%", opacity: (!autoQC && !humanReview) ? 0.4 : 1 })} onClick={runQC} disabled={!autoQC && !humanReview}>Run QC →</button>}
              {(qcRunning || qcDone) && (
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                    <span style={{ color: C.green, fontWeight: 700, fontSize: 14 }}>✓ Pass: {qcPass}</span>
                    <span style={{ color: C.red, fontWeight: 700, fontSize: 14 }}>✗ Fail: {qcFail}</span>
                  </div>
                  <div style={{ height: 4, borderRadius: 3, background: C.bdr, overflow: "hidden", marginBottom: 6 }}>
                    <div style={{ height: "100%", width: `${((qcPass+qcFail)/sessionList.length)*100}%`, background: C.amber, transition: "width .15s" }} />
                  </div>
                  {qcDone && <div><div style={{ fontSize: 11, color: C.green, marginBottom: 8 }}>Re-work rate: {((qcFail/sessionList.length)*100).toFixed(1)}% &lt; 5% ✓</div><button style={btn(C.orange, false, { width: "100%" })} onClick={() => advance(3)}>Review Docs →</button></div>}
                </div>
              )}
            </div>
          </div>
          <div style={{ flex: 1 }}>
            <div style={cardS}>
              <div style={{ fontSize: 15, fontWeight: 700, color: C.hi, marginBottom: 8 }}>QC Results</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 3, maxHeight: 420, overflowY: "auto" }}>
                {sessionList.map((s, idx) => {
                  const failCount = Math.max(1, Math.round(sessionList.length*0.04));
                  const passed = qcDone ? idx < sessionList.length - failCount : null;
                  return (
                    <div key={s.id} style={{ display: "flex", alignItems: "center", gap: 8, padding: "5px 10px", borderRadius: 6, background: C.bg, border: `1px solid ${passed===null ? C.bdr : passed ? C.green+"33" : C.red+"33"}`, fontSize: 12 }}>
                      <span style={{ color: passed===null ? C.txt+"44" : passed ? C.green : C.red, width: 12 }}>{passed===null ? "○" : passed ? "✓" : "✗"}</span>
                      <span style={{ fontFamily: "monospace", color: C.hi, minWidth: 54 }}>{s.id}</span>
                      <span style={{ color: C.cyan, minWidth: 70 }}>{s.lang}</span>
                      <span style={{ color: C.txt, flex: 1 }}>{s.format}</span>
                      {s.issue && <span style={{ color: C.amber, fontSize: 11 }}>{s.issue}</span>}
                      {qcDone && !passed && <span style={{ color: C.red, fontSize: 11, fontFamily: "monospace" }}>→ Re-record</span>}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* STAGE 3 — DOCS */}
      {stage === 3 && (
        <div style={{ display: "flex", gap: 16 }}>
          <div style={{ flex: "0 0 260px" }}>
            <div style={cardS}>
              <div style={{ fontSize: 18, fontWeight: 800, color: "#fff", marginBottom: 8 }}><span style={{ color: C.orange }}>4.</span> Meeting Docs</div>
              <div style={{ fontSize: 11, color: C.txt, marginBottom: 8 }}>Click a session to review its artifacts</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 3, maxHeight: 300, overflowY: "auto", marginBottom: 10 }}>
                {reviewSet.map(s => {
                  const v = validations[s.id];
                  return (
                    <button key={s.id} onClick={() => setSelectedSess(s.id)} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "6px 10px", borderRadius: 6, background: selectedSess===s.id ? C.orange+"15" : C.bg, border: `1px solid ${selectedSess===s.id ? C.orange : v ? C.green+"44" : C.bdr}`, cursor: "pointer", fontSize: 12, textAlign: "left", color: C.hi, fontFamily: "inherit" }}>
                      <span>{s.id} · {s.lang}</span>
                      {v && <span style={{ color: v==="approved" ? C.green : C.amber, fontSize: 11 }}>{v==="approved" ? "✓" : "✎"}</span>}
                    </button>
                  );
                })}
              </div>
              <div style={{ fontSize: 11, color: C.txt, marginBottom: 8 }}>Validated: {Object.keys(validations).length} / {reviewSet.length}</div>
              {allValidated && <button style={btn(C.green, false, { width: "100%" })} onClick={() => advance(4)}>Package Dataset →</button>}
            </div>
          </div>
          <div style={{ flex: 1 }}>
            {selectedSess ? (() => {
              const art = getArtifact(selectedSess);
              const v = validations[selectedSess];
              const sess = sessionList.find(s => s.id === selectedSess);
              return (
                <div style={cardS}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                    <div><span style={{ fontFamily: "monospace", fontSize: 14, fontWeight: 700, color: C.hi }}>{selectedSess}</span><span style={{ fontSize: 12, color: C.txt, marginLeft: 8 }}>{sess?.lang} · {sess?.participants}p · {sess?.dur}</span></div>
                    {!v && (
                      <div style={{ display: "flex", gap: 6 }}>
                        <button onClick={() => setValidations(a => ({...a, [selectedSess]: "approved"}))} style={{ padding: "4px 12px", borderRadius: 5, fontSize: 12, fontWeight: 700, background: C.green+"18", border: `1px solid ${C.green}44`, color: C.green, cursor: "pointer", fontFamily: "inherit" }}>✓ Approve</button>
                        <button onClick={() => setValidations(a => ({...a, [selectedSess]: "edited"}))} style={{ padding: "4px 12px", borderRadius: 5, fontSize: 12, fontWeight: 700, background: C.amber+"18", border: `1px solid ${C.amber}44`, color: C.amber, cursor: "pointer", fontFamily: "inherit" }}>✎ Request Edit</button>
                      </div>
                    )}
                    {v && <span style={{ fontSize: 12, fontWeight: 700, color: v==="approved" ? C.green : C.amber }}>{v==="approved" ? "✓ Approved" : "✎ Edit Requested"}</span>}
                  </div>
                  {[["Meeting Notes", art.notes, C.hi], ["Agenda Summary", art.agenda, C.txt]].map(([title, content, col]) => (
                    <div key={title} style={{ padding: 10, borderRadius: 6, background: C.bg, border: `1px solid ${C.bdr}`, marginBottom: 8 }}>
                      <div style={{ fontSize: 11, fontWeight: 700, color: C.txt, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 4 }}>{title}</div>
                      <div style={{ fontSize: 13, color: col, lineHeight: 1.5 }}>{content}</div>
                    </div>
                  ))}
                  <div style={{ padding: 10, borderRadius: 6, background: C.bg, border: `1px solid ${C.bdr}`, marginBottom: 8 }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: C.txt, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 6 }}>Action Items</div>
                    {art.actions.map((a, i) => (
                      <div key={i} style={{ display: "flex", gap: 6, marginBottom: 4, fontSize: 13, color: C.hi }}>
                        <span style={{ color: C.orange, fontWeight: 700, flexShrink: 0 }}>{i+1}.</span><span>{a}</span>
                      </div>
                    ))}
                  </div>
                  <div style={{ padding: 8, borderRadius: 6, background: C.accent+"10", border: `1px solid ${C.accent}22`, fontSize: 11, color: C.accent, fontWeight: 600 }}>
                    Content Writer Validation — Review notes and action items for accuracy before approval
                  </div>
                </div>
              );
            })() : (
              <div style={{ ...cardS, display: "flex", alignItems: "center", justifyContent: "center", minHeight: 200, color: C.txt, fontSize: 13 }}>
                ← Select a session to view its artifacts
              </div>
            )}
          </div>
        </div>
      )}

      {/* STAGE 4 — DELIVER */}
      {stage === 4 && (
        <div style={{ display: "flex", gap: 16 }}>
          <div style={{ flex: "0 0 300px" }}>
            <div style={cardS}>
              <div style={{ fontSize: 18, fontWeight: 800, color: "#fff", marginBottom: 10 }}><span style={{ color: C.green }}>5.</span> Final Delivery</div>
              {!delivered && <button style={btn(C.green, false, { width: "100%" })} onClick={() => setTimeout(() => setDelivered(true), 800)}>📦 Finalize Dataset Delivery</button>}
              {delivered && (
                <div>
                  <div style={{ fontSize: 16, color: C.green, fontWeight: 700, marginBottom: 10 }}>✓ Dataset Delivery Ready</div>
                  {[["Total sessions",sessionList.length],["Languages covered",uniqueLangs.length],["QC pass rate",`${(100-parseFloat(((qcFail/sessionList.length)*100).toFixed(1)))}%`],["Flagged & resolved",sessionList.filter(s=>s.issue).length],["Docs validated",Object.keys(validations).length],["Delivery format","MP4 + JSONL + PDF"],["Status","✓ Delivery-ready"]].map(([l,v]) => (
                    <div key={l} style={{ display: "flex", justifyContent: "space-between", fontSize: 13, padding: "5px 0", borderBottom: `1px solid ${C.bdr}` }}>
                      <span style={{ color: C.txt }}>{l}</span><span style={{ color: l==="Status" ? C.green : C.hi, fontWeight: 700 }}>{v}</span>
                    </div>
                  ))}
                  <button style={btn(C.cyan, true, { width: "100%", marginTop: 10 })} onClick={() => { setStage(0); setMaxStage(0); setSessionStatuses({}); setCaptureRunning(false); setCaptureDone(false); setAutoQC(false); setHumanReview(false); setQcRunning(false); setQcDone(false); setQcPass(0); setQcFail(0); setSelectedSess(null); setValidations({}); setDelivered(false); }}>New Campaign</button>
                </div>
              )}
            </div>
          </div>
          <div style={{ flex: 1 }}>
            <div style={cardS}>
              <div style={{ fontSize: 15, fontWeight: 700, color: C.hi, marginBottom: 10 }}>Delivery Manifest</div>
              <div style={{ padding: 14, borderRadius: 8, background: C.bg, border: `1px solid ${C.bdr}`, fontFamily: "monospace", fontSize: 12, color: C.txt, lineHeight: 2 }}>
                <div style={{ color: C.cyan, fontWeight: 700, marginBottom: 4 }}>MTGDC-{Date.now().toString(36).toUpperCase().slice(-10)}</div>
                {[["Campaign","Multilingual Online Meeting Data Collection"],["Languages",uniqueLangs.join(", ")],["Meeting type",meetingType],["Sessions delivered",sessionList.length],["Total duration (est.)",`${Math.round(sessionList.reduce((a,s)=>a+parseInt(s.dur),0)/60)}h`],["Formats",activeFmts.join(", ")||"Agenda discussion"],["QC method",[autoQC&&"Automated",humanReview&&"Human Review"].filter(Boolean).join(" + ")||"—"],["Transcription","✓ Multi-language ASR"],["PII scrub","✓ Speaker de-identification"],["Consent","✓ GDPR + Regional"],["Pipeline","TP.ai MTGDC v1.0"],["Status",delivered?"✓ Delivery-ready":"⏳ Packaging..."]].map(([k,v]) => (
                  <div key={k}><strong style={{color:C.hi}}>{k}:</strong> <span style={{color:k==="Status"?(delivered?C.green:C.amber):k==="Transcription"||k==="PII scrub"||k==="Consent"?C.green:"inherit"}}>{v}</span><br/></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ===== HDC: CLIP DATA =====
const HDC_CLIPS = [
  { id: "CLR-001", city: "Chennai",   gender: "F", age: 24, device: "Android", dur: 7.2,  snr: 18, asr: "Please confirm my appointment for next Tewsday afternoon.",       corrected: "Please confirm my appointment for next Tuesday afternoon." },
  { id: "CLR-002", city: "Mumbai",    gender: "M", age: 38, device: "iPhone",  dur: 4.1,  snr: 5,  asr: "[inaudible — heavy background noise throughout]",                corrected: null },
  { id: "CLR-003", city: "Bengaluru", gender: "F", age: 22, device: "iPhone",  dur: 8.4,  snr: 24, asr: "I need to cancle the subscription I signed up last month.",       corrected: "I need to cancel the subscription I signed up for last month." },
  { id: "CLR-004", city: "Hyderabad", gender: "M", age: 45, device: "Android", dur: 2.8,  snr: 19, asr: "[clip truncated — too short]",                                    corrected: null },
  { id: "CLR-005", city: "Delhi",     gender: "F", age: 31, device: "iPhone",  dur: 9.1,  snr: 21, asr: "What are the charges for international data roaming?",            corrected: "What are the charges for international data roaming?" },
  { id: "CLR-006", city: "Pune",      gender: "M", age: 27, device: "Samsung", dur: 11.3, snr: 16, asr: "My internet has been slow since yestaday evening.",               corrected: "My internet has been slow since yesterday evening." },
  { id: "CLR-007", city: "Kolkata",   gender: "F", age: 52, device: "Android", dur: 6.7,  snr: 7,  asr: "[background music detected — music-speech ratio 0.78]",          corrected: null },
  { id: "CLR-008", city: "Ahmedabad", gender: "M", age: 29, device: "iPhone",  dur: 12.5, snr: 26, asr: "I would like to upgrade my plan to the premium tier.",            corrected: "I would like to upgrade my plan to the premium tier." },
];

// ===== HUMAN DATA COLLECTION DEMO =====
function HumanDataCollectDemo() {
  const [useCase, setUseCase] = useState(null);
  if (useCase === "voice") return <VoiceClipHDC onBack={() => setUseCase(null)} />;
  if (useCase === "meeting") return <MeetingDataCollectDemo onBack={() => setUseCase(null)} />;
  return (
    <div style={{ background: C.bg, color: C.txt, fontFamily: "'TP Sans','DM Sans',sans-serif", minHeight: "calc(100vh - 112px)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "32px 24px" }}>
      <div style={{ fontSize: 12, fontWeight: 700, color: C.txt, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 8, textAlign: "center" }}>Human Data Collection</div>
      <div style={{ fontSize: 28, fontWeight: 800, color: C.hi, marginBottom: 32, textAlign: "center" }}>Select a use case</div>
      <div style={{ display: "flex", gap: 20, flexWrap: "wrap", justifyContent: "center", width: "100%", maxWidth: 900 }}>
        {[
          { key: "voice", icon: "📡", label: "Voice Clip Collection", color: C.cyan, desc: "Crowdsourced short voice recordings from mobile contributors across India. ASR transcription, SNR filtering, and transcript annotation.", tag: "5 stages · HDC v1.0" },
          { key: "meeting", icon: "🌐", label: "Multilingual Online Meeting Data Collection", color: C.accent, desc: "Remote corporate meeting recordings across 8 languages and 4 meeting formats. QC, artifact generation, and content writer validation.", tag: "5 stages · MTGDC v1.0" },
        ].map(({ key, icon, label, color, desc, tag }) => (
          <div key={key} onClick={() => setUseCase(key)}
            style={{ flex: "1 1 340px", maxWidth: 420, padding: "32px 28px", borderRadius: 16, cursor: "pointer", border: `1px solid ${color}44`, background: C.card, transition: "border-color .2s, box-shadow .2s, transform .2s" }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = color; e.currentTarget.style.boxShadow = `0 12px 40px ${color}22`; e.currentTarget.style.transform = "translateY(-3px)"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = color+"44"; e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "none"; }}>
            <div style={{ fontSize: 36, marginBottom: 14 }}>{icon}</div>
            <div style={{ fontSize: 18, fontWeight: 700, color, marginBottom: 10, lineHeight: 1.3 }}>{label}</div>
            <div style={{ fontSize: 14, color: C.txt, lineHeight: 1.7, marginBottom: 14 }}>{desc}</div>
            <div style={{ fontSize: 12, color, fontWeight: 600, letterSpacing: "0.05em" }}>{tag} →</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function VoiceClipHDC({ onBack }) {
  const [stage, setStage] = useState(0);
  const [maxStage, setMaxStage] = useState(0);
  const [dataType, setDataType] = useState("Voice Clips");
  const [geography, setGeography] = useState("India");
  const [target, setTarget] = useState("500 clips");
  const [duration, setDuration] = useState("5–15s");
  const [capturing, setCapturing] = useState(false);
  const [capProg, setCapProg] = useState(0);
  const [capDone, setCapDone] = useState(false);
  const [minSNR, setMinSNR] = useState(10);
  const [minDur, setMinDur] = useState(5);
  const [annotations, setAnnotations] = useState({});
  const [packed, setPacked] = useState(false);

  const advance = (n) => { setStage(n); setMaxStage(m => Math.max(m, n)); };
  const runCapture = () => {
    setCapturing(true); setCapProg(0);
    const st = Date.now();
    const t = () => { const p = Math.min(100, ((Date.now() - st) / 3000) * 100); setCapProg(p); if (p < 100) requestAnimationFrame(t); else { setCapturing(false); setCapDone(true); } };
    requestAnimationFrame(t);
  };
  const reset = () => { setStage(0); setMaxStage(0); setCapDone(false); setCapProg(0); setCapturing(false); setMinSNR(10); setMinDur(5); setAnnotations({}); setPacked(false); };

  const filtered = HDC_CLIPS.filter(c => c.snr >= minSNR && c.dur >= minDur);
  const passCount = filtered.length;
  const annotateSet = filtered.slice(0, 5);
  const annotationsDone = annotateSet.length > 0 && annotateSet.every(c => annotations[c.id]);
  const approvedCount = Object.values(annotations).filter(v => v === "approved").length;
  const correctedCount = Object.values(annotations).filter(v => v === "corrected").length;

  const STAGE_C = [C.cyan, "#8B5CF6", C.amber, C.orange, C.green];
  const STAGE_L = ["Campaign", "Capture", "Filter", "Annotate", "Package"];

  return (
    <div style={{ background: C.bg, color: C.txt, fontFamily: "'TP Sans','DM Sans',sans-serif", minHeight: "calc(100vh - 112px)", padding: "10px 24px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10, borderBottom: `1px solid ${C.bdr}`, paddingBottom: 8 }}>
        <button style={btn(C.txt, true, { padding: "4px 10px", fontSize: 13 })} onClick={onBack}>← Use Cases</button>
        <span style={{ fontSize: 12, fontWeight: 700, color: C.txt, letterSpacing: "0.1em", textTransform: "uppercase" }}>Voice Clip Collection</span>
      </div>
      <DemoNav stage={stage} stageLabels={STAGE_L} stageColors={STAGE_C} maxStage={maxStage} advance={advance} label="" />

      {/* STAGE 0: CAMPAIGN */}
      {stage === 0 && (
        <div style={{ display: "flex", gap: 16 }}>
          <div style={{ flex: "0 0 320px" }}>
            <div style={cardS}>
              <div style={{ fontSize: 36, fontWeight: 800, color: "#fff", marginBottom: 12 }}><span style={{ color: C.cyan }}>1.</span> Campaign Design</div>
              <ChipGroup label="Data Type" options={["Voice Clips","Screen Recordings","Form Responses","Photo Submissions"]} value={dataType} onChange={setDataType} color={C.cyan} />
              <ChipGroup label="Geography" options={["India","Southeast Asia","LATAM","Europe"]} value={geography} onChange={setGeography} color={C.cyan} />
              <ChipGroup label="Target Volume" options={["100 clips","500 clips","1,000 clips","5,000 clips"]} value={target} onChange={setTarget} color={C.cyan} />
              <ChipGroup label="Clip Duration" options={["3–10s","5–15s","10–30s","30–60s"]} value={duration} onChange={setDuration} color={C.cyan} />
              <button style={btn(C.cyan, false, { width: "100%", marginTop: 8 })} onClick={() => advance(1)}>Launch Campaign →</button>
            </div>
          </div>
          <div style={{ flex: 1 }}>
            <div style={cardS}>
              <div style={{ fontSize: 22, fontWeight: 700, color: C.hi, marginBottom: 10 }}>Campaign Brief</div>
              <div style={{ padding: 14, borderRadius: 8, background: C.bg, border: `1px solid ${C.bdr}`, fontFamily: "monospace", fontSize: 20, color: C.txt, lineHeight: 2 }}>
                <div style={{ color: C.cyan, fontWeight: 700, marginBottom: 4 }}>HDC-{Date.now().toString(36).toUpperCase().slice(-6)}</div>
                {[["Type", dataType], ["Geography", geography], ["Target", target], ["Duration", duration], ["Consent", "✓ GDPR + Regional"], ["Anonymization", "✓ Voice-print scrub on ingest"], ["Status", "⏳ Ready to launch"]].map(([k, v]) => (
                  <div key={k}><strong style={{ color: C.hi }}>{k}:</strong> <span style={{ color: k === "Consent" || k === "Anonymization" ? C.green : k === "Status" ? C.amber : "inherit" }}>{v}</span><br/></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* STAGE 1: CAPTURE */}
      {stage === 1 && (
        <div style={{ display: "flex", gap: 16 }}>
          <div style={{ flex: "0 0 280px" }}>
            <div style={cardS}>
              <div style={{ fontSize: 36, fontWeight: 800, color: "#fff", marginBottom: 10 }}><span style={{ color: "#8B5CF6" }}>2.</span> Data Capture</div>
              {!capturing && !capDone && <button style={btn("#8B5CF6", false, { width: "100%" })} onClick={runCapture}>📡 Simulate Ingestion</button>}
              {capturing && <div><div style={{ fontSize: 20, color: "#8B5CF6", fontWeight: 600, marginBottom: 6 }}>Participants submitting...</div><div style={{ height: 5, borderRadius: 3, background: C.bdr, overflow: "hidden", marginBottom: 4 }}><div style={{ height: "100%", width: `${capProg}%`, background: "#8B5CF6", transition: "width .05s" }} /></div><div style={{ fontSize: 18, color: C.txt }}>{Math.round(capProg / 100 * HDC_CLIPS.length)} / {HDC_CLIPS.length} clips received</div></div>}
              {capDone && <div><div style={{ fontSize: 22, color: C.green, fontWeight: 600, marginBottom: 6 }}>✓ {HDC_CLIPS.length} clips ingested</div><div style={{ padding: 8, borderRadius: 6, background: C.green + "10", border: `1px solid ${C.green}22`, fontSize: 18, color: C.green, marginBottom: 10 }}>Voice-print scrub complete · PII metadata stripped</div><button style={btn(C.amber, false, { width: "100%" })} onClick={() => advance(2)}>Apply QA Filters →</button></div>}
            </div>
          </div>
          <div style={{ flex: 1 }}>
            <div style={cardS}>
              <div style={{ fontSize: 22, fontWeight: 700, color: C.hi, marginBottom: 8 }}>Ingested Clips</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 4, opacity: capDone ? 1 : capturing ? 0.35 : 0.07, transition: "opacity .6s" }}>
                {HDC_CLIPS.map(clip => (
                  <div key={clip.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "6px 10px", borderRadius: 6, background: C.bg, border: `1px solid ${C.bdr}`, fontSize: 18 }}>
                    <span style={{ fontFamily: "monospace", color: C.hi, minWidth: 62 }}>{clip.id}</span>
                    <span style={{ color: C.txt, minWidth: 65 }}>{clip.city}</span>
                    <span style={{ color: C.txt, minWidth: 40 }}>{clip.gender}/{clip.age}</span>
                    <span style={{ color: C.txt, minWidth: 56 }}>{clip.device}</span>
                    <span style={{ color: C.txt, minWidth: 32 }}>{clip.dur}s</span>
                    <span style={{ color: clip.snr >= 10 ? C.green : C.red, minWidth: 62, fontFamily: "monospace" }}>SNR {clip.snr}dB</span>
                    <div style={{ flex: 1, height: 3, background: C.bdr, borderRadius: 2 }}>
                      <div style={{ width: `${Math.min(100, clip.snr * 3.2)}%`, height: "100%", background: clip.snr >= 10 ? C.green + "99" : C.red + "99", borderRadius: 2 }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* STAGE 2: FILTER */}
      {stage === 2 && (
        <div style={{ display: "flex", gap: 16 }}>
          <div style={{ flex: "0 0 280px" }}>
            <div style={cardS}>
              <div style={{ fontSize: 36, fontWeight: 800, color: "#fff", marginBottom: 12 }}><span style={{ color: C.amber }}>3.</span> QA Filters</div>
              {[{ label: "Min SNR", val: minSNR, set: setMinSNR, min: 0, max: 30, unit: "dB", color: C.amber }, { label: "Min Duration", val: minDur, set: setMinDur, min: 1, max: 15, unit: "s", color: C.amber }].map(({ label, val, set, min, max, unit, color }) => (
                <div key={label} style={{ marginBottom: 14 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                    <span style={{ fontSize: 20, fontWeight: 700, color: C.hi }}>{label}</span>
                    <span style={{ fontSize: 20, color, fontFamily: "monospace" }}>{val}{unit}</span>
                  </div>
                  <input type="range" min={min} max={max} value={val} onChange={e => set(+e.target.value)} style={{ width: "100%", accentColor: color }} />
                </div>
              ))}
              <div style={{ padding: 10, borderRadius: 6, background: C.bg, border: `1px solid ${C.bdr}`, marginBottom: 12 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24, marginBottom: 6 }}>
                  <span style={{ color: C.green, fontWeight: 700 }}>✓ Pass: {passCount}</span>
                  <span style={{ color: C.red, fontWeight: 700 }}>✗ Fail: {HDC_CLIPS.length - passCount}</span>
                </div>
                <div style={{ height: 5, borderRadius: 3, background: C.bdr, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${(passCount / HDC_CLIPS.length) * 100}%`, background: C.green, transition: "width .3s" }} />
                </div>
              </div>
              <button style={btn(C.orange, false, { width: "100%" })} onClick={() => advance(3)}>Apply → Annotate</button>
            </div>
          </div>
          <div style={{ flex: 1 }}>
            <div style={cardS}>
              <div style={{ fontSize: 22, fontWeight: 700, color: C.hi, marginBottom: 8 }}>Filter Results</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                {HDC_CLIPS.map(clip => {
                  const pass = clip.snr >= minSNR && clip.dur >= minDur;
                  const reason = !pass ? (clip.snr < minSNR ? `SNR ${clip.snr}dB < ${minSNR}dB` : `${clip.dur}s < ${minDur}s`) : null;
                  return (
                    <div key={clip.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "7px 10px", borderRadius: 6, background: C.bg, border: `1px solid ${pass ? C.green + "44" : C.red + "33"}`, fontSize: 18, transition: "border-color .2s" }}>
                      <span style={{ color: pass ? C.green : C.red, fontSize: 24, width: 14 }}>{pass ? "✓" : "✗"}</span>
                      <span style={{ fontFamily: "monospace", color: C.hi, minWidth: 62 }}>{clip.id}</span>
                      <span style={{ color: C.txt }}>{clip.city} · {clip.gender}/{clip.age} · {clip.device}</span>
                      <span style={{ color: C.txt }}>{clip.dur}s · {clip.snr}dB</span>
                      {reason && <span style={{ color: C.red, marginLeft: "auto", fontFamily: "monospace" }}>{reason}</span>}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* STAGE 3: ANNOTATE */}
      {stage === 3 && (
        <div style={{ display: "flex", gap: 16 }}>
          <div style={{ flex: "0 0 280px" }}>
            <div style={cardS}>
              <div style={{ fontSize: 36, fontWeight: 800, color: "#fff", marginBottom: 8 }}><span style={{ color: C.orange }}>4.</span> Transcript Review</div>
              <div style={{ padding: 8, borderRadius: 6, background: C.cyan + "10", border: `1px solid ${C.cyan}22`, fontSize: 18, color: C.cyan, marginBottom: 10 }}>
                {passCount} clips passed · showing {annotateSet.length} for review
              </div>
              <div style={{ padding: 8, borderRadius: 6, background: C.bg, border: `1px solid ${C.bdr}`, fontSize: 18, color: C.txt, lineHeight: 1.8, marginBottom: 10 }}>
                <div><strong style={{ color: C.green }}>✓ Approved:</strong> {approvedCount}</div>
                <div><strong style={{ color: C.amber }}>✎ Corrected:</strong> {correctedCount}</div>
                <div><strong style={{ color: C.txt }}>⏳ Pending:</strong> {annotateSet.length - approvedCount - correctedCount}</div>
              </div>
              {annotationsDone && <button style={btn(C.green, false, { width: "100%" })} onClick={() => advance(4)}>Package Dataset →</button>}
            </div>
          </div>
          <div style={{ flex: 1 }}>
            <div style={cardS}>
              <div style={{ fontSize: 22, fontWeight: 700, color: C.hi, marginBottom: 8 }}>ASR Transcript Review</div>
              {annotateSet.map(clip => {
                const ann = annotations[clip.id];
                const hasError = clip.corrected && clip.corrected !== clip.asr;
                return (
                  <div key={clip.id} style={{ padding: 10, borderRadius: 8, background: C.bg, border: `1px solid ${ann ? (ann === "corrected" ? C.amber + "55" : C.green + "44") : C.bdr}`, marginBottom: 8 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                      <div>
                        <span style={{ fontFamily: "monospace", fontSize: 18, fontWeight: 700, color: C.hi }}>{clip.id}</span>
                        <span style={{ fontSize: 16, color: C.txt, marginLeft: 8 }}>{clip.city} · {clip.gender}/{clip.age} · {clip.dur}s · SNR {clip.snr}dB</span>
                      </div>
                      {!ann && (
                        <div style={{ display: "flex", gap: 4 }}>
                          <button onClick={() => setAnnotations(a => ({ ...a, [clip.id]: "approved" }))} style={{ padding: "3px 8px", borderRadius: 4, fontSize: 18, fontWeight: 700, background: C.green + "18", border: `1px solid ${C.green}33`, color: C.green, cursor: "pointer", fontFamily: "inherit" }}>✓ Approve</button>
                          {hasError && <button onClick={() => setAnnotations(a => ({ ...a, [clip.id]: "corrected" }))} style={{ padding: "3px 8px", borderRadius: 4, fontSize: 18, fontWeight: 700, background: C.amber + "18", border: `1px solid ${C.amber}33`, color: C.amber, cursor: "pointer", fontFamily: "inherit" }}>✎ Correct</button>}
                        </div>
                      )}
                      {ann && <span style={{ fontSize: 18, fontWeight: 700, color: ann === "corrected" ? C.amber : C.green }}>{ann === "corrected" ? "✎ Corrected" : "✓ Approved"}</span>}
                    </div>
                    <div style={{ fontSize: 20, color: ann === "corrected" ? C.txt + "88" : C.hi, lineHeight: 1.4, textDecoration: ann === "corrected" ? "line-through" : "none" }}>{clip.asr}</div>
                    {ann === "corrected" && clip.corrected && <div style={{ fontSize: 20, color: C.amber, lineHeight: 1.4, marginTop: 4 }}>{clip.corrected}</div>}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* STAGE 4: PACKAGE */}
      {stage === 4 && (
        <div style={{ display: "flex", gap: 16 }}>
          <div style={{ flex: "0 0 300px" }}>
            <div style={cardS}>
              <div style={{ fontSize: 36, fontWeight: 800, color: "#fff", marginBottom: 10 }}><span style={{ color: C.green }}>5.</span> Package Dataset</div>
              {!packed && <button style={btn(C.green, false, { width: "100%" })} onClick={() => setTimeout(() => setPacked(true), 1200)}>📦 Package</button>}
              {packed && (
                <div>
                  <div style={{ fontSize: 24, color: C.green, fontWeight: 700, marginBottom: 10 }}>🎉 Dataset ready</div>
                  {[["Total ingested", HDC_CLIPS.length], ["Passed QA", passCount], ["Annotated", annotateSet.length], ["Approved", approvedCount], ["Corrected", correctedCount], ["Rejected", HDC_CLIPS.length - passCount]].map(([l, v]) => (
                    <div key={l} style={{ display: "flex", justifyContent: "space-between", fontSize: 20, padding: "4px 0", borderBottom: `1px solid ${C.bdr}` }}>
                      <span style={{ color: C.txt }}>{l}</span><span style={{ color: C.hi, fontWeight: 700 }}>{v}</span>
                    </div>
                  ))}
                  <button style={btn(C.cyan, true, { width: "100%", fontSize: 20, marginTop: 10 })} onClick={reset}>New Campaign</button>
                </div>
              )}
            </div>
          </div>
          <div style={{ flex: 1 }}>
            <div style={cardS}>
              <div style={{ fontSize: 22, fontWeight: 700, color: C.hi, marginBottom: 8 }}>Dataset Manifest</div>
              <div style={{ padding: 14, borderRadius: 8, background: C.bg, border: `1px solid ${C.bdr}`, fontFamily: "monospace", fontSize: 20, color: C.txt, lineHeight: 2 }}>
                <div style={{ color: C.cyan, fontWeight: 700, fontSize: 18, letterSpacing: 1, marginBottom: 6 }}>HDC-{Date.now().toString(36).toUpperCase().slice(-10)}</div>
                {[["Campaign", `${dataType} · ${geography}`], ["Collected", new Date().toISOString().split("T")[0]], ["Pipeline", "TP.ai HDC v1.0"], ["Ingested", HDC_CLIPS.length + " clips"], ["QA filters", `SNR ≥ ${minSNR}dB · Duration ≥ ${minDur}s`], ["Passed QA", passCount + " clips"], ["Reviewed", Object.keys(annotations).length + " transcripts"], ["Anonymization", "✓ Voice-print scrub · Metadata stripped"], ["Consent", "✓ All participants consented"], ["Format", "WAV 16kHz mono + JSONL"], ["Status", packed ? "✓ Ready for delivery" : "⏳ Packaging..."]].map(([k, v]) => (
                  <div key={k}><strong style={{ color: C.hi }}>{k}:</strong> <span style={{ color: k === "Anonymization" || k === "Consent" ? C.green : k === "Status" ? (packed ? C.green : C.amber) : "inherit" }}>{v}</span><br/></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ===== STAGE LIST (kept for backward compat) =====
function StageList({ stages, color }) {
  return (
    <div>
      {stages.map((s, i) => (
        <div key={i} style={{ display: "flex", gap: 14, paddingBottom: 18, position: "relative" }}>
          {i < stages.length - 1 && (
            <div style={{ position: "absolute", left: 15, top: 34, height: "calc(100% - 10px)", width: 2, background: color + "20" }} />
          )}
          <div style={{ width: 32, height: 32, borderRadius: "50%", background: color + "15", border: `1.5px solid ${color}44`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 11, fontWeight: 800, color, zIndex: 1, position: "relative" }}>
            {i + 1}
          </div>
          <div style={{ paddingTop: 5 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: C.hi, marginBottom: 2 }}>{s.title}</div>
            <div style={{ fontSize: 11, color: C.txt, lineHeight: 1.55 }}>{s.desc}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ===== COMPARISON FOOTER =====
function ComparisonFooter() {
  return (
    <div style={{ marginTop: 40, paddingTop: 28, borderTop: `1px solid ${C.bdr}` }}>
      <div style={{ fontSize: 10, fontWeight: 700, color: C.txt, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 14 }}>Core Distinction</div>
      <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
        <div style={{ flex: "1 1 260px", padding: "14px 18px", borderRadius: 8, background: C.card, border: `1px solid ${C.bdr}` }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: C.accent, marginBottom: 6 }}>Generation</div>
          <div style={{ fontSize: 12, color: C.txt, lineHeight: 1.6 }}>Prescriptive — you define what the data should be, humans create it</div>
        </div>
        <div style={{ flex: "1 1 260px", padding: "14px 18px", borderRadius: 8, background: C.card, border: `1px solid ${C.bdr}` }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: C.cyan, marginBottom: 6 }}>Collection</div>
          <div style={{ fontSize: 12, color: C.txt, lineHeight: 1.6 }}>Descriptive — the world produces signals, humans capture and label them</div>
        </div>
      </div>
    </div>
  );
}

// ===== HUMAN DATA GENERATION TAB =====
const HDG_STAGES = [
  { title: "Task Design", desc: "Define domain, format, persona, tone, and difficulty level for the data to be authored." },
  { title: "Guideline Authoring", desc: "Specify what to write, what to avoid, and the quality criteria contributors must meet." },
  { title: "Contributor Onboarding", desc: "Train writers, subject-matter experts, or role-players on the task brief and quality standards." },
  { title: "Data Authoring", desc: "Contributors produce original content — conversations, prompts, responses, narratives, or code." },
  { title: "HITL Review", desc: "Human reviewers flag outputs that are low-quality, off-policy, or fail task requirements." },
  { title: "Metadata Tagging", desc: "Label each item with intent, language, sentiment, difficulty, and domain-specific attributes." },
  { title: "Provenance Documentation", desc: "Record who created each item, when, under which task brief, and with which quality score." },
];

const HDG_EXAMPLE_CHAT = [
  { role: "customer", text: "I just checked my bill and I've been charged twice.", sentiment: "frustrated", intent: "billing_dispute" },
  { role: "agent", text: "I'm sorry about that — let me take a look.", sentiment: "empathetic", intent: "acknowledge" },
  { role: "customer", text: "My account number is 4872-99X.", sentiment: "neutral", intent: "provide_info" },
  { role: "agent", text: "I see the duplicate charge. I'm reversing it now.", sentiment: "proactive", intent: "resolve" },
  { role: "customer", text: "Will this happen again?", sentiment: "concerned", intent: "reassurance_seek" },
  { role: "agent", text: "We've flagged your account for review. Anything else I can help with?", sentiment: "reassuring", intent: "confirm_action" },
];

function HumanDataGen() {
  return (
    <div style={{ padding: "32px 40px 48px", maxWidth: 1100, margin: "0 auto" }}>
      <div style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 900, color: "#fff", margin: "0 0 8px 0", letterSpacing: "-0.02em" }}>
          Human Data Generation
        </h2>
        <p style={{ fontSize: 14, color: C.hi, margin: "0 0 8px 0", maxWidth: 600 }}>
          Purpose-built data authored by people to meet precise training objectives.
        </p>
        <p style={{ fontSize: 12, color: C.txt, margin: 0, maxWidth: 680, lineHeight: 1.65 }}>
          Humans generate data intentionally according to clear task briefs — filling gaps that real-world data cannot cover such as rare scenarios, sensitive interactions, adversarial prompts, multilingual edge cases, or policy-driven content.
        </p>
      </div>

      <div style={{ display: "flex", gap: 32, flexWrap: "wrap", alignItems: "flex-start" }}>
        <div style={{ flex: "1 1 300px", minWidth: 260 }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: C.accent, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 18 }}>Key Stages</div>
          <StageList stages={HDG_STAGES} color={C.accent} />
        </div>

        <div style={{ flex: "1 1 320px", minWidth: 280 }}>
          <div style={{ ...cardS, borderColor: C.accent + "33" }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: C.accent, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 10 }}>
              Example — Synthetic Customer Support Conversation
            </div>
            <div style={{ padding: "10px 12px", borderRadius: 6, background: C.bg, border: `1px solid ${C.bdr}`, marginBottom: 12, fontSize: 11, color: C.txt, lineHeight: 1.6 }}>
              <span style={{ color: C.hi, fontWeight: 700 }}>Task Brief:</span>
              <br />
              <span style={{ fontStyle: "italic", color: C.txt }}>"Write a 6-turn chat between a frustrated customer double-charged on their bill and a support agent who resolves it."</span>
            </div>
            <div style={{ marginBottom: 12 }}>
              {HDG_EXAMPLE_CHAT.map((t, i) => <ChatBubble key={i} turn={t} labels={false} />)}
            </div>
            <div style={{ padding: "8px 10px", borderRadius: 6, background: C.accent + "0C", border: `1px solid ${C.accent}22`, fontSize: 10, color: C.txt, lineHeight: 1.6 }}>
              This conversation is then annotated with intent labels, per-turn sentiment, and resolution outcomes before entering an RLHF or fine-tuning corpus.
            </div>
          </div>
        </div>
      </div>

      <ComparisonFooter />
    </div>
  );
}

// ===== HUMAN DATA COLLECTION TAB =====
const HDC_STAGES = [
  { title: "Collection Design", desc: "Define what to capture, recording conditions, device requirements, and target demographics." },
  { title: "Consent & Ethics", desc: "Obtain informed consent from participants and meet privacy and regional compliance requirements." },
  { title: "Participant Recruitment", desc: "Recruit a balanced pool by accent, geography, age, gender, and domain-specific criteria." },
  { title: "Data Capture", desc: "Participants speak, record, gesture, or submit data via a controlled app or collection environment." },
  { title: "Ingestion & Validation", desc: "Automatically check audio levels, file formats, clip duration, and minimum quality thresholds." },
  { title: "Anonymization", desc: "Remove PII, blur faces, strip GPS and metadata, and verify re-identification risk meets threshold." },
  { title: "Annotation", desc: "Human annotators produce transcripts, bounding boxes, emotion tags, or intent labels per clip." },
  { title: "Dataset Packaging", desc: "Version, split (train/val/test), and deliver the dataset with a provenance manifest." },
];

const HDC_CHECKLIST = [
  "10,000 participants across 12 Indian cities",
  "Each records short spoken phrases on their phone",
  "Produces 500,000+ audio clips",
  "Noise thresholds enforced automatically",
  "Human annotators verify transcripts word-by-word",
  "Each clip tagged by city, age group, gender, device",
];

function HumanDataCollect() {
  return (
    <div style={{ padding: "32px 40px 48px", maxWidth: 1100, margin: "0 auto" }}>
      <div style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 900, color: "#fff", margin: "0 0 8px 0", letterSpacing: "-0.02em" }}>
          Human Data Collection
        </h2>
        <p style={{ fontSize: 14, color: C.hi, margin: "0 0 8px 0", maxWidth: 600 }}>
          Real-world signals responsibly captured, processed, and labeled by humans.
        </p>
        <p style={{ fontSize: 12, color: C.txt, margin: 0, maxWidth: 680, lineHeight: 1.65 }}>
          Human data collection focuses on capturing authentic behavior — speech, images, video, or interactions — through participant consent, controlled collection environments, and rigorous processing pipelines.
        </p>
      </div>

      <div style={{ display: "flex", gap: 32, flexWrap: "wrap", alignItems: "flex-start" }}>
        <div style={{ flex: "1 1 300px", minWidth: 260 }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: C.cyan, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 18 }}>Key Stages</div>
          <StageList stages={HDC_STAGES} color={C.cyan} />
        </div>

        <div style={{ flex: "1 1 320px", minWidth: 280 }}>
          <div style={{ ...cardS, borderColor: C.cyan + "33" }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: C.cyan, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 14 }}>
              Example — Voice Data Collection for Speech Recognition
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 16 }}>
              {HDC_CHECKLIST.map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 12, color: C.hi, lineHeight: 1.5 }}>
                  <span style={{ color: C.cyan, fontSize: 11, marginTop: 1, flexShrink: 0, fontWeight: 700 }}>✓</span>
                  {item}
                </div>
              ))}
            </div>
            <div style={{ padding: "8px 10px", borderRadius: 6, background: C.cyan + "0C", border: `1px solid ${C.cyan}22`, fontSize: 10, color: C.txt, lineHeight: 1.6 }}>
              This enables models to learn accent variation, code-switching, and natural speech rhythms that web data cannot provide.
            </div>
          </div>
        </div>
      </div>

      <ComparisonFooter />
    </div>
  );
}

// ===== CARD ICONS =====
function WarehouseIcon() {
  return (
    <div style={{ width: 80, height: 72, position: "relative" }}>
      <svg width="80" height="72" viewBox="0 0 80 72" fill="none">
        <rect x="10" y="24" width="60" height="44" rx="2" fill={C.amber+"12"} stroke={C.amber} strokeWidth="1.5"/>
        <polygon points="6,24 40,7 74,24" fill="none" stroke={C.amber} strokeWidth="1.5"/>
        <rect x="30" y="44" width="20" height="24" rx="1" fill={C.amber+"20"} stroke={C.amber+"70"} strokeWidth="1"/>
        <rect x="13" y="31" width="13" height="10" rx="1" fill={C.amber+"12"} stroke={C.amber+"55"} strokeWidth="1"/>
        <rect x="54" y="31" width="13" height="10" rx="1" fill={C.amber+"12"} stroke={C.amber+"55"} strokeWidth="1"/>
      </svg>
      <div style={{ position: "absolute", left: 10, right: 10, height: 2, background: `linear-gradient(90deg, transparent, ${C.amber}CC, transparent)`, animation: "scanDown 2.5s ease-in-out infinite" }} />
      <div style={{ position: "absolute", top: 0, right: 0, width: 20, height: 20, borderRadius: "50%", background: C.amber, fontSize: 12, fontWeight: 900, color: "#000", display: "flex", alignItems: "center", justifyContent: "center", animation: "alertPulse 1.8s ease-in-out infinite" }}>!</div>
    </div>
  );
}
function DrivingIcon() {
  return (
    <div style={{ width: 80, height: 72, position: "relative", overflow: "hidden" }}>
      {/* Road surface */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 26, background: "#181820" }}/>
      <div style={{ position: "absolute", bottom: 25, left: 0, right: 0, height: 1, background: C.cyan+"30" }}/>
      {/* Scrolling centre dashes */}
      <div style={{ position: "absolute", bottom: 11, left: -24, width: 260, display: "flex", gap: 10, animation: "roadScroll 0.9s linear infinite" }}>
        {[...Array(11)].map((_, i) => <div key={i} style={{ width: 14, height: 2, background: C.cyan+"55", flexShrink: 0 }}/>)}
      </div>
      {/* Speed lines left of car */}
      {[0,1,2].map(i => (
        <div key={i} style={{ position: "absolute", height: 1.5, left: 2, width: 13 - i*3, top: 27 + i*7, background: `linear-gradient(90deg, transparent, ${C.cyan}55)`, transformOrigin: "left center", animation: `speedLine 0.7s ${i*0.1}s ease-in-out infinite` }}/>
      ))}
      {/* Car side view */}
      <svg width="54" height="36" viewBox="0 0 54 36" fill="none" style={{ position: "absolute", bottom: 14, left: 13 }}>
        <rect x="3" y="13" width="48" height="14" rx="3" fill={C.cyan+"20"} stroke={C.cyan} strokeWidth="1.5"/>
        <path d="M11 13 L15 3 L38 3 L44 13Z" fill={C.cyan+"15"} stroke={C.cyan} strokeWidth="1.5"/>
        <path d="M16 12 L19 4 L35 4 L40 12Z" fill={C.cyan+"12"} stroke={C.cyan+"50"} strokeWidth="0.75"/>
        <circle cx="41" cy="27" r="7" fill="#0d0d14" stroke={C.cyan} strokeWidth="1.5"/>
        <circle cx="41" cy="27" r="2.5" fill={C.cyan+"35"}/>
        <circle cx="13" cy="27" r="7" fill="#0d0d14" stroke={C.cyan} strokeWidth="1.5"/>
        <circle cx="13" cy="27" r="2.5" fill={C.cyan+"35"}/>
        <rect x="49" y="16" width="4" height="3" rx="1" fill={C.cyan}/>
        <rect x="1"  y="16" width="3" height="3" rx="1" fill="#EF4444" opacity="0.85"/>
      </svg>
      {/* Headlight beam */}
      <div style={{ position: "absolute", right: 0, top: 27, height: 7, background: `linear-gradient(90deg, ${C.cyan}50, transparent)`, animation: "headGlow 1.6s ease-in-out infinite" }}/>
    </div>
  );
}
function SupportIcon() {
  return (
    <div style={{ width: 80, height: 72, position: "relative" }}>
      <div style={{ position: "absolute", top: 2, left: 0, width: 54, height: 30, borderRadius: "10px 10px 10px 2px", background: C.red+"18", border: `1.5px solid ${C.red}`, display: "flex", alignItems: "center", justifyContent: "center", gap: 6, animation: "chatFadeA 3s ease-in-out infinite" }}>
        {[0, 1, 2].map(i => <div key={i} style={{ width: 5, height: 5, borderRadius: "50%", background: C.red, animation: `dotBounce 1s ${i * 0.18}s ease-in-out infinite` }} />)}
      </div>
      <div style={{ position: "absolute", bottom: 2, right: 0, width: 54, height: 30, borderRadius: "10px 10px 2px 10px", background: C.green+"18", border: `1.5px solid ${C.green}`, display: "flex", alignItems: "center", justifyContent: "center", gap: 6, animation: "chatFadeB 3s ease-in-out infinite" }}>
        {[0, 1, 2].map(i => <div key={i} style={{ width: 5, height: 5, borderRadius: "50%", background: C.green, animation: `dotBounce 1s ${0.5 + i * 0.18}s ease-in-out infinite` }} />)}
      </div>
    </div>
  );
}
const CARD_ICONS = { warehouse: <WarehouseIcon />, driving: <DrivingIcon />, support: <SupportIcon /> };

// ===== SYNTHETIC HOME =====
function SyntheticHome({ hov, setHov, setJourney }) {
  return (
    <div style={{ position: "relative", display: "flex", flexDirection: "column", minHeight: "calc(100vh - 58px)" }}>
      {/* Banner */}
      <div style={{ flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", padding: "clamp(28px, 3.5vh, 48px) 2rem clamp(20px, 2.5vh, 36px)" }}>
        <div style={{ position: "relative", zIndex: 2, textAlign: "center", maxWidth: 680 }}>
          <img src="/tp-ai-data-services-logo.png" alt="TP.ai DataServices" style={{ display: "block", height: 26, width: "auto", objectFit: "contain", margin: "0 auto 0.4rem auto", opacity: 0.92 }} />
          <span style={{ display: "block", fontFamily: "'TP Sans', 'DM Sans', sans-serif", fontSize: "1.1rem", fontWeight: 700, letterSpacing: "0.32em", textTransform: "uppercase", color: "rgba(210,195,225,0.5)", marginBottom: "0.4rem" }}>Introducing</span>
          <h1 style={{ fontFamily: "'TP Sans', 'DM Sans', sans-serif", fontSize: "clamp(2.4rem, 6.5vw, 5rem)", fontWeight: 900, color: "#ffffff", lineHeight: 1.04, letterSpacing: "-0.025em", margin: "0 0 0.5rem 0", textShadow: "0 0 40px rgba(144,113,240,0.25), 0 2px 20px rgba(0,0,0,0.5)" }}>
            TP.ai <span style={{ color: "#9071f0" }}>Data</span>Gen
          </h1>
          <p style={{ fontSize: "clamp(0.95rem, 1.7vw, 1.15rem)", color: C.hi, lineHeight: 1.55, margin: "0 auto 0.25rem auto" }}>
            Machine-generated data created algorithmically to simulate real-world scenarios at scale.
          </p>
          <p style={{ fontSize: "clamp(0.85rem, 1.4vw, 1rem)", color: C.txt, lineHeight: 1.55, margin: "0 auto" }}>
            Used to expand coverage, stress-test models, and generate edge cases that are rare, sensitive, or unsafe to collect in the real world.
          </p>
        </div>
      </div>

      {/* Cards + badges */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "16px 32px 24px" }}>
      <div style={{ position: "relative", zIndex: 2, display: "flex", gap: 12, flexWrap: "nowrap", justifyContent: "center", marginBottom: 16, width: "100%", maxWidth: 1020 }}>
        {[
          { k: "warehouse", icon: "🏭", title: "Warehouse Safety", sub: "Image SDG", desc: "Generate synthetic warehouse images with workers, forklifts, safety violations, and edge cases from a single seed photo.", color: C.amber, brief: "Logistics client · 500 annotated images" },
          { k: "driving", icon: "🚗", title: "Self-Driving Car", sub: "Video SDG", desc: "Generate dashcam video clips with pedestrians, rain, night driving, and construction zones for perception training.", color: C.cyan, brief: "AV OEM · 200 video clips · 30fps" },
          { k: "support", icon: "💬", title: "Angry Customer Support", sub: "Text SDG", desc: "Generate customer support conversations with angry, sarcastic, and threatening customers for support AI training.", color: C.red, brief: "FitPulse wearable · 2,000 conversations" },
        ].map(j => (
          <div key={j.k}
            onMouseEnter={() => setHov(j.k)} onMouseLeave={() => setHov(null)}
            onClick={() => setJourney(j.k)}
            style={{ flex: "1 1 0", minWidth: 0, padding: "14px 16px", borderRadius: 14, cursor: "pointer", transition: "all .35s cubic-bezier(.17,.67,.35,1.15)", border: `1px solid ${hov === j.k ? j.color + "66" : C.bdr}`, background: hov === j.k ? j.color + "08" : C.card, transform: hov === j.k ? "translateY(-4px)" : "none", boxShadow: hov === j.k ? `0 14px 40px ${j.color}18` : "none" }}>
            <div style={{ marginBottom: 6 }}>{CARD_ICONS[j.k]}</div>
            <div style={{ fontSize: 20, fontWeight: 700, color: j.color, marginBottom: 3 }}>{j.title}</div>
            <div style={{ fontSize: 13, fontWeight: 700, color: j.color, letterSpacing: 1, opacity: 0.7, marginBottom: 6 }}>{j.sub}</div>
            <div style={{ fontSize: 13, color: C.txt, lineHeight: 1.5, marginBottom: 8 }}>{j.desc}</div>
            <div style={{ padding: "5px 12px", borderRadius: 6, background: j.color + "12", border: `1px solid ${j.color}22`, fontSize: 12, color: j.color, fontWeight: 600, display: "inline-block" }}>{j.brief}</div>
          </div>
        ))}
      </div>

      <div style={{ position: "relative", zIndex: 2, display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center" }}>
        <div style={{ padding: "7px 14px", borderRadius: 6, background: C.red + "10", border: `1px solid ${C.red}22`, fontSize: 14, color: C.red, fontWeight: 600 }}><HT s={9} /> Human-in-the-loop at every stage</div>
        <div style={{ padding: "7px 14px", borderRadius: 6, background: C.green + "10", border: `1px solid ${C.green}22`, fontSize: 14, color: C.green, fontWeight: 600 }}>🔒 GDPR · HIPAA · EU AI Act · SOC 2</div>
        <div style={{ padding: "7px 14px", borderRadius: 6, background: C.accent + "10", border: `1px solid ${C.accent}22`, fontSize: 14, color: C.accent, fontWeight: 600 }}>📋 Full compliance report per delivery</div>
      </div>
      </div>
    </div>
  );
}

// ===== MAIN APP =====
export default function App() {
  const [activeTab, setActiveTab] = useState(0);
  const [journey, setJourney] = useState(null);
  const [hov, setHov] = useState(null);

  return (
    <div style={{ minHeight: "100vh", background: C.bg, color: C.txt, fontFamily: "'TP Sans', 'DM Sans', sans-serif" }}>
      {/* Animated aurora orbs */}
      <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", overflow: "hidden" }}>
        <div style={{ position: "absolute", width: 1000, height: 1000, borderRadius: "50%", background: "radial-gradient(circle, rgba(124,58,237,0.55) 0%, transparent 70%)", filter: "blur(80px)", top: "-15%", left: "-5%", animation: "orbDrift1 18s ease-in-out infinite" }} />
        <div style={{ position: "absolute", width: 900, height: 900, borderRadius: "50%", background: "radial-gradient(circle, rgba(6,182,212,0.45) 0%, transparent 70%)", filter: "blur(80px)", bottom: "-15%", right: "-5%", animation: "orbDrift2 22s ease-in-out infinite" }} />
        <div style={{ position: "absolute", width: 750, height: 750, borderRadius: "50%", background: "radial-gradient(circle, rgba(167,51,255,0.40) 0%, transparent 70%)", filter: "blur(70px)", top: "25%", left: "35%", animation: "orbDrift3 16s ease-in-out infinite" }} />
        <div style={{ position: "absolute", width: 700, height: 700, borderRadius: "50%", background: "radial-gradient(circle, rgba(236,72,153,0.35) 0%, transparent 70%)", filter: "blur(70px)", top: "50%", left: "5%", animation: "orbDrift2 20s 4s ease-in-out infinite" }} />
      </div>
      {/* Blurred GIF strip — fixed at bottom across all tabs */}
      <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, height: 220, zIndex: 0, pointerEvents: "none", overflow: "hidden" }}>
        <img src="/banner.gif" alt="" aria-hidden="true" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", filter: "blur(14px)", opacity: 0.55, transform: "scale(1.05)" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(19,19,19,1) 0%, rgba(19,19,19,0.3) 50%, transparent 100%)" }} />
      </div>

      <div>
        <div style={{ padding: "0 3rem", height: 56, background: "hsl(0,0%,5%)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <img src="/tp-ai-data-services-logo.png" alt="TP.ai DataServices" style={{ height: 20, width: "auto", objectFit: "contain", objectPosition: "left center" }} />
          <div style={{ display: "flex", alignItems: "stretch", gap: 0, height: "100%" }}>
            {["Synthetic Data Generation", "Human Data Generation", "Human Data Collection"].map((label, i) => (
              <button key={i} onClick={() => setActiveTab(i)} style={{
                background: "none", border: "none",
                borderBottom: `2px solid ${activeTab === i ? C.accent : "transparent"}`,
                color: activeTab === i ? "#fff" : C.txt,
                cursor: "pointer", fontSize: 17.5, fontWeight: activeTab === i ? 700 : 500,
                fontFamily: "'TP Sans', 'DM Sans', sans-serif",
                padding: "0 24px", letterSpacing: "0.01em", whiteSpace: "nowrap",
                transition: "color .15s, border-color .15s",
              }}>{label}</button>
            ))}
          </div>
          <div style={{ display: "flex", alignItems: "center", paddingRight: "1.5rem" }}>
            <img src="/TP-logo.png" alt="TP" style={{ height: 26, width: "auto", objectFit: "contain" }} />
          </div>
        </div>
        <div style={{ height: 2, background: "linear-gradient(90deg, #5b21b6 0%, #9071f0 100%)" }} />
      </div>

      <div style={{ position: "relative", zIndex: 1 }}>
      <div style={{ display: activeTab === 0 ? "block" : "none" }}>
        {journey
          ? <PipelineDemo type={journey} onBack={() => setJourney(null)} />
          : <SyntheticHome hov={hov} setHov={setHov} setJourney={setJourney} />
        }
      </div>
      <div style={{ display: activeTab === 1 ? "block" : "none" }}>
        <HumanDataGenDemo />
      </div>
      <div style={{ display: activeTab === 2 ? "block" : "none" }}>
        <HumanDataCollectDemo />
      </div>
      </div>
    </div>
  );
}
