class A{constructor(e){this.properties=e??[]}get(e){const t=this.properties.filter(r=>r.name===e).map(r=>r.value);if(t.length>1)throw new Error('Expected only one property to be named "'+e+'"');if(t.length!==0)return t[0]}getString(e){return this.getByType(e,"string")}getNumber(e){return this.getByType(e,"number")}getBoolean(e){return this.getByType(e,"boolean")}getByType(e,t){const r=this.get(e);if(r!==void 0){if(t!=="json"&&typeof r!==t)throw new Error('Expected property "'+e+'" to have type "'+t+'"');return r}}mustGetString(e){return this.mustGetByType(e,"string")}mustGetNumber(e){return this.mustGetByType(e,"number")}mustGetBoolean(e){return this.mustGetByType(e,"boolean")}mustGetByType(e,t){const r=this.get(e);if(r===void 0)throw new Error('Property "'+e+'" is missing');if(t!=="json"&&typeof r!==t)throw new Error('Expected property "'+e+'" to have type "'+t+'"');return r}getType(e){const t=this.properties.filter(r=>r.name===e).map(r=>r.type);if(t.length>1)throw new Error('Expected only one property to be named "'+e+'"');if(t.length!==0)return t[0]}}const X="https://unpkg.com/@workadventure/scripting-api-extra@1.8.1/dist";class re{constructor(e){this.name=e.name,this.x=e.x,this.y=e.y,this.properties=new A(e.properties)}get isReadable(){const e=this.properties.getString("readableBy");return e?WA.player.tags.includes(e):!0}get isWritable(){const e=this.properties.getString("writableBy");return e?WA.player.tags.includes(e):!0}}function D(n){const e=n?"#"+n.join():"";WA.nav.openCoWebSite(X+"/configuration.html"+e,!0)}async function oe(n,e){const t=await WA.room.getTiledMap(),r=new Map;return Y(t.layers,r,n,e),r}function Y(n,e,t,r){for(const o of n)if(o.type==="objectgroup"){for(const s of o.objects)if(s.type==="variable"||s.class==="variable"){if(t&&o.name!==t||r&&!r.includes(s.name))continue;e.set(s.name,new re(s))}}else o.type==="group"&&Y(o.layers,e,t,r)}let x;async function P(){return x===void 0&&(x=se()),x}async function se(){return ie(await WA.room.getTiledMap())}function ie(n){const e=new Map;return J(n.layers,"",e),e}function J(n,e,t){for(const r of n)r.type==="group"?J(r.layers,e+r.name+"/",t):(r.name=e+r.name,t.set(r.name,r))}async function Q(){const n=await P(),e=[];for(const t of n.values())if(t.type==="objectgroup")for(const r of t.objects)(r.type==="area"||r.class==="area")&&e.push(r);return e}function ae(n){let e=1/0,t=1/0,r=0,o=0;const s=n.data;if(typeof s=="string")throw new Error("Unsupported tile layer data stored as string instead of CSV");for(let i=0;i<n.height;i++)for(let a=0;a<n.width;a++)s[a+i*n.width]!==0&&(e=Math.min(e,a),o=Math.max(o,a),t=Math.min(t,i),r=Math.max(r,i));return{top:t,left:e,right:o+1,bottom:r+1}}function F(n){let e=1/0,t=1/0,r=0,o=0;for(const s of n){const i=ae(s);i.left<e&&(e=i.left),i.top<t&&(t=i.top),i.right>o&&(o=i.right),i.bottom>r&&(r=i.bottom)}return{top:t,left:e,right:o,bottom:r}}/*!
 * mustache.js - Logic-less {{mustache}} templates with JavaScript
 * http://github.com/janl/mustache.js
 */var ue=Object.prototype.toString,S=Array.isArray||function(e){return ue.call(e)==="[object Array]"};function G(n){return typeof n=="function"}function ce(n){return S(n)?"array":typeof n}function V(n){return n.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&")}function O(n,e){return n!=null&&typeof n=="object"&&e in n}function le(n,e){return n!=null&&typeof n!="object"&&n.hasOwnProperty&&n.hasOwnProperty(e)}var fe=RegExp.prototype.test;function pe(n,e){return fe.call(n,e)}var ge=/\S/;function he(n){return!pe(ge,n)}var de={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","/":"&#x2F;","`":"&#x60;","=":"&#x3D;"};function ye(n){return String(n).replace(/[&<>"'`=\/]/g,function(t){return de[t]})}var me=/\s*/,ve=/\s+/,_=/\s*=/,be=/\s*\}/,we=/#|\^|\/|>|\{|&|=|!/;function Ae(n,e){if(!n)return[];var t=!1,r=[],o=[],s=[],i=!1,a=!1,u="",l=0;function p(){if(i&&!a)for(;s.length;)delete o[s.pop()];else s=[];i=!1,a=!1}var d,m,T;function C(b){if(typeof b=="string"&&(b=b.split(ve,2)),!S(b)||b.length!==2)throw new Error("Invalid tags: "+b);d=new RegExp(V(b[0])+"\\s*"),m=new RegExp("\\s*"+V(b[1])),T=new RegExp("\\s*"+V("}"+b[1]))}C(e||h.tags);for(var f=new M(n),v,c,y,L,k,w;!f.eos();){if(v=f.pos,y=f.scanUntil(d),y)for(var R=0,ne=y.length;R<ne;++R)L=y.charAt(R),he(L)?(s.push(o.length),u+=L):(a=!0,t=!0,u+=" "),o.push(["text",L,v,v+1]),v+=1,L===`
`&&(p(),u="",l=0,t=!1);if(!f.scan(d))break;if(i=!0,c=f.scan(we)||"name",f.scan(me),c==="="?(y=f.scanUntil(_),f.scan(_),f.scanUntil(m)):c==="{"?(y=f.scanUntil(T),f.scan(be),f.scanUntil(m),c="&"):y=f.scanUntil(m),!f.scan(m))throw new Error("Unclosed tag at "+f.pos);if(c==">"?k=[c,y,v,f.pos,u,l,t]:k=[c,y,v,f.pos],l++,o.push(k),c==="#"||c==="^")r.push(k);else if(c==="/"){if(w=r.pop(),!w)throw new Error('Unopened section "'+y+'" at '+v);if(w[1]!==y)throw new Error('Unclosed section "'+w[1]+'" at '+v)}else c==="name"||c==="{"||c==="&"?a=!0:c==="="&&C(y)}if(p(),w=r.pop(),w)throw new Error('Unclosed section "'+w[1]+'" at '+f.pos);return Se(We(o))}function We(n){for(var e=[],t,r,o=0,s=n.length;o<s;++o)t=n[o],t&&(t[0]==="text"&&r&&r[0]==="text"?(r[1]+=t[1],r[3]=t[3]):(e.push(t),r=t));return e}function Se(n){for(var e=[],t=e,r=[],o,s,i=0,a=n.length;i<a;++i)switch(o=n[i],o[0]){case"#":case"^":t.push(o),r.push(o),t=o[4]=[];break;case"/":s=r.pop(),s[5]=o[2],t=r.length>0?r[r.length-1][4]:e;break;default:t.push(o)}return e}function M(n){this.string=n,this.tail=n,this.pos=0}M.prototype.eos=function(){return this.tail===""};M.prototype.scan=function(e){var t=this.tail.match(e);if(!t||t.index!==0)return"";var r=t[0];return this.tail=this.tail.substring(r.length),this.pos+=r.length,r};M.prototype.scanUntil=function(e){var t=this.tail.search(e),r;switch(t){case-1:r=this.tail,this.tail="";break;case 0:r="";break;default:r=this.tail.substring(0,t),this.tail=this.tail.substring(t)}return this.pos+=r.length,r};function W(n,e){this.view=n,this.cache={".":this.view},this.parent=e}W.prototype.push=function(e){return new W(e,this)};W.prototype.lookup=function(e){var t=this.cache,r;if(t.hasOwnProperty(e))r=t[e];else{for(var o=this,s,i,a,u=!1;o;){if(e.indexOf(".")>0)for(s=o.view,i=e.split("."),a=0;s!=null&&a<i.length;)a===i.length-1&&(u=O(s,i[a])||le(s,i[a])),s=s[i[a++]];else s=o.view[e],u=O(o.view,e);if(u){r=s;break}o=o.parent}t[e]=r}return G(r)&&(r=r.call(this.view)),r};function g(){this.templateCache={_cache:{},set:function(e,t){this._cache[e]=t},get:function(e){return this._cache[e]},clear:function(){this._cache={}}}}g.prototype.clearCache=function(){typeof this.templateCache<"u"&&this.templateCache.clear()};g.prototype.parse=function(e,t){var r=this.templateCache,o=e+":"+(t||h.tags).join(":"),s=typeof r<"u",i=s?r.get(o):void 0;return i==null&&(i=Ae(e,t),s&&r.set(o,i)),i};g.prototype.render=function(e,t,r,o){var s=this.getConfigTags(o),i=this.parse(e,s),a=t instanceof W?t:new W(t,void 0);return this.renderTokens(i,a,r,e,o)};g.prototype.renderTokens=function(e,t,r,o,s){for(var i="",a,u,l,p=0,d=e.length;p<d;++p)l=void 0,a=e[p],u=a[0],u==="#"?l=this.renderSection(a,t,r,o,s):u==="^"?l=this.renderInverted(a,t,r,o,s):u===">"?l=this.renderPartial(a,t,r,s):u==="&"?l=this.unescapedValue(a,t):u==="name"?l=this.escapedValue(a,t,s):u==="text"&&(l=this.rawValue(a)),l!==void 0&&(i+=l);return i};g.prototype.renderSection=function(e,t,r,o,s){var i=this,a="",u=t.lookup(e[1]);function l(m){return i.render(m,t,r,s)}if(u){if(S(u))for(var p=0,d=u.length;p<d;++p)a+=this.renderTokens(e[4],t.push(u[p]),r,o,s);else if(typeof u=="object"||typeof u=="string"||typeof u=="number")a+=this.renderTokens(e[4],t.push(u),r,o,s);else if(G(u)){if(typeof o!="string")throw new Error("Cannot use higher-order sections without the original template");u=u.call(t.view,o.slice(e[3],e[5]),l),u!=null&&(a+=u)}else a+=this.renderTokens(e[4],t,r,o,s);return a}};g.prototype.renderInverted=function(e,t,r,o,s){var i=t.lookup(e[1]);if(!i||S(i)&&i.length===0)return this.renderTokens(e[4],t,r,o,s)};g.prototype.indentPartial=function(e,t,r){for(var o=t.replace(/[^ \t]/g,""),s=e.split(`
`),i=0;i<s.length;i++)s[i].length&&(i>0||!r)&&(s[i]=o+s[i]);return s.join(`
`)};g.prototype.renderPartial=function(e,t,r,o){if(r){var s=this.getConfigTags(o),i=G(r)?r(e[1]):r[e[1]];if(i!=null){var a=e[6],u=e[5],l=e[4],p=i;u==0&&l&&(p=this.indentPartial(i,l,a));var d=this.parse(p,s);return this.renderTokens(d,t,r,p,o)}}};g.prototype.unescapedValue=function(e,t){var r=t.lookup(e[1]);if(r!=null)return r};g.prototype.escapedValue=function(e,t,r){var o=this.getConfigEscape(r)||h.escape,s=t.lookup(e[1]);if(s!=null)return typeof s=="number"&&o===h.escape?String(s):o(s)};g.prototype.rawValue=function(e){return e[1]};g.prototype.getConfigTags=function(e){return S(e)?e:e&&typeof e=="object"?e.tags:void 0};g.prototype.getConfigEscape=function(e){if(e&&typeof e=="object"&&!S(e))return e.escape};var h={name:"mustache.js",version:"4.2.0",tags:["{{","}}"],clearCache:void 0,escape:void 0,parse:void 0,render:void 0,Scanner:void 0,Context:void 0,Writer:void 0,set templateCache(n){E.templateCache=n},get templateCache(){return E.templateCache}},E=new g;h.clearCache=function(){return E.clearCache()};h.parse=function(e,t){return E.parse(e,t)};h.render=function(e,t,r,o){if(typeof e!="string")throw new TypeError('Invalid template! Template should be a "string" but "'+ce(e)+'" was given as the first argument for mustache#render(template, view, partials)');return E.render(e,t,r,o)};h.escape=ye;h.Scanner=M;h.Context=W;h.Writer=g;class Z{constructor(e,t){this.template=e,this.state=t,this.ast=h.parse(e)}getValue(){return this.value===void 0&&(this.value=h.render(this.template,this.state)),this.value}onChange(e){const t=[];for(const r of this.getUsedVariables().values())t.push(this.state.onVariableChange(r).subscribe(()=>{const o=h.render(this.template,this.state);o!==this.value&&(this.value=o,e(this.value))}));return{unsubscribe:()=>{for(const r of t)r.unsubscribe()}}}isPureString(){return this.ast.length===0||this.ast.length===1&&this.ast[0][0]==="text"}getUsedVariables(){const e=new Set;return this.recursiveGetUsedVariables(this.ast,e),e}recursiveGetUsedVariables(e,t){for(const r of e){const o=r[0],s=r[1],i=r[4];["name","&","#","^"].includes(o)&&t.add(s),i!==void 0&&typeof i!="string"&&this.recursiveGetUsedVariables(i,t)}}}async function Ce(){var n;const e=await Q();for(const t of e){const r=(n=t.properties)!==null&&n!==void 0?n:[];for(const o of r){if(o.type==="int"||o.type==="bool"||o.type==="object"||typeof o.value!="string")continue;const s=new Z(o.value,WA.state);if(s.isPureString())continue;const i=s.getValue();await N(t.name,o.name,i),s.onChange(async a=>{await N(t.name,o.name,a)})}}}async function Le(){var n;const e=await P();for(const[t,r]of e.entries())if(r.type!=="objectgroup"){const o=(n=r.properties)!==null&&n!==void 0?n:[];for(const s of o){if(s.type==="int"||s.type==="bool"||s.type==="object"||typeof s.value!="string")continue;const i=new Z(s.value,WA.state);if(i.isPureString())continue;const a=i.getValue();q(t,s.name,a),i.onChange(u=>{q(t,s.name,u)})}}}async function N(n,e,t){console.log(n),(await WA.room.area.get(n)).setProperty(e,t)}function q(n,e,t){WA.room.setProperty(n,e,t),e==="visible"&&(t?WA.room.showLayer(n):WA.room.hideLayer(n))}const Ee="https://admin.workadventu.re/html";let j,I=0,U=0;function $(n){if(WA.state[n.name]){let e=n.properties.mustGetString("openLayer");for(const t of e.split(`
`))WA.room.showLayer(t);e=n.properties.mustGetString("closeLayer");for(const t of e.split(`
`))WA.room.hideLayer(t)}else{let e=n.properties.mustGetString("openLayer");for(const t of e.split(`
`))WA.room.hideLayer(t);e=n.properties.mustGetString("closeLayer");for(const t of e.split(`
`))WA.room.showLayer(t)}}function Pe(n){const e=n.properties.getString("openSound"),t=n.properties.getNumber("soundRadius");let r=1;if(t){const o=te(n.properties.mustGetString("openLayer").split(`
`));if(o>t)return;r=1-o/t}e&&WA.sound.loadSound(e).play({volume:r})}function Me(n){const e=n.properties.getString("closeSound"),t=n.properties.getNumber("soundRadius");let r=1;if(t){const o=te(n.properties.mustGetString("closeLayer").split(`
`));if(o>t)return;r=1-o/t}e&&WA.sound.loadSound(e).play({volume:r})}function ee(n){return n.map(e=>j.get(e)).filter(e=>(e==null?void 0:e.type)==="tilelayer")}function te(n){const e=ee(n),t=F(e),r=((t.right-t.left)/2+t.left)*32,o=((t.bottom-t.top)/2+t.top)*32;return Math.sqrt(Math.pow(I-r,2)+Math.pow(U-o,2))}function Te(n){WA.state.onVariableChange(n.name).subscribe(()=>{WA.state[n.name]?Pe(n):Me(n),$(n)}),$(n)}function z(n,e,t,r){const o=n.name;let s,i,a=!1;const u=t.getString("tag");let l=!0;u&&!WA.player.tags.includes(u)&&(l=!1);const p=!!u;function d(){var c;s&&s.remove(),s=WA.ui.displayActionMessage({message:(c=t.getString("closeTriggerMessage"))!==null&&c!==void 0?c:"Press SPACE to close the door",callback:()=>{WA.state[e.name]=!1,m()}})}function m(){var c;s&&s.remove(),s=WA.ui.displayActionMessage({message:(c=t.getString("openTriggerMessage"))!==null&&c!==void 0?c:"Press SPACE to open the door",callback:()=>{WA.state[e.name]=!0,d()}})}function T(){let c;if(n.type==="tilelayer")c=F(ee(e.properties.mustGetString("closeLayer").split(`
`)));else{if(n.x===void 0||n.y===void 0||n.width===void 0||n.height===void 0)throw new Error(`Doorstep zone "${n.name}" is missing x, y, width or height`);c={top:n.y,left:n.x,right:n.x+n.width,bottom:n.y+n.height}}i=WA.room.website.create({name:"doorKeypad"+o,url:r+"/keypad.html#"+encodeURIComponent(o),position:{x:c.right*32,y:c.top*32,width:32*3,height:32*4},allowApi:!0})}function C(){i&&(WA.room.website.delete(i.name),i=void 0)}function f(){if(a=!0,t.getBoolean("autoOpen")&&l){WA.state[e.name]=!0;return}if(!WA.state[e.name]&&(p&&!l||!p)&&(t.getString("code")||t.getString("codeVariable"))){T();return}l&&(WA.state[e.name]?d():m())}function v(){a=!1,t.getBoolean("autoClose")&&(WA.state[e.name]=!1),s&&s.remove(),C()}n.type==="tilelayer"?(WA.room.onEnterLayer(o).subscribe(f),WA.room.onLeaveLayer(o).subscribe(v)):(WA.room.area.onEnter(o).subscribe(f),WA.room.area.onLeave(o).subscribe(v)),WA.state.onVariableChange(e.name).subscribe(()=>{a&&(!t.getBoolean("autoClose")&&WA.state[e.name]===!0&&d(),i&&WA.state[e.name]===!0&&C(),!t.getBoolean("autoOpen")&&WA.state[e.name]===!1&&m())})}function ke(n){const e=n.properties.mustGetString("bellSound"),t=n.properties.getNumber("soundRadius");let r=1;if(t){const o=Math.sqrt(Math.pow(n.x-I,2)+Math.pow(n.y-U,2));if(o>t)return;r=1-o/t}WA.sound.loadSound(e).play({volume:r})}function Be(n){WA.state[n.name]===void 0&&(WA.state[n.name]=0),WA.state.onVariableChange(n.name).subscribe(()=>{WA.state[n.name]&&ke(n)})}function K(n,e,t){let r;const o=e.getString("bellPopup");if(t.type==="tilelayer"){const s=t.name;WA.room.onEnterLayer(s).subscribe(()=>{var i;o?r=WA.ui.openPopup(o,"",[{label:(i=e.getString("bellButtonText"))!==null&&i!==void 0?i:"Ring",callback:()=>{WA.state[n]=WA.state[n]+1}}]):WA.state[n]=WA.state[n]+1}),WA.room.onLeaveLayer(s).subscribe(()=>{r&&(r.close(),r=void 0)})}else{const s=t.name;WA.room.area.onEnter(s).subscribe(()=>{var i;o?r=WA.ui.openPopup(o,"",[{label:(i=e.getString("bellButtonText"))!==null&&i!==void 0?i:"Ring",callback:()=>{WA.state[n]=WA.state[n]+1}}]):WA.state[n]=WA.state[n]+1}),WA.room.area.onLeave(s).subscribe(()=>{r&&(r.close(),r=void 0)})}}async function Re(n){n=n??Ee;const e=await oe();j=await P();for(const t of e.values())t.properties.get("door")&&Te(t),t.properties.get("bell")&&Be(t);for(const t of j.values()){const r=new A(t.properties),o=r.getString("doorVariable");if(o&&t.type==="tilelayer"){const i=e.get(o);if(i===void 0)throw new Error('Cannot find variable "'+o+'" referred in the "doorVariable" property of layer "'+t.name+'"');z(t,i,r,n)}const s=r.getString("bellVariable");s&&t.type==="tilelayer"&&K(s,r,t)}for(const t of await Q()){const r=new A(t.properties),o=r.getString("doorVariable");if(o){const i=e.get(o);if(i===void 0)throw new Error('Cannot find variable "'+o+'" referred in the "doorVariable" property of object "'+t.name+'"');z(t,i,r,n)}const s=r.getString("bellVariable");s&&K(s,r,t)}WA.player.onPlayerMove(t=>{I=t.x,U=t.y})}function xe(n,e){const t=n.getString("bindVariable");if(t){const r=n.get("enterValue"),o=n.get("leaveValue"),s=n.getString("triggerMessage"),i=n.getString("tag");Ve(t,e,r,o,s,i)}}function Ve(n,e,t,r,o,s){s&&!WA.player.tags.includes(s)||(t!==void 0&&WA.room.onEnterLayer(e).subscribe(()=>{o||(WA.state[n]=t)}),r!==void 0&&WA.room.onLeaveLayer(e).subscribe(()=>{WA.state[n]=r}))}async function je(){const n=await P();for(const e of n.values()){const t=new A(e.properties);xe(t,e.name)}}let H;async function Ge(n){const e=await WA.room.getTiledMap();n=n??X,H=await P();const t=e.layers.find(r=>r.name==="configuration");if(t){const o=new A(t.properties).getString("tag");(!o||WA.player.tags.includes(o))&&WA.ui.registerMenuCommand("Configure the room",()=>{WA.nav.openCoWebSite(n+"/configuration.html",!0)});for(const s of H.values()){const i=new A(s.properties),a=i.getString("openConfig");a&&s.type==="tilelayer"&&Ie(a.split(","),s.name,i)}}}function Ie(n,e,t){let r;const o=t.getString("openConfigAdminTag");let s=!0;o&&!WA.player.tags.includes(o)&&(s=!1);function i(){var u;r&&r.remove(),r=WA.ui.displayActionMessage({message:(u=t.getString("openConfigTriggerMessage"))!==null&&u!==void 0?u:"Press SPACE or touch here to configure",callback:()=>D(n)})}function a(){WA.nav.closeCoWebSite()}WA.room.onEnterLayer(e).subscribe(()=>{const u=t.getString("openConfigTrigger");s&&(u&&u==="onaction"?i():D(n))}),WA.room.onLeaveLayer(e).subscribe(()=>{r&&r.remove(),a()})}function Ue(){return WA.onInit().then(()=>{Re().catch(n=>console.error(n)),je().catch(n=>console.error(n)),Ge().catch(n=>console.error(n)),Le().catch(n=>console.error(n)),Ce().catch(n=>console.error(n))}).catch(n=>console.error(n))}console.log("Script started successfully");let B;WA.onInit().then(async()=>{console.log("Scripting API ready"),console.log("My Tags",WA.player.tags);let n;WA.ui.onRemotePlayerClicked.subscribe(e=>{if(WA.player.tags.includes("model")){console.log("Remote player clicked",e.playerId);const t=WA.players.get(e.playerId);console.log("Player : ",t),t!==void 0&&(console.log(`Player 1 name is ${t.name}`),console.log(`Player  is ${t}`)),e.addAction("En savoir plus",async()=>{await WA.players.configureTracking(),n=await WA.ui.website.open({url:"./form.html",position:{vertical:"middle",horizontal:"middle"},size:{height:"30vh",width:"80vh"},margin:{top:"10vh"},allowApi:!0})})}}),WA.room.onEnterLayer("formLayer").subscribe(async()=>{n=await WA.ui.website.open({url:"./form.html",position:{vertical:"top",horizontal:"middle"},size:{height:"30vh",width:"80vh"},margin:{top:"10vh"},allowApi:!0})}),WA.room.onLeaveLayer("formLayer").subscribe(()=>{n.close()}),WA.room.area.onEnter("clock").subscribe(()=>{const e=new Date,t=e.getHours()+":"+e.getMinutes();B=WA.ui.openPopup("clockPopup","It's "+t,[])}),WA.room.area.onLeave("clock").subscribe(De),Ue().then(()=>{console.log("Scripting API Extra ready")}).catch(e=>console.error(e))}).catch(n=>console.error(n));function De(){B!==void 0&&(B.close(),B=void 0)}
