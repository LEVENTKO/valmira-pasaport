import{doc as p,getDoc as _}from"https://www.gstatic.com/firebasejs/12.19.0/firebase-firestore.js";import{initializeApp as h}from"https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js";import{getFirestore as b,connectFirestoreEmulator as f}from"https://www.gstatic.com/firebasejs/12.19.0/firebase-firestore.js";var k={apiKey:"AIzaSyBKyMh_iLw8aIoj3jlrjJOIoN_0BDh0078",authDomain:"valmira-pasaport.firebaseapp.com",projectId:"valmira-pasaport",storageBucket:"valmira-pasaport.firebasestorage.app",messagingSenderId:"439318009946",appId:"1:439318009946:web:f10ebd01195d366bc0e063"};var z=h(k),s=b(z),$=["localhost","127.0.0.1"].includes(location.hostname);$&&f(s,location.hostname,8080);var t=i=>String(i??"").replace(/[&<>"']/g,r=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[r]),l=(i,r=2)=>Number(i||0).toLocaleString("tr-TR",{minimumFractionDigits:r,maximumFractionDigits:r});var u={collection:"Hayalet a\u011F toplama",granulation:"Ay\u0131klama, y\u0131kama, gran\xFCl",virgin_share:"Virgin plastik katk\u0131s\u0131",injection:"\xC7er\xE7eve \xFCretimi (enjeksiyon)",lens:"Camlar",hinge:"Mente\u015Fe ve metal par\xE7alar",packaging:"Ambalaj",distribution:"Da\u011F\u0131t\u0131m"};var v=document.getElementById("passport");function c(){document.title="Pasaport bulunamad\u0131 \xB7 Valmira",v.innerHTML=`<main><div class="wrap"><div class="card login"><h1>Pasaport bulunamad\u0131</h1>
    <p class="muted" style="margin-bottom:0">Bu QR koduna ait bir Valmira pasaportu bulunamad\u0131. Kodu yeniden okutmay\u0131 deneyin.</p></div></div></main>`}async function w(){let i=new URLSearchParams(location.search).get("s");if(!i)return c();let r=await _(p(s,"items",i)).catch(()=>null);if(!r?.exists())return c();let d=await _(p(s,"batches",r.data().batchId));if(!d.exists())return c();let e=d.data(),a=e.result,m=e.photos||[];document.title=`${e.model_name} \xB7 Valmira Karbon Pasaportu`;let y=a?.ok?Math.max(...Object.values(a.stages)):0,g=a?.ok?Math.max(a.total_kg,a.virgin_total_kg):1;v.innerHTML=`
<header class="hero"><div class="wrap">
  <div class="tag">Valmira \xB7 Dijital \xDCr\xFCn Pasaportu</div>
  <h1>${t(e.model_name)}</h1>
  <div>${[e.color,"Hayalet a\u011Fdan \xFCretilmi\u015F g\xFCne\u015F g\xF6zl\xFC\u011F\xFC"].filter(Boolean).map(t).join(" \xB7 ")}</div>
  <div class="serial" style="margin-top:8px">Seri no: ${t(i)} \xB7 Parti ${t(e.code)}</div>
</div></header>
<main style="padding-top:0"><div class="wrap">
${a?.ok?`<section class="stats lift">
  <div class="stat"><div class="l">Denizden \xE7\u0131kar\u0131lan hayalet a\u011F</div><div class="v">${l(a.ghost_net_removed_g,0)} <small>g</small></div></div>
  <div class="stat"><div class="l">Bu g\xF6zl\xFC\u011F\xFCn karbon ayak izi</div><div class="v">${l(a.total_kg,2)} <small>kg CO2e</small></div></div>
  <div class="stat"><div class="l">\xC7er\xE7evede hayalet a\u011F gran\xFCl\xFC</div><div class="v">%${l(a.recycled_content_pct,0)}</div></div>
  ${a.saving_pct>0?`<div class="stat"><div class="l">Virgin plastik \xE7er\xE7eveli muadiline g\xF6re</div><div class="v">%${l(a.saving_pct,0)} <small>daha az emisyon</small></div></div>`:""}
</section>`:""}
${e.story?`<section class="card" style="margin-top:16px"><h2>Hik\xE2yesi</h2><p style="margin:0;white-space:pre-line">${t(e.story)}</p></section>`:""}
${m.length?`<section class="card"><h2>Denizden g\xF6zl\xFC\u011Fe</h2><div class="gallery">
  ${m.map(n=>`<figure><img src="${t(n.url)}" alt="${t(n.caption||e.model_name)}" loading="lazy">${n.caption?`<figcaption>${t(n.caption)}</figcaption>`:""}</figure>`).join("")}
</div></section>`:""}
<section class="card"><h2>Yolculu\u011Fu</h2>
  <div class="chain"><span>Denizden a\u011F toplama</span><i>\u2192</i><span>Ay\u0131klama ve y\u0131kama</span><i>\u2192</i><span>Gran\xFCl</span><i>\u2192</i><span>\xC7er\xE7eve</span><i>\u2192</i><span>Montaj ve ambalaj</span><i>\u2192</i><span>Siz</span></div>
  <dl style="margin-top:16px">
    ${e.collection_region?`<dt>A\u011Flar\u0131n topland\u0131\u011F\u0131 yer</dt><dd>${t(e.collection_region)}</dd>`:""}
    ${e.collection_period?`<dt>Toplama d\xF6nemi</dt><dd>${t(e.collection_period)}</dd>`:""}
    ${e.production_date?`<dt>\xDCretim tarihi</dt><dd>${t(new Date(e.production_date).toLocaleDateString("tr-TR",{year:"numeric",month:"long"}))}</dd>`:""}
    <dt>Toplayan</dt><dd>Deniz Ya\u015Fam\u0131 Koruma Derne\u011Fi</dd>
  </dl>
</section>
${a?.ok?`<section class="card"><h2>Karbon ayak izi nereden geliyor?</h2>
  <div class="table-wrap"><table class="bars"><tbody>
  ${Object.entries(a.stages).filter(([,n])=>n>5e-5).sort((n,o)=>o[1]-n[1]).map(([n,o])=>`<tr><td>${u[n]}</td><td style="width:40%"><div class="bar" style="width:${Math.max(2,o/y*100)}%"></div></td><td class="num">${l(o*1e3,0)} g</td></tr>`).join("")}
  </tbody></table></div>
  <div class="compare" style="margin-top:18px">
    <div><div class="lab"><span>Bu Valmira g\xF6zl\xFCk</span><strong>${l(a.total_kg,2)} kg CO2e</strong></div><div class="track"><div class="fill" style="width:${a.total_kg/g*100}%;background:var(--sea-2)"></div></div></div>
    <div><div class="lab"><span>Ayn\u0131 g\xF6zl\xFCk, virgin plastik \xE7er\xE7eveyle</span><strong>${l(a.virgin_total_kg,2)} kg CO2e</strong></div><div class="track"><div class="fill" style="width:${a.virgin_total_kg/g*100}%;background:#9fb3c0"></div></div></div>
  </div>
</section>`:""}
<section class="card"><h2>Kullan\u0131m ve \xF6m\xFCr sonu</h2><ul style="margin:0;padding-left:18px">
  <li>Camlar\u0131 mikrofiber bezle, \u0131l\u0131k su ve sabunla temizleyin; alkol ve aseton kullanmay\u0131n.</li>
  <li>Mente\u015Fe veya cam hasar\u0131nda g\xF6zl\xFC\u011F\xFC atmay\u0131n; onar\u0131m i\xE7in derne\u011Fe dan\u0131\u015F\u0131n.</li>
  <li>Kullan\u0131m \xF6mr\xFC bitti\u011Finde \xE7\xF6pe atmak yerine geri d\xF6n\xFC\u015F\xFCm i\xE7in derne\u011Fe ula\u015F\u0131n.</li>
</ul></section>
<section class="card small"><h2>Y\xF6ntem</h2>
  <p style="margin-top:0">Karbon ayak izi ISO 14067 ilkelerine g\xF6re, bir g\xF6zl\xFCk i\xE7in hammaddeden sat\u0131\u015F noktas\u0131na kadar (be\u015Fikten kap\u0131ya + da\u011F\u0131t\u0131m) hesaplanm\u0131\u015Ft\u0131r. Geri kazan\u0131lm\u0131\u015F a\u011F i\xE7in kesme (cut-off) yakla\u015F\u0131m\u0131 kullan\u0131lm\u0131\u015Ft\u0131r: a\u011F\u0131n ilk \xFCretiminin emisyonlar\u0131 \xF6nceki kullan\u0131m\u0131na aittir; bu g\xF6zl\xFCk toplama, ay\u0131klama, gran\xFCl \xFCretimi ve sonras\u0131n\u0131 ta\u015F\u0131r.
  ${a?.allocation==="none"?"Toplama teknesinin yak\u0131t\u0131 deniz temizli\u011Fi faaliyetine ait kabul edilmi\u015F ve g\xF6zl\xFC\u011Fe atanmam\u0131\u015Ft\u0131r.":"Toplama teknesinin yak\u0131t\u0131n\u0131n tamam\u0131 bu a\u011Flara atanm\u0131\u015Ft\u0131r."}
  Sonu\xE7 \xFC\xE7\xFCnc\xFC taraf do\u011Frulamas\u0131ndan ge\xE7memi\u015Ftir; bir karbon n\xF6trl\xFCk beyan\u0131 de\u011Fildir.</p>
  ${a?`<p class="muted" style="margin-bottom:0">Son hesaplama: ${new Date(a.calculated_at).toLocaleDateString("tr-TR")}</p>`:""}
</section>
</div></main>
<footer class="foot"><strong>Deniz Ya\u015Fam\u0131 Koruma Derne\u011Fi</strong> ile birlikte<br>Pasaport altyap\u0131s\u0131: <a href="https://commited.app" target="_blank" rel="noopener">Commited</a></footer>`}w().catch(i=>{console.error(i),c()});
