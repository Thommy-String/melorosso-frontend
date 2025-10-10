// src/consent/Banner.tsx
import React from "react";
export const Banner: React.FC<{
  onAcceptAll: ()=>void;
  onRejectAll: ()=>void;
  onManage: ()=>void;
}> = ({onAcceptAll,onRejectAll,onManage}) => (
  <div style={{position:"fixed",left:16,bottom:16,right:"auto",top:"auto",background:"rgba(255,255,255,.98)",backdropFilter:"saturate(180%) blur(8px)",border:"1px solid #e5e5ea",
               borderRadius:16,padding:12,boxShadow:"0 10px 30px rgba(0,0,0,.08)",zIndex:999999}}>
    <p style={{margin:0, color:"#1d1d1f", fontWeight:600}}>Usiamo cookie per analisi e funzionalità.</p>
    <p style={{margin:"8px 0 12px 0", color:"#6e6e73"}}>
      Scegli se abilitare analytics e marketing. I cookie essenziali sono sempre attivi.
    </p>
    <div style={{display:"flex",gap:8,justifyContent:"flex-start",flexDirection:"row",flexWrap:"wrap"}}>
      <button onClick={onRejectAll} style={{padding:"8px 14px", borderRadius:"10px", fontSize:"0.85rem", transition:"all 0.2s ease", cursor:"pointer", background:"#f5f5f6", border:"1px solid #d1d1d6", minHeight:"36px", lineHeight:1.2}}>Rifiuta tutto</button>
      <button onClick={onManage} style={{padding:"8px 14px", borderRadius:"10px", fontSize:"0.85rem", transition:"all 0.2s ease", cursor:"pointer", background:"#f5f5f6", border:"1px solid #d1d1d6", minHeight:"36px", lineHeight:1.2}}>Gestisci preferenze</button>
      <button onClick={onAcceptAll} style={{padding:"8px 14px", borderRadius:"10px", fontSize:"0.85rem", transition:"all 0.2s ease", cursor:"pointer", background:"#007aff", color:"#fff", border:"none", minHeight:"36px", lineHeight:1.2}}>Accetta tutto</button>
    </div>
  </div>
);
export default Banner;