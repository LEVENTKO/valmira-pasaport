import{doc as p,getDoc as v}from"https://www.gstatic.com/firebasejs/12.19.0/firebase-firestore.js";import{initializeApp as b}from"https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js";import{getFirestore as f,connectFirestoreEmulator as w}from"https://www.gstatic.com/firebasejs/12.19.0/firebase-firestore.js";var c={apiKey:"AIzaSyBKyMh_iLw8aIoj3jlrjJOIoN_0BDh0078",authDomain:"valmira-pasaport.firebaseapp.com",projectId:"valmira-pasaport",storageBucket:"valmira-pasaport.firebasestorage.app",messagingSenderId:"439318009946",appId:"1:439318009946:web:f10ebd01195d366bc0e063"};var z=b(c),d=f(z),$=["localhost","127.0.0.1"].includes(location.hostname);$&&w(d,location.hostname,8080);var n=r=>String(r??"").replace(/[&<>"']/g,l=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[l]),i=(r,l=2)=>Number(r||0).toLocaleString("tr-TR",{minimumFractionDigits:l,maximumFractionDigits:l});var u={collection:"Denizden a\u011F \xE7\u0131karma (DYKD)",transport:"Liman \u2192 geri d\xF6n\xFC\u015F\xFCm tesisi nakliye",granulation:"Gran\xFCl \xFCretimi (ZetaPlast)",water:"Y\u0131kama suyu",manufacturing:"\xC7er\xE7eve imalat\u0131 (Billur Optik)",packaging:"Ambalaj",distribution:"Da\u011F\u0131t\u0131m"};var y=document.getElementById("passport");function m(){document.title="Pasaport bulunamad\u0131 \xB7 Valmira",y.innerHTML=`<main><div class="wrap"><div class="card login"><h1>Pasaport bulunamad\u0131</h1>
    <p class="muted" style="margin-bottom:0">Bu QR koduna ait bir Valmira pasaportu bulunamad\u0131. Kodu yeniden okutmay\u0131 deneyin.</p></div></div></main>`}async function S(){let r=new URLSearchParams(location.search).get("s");if(!r)return m();let l=await v(p(d,"items",r)).catch(()=>null);if(!l?.exists())return m();let _=await v(p(d,"batches",l.data().batchId));if(!_.exists())return m();let e=_.data(),a=e.result,k=e.photos||[];document.title=`${e.model_name} \xB7 Valmira Karbon Pasaportu`;let h=a?.ok?Math.max(...Object.values(a.stages)):0,g=a?.ok?Math.max(a.frame_kg,a.virgin_frame_kg):1,s=(t,o=0)=>i(t*1e3,o);y.innerHTML=`
<header class="hero"><div class="wrap">
  <div class="tag">Valmira \xB7 Dijital \xDCr\xFCn Pasaportu</div>
  <h1>${n(e.model_name)}</h1>
  <div>${[e.color,"Hayalet a\u011Fdan \xFCretilmi\u015F g\xFCne\u015F g\xF6zl\xFC\u011F\xFC"].filter(Boolean).map(n).join(" \xB7 ")}</div>
  <div class="serial" style="margin-top:8px">Seri no: ${n(r)} \xB7 Parti ${n(e.code)}</div>
</div></header>
<main style="padding-top:0"><div class="wrap">
${a?.ok?`<section class="stats lift">
  <div class="stat"><div class="l">Denizden \xE7\u0131kar\u0131lan hayalet a\u011F</div><div class="v">${i(a.ghost_net_dry_g,0)} <small>g</small></div><div class="l">kuru \xB7 denizden ilk \xE7\u0131kt\u0131\u011F\u0131nda ${i(a.ghost_net_wet_g,0)} g</div></div>
  <div class="stat"><div class="l">Temizlenen a\u011F alan\u0131</div><div class="v">${i(a.seabed_area_m2*1e4,0)} <small>cm\xB2</small></div></div>
  <div class="stat"><div class="l">\xC7er\xE7evenin karbon ayak izi</div><div class="v">${s(a.frame_kg)} <small>g CO2e</small></div></div>
  <div class="stat"><div class="l">Virgin plastik \xE7er\xE7eveye g\xF6re</div><div class="v">%${i(a.frame_saving_pct,0)} <small>daha az</small></div></div>
</section>`:""}
${e.story?`<section class="card" style="margin-top:16px"><h2>Hik\xE2yesi</h2><p style="margin:0;white-space:pre-line">${n(e.story)}</p></section>`:""}
${k.length?`<section class="card"><h2>Denizden g\xF6zl\xFC\u011Fe</h2><div class="gallery">
  ${k.map(t=>`<figure><img src="${n(t.url)}" alt="${n(t.caption||e.model_name)}" loading="lazy">${t.caption?`<figcaption>${n(t.caption)}</figcaption>`:""}</figure>`).join("")}
</div></section>`:""}
<section class="card"><h2>Yolculu\u011Fu</h2>
  <div class="chain"><span>Denizden a\u011F toplama</span><i>\u2192</i><span>Ay\u0131klama ve y\u0131kama</span><i>\u2192</i><span>Gran\xFCl</span><i>\u2192</i><span>\xC7er\xE7eve</span><i>\u2192</i><span>Montaj ve ambalaj</span><i>\u2192</i><span>Siz</span></div>
  <dl style="margin-top:16px">
    ${e.collection_region?`<dt>A\u011Flar\u0131n topland\u0131\u011F\u0131 yer</dt><dd>${n(e.collection_region)}</dd>`:""}
    ${e.collection_period?`<dt>Toplama d\xF6nemi</dt><dd>${n(e.collection_period)}</dd>`:""}
    ${e.production_date?`<dt>\xDCretim tarihi</dt><dd>${n(new Date(e.production_date).toLocaleDateString("tr-TR",{year:"numeric",month:"long"}))}</dd>`:""}
    <dt>A\u011F\u0131 \xE7\u0131karan</dt><dd>Deniz Ya\u015Fam\u0131 Koruma Derne\u011Fi</dd>
    <dt>Geri d\xF6n\xFC\u015F\xFCm (PA6 gran\xFCl)</dt><dd>ZetaPlast</dd>
    <dt>\xC7er\xE7eve \xFCretimi</dt><dd>Billur Optik</dd>
  </dl>
</section>
${a?.ok?`<section class="card"><h2>Karbon ayak izi nereden geliyor?</h2>
  <p style="margin-top:0">G\xF6zl\xFC\u011F\xFCn tamam\u0131, camlar dahil <strong>${i(a.total_min_kg,2)}\u2013${i(a.total_max_kg,2)} kg CO2e</strong>. \xC7er\xE7eve k\u0131sm\u0131 \xF6l\xE7\xFClm\xFC\u015F \xFCretim verisiyle hesapland\u0131; camlar i\xE7in tedarik\xE7inin ortalama aral\u0131\u011F\u0131 kullan\u0131ld\u0131.</p>
  <div class="table-wrap"><table class="bars"><tbody>
  ${Object.entries(a.stages).filter(([,t])=>t>=5e-4).sort((t,o)=>o[1]-t[1]).map(([t,o])=>`<tr><td>${u[t]}</td><td style="width:40%"><div class="bar" style="width:${Math.max(2,o/h*100)}%"></div></td><td class="num">${s(o)} g</td></tr>`).join("")}
    <tr><td>Camlar (tedarik\xE7i aral\u0131\u011F\u0131)</td><td style="width:40%"><div class="bar" style="width:100%;background:repeating-linear-gradient(90deg,#9fb3c0 0 6px,#e8eef2 6px 10px)"></div></td><td class="num">${s(a.lens_min_kg)}\u2013${s(a.lens_max_kg)} g</td></tr>
  </tbody></table></div>
  <div class="compare" style="margin-top:18px">
    <div><div class="lab"><span>Bu \xE7er\xE7eve (hayalet a\u011Fdan)</span><strong>${s(a.frame_kg)} g CO2e</strong></div><div class="track"><div class="fill" style="width:${a.frame_kg/g*100}%;background:var(--sea-2)"></div></div></div>
    <div><div class="lab"><span>Ayn\u0131 \xE7er\xE7eve, virgin plastikle</span><strong>${s(a.virgin_frame_kg)} g CO2e</strong></div><div class="track"><div class="fill" style="width:${a.virgin_frame_kg/g*100}%;background:#9fb3c0"></div></div></div>
  </div>
  <p class="small muted" style="margin-bottom:0">Yaln\u0131zca hammaddeye bak\u0131ld\u0131\u011F\u0131nda hayalet a\u011F gran\xFCl\xFC, virgin PA6'ya g\xF6re %${i(a.raw_saving_pct,0)} daha d\xFC\u015F\xFCk emisyonludur (aral\u0131k %${i(a.raw_saving_pct_low,0)}\u2013${i(a.raw_saving_pct_high,0)}).</p>
</section>`:""}
<section class="card"><h2>Kullan\u0131m ve \xF6m\xFCr sonu</h2><ul style="margin:0;padding-left:18px">
  <li>Camlar\u0131 mikrofiber bezle, \u0131l\u0131k su ve sabunla temizleyin; alkol ve aseton kullanmay\u0131n.</li>
  <li>Mente\u015Fe veya cam hasar\u0131nda g\xF6zl\xFC\u011F\xFC atmay\u0131n; onar\u0131m i\xE7in derne\u011Fe dan\u0131\u015F\u0131n.</li>
  <li>Kullan\u0131m \xF6mr\xFC bitti\u011Finde \xE7\xF6pe atmak yerine geri d\xF6n\xFC\u015F\xFCm i\xE7in derne\u011Fe ula\u015F\u0131n.</li>
</ul></section>
<section class="card small"><h2>Y\xF6ntem</h2>
  <p style="margin-top:0">Hesap ISO 14067 ilkelerine g\xF6re, bir g\xF6zl\xFCk i\xE7in denizden \xE7\u0131karmadan fabrika \xE7\u0131k\u0131\u015F\u0131na kadar yap\u0131lm\u0131\u015Ft\u0131r${a?.includes_packaging||a?.includes_distribution?"; ambalaj ve da\u011F\u0131t\u0131m dahildir":"; ambalaj ve da\u011F\u0131t\u0131m hen\xFCz dahil de\u011Fildir"}. Veriler Deniz Ya\u015Fam\u0131 Koruma Derne\u011Fi, ZetaPlast ve Billur Optik'in \xFCretim kay\u0131tlar\u0131ndan gelir. Geri kazan\u0131lm\u0131\u015F a\u011F i\xE7in kesme (cut-off) yakla\u015F\u0131m\u0131 kullan\u0131lm\u0131\u015Ft\u0131r: a\u011F\u0131n ilk \xFCretiminin emisyonlar\u0131 \xF6nceki kullan\u0131m\u0131na aittir.
  ${a?.allocation==="none"?"Deniz operasyonunun yak\u0131t\u0131 deniz temizli\u011Fi faaliyetine ait kabul edilmi\u015Ftir.":"Deniz operasyonunun yak\u0131t\u0131n\u0131n tamam\u0131 \xE7\u0131kar\u0131lan a\u011Fa atanm\u0131\u015Ft\u0131r (muhafazak\xE2r yakla\u015F\u0131m)."}
  Denizden a\u011F \xE7\u0131karman\u0131n ekolojik faydas\u0131 karbon ayak izinden d\xFC\u015F\xFClmez; ayr\u0131 bir etki g\xF6stergesi olarak raporlan\u0131r. Sonu\xE7 \xFC\xE7\xFCnc\xFC taraf do\u011Frulamas\u0131ndan ge\xE7memi\u015Ftir ve bir karbon n\xF6trl\xFCk beyan\u0131 de\u011Fildir.</p>
  <p><a class="btn" href="valmira-karbon-hesaplama-yontemi.pdf" target="_blank" rel="noopener">Hesaplama y\xF6ntemini indir (PDF)</a></p>
  ${a?`<p class="muted" style="margin-bottom:0">Son hesaplama: ${new Date(a.calculated_at).toLocaleDateString("tr-TR")}</p>`:""}
</section>
</div></main>
<footer class="foot"><strong>Deniz Ya\u015Fam\u0131 Koruma Derne\u011Fi</strong> ile birlikte<br>Pasaport altyap\u0131s\u0131: <a href="https://commited.app" target="_blank" rel="noopener">Commited</a></footer>`}S().catch(r=>{console.error(r),m()});
