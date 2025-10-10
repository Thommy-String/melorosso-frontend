// src/consent/Preferences.tsx
import React, { useState } from "react";
import type { ConsentCategories } from "./types";

const Toggle: React.FC<{checked:boolean,onChange:(v:boolean)=>void,label:string,desc:string,disabled?:boolean}> =
({checked,onChange,label,desc,disabled}) => (
  <label style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"12px 0", borderBottom:"1px solid #eee"}}>
    <div><div style={{fontWeight:600}}>{label}</div><div style={{color:"#6e6e73"}}>{desc}</div></div>
    <input type="checkbox" checked={checked} onChange={e=>onChange(e.target.checked)} disabled={disabled}/>
  </label>
);

const Preferences: React.FC<{
  value: ConsentCategories;
  onSave: (c: ConsentCategories)=>void;
  onClose: ()=>void;
}> = ({value,onSave,onClose}) => {
  const [v, setV] = useState(value);
  return (
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.4)",zIndex:10000,display:"grid",placeItems:"center"}}>
      <div style={{width:"min(680px, 92vw)",background:"#fff",borderRadius:14,padding:20}}>
        <h3>Preferenze cookie</h3>
        <Toggle label="Essenziali" desc="Necessari al funzionamento del sito." checked={true} onChange={()=>{}} disabled/>
        <Toggle label="Analytics" desc="Statistiche anonime su uso del sito."
                checked={v.analytics} onChange={(b)=>setV({...v,analytics:b})}/>
        <Toggle label="Marketing" desc="Annunci personalizzati e remarketing."
                checked={v.marketing} onChange={(b)=>setV({...v,marketing:b})}/>
        <Toggle label="Funzionali" desc="Servizi esterni (mappe, video, chat)."
                checked={v.functional} onChange={(b)=>setV({...v,functional:b})}/>
        <div style={{display:"flex",justifyContent:"flex-end",gap:8,marginTop:12}}>
          <button onClick={onClose}>Annulla</button>
          <button onClick={()=>onSave(v)} style={{background:"#007aff",color:"#fff"}}>Salva</button>
        </div>
      </div>
    </div>
  );
};
export default Preferences;