var Se=Object.defineProperty,ke=Object.defineProperties;var Ee=Object.getOwnPropertyDescriptors;var V=Object.getOwnPropertySymbols;var Ce=Object.prototype.hasOwnProperty,Re=Object.prototype.propertyIsEnumerable;var z=(e,t,n)=>t in e?Se(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,w=(e,t)=>{for(var n in t||(t={}))Ce.call(t,n)&&z(e,n,t[n]);if(V)for(var n of V(t))Re.call(t,n)&&z(e,n,t[n]);return e},I=(e,t)=>ke(e,Ee(t));var u=(e,t,n)=>new Promise((a,i)=>{var s=c=>{try{o(n.next(c))}catch(d){i(d)}},r=c=>{try{o(n.throw(c))}catch(d){i(d)}},o=c=>c.done?a(c.value):Promise.resolve(c.value).then(s,r);o((n=n.apply(e,t)).next())});import{r as v,_ as S,C as k,a as R,E as Z,o as Pe,F as ee,L as _e,g as te,i as De,b as Fe,v as Me,c as U,d as Oe,e as Ne,f as $e,h as xe,j as Le,k as qe,l as je,m as Be,s as Ve}from"./firebase-0J5NbvOv.js";const ne="@firebase/installations",N="0.6.19";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ae=1e4,ie=`w:${N}`,se="FIS_v2",ze="https://firebaseinstallations.googleapis.com/v1",Ue=60*60*1e3,Ge="installations",He="Installations";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ke={"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"not-registered":"Firebase Installation is not registered.","installation-not-found":"Firebase Installation not found.","request-failed":'{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',"app-offline":"Could not process request. Application offline.","delete-pending-registration":"Can't delete installation while there is a pending registration request."},b=new Z(Ge,He,Ke);function re(e){return e instanceof ee&&e.code.includes("request-failed")}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function oe({projectId:e}){return`${ze}/projects/${e}/installations`}function ce(e){return{token:e.token,requestStatus:2,expiresIn:Ye(e.expiresIn),creationTime:Date.now()}}function le(e,t){return u(this,null,function*(){const a=(yield t.json()).error;return b.create("request-failed",{requestName:e,serverCode:a.code,serverMessage:a.message,serverStatus:a.status})})}function ue({apiKey:e}){return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":e})}function We(e,{refreshToken:t}){const n=ue(e);return n.append("Authorization",Je(t)),n}function de(e){return u(this,null,function*(){const t=yield e();return t.status>=500&&t.status<600?e():t})}function Ye(e){return Number(e.replace("s","000"))}function Je(e){return`${se} ${e}`}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Qe(a,i){return u(this,arguments,function*({appConfig:e,heartbeatServiceProvider:t},{fid:n}){const s=oe(e),r=ue(e),o=t.getImmediate({optional:!0});if(o){const l=yield o.getHeartbeatsHeader();l&&r.append("x-firebase-client",l)}const c={fid:n,authVersion:se,appId:e.appId,sdkVersion:ie},d={method:"POST",headers:r,body:JSON.stringify(c)},f=yield de(()=>fetch(s,d));if(f.ok){const l=yield f.json();return{fid:l.fid||n,registrationStatus:2,refreshToken:l.refreshToken,authToken:ce(l.authToken)}}else throw yield le("Create Installation",f)})}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function fe(e){return new Promise(t=>{setTimeout(t,e)})}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Xe(e){return btoa(String.fromCharCode(...e)).replace(/\+/g,"-").replace(/\//g,"_")}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ze=/^[cdef][\w-]{21}$/,O="";function et(){try{const e=new Uint8Array(17);(self.crypto||self.msCrypto).getRandomValues(e),e[0]=112+e[0]%16;const n=tt(e);return Ze.test(n)?n:O}catch(e){return O}}function tt(e){return Xe(e).substr(0,22)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function P(e){return`${e.appName}!${e.appId}`}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pe=new Map;function ge(e,t){const n=P(e);he(n,t),nt(n,t)}function he(e,t){const n=pe.get(e);if(n)for(const a of n)a(t)}function nt(e,t){const n=at();n&&n.postMessage({key:e,fid:t}),it()}let y=null;function at(){return!y&&"BroadcastChannel"in self&&(y=new BroadcastChannel("[Firebase] FID Change"),y.onmessage=e=>{he(e.data.key,e.data.fid)}),y}function it(){pe.size===0&&y&&(y.close(),y=null)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const st="firebase-installations-database",rt=1,T="firebase-installations-store";let D=null;function $(){return D||(D=Pe(st,rt,{upgrade:(e,t)=>{switch(t){case 0:e.createObjectStore(T)}}})),D}function E(e,t){return u(this,null,function*(){const n=P(e),i=(yield $()).transaction(T,"readwrite"),s=i.objectStore(T),r=yield s.get(n);return yield s.put(t,n),yield i.done,(!r||r.fid!==t.fid)&&ge(e,t.fid),t})}function me(e){return u(this,null,function*(){const t=P(e),a=(yield $()).transaction(T,"readwrite");yield a.objectStore(T).delete(t),yield a.done})}function _(e,t){return u(this,null,function*(){const n=P(e),i=(yield $()).transaction(T,"readwrite"),s=i.objectStore(T),r=yield s.get(n),o=t(r);return o===void 0?yield s.delete(n):yield s.put(o,n),yield i.done,o&&(!r||r.fid!==o.fid)&&ge(e,o.fid),o})}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function x(e){return u(this,null,function*(){let t;const n=yield _(e.appConfig,a=>{const i=ot(a),s=ct(e,i);return t=s.registrationPromise,s.installationEntry});return n.fid===O?{installationEntry:yield t}:{installationEntry:n,registrationPromise:t}})}function ot(e){const t=e||{fid:et(),registrationStatus:0};return we(t)}function ct(e,t){if(t.registrationStatus===0){if(!navigator.onLine){const i=Promise.reject(b.create("app-offline"));return{installationEntry:t,registrationPromise:i}}const n={fid:t.fid,registrationStatus:1,registrationTime:Date.now()},a=lt(e,n);return{installationEntry:n,registrationPromise:a}}else return t.registrationStatus===1?{installationEntry:t,registrationPromise:ut(e)}:{installationEntry:t}}function lt(e,t){return u(this,null,function*(){try{const n=yield Qe(e,t);return E(e.appConfig,n)}catch(n){throw re(n)&&n.customData.serverCode===409?yield me(e.appConfig):yield E(e.appConfig,{fid:t.fid,registrationStatus:0}),n}})}function ut(e){return u(this,null,function*(){let t=yield G(e.appConfig);for(;t.registrationStatus===1;)yield fe(100),t=yield G(e.appConfig);if(t.registrationStatus===0){const{installationEntry:n,registrationPromise:a}=yield x(e);return a||n}return t})}function G(e){return _(e,t=>{if(!t)throw b.create("installation-not-found");return we(t)})}function we(e){return dt(e)?{fid:e.fid,registrationStatus:0}:e}function dt(e){return e.registrationStatus===1&&e.registrationTime+ae<Date.now()}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ft(a,i){return u(this,arguments,function*({appConfig:e,heartbeatServiceProvider:t},n){const s=pt(e,n),r=We(e,n),o=t.getImmediate({optional:!0});if(o){const l=yield o.getHeartbeatsHeader();l&&r.append("x-firebase-client",l)}const c={installation:{sdkVersion:ie,appId:e.appId}},d={method:"POST",headers:r,body:JSON.stringify(c)},f=yield de(()=>fetch(s,d));if(f.ok){const l=yield f.json();return ce(l)}else throw yield le("Generate Auth Token",f)})}function pt(e,{fid:t}){return`${oe(e)}/${t}/authTokens:generate`}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function L(e,t=!1){return u(this,null,function*(){let n;const a=yield _(e.appConfig,s=>{if(!Ie(s))throw b.create("not-registered");const r=s.authToken;if(!t&&mt(r))return s;if(r.requestStatus===1)return n=gt(e,t),s;{if(!navigator.onLine)throw b.create("app-offline");const o=It(s);return n=ht(e,o),o}});return n?yield n:a.authToken})}function gt(e,t){return u(this,null,function*(){let n=yield H(e.appConfig);for(;n.authToken.requestStatus===1;)yield fe(100),n=yield H(e.appConfig);const a=n.authToken;return a.requestStatus===0?L(e,t):a})}function H(e){return _(e,t=>{if(!Ie(t))throw b.create("not-registered");const n=t.authToken;return yt(n)?I(w({},t),{authToken:{requestStatus:0}}):t})}function ht(e,t){return u(this,null,function*(){try{const n=yield ft(e,t),a=I(w({},t),{authToken:n});return yield E(e.appConfig,a),n}catch(n){if(re(n)&&(n.customData.serverCode===401||n.customData.serverCode===404))yield me(e.appConfig);else{const a=I(w({},t),{authToken:{requestStatus:0}});yield E(e.appConfig,a)}throw n}})}function Ie(e){return e!==void 0&&e.registrationStatus===2}function mt(e){return e.requestStatus===2&&!wt(e)}function wt(e){const t=Date.now();return t<e.creationTime||e.creationTime+e.expiresIn<t+Ue}function It(e){const t={requestStatus:1,requestTime:Date.now()};return I(w({},e),{authToken:t})}function yt(e){return e.requestStatus===1&&e.requestTime+ae<Date.now()}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function bt(e){return u(this,null,function*(){const t=e,{installationEntry:n,registrationPromise:a}=yield x(t);return a?a.catch(console.error):L(t).catch(console.error),n.fid})}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Tt(e,t=!1){return u(this,null,function*(){const n=e;return yield At(n),(yield L(n,t)).token})}function At(e){return u(this,null,function*(){const{registrationPromise:t}=yield x(e);t&&(yield t)})}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function vt(e){if(!e||!e.options)throw F("App Configuration");if(!e.name)throw F("App Name");const t=["projectId","apiKey","appId"];for(const n of t)if(!e.options[n])throw F(n);return{appName:e.name,projectId:e.options.projectId,apiKey:e.options.apiKey,appId:e.options.appId}}function F(e){return b.create("missing-app-config-values",{valueName:e})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ye="installations",St="installations-internal",kt=e=>{const t=e.getProvider("app").getImmediate(),n=vt(t),a=R(t,"heartbeat");return{app:t,appConfig:n,heartbeatServiceProvider:a,_delete:()=>Promise.resolve()}},Et=e=>{const t=e.getProvider("app").getImmediate(),n=R(t,ye).getImmediate();return{getId:()=>bt(n),getToken:i=>Tt(n,i)}};function Ct(){S(new k(ye,kt,"PUBLIC")),S(new k(St,Et,"PRIVATE"))}Ct();v(ne,N);v(ne,N,"esm2020");/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const C="analytics",Rt="firebase_id",Pt="origin",_t=60*1e3,Dt="https://firebase.googleapis.com/v1alpha/projects/-/apps/{app-id}/webConfig",q="https://www.googletagmanager.com/gtag/js";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const p=new _e("@firebase/analytics");/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ft={"already-exists":"A Firebase Analytics instance with the appId {$id}  already exists. Only one Firebase Analytics instance can be created for each appId.","already-initialized":"initializeAnalytics() cannot be called again with different options than those it was initially called with. It can be called again with the same options to return the existing instance, or getAnalytics() can be used to get a reference to the already-initialized instance.","already-initialized-settings":"Firebase Analytics has already been initialized.settings() must be called before initializing any Analytics instanceor it will have no effect.","interop-component-reg-failed":"Firebase Analytics Interop Component failed to instantiate: {$reason}","invalid-analytics-context":"Firebase Analytics is not supported in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}","indexeddb-unavailable":"IndexedDB unavailable or restricted in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}","fetch-throttle":"The config fetch request timed out while in an exponential backoff state. Unix timestamp in milliseconds when fetch request throttling ends: {$throttleEndTimeMillis}.","config-fetch-failed":"Dynamic config fetch failed: [{$httpStatus}] {$responseMessage}","no-api-key":'The "apiKey" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid API key.',"no-app-id":'The "appId" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid app ID.',"no-client-id":'The "client_id" field is empty.',"invalid-gtag-resource":"Trusted Types detected an invalid gtag resource: {$gtagURL}."},g=new Z("analytics","Analytics",Ft);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Mt(e){if(!e.startsWith(q)){const t=g.create("invalid-gtag-resource",{gtagURL:e});return p.warn(t.message),""}return e}function be(e){return Promise.all(e.map(t=>t.catch(n=>n)))}function Ot(e,t){let n;return window.trustedTypes&&(n=window.trustedTypes.createPolicy(e,t)),n}function Nt(e,t){const n=Ot("firebase-js-sdk-policy",{createScriptURL:Mt}),a=document.createElement("script"),i=`${q}?l=${e}&id=${t}`;a.src=n?n==null?void 0:n.createScriptURL(i):i,a.async=!0,document.head.appendChild(a)}function $t(e){let t=[];return Array.isArray(window[e])?t=window[e]:window[e]=t,t}function xt(e,t,n,a,i,s){return u(this,null,function*(){const r=a[i];try{if(r)yield t[r];else{const c=(yield be(n)).find(d=>d.measurementId===i);c&&(yield t[c.appId])}}catch(o){p.error(o)}e("config",i,s)})}function Lt(e,t,n,a,i){return u(this,null,function*(){try{let s=[];if(i&&i.send_to){let r=i.send_to;Array.isArray(r)||(r=[r]);const o=yield be(n);for(const c of r){const d=o.find(l=>l.measurementId===c),f=d&&t[d.appId];if(f)s.push(f);else{s=[];break}}}s.length===0&&(s=Object.values(t)),yield Promise.all(s),e("event",a,i||{})}catch(s){p.error(s)}})}function qt(e,t,n,a){function i(s,...r){return u(this,null,function*(){try{if(s==="event"){const[o,c]=r;yield Lt(e,t,n,o,c)}else if(s==="config"){const[o,c]=r;yield xt(e,t,n,a,o,c)}else if(s==="consent"){const[o,c]=r;e("consent",o,c)}else if(s==="get"){const[o,c,d]=r;e("get",o,c,d)}else if(s==="set"){const[o]=r;e("set",o)}else e(s,...r)}catch(o){p.error(o)}})}return i}function jt(e,t,n,a,i){let s=function(...r){window[a].push(arguments)};return window[i]&&typeof window[i]=="function"&&(s=window[i]),window[i]=qt(s,e,t,n),{gtagCore:s,wrappedGtag:window[i]}}function Bt(e){const t=window.document.getElementsByTagName("script");for(const n of Object.values(t))if(n.src&&n.src.includes(q)&&n.src.includes(e))return n;return null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Vt=30,zt=1e3;class Ut{constructor(t={},n=zt){this.throttleMetadata=t,this.intervalMillis=n}getThrottleMetadata(t){return this.throttleMetadata[t]}setThrottleMetadata(t,n){this.throttleMetadata[t]=n}deleteThrottleMetadata(t){delete this.throttleMetadata[t]}}const Te=new Ut;function Gt(e){return new Headers({Accept:"application/json","x-goog-api-key":e})}function Ht(e){return u(this,null,function*(){var r;const{appId:t,apiKey:n}=e,a={method:"GET",headers:Gt(n)},i=Dt.replace("{app-id}",t),s=yield fetch(i,a);if(s.status!==200&&s.status!==304){let o="";try{const c=yield s.json();(r=c.error)!=null&&r.message&&(o=c.error.message)}catch(c){}throw g.create("config-fetch-failed",{httpStatus:s.status,responseMessage:o})}return s.json()})}function Kt(a){return u(this,arguments,function*(e,t=Te,n){const{appId:i,apiKey:s,measurementId:r}=e.options;if(!i)throw g.create("no-app-id");if(!s){if(r)return{measurementId:r,appId:i};throw g.create("no-api-key")}const o=t.getThrottleMetadata(i)||{backoffCount:0,throttleEndTimeMillis:Date.now()},c=new Jt;return setTimeout(()=>u(null,null,function*(){c.abort()}),_t),Ae({appId:i,apiKey:s,measurementId:r},o,c,t)})}function Ae(s,r,o){return u(this,arguments,function*(e,{throttleEndTimeMillis:t,backoffCount:n},a,i=Te){var f;const{appId:c,measurementId:d}=e;try{yield Wt(a,t)}catch(l){if(d)return p.warn(`Timed out fetching this Firebase app's measurement ID from the server. Falling back to the measurement ID ${d} provided in the "measurementId" field in the local Firebase config. [${l==null?void 0:l.message}]`),{appId:c,measurementId:d};throw l}try{const l=yield Ht(e);return i.deleteThrottleMetadata(c),l}catch(l){const h=l;if(!Yt(h)){if(i.deleteThrottleMetadata(c),d)return p.warn(`Failed to fetch this Firebase app's measurement ID from the server. Falling back to the measurement ID ${d} provided in the "measurementId" field in the local Firebase config. [${h==null?void 0:h.message}]`),{appId:c,measurementId:d};throw l}const m=Number((f=h==null?void 0:h.customData)==null?void 0:f.httpStatus)===503?U(n,i.intervalMillis,Vt):U(n,i.intervalMillis),B={throttleEndTimeMillis:Date.now()+m,backoffCount:n+1};return i.setThrottleMetadata(c,B),p.debug(`Calling attemptFetch again in ${m} millis`),Ae(e,B,a,i)}})}function Wt(e,t){return new Promise((n,a)=>{const i=Math.max(t-Date.now(),0),s=setTimeout(n,i);e.addEventListener(()=>{clearTimeout(s),a(g.create("fetch-throttle",{throttleEndTimeMillis:t}))})})}function Yt(e){if(!(e instanceof ee)||!e.customData)return!1;const t=Number(e.customData.httpStatus);return t===429||t===500||t===503||t===504}class Jt{constructor(){this.listeners=[]}addEventListener(t){this.listeners.push(t)}abort(){this.listeners.forEach(t=>t())}}function Qt(e,t,n,a,i){return u(this,null,function*(){if(i&&i.global){e("event",n,a);return}else{const s=yield t,r=I(w({},a),{send_to:s});e("event",n,r)}})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Xt(){return u(this,null,function*(){if(Fe())try{yield Me()}catch(e){return p.warn(g.create("indexeddb-unavailable",{errorInfo:e==null?void 0:e.toString()}).message),!1}else return p.warn(g.create("indexeddb-unavailable",{errorInfo:"IndexedDB is not available in this environment."}).message),!1;return!0})}function Zt(e,t,n,a,i,s,r){return u(this,null,function*(){var h;const o=Kt(e);o.then(m=>{n[m.measurementId]=m.appId,e.options.measurementId&&m.measurementId!==e.options.measurementId&&p.warn(`The measurement ID in the local Firebase config (${e.options.measurementId}) does not match the measurement ID fetched from the server (${m.measurementId}). To ensure analytics events are always sent to the correct Analytics property, update the measurement ID field in the local config or remove it from the local config.`)}).catch(m=>p.error(m)),t.push(o);const c=Xt().then(m=>{if(m)return a.getId()}),[d,f]=yield Promise.all([o,c]);Bt(s)||Nt(s,d.measurementId),i("js",new Date);const l=(h=r==null?void 0:r.config)!=null?h:{};return l[Pt]="firebase",l.update=!0,f!=null&&(l[Rt]=f),i("config",d.measurementId,l),d.measurementId})}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class en{constructor(t){this.app=t}_delete(){return delete A[this.app.options.appId],Promise.resolve()}}let A={},K=[];const W={};let M="dataLayer",tn="gtag",Y,ve,J=!1;function nn(){const e=[];if(De()&&e.push("This is a browser extension environment."),$e()||e.push("Cookies are not available."),e.length>0){const t=e.map((a,i)=>`(${i+1}) ${a}`).join(" "),n=g.create("invalid-analytics-context",{errorInfo:t});p.warn(n.message)}}function an(e,t,n){nn();const a=e.options.appId;if(!a)throw g.create("no-app-id");if(!e.options.apiKey)if(e.options.measurementId)p.warn(`The "apiKey" field is empty in the local Firebase config. This is needed to fetch the latest measurement ID for this Firebase app. Falling back to the measurement ID ${e.options.measurementId} provided in the "measurementId" field in the local Firebase config.`);else throw g.create("no-api-key");if(A[a]!=null)throw g.create("already-exists",{id:a});if(!J){$t(M);const{wrappedGtag:s,gtagCore:r}=jt(A,K,W,M,tn);ve=s,Y=r,J=!0}return A[a]=Zt(e,K,W,t,Y,M,n),new en(e)}function sn(e=Oe()){e=te(e);const t=R(e,C);return t.isInitialized()?t.getImmediate():rn(e)}function rn(e,t={}){const n=R(e,C);if(n.isInitialized()){const i=n.getImmediate();if(Ne(t,n.getOptions()))return i;throw g.create("already-initialized")}return n.initialize({options:t})}function on(e,t,n,a){e=te(e),Qt(ve,A[e.app.options.appId],t,n,a).catch(i=>p.error(i))}const Q="@firebase/analytics",X="0.10.18";function cn(){S(new k(C,(t,{options:n})=>{const a=t.getProvider("app").getImmediate(),i=t.getProvider("installations-internal").getImmediate();return an(a,i,n)},"PUBLIC")),S(new k("analytics-internal",e,"PRIVATE")),v(Q,X),v(Q,X,"esm2020");function e(t){try{const n=t.getProvider(C).getImmediate();return{logEvent:(a,i,s)=>on(n,a,i,s)}}catch(n){throw g.create("interop-component-reg-failed",{reason:n})}}}cn();const ln={apiKey:"AIzaSyAak40wl54A2kaSyxfFN5xiOShY3oPg6Ns",authDomain:"grock-fun-63159.firebaseapp.com",projectId:"grock-fun-63159",storageBucket:"grock-fun-63159.firebasestorage.app",messagingSenderId:"513451391473",appId:"1:513451391473:web:8d75c1ffab5aa2962a6c50",measurementId:"G-Q9FD6NHF7G"},j=Le(ln),un=xe(j);qe(j);sn(j);const dn="emails",gn=e=>u(null,null,function*(){try{return(yield je(Be(un,dn),I(w({},e),{read:!1,createdAt:Ve()}))).id}catch(t){throw console.error("Error saving email:",t),t}});export{gn as saveEmail};
