"use strict";var FontInspector=function(){function e(){for(var e=document.querySelectorAll("div["+o+"]"),t=0,n=e.length;t<n;++t){var a=e[t];a.className=""}}function t(){for(var e=document.querySelectorAll("div["+o+"]"),t=0,n=e.length;t<n;++t){var a=e[t];a.className="debuggerHideText"}}function n(e,t){for(var n=document.querySelectorAll("div["+o+"="+e+"]"),a=0,r=n.length;a<r;++a){var i=n[a];i.className=t?"debuggerShowText":"debuggerHideText"}}function a(e){if(e.target.dataset.fontName&&"DIV"===e.target.tagName.toUpperCase())for(var t=e.target.dataset.fontName,a=document.getElementsByTagName("input"),r=0;r<a.length;++r){var i=a[r];i.dataset.fontName===t&&(i.checked=!i.checked,n(t,i.checked),i.scrollIntoView())}}var r,i=!1,o="data-font-name";return{id:"FontInspector",name:"Font Inspector",panel:null,manager:null,init:function(e){var n=this.panel;n.setAttribute("style","padding: 5px;");var a=document.createElement("button");a.addEventListener("click",t),a.textContent="Refresh",n.appendChild(a),r=document.createElement("div"),n.appendChild(r)},cleanup:function(){r.textContent=""},enabled:!1,get active(){return i},set active(n){i=n,i?(document.body.addEventListener("click",a,!0),t()):(document.body.removeEventListener("click",a,!0),e())},fontAdded:function(e,a){function i(e,t){for(var n=document.createElement("table"),a=0;a<t.length;a++){var r=document.createElement("tr"),i=document.createElement("td");i.textContent=t[a],r.appendChild(i);var o=document.createElement("td");o.textContent=e[t[a]].toString(),r.appendChild(o),n.appendChild(r)}return n}var o=i(e,["name","type"]),d=e.loadedName,l=document.createElement("div"),s=document.createElement("span");s.textContent=d;var c=document.createElement("a");a?(a=/url\(['"]?([^\)"']+)/.exec(a),c.href=a[1]):e.data&&(a=URL.createObjectURL(new Blob([e.data],{type:e.mimeType})),c.href=a),c.textContent="Download";var p=document.createElement("a");p.href="",p.textContent="Log",p.addEventListener("click",function(t){t.preventDefault(),console.log(e)});var u=document.createElement("input");u.setAttribute("type","checkbox"),u.dataset.fontName=d,u.addEventListener("click",function(e,t){return function(){n(t,e.checked)}}(u,d)),l.appendChild(u),l.appendChild(s),l.appendChild(document.createTextNode(" ")),l.appendChild(c),l.appendChild(document.createTextNode(" ")),l.appendChild(p),l.appendChild(o),r.appendChild(l),setTimeout(function(){this.active&&t()}.bind(this),2e3)}}}(),opMap,StepperManager=function(){var e=[],t=null,n=null,a=null,r=Object.create(null);return{id:"Stepper",name:"Stepper",panel:null,manager:null,init:function(e){var i=this;this.panel.setAttribute("style","padding: 5px;"),n=document.createElement("div"),a=document.createElement("select"),a.addEventListener("change",function(e){i.selectStepper(this.value)}),n.appendChild(a),t=document.createElement("div"),this.panel.appendChild(n),this.panel.appendChild(t),sessionStorage.getItem("pdfjsBreakPoints")&&(r=JSON.parse(sessionStorage.getItem("pdfjsBreakPoints"))),opMap=Object.create(null);for(var o in e.OPS)opMap[e.OPS[o]]=o},cleanup:function(){a.textContent="",t.textContent="",e=[]},enabled:!1,active:!1,create:function(n){var i=document.createElement("div");i.id="stepper"+n,i.setAttribute("hidden",!0),i.className="stepper",t.appendChild(i);var o=document.createElement("option");o.textContent="Page "+(n+1),o.value=n,a.appendChild(o);var d=r[n]||[],l=new Stepper(i,n,d);return e.push(l),1===e.length&&this.selectStepper(n,!1),l},selectStepper:function(t,n){var r;for(t|=0,n&&this.manager.selectPanel(this),r=0;r<e.length;++r){var i=e[r];i.pageIndex===t?i.panel.removeAttribute("hidden"):i.panel.setAttribute("hidden",!0)}var o=a.options;for(r=0;r<o.length;++r){var d=o[r];d.selected=(0|d.value)===t}},saveBreakPoints:function(e,t){r[e]=t,sessionStorage.setItem("pdfjsBreakPoints",JSON.stringify(r))}}}(),Stepper=function(){function e(e,t){var n=document.createElement(e);return t&&(n.textContent=t),n}function t(e){if("string"==typeof e){var n=75;return e.length<=n?e:e.substr(0,n)+"..."}if("object"!=typeof e||null===e)return e;if("length"in e){var a,r,i=[],o=10;for(a=0,r=Math.min(o,e.length);a<r;a++)i.push(t(e[a]));return a<e.length&&i.push("..."),i}var d={};for(var l in e)d[l]=t(e[l]);return d}function n(e,t,n){this.panel=e,this.breakPoint=0,this.nextBreakPoint=null,this.pageIndex=t,this.breakPoints=n,this.currentIdx=-1,this.operatorListIdx=0}return n.prototype={init:function(t){var n=this.panel,a=e("div","c=continue, s=step"),r=e("table");a.appendChild(r),r.cellSpacing=0;var i=e("tr");r.appendChild(i),i.appendChild(e("th","Break")),i.appendChild(e("th","Idx")),i.appendChild(e("th","fn")),i.appendChild(e("th","args")),n.appendChild(a),this.table=r,this.updateOperatorList(t)},updateOperatorList:function(n){function a(){var e=+this.dataset.idx;this.checked?r.breakPoints.push(e):r.breakPoints.splice(r.breakPoints.indexOf(e),1),StepperManager.saveBreakPoints(r.pageIndex,r.breakPoints)}var r=this,i=15e3;if(!(this.operatorListIdx>i)){for(var o=document.createDocumentFragment(),d=Math.min(i,n.fnArray.length),l=this.operatorListIdx;l<d;l++){var s=e("tr");s.className="line",s.dataset.idx=l,o.appendChild(s);var c=this.breakPoints.indexOf(l)!==-1,p=n.argsArray[l]||[],u=e("td"),h=e("input");h.type="checkbox",h.className="points",h.checked=c,h.dataset.idx=l,h.onclick=a,u.appendChild(h),s.appendChild(u),s.appendChild(e("td",l.toString()));var v=opMap[n.fnArray[l]],f=p;if("showText"===v){for(var m=p[0],g=[],b=[],C=0;C<m.length;C++){var x=m[C];"object"==typeof x&&null!==x?b.push(x.fontChar):(b.length>0&&(g.push(b.join("")),b=[]),g.push(x))}b.length>0&&g.push(b.join("")),f=[g]}s.appendChild(e("td",v)),s.appendChild(e("td",JSON.stringify(t(f))))}if(d<n.fnArray.length){s=e("tr");var k=e("td","...");k.colspan=4,o.appendChild(k)}this.operatorListIdx=n.fnArray.length,this.table.appendChild(o)}},getNextBreakPoint:function(){this.breakPoints.sort(function(e,t){return e-t});for(var e=0;e<this.breakPoints.length;e++)if(this.breakPoints[e]>this.currentIdx)return this.breakPoints[e];return null},breakIt:function(e,t){StepperManager.selectStepper(this.pageIndex,!0);var n=this,a=document;n.currentIdx=e;var r=function(e){switch(e.keyCode){case 83:a.removeEventListener("keydown",r,!1),n.nextBreakPoint=n.currentIdx+1,n.goTo(-1),t();break;case 67:a.removeEventListener("keydown",r,!1);var i=n.getNextBreakPoint();n.nextBreakPoint=i,n.goTo(-1),t()}};a.addEventListener("keydown",r,!1),n.goTo(e)},goTo:function(e){for(var t=this.panel.getElementsByClassName("line"),n=0,a=t.length;n<a;++n){var r=t[n];(0|r.dataset.idx)===e?(r.style.backgroundColor="rgb(251,250,207)",r.scrollIntoView()):r.style.backgroundColor=null}}},n}(),Stats=function(){function e(e){for(;e.hasChildNodes();)e.removeChild(e.lastChild)}function t(e){for(var t=0,a=n.length;t<a;++t)if(n[t].pageNumber===e)return t;return!1}var n=[];return{id:"Stats",name:"Stats",panel:null,manager:null,init:function(e){this.panel.setAttribute("style","padding: 5px;"),e.PDFJS.enableStats=!0},enabled:!1,active:!1,add:function(a,r){if(r){var i=t(a);if(i!==!1){var o=n[i];this.panel.removeChild(o.div),n.splice(i,1)}var d=document.createElement("div");d.className="stats";var l=document.createElement("div");l.className="title",l.textContent="Page: "+a;var s=document.createElement("div");s.textContent=r.toString(),d.appendChild(l),d.appendChild(s),n.push({pageNumber:a,div:d}),n.sort(function(e,t){return e.pageNumber-t.pageNumber}),e(this.panel);for(var c=0,p=n.length;c<p;++c)this.panel.appendChild(n[c].div)}},cleanup:function(){n=[],e(this.panel)}}}(),PDFBug=function(){var e=300,t=[],n=null;return{tools:[FontInspector,StepperManager,Stats],enable:function(e){var t=!1,n=this.tools;1===e.length&&"all"===e[0]&&(t=!0);for(var a=0;a<n.length;++a){var r=n[a];(t||e.indexOf(r.id)!==-1)&&(r.enabled=!0)}t||n.sort(function(t,a){var r=e.indexOf(t.id);r=r<0?n.length:r;var i=e.indexOf(a.id);return i=i<0?n.length:i,r-i})},init:function(n,a){var r=document.createElement("div");r.id="PDFBug";var i=document.createElement("div");i.setAttribute("class","controls"),r.appendChild(i);var o=document.createElement("div");o.setAttribute("class","panels"),r.appendChild(o),a.appendChild(r),a.style.right=e+"px";for(var d=this.tools,l=this,s=0;s<d.length;++s){var c=d[s],p=document.createElement("div"),u=document.createElement("button");u.textContent=c.name,u.addEventListener("click",function(e){return function(t){t.preventDefault(),l.selectPanel(e)}}(s)),i.appendChild(u),o.appendChild(p),c.panel=p,c.manager=this,c.enabled?c.init(n):p.textContent=c.name+' is disabled. To enable add  "'+c.id+'" to the pdfBug parameter and refresh (separate multiple by commas).',t.push(u)}this.selectPanel(0)},cleanup:function(){for(var e=0,t=this.tools.length;e<t;e++)this.tools[e].enabled&&this.tools[e].cleanup()},selectPanel:function(e){if("number"!=typeof e&&(e=this.tools.indexOf(e)),e!==n){n=e;for(var a=this.tools,r=0;r<a.length;++r)r===e?(t[r].setAttribute("class","active"),a[r].active=!0,a[r].panel.removeAttribute("hidden")):(t[r].setAttribute("class",""),a[r].active=!1,a[r].panel.setAttribute("hidden","true"))}}}}();