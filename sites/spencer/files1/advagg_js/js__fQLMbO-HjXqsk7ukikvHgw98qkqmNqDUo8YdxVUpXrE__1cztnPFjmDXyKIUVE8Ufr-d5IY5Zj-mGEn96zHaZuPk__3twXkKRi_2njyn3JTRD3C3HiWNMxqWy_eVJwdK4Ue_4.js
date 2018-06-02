/*jslint browser: true */ /*global jQuery: true */

/**
 * jQuery Cookie plugin
 *
 * Copyright (c) 2010 Klaus Hartl (stilbuero.de)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 */

// TODO JsDoc

/**
 * Create a cookie with the given key and value and other optional parameters.
 *
 * @example $.cookie('the_cookie', 'the_value');
 * @desc Set the value of a cookie.
 * @example $.cookie('the_cookie', 'the_value', { expires: 7, path: '/', domain: 'jquery.com', secure: true });
 * @desc Create a cookie with all available options.
 * @example $.cookie('the_cookie', 'the_value');
 * @desc Create a session cookie.
 * @example $.cookie('the_cookie', null);
 * @desc Delete a cookie by passing null as value. Keep in mind that you have to use the same path and domain
 *       used when the cookie was set.
 *
 * @param String key The key of the cookie.
 * @param String value The value of the cookie.
 * @param Object options An object literal containing key/value pairs to provide optional cookie attributes.
 * @option Number|Date expires Either an integer specifying the expiration date from now on in days or a Date object.
 *                             If a negative value is specified (e.g. a date in the past), the cookie will be deleted.
 *                             If set to null or omitted, the cookie will be a session cookie and will not be retained
 *                             when the the browser exits.
 * @option String path The value of the path atribute of the cookie (default: path of page that created the cookie).
 * @option String domain The value of the domain attribute of the cookie (default: domain of page that created the cookie).
 * @option Boolean secure If true, the secure attribute of the cookie will be set and the cookie transmission will
 *                        require a secure protocol (like HTTPS).
 * @type undefined
 *
 * @name $.cookie
 * @cat Plugins/Cookie
 * @author Klaus Hartl/klaus.hartl@stilbuero.de
 */

/**
 * Get the value of a cookie with the given key.
 *
 * @example $.cookie('the_cookie');
 * @desc Get the value of a cookie.
 *
 * @param String key The key of the cookie.
 * @return The value of the cookie.
 * @type String
 *
 * @name $.cookie
 * @cat Plugins/Cookie
 * @author Klaus Hartl/klaus.hartl@stilbuero.de
 */
jQuery.cookie = function (key, value, options) {

    // key and value given, set cookie...
    if (arguments.length > 1 && (value === null || typeof value !== "object")) {
        options = jQuery.extend({}, options);

        if (value === null) {
            options.expires = -1;
        }

        if (typeof options.expires === 'number') {
            var days = options.expires, t = options.expires = new Date();
            t.setDate(t.getDate() + days);
        }

        return (document.cookie = [
            encodeURIComponent(key), '=',
            options.raw ? String(value) : encodeURIComponent(String(value)),
            options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
            options.path ? '; path=' + options.path : '',
            options.domain ? '; domain=' + options.domain : '',
            options.secure ? '; secure' : ''
        ].join(''));
    }

    // key and possibly options given, get cookie...
    options = value || {};
    var result, decode = options.raw ? function (s) { return s; } : decodeURIComponent;
    return (result = new RegExp('(?:^|; )' + encodeURIComponent(key) + '=([^;]*)').exec(document.cookie)) ? decode(result[1]) : null;
};
;/**/
/*!
 * jQuery Form Plugin
 * version: 3.51.0-2014.06.20
 * Requires jQuery v1.5 or later
 * Copyright (c) 2014 M. Alsup
 * Examples and documentation at: http://malsup.com/jquery/form/
 * Project repository: https://github.com/malsup/form
 * Dual licensed under the MIT and GPL licenses.
 * https://github.com/malsup/form#copyright-and-license
 */
!function(e){"use strict";"function"==typeof define&&define.amd?define(["jquery"],e):e("undefined"!=typeof jQuery?jQuery:window.Zepto)}(function(e){"use strict";function t(t){var r=t.data;t.isDefaultPrevented()||(t.preventDefault(),e(t.target).ajaxSubmit(r))}function r(t){var r=t.target,a=e(r);if(!a.is("[type=submit],[type=image]")){var n=a.closest("[type=submit]");if(0===n.length)return;r=n[0]}var i=this;if(i.clk=r,"image"==r.type)if(void 0!==t.offsetX)i.clk_x=t.offsetX,i.clk_y=t.offsetY;else if("function"==typeof e.fn.offset){var o=a.offset();i.clk_x=t.pageX-o.left,i.clk_y=t.pageY-o.top}else i.clk_x=t.pageX-r.offsetLeft,i.clk_y=t.pageY-r.offsetTop;setTimeout(function(){i.clk=i.clk_x=i.clk_y=null},100)}function a(){if(e.fn.ajaxSubmit.debug){var t="[jquery.form] "+Array.prototype.join.call(arguments,"");window.console&&window.console.log?window.console.log(t):window.opera&&window.opera.postError&&window.opera.postError(t)}}var n={};n.fileapi=void 0!==e("<input type='file'/>").get(0).files,n.formdata=void 0!==window.FormData;var i=!!e.fn.prop;e.fn.attr2=function(){if(!i)return this.attr.apply(this,arguments);var e=this.prop.apply(this,arguments);return e&&e.jquery||"string"==typeof e?e:this.attr.apply(this,arguments)},e.fn.ajaxSubmit=function(t){function r(r){var a,n,i=e.param(r,t.traditional).split("&"),o=i.length,s=[];for(a=0;o>a;a++)i[a]=i[a].replace(/\+/g," "),n=i[a].split("="),s.push([decodeURIComponent(n[0]),decodeURIComponent(n[1])]);return s}function o(a){for(var n=new FormData,i=0;i<a.length;i++)n.append(a[i].name,a[i].value);if(t.extraData){var o=r(t.extraData);for(i=0;i<o.length;i++)o[i]&&n.append(o[i][0],o[i][1])}t.data=null;var s=e.extend(!0,{},e.ajaxSettings,t,{contentType:!1,processData:!1,cache:!1,type:u||"POST"});t.uploadProgress&&(s.xhr=function(){var r=e.ajaxSettings.xhr();return r.upload&&r.upload.addEventListener("progress",function(e){var r=0,a=e.loaded||e.position,n=e.total;e.lengthComputable&&(r=Math.ceil(a/n*100)),t.uploadProgress(e,a,n,r)},!1),r}),s.data=null;var c=s.beforeSend;return s.beforeSend=function(e,r){r.data=t.formData?t.formData:n,c&&c.call(this,e,r)},e.ajax(s)}function s(r){function n(e){var t=null;try{e.contentWindow&&(t=e.contentWindow.document)}catch(r){a("cannot get iframe.contentWindow document: "+r)}if(t)return t;try{t=e.contentDocument?e.contentDocument:e.document}catch(r){a("cannot get iframe.contentDocument: "+r),t=e.document}return t}function o(){function t(){try{var e=n(g).readyState;a("state = "+e),e&&"uninitialized"==e.toLowerCase()&&setTimeout(t,50)}catch(r){a("Server abort: ",r," (",r.name,")"),s(k),j&&clearTimeout(j),j=void 0}}var r=f.attr2("target"),i=f.attr2("action"),o="multipart/form-data",c=f.attr("enctype")||f.attr("encoding")||o;w.setAttribute("target",p),(!u||/post/i.test(u))&&w.setAttribute("method","POST"),i!=m.url&&w.setAttribute("action",m.url),m.skipEncodingOverride||u&&!/post/i.test(u)||f.attr({encoding:"multipart/form-data",enctype:"multipart/form-data"}),m.timeout&&(j=setTimeout(function(){T=!0,s(D)},m.timeout));var l=[];try{if(m.extraData)for(var d in m.extraData)m.extraData.hasOwnProperty(d)&&l.push(e.isPlainObject(m.extraData[d])&&m.extraData[d].hasOwnProperty("name")&&m.extraData[d].hasOwnProperty("value")?e('<input type="hidden" name="'+m.extraData[d].name+'">').val(m.extraData[d].value).appendTo(w)[0]:e('<input type="hidden" name="'+d+'">').val(m.extraData[d]).appendTo(w)[0]);m.iframeTarget||v.appendTo("body"),g.attachEvent?g.attachEvent("onload",s):g.addEventListener("load",s,!1),setTimeout(t,15);try{w.submit()}catch(h){var x=document.createElement("form").submit;x.apply(w)}}finally{w.setAttribute("action",i),w.setAttribute("enctype",c),r?w.setAttribute("target",r):f.removeAttr("target"),e(l).remove()}}function s(t){if(!x.aborted&&!F){if(M=n(g),M||(a("cannot access response document"),t=k),t===D&&x)return x.abort("timeout"),void S.reject(x,"timeout");if(t==k&&x)return x.abort("server abort"),void S.reject(x,"error","server abort");if(M&&M.location.href!=m.iframeSrc||T){g.detachEvent?g.detachEvent("onload",s):g.removeEventListener("load",s,!1);var r,i="success";try{if(T)throw"timeout";var o="xml"==m.dataType||M.XMLDocument||e.isXMLDoc(M);if(a("isXml="+o),!o&&window.opera&&(null===M.body||!M.body.innerHTML)&&--O)return a("requeing onLoad callback, DOM not available"),void setTimeout(s,250);var u=M.body?M.body:M.documentElement;x.responseText=u?u.innerHTML:null,x.responseXML=M.XMLDocument?M.XMLDocument:M,o&&(m.dataType="xml"),x.getResponseHeader=function(e){var t={"content-type":m.dataType};return t[e.toLowerCase()]},u&&(x.status=Number(u.getAttribute("status"))||x.status,x.statusText=u.getAttribute("statusText")||x.statusText);var c=(m.dataType||"").toLowerCase(),l=/(json|script|text)/.test(c);if(l||m.textarea){var f=M.getElementsByTagName("textarea")[0];if(f)x.responseText=f.value,x.status=Number(f.getAttribute("status"))||x.status,x.statusText=f.getAttribute("statusText")||x.statusText;else if(l){var p=M.getElementsByTagName("pre")[0],h=M.getElementsByTagName("body")[0];p?x.responseText=p.textContent?p.textContent:p.innerText:h&&(x.responseText=h.textContent?h.textContent:h.innerText)}}else"xml"==c&&!x.responseXML&&x.responseText&&(x.responseXML=X(x.responseText));try{E=_(x,c,m)}catch(y){i="parsererror",x.error=r=y||i}}catch(y){a("error caught: ",y),i="error",x.error=r=y||i}x.aborted&&(a("upload aborted"),i=null),x.status&&(i=x.status>=200&&x.status<300||304===x.status?"success":"error"),"success"===i?(m.success&&m.success.call(m.context,E,"success",x),S.resolve(x.responseText,"success",x),d&&e.event.trigger("ajaxSuccess",[x,m])):i&&(void 0===r&&(r=x.statusText),m.error&&m.error.call(m.context,x,i,r),S.reject(x,"error",r),d&&e.event.trigger("ajaxError",[x,m,r])),d&&e.event.trigger("ajaxComplete",[x,m]),d&&!--e.active&&e.event.trigger("ajaxStop"),m.complete&&m.complete.call(m.context,x,i),F=!0,m.timeout&&clearTimeout(j),setTimeout(function(){m.iframeTarget?v.attr("src",m.iframeSrc):v.remove(),x.responseXML=null},100)}}}var c,l,m,d,p,v,g,x,y,b,T,j,w=f[0],S=e.Deferred();if(S.abort=function(e){x.abort(e)},r)for(l=0;l<h.length;l++)c=e(h[l]),i?c.prop("disabled",!1):c.removeAttr("disabled");if(m=e.extend(!0,{},e.ajaxSettings,t),m.context=m.context||m,p="jqFormIO"+(new Date).getTime(),m.iframeTarget?(v=e(m.iframeTarget),b=v.attr2("name"),b?p=b:v.attr2("name",p)):(v=e('<iframe name="'+p+'" src="'+m.iframeSrc+'" />'),v.css({position:"absolute",top:"-1000px",left:"-1000px"})),g=v[0],x={aborted:0,responseText:null,responseXML:null,status:0,statusText:"n/a",getAllResponseHeaders:function(){},getResponseHeader:function(){},setRequestHeader:function(){},abort:function(t){var r="timeout"===t?"timeout":"aborted";a("aborting upload... "+r),this.aborted=1;try{g.contentWindow.document.execCommand&&g.contentWindow.document.execCommand("Stop")}catch(n){}v.attr("src",m.iframeSrc),x.error=r,m.error&&m.error.call(m.context,x,r,t),d&&e.event.trigger("ajaxError",[x,m,r]),m.complete&&m.complete.call(m.context,x,r)}},d=m.global,d&&0===e.active++&&e.event.trigger("ajaxStart"),d&&e.event.trigger("ajaxSend",[x,m]),m.beforeSend&&m.beforeSend.call(m.context,x,m)===!1)return m.global&&e.active--,S.reject(),S;if(x.aborted)return S.reject(),S;y=w.clk,y&&(b=y.name,b&&!y.disabled&&(m.extraData=m.extraData||{},m.extraData[b]=y.value,"image"==y.type&&(m.extraData[b+".x"]=w.clk_x,m.extraData[b+".y"]=w.clk_y)));var D=1,k=2,A=e("meta[name=csrf-token]").attr("content"),L=e("meta[name=csrf-param]").attr("content");L&&A&&(m.extraData=m.extraData||{},m.extraData[L]=A),m.forceSync?o():setTimeout(o,10);var E,M,F,O=50,X=e.parseXML||function(e,t){return window.ActiveXObject?(t=new ActiveXObject("Microsoft.XMLDOM"),t.async="false",t.loadXML(e)):t=(new DOMParser).parseFromString(e,"text/xml"),t&&t.documentElement&&"parsererror"!=t.documentElement.nodeName?t:null},C=e.parseJSON||function(e){return window.eval("("+e+")")},_=function(t,r,a){var n=t.getResponseHeader("content-type")||"",i="xml"===r||!r&&n.indexOf("xml")>=0,o=i?t.responseXML:t.responseText;return i&&"parsererror"===o.documentElement.nodeName&&e.error&&e.error("parsererror"),a&&a.dataFilter&&(o=a.dataFilter(o,r)),"string"==typeof o&&("json"===r||!r&&n.indexOf("json")>=0?o=C(o):("script"===r||!r&&n.indexOf("javascript")>=0)&&e.globalEval(o)),o};return S}if(!this.length)return a("ajaxSubmit: skipping submit process - no element selected"),this;var u,c,l,f=this;"function"==typeof t?t={success:t}:void 0===t&&(t={}),u=t.type||this.attr2("method"),c=t.url||this.attr2("action"),l="string"==typeof c?e.trim(c):"",l=l||window.location.href||"",l&&(l=(l.match(/^([^#]+)/)||[])[1]),t=e.extend(!0,{url:l,success:e.ajaxSettings.success,type:u||e.ajaxSettings.type,iframeSrc:/^https/i.test(window.location.href||"")?"javascript:false":"about:blank"},t);var m={};if(this.trigger("form-pre-serialize",[this,t,m]),m.veto)return a("ajaxSubmit: submit vetoed via form-pre-serialize trigger"),this;if(t.beforeSerialize&&t.beforeSerialize(this,t)===!1)return a("ajaxSubmit: submit aborted via beforeSerialize callback"),this;var d=t.traditional;void 0===d&&(d=e.ajaxSettings.traditional);var p,h=[],v=this.formToArray(t.semantic,h);if(t.data&&(t.extraData=t.data,p=e.param(t.data,d)),t.beforeSubmit&&t.beforeSubmit(v,this,t)===!1)return a("ajaxSubmit: submit aborted via beforeSubmit callback"),this;if(this.trigger("form-submit-validate",[v,this,t,m]),m.veto)return a("ajaxSubmit: submit vetoed via form-submit-validate trigger"),this;var g=e.param(v,d);p&&(g=g?g+"&"+p:p),"GET"==t.type.toUpperCase()?(t.url+=(t.url.indexOf("?")>=0?"&":"?")+g,t.data=null):t.data=g;var x=[];if(t.resetForm&&x.push(function(){f.resetForm()}),t.clearForm&&x.push(function(){f.clearForm(t.includeHidden)}),!t.dataType&&t.target){var y=t.success||function(){};x.push(function(r){var a=t.replaceTarget?"replaceWith":"html";e(t.target)[a](r).each(y,arguments)})}else t.success&&x.push(t.success);if(t.success=function(e,r,a){for(var n=t.context||this,i=0,o=x.length;o>i;i++)x[i].apply(n,[e,r,a||f,f])},t.error){var b=t.error;t.error=function(e,r,a){var n=t.context||this;b.apply(n,[e,r,a,f])}}if(t.complete){var T=t.complete;t.complete=function(e,r){var a=t.context||this;T.apply(a,[e,r,f])}}var j=e("input[type=file]:enabled",this).filter(function(){return""!==e(this).val()}),w=j.length>0,S="multipart/form-data",D=f.attr("enctype")==S||f.attr("encoding")==S,k=n.fileapi&&n.formdata;a("fileAPI :"+k);var A,L=(w||D)&&!k;t.iframe!==!1&&(t.iframe||L)?t.closeKeepAlive?e.get(t.closeKeepAlive,function(){A=s(v)}):A=s(v):A=(w||D)&&k?o(v):e.ajax(t),f.removeData("jqxhr").data("jqxhr",A);for(var E=0;E<h.length;E++)h[E]=null;return this.trigger("form-submit-notify",[this,t]),this},e.fn.ajaxForm=function(n){if(n=n||{},n.delegation=n.delegation&&e.isFunction(e.fn.on),!n.delegation&&0===this.length){var i={s:this.selector,c:this.context};return!e.isReady&&i.s?(a("DOM not ready, queuing ajaxForm"),e(function(){e(i.s,i.c).ajaxForm(n)}),this):(a("terminating; zero elements found by selector"+(e.isReady?"":" (DOM not ready)")),this)}return n.delegation?(e(document).off("submit.form-plugin",this.selector,t).off("click.form-plugin",this.selector,r).on("submit.form-plugin",this.selector,n,t).on("click.form-plugin",this.selector,n,r),this):this.ajaxFormUnbind().bind("submit.form-plugin",n,t).bind("click.form-plugin",n,r)},e.fn.ajaxFormUnbind=function(){return this.unbind("submit.form-plugin click.form-plugin")},e.fn.formToArray=function(t,r){var a=[];if(0===this.length)return a;var i,o=this[0],s=this.attr("id"),u=t?o.getElementsByTagName("*"):o.elements;if(u&&!/MSIE [678]/.test(navigator.userAgent)&&(u=e(u).get()),s&&(i=e(':input[form="'+s+'"]').get(),i.length&&(u=(u||[]).concat(i))),!u||!u.length)return a;var c,l,f,m,d,p,h;for(c=0,p=u.length;p>c;c++)if(d=u[c],f=d.name,f&&!d.disabled)if(t&&o.clk&&"image"==d.type)o.clk==d&&(a.push({name:f,value:e(d).val(),type:d.type}),a.push({name:f+".x",value:o.clk_x},{name:f+".y",value:o.clk_y}));else if(m=e.fieldValue(d,!0),m&&m.constructor==Array)for(r&&r.push(d),l=0,h=m.length;h>l;l++)a.push({name:f,value:m[l]});else if(n.fileapi&&"file"==d.type){r&&r.push(d);var v=d.files;if(v.length)for(l=0;l<v.length;l++)a.push({name:f,value:v[l],type:d.type});else a.push({name:f,value:"",type:d.type})}else null!==m&&"undefined"!=typeof m&&(r&&r.push(d),a.push({name:f,value:m,type:d.type,required:d.required}));if(!t&&o.clk){var g=e(o.clk),x=g[0];f=x.name,f&&!x.disabled&&"image"==x.type&&(a.push({name:f,value:g.val()}),a.push({name:f+".x",value:o.clk_x},{name:f+".y",value:o.clk_y}))}return a},e.fn.formSerialize=function(t){return e.param(this.formToArray(t))},e.fn.fieldSerialize=function(t){var r=[];return this.each(function(){var a=this.name;if(a){var n=e.fieldValue(this,t);if(n&&n.constructor==Array)for(var i=0,o=n.length;o>i;i++)r.push({name:a,value:n[i]});else null!==n&&"undefined"!=typeof n&&r.push({name:this.name,value:n})}}),e.param(r)},e.fn.fieldValue=function(t){for(var r=[],a=0,n=this.length;n>a;a++){var i=this[a],o=e.fieldValue(i,t);null===o||"undefined"==typeof o||o.constructor==Array&&!o.length||(o.constructor==Array?e.merge(r,o):r.push(o))}return r},e.fieldValue=function(t,r){var a=t.name,n=t.type,i=t.tagName.toLowerCase();if(void 0===r&&(r=!0),r&&(!a||t.disabled||"reset"==n||"button"==n||("checkbox"==n||"radio"==n)&&!t.checked||("submit"==n||"image"==n)&&t.form&&t.form.clk!=t||"select"==i&&-1==t.selectedIndex))return null;if("select"==i){var o=t.selectedIndex;if(0>o)return null;for(var s=[],u=t.options,c="select-one"==n,l=c?o+1:u.length,f=c?o:0;l>f;f++){var m=u[f];if(m.selected){var d=m.value;if(d||(d=m.attributes&&m.attributes.value&&!m.attributes.value.specified?m.text:m.value),c)return d;s.push(d)}}return s}return e(t).val()},e.fn.clearForm=function(t){return this.each(function(){e("input,select,textarea",this).clearFields(t)})},e.fn.clearFields=e.fn.clearInputs=function(t){var r=/^(?:color|date|datetime|email|month|number|password|range|search|tel|text|time|url|week)$/i;return this.each(function(){var a=this.type,n=this.tagName.toLowerCase();r.test(a)||"textarea"==n?this.value="":"checkbox"==a||"radio"==a?this.checked=!1:"select"==n?this.selectedIndex=-1:"file"==a?/MSIE/.test(navigator.userAgent)?e(this).replaceWith(e(this).clone(!0)):e(this).val(""):t&&(t===!0&&/hidden/.test(a)||"string"==typeof t&&e(this).is(t))&&(this.value="")})},e.fn.resetForm=function(){return this.each(function(){("function"==typeof this.reset||"object"==typeof this.reset&&!this.reset.nodeType)&&this.reset()})},e.fn.enable=function(e){return void 0===e&&(e=!0),this.each(function(){this.disabled=!e})},e.fn.selected=function(t){return void 0===t&&(t=!0),this.each(function(){var r=this.type;if("checkbox"==r||"radio"==r)this.checked=t;else if("option"==this.tagName.toLowerCase()){var a=e(this).parent("select");t&&a[0]&&"select-one"==a[0].type&&a.find("option").selected(!1),this.selected=t}})},e.fn.ajaxSubmit.debug=!1});;/**/
/*
jQuery Waypoints - v1.0.2
Copyright (c) 2011 Caleb Troughton
Dual licensed under the MIT license and GPL license.
https://github.com/imakewebthings/jquery-waypoints/blob/master/MIT-license.txt
https://github.com/imakewebthings/jquery-waypoints/blob/master/GPL-license.txt
*/
(function($,l,n,j,d){var f=$(j),k=[],m=-99999,i=false,o=false,g="waypoint.reached",c={init:function(q,p){this.each(function(){var u=$(this),r=h(u),t=r<0?$.fn[l].defaults:k[r].options,s=$.extend({},t,p);s.offset=s.offset==="bottom-in-view"?function(){return $[n]("viewportHeight")-$(this).outerHeight()}:s.offset;if(r<0){k.push({element:u,offset:u.offset().top,options:s})}else{k[r].options=s}q&&u.bind(g,q)});$[n]("refresh");return this},remove:function(){return this.each(function(){var p=h($(this));if(p>=0){k.splice(p,1)}})},destroy:function(){return this.unbind(g)[l]("remove")}};function h(q){var p=k.length-1;while(p>=0&&k[p].element[0]!==q[0]){p-=1}return p}function b(q,p){q.element.trigger(g,p);if(q.options.triggerOnce){q.element[l]("destroy")}}function e(){var q=f.scrollTop(),p=q>m,r=$.grep(k,function(t,s){return p?(t.offset>m&&t.offset<=q):(t.offset<=m&&t.offset>q)});if(!m||!q){$[n]("refresh")}m=q;if(!r.length){return}if($[n].settings.continuous){$.each(p?r:r.reverse(),function(t,s){b(s,[p?"down":"up"])})}else{b(r[p?r.length-1:0],[p?"down":"up"])}}$.fn[l]=function(p){if(c[p]){return c[p].apply(this,Array.prototype.slice.call(arguments,1))}else{if(typeof p==="function"||!p){return c.init.apply(this,arguments)}else{if(typeof p==="object"){return c.init.apply(this,[null,p])}else{$.error("Method "+p+" does not exist on jQuery"+l)}}}};$.fn[l].defaults={offset:0,triggerOnce:false};var a={refresh:function(){$.each(k,function(r,t){var p=0,s=t.offset;if(typeof t.options.offset==="function"){p=t.options.offset.apply(t.element)}else{if(typeof t.options.offset==="string"){var q=parseFloat(t.options.offset),p=t.options.offset.indexOf("%")?Math.ceil($[n]("viewportHeight")*(q/100)):q}else{p=t.options.offset}}t.offset=t.element.offset().top-p;if(m>s&&m<=t.offset){b(t,["up"])}else{if(m<s&&m>=t.offset){b(t,["down"])}}});k.sort(function(q,p){return q.offset-p.offset})},viewportHeight:function(){return(j.innerHeight?j.innerHeight:f.height())},aggregate:function(){var p=$();$.each(k,function(q,r){p=p.add(r.element)});return p}};$[n]=function(p){if(a[p]){return a[p].apply(this)}else{return a.aggregate()}};$[n].settings={continuous:true,resizeThrottle:200,scrollThrottle:100};f.scroll(function(){if(!i){i=true;j.setTimeout(function(){e();i=false},$[n].settings.scrollThrottle)}}).resize(function(){if(!o){o=true;j.setTimeout(function(){$[n]("refresh");o=false},$[n].settings.resizeThrottle)}}).load(function(){$[n]("refresh");e()})})(jQuery,"waypoint","waypoints",this);;/**/
(function ($) {

/**
 * Provides Ajax page updating via jQuery $.ajax (Asynchronous JavaScript and XML).
 *
 * Ajax is a method of making a request via JavaScript while viewing an HTML
 * page. The request returns an array of commands encoded in JSON, which is
 * then executed to make any changes that are necessary to the page.
 *
 * Drupal uses this file to enhance form elements with #ajax['path'] and
 * #ajax['wrapper'] properties. If set, this file will automatically be included
 * to provide Ajax capabilities.
 */

Drupal.ajax = Drupal.ajax || {};

Drupal.settings.urlIsAjaxTrusted = Drupal.settings.urlIsAjaxTrusted || {};

/**
 * Attaches the Ajax behavior to each Ajax form element.
 */
Drupal.behaviors.AJAX = {
  attach: function (context, settings) {
    // Load all Ajax behaviors specified in the settings.
    for (var base in settings.ajax) {
      if (!$('#' + base + '.ajax-processed').length) {
        var element_settings = settings.ajax[base];

        if (typeof element_settings.selector == 'undefined') {
          element_settings.selector = '#' + base;
        }
        $(element_settings.selector).each(function () {
          element_settings.element = this;
          Drupal.ajax[base] = new Drupal.ajax(base, this, element_settings);
        });

        $('#' + base).addClass('ajax-processed');
      }
    }

    // Bind Ajax behaviors to all items showing the class.
    $('.use-ajax:not(.ajax-processed)').addClass('ajax-processed').each(function () {
      var element_settings = {};
      // Clicked links look better with the throbber than the progress bar.
      element_settings.progress = { 'type': 'throbber' };

      // For anchor tags, these will go to the target of the anchor rather
      // than the usual location.
      if ($(this).attr('href')) {
        element_settings.url = $(this).attr('href');
        element_settings.event = 'click';
      }
      var base = $(this).attr('id');
      Drupal.ajax[base] = new Drupal.ajax(base, this, element_settings);
    });

    // This class means to submit the form to the action using Ajax.
    $('.use-ajax-submit:not(.ajax-processed)').addClass('ajax-processed').each(function () {
      var element_settings = {};

      // Ajax submits specified in this manner automatically submit to the
      // normal form action.
      element_settings.url = $(this.form).attr('action');
      // Form submit button clicks need to tell the form what was clicked so
      // it gets passed in the POST request.
      element_settings.setClick = true;
      // Form buttons use the 'click' event rather than mousedown.
      element_settings.event = 'click';
      // Clicked form buttons look better with the throbber than the progress bar.
      element_settings.progress = { 'type': 'throbber' };

      var base = $(this).attr('id');
      Drupal.ajax[base] = new Drupal.ajax(base, this, element_settings);
    });
  }
};

/**
 * Ajax object.
 *
 * All Ajax objects on a page are accessible through the global Drupal.ajax
 * object and are keyed by the submit button's ID. You can access them from
 * your module's JavaScript file to override properties or functions.
 *
 * For example, if your Ajax enabled button has the ID 'edit-submit', you can
 * redefine the function that is called to insert the new content like this
 * (inside a Drupal.behaviors attach block):
 * @code
 *    Drupal.behaviors.myCustomAJAXStuff = {
 *      attach: function (context, settings) {
 *        Drupal.ajax['edit-submit'].commands.insert = function (ajax, response, status) {
 *          new_content = $(response.data);
 *          $('#my-wrapper').append(new_content);
 *          alert('New content was appended to #my-wrapper');
 *        }
 *      }
 *    };
 * @endcode
 */
Drupal.ajax = function (base, element, element_settings) {
  var defaults = {
    url: 'system/ajax',
    event: 'mousedown',
    keypress: true,
    selector: '#' + base,
    effect: 'none',
    speed: 'none',
    method: 'replaceWith',
    progress: {
      type: 'throbber',
      message: Drupal.t('Please wait...')
    },
    submit: {
      'js': true
    }
  };

  $.extend(this, defaults, element_settings);

  this.element = element;
  this.element_settings = element_settings;

  // Replacing 'nojs' with 'ajax' in the URL allows for an easy method to let
  // the server detect when it needs to degrade gracefully.
  // There are five scenarios to check for:
  // 1. /nojs/
  // 2. /nojs$ - The end of a URL string.
  // 3. /nojs? - Followed by a query (with clean URLs enabled).
  //      E.g.: path/nojs?destination=foobar
  // 4. /nojs& - Followed by a query (without clean URLs enabled).
  //      E.g.: ?q=path/nojs&destination=foobar
  // 5. /nojs# - Followed by a fragment.
  //      E.g.: path/nojs#myfragment
  this.url = element_settings.url.replace(/\/nojs(\/|$|\?|&|#)/g, '/ajax$1');
  // If the 'nojs' version of the URL is trusted, also trust the 'ajax' version.
  if (Drupal.settings.urlIsAjaxTrusted[element_settings.url]) {
    Drupal.settings.urlIsAjaxTrusted[this.url] = true;
  }

  this.wrapper = '#' + element_settings.wrapper;

  // If there isn't a form, jQuery.ajax() will be used instead, allowing us to
  // bind Ajax to links as well.
  if (this.element.form) {
    this.form = $(this.element.form);
  }

  // Set the options for the ajaxSubmit function.
  // The 'this' variable will not persist inside of the options object.
  var ajax = this;
  ajax.options = {
    url: ajax.url,
    data: ajax.submit,
    beforeSerialize: function (element_settings, options) {
      return ajax.beforeSerialize(element_settings, options);
    },
    beforeSubmit: function (form_values, element_settings, options) {
      ajax.ajaxing = true;
      return ajax.beforeSubmit(form_values, element_settings, options);
    },
    beforeSend: function (xmlhttprequest, options) {
      ajax.ajaxing = true;
      return ajax.beforeSend(xmlhttprequest, options);
    },
    success: function (response, status, xmlhttprequest) {
      // Sanity check for browser support (object expected).
      // When using iFrame uploads, responses must be returned as a string.
      if (typeof response == 'string') {
        response = $.parseJSON(response);
      }

      // Prior to invoking the response's commands, verify that they can be
      // trusted by checking for a response header. See
      // ajax_set_verification_header() for details.
      // - Empty responses are harmless so can bypass verification. This avoids
      //   an alert message for server-generated no-op responses that skip Ajax
      //   rendering.
      // - Ajax objects with trusted URLs (e.g., ones defined server-side via
      //   #ajax) can bypass header verification. This is especially useful for
      //   Ajax with multipart forms. Because IFRAME transport is used, the
      //   response headers cannot be accessed for verification.
      if (response !== null && !Drupal.settings.urlIsAjaxTrusted[ajax.url]) {
        if (xmlhttprequest.getResponseHeader('X-Drupal-Ajax-Token') !== '1') {
          var customMessage = Drupal.t("The response failed verification so will not be processed.");
          return ajax.error(xmlhttprequest, ajax.url, customMessage);
        }
      }

      return ajax.success(response, status);
    },
    complete: function (xmlhttprequest, status) {
      ajax.ajaxing = false;
      if (status == 'error' || status == 'parsererror') {
        return ajax.error(xmlhttprequest, ajax.url);
      }
    },
    dataType: 'json',
    type: 'POST'
  };

  // Bind the ajaxSubmit function to the element event.
  $(ajax.element).bind(element_settings.event, function (event) {
    if (!Drupal.settings.urlIsAjaxTrusted[ajax.url] && !Drupal.urlIsLocal(ajax.url)) {
      throw new Error(Drupal.t('The callback URL is not local and not trusted: !url', {'!url': ajax.url}));
    }
    return ajax.eventResponse(this, event);
  });

  // If necessary, enable keyboard submission so that Ajax behaviors
  // can be triggered through keyboard input as well as e.g. a mousedown
  // action.
  if (element_settings.keypress) {
    $(ajax.element).keypress(function (event) {
      return ajax.keypressResponse(this, event);
    });
  }

  // If necessary, prevent the browser default action of an additional event.
  // For example, prevent the browser default action of a click, even if the
  // AJAX behavior binds to mousedown.
  if (element_settings.prevent) {
    $(ajax.element).bind(element_settings.prevent, false);
  }
};

/**
 * Handle a key press.
 *
 * The Ajax object will, if instructed, bind to a key press response. This
 * will test to see if the key press is valid to trigger this event and
 * if it is, trigger it for us and prevent other keypresses from triggering.
 * In this case we're handling RETURN and SPACEBAR keypresses (event codes 13
 * and 32. RETURN is often used to submit a form when in a textfield, and 
 * SPACE is often used to activate an element without submitting. 
 */
Drupal.ajax.prototype.keypressResponse = function (element, event) {
  // Create a synonym for this to reduce code confusion.
  var ajax = this;

  // Detect enter key and space bar and allow the standard response for them,
  // except for form elements of type 'text' and 'textarea', where the 
  // spacebar activation causes inappropriate activation if #ajax['keypress'] is 
  // TRUE. On a text-type widget a space should always be a space.
  if (event.which == 13 || (event.which == 32 && element.type != 'text' && element.type != 'textarea')) {
    $(ajax.element_settings.element).trigger(ajax.element_settings.event);
    return false;
  }
};

/**
 * Handle an event that triggers an Ajax response.
 *
 * When an event that triggers an Ajax response happens, this method will
 * perform the actual Ajax call. It is bound to the event using
 * bind() in the constructor, and it uses the options specified on the
 * ajax object.
 */
Drupal.ajax.prototype.eventResponse = function (element, event) {
  // Create a synonym for this to reduce code confusion.
  var ajax = this;

  // Do not perform another ajax command if one is already in progress.
  if (ajax.ajaxing) {
    return false;
  }

  try {
    if (ajax.form) {
      // If setClick is set, we must set this to ensure that the button's
      // value is passed.
      if (ajax.setClick) {
        // Mark the clicked button. 'form.clk' is a special variable for
        // ajaxSubmit that tells the system which element got clicked to
        // trigger the submit. Without it there would be no 'op' or
        // equivalent.
        element.form.clk = element;
      }

      ajax.form.ajaxSubmit(ajax.options);
    }
    else {
      ajax.beforeSerialize(ajax.element, ajax.options);
      $.ajax(ajax.options);
    }
  }
  catch (e) {
    // Unset the ajax.ajaxing flag here because it won't be unset during
    // the complete response.
    ajax.ajaxing = false;
    alert("An error occurred while attempting to process " + ajax.options.url + ": " + e.message);
  }

  // For radio/checkbox, allow the default event. On IE, this means letting
  // it actually check the box.
  if (typeof element.type != 'undefined' && (element.type == 'checkbox' || element.type == 'radio')) {
    return true;
  }
  else {
    return false;
  }

};

/**
 * Handler for the form serialization.
 *
 * Runs before the beforeSend() handler (see below), and unlike that one, runs
 * before field data is collected.
 */
Drupal.ajax.prototype.beforeSerialize = function (element, options) {
  // Allow detaching behaviors to update field values before collecting them.
  // This is only needed when field values are added to the POST data, so only
  // when there is a form such that this.form.ajaxSubmit() is used instead of
  // $.ajax(). When there is no form and $.ajax() is used, beforeSerialize()
  // isn't called, but don't rely on that: explicitly check this.form.
  if (this.form) {
    var settings = this.settings || Drupal.settings;
    Drupal.detachBehaviors(this.form, settings, 'serialize');
  }

  // Prevent duplicate HTML ids in the returned markup.
  // @see drupal_html_id()
  options.data['ajax_html_ids[]'] = [];
  $('[id]').each(function () {
    options.data['ajax_html_ids[]'].push(this.id);
  });

  // Allow Drupal to return new JavaScript and CSS files to load without
  // returning the ones already loaded.
  // @see ajax_base_page_theme()
  // @see drupal_get_css()
  // @see drupal_get_js()
  options.data['ajax_page_state[theme]'] = Drupal.settings.ajaxPageState.theme;
  options.data['ajax_page_state[theme_token]'] = Drupal.settings.ajaxPageState.theme_token;
  for (var key in Drupal.settings.ajaxPageState.css) {
    options.data['ajax_page_state[css][' + key + ']'] = 1;
  }
  for (var key in Drupal.settings.ajaxPageState.js) {
    options.data['ajax_page_state[js][' + key + ']'] = 1;
  }
};

/**
 * Modify form values prior to form submission.
 */
Drupal.ajax.prototype.beforeSubmit = function (form_values, element, options) {
  // This function is left empty to make it simple to override for modules
  // that wish to add functionality here.
};

/**
 * Prepare the Ajax request before it is sent.
 */
Drupal.ajax.prototype.beforeSend = function (xmlhttprequest, options) {
  // For forms without file inputs, the jQuery Form plugin serializes the form
  // values, and then calls jQuery's $.ajax() function, which invokes this
  // handler. In this circumstance, options.extraData is never used. For forms
  // with file inputs, the jQuery Form plugin uses the browser's normal form
  // submission mechanism, but captures the response in a hidden IFRAME. In this
  // circumstance, it calls this handler first, and then appends hidden fields
  // to the form to submit the values in options.extraData. There is no simple
  // way to know which submission mechanism will be used, so we add to extraData
  // regardless, and allow it to be ignored in the former case.
  if (this.form) {
    options.extraData = options.extraData || {};

    // Let the server know when the IFRAME submission mechanism is used. The
    // server can use this information to wrap the JSON response in a TEXTAREA,
    // as per http://jquery.malsup.com/form/#file-upload.
    options.extraData.ajax_iframe_upload = '1';

    // The triggering element is about to be disabled (see below), but if it
    // contains a value (e.g., a checkbox, textfield, select, etc.), ensure that
    // value is included in the submission. As per above, submissions that use
    // $.ajax() are already serialized prior to the element being disabled, so
    // this is only needed for IFRAME submissions.
    var v = $.fieldValue(this.element);
    if (v !== null) {
      options.extraData[this.element.name] = Drupal.checkPlain(v);
    }
  }

  // Disable the element that received the change to prevent user interface
  // interaction while the Ajax request is in progress. ajax.ajaxing prevents
  // the element from triggering a new request, but does not prevent the user
  // from changing its value.
  $(this.element).addClass('progress-disabled').attr('disabled', true);

  // Insert progressbar or throbber.
  if (this.progress.type == 'bar') {
    var progressBar = new Drupal.progressBar('ajax-progress-' + this.element.id, eval(this.progress.update_callback), this.progress.method, eval(this.progress.error_callback));
    if (this.progress.message) {
      progressBar.setProgress(-1, this.progress.message);
    }
    if (this.progress.url) {
      progressBar.startMonitoring(this.progress.url, this.progress.interval || 1500);
    }
    this.progress.element = $(progressBar.element).addClass('ajax-progress ajax-progress-bar');
    this.progress.object = progressBar;
    $(this.element).after(this.progress.element);
  }
  else if (this.progress.type == 'throbber') {
    this.progress.element = $('<div class="ajax-progress ajax-progress-throbber"><div class="throbber">&nbsp;</div></div>');
    if (this.progress.message) {
      $('.throbber', this.progress.element).after('<div class="message">' + this.progress.message + '</div>');
    }
    $(this.element).after(this.progress.element);
  }
};

/**
 * Handler for the form redirection completion.
 */
Drupal.ajax.prototype.success = function (response, status) {
  // Remove the progress element.
  if (this.progress.element) {
    $(this.progress.element).remove();
  }
  if (this.progress.object) {
    this.progress.object.stopMonitoring();
  }
  $(this.element).removeClass('progress-disabled').removeAttr('disabled');

  Drupal.freezeHeight();

  for (var i in response) {
    if (response.hasOwnProperty(i) && response[i]['command'] && this.commands[response[i]['command']]) {
      this.commands[response[i]['command']](this, response[i], status);
    }
  }

  // Reattach behaviors, if they were detached in beforeSerialize(). The
  // attachBehaviors() called on the new content from processing the response
  // commands is not sufficient, because behaviors from the entire form need
  // to be reattached.
  if (this.form) {
    var settings = this.settings || Drupal.settings;
    Drupal.attachBehaviors(this.form, settings);
  }

  Drupal.unfreezeHeight();

  // Remove any response-specific settings so they don't get used on the next
  // call by mistake.
  this.settings = null;
};

/**
 * Build an effect object which tells us how to apply the effect when adding new HTML.
 */
Drupal.ajax.prototype.getEffect = function (response) {
  var type = response.effect || this.effect;
  var speed = response.speed || this.speed;

  var effect = {};
  if (type == 'none') {
    effect.showEffect = 'show';
    effect.hideEffect = 'hide';
    effect.showSpeed = '';
  }
  else if (type == 'fade') {
    effect.showEffect = 'fadeIn';
    effect.hideEffect = 'fadeOut';
    effect.showSpeed = speed;
  }
  else {
    effect.showEffect = type + 'Toggle';
    effect.hideEffect = type + 'Toggle';
    effect.showSpeed = speed;
  }

  return effect;
};

/**
 * Handler for the form redirection error.
 */
Drupal.ajax.prototype.error = function (xmlhttprequest, uri, customMessage) {
  Drupal.displayAjaxError(Drupal.ajaxError(xmlhttprequest, uri, customMessage));
  // Remove the progress element.
  if (this.progress.element) {
    $(this.progress.element).remove();
  }
  if (this.progress.object) {
    this.progress.object.stopMonitoring();
  }
  // Undo hide.
  $(this.wrapper).show();
  // Re-enable the element.
  $(this.element).removeClass('progress-disabled').removeAttr('disabled');
  // Reattach behaviors, if they were detached in beforeSerialize().
  if (this.form) {
    var settings = this.settings || Drupal.settings;
    Drupal.attachBehaviors(this.form, settings);
  }
};

/**
 * Provide a series of commands that the server can request the client perform.
 */
Drupal.ajax.prototype.commands = {
  /**
   * Command to insert new content into the DOM.
   */
  insert: function (ajax, response, status) {
    // Get information from the response. If it is not there, default to
    // our presets.
    var wrapper = response.selector ? $(response.selector) : $(ajax.wrapper);
    var method = response.method || ajax.method;
    var effect = ajax.getEffect(response);

    // We don't know what response.data contains: it might be a string of text
    // without HTML, so don't rely on jQuery correctly iterpreting
    // $(response.data) as new HTML rather than a CSS selector. Also, if
    // response.data contains top-level text nodes, they get lost with either
    // $(response.data) or $('<div></div>').replaceWith(response.data).
    var new_content_wrapped = $('<div></div>').html(response.data);
    var new_content = new_content_wrapped.contents();

    // For legacy reasons, the effects processing code assumes that new_content
    // consists of a single top-level element. Also, it has not been
    // sufficiently tested whether attachBehaviors() can be successfully called
    // with a context object that includes top-level text nodes. However, to
    // give developers full control of the HTML appearing in the page, and to
    // enable Ajax content to be inserted in places where DIV elements are not
    // allowed (e.g., within TABLE, TR, and SPAN parents), we check if the new
    // content satisfies the requirement of a single top-level element, and
    // only use the container DIV created above when it doesn't. For more
    // information, please see http://drupal.org/node/736066.
    if (new_content.length != 1 || new_content.get(0).nodeType != 1) {
      new_content = new_content_wrapped;
    }

    // If removing content from the wrapper, detach behaviors first.
    switch (method) {
      case 'html':
      case 'replaceWith':
      case 'replaceAll':
      case 'empty':
      case 'remove':
        var settings = response.settings || ajax.settings || Drupal.settings;
        Drupal.detachBehaviors(wrapper, settings);
    }

    // Add the new content to the page.
    wrapper[method](new_content);

    // Immediately hide the new content if we're using any effects.
    if (effect.showEffect != 'show') {
      new_content.hide();
    }

    // Determine which effect to use and what content will receive the
    // effect, then show the new content.
    if ($('.ajax-new-content', new_content).length > 0) {
      $('.ajax-new-content', new_content).hide();
      new_content.show();
      $('.ajax-new-content', new_content)[effect.showEffect](effect.showSpeed);
    }
    else if (effect.showEffect != 'show') {
      new_content[effect.showEffect](effect.showSpeed);
    }

    // Attach all JavaScript behaviors to the new content, if it was successfully
    // added to the page, this if statement allows #ajax['wrapper'] to be
    // optional.
    if (new_content.parents('html').length > 0) {
      // Apply any settings from the returned JSON if available.
      var settings = response.settings || ajax.settings || Drupal.settings;
      Drupal.attachBehaviors(new_content, settings);
    }
  },

  /**
   * Command to remove a chunk from the page.
   */
  remove: function (ajax, response, status) {
    var settings = response.settings || ajax.settings || Drupal.settings;
    Drupal.detachBehaviors($(response.selector), settings);
    $(response.selector).remove();
  },

  /**
   * Command to mark a chunk changed.
   */
  changed: function (ajax, response, status) {
    if (!$(response.selector).hasClass('ajax-changed')) {
      $(response.selector).addClass('ajax-changed');
      if (response.asterisk) {
        $(response.selector).find(response.asterisk).append(' <span class="ajax-changed">*</span> ');
      }
    }
  },

  /**
   * Command to provide an alert.
   */
  alert: function (ajax, response, status) {
    alert(response.text, response.title);
  },

  /**
   * Command to provide the jQuery css() function.
   */
  css: function (ajax, response, status) {
    $(response.selector).css(response.argument);
  },

  /**
   * Command to set the settings that will be used for other commands in this response.
   */
  settings: function (ajax, response, status) {
    if (response.merge) {
      $.extend(true, Drupal.settings, response.settings);
    }
    else {
      ajax.settings = response.settings;
    }
  },

  /**
   * Command to attach data using jQuery's data API.
   */
  data: function (ajax, response, status) {
    $(response.selector).data(response.name, response.value);
  },

  /**
   * Command to apply a jQuery method.
   */
  invoke: function (ajax, response, status) {
    var $element = $(response.selector);
    $element[response.method].apply($element, response.arguments);
  },

  /**
   * Command to restripe a table.
   */
  restripe: function (ajax, response, status) {
    // :even and :odd are reversed because jQuery counts from 0 and
    // we count from 1, so we're out of sync.
    // Match immediate children of the parent element to allow nesting.
    $('> tbody > tr:visible, > tr:visible', $(response.selector))
      .removeClass('odd even')
      .filter(':even').addClass('odd').end()
      .filter(':odd').addClass('even');
  },

  /**
   * Command to add css.
   *
   * Uses the proprietary addImport method if available as browsers which
   * support that method ignore @import statements in dynamically added
   * stylesheets.
   */
  add_css: function (ajax, response, status) {
    // Add the styles in the normal way.
    $('head').prepend(response.data);
    // Add imports in the styles using the addImport method if available.
    var match, importMatch = /^@import url\("(.*)"\);$/igm;
    if (document.styleSheets[0].addImport && importMatch.test(response.data)) {
      importMatch.lastIndex = 0;
      while (match = importMatch.exec(response.data)) {
        document.styleSheets[0].addImport(match[1]);
      }
    }
  },

  /**
   * Command to update a form's build ID.
   */
  updateBuildId: function(ajax, response, status) {
    $('input[name="form_build_id"][value="' + response['old'] + '"]').val(response['new']);
  }
};

})(jQuery);
;/**/
(function (D) {
  var beforeSerialize = D.ajax.prototype.beforeSerialize;
  D.ajax.prototype.beforeSerialize = function (element, options) {
    beforeSerialize.call(this, element, options);
    options.data['ajax_page_state[jquery_version]'] = D.settings.ajaxPageState.jquery_version;
  }
})(Drupal);
;/**/
(function ($) {

Drupal.behaviors.initModalFormsLogin = {
  attach: function (context, settings) {
    $("a[href*='/user/login'], a[href*='?q=user/login']", context).once('init-modal-forms-login', function () {
      this.href = this.href.replace(/user\/login/,'modal_forms/nojs/login');
    }).addClass('ctools-use-modal ctools-modal-modal-popup-small');
  }
};

})(jQuery);
;/**/
(function ($) {

/**
 * A progressbar object. Initialized with the given id. Must be inserted into
 * the DOM afterwards through progressBar.element.
 *
 * method is the function which will perform the HTTP request to get the
 * progress bar state. Either "GET" or "POST".
 *
 * e.g. pb = new progressBar('myProgressBar');
 *      some_element.appendChild(pb.element);
 */
Drupal.progressBar = function (id, updateCallback, method, errorCallback) {
  var pb = this;
  this.id = id;
  this.method = method || 'GET';
  this.updateCallback = updateCallback;
  this.errorCallback = errorCallback;

  // The WAI-ARIA setting aria-live="polite" will announce changes after users
  // have completed their current activity and not interrupt the screen reader.
  this.element = $('<div class="progress" aria-live="polite"></div>').attr('id', id);
  this.element.html('<div class="bar"><div class="filled"></div></div>' +
                    '<div class="percentage"></div>' +
                    '<div class="message">&nbsp;</div>');
};

/**
 * Set the percentage and status message for the progressbar.
 */
Drupal.progressBar.prototype.setProgress = function (percentage, message) {
  if (percentage >= 0 && percentage <= 100) {
    $('div.filled', this.element).css('width', percentage + '%');
    $('div.percentage', this.element).html(percentage + '%');
  }
  $('div.message', this.element).html(message);
  if (this.updateCallback) {
    this.updateCallback(percentage, message, this);
  }
};

/**
 * Start monitoring progress via Ajax.
 */
Drupal.progressBar.prototype.startMonitoring = function (uri, delay) {
  this.delay = delay;
  this.uri = uri;
  this.sendPing();
};

/**
 * Stop monitoring progress via Ajax.
 */
Drupal.progressBar.prototype.stopMonitoring = function () {
  clearTimeout(this.timer);
  // This allows monitoring to be stopped from within the callback.
  this.uri = null;
};

/**
 * Request progress data from server.
 */
Drupal.progressBar.prototype.sendPing = function () {
  if (this.timer) {
    clearTimeout(this.timer);
  }
  if (this.uri) {
    var pb = this;
    // When doing a post request, you need non-null data. Otherwise a
    // HTTP 411 or HTTP 406 (with Apache mod_security) error may result.
    $.ajax({
      type: this.method,
      url: this.uri,
      data: '',
      dataType: 'json',
      success: function (progress) {
        // Display errors.
        if (progress.status == 0) {
          pb.displayError(progress.data);
          return;
        }
        // Update display.
        pb.setProgress(progress.percentage, progress.message);
        // Schedule next timer.
        pb.timer = setTimeout(function () { pb.sendPing(); }, pb.delay);
      },
      error: function (xmlhttp) {
        pb.displayError(Drupal.ajaxError(xmlhttp, pb.uri));
      }
    });
  }
};

/**
 * Display errors on the page.
 */
Drupal.progressBar.prototype.displayError = function (string) {
  var error = $('<div class="messages error"></div>').html(string);
  $(this.element).before(error).hide();

  if (this.errorCallback) {
    this.errorCallback(this);
  }
};

})(jQuery);
;/**/
/**
 * @file
 *
 * Implement a modal form.
 *
 * @see modal.inc for documentation.
 *
 * This javascript relies on the CTools ajax responder.
 */

(function ($) {
  // Make sure our objects are defined.
  Drupal.CTools = Drupal.CTools || {};
  Drupal.CTools.Modal = Drupal.CTools.Modal || {};

  /**
   * Display the modal
   *
   * @todo -- document the settings.
   */
  Drupal.CTools.Modal.show = function(choice) {
    var opts = {};

    if (choice && typeof choice == 'string' && Drupal.settings[choice]) {
      // This notation guarantees we are actually copying it.
      $.extend(true, opts, Drupal.settings[choice]);
    }
    else if (choice) {
      $.extend(true, opts, choice);
    }

    var defaults = {
      modalTheme: 'CToolsModalDialog',
      throbberTheme: 'CToolsModalThrobber',
      animation: 'show',
      animationSpeed: 'fast',
      modalSize: {
        type: 'scale',
        width: .8,
        height: .8,
        addWidth: 0,
        addHeight: 0,
        // How much to remove from the inner content to make space for the
        // theming.
        contentRight: 25,
        contentBottom: 45
      },
      modalOptions: {
        opacity: .55,
        background: '#fff'
      },
      modalClass: 'default'
    };

    var settings = {};
    $.extend(true, settings, defaults, Drupal.settings.CToolsModal, opts);

    if (Drupal.CTools.Modal.currentSettings && Drupal.CTools.Modal.currentSettings != settings) {
      Drupal.CTools.Modal.modal.remove();
      Drupal.CTools.Modal.modal = null;
    }

    Drupal.CTools.Modal.currentSettings = settings;

    var resize = function(e) {
      // When creating the modal, it actually exists only in a theoretical
      // place that is not in the DOM. But once the modal exists, it is in the
      // DOM so the context must be set appropriately.
      var context = e ? document : Drupal.CTools.Modal.modal;

      if (Drupal.CTools.Modal.currentSettings.modalSize.type == 'scale') {
        var width = $(window).width() * Drupal.CTools.Modal.currentSettings.modalSize.width;
        var height = $(window).height() * Drupal.CTools.Modal.currentSettings.modalSize.height;
      }
      else {
        var width = Drupal.CTools.Modal.currentSettings.modalSize.width;
        var height = Drupal.CTools.Modal.currentSettings.modalSize.height;
      }

      // Use the additionol pixels for creating the width and height.
      $('div.ctools-modal-content', context).css({
        'width': width + Drupal.CTools.Modal.currentSettings.modalSize.addWidth + 'px',
        'height': height + Drupal.CTools.Modal.currentSettings.modalSize.addHeight + 'px'
      });
      $('div.ctools-modal-content .modal-content', context).css({
        'width': (width - Drupal.CTools.Modal.currentSettings.modalSize.contentRight) + 'px',
        'height': (height - Drupal.CTools.Modal.currentSettings.modalSize.contentBottom) + 'px'
      });
    }

    if (!Drupal.CTools.Modal.modal) {
      Drupal.CTools.Modal.modal = $(Drupal.theme(settings.modalTheme));
      if (settings.modalSize.type == 'scale') {
        $(window).bind('resize', resize);
      }
    }

    resize();

    $('span.modal-title', Drupal.CTools.Modal.modal).html(Drupal.CTools.Modal.currentSettings.loadingText);
    Drupal.CTools.Modal.modalContent(Drupal.CTools.Modal.modal, settings.modalOptions, settings.animation, settings.animationSpeed, settings.modalClass);
    $('#modalContent .modal-content').html(Drupal.theme(settings.throbberTheme)).addClass('ctools-modal-loading');

    // Position autocomplete results based on the scroll position of the modal.
    $('#modalContent .modal-content').delegate('input.form-autocomplete', 'keyup', function() {
      $('#autocomplete').css('top', $(this).position().top + $(this).outerHeight() + $(this).offsetParent().filter('#modal-content').scrollTop());
    });
  };

  /**
   * Hide the modal
   */
  Drupal.CTools.Modal.dismiss = function() {
    if (Drupal.CTools.Modal.modal) {
      Drupal.CTools.Modal.unmodalContent(Drupal.CTools.Modal.modal);
    }
  };

  /**
   * Provide the HTML to create the modal dialog.
   */
  Drupal.theme.prototype.CToolsModalDialog = function () {
    var html = ''
    html += '<div id="ctools-modal">'
    html += '  <div class="ctools-modal-content">' // panels-modal-content
    html += '    <div class="modal-header">';
    html += '      <a class="close" href="#">';
    html +=          Drupal.CTools.Modal.currentSettings.closeText + Drupal.CTools.Modal.currentSettings.closeImage;
    html += '      </a>';
    html += '      <span id="modal-title" class="modal-title">&nbsp;</span>';
    html += '    </div>';
    html += '    <div id="modal-content" class="modal-content">';
    html += '    </div>';
    html += '  </div>';
    html += '</div>';

    return html;
  }

  /**
   * Provide the HTML to create the throbber.
   */
  Drupal.theme.prototype.CToolsModalThrobber = function () {
    var html = '';
    html += '<div id="modal-throbber">';
    html += '  <div class="modal-throbber-wrapper">';
    html +=      Drupal.CTools.Modal.currentSettings.throbber;
    html += '  </div>';
    html += '</div>';

    return html;
  };

  /**
   * Figure out what settings string to use to display a modal.
   */
  Drupal.CTools.Modal.getSettings = function (object) {
    var match = $(object).attr('class').match(/ctools-modal-(\S+)/);
    if (match) {
      return match[1];
    }
  }

  /**
   * Click function for modals that can be cached.
   */
  Drupal.CTools.Modal.clickAjaxCacheLink = function () {
    Drupal.CTools.Modal.show(Drupal.CTools.Modal.getSettings(this));
    return Drupal.CTools.AJAX.clickAJAXCacheLink.apply(this);
  };

  /**
   * Handler to prepare the modal for the response
   */
  Drupal.CTools.Modal.clickAjaxLink = function () {
    Drupal.CTools.Modal.show(Drupal.CTools.Modal.getSettings(this));
    return false;
  };

  /**
   * Submit responder to do an AJAX submit on all modal forms.
   */
  Drupal.CTools.Modal.submitAjaxForm = function(e) {
    var $form = $(this);
    var url = $form.attr('action');

    setTimeout(function() { Drupal.CTools.AJAX.ajaxSubmit($form, url); }, 1);
    return false;
  }

  /**
   * Bind links that will open modals to the appropriate function.
   */
  Drupal.behaviors.ZZCToolsModal = {
    attach: function(context) {
      // Bind links
      // Note that doing so in this order means that the two classes can be
      // used together safely.
      /*
       * @todo remimplement the warm caching feature
       $('a.ctools-use-modal-cache', context).once('ctools-use-modal', function() {
         $(this).click(Drupal.CTools.Modal.clickAjaxCacheLink);
         Drupal.CTools.AJAX.warmCache.apply(this);
       });
        */

      $('area.ctools-use-modal, a.ctools-use-modal', context).once('ctools-use-modal', function() {
        var $this = $(this);
        $this.click(Drupal.CTools.Modal.clickAjaxLink);
        // Create a drupal ajax object
        var element_settings = {};
        if ($this.attr('href')) {
          element_settings.url = $this.attr('href');
          element_settings.event = 'click';
          element_settings.progress = { type: 'throbber' };
        }
        var base = $this.attr('href');
        Drupal.ajax[base] = new Drupal.ajax(base, this, element_settings);
      });

      // Bind buttons
      $('input.ctools-use-modal, button.ctools-use-modal', context).once('ctools-use-modal', function() {
        var $this = $(this);
        $this.click(Drupal.CTools.Modal.clickAjaxLink);
        var button = this;
        var element_settings = {};

        // AJAX submits specified in this manner automatically submit to the
        // normal form action.
        element_settings.url = Drupal.CTools.Modal.findURL(this);
        if (element_settings.url == '') {
          element_settings.url = $(this).closest('form').attr('action');
        }
        element_settings.event = 'click';
        element_settings.setClick = true;

        var base = $this.attr('id');
        Drupal.ajax[base] = new Drupal.ajax(base, this, element_settings);

        // Make sure changes to settings are reflected in the URL.
        $('.' + $(button).attr('id') + '-url').change(function() {
          Drupal.ajax[base].options.url = Drupal.CTools.Modal.findURL(button);
        });
      });

      // Bind our custom event to the form submit
      $('#modal-content form', context).once('ctools-use-modal', function() {
        var $this = $(this);
        var element_settings = {};

        element_settings.url = $this.attr('action');
        element_settings.event = 'submit';
        element_settings.progress = { 'type': 'throbber' }
        var base = $this.attr('id');

        Drupal.ajax[base] = new Drupal.ajax(base, this, element_settings);
        Drupal.ajax[base].form = $this;

        $('input[type=submit], button', this).click(function(event) {
          Drupal.ajax[base].element = this;
          this.form.clk = this;
          // Stop autocomplete from submitting.
          if (Drupal.autocompleteSubmit && !Drupal.autocompleteSubmit()) {
            return false;
          }
          // An empty event means we were triggered via .click() and
          // in jquery 1.4 this won't trigger a submit.
          // We also have to check jQuery version to prevent
          // IE8 + jQuery 1.4.4 to break on other events
          // bound to the submit button.
          if (jQuery.fn.jquery === '1.4' && typeof event.bubbles === "undefined") {
            $(this.form).trigger('submit');
            return false;
          }
        });
      });

      // Bind a click handler to allow elements with the 'ctools-close-modal'
      // class to close the modal.
      $('.ctools-close-modal', context).once('ctools-close-modal')
        .click(function() {
          Drupal.CTools.Modal.dismiss();
          return false;
        });
    }
  };

  // The following are implementations of AJAX responder commands.

  /**
   * AJAX responder command to place HTML within the modal.
   */
  Drupal.CTools.Modal.modal_display = function(ajax, response, status) {
    if ($('#modalContent').length == 0) {
      Drupal.CTools.Modal.show(Drupal.CTools.Modal.getSettings(ajax.element));
    }
    $('#modal-title').html(response.title);
    // Simulate an actual page load by scrolling to the top after adding the
    // content. This is helpful for allowing users to see error messages at the
    // top of a form, etc.
    $('#modal-content').html(response.output).scrollTop(0);

    // Attach behaviors within a modal dialog.
    var settings = response.settings || ajax.settings || Drupal.settings;
    Drupal.attachBehaviors('#modalContent', settings);

    if ($('#modal-content').hasClass('ctools-modal-loading')) {
      $('#modal-content').removeClass('ctools-modal-loading');
    }
    else {
      // If the modal was already shown, and we are simply replacing its
      // content, then focus on the first focusable element in the modal.
      // (When first showing the modal, focus will be placed on the close
      // button by the show() function called above.)
      $('#modal-content :focusable:first').focus();
    }
  }

  /**
   * AJAX responder command to dismiss the modal.
   */
  Drupal.CTools.Modal.modal_dismiss = function(command) {
    Drupal.CTools.Modal.dismiss();
    $('link.ctools-temporary-css').remove();
  }

  /**
   * Display loading
   */
  //Drupal.CTools.AJAX.commands.modal_loading = function(command) {
  Drupal.CTools.Modal.modal_loading = function(command) {
    Drupal.CTools.Modal.modal_display({
      output: Drupal.theme(Drupal.CTools.Modal.currentSettings.throbberTheme),
      title: Drupal.CTools.Modal.currentSettings.loadingText
    });
  }

  /**
   * Find a URL for an AJAX button.
   *
   * The URL for this gadget will be composed of the values of items by
   * taking the ID of this item and adding -url and looking for that
   * class. They need to be in the form in order since we will
   * concat them all together using '/'.
   */
  Drupal.CTools.Modal.findURL = function(item) {
    var url = '';
    var url_class = '.' + $(item).attr('id') + '-url';
    $(url_class).each(
      function() {
        var $this = $(this);
        if (url && $this.val()) {
          url += '/';
        }
        url += $this.val();
      });
    return url;
  };


  /**
   * modalContent
   * @param content string to display in the content box
   * @param css obj of css attributes
   * @param animation (fadeIn, slideDown, show)
   * @param speed (valid animation speeds slow, medium, fast or # in ms)
   * @param modalClass class added to div#modalContent
   */
  Drupal.CTools.Modal.modalContent = function(content, css, animation, speed, modalClass) {
    // If our animation isn't set, make it just show/pop
    if (!animation) {
      animation = 'show';
    }
    else {
      // If our animation isn't "fadeIn" or "slideDown" then it always is show
      if (animation != 'fadeIn' && animation != 'slideDown') {
        animation = 'show';
      }
    }

    if (!speed) {
      speed = 'fast';
    }

    // Build our base attributes and allow them to be overriden
    css = jQuery.extend({
      position: 'absolute',
      left: '0px',
      margin: '0px',
      background: '#000',
      opacity: '.55'
    }, css);

    // Add opacity handling for IE.
    css.filter = 'alpha(opacity=' + (100 * css.opacity) + ')';
    content.hide();

    // If we already have modalContent, remove it.
    if ($('#modalBackdrop').length) $('#modalBackdrop').remove();
    if ($('#modalContent').length) $('#modalContent').remove();

    // position code lifted from http://www.quirksmode.org/viewport/compatibility.html
    if (self.pageYOffset) { // all except Explorer
    var wt = self.pageYOffset;
    } else if (document.documentElement && document.documentElement.scrollTop) { // Explorer 6 Strict
      var wt = document.documentElement.scrollTop;
    } else if (document.body) { // all other Explorers
      var wt = document.body.scrollTop;
    }

    // Get our dimensions

    // Get the docHeight and (ugly hack) add 50 pixels to make sure we dont have a *visible* border below our div
    var docHeight = $(document).height() + 50;
    var docWidth = $(document).width();
    var winHeight = $(window).height();
    var winWidth = $(window).width();
    if( docHeight < winHeight ) docHeight = winHeight;

    // Create our divs
    $('body').append('<div id="modalBackdrop" class="backdrop-' + modalClass + '" style="z-index: 1000; display: none;"></div><div id="modalContent" class="modal-' + modalClass + '" style="z-index: 1001; position: absolute;">' + $(content).html() + '</div>');

    // Get a list of the tabbable elements in the modal content.
    var getTabbableElements = function () {
      var tabbableElements = $('#modalContent :tabbable'),
          radioButtons = tabbableElements.filter('input[type="radio"]');

      // The list of tabbable elements from jQuery is *almost* right. The
      // exception is with groups of radio buttons. The list from jQuery will
      // include all radio buttons, when in fact, only the selected radio button
      // is tabbable, and if no radio buttons in a group are selected, then only
      // the first is tabbable.
      if (radioButtons.length > 0) {
        // First, build up an index of which groups have an item selected or not.
        var anySelected = {};
        radioButtons.each(function () {
          var name = this.name;

          if (typeof anySelected[name] === 'undefined') {
            anySelected[name] = radioButtons.filter('input[name="' + name + '"]:checked').length !== 0;
          }
        });

        // Next filter out the radio buttons that aren't really tabbable.
        var found = {};
        tabbableElements = tabbableElements.filter(function () {
          var keep = true;

          if (this.type == 'radio') {
            if (anySelected[this.name]) {
              // Only keep the selected one.
              keep = this.checked;
            }
            else {
              // Only keep the first one.
              if (found[this.name]) {
                keep = false;
              }
              found[this.name] = true;
            }
          }

          return keep;
        });
      }

      return tabbableElements.get();
    };

    // Keyboard and focus event handler ensures only modal elements gain focus.
    modalEventHandler = function( event ) {
      target = null;
      if ( event ) { //Mozilla
        target = event.target;
      } else { //IE
        event = window.event;
        target = event.srcElement;
      }

      var parents = $(target).parents().get();
      for (var i = 0; i < parents.length; ++i) {
        var position = $(parents[i]).css('position');
        if (position == 'absolute' || position == 'fixed') {
          return true;
        }
      }

      if ($(target).is('#modalContent, body') || $(target).filter('*:visible').parents('#modalContent').length) {
        // Allow the event only if target is a visible child node
        // of #modalContent.
        return true;
      }
      else {
        getTabbableElements()[0].focus();
      }

      event.preventDefault();
    };
    $('body').bind( 'focus', modalEventHandler );
    $('body').bind( 'keypress', modalEventHandler );

    // Keypress handler Ensures you can only TAB to elements within the modal.
    // Based on the psuedo-code from WAI-ARIA 1.0 Authoring Practices section
    // 3.3.1 "Trapping Focus".
    modalTabTrapHandler = function (evt) {
      // We only care about the TAB key.
      if (evt.which != 9) {
        return true;
      }

      var tabbableElements = getTabbableElements(),
          firstTabbableElement = tabbableElements[0],
          lastTabbableElement = tabbableElements[tabbableElements.length - 1],
          singleTabbableElement = firstTabbableElement == lastTabbableElement,
          node = evt.target;

      // If this is the first element and the user wants to go backwards, then
      // jump to the last element.
      if (node == firstTabbableElement && evt.shiftKey) {
        if (!singleTabbableElement) {
          lastTabbableElement.focus();
        }
        return false;
      }
      // If this is the last element and the user wants to go forwards, then
      // jump to the first element.
      else if (node == lastTabbableElement && !evt.shiftKey) {
        if (!singleTabbableElement) {
          firstTabbableElement.focus();
        }
        return false;
      }
      // If this element isn't in the dialog at all, then jump to the first
      // or last element to get the user into the game.
      else if ($.inArray(node, tabbableElements) == -1) {
        // Make sure the node isn't in another modal (ie. WYSIWYG modal).
        var parents = $(node).parents().get();
        for (var i = 0; i < parents.length; ++i) {
          var position = $(parents[i]).css('position');
          if (position == 'absolute' || position == 'fixed') {
            return true;
          }
        }

        if (evt.shiftKey) {
          lastTabbableElement.focus();
        }
        else {
          firstTabbableElement.focus();
        }
      }
    };
    $('body').bind('keydown', modalTabTrapHandler);

    // Create our content div, get the dimensions, and hide it
    var modalContent = $('#modalContent').css('top','-1000px');
    var mdcTop = wt + ( winHeight / 2 ) - (  modalContent.outerHeight() / 2);
    var mdcLeft = ( winWidth / 2 ) - ( modalContent.outerWidth() / 2);
    $('#modalBackdrop').css(css).css('top', 0).css('height', docHeight + 'px').css('width', docWidth + 'px').show();
    modalContent.css({top: mdcTop + 'px', left: mdcLeft + 'px'}).hide()[animation](speed);

    // Bind a click for closing the modalContent
    modalContentClose = function(){close(); return false;};
    $('.close').bind('click', modalContentClose);

    // Bind a keypress on escape for closing the modalContent
    modalEventEscapeCloseHandler = function(event) {
      if (event.keyCode == 27) {
        close();
        return false;
      }
    };

    $(document).bind('keydown', modalEventEscapeCloseHandler);

    // Per WAI-ARIA 1.0 Authoring Practices, initial focus should be on the
    // close button, but we should save the original focus to restore it after
    // the dialog is closed.
    var oldFocus = document.activeElement;
    $('.close').focus();

    // Close the open modal content and backdrop
    function close() {
      // Unbind the events
      $(window).unbind('resize',  modalContentResize);
      $('body').unbind( 'focus', modalEventHandler);
      $('body').unbind( 'keypress', modalEventHandler );
      $('body').unbind( 'keydown', modalTabTrapHandler );
      $('.close').unbind('click', modalContentClose);
      $('body').unbind('keypress', modalEventEscapeCloseHandler);
      $(document).trigger('CToolsDetachBehaviors', $('#modalContent'));

      // Set our animation parameters and use them
      if ( animation == 'fadeIn' ) animation = 'fadeOut';
      if ( animation == 'slideDown' ) animation = 'slideUp';
      if ( animation == 'show' ) animation = 'hide';

      // Close the content
      modalContent.hide()[animation](speed);

      // Remove the content
      $('#modalContent').remove();
      $('#modalBackdrop').remove();

      // Restore focus to where it was before opening the dialog
      $(oldFocus).focus();
    };

    // Move and resize the modalBackdrop and modalContent on window resize.
    modalContentResize = function(){

      // Reset the backdrop height/width to get accurate document size.
      $('#modalBackdrop').css('height', '').css('width', '');

      // Position code lifted from:
      // http://www.quirksmode.org/viewport/compatibility.html
      if (self.pageYOffset) { // all except Explorer
      var wt = self.pageYOffset;
      } else if (document.documentElement && document.documentElement.scrollTop) { // Explorer 6 Strict
        var wt = document.documentElement.scrollTop;
      } else if (document.body) { // all other Explorers
        var wt = document.body.scrollTop;
      }

      // Get our heights
      var docHeight = $(document).height();
      var docWidth = $(document).width();
      var winHeight = $(window).height();
      var winWidth = $(window).width();
      if( docHeight < winHeight ) docHeight = winHeight;

      // Get where we should move content to
      var modalContent = $('#modalContent');
      var mdcTop = wt + ( winHeight / 2 ) - ( modalContent.outerHeight() / 2);
      var mdcLeft = ( winWidth / 2 ) - ( modalContent.outerWidth() / 2);

      // Apply the changes
      $('#modalBackdrop').css('height', docHeight + 'px').css('width', docWidth + 'px').show();
      modalContent.css('top', mdcTop + 'px').css('left', mdcLeft + 'px').show();
    };
    $(window).bind('resize', modalContentResize);
  };

  /**
   * unmodalContent
   * @param content (The jQuery object to remove)
   * @param animation (fadeOut, slideUp, show)
   * @param speed (valid animation speeds slow, medium, fast or # in ms)
   */
  Drupal.CTools.Modal.unmodalContent = function(content, animation, speed)
  {
    // If our animation isn't set, make it just show/pop
    if (!animation) { var animation = 'show'; } else {
      // If our animation isn't "fade" then it always is show
      if (( animation != 'fadeOut' ) && ( animation != 'slideUp')) animation = 'show';
    }
    // Set a speed if we dont have one
    if ( !speed ) var speed = 'fast';

    // Unbind the events we bound
    $(window).unbind('resize', modalContentResize);
    $('body').unbind('focus', modalEventHandler);
    $('body').unbind('keypress', modalEventHandler);
    $('body').unbind( 'keydown', modalTabTrapHandler );
    $('.close').unbind('click', modalContentClose);
    $('body').unbind('keypress', modalEventEscapeCloseHandler);
    $(document).trigger('CToolsDetachBehaviors', $('#modalContent'));

    // jQuery magic loop through the instances and run the animations or removal.
    content.each(function(){
      if ( animation == 'fade' ) {
        $('#modalContent').fadeOut(speed, function() {
          $('#modalBackdrop').fadeOut(speed, function() {
            $(this).remove();
          });
          $(this).remove();
        });
      } else {
        if ( animation == 'slide' ) {
          $('#modalContent').slideUp(speed,function() {
            $('#modalBackdrop').slideUp(speed, function() {
              $(this).remove();
            });
            $(this).remove();
          });
        } else {
          $('#modalContent').remove();
          $('#modalBackdrop').remove();
        }
      }
    });
  };

$(function() {
  Drupal.ajax.prototype.commands.modal_display = Drupal.CTools.Modal.modal_display;
  Drupal.ajax.prototype.commands.modal_dismiss = Drupal.CTools.Modal.modal_dismiss;
});

})(jQuery);
;/**/
/**
* Provide the HTML to create the modal dialog.
*/
Drupal.theme.prototype.ModalFormsPopup = function () {
  var html = '';

  html += '<div id="ctools-modal" class="popups-box">';
  html += '  <div class="ctools-modal-content modal-forms-modal-content">';
  html += '    <div class="popups-container">';
  html += '      <div class="modal-header popups-title">';
  html += '        <span id="modal-title" class="modal-title"></span>';
  html += '        <span class="popups-close close">' + Drupal.CTools.Modal.currentSettings.closeText + '</span>';
  html += '        <div class="clear-block"></div>';
  html += '      </div>';
  html += '      <div class="modal-scroll"><div id="modal-content" class="modal-content popups-body"></div></div>';
  html += '    </div>';
  html += '  </div>';
  html += '</div>';

  return html;
}
;/**/
"function"!==typeof Object.create&&(Object.create=function(f){function g(){}g.prototype=f;return new g});
(function(f,g,k){var l={init:function(a,b){this.$elem=f(b);this.options=f.extend({},f.fn.owlCarousel.options,this.$elem.data(),a);this.userOptions=a;this.loadContent()},loadContent:function(){function a(a){var d,e="";if("function"===typeof b.options.jsonSuccess)b.options.jsonSuccess.apply(this,[a]);else{for(d in a.owl)a.owl.hasOwnProperty(d)&&(e+=a.owl[d].item);b.$elem.html(e)}b.logIn()}var b=this,e;"function"===typeof b.options.beforeInit&&b.options.beforeInit.apply(this,[b.$elem]);"string"===typeof b.options.jsonPath?
(e=b.options.jsonPath,f.getJSON(e,a)):b.logIn()},logIn:function(){this.$elem.data("owl-originalStyles",this.$elem.attr("style"));this.$elem.data("owl-originalClasses",this.$elem.attr("class"));this.$elem.css({opacity:0});this.orignalItems=this.options.items;this.checkBrowser();this.wrapperWidth=0;this.checkVisible=null;this.setVars()},setVars:function(){if(0===this.$elem.children().length)return!1;this.baseClass();this.eventTypes();this.$userItems=this.$elem.children();this.itemsAmount=this.$userItems.length;
this.wrapItems();this.$owlItems=this.$elem.find(".owl-item");this.$owlWrapper=this.$elem.find(".owl-wrapper");this.playDirection="next";this.prevItem=0;this.prevArr=[0];this.currentItem=0;this.customEvents();this.onStartup()},onStartup:function(){this.updateItems();this.calculateAll();this.buildControls();this.updateControls();this.response();this.moveEvents();this.stopOnHover();this.owlStatus();!1!==this.options.transitionStyle&&this.transitionTypes(this.options.transitionStyle);!0===this.options.autoPlay&&
(this.options.autoPlay=5E3);this.play();this.$elem.find(".owl-wrapper").css("display","block");this.$elem.is(":visible")?this.$elem.css("opacity",1):this.watchVisibility();this.onstartup=!1;this.eachMoveUpdate();"function"===typeof this.options.afterInit&&this.options.afterInit.apply(this,[this.$elem])},eachMoveUpdate:function(){!0===this.options.lazyLoad&&this.lazyLoad();!0===this.options.autoHeight&&this.autoHeight();this.onVisibleItems();"function"===typeof this.options.afterAction&&this.options.afterAction.apply(this,
[this.$elem])},updateVars:function(){"function"===typeof this.options.beforeUpdate&&this.options.beforeUpdate.apply(this,[this.$elem]);this.watchVisibility();this.updateItems();this.calculateAll();this.updatePosition();this.updateControls();this.eachMoveUpdate();"function"===typeof this.options.afterUpdate&&this.options.afterUpdate.apply(this,[this.$elem])},reload:function(){var a=this;g.setTimeout(function(){a.updateVars()},0)},watchVisibility:function(){var a=this;if(!1===a.$elem.is(":visible"))a.$elem.css({opacity:0}),
g.clearInterval(a.autoPlayInterval),g.clearInterval(a.checkVisible);else return!1;a.checkVisible=g.setInterval(function(){a.$elem.is(":visible")&&(a.reload(),a.$elem.animate({opacity:1},200),g.clearInterval(a.checkVisible))},500)},wrapItems:function(){this.$userItems.wrapAll('<div class="owl-wrapper">').wrap('<div class="owl-item"></div>');this.$elem.find(".owl-wrapper").wrap('<div class="owl-wrapper-outer">');this.wrapperOuter=this.$elem.find(".owl-wrapper-outer");this.$elem.css("display","block")},
baseClass:function(){var a=this.$elem.hasClass(this.options.baseClass),b=this.$elem.hasClass(this.options.theme);a||this.$elem.addClass(this.options.baseClass);b||this.$elem.addClass(this.options.theme)},updateItems:function(){var a,b;if(!1===this.options.responsive)return!1;if(!0===this.options.singleItem)return this.options.items=this.orignalItems=1,this.options.itemsCustom=!1,this.options.itemsDesktop=!1,this.options.itemsDesktopSmall=!1,this.options.itemsTablet=!1,this.options.itemsTabletSmall=
!1,this.options.itemsMobile=!1;a=f(this.options.responsiveBaseWidth).width();a>(this.options.itemsDesktop[0]||this.orignalItems)&&(this.options.items=this.orignalItems);if(!1!==this.options.itemsCustom)for(this.options.itemsCustom.sort(function(a,b){return a[0]-b[0]}),b=0;b<this.options.itemsCustom.length;b+=1)this.options.itemsCustom[b][0]<=a&&(this.options.items=this.options.itemsCustom[b][1]);else a<=this.options.itemsDesktop[0]&&!1!==this.options.itemsDesktop&&(this.options.items=this.options.itemsDesktop[1]),
a<=this.options.itemsDesktopSmall[0]&&!1!==this.options.itemsDesktopSmall&&(this.options.items=this.options.itemsDesktopSmall[1]),a<=this.options.itemsTablet[0]&&!1!==this.options.itemsTablet&&(this.options.items=this.options.itemsTablet[1]),a<=this.options.itemsTabletSmall[0]&&!1!==this.options.itemsTabletSmall&&(this.options.items=this.options.itemsTabletSmall[1]),a<=this.options.itemsMobile[0]&&!1!==this.options.itemsMobile&&(this.options.items=this.options.itemsMobile[1]);this.options.items>this.itemsAmount&&
!0===this.options.itemsScaleUp&&(this.options.items=this.itemsAmount)},response:function(){var a=this,b,e;if(!0!==a.options.responsive)return!1;e=f(g).width();a.resizer=function(){f(g).width()!==e&&(!1!==a.options.autoPlay&&g.clearInterval(a.autoPlayInterval),g.clearTimeout(b),b=g.setTimeout(function(){e=f(g).width();a.updateVars()},a.options.responsiveRefreshRate))};f(g).resize(a.resizer)},updatePosition:function(){this.jumpTo(this.currentItem);!1!==this.options.autoPlay&&this.checkAp()},appendItemsSizes:function(){var a=
this,b=0,e=a.itemsAmount-a.options.items;a.$owlItems.each(function(c){var d=f(this);d.css({width:a.itemWidth}).data("owl-item",Number(c));if(0===c%a.options.items||c===e)c>e||(b+=1);d.data("owl-roundPages",b)})},appendWrapperSizes:function(){this.$owlWrapper.css({width:this.$owlItems.length*this.itemWidth*2,left:0});this.appendItemsSizes()},calculateAll:function(){this.calculateWidth();this.appendWrapperSizes();this.loops();this.max()},calculateWidth:function(){this.itemWidth=Math.round(this.$elem.width()/
this.options.items)},max:function(){var a=-1*(this.itemsAmount*this.itemWidth-this.options.items*this.itemWidth);this.options.items>this.itemsAmount?this.maximumPixels=a=this.maximumItem=0:(this.maximumItem=this.itemsAmount-this.options.items,this.maximumPixels=a);return a},min:function(){return 0},loops:function(){var a=0,b=0,e,c;this.positionsInArray=[0];this.pagesInArray=[];for(e=0;e<this.itemsAmount;e+=1)b+=this.itemWidth,this.positionsInArray.push(-b),!0===this.options.scrollPerPage&&(c=f(this.$owlItems[e]),
c=c.data("owl-roundPages"),c!==a&&(this.pagesInArray[a]=this.positionsInArray[e],a=c))},buildControls:function(){if(!0===this.options.navigation||!0===this.options.pagination)this.owlControls=f('<div class="owl-controls"/>').toggleClass("clickable",!this.browser.isTouch).appendTo(this.$elem);!0===this.options.pagination&&this.buildPagination();!0===this.options.navigation&&this.buildButtons()},buildButtons:function(){var a=this,b=f('<div class="owl-buttons"/>');a.owlControls.append(b);a.buttonPrev=
f("<div/>",{"class":"owl-prev",html:a.options.navigationText[0]||""});a.buttonNext=f("<div/>",{"class":"owl-next",html:a.options.navigationText[1]||""});b.append(a.buttonPrev).append(a.buttonNext);b.on("touchstart.owlControls mousedown.owlControls",'div[class^="owl"]',function(a){a.preventDefault()});b.on("touchend.owlControls mouseup.owlControls",'div[class^="owl"]',function(b){b.preventDefault();f(this).hasClass("owl-next")?a.next():a.prev()})},buildPagination:function(){var a=this;a.paginationWrapper=
f('<div class="owl-pagination"/>');a.owlControls.append(a.paginationWrapper);a.paginationWrapper.on("touchend.owlControls mouseup.owlControls",".owl-page",function(b){b.preventDefault();Number(f(this).data("owl-page"))!==a.currentItem&&a.goTo(Number(f(this).data("owl-page")),!0)})},updatePagination:function(){var a,b,e,c,d,g;if(!1===this.options.pagination)return!1;this.paginationWrapper.html("");a=0;b=this.itemsAmount-this.itemsAmount%this.options.items;for(c=0;c<this.itemsAmount;c+=1)0===c%this.options.items&&
(a+=1,b===c&&(e=this.itemsAmount-this.options.items),d=f("<div/>",{"class":"owl-page"}),g=f("<span></span>",{text:!0===this.options.paginationNumbers?a:"","class":!0===this.options.paginationNumbers?"owl-numbers":""}),d.append(g),d.data("owl-page",b===c?e:c),d.data("owl-roundPages",a),this.paginationWrapper.append(d));this.checkPagination()},checkPagination:function(){var a=this;if(!1===a.options.pagination)return!1;a.paginationWrapper.find(".owl-page").each(function(){f(this).data("owl-roundPages")===
f(a.$owlItems[a.currentItem]).data("owl-roundPages")&&(a.paginationWrapper.find(".owl-page").removeClass("active"),f(this).addClass("active"))})},checkNavigation:function(){if(!1===this.options.navigation)return!1;!1===this.options.rewindNav&&(0===this.currentItem&&0===this.maximumItem?(this.buttonPrev.addClass("disabled"),this.buttonNext.addClass("disabled")):0===this.currentItem&&0!==this.maximumItem?(this.buttonPrev.addClass("disabled"),this.buttonNext.removeClass("disabled")):this.currentItem===
this.maximumItem?(this.buttonPrev.removeClass("disabled"),this.buttonNext.addClass("disabled")):0!==this.currentItem&&this.currentItem!==this.maximumItem&&(this.buttonPrev.removeClass("disabled"),this.buttonNext.removeClass("disabled")))},updateControls:function(){this.updatePagination();this.checkNavigation();this.owlControls&&(this.options.items>=this.itemsAmount?this.owlControls.hide():this.owlControls.show())},destroyControls:function(){this.owlControls&&this.owlControls.remove()},next:function(a){if(this.isTransition)return!1;
this.currentItem+=!0===this.options.scrollPerPage?this.options.items:1;if(this.currentItem>this.maximumItem+(!0===this.options.scrollPerPage?this.options.items-1:0))if(!0===this.options.rewindNav)this.currentItem=0,a="rewind";else return this.currentItem=this.maximumItem,!1;this.goTo(this.currentItem,a)},prev:function(a){if(this.isTransition)return!1;this.currentItem=!0===this.options.scrollPerPage&&0<this.currentItem&&this.currentItem<this.options.items?0:this.currentItem-(!0===this.options.scrollPerPage?
this.options.items:1);if(0>this.currentItem)if(!0===this.options.rewindNav)this.currentItem=this.maximumItem,a="rewind";else return this.currentItem=0,!1;this.goTo(this.currentItem,a)},goTo:function(a,b,e){var c=this;if(c.isTransition)return!1;"function"===typeof c.options.beforeMove&&c.options.beforeMove.apply(this,[c.$elem]);a>=c.maximumItem?a=c.maximumItem:0>=a&&(a=0);c.currentItem=c.owl.currentItem=a;if(!1!==c.options.transitionStyle&&"drag"!==e&&1===c.options.items&&!0===c.browser.support3d)return c.swapSpeed(0),
!0===c.browser.support3d?c.transition3d(c.positionsInArray[a]):c.css2slide(c.positionsInArray[a],1),c.afterGo(),c.singleItemTransition(),!1;a=c.positionsInArray[a];!0===c.browser.support3d?(c.isCss3Finish=!1,!0===b?(c.swapSpeed("paginationSpeed"),g.setTimeout(function(){c.isCss3Finish=!0},c.options.paginationSpeed)):"rewind"===b?(c.swapSpeed(c.options.rewindSpeed),g.setTimeout(function(){c.isCss3Finish=!0},c.options.rewindSpeed)):(c.swapSpeed("slideSpeed"),g.setTimeout(function(){c.isCss3Finish=!0},
c.options.slideSpeed)),c.transition3d(a)):!0===b?c.css2slide(a,c.options.paginationSpeed):"rewind"===b?c.css2slide(a,c.options.rewindSpeed):c.css2slide(a,c.options.slideSpeed);c.afterGo()},jumpTo:function(a){"function"===typeof this.options.beforeMove&&this.options.beforeMove.apply(this,[this.$elem]);a>=this.maximumItem||-1===a?a=this.maximumItem:0>=a&&(a=0);this.swapSpeed(0);!0===this.browser.support3d?this.transition3d(this.positionsInArray[a]):this.css2slide(this.positionsInArray[a],1);this.currentItem=
this.owl.currentItem=a;this.afterGo()},afterGo:function(){this.prevArr.push(this.currentItem);this.prevItem=this.owl.prevItem=this.prevArr[this.prevArr.length-2];this.prevArr.shift(0);this.prevItem!==this.currentItem&&(this.checkPagination(),this.checkNavigation(),this.eachMoveUpdate(),!1!==this.options.autoPlay&&this.checkAp());"function"===typeof this.options.afterMove&&this.prevItem!==this.currentItem&&this.options.afterMove.apply(this,[this.$elem])},stop:function(){this.apStatus="stop";g.clearInterval(this.autoPlayInterval)},
checkAp:function(){"stop"!==this.apStatus&&this.play()},play:function(){var a=this;a.apStatus="play";if(!1===a.options.autoPlay)return!1;g.clearInterval(a.autoPlayInterval);a.autoPlayInterval=g.setInterval(function(){a.next(!0)},a.options.autoPlay)},swapSpeed:function(a){"slideSpeed"===a?this.$owlWrapper.css(this.addCssSpeed(this.options.slideSpeed)):"paginationSpeed"===a?this.$owlWrapper.css(this.addCssSpeed(this.options.paginationSpeed)):"string"!==typeof a&&this.$owlWrapper.css(this.addCssSpeed(a))},
addCssSpeed:function(a){return{"-webkit-transition":"all "+a+"ms ease","-moz-transition":"all "+a+"ms ease","-o-transition":"all "+a+"ms ease",transition:"all "+a+"ms ease"}},removeTransition:function(){return{"-webkit-transition":"","-moz-transition":"","-o-transition":"",transition:""}},doTranslate:function(a){return{"-webkit-transform":"translate3d("+a+"px, 0px, 0px)","-moz-transform":"translate3d("+a+"px, 0px, 0px)","-o-transform":"translate3d("+a+"px, 0px, 0px)","-ms-transform":"translate3d("+
a+"px, 0px, 0px)",transform:"translate3d("+a+"px, 0px,0px)"}},transition3d:function(a){this.$owlWrapper.css(this.doTranslate(a))},css2move:function(a){this.$owlWrapper.css({left:a})},css2slide:function(a,b){var e=this;e.isCssFinish=!1;e.$owlWrapper.stop(!0,!0).animate({left:a},{duration:b||e.options.slideSpeed,complete:function(){e.isCssFinish=!0}})},checkBrowser:function(){var a=k.createElement("div");a.style.cssText="  -moz-transform:translate3d(0px, 0px, 0px); -ms-transform:translate3d(0px, 0px, 0px); -o-transform:translate3d(0px, 0px, 0px); -webkit-transform:translate3d(0px, 0px, 0px); transform:translate3d(0px, 0px, 0px)";
a=a.style.cssText.match(/translate3d\(0px, 0px, 0px\)/g);this.browser={support3d:null!==a&&1===a.length,isTouch:"ontouchstart"in g||g.navigator.msMaxTouchPoints}},moveEvents:function(){if(!1!==this.options.mouseDrag||!1!==this.options.touchDrag)this.gestures(),this.disabledEvents()},eventTypes:function(){var a=["s","e","x"];this.ev_types={};!0===this.options.mouseDrag&&!0===this.options.touchDrag?a=["touchstart.owl mousedown.owl","touchmove.owl mousemove.owl","touchend.owl touchcancel.owl mouseup.owl"]:
!1===this.options.mouseDrag&&!0===this.options.touchDrag?a=["touchstart.owl","touchmove.owl","touchend.owl touchcancel.owl"]:!0===this.options.mouseDrag&&!1===this.options.touchDrag&&(a=["mousedown.owl","mousemove.owl","mouseup.owl"]);this.ev_types.start=a[0];this.ev_types.move=a[1];this.ev_types.end=a[2]},disabledEvents:function(){this.$elem.on("dragstart.owl",function(a){a.preventDefault()});this.$elem.on("mousedown.disableTextSelect",function(a){return f(a.target).is("input, textarea, select, option")})},
gestures:function(){function a(a){if(void 0!==a.touches)return{x:a.touches[0].pageX,y:a.touches[0].pageY};if(void 0===a.touches){if(void 0!==a.pageX)return{x:a.pageX,y:a.pageY};if(void 0===a.pageX)return{x:a.clientX,y:a.clientY}}}function b(a){"on"===a?(f(k).on(d.ev_types.move,e),f(k).on(d.ev_types.end,c)):"off"===a&&(f(k).off(d.ev_types.move),f(k).off(d.ev_types.end))}function e(b){b=b.originalEvent||b||g.event;d.newPosX=a(b).x-h.offsetX;d.newPosY=a(b).y-h.offsetY;d.newRelativeX=d.newPosX-h.relativePos;
"function"===typeof d.options.startDragging&&!0!==h.dragging&&0!==d.newRelativeX&&(h.dragging=!0,d.options.startDragging.apply(d,[d.$elem]));(8<d.newRelativeX||-8>d.newRelativeX)&&!0===d.browser.isTouch&&(void 0!==b.preventDefault?b.preventDefault():b.returnValue=!1,h.sliding=!0);(10<d.newPosY||-10>d.newPosY)&&!1===h.sliding&&f(k).off("touchmove.owl");d.newPosX=Math.max(Math.min(d.newPosX,d.newRelativeX/5),d.maximumPixels+d.newRelativeX/5);!0===d.browser.support3d?d.transition3d(d.newPosX):d.css2move(d.newPosX)}
function c(a){a=a.originalEvent||a||g.event;var c;a.target=a.target||a.srcElement;h.dragging=!1;!0!==d.browser.isTouch&&d.$owlWrapper.removeClass("grabbing");d.dragDirection=0>d.newRelativeX?d.owl.dragDirection="left":d.owl.dragDirection="right";0!==d.newRelativeX&&(c=d.getNewPosition(),d.goTo(c,!1,"drag"),h.targetElement===a.target&&!0!==d.browser.isTouch&&(f(a.target).on("click.disable",function(a){a.stopImmediatePropagation();a.stopPropagation();a.preventDefault();f(a.target).off("click.disable")}),
a=f._data(a.target,"events").click,c=a.pop(),a.splice(0,0,c)));b("off")}var d=this,h={offsetX:0,offsetY:0,baseElWidth:0,relativePos:0,position:null,minSwipe:null,maxSwipe:null,sliding:null,dargging:null,targetElement:null};d.isCssFinish=!0;d.$elem.on(d.ev_types.start,".owl-wrapper",function(c){c=c.originalEvent||c||g.event;var e;if(3===c.which)return!1;if(!(d.itemsAmount<=d.options.items)){if(!1===d.isCssFinish&&!d.options.dragBeforeAnimFinish||!1===d.isCss3Finish&&!d.options.dragBeforeAnimFinish)return!1;
!1!==d.options.autoPlay&&g.clearInterval(d.autoPlayInterval);!0===d.browser.isTouch||d.$owlWrapper.hasClass("grabbing")||d.$owlWrapper.addClass("grabbing");d.newPosX=0;d.newRelativeX=0;f(this).css(d.removeTransition());e=f(this).position();h.relativePos=e.left;h.offsetX=a(c).x-e.left;h.offsetY=a(c).y-e.top;b("on");h.sliding=!1;h.targetElement=c.target||c.srcElement}})},getNewPosition:function(){var a=this.closestItem();a>this.maximumItem?a=this.currentItem=this.maximumItem:0<=this.newPosX&&(this.currentItem=
a=0);return a},closestItem:function(){var a=this,b=!0===a.options.scrollPerPage?a.pagesInArray:a.positionsInArray,e=a.newPosX,c=null;f.each(b,function(d,g){e-a.itemWidth/20>b[d+1]&&e-a.itemWidth/20<g&&"left"===a.moveDirection()?(c=g,a.currentItem=!0===a.options.scrollPerPage?f.inArray(c,a.positionsInArray):d):e+a.itemWidth/20<g&&e+a.itemWidth/20>(b[d+1]||b[d]-a.itemWidth)&&"right"===a.moveDirection()&&(!0===a.options.scrollPerPage?(c=b[d+1]||b[b.length-1],a.currentItem=f.inArray(c,a.positionsInArray)):
(c=b[d+1],a.currentItem=d+1))});return a.currentItem},moveDirection:function(){var a;0>this.newRelativeX?(a="right",this.playDirection="next"):(a="left",this.playDirection="prev");return a},customEvents:function(){var a=this;a.$elem.on("owl.next",function(){a.next()});a.$elem.on("owl.prev",function(){a.prev()});a.$elem.on("owl.play",function(b,e){a.options.autoPlay=e;a.play();a.hoverStatus="play"});a.$elem.on("owl.stop",function(){a.stop();a.hoverStatus="stop"});a.$elem.on("owl.goTo",function(b,e){a.goTo(e)});
a.$elem.on("owl.jumpTo",function(b,e){a.jumpTo(e)})},stopOnHover:function(){var a=this;!0===a.options.stopOnHover&&!0!==a.browser.isTouch&&!1!==a.options.autoPlay&&(a.$elem.on("mouseover",function(){a.stop()}),a.$elem.on("mouseout",function(){"stop"!==a.hoverStatus&&a.play()}))},lazyLoad:function(){var a,b,e,c,d;if(!1===this.options.lazyLoad)return!1;for(a=0;a<this.itemsAmount;a+=1)b=f(this.$owlItems[a]),"loaded"!==b.data("owl-loaded")&&(e=b.data("owl-item"),c=b.find(".lazyOwl"),"string"!==typeof c.data("src")?
b.data("owl-loaded","loaded"):(void 0===b.data("owl-loaded")&&(c.hide(),b.addClass("loading").data("owl-loaded","checked")),(d=!0===this.options.lazyFollow?e>=this.currentItem:!0)&&e<this.currentItem+this.options.items&&c.length&&this.lazyPreload(b,c)))},lazyPreload:function(a,b){function e(){a.data("owl-loaded","loaded").removeClass("loading");b.removeAttr("data-src");"fade"===d.options.lazyEffect?b.fadeIn(400):b.show();"function"===typeof d.options.afterLazyLoad&&d.options.afterLazyLoad.apply(this,
[d.$elem])}function c(){f+=1;d.completeImg(b.get(0))||!0===k?e():100>=f?g.setTimeout(c,100):e()}var d=this,f=0,k;"DIV"===b.prop("tagName")?(b.css("background-image","url("+b.data("src")+")"),k=!0):b[0].src=b.data("src");c()},autoHeight:function(){function a(){var a=f(e.$owlItems[e.currentItem]).height();e.wrapperOuter.css("height",a+"px");e.wrapperOuter.hasClass("autoHeight")||g.setTimeout(function(){e.wrapperOuter.addClass("autoHeight")},0)}function b(){d+=1;e.completeImg(c.get(0))?a():100>=d?g.setTimeout(b,
100):e.wrapperOuter.css("height","")}var e=this,c=f(e.$owlItems[e.currentItem]).find("img"),d;void 0!==c.get(0)?(d=0,b()):a()},completeImg:function(a){return!a.complete||"undefined"!==typeof a.naturalWidth&&0===a.naturalWidth?!1:!0},onVisibleItems:function(){var a;!0===this.options.addClassActive&&this.$owlItems.removeClass("active");this.visibleItems=[];for(a=this.currentItem;a<this.currentItem+this.options.items;a+=1)this.visibleItems.push(a),!0===this.options.addClassActive&&f(this.$owlItems[a]).addClass("active");
this.owl.visibleItems=this.visibleItems},transitionTypes:function(a){this.outClass="owl-"+a+"-out";this.inClass="owl-"+a+"-in"},singleItemTransition:function(){var a=this,b=a.outClass,e=a.inClass,c=a.$owlItems.eq(a.currentItem),d=a.$owlItems.eq(a.prevItem),f=Math.abs(a.positionsInArray[a.currentItem])+a.positionsInArray[a.prevItem],g=Math.abs(a.positionsInArray[a.currentItem])+a.itemWidth/2;a.isTransition=!0;a.$owlWrapper.addClass("owl-origin").css({"-webkit-transform-origin":g+"px","-moz-perspective-origin":g+
"px","perspective-origin":g+"px"});d.css({position:"relative",left:f+"px"}).addClass(b).on("webkitAnimationEnd oAnimationEnd MSAnimationEnd animationend",function(){a.endPrev=!0;d.off("webkitAnimationEnd oAnimationEnd MSAnimationEnd animationend");a.clearTransStyle(d,b)});c.addClass(e).on("webkitAnimationEnd oAnimationEnd MSAnimationEnd animationend",function(){a.endCurrent=!0;c.off("webkitAnimationEnd oAnimationEnd MSAnimationEnd animationend");a.clearTransStyle(c,e)})},clearTransStyle:function(a,
b){a.css({position:"",left:""}).removeClass(b);this.endPrev&&this.endCurrent&&(this.$owlWrapper.removeClass("owl-origin"),this.isTransition=this.endCurrent=this.endPrev=!1)},owlStatus:function(){this.owl={userOptions:this.userOptions,baseElement:this.$elem,userItems:this.$userItems,owlItems:this.$owlItems,currentItem:this.currentItem,prevItem:this.prevItem,visibleItems:this.visibleItems,isTouch:this.browser.isTouch,browser:this.browser,dragDirection:this.dragDirection}},clearEvents:function(){this.$elem.off(".owl owl mousedown.disableTextSelect");
f(k).off(".owl owl");f(g).off("resize",this.resizer)},unWrap:function(){0!==this.$elem.children().length&&(this.$owlWrapper.unwrap(),this.$userItems.unwrap().unwrap(),this.owlControls&&this.owlControls.remove());this.clearEvents();this.$elem.attr("style",this.$elem.data("owl-originalStyles")||"").attr("class",this.$elem.data("owl-originalClasses"))},destroy:function(){this.stop();g.clearInterval(this.checkVisible);this.unWrap();this.$elem.removeData()},reinit:function(a){a=f.extend({},this.userOptions,
a);this.unWrap();this.init(a,this.$elem)},addItem:function(a,b){var e;if(!a)return!1;if(0===this.$elem.children().length)return this.$elem.append(a),this.setVars(),!1;this.unWrap();e=void 0===b||-1===b?-1:b;e>=this.$userItems.length||-1===e?this.$userItems.eq(-1).after(a):this.$userItems.eq(e).before(a);this.setVars()},removeItem:function(a){if(0===this.$elem.children().length)return!1;a=void 0===a||-1===a?-1:a;this.unWrap();this.$userItems.eq(a).remove();this.setVars()}};f.fn.owlCarousel=function(a){return this.each(function(){if(!0===
f(this).data("owl-init"))return!1;f(this).data("owl-init",!0);var b=Object.create(l);b.init(a,this);f.data(this,"owlCarousel",b)})};f.fn.owlCarousel.options={items:5,itemsCustom:!1,itemsDesktop:[1199,4],itemsDesktopSmall:[979,3],itemsTablet:[768,2],itemsTabletSmall:!1,itemsMobile:[479,1],singleItem:!1,itemsScaleUp:!1,slideSpeed:200,paginationSpeed:800,rewindSpeed:1E3,autoPlay:!1,stopOnHover:!1,navigation:!1,navigationText:["prev","next"],rewindNav:!0,scrollPerPage:!1,pagination:!0,paginationNumbers:!1,
responsive:!0,responsiveRefreshRate:200,responsiveBaseWidth:g,baseClass:"owl-carousel",theme:"owl-theme",lazyLoad:!1,lazyFollow:!0,lazyEffect:"fade",autoHeight:!1,jsonPath:!1,jsonSuccess:!1,dragBeforeAnimFinish:!0,mouseDrag:!0,touchDrag:!0,addClassActive:!1,transitionStyle:!1,beforeUpdate:!1,afterUpdate:!1,beforeInit:!1,afterInit:!1,beforeMove:!1,afterMove:!1,afterAction:!1,startDragging:!1,afterLazyLoad:!1}})(jQuery,window,document);;/**/
/*
 * jQuery Easing v1.3 - http://gsgd.co.uk/sandbox/jquery/easing/
 *
 * Uses the built in easing capabilities added In jQuery 1.1
 * to offer multiple easing options
 *
 * TERMS OF USE - jQuery Easing
 * 
 * Open source under the BSD License. 
 * 
 * Copyright © 2008 George McGinley Smith
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification, 
 * are permitted provided that the following conditions are met:
 * 
 * Redistributions of source code must retain the above copyright notice, this list of 
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list 
 * of conditions and the following disclaimer in the documentation and/or other materials 
 * provided with the distribution.
 * 
 * Neither the name of the author nor the names of contributors may be used to endorse 
 * or promote products derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED 
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED 
 * OF THE POSSIBILITY OF SUCH DAMAGE. 
 *
*/
jQuery.easing["jswing"]=jQuery.easing["swing"];jQuery.extend(jQuery.easing,{def:"easeOutQuad",swing:function(a,b,c,d,e){return jQuery.easing[jQuery.easing.def](a,b,c,d,e)},easeInQuad:function(a,b,c,d,e){return d*(b/=e)*b+c},easeOutQuad:function(a,b,c,d,e){return-d*(b/=e)*(b-2)+c},easeInOutQuad:function(a,b,c,d,e){if((b/=e/2)<1)return d/2*b*b+c;return-d/2*(--b*(b-2)-1)+c},easeInCubic:function(a,b,c,d,e){return d*(b/=e)*b*b+c},easeOutCubic:function(a,b,c,d,e){return d*((b=b/e-1)*b*b+1)+c},easeInOutCubic:function(a,b,c,d,e){if((b/=e/2)<1)return d/2*b*b*b+c;return d/2*((b-=2)*b*b+2)+c},easeInQuart:function(a,b,c,d,e){return d*(b/=e)*b*b*b+c},easeOutQuart:function(a,b,c,d,e){return-d*((b=b/e-1)*b*b*b-1)+c},easeInOutQuart:function(a,b,c,d,e){if((b/=e/2)<1)return d/2*b*b*b*b+c;return-d/2*((b-=2)*b*b*b-2)+c},easeInQuint:function(a,b,c,d,e){return d*(b/=e)*b*b*b*b+c},easeOutQuint:function(a,b,c,d,e){return d*((b=b/e-1)*b*b*b*b+1)+c},easeInOutQuint:function(a,b,c,d,e){if((b/=e/2)<1)return d/2*b*b*b*b*b+c;return d/2*((b-=2)*b*b*b*b+2)+c},easeInSine:function(a,b,c,d,e){return-d*Math.cos(b/e*(Math.PI/2))+d+c},easeOutSine:function(a,b,c,d,e){return d*Math.sin(b/e*(Math.PI/2))+c},easeInOutSine:function(a,b,c,d,e){return-d/2*(Math.cos(Math.PI*b/e)-1)+c},easeInExpo:function(a,b,c,d,e){return b==0?c:d*Math.pow(2,10*(b/e-1))+c},easeOutExpo:function(a,b,c,d,e){return b==e?c+d:d*(-Math.pow(2,-10*b/e)+1)+c},easeInOutExpo:function(a,b,c,d,e){if(b==0)return c;if(b==e)return c+d;if((b/=e/2)<1)return d/2*Math.pow(2,10*(b-1))+c;return d/2*(-Math.pow(2,-10*--b)+2)+c},easeInCirc:function(a,b,c,d,e){return-d*(Math.sqrt(1-(b/=e)*b)-1)+c},easeOutCirc:function(a,b,c,d,e){return d*Math.sqrt(1-(b=b/e-1)*b)+c},easeInOutCirc:function(a,b,c,d,e){if((b/=e/2)<1)return-d/2*(Math.sqrt(1-b*b)-1)+c;return d/2*(Math.sqrt(1-(b-=2)*b)+1)+c},easeInElastic:function(a,b,c,d,e){var f=1.70158;var g=0;var h=d;if(b==0)return c;if((b/=e)==1)return c+d;if(!g)g=e*.3;if(h<Math.abs(d)){h=d;var f=g/4}else var f=g/(2*Math.PI)*Math.asin(d/h);return-(h*Math.pow(2,10*(b-=1))*Math.sin((b*e-f)*2*Math.PI/g))+c},easeOutElastic:function(a,b,c,d,e){var f=1.70158;var g=0;var h=d;if(b==0)return c;if((b/=e)==1)return c+d;if(!g)g=e*.3;if(h<Math.abs(d)){h=d;var f=g/4}else var f=g/(2*Math.PI)*Math.asin(d/h);return h*Math.pow(2,-10*b)*Math.sin((b*e-f)*2*Math.PI/g)+d+c},easeInOutElastic:function(a,b,c,d,e){var f=1.70158;var g=0;var h=d;if(b==0)return c;if((b/=e/2)==2)return c+d;if(!g)g=e*.3*1.5;if(h<Math.abs(d)){h=d;var f=g/4}else var f=g/(2*Math.PI)*Math.asin(d/h);if(b<1)return-.5*h*Math.pow(2,10*(b-=1))*Math.sin((b*e-f)*2*Math.PI/g)+c;return h*Math.pow(2,-10*(b-=1))*Math.sin((b*e-f)*2*Math.PI/g)*.5+d+c},easeInBack:function(a,b,c,d,e,f){if(f==undefined)f=1.70158;return d*(b/=e)*b*((f+1)*b-f)+c},easeOutBack:function(a,b,c,d,e,f){if(f==undefined)f=1.70158;return d*((b=b/e-1)*b*((f+1)*b+f)+1)+c},easeInOutBack:function(a,b,c,d,e,f){if(f==undefined)f=1.70158;if((b/=e/2)<1)return d/2*b*b*(((f*=1.525)+1)*b-f)+c;return d/2*((b-=2)*b*(((f*=1.525)+1)*b+f)+2)+c},easeInBounce:function(a,b,c,d,e){return d-jQuery.easing.easeOutBounce(a,e-b,0,d,e)+c},easeOutBounce:function(a,b,c,d,e){if((b/=e)<1/2.75){return d*7.5625*b*b+c}else if(b<2/2.75){return d*(7.5625*(b-=1.5/2.75)*b+.75)+c}else if(b<2.5/2.75){return d*(7.5625*(b-=2.25/2.75)*b+.9375)+c}else{return d*(7.5625*(b-=2.625/2.75)*b+.984375)+c}},easeInOutBounce:function(a,b,c,d,e){if(b<e/2)return jQuery.easing.easeInBounce(a,b*2,0,d,e)*.5+c;return jQuery.easing.easeOutBounce(a,b*2-e,0,d,e)*.5+d*.5+c}})
/*
 *
 * TERMS OF USE - EASING EQUATIONS
 * 
 * Open source under the BSD License. 
 * 
 * Copyright © 2001 Robert Penner
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification, 
 * are permitted provided that the following conditions are met:
 * 
 * Redistributions of source code must retain the above copyright notice, this list of 
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list 
 * of conditions and the following disclaimer in the documentation and/or other materials 
 * provided with the distribution.
 * 
 * Neither the name of the author nor the names of contributors may be used to endorse 
 * or promote products derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED 
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED 
 * OF THE POSSIBILITY OF SUCH DAMAGE. 
 *
 */;/**/
(function(){var requirejs,require,define,__inflate;(function(e){function a(e,t){var n=t&&t.split("/"),i=r.map,s=i&&i["*"]||{},o,u,a,f,l,c,h;if(e&&e.charAt(0)==="."&&t){n=n.slice(0,n.length-1),e=n.concat(e.split("/"));for(l=0;h=e[l];l++)if(h===".")e.splice(l,1),l-=1;else if(h===".."){if(l===1&&(e[2]===".."||e[0]===".."))return!0;l>0&&(e.splice(l-1,2),l-=2)}e=e.join("/")}if((n||s)&&i){o=e.split("/");for(l=o.length;l>0;l-=1){u=o.slice(0,l).join("/");if(n)for(c=n.length;c>0;c-=1){a=i[n.slice(0,c).join("/")];if(a){a=a[u];if(a){f=a;break}}}f=f||s[u];if(f){o.splice(0,l,f),e=o.join("/");break}}}return e}function f(t,n){return function(){return u.apply(e,s.call(arguments,0).concat([t,n]))}}function l(e){return function(t){return a(t,e)}}function c(e){return function(n){t[e]=n}}function h(r){if(n.hasOwnProperty(r)){var s=n[r];delete n[r],i[r]=!0,o.apply(e,s)}if(!t.hasOwnProperty(r))throw new Error("No "+r);return t[r]}function p(e,t){var n,r,i=e.indexOf("!");return i!==-1?(n=a(e.slice(0,i),t),e=e.slice(i+1),r=h(n),r&&r.normalize?e=r.normalize(e,l(t)):e=a(e,t)):e=a(e,t),{f:n?n+"!"+e:e,n:e,p:r}}function d(e){return function(){return r&&r.config&&r.config[e]||{}}}var t={},n={},r={},i={},s=[].slice,o,u;o=function(r,s,o,u){var a=[],l,v,m,g,y,b;u=u||r,typeof o=="string"&&(o=__inflate(r,o));if(typeof o=="function"){s=!s.length&&o.length?["require","exports","module"]:s;for(b=0;b<s.length;b++){y=p(s[b],u),m=y.f;if(m==="require")a[b]=f(r);else if(m==="exports")a[b]=t[r]={},l=!0;else if(m==="module")v=a[b]={id:r,uri:"",exports:t[r],config:d(r)};else if(t.hasOwnProperty(m)||n.hasOwnProperty(m))a[b]=h(m);else if(y.p)y.p.load(y.n,f(u,!0),c(m),{}),a[b]=t[m];else if(!i[m])throw new Error(r+" missing "+m)}g=o.apply(t[r],a);if(r)if(v&&v.exports!==e&&v.exports!==t[r])t[r]=v.exports;else if(g!==e||!l)t[r]=g}else r&&(t[r]=o)},requirejs=require=u=function(t,n,i,s){return typeof t=="string"?h(p(t,n).f):(t.splice||(r=t,n.splice?(t=n,n=i,i=null):t=e),n=n||function(){},s?o(e,t,n,i):setTimeout(function(){o(e,t,n,i)},15),u)},u.config=function(e){return r=e,u},define=function(e,t,r){t.splice||(r=t,t=[]),n[e]=[e,t,r]},define.amd={jQuery:!0}})(),__inflate=function(name,src){var r;return eval(["r = function(a,b,c){","\n};\n//@ sourceURL="+name+"\n"].join(src)),r},define("lib/api/events",["require","exports","module"],function(e,t,n){t.api={LOAD_PROGRESS:"loadProgress",PLAY_PROGRESS:"playProgress",PLAY:"play",PAUSE:"pause",FINISH:"finish",SEEK:"seek",READY:"ready",OPEN_SHARE_PANEL:"sharePanelOpened",CLICK_DOWNLOAD:"downloadClicked",CLICK_BUY:"buyClicked",ERROR:"error"},t.bridge={REMOVE_LISTENER:"removeEventListener",ADD_LISTENER:"addEventListener"}}),define("lib/api/getters",["require","exports","module"],function(e,t,n){n.exports={GET_VOLUME:"getVolume",GET_DURATION:"getDuration",GET_POSITION:"getPosition",GET_SOUNDS:"getSounds",GET_CURRENT_SOUND:"getCurrentSound",GET_CURRENT_SOUND_INDEX:"getCurrentSoundIndex",IS_PAUSED:"isPaused"}}),define("lib/api/setters",["require","exports","module"],function(e,t,n){n.exports={PLAY:"play",PAUSE:"pause",TOGGLE:"toggle",SEEK_TO:"seekTo",SET_VOLUME:"setVolume",NEXT:"next",PREV:"prev",SKIP:"skip"}}),define("lib/api/api",["require","exports","module","lib/api/events","lib/api/getters","lib/api/setters"],function(e,t,n){function m(e){return!!(e===""||e&&e.charCodeAt&&e.substr)}function g(e){return!!(e&&e.constructor&&e.call&&e.apply)}function y(e){return!!e&&e.nodeType===1&&e.nodeName.toUpperCase()==="IFRAME"}function b(e){var t=!1,n;for(n in i)if(i.hasOwnProperty(n)&&i[n]===e){t=!0;break}return t}function w(e){var t,n,r;for(t=0,n=f.length;t<n;t++){r=e(f[t]);if(r===!1)break}}function E(e){var t="",n,r,i;e.substr(0,2)==="//"&&(e=window.location.protocol+e),i=e.split("/");for(n=0,r=i.length;n<r;n++){if(!(n<3))break;t+=i[n],n<2&&(t+="/")}return t}function S(e){return e.contentWindow?e.contentWindow:e.contentDocument&&"parentWindow"in e.contentDocument?e.contentDocument.parentWindow:null}function x(e){var t=[],n;for(n in e)e.hasOwnProperty(n)&&t.push(e[n]);return t}function T(e,t,n){n.callbacks[e]=n.callbacks[e]||[],n.callbacks[e].push(t)}function N(e,t){var n=!0,r;return t.callbacks[e]=[],w(function(t){r=t.callbacks[e]||[];if(r.length)return n=!1,!1}),n}function C(e,t,n){var r=S(n),i,s;if(!r.postMessage)return!1;i=n.getAttribute("src").split("?")[0],s=JSON.stringify({method:e,value:t}),i.substr(0,2)==="//"&&(i=window.location.protocol+i),i=i.replace(/http:\/\/(w|wt).soundcloud.com/,"https://$1.soundcloud.com"),r.postMessage(s,i)}function k(e){var t;return w(function(n){if(n.instance===e)return t=n,!1}),t}function L(e){var t;return w(function(n){if(S(n.element)===e)return t=n,!1}),t}function A(e,t){return function(n){var r=g(n),i=k(this),s=!r&&t?n:null,o=r&&!t?n:null;return o&&T(e,o,i),C(e,s,i.element),this}}function O(e,t,n){var r,i,s;for(r=0,i=t.length;r<i;r++)s=t[r],e[s]=A(s,n)}function M(e,t,n){return e+"?url="+t+"&"+_(n)}function _(e){var t,n,r=[];for(t in e)e.hasOwnProperty(t)&&(n=e[t],r.push(t+"="+(t==="start_track"?parseInt(n,10):n?"true":"false")));return r.join("&")}function D(e,t,n){var r=e.callbacks[t]||[],i,s;for(i=0,s=r.length;i<s;i++)r[i].apply(e.instance,n);if(b(t)||t===o.READY)e.callbacks[t]=[]}function P(e){var t,n,r,i,s;try{n=JSON.parse(e.data)}catch(u){return!1}t=L(e.source),r=n.method,i=n.value;if(t&&H(e.origin)!==H(t.domain))return!1;if(!t)return r===o.READY&&a.push(e.source),!1;r===o.READY&&(t.isReady=!0,D(t,l),N(l,t)),r===o.PLAY&&!t.playEventFired&&(t.playEventFired=!0),r===o.PLAY_PROGRESS&&!t.playEventFired&&(t.playEventFired=!0,D(t,o.PLAY,[i])),s=[],i!==undefined&&s.push(i),D(t,r,s)}function H(e){return e.replace(h,"")}var r=e("lib/api/events"),i=e("lib/api/getters"),s=e("lib/api/setters"),o=r.api,u=r.bridge,a=[],f=[],l="__LATE_BINDING__",c="http://wt.soundcloud.dev:9200/",h=/^http(?:s?)/,p,d,v;window.addEventListener?window.addEventListener("message",P,!1):window.attachEvent("onmessage",P),n.exports=v=function(e,t,n){m(e)&&(e=document.getElementById(e));if(!y(e))throw new Error("SC.Widget function should be given either iframe element or a string specifying id attribute of iframe element.");t&&(n=n||{},e.src=M(c,t,n));var r=L(S(e)),i,s;return r&&r.instance?r.instance:(i=a.indexOf(S(e))>-1,s=new p(e),f.push(new d(s,e,i)),s)},v.Events=o,window.SC=window.SC||{},window.SC.Widget=v,d=function(e,t,n){this.instance=e,this.element=t,this.domain=E(t.getAttribute("src")),this.isReady=!!n,this.callbacks={}},p=function(){},p.prototype={constructor:p,load:function(e,t){if(!e)return;t=t||{};var n=this,r=k(this),i=r.element,s=i.src,a=s.substr(0,s.indexOf("?"));r.isReady=!1,r.playEventFired=!1,i.onload=function(){n.bind(o.READY,function(){var e,n=r.callbacks;for(e in n)n.hasOwnProperty(e)&&e!==o.READY&&C(u.ADD_LISTENER,e,r.element);t.callback&&t.callback()})},i.src=M(a,e,t)},bind:function(e,t){var n=this,r=k(this);return r&&r.element&&(e===o.READY&&r.isReady?setTimeout(t,1):r.isReady?(T(e,t,r),C(u.ADD_LISTENER,e,r.element)):T(l,function(){n.bind(e,t)},r)),this},unbind:function(e){var t=k(this),n;t&&t.element&&(n=N(e,t),e!==o.READY&&n&&C(u.REMOVE_LISTENER,e,t.element))}},O(p.prototype,x(i)),O(p.prototype,x(s),!0)}),window.SC=window.SC||{},window.SC.Widget=require("lib/api/api")})();/**/
/*! 
 * Master Slider – Responsive Touch Swipe Slider
 * Copyright © 2015 All Rights Reserved. 
 *
 * @author Averta [www.averta.net]
 * @version 2.14.6
 *
 *
 * @date May 2015
 */
window.averta={},function($){function getVendorPrefix(){if("result"in arguments.callee)return arguments.callee.result;var regex=/^(Moz|Webkit|Khtml|O|ms|Icab)(?=[A-Z])/,someScript=document.getElementsByTagName("script")[0];for(var prop in someScript.style)if(regex.test(prop))return arguments.callee.result=prop.match(regex)[0];return arguments.callee.result="WebkitOpacity"in someScript.style?"Webkit":"KhtmlOpacity"in someScript.style?"Khtml":""}function checkStyleValue(prop){var b=document.body||document.documentElement,s=b.style,p=prop;if("string"==typeof s[p])return!0;v=["Moz","Webkit","Khtml","O","ms"],p=p.charAt(0).toUpperCase()+p.substr(1);for(var i=0;i<v.length;i++)if("string"==typeof s[v[i]+p])return!0;return!1}function supportsTransitions(){return checkStyleValue("transition")}function supportsTransforms(){return checkStyleValue("transform")}function supports3DTransforms(){if(!supportsTransforms())return!1;var has3d,el=document.createElement("i"),transforms={WebkitTransform:"-webkit-transform",OTransform:"-o-transform",MSTransform:"-ms-transform",msTransform:"-ms-transform",MozTransform:"-moz-transform",Transform:"transform",transform:"transform"};el.style.display="block",document.body.insertBefore(el,null);for(var t in transforms)void 0!==el.style[t]&&(el.style[t]="translate3d(1px,1px,1px)",has3d=window.getComputedStyle(el).getPropertyValue(transforms[t]));return document.body.removeChild(el),null!=has3d&&has3d.length>0&&"none"!==has3d}window["package"]=function(name){window[name]||(window[name]={})};var extend=function(target,object){for(var key in object)target[key]=object[key]};Function.prototype.extend=function(superclass){"function"==typeof superclass.prototype.constructor?(extend(this.prototype,superclass.prototype),this.prototype.constructor=this):(this.prototype.extend(superclass),this.prototype.constructor=this)};var trans={Moz:"-moz-",Webkit:"-webkit-",Khtml:"-khtml-",O:"-o-",ms:"-ms-",Icab:"-icab-"};window._mobile=/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),window._touch="ontouchstart"in document,$(document).ready(function(){window._jcsspfx=getVendorPrefix(),window._csspfx=trans[window._jcsspfx],window._cssanim=supportsTransitions(),window._css3d=supports3DTransforms(),window._css2d=supportsTransforms()}),window.parseQueryString=function(url){var queryString={};return url.replace(new RegExp("([^?=&]+)(=([^&]*))?","g"),function($0,$1,$2,$3){queryString[$1]=$3}),queryString};var fps60=50/3;if(window.requestAnimationFrame||(window.requestAnimationFrame=function(){return window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(callback){window.setTimeout(callback,fps60)}}()),window.getComputedStyle||(window.getComputedStyle=function(el){return this.el=el,this.getPropertyValue=function(prop){var re=/(\-([a-z]){1})/g;return"float"==prop&&(prop="styleFloat"),re.test(prop)&&(prop=prop.replace(re,function(){return arguments[2].toUpperCase()})),el.currentStyle[prop]?el.currentStyle[prop]:null},el.currentStyle}),Array.prototype.indexOf||(Array.prototype.indexOf=function(elt){var len=this.length>>>0,from=Number(arguments[1])||0;for(from=0>from?Math.ceil(from):Math.floor(from),0>from&&(from+=len);len>from;from++)if(from in this&&this[from]===elt)return from;return-1}),window.isMSIE=function(version){if(!$.browser.msie)return!1;if(!version)return!0;var ieVer=$.browser.version.slice(0,$.browser.version.indexOf("."));return"string"==typeof version?eval(-1!==version.indexOf("<")||-1!==version.indexOf(">")?ieVer+version:version+"=="+ieVer):version==ieVer},$.removeDataAttrs=function($target,exclude){var i,attrName,dataAttrsToDelete=[],dataAttrs=$target[0].attributes,dataAttrsLen=dataAttrs.length;for(exclude=exclude||[],i=0;dataAttrsLen>i;i++)attrName=dataAttrs[i].name,"data-"===attrName.substring(0,5)&&-1===exclude.indexOf(attrName)&&dataAttrsToDelete.push(dataAttrs[i].name);$.each(dataAttrsToDelete,function(index,attrName){$target.removeAttr(attrName)})},jQuery){$.jqLoadFix=function(){if(this.complete){var that=this;setTimeout(function(){$(that).load()},1)}},jQuery.uaMatch=jQuery.uaMatch||function(ua){ua=ua.toLowerCase();var match=/(chrome)[ \/]([\w.]+)/.exec(ua)||/(webkit)[ \/]([\w.]+)/.exec(ua)||/(opera)(?:.*version|)[ \/]([\w.]+)/.exec(ua)||/(msie) ([\w.]+)/.exec(ua)||ua.indexOf("compatible")<0&&/(mozilla)(?:.*? rv:([\w.]+)|)/.exec(ua)||[];return{browser:match[1]||"",version:match[2]||"0"}},matched=jQuery.uaMatch(navigator.userAgent),browser={},matched.browser&&(browser[matched.browser]=!0,browser.version=matched.version),browser.chrome?browser.webkit=!0:browser.webkit&&(browser.safari=!0);var isIE11=!!navigator.userAgent.match(/Trident\/7\./);isIE11&&(browser.msie="true",delete browser.mozilla),jQuery.browser=browser,$.fn.preloadImg=function(src,_event){return this.each(function(){var $this=$(this),self=this,img=new Image;img.onload=function(event){null==event&&(event={}),$this.attr("src",src),event.width=img.width,event.height=img.height,$this.data("width",img.width),$this.data("height",img.height),setTimeout(function(){_event.call(self,event)},50),img=null},img.src=src}),this}}}(jQuery),function(){"use strict";averta.EventDispatcher=function(){this.listeners={}},averta.EventDispatcher.extend=function(_proto){var instance=new averta.EventDispatcher;for(var key in instance)"constructor"!=key&&(_proto[key]=averta.EventDispatcher.prototype[key])},averta.EventDispatcher.prototype={constructor:averta.EventDispatcher,addEventListener:function(event,listener,ref){this.listeners[event]||(this.listeners[event]=[]),this.listeners[event].push({listener:listener,ref:ref})},removeEventListener:function(event,listener,ref){if(this.listeners[event]){for(var i=0;i<this.listeners[event].length;++i)listener===this.listeners[event][i].listener&&ref===this.listeners[event][i].ref&&this.listeners[event].splice(i--,1);0===this.listeners[event].length&&(this.listeners[event]=null)}},dispatchEvent:function(event){if(event.target=this,this.listeners[event.type])for(var i=0,l=this.listeners[event.type].length;l>i;++i)this.listeners[event.type][i].listener.call(this.listeners[event.type][i].ref,event)}}}(),function($){"use strict";var isTouch="ontouchstart"in document,isPointer=window.navigator.pointerEnabled,isMSPoiner=!isPointer&&window.navigator.msPointerEnabled,usePointer=isPointer||isMSPoiner,ev_start=(isPointer?"pointerdown ":"")+(isMSPoiner?"MSPointerDown ":"")+(isTouch?"touchstart ":"")+"mousedown",ev_move=(isPointer?"pointermove ":"")+(isMSPoiner?"MSPointerMove ":"")+(isTouch?"touchmove ":"")+"mousemove",ev_end=(isPointer?"pointerup ":"")+(isMSPoiner?"MSPointerUp ":"")+(isTouch?"touchend ":"")+"mouseup",ev_cancel=(isPointer?"pointercancel ":"")+(isMSPoiner?"MSPointerCancel ":"")+"touchcancel";averta.TouchSwipe=function($element){this.$element=$element,this.enabled=!0,$element.bind(ev_start,{target:this},this.__touchStart),$element[0].swipe=this,this.onSwipe=null,this.swipeType="horizontal",this.noSwipeSelector="input, textarea, button, .no-swipe, .ms-no-swipe",this.lastStatus={}};var p=averta.TouchSwipe.prototype;p.getDirection=function(new_x,new_y){switch(this.swipeType){case"horizontal":return new_x<=this.start_x?"left":"right";case"vertical":return new_y<=this.start_y?"up":"down";case"all":return Math.abs(new_x-this.start_x)>Math.abs(new_y-this.start_y)?new_x<=this.start_x?"left":"right":new_y<=this.start_y?"up":"down"}},p.priventDefultEvent=function(new_x,new_y){var dx=Math.abs(new_x-this.start_x),dy=Math.abs(new_y-this.start_y),horiz=dx>dy;return"horizontal"===this.swipeType&&horiz||"vertical"===this.swipeType&&!horiz},p.createStatusObject=function(evt){var temp_x,temp_y,status_data={};return temp_x=this.lastStatus.distanceX||0,temp_y=this.lastStatus.distanceY||0,status_data.distanceX=evt.pageX-this.start_x,status_data.distanceY=evt.pageY-this.start_y,status_data.moveX=status_data.distanceX-temp_x,status_data.moveY=status_data.distanceY-temp_y,status_data.distance=parseInt(Math.sqrt(Math.pow(status_data.distanceX,2)+Math.pow(status_data.distanceY,2))),status_data.duration=(new Date).getTime()-this.start_time,status_data.direction=this.getDirection(evt.pageX,evt.pageY),status_data},p.__reset=function(event,jqevt){this.reset=!1,this.lastStatus={},this.start_time=(new Date).getTime(),this.start_x=isTouch?event.touches[0].pageX:usePointer?event.pageX:jqevt.pageX,this.start_y=isTouch?event.touches[0].pageY:usePointer?event.pageY:jqevt.pageY},p.__touchStart=function(event){var swipe=event.data.target,jqevt=event;if(swipe.enabled&&!($(event.target).closest(swipe.noSwipeSelector,swipe.$element).length>0)){if(event=event.originalEvent,usePointer&&$(this).css("-ms-touch-action","horizontal"===swipe.swipeType?"pan-y":"pan-x"),!swipe.onSwipe)return void $.error("Swipe listener is undefined");if(!swipe.touchStarted){swipe.start_x=isTouch?event.touches[0].pageX:usePointer?event.pageX:jqevt.pageX,swipe.start_y=isTouch?event.touches[0].pageY:usePointer?event.pageY:jqevt.pageY,swipe.start_time=(new Date).getTime(),$(document).bind(ev_end,{target:swipe},swipe.__touchEnd).bind(ev_move,{target:swipe},swipe.__touchMove).bind(ev_cancel,{target:swipe},swipe.__touchCancel);var evt=isTouch?event.touches[0]:usePointer?event:jqevt,status=swipe.createStatusObject(evt);status.phase="start",swipe.onSwipe.call(null,status),isTouch||jqevt.preventDefault(),swipe.lastStatus=status,swipe.touchStarted=!0}}},p.__touchMove=function(event){var swipe=event.data.target,jqevt=event;if(event=event.originalEvent,swipe.touchStarted){clearTimeout(swipe.timo),swipe.timo=setTimeout(function(){swipe.__reset(event,jqevt)},60);var evt=isTouch?event.touches[0]:usePointer?event:jqevt,status=swipe.createStatusObject(evt);swipe.priventDefultEvent(evt.pageX,evt.pageY)&&jqevt.preventDefault(),status.phase="move",swipe.lastStatus=status,swipe.onSwipe.call(null,status)}},p.__touchEnd=function(event){var swipe=event.data.target,jqevt=event;event=event.originalEvent,clearTimeout(swipe.timo);var status=(isTouch?event.touches[0]:usePointer?event:jqevt,swipe.lastStatus);isTouch||jqevt.preventDefault(),status.phase="end",swipe.touchStarted=!1,swipe.priventEvt=null,$(document).unbind(ev_end,swipe.__touchEnd).unbind(ev_move,swipe.__touchMove).unbind(ev_cancel,swipe.__touchCancel),status.speed=status.distance/status.duration,swipe.onSwipe.call(null,status)},p.__touchCancel=function(event){var swipe=event.data.target;swipe.__touchEnd(event)},p.enable=function(){this.enabled||(this.enabled=!0)},p.disable=function(){this.enabled&&(this.enabled=!1)}}(jQuery),function(){"use strict";averta.Ticker=function(){};var st=averta.Ticker,list=[],len=0,__stopped=!0;st.add=function(listener,ref){return list.push([listener,ref]),1===list.length&&st.start(),len=list.length},st.remove=function(listener,ref){for(var i=0,l=list.length;l>i;++i)list[i]&&list[i][0]===listener&&list[i][1]===ref&&list.splice(i,1);len=list.length,0===len&&st.stop()},st.start=function(){__stopped&&(__stopped=!1,__tick())},st.stop=function(){__stopped=!0};var __tick=function(){if(!st.__stopped){for(var item,i=0;i!==len;i++)item=list[i],item[0].call(item[1]);requestAnimationFrame(__tick)}}}(),function(){"use strict";Date.now||(Date.now=function(){return(new Date).getTime()}),averta.Timer=function(delay,autoStart){this.delay=delay,this.currentCount=0,this.paused=!1,this.onTimer=null,this.refrence=null,autoStart&&this.start()},averta.Timer.prototype={constructor:averta.Timer,start:function(){this.paused=!1,this.lastTime=Date.now(),averta.Ticker.add(this.update,this)},stop:function(){this.paused=!0,averta.Ticker.remove(this.update,this)},reset:function(){this.currentCount=0,this.paused=!0,this.lastTime=Date.now()},update:function(){this.paused||Date.now()-this.lastTime<this.delay||(this.currentCount++,this.lastTime=Date.now(),this.onTimer&&this.onTimer.call(this.refrence,this.getTime()))},getTime:function(){return this.delay*this.currentCount}}}(),function(){"use strict";window.CSSTween=function(element,duration,delay,ease){this.$element=element,this.duration=duration||1e3,this.delay=delay||0,this.ease=ease||"linear"};var p=CSSTween.prototype;p.to=function(callback,target){return this.to_cb=callback,this.to_cb_target=target,this},p.from=function(callback,target){return this.fr_cb=callback,this.fr_cb_target=target,this},p.onComplete=function(callback,target){return this.oc_fb=callback,this.oc_fb_target=target,this},p.chain=function(csstween){return this.chained_tween=csstween,this},p.reset=function(){clearTimeout(this.start_to),clearTimeout(this.end_to)},p.start=function(){var element=this.$element[0];clearTimeout(this.start_to),clearTimeout(this.end_to),this.fresh=!0,this.fr_cb&&(element.style[window._jcsspfx+"TransitionDuration"]="0ms",this.fr_cb.call(this.fr_cb_target));var that=this;return this.onTransComplete=function(){that.fresh&&(that.reset(),element.style[window._jcsspfx+"TransitionDuration"]="",element.style[window._jcsspfx+"TransitionProperty"]="",element.style[window._jcsspfx+"TransitionTimingFunction"]="",element.style[window._jcsspfx+"TransitionDelay"]="",that.fresh=!1,that.chained_tween&&that.chained_tween.start(),that.oc_fb&&that.oc_fb.call(that.oc_fb_target))},this.start_to=setTimeout(function(){that.$element&&(element.style[window._jcsspfx+"TransitionDuration"]=that.duration+"ms",element.style[window._jcsspfx+"TransitionProperty"]=that.transProperty||"all",element.style[window._jcsspfx+"TransitionDelay"]=that.delay>0?that.delay+"ms":"",element.style[window._jcsspfx+"TransitionTimingFunction"]=that.ease,that.to_cb&&that.to_cb.call(that.to_cb_target),that.end_to=setTimeout(function(){that.onTransComplete()},that.duration+(that.delay||0)))},100),this}}(),function(){"use strict";function transPos(element,properties){if(void 0!==properties.x||void 0!==properties.y)if(_cssanim){var trans=window._jcsspfx+"Transform";void 0!==properties.x&&(properties[trans]=(properties[trans]||"")+" translateX("+properties.x+"px)",delete properties.x),void 0!==properties.y&&(properties[trans]=(properties[trans]||"")+" translateY("+properties.y+"px)",delete properties.y)}else{if(void 0!==properties.x){var posx="auto"!==element.css("right")?"right":"left";properties[posx]=properties.x+"px",delete properties.x}if(void 0!==properties.y){var posy="auto"!==element.css("bottom")?"bottom":"top";properties[posy]=properties.y+"px",delete properties.y}}return properties}var _cssanim=null;window.CTween={},CTween.setPos=function(element,pos){element.css(transPos(element,pos))},CTween.animate=function(element,duration,properties,options){if(null==_cssanim&&(_cssanim=window._cssanim),options=options||{},transPos(element,properties),_cssanim){var tween=new CSSTween(element,duration,options.delay,EaseDic[options.ease]);return options.transProperty&&(tween.transProperty=options.transProperty),tween.to(function(){element.css(properties)}),options.complete&&tween.onComplete(options.complete,options.target),tween.start(),tween.stop=tween.reset,tween}var onCl;return options.delay&&element.delay(options.delay),options.complete&&(onCl=function(){options.complete.call(options.target)}),element.stop(!0).animate(properties,duration,options.ease||"linear",onCl),element},CTween.fadeOut=function(target,duration,remove){var options={};remove===!0?options.complete=function(){target.remove()}:2===remove&&(options.complete=function(){target.css("display","none")}),CTween.animate(target,duration||1e3,{opacity:0},options)},CTween.fadeIn=function(target,duration,reset){reset!==!1&&target.css("opacity",0).css("display",""),CTween.animate(target,duration||1e3,{opacity:1})}}(),function(){window.EaseDic={linear:"linear",ease:"ease",easeIn:"ease-in",easeOut:"ease-out",easeInOut:"ease-in-out",easeInCubic:"cubic-bezier(.55,.055,.675,.19)",easeOutCubic:"cubic-bezier(.215,.61,.355,1)",easeInOutCubic:"cubic-bezier(.645,.045,.355,1)",easeInCirc:"cubic-bezier(.6,.04,.98,.335)",easeOutCirc:"cubic-bezier(.075,.82,.165,1)",easeInOutCirc:"cubic-bezier(.785,.135,.15,.86)",easeInExpo:"cubic-bezier(.95,.05,.795,.035)",easeOutExpo:"cubic-bezier(.19,1,.22,1)",easeInOutExpo:"cubic-bezier(1,0,0,1)",easeInQuad:"cubic-bezier(.55,.085,.68,.53)",easeOutQuad:"cubic-bezier(.25,.46,.45,.94)",easeInOutQuad:"cubic-bezier(.455,.03,.515,.955)",easeInQuart:"cubic-bezier(.895,.03,.685,.22)",easeOutQuart:"cubic-bezier(.165,.84,.44,1)",easeInOutQuart:"cubic-bezier(.77,0,.175,1)",easeInQuint:"cubic-bezier(.755,.05,.855,.06)",easeOutQuint:"cubic-bezier(.23,1,.32,1)",easeInOutQuint:"cubic-bezier(.86,0,.07,1)",easeInSine:"cubic-bezier(.47,0,.745,.715)",easeOutSine:"cubic-bezier(.39,.575,.565,1)",easeInOutSine:"cubic-bezier(.445,.05,.55,.95)",easeInBack:"cubic-bezier(.6,-.28,.735,.045)",easeOutBack:"cubic-bezier(.175, .885,.32,1.275)",easeInOutBack:"cubic-bezier(.68,-.55,.265,1.55)"}}(),function(){"use strict";window.MSAligner=function(type,$container,$img){this.$container=$container,this.$img=$img,this.type=type||"stretch",this.widthOnly=!1,this.heightOnly=!1};var p=MSAligner.prototype;p.init=function(w,h){switch(this.baseWidth=w,this.baseHeight=h,this.imgRatio=w/h,this.imgRatio2=h/w,this.type){case"tile":this.$container.css("background-image","url("+this.$img.attr("src")+")"),this.$img.remove();break;case"center":this.$container.css("background-image","url("+this.$img.attr("src")+")"),this.$container.css({backgroundPosition:"center center",backgroundRepeat:"no-repeat"}),this.$img.remove();break;case"stretch":this.$img.css({width:"100%",height:"100%"});break;case"fill":case"fit":this.needAlign=!0,this.align()}},p.align=function(){if(this.needAlign){var cont_w=this.$container.width(),cont_h=this.$container.height(),contRatio=cont_w/cont_h;"fill"==this.type?this.imgRatio<contRatio?(this.$img.width(cont_w),this.$img.height(cont_w*this.imgRatio2)):(this.$img.height(cont_h),this.$img.width(cont_h*this.imgRatio)):"fit"==this.type&&(this.imgRatio<contRatio?(this.$img.height(cont_h),this.$img.width(cont_h*this.imgRatio)):(this.$img.width(cont_w),this.$img.height(cont_w*this.imgRatio2))),this.setMargin()}},p.setMargin=function(){var cont_w=this.$container.width(),cont_h=this.$container.height();this.$img.css("margin-top",(cont_h-this.$img[0].offsetHeight)/2+"px"),this.$img.css("margin-left",(cont_w-this.$img[0].offsetWidth)/2+"px")}}(),function(){"use strict";var _options={bouncing:!0,snapping:!1,snapsize:null,friction:.05,outFriction:.05,outAcceleration:.09,minValidDist:.3,snappingMinSpeed:2,paging:!1,endless:!1,maxSpeed:160},Controller=function(min,max,options){if(null===max||null===min)throw new Error("Max and Min values are required.");this.options=options||{};for(var key in _options)key in this.options||(this.options[key]=_options[key]);this._max_value=max,this._min_value=min,this.value=min,this.end_loc=min,this.current_snap=this.getSnapNum(min),this.__extrStep=0,this.__extraMove=0,this.__animID=-1},p=Controller.prototype;p.changeTo=function(value,animate,speed,snap_num,dispatch){if(this.stopped=!1,this._internalStop(),value=this._checkLimits(value),speed=Math.abs(speed||0),this.options.snapping&&(snap_num=snap_num||this.getSnapNum(value),dispatch!==!1&&this._callsnapChange(snap_num),this.current_snap=snap_num),animate){this.animating=!0;var self=this,active_id=++self.__animID,amplitude=value-self.value,timeStep=0,targetPosition=value,animFrict=1-self.options.friction,timeconst=animFrict+(speed-20)*animFrict*1.3/self.options.maxSpeed,tick=function(){if(active_id===self.__animID){var dis=value-self.value;if(!(Math.abs(dis)>self.options.minValidDist&&self.animating))return self.animating&&(self.value=value,self._callrenderer()),self.animating=!1,active_id!==self.__animID&&(self.__animID=-1),void self._callonComplete("anim");window.requestAnimationFrame(tick),self.value=targetPosition-amplitude*Math.exp(-++timeStep*timeconst),self._callrenderer()}};return void tick()}this.value=value,this._callrenderer()},p.drag=function(move){this.start_drag&&(this.drag_start_loc=this.value,this.start_drag=!1),this.animating=!1,this._deceleration=!1,this.value-=move,!this.options.endless&&(this.value>this._max_value||this.value<0)?this.options.bouncing?(this.__isout=!0,this.value+=.6*move):this.value=this.value>this._max_value?this._max_value:0:!this.options.endless&&this.options.bouncing&&(this.__isout=!1),this._callrenderer()},p.push=function(speed){if(this.stopped=!1,this.options.snapping&&Math.abs(speed)<=this.options.snappingMinSpeed)return void this.cancel();if(this.__speed=speed,this.__startSpeed=speed,this.end_loc=this._calculateEnd(),this.options.snapping){var snap_loc=this.getSnapNum(this.value),end_snap=this.getSnapNum(this.end_loc);if(this.options.paging)return snap_loc=this.getSnapNum(this.drag_start_loc),this.__isout=!1,void(speed>0?this.gotoSnap(snap_loc+1,!0,speed):this.gotoSnap(snap_loc-1,!0,speed));if(snap_loc===end_snap)return void this.cancel();this._callsnapChange(end_snap),this.current_snap=end_snap}this.animating=!1,this.__needsSnap=this.options.endless||this.end_loc>this._min_value&&this.end_loc<this._max_value,this.options.snapping&&this.__needsSnap&&(this.__extraMove=this._calculateExtraMove(this.end_loc)),this._startDecelaration()},p.bounce=function(speed){this.animating||(this.stopped=!1,this.animating=!1,this.__speed=speed,this.__startSpeed=speed,this.end_loc=this._calculateEnd(),this._startDecelaration())},p.stop=function(){this.stopped=!0,this._internalStop()},p.cancel=function(){this.start_drag=!0,this.__isout?(this.__speed=4e-4,this._startDecelaration()):this.options.snapping&&this.gotoSnap(this.getSnapNum(this.value),!0)},p.renderCallback=function(listener,ref){this.__renderHook={fun:listener,ref:ref}},p.snappingCallback=function(listener,ref){this.__snapHook={fun:listener,ref:ref}},p.snapCompleteCallback=function(listener,ref){this.__compHook={fun:listener,ref:ref}},p.getSnapNum=function(value){return Math.floor((value+this.options.snapsize/2)/this.options.snapsize)},p.nextSnap=function(){this._internalStop();var curr_snap=this.getSnapNum(this.value);!this.options.endless&&(curr_snap+1)*this.options.snapsize>this._max_value?(this.__speed=8,this.__needsSnap=!1,this._startDecelaration()):this.gotoSnap(curr_snap+1,!0)},p.prevSnap=function(){this._internalStop();var curr_snap=this.getSnapNum(this.value);!this.options.endless&&(curr_snap-1)*this.options.snapsize<this._min_value?(this.__speed=-8,this.__needsSnap=!1,this._startDecelaration()):this.gotoSnap(curr_snap-1,!0)},p.gotoSnap=function(snap_num,animate,speed){this.changeTo(snap_num*this.options.snapsize,animate,speed,snap_num)},p.destroy=function(){this._internalStop(),this.__renderHook=null,this.__snapHook=null,this.__compHook=null},p._internalStop=function(){this.start_drag=!0,this.animating=!1,this._deceleration=!1,this.__extrStep=0},p._calculateExtraMove=function(value){var m=value%this.options.snapsize;return m<this.options.snapsize/2?-m:this.options.snapsize-m},p._calculateEnd=function(step){for(var temp_speed=this.__speed,temp_value=this.value,i=0;Math.abs(temp_speed)>this.options.minValidDist;)temp_value+=temp_speed,temp_speed*=this.options.friction,i++;return step?i:temp_value},p._checkLimits=function(value){return this.options.endless?value:value<this._min_value?this._min_value:value>this._max_value?this._max_value:value},p._callrenderer=function(){this.__renderHook&&this.__renderHook.fun.call(this.__renderHook.ref,this,this.value)},p._callsnapChange=function(targetSnap){this.__snapHook&&targetSnap!==this.current_snap&&this.__snapHook.fun.call(this.__snapHook.ref,this,targetSnap,targetSnap-this.current_snap)},p._callonComplete=function(type){this.__compHook&&!this.stopped&&this.__compHook.fun.call(this.__compHook.ref,this,this.current_snap,type)},p._computeDeceleration=function(){if(this.options.snapping&&this.__needsSnap){var xtr_move=(this.__startSpeed-this.__speed)/this.__startSpeed*this.__extraMove;this.value+=this.__speed+xtr_move-this.__extrStep,this.__extrStep=xtr_move}else this.value+=this.__speed;if(this.__speed*=this.options.friction,this.options.endless||this.options.bouncing||(this.value<=this._min_value?(this.value=this._min_value,this.__speed=0):this.value>=this._max_value&&(this.value=this._max_value,this.__speed=0)),this._callrenderer(),!this.options.endless&&this.options.bouncing){var out_value=0;this.value<this._min_value?out_value=this._min_value-this.value:this.value>this._max_value&&(out_value=this._max_value-this.value),this.__isout=Math.abs(out_value)>=this.options.minValidDist,this.__isout&&(this.__speed*out_value<=0?this.__speed+=out_value*this.options.outFriction:this.__speed=out_value*this.options.outAcceleration)}},p._startDecelaration=function(){if(!this._deceleration){this._deceleration=!0;var self=this,tick=function(){self._deceleration&&(self._computeDeceleration(),Math.abs(self.__speed)>self.options.minValidDist||self.__isout?window.requestAnimationFrame(tick):(self._deceleration=!1,self.__isout=!1,self.value=self.__needsSnap&&self.options.snapping&&!self.options.paging?self._checkLimits(self.end_loc+self.__extraMove):Math.round(self.value),self._callrenderer(),self._callonComplete("decel")))};tick()}},window.Controller=Controller}(),function(window,document,$){window.MSLayerController=function(slide){this.slide=slide,this.slider=slide.slider,this.layers=[],this.layersCount=0,this.preloadCount=0,this.$layers=$("<div></div>").addClass("ms-slide-layers"),this.$staticLayers=$("<div></div>").addClass("ms-static-layers"),this.$fixedLayers=$("<div></div>").addClass("ms-fixed-layers"),this.$animLayers=$("<div></div>").addClass("ms-anim-layers")};var p=MSLayerController.prototype;p.addLayer=function(layer){switch(layer.slide=this.slide,layer.controller=this,layer.$element.data("position")){case"static":this.hasStaticLayer=!0,layer.$element.appendTo(this.$staticLayers);break;case"fixed":this.hasFixedLayer=!0,layer.$element.appendTo(this.$fixedLayers);break;default:layer.$element.appendTo(this.$animLayers)}layer.create(),this.layers.push(layer),this.layersCount++,layer.parallax&&(this.hasParallaxLayer=!0),layer.needPreload&&this.preloadCount++},p.create=function(){this.slide.$element.append(this.$layers),this.$layers.append(this.$animLayers),this.hasStaticLayer&&this.$layers.append(this.$staticLayers),"center"==this.slider.options.layersMode&&(this.$layers.css("max-width",this.slider.options.width+"px"),this.hasFixedLayer&&this.$fixedLayers.css("max-width",this.slider.options.width+"px"))},p.loadLayers=function(callback){if(this._onReadyCallback=callback,0===this.preloadCount)return void this._onlayersReady();for(var i=0;i!==this.layersCount;++i)this.layers[i].needPreload&&this.layers[i].loadImage()},p.prepareToShow=function(){this.hasParallaxLayer&&this._enableParallaxEffect(),this.hasFixedLayer&&this.$fixedLayers.prependTo(this.slide.view.$element)},p.showLayers=function(){this.layersHideTween&&this.layersHideTween.stop(!0),this.fixedLayersHideTween&&this.fixedLayersHideTween.stop(!0),this._resetLayers(),this.$animLayers.css("opacity","").css("display",""),this.hasFixedLayer&&this.$fixedLayers.css("opacity","").css("display",""),this.ready&&(this._initLayers(),this._locateLayers(),this._startLayers())},p.hideLayers=function(){if(this.slide.selected||this.slider.options.instantStartLayers){var that=this;that.layersHideTween=CTween.animate(this.$animLayers,500,{opacity:0},{complete:function(){that._resetLayers()}}),this.hasFixedLayer&&(this.fixedLayersHideTween=CTween.animate(this.$fixedLayers,500,{opacity:0},{complete:function(){that.$fixedLayers.detach()}})),this.hasParallaxLayer&&this._disableParallaxEffect()}},p.animHideLayers=function(){if(this.ready)for(var i=0;i!==this.layersCount;++i)this.layers[i].hide()},p.setSize=function(width,height,hard){if(this.ready&&(this.slide.selected||this.hasStaticLayer)&&(hard&&this._initLayers(!0),this._locateLayers(!this.slide.selected)),this.slider.options.autoHeight&&this.updateHeight(),"center"==this.slider.options.layersMode){var left=Math.max(0,(width-this.slider.options.width)/2)+"px";this.$layers[0].style.left=left,this.$fixedLayers[0].style.left=left}},p.updateHeight=function(){var h=this.slide.getHeight()+"px";this.$layers[0].style.height=h,this.$fixedLayers[0].style.height=h},p._onlayersReady=function(){this.ready=!0,this.hasStaticLayer&&!this.slide.isSleeping&&this._initLayers(!1,!0),this._onReadyCallback.call(this.slide)},p.onSlideSleep=function(){},p.onSlideWakeup=function(){this.hasStaticLayer&&this.ready&&this._initLayers(!1,!0)},p.destroy=function(){this.slide.selected&&this.hasParallaxLayer&&this._disableParallaxEffect();for(var i=0;i<this.layersCount;++i)this.layers[i].$element.stop(!0).remove();this.$layers.remove(),this.$staticLayers.remove(),this.$fixedLayers.remove(),this.$animLayers.remove()},p._startLayers=function(){for(var i=0;i!==this.layersCount;++i)this.layers[i].start()},p._initLayers=function(force,onlyStatics){if(!(this.init&&!force||this.slider.init_safemode)){this.init=onlyStatics!==!0;var i=0;if(onlyStatics&&!this.staticsInit)for(this.staticsInit=!0;i!==this.layersCount;++i)this.layers[i].staticLayer&&this.layers[i].init();else if(this.staticsInit&&!force)for(;i!==this.layersCount;++i)this.layers[i].staticLayer||this.layers[i].init();else for(;i!==this.layersCount;++i)this.layers[i].init()}},p._locateLayers=function(onlyStatics){var i=0;if(onlyStatics)for(;i!==this.layersCount;++i)this.layers[i].staticLayer&&this.layers[i].locate();else for(;i!==this.layersCount;++i)this.layers[i].locate()},p._resetLayers=function(){this.$animLayers.css("display","none").css("opacity",1);for(var i=0;i!==this.layersCount;++i)this.layers[i].reset()},p._applyParallax=function(x,y,fast){for(var i=0;i!==this.layersCount;++i)null!=this.layers[i].parallax&&this.layers[i].moveParallax(x,y,fast)},p._enableParallaxEffect=function(){"swipe"===this.slider.options.parallaxMode?this.slide.view.addEventListener(MSViewEvents.SCROLL,this._swipeParallaxMove,this):this.slide.$element.on("mousemove",{that:this},this._mouseParallaxMove).on("mouseleave",{that:this},this._resetParalax)},p._disableParallaxEffect=function(){"swipe"===this.slider.options.parallaxMode?this.slide.view.removeEventListener(MSViewEvents.SCROLL,this._swipeParallaxMove,this):this.slide.$element.off("mousemove",this._mouseParallaxMove).off("mouseleave",this._resetParalax)},p._resetParalax=function(e){var that=e.data.that;that._applyParallax(0,0)},p._mouseParallaxMove=function(e){var that=e.data.that,os=that.slide.$element.offset(),slider=that.slider;if("mouse:y-only"!==slider.options.parallaxMode)var x=e.pageX-os.left-that.slide.__width/2;else var x=0;if("mouse:x-only"!==slider.options.parallaxMode)var y=e.pageY-os.top-that.slide.__height/2;else var y=0;that._applyParallax(-x,-y)},p._swipeParallaxMove=function(){var value=this.slide.position-this.slide.view.__contPos;"v"===this.slider.options.dir?this._applyParallax(0,value,!0):this._applyParallax(value,0,!0)}}(window,document,jQuery),function($){window.MSLayerEffects={};var installed,_fade={opacity:0};MSLayerEffects.setup=function(){if(!installed){installed=!0;var st=MSLayerEffects,transform_css=window._jcsspfx+"Transform",transform_orig_css=window._jcsspfx+"TransformOrigin",o=$.browser.opera;_2d=window._css2d&&window._cssanim&&!o,st.defaultValues={left:0,top:0,opacity:isMSIE("<9")?1:"",right:0,bottom:0},st.defaultValues[transform_css]="",st.rf=1,st.presetEffParams={random:"30|300","long":300,"short":30,"false":!1,"true":!0,tl:"top left",bl:"bottom left",tr:"top right",br:"bottom right",rt:"top right",lb:"bottom left",lt:"top left",rb:"bottom right",t:"top",b:"bottom",r:"right",l:"left",c:"center"},st.fade=function(){return _fade},st.left=_2d?function(dist,fade){var r=fade===!1?{}:{opacity:0};return r[transform_css]="translateX("+-dist*st.rf+"px)",r}:function(dist,fade){var r=fade===!1?{}:{opacity:0};return r.left=-dist*st.rf+"px",r},st.right=_2d?function(dist,fade){var r=fade===!1?{}:{opacity:0};return r[transform_css]="translateX("+dist*st.rf+"px)",r}:function(dist,fade){var r=fade===!1?{}:{opacity:0};
return r.left=dist*st.rf+"px",r},st.top=_2d?function(dist,fade){var r=fade===!1?{}:{opacity:0};return r[transform_css]="translateY("+-dist*st.rf+"px)",r}:function(dist,fade){var r=fade===!1?{}:{opacity:0};return r.top=-dist*st.rf+"px",r},st.bottom=_2d?function(dist,fade){var r=fade===!1?{}:{opacity:0};return r[transform_css]="translateY("+dist*st.rf+"px)",r}:function(dist,fade){var r=fade===!1?{}:{opacity:0};return r.top=dist*st.rf+"px",r},st.from=_2d?function(leftdis,topdis,fade){var r=fade===!1?{}:{opacity:0};return r[transform_css]="translateX("+leftdis*st.rf+"px) translateY("+topdis*st.rf+"px)",r}:function(leftdis,topdis,fade){var r=fade===!1?{}:{opacity:0};return r.top=topdis*st.rf+"px",r.left=leftdis*st.rf+"px",r},st.rotate=_2d?function(deg,orig){var r={opacity:0};return r[transform_css]=" rotate("+deg+"deg)",orig&&(r[transform_orig_css]=orig),r}:function(){return _fade},st.rotateleft=_2d?function(deg,dist,orig,fade){var r=st.left(dist,fade);return r[transform_css]+=" rotate("+deg+"deg)",orig&&(r[transform_orig_css]=orig),r}:function(deg,dist,orig,fade){return st.left(dist,fade)},st.rotateright=_2d?function(deg,dist,orig,fade){var r=st.right(dist,fade);return r[transform_css]+=" rotate("+deg+"deg)",orig&&(r[transform_orig_css]=orig),r}:function(deg,dist,orig,fade){return st.right(dist,fade)},st.rotatetop=_2d?function(deg,dist,orig,fade){var r=st.top(dist,fade);return r[transform_css]+=" rotate("+deg+"deg)",orig&&(r[transform_orig_css]=orig),r}:function(deg,dist,orig,fade){return st.top(dist,fade)},st.rotatebottom=_2d?function(deg,dist,orig,fade){var r=st.bottom(dist,fade);return r[transform_css]+=" rotate("+deg+"deg)",orig&&(r[transform_orig_css]=orig),r}:function(deg,dist,orig,fade){return st.bottom(dist,fade)},st.rotatefrom=_2d?function(deg,leftdis,topdis,orig,fade){var r=st.from(leftdis,topdis,fade);return r[transform_css]+=" rotate("+deg+"deg)",orig&&(r[transform_orig_css]=orig),r}:function(deg,leftdis,topdis,orig,fade){return st.from(leftdis,topdis,fade)},st.skewleft=_2d?function(deg,dist,fade){var r=st.left(dist,fade);return r[transform_css]+=" skewX("+deg+"deg)",r}:function(deg,dist,fade){return st.left(dist,fade)},st.skewright=_2d?function(deg,dist,fade){var r=st.right(dist,fade);return r[transform_css]+=" skewX("+-deg+"deg)",r}:function(deg,dist,fade){return st.right(dist,fade)},st.skewtop=_2d?function(deg,dist,fade){var r=st.top(dist,fade);return r[transform_css]+=" skewY("+deg+"deg)",r}:function(deg,dist,fade){return st.top(dist,fade)},st.skewbottom=_2d?function(deg,dist,fade){var r=st.bottom(dist,fade);return r[transform_css]+=" skewY("+-deg+"deg)",r}:function(deg,dist,fade){return st.bottom(dist,fade)},st.scale=_2d?function(x,y,orig,fade){var r=fade===!1?{}:{opacity:0};return r[transform_css]=" scaleX("+x+") scaleY("+y+")",orig&&(r[transform_orig_css]=orig),r}:function(x,y,orig,fade){return fade===!1?{}:{opacity:0}},st.scaleleft=_2d?function(x,y,dist,orig,fade){var r=st.left(dist,fade);return r[transform_css]=" scaleX("+x+") scaleY("+y+")",orig&&(r[transform_orig_css]=orig),r}:function(x,y,dist,orig,fade){return st.left(dist,fade)},st.scaleright=_2d?function(x,y,dist,orig,fade){var r=st.right(dist,fade);return r[transform_css]=" scaleX("+x+") scaleY("+y+")",orig&&(r[transform_orig_css]=orig),r}:function(x,y,dist,orig,fade){return st.right(dist,fade)},st.scaletop=_2d?function(x,y,dist,orig,fade){var r=st.top(dist,fade);return r[transform_css]=" scaleX("+x+") scaleY("+y+")",orig&&(r[transform_orig_css]=orig),r}:function(x,y,dist,orig,fade){return st.top(dist,fade)},st.scalebottom=_2d?function(x,y,dist,orig,fade){var r=st.bottom(dist,fade);return r[transform_css]=" scaleX("+x+") scaleY("+y+")",orig&&(r[transform_orig_css]=orig),r}:function(x,y,dist,orig,fade){return st.bottom(dist,fade)},st.scalefrom=_2d?function(x,y,leftdis,topdis,orig,fade){var r=st.from(leftdis,topdis,fade);return r[transform_css]+=" scaleX("+x+") scaleY("+y+")",orig&&(r[transform_orig_css]=orig),r}:function(x,y,leftdis,topdis,orig,fade){return st.from(leftdis,topdis,fade)},st.rotatescale=_2d?function(deg,x,y,orig,fade){var r=st.scale(x,y,orig,fade);return r[transform_css]+=" rotate("+deg+"deg)",orig&&(r[transform_orig_css]=orig),r}:function(deg,x,y,orig,fade){return st.scale(x,y,orig,fade)},st.front=window._css3d?function(dist,fade){var r=fade===!1?{}:{opacity:0};return r[transform_css]="perspective(2000px) translate3d(0 , 0 ,"+dist+"px ) rotate(0.001deg)",r}:function(){return _fade},st.back=window._css3d?function(dist,fade){var r=fade===!1?{}:{opacity:0};return r[transform_css]="perspective(2000px) translate3d(0 , 0 ,"+-dist+"px ) rotate(0.001deg)",r}:function(){return _fade},st.rotatefront=window._css3d?function(deg,dist,orig,fade){var r=fade===!1?{}:{opacity:0};return r[transform_css]="perspective(2000px) translate3d(0 , 0 ,"+dist+"px ) rotate("+(deg||.001)+"deg)",orig&&(r[transform_orig_css]=orig),r}:function(){return _fade},st.rotateback=window._css3d?function(deg,dist,orig,fade){var r=fade===!1?{}:{opacity:0};return r[transform_css]="perspective(2000px) translate3d(0 , 0 ,"+-dist+"px ) rotate("+(deg||.001)+"deg)",orig&&(r[transform_orig_css]=orig),r}:function(){return _fade},st.rotate3dleft=window._css3d?function(x,y,z,dist,orig,fade){var r=st.left(dist,fade);return r[transform_css]+=(x?" rotateX("+x+"deg)":" ")+(y?" rotateY("+y+"deg)":"")+(z?" rotateZ("+z+"deg)":""),orig&&(r[transform_orig_css]=orig),r}:function(x,y,z,dist,orig,fade){return st.left(dist,fade)},st.rotate3dright=window._css3d?function(x,y,z,dist,orig,fade){var r=st.right(dist,fade);return r[transform_css]+=(x?" rotateX("+x+"deg)":" ")+(y?" rotateY("+y+"deg)":"")+(z?" rotateZ("+z+"deg)":""),orig&&(r[transform_orig_css]=orig),r}:function(x,y,z,dist,orig,fade){return st.right(dist,fade)},st.rotate3dtop=window._css3d?function(x,y,z,dist,orig,fade){var r=st.top(dist,fade);return r[transform_css]+=(x?" rotateX("+x+"deg)":" ")+(y?" rotateY("+y+"deg)":"")+(z?" rotateZ("+z+"deg)":""),orig&&(r[transform_orig_css]=orig),r}:function(x,y,z,dist,orig,fade){return st.top(dist,fade)},st.rotate3dbottom=window._css3d?function(x,y,z,dist,orig,fade){var r=st.bottom(dist,fade);return r[transform_css]+=(x?" rotateX("+x+"deg)":" ")+(y?" rotateY("+y+"deg)":"")+(z?" rotateZ("+z+"deg)":""),orig&&(r[transform_orig_css]=orig),r}:function(x,y,z,dist,orig,fade){return st.bottom(dist,fade)},st.rotate3dfront=window._css3d?function(x,y,z,dist,orig,fade){var r=st.front(dist,fade);return r[transform_css]+=(x?" rotateX("+x+"deg)":" ")+(y?" rotateY("+y+"deg)":"")+(z?" rotateZ("+z+"deg)":""),orig&&(r[transform_orig_css]=orig),r}:function(x,y,z,dist,orig,fade){return st.front(dist,fade)},st.rotate3dback=window._css3d?function(x,y,z,dist,orig,fade){var r=st.back(dist,fade);return r[transform_css]+=(x?" rotateX("+x+"deg)":" ")+(y?" rotateY("+y+"deg)":"")+(z?" rotateZ("+z+"deg)":""),orig&&(r[transform_orig_css]=orig),r}:function(x,y,z,dist,orig,fade){return st.back(dist,fade)},st.t=window._css3d?function(fade,tx,ty,tz,r,rx,ry,rz,scx,scy,skx,sky,ox,oy,oz){var _r=fade===!1?{}:{opacity:0},transform="perspective(2000px) ";"n"!==tx&&(transform+="translateX("+tx*st.rf+"px) "),"n"!==ty&&(transform+="translateY("+ty*st.rf+"px) "),"n"!==tz&&(transform+="translateZ("+tz*st.rf+"px) "),"n"!==r&&(transform+="rotate("+r+"deg) "),"n"!==rx&&(transform+="rotateX("+rx+"deg) "),"n"!==ry&&(transform+="rotateY("+ry+"deg) "),"n"!==rz&&(transform+="rotateZ("+rz+"deg) "),"n"!==skx&&(transform+="skewX("+skx+"deg) "),"n"!==sky&&(transform+="skewY("+sky+"deg) "),"n"!==scx&&(transform+="scaleX("+scx+") "),"n"!==scy&&(transform+="scaleY("+scy+")"),_r[transform_css]=transform;var trans_origin="";return trans_origin+="n"!==ox?ox+"% ":"50% ",trans_origin+="n"!==oy?oy+"% ":"50% ",trans_origin+="n"!==oz?oz+"px":"",_r[transform_orig_css]=trans_origin,_r}:function(fade,tx,ty,tz,r){var r=fade===!1?{}:{opacity:0};return"n"!==tx&&(r.left=tx*st.rf+"px"),"n"!==ty&&(r.top=ty*st.rf+"px"),r}}}}(jQuery),function($){window.MSLayerElement=function(){this.start_anim={name:"fade",duration:1e3,ease:"linear",delay:0},this.end_anim={duration:1e3,ease:"linear"},this.type="text",this.resizable=!0,this.minWidth=-1,this.isVisible=!0,this.__cssConfig=["margin-top","padding-top","margin-bottom","padding-left","margin-right","padding-right","margin-left","padding-bottom","font-size","line-height","width","left","right","top","bottom"],this.baseStyle={}};var p=MSLayerElement.prototype;p.setStartAnim=function(anim){$.extend(this.start_anim,anim),$.extend(this.start_anim,this._parseEff(this.start_anim.name)),this.$element.css("visibility","hidden")},p.setEndAnim=function(anim){$.extend(this.end_anim,anim)},p.create=function(){if(this.$element.css("display","none"),this.resizable=this.$element.data("resize")!==!1,this.fixed=this.$element.data("fixed")===!0,void 0!==this.$element.data("widthlimit")&&(this.minWidth=this.$element.data("widthlimit")),this.end_anim.name||(this.end_anim.name=this.start_anim.name),this.end_anim.time&&(this.autoHide=!0),this.staticLayer="static"===this.$element.data("position"),this.fixedLayer="fixed"===this.$element.data("position"),this.layersCont=this.controller.$layers,this.staticLayer&&this.$element.css("display","").css("visibility",""),void 0!==this.$element.data("action")){var slideController=this.slide.slider.slideController;this.$element.on("click",function(event){slideController.runAction($(this).data("action")),event.preventDefault()}).addClass("ms-action-layer")}$.extend(this.end_anim,this._parseEff(this.end_anim.name)),this.slider=this.slide.slider;var layerOrigin=this.layerOrigin=this.$element.data("origin");if(layerOrigin){var vOrigin=layerOrigin.charAt(0),hOrigin=layerOrigin.charAt(1),offsetX=this.$element.data("offset-x"),offsetY=this.$element.data("offset-y");switch(void 0===offsetY&&(offsetY=0),vOrigin){case"t":this.$element[0].style.top=offsetY+"px";break;case"b":this.$element[0].style.bottom=offsetY+"px";break;case"m":this.$element[0].style.top=offsetY+"px",this.middleAlign=!0}switch(void 0===offsetX&&(offsetX=0),hOrigin){case"l":this.$element[0].style.left=offsetX+"px";break;case"r":this.$element[0].style.right=offsetX+"px";break;case"c":this.$element[0].style.left=offsetX+"px",this.centerAlign=!0}}this.parallax=this.$element.data("parallax"),null!=this.parallax&&(this.parallax/=100,this.$parallaxElement=$("<div></div>").addClass("ms-parallax-layer"),this.link?(this.link.wrap(this.$parallaxElement),this.$parallaxElement=this.link.parent()):(this.$element.wrap(this.$parallaxElement),this.$parallaxElement=this.$element.parent()),this._lastParaX=0,this._lastParaY=0,this._paraX=0,this._paraY=0,this.alignedToBot=this.layerOrigin&&-1!==this.layerOrigin.indexOf("b"),this.alignedToBot&&this.$parallaxElement.css("bottom",0),this.parallaxRender=window._css3d?this._parallaxCSS3DRenderer:window._css2d?this._parallaxCSS2DRenderer:this._parallax2DRenderer,"swipe"!==this.slider.options.parallaxMode&&averta.Ticker.add(this.parallaxRender,this)),$.removeDataAttrs(this.$element,["data-src"])},p.init=function(){this.initialized=!0;var value;this.$element.css("visibility","");for(var i=0,l=this.__cssConfig.length;l>i;i++){var key=this.__cssConfig[i];"text"===this.type&&"width"===key?value=this.$element[0].style.width:(value=this.$element.css(key),"width"!==key&&"height"!==key||"0px"!==value||(value=this.$element.data(key)+"px")),"auto"!=value&&""!=value&&"normal"!=value&&(this.baseStyle[key]=parseInt(value))}this.middleAlign&&(this.baseHeight=this.$element.outerHeight(!1)),this.centerAlign&&(this.baseWidth=this.$element.outerWidth(!1))},p.locate=function(){if(this.slide.ready){var factor,isPosition,width=parseFloat(this.layersCont.css("width")),height=parseFloat(this.layersCont.css("height"));!this.staticLayer&&"none"===this.$element.css("display")&&this.isVisible&&this.$element.css("display","").css("visibility","hidden"),factor=this.resizeFactor=width/this.slide.slider.options.width;for(var key in this.baseStyle)isPosition="top"===key||"left"===key||"bottom"===key||"right"===key,factor=this.fixed&&isPosition?1:this.resizeFactor,(this.resizable||isPosition)&&("top"===key&&this.middleAlign?(this.$element[0].style.top="0px",this.baseHeight=this.$element.outerHeight(!1),this.$element[0].style.top=this.baseStyle.top*factor+(height-this.baseHeight)/2+"px"):"left"===key&&this.centerAlign?(this.$element[0].style.left="0px",this.baseWidth=this.$element.outerWidth(!1),this.$element[0].style.left=this.baseStyle.left*factor+(width-this.baseWidth)/2+"px"):this.$element.css(key,this.baseStyle[key]*factor+"px"));this.visible(this.minWidth<width)}},p.start=function(){if(!this.isShowing&&!this.staticLayer){this.isShowing=!0;var key,base;MSLayerEffects.rf=this.resizeFactor;var effect_css=MSLayerEffects[this.start_anim.eff_name].apply(null,this._parseEffParams(this.start_anim.eff_params)),start_css_eff={};for(key in effect_css)this._checkPosKey(key,effect_css)||(null!=MSLayerEffects.defaultValues[key]&&(start_css_eff[key]=MSLayerEffects.defaultValues[key]),key in this.baseStyle&&(base=this.baseStyle[key],this.middleAlign&&"top"===key&&(base+=(parseInt(this.layersCont.height())-this.$element.outerHeight(!1))/2),this.centerAlign&&"left"===key&&(base+=(parseInt(this.layersCont.width())-this.$element.outerWidth(!1))/2),effect_css[key]=base+parseFloat(effect_css[key])+"px",start_css_eff[key]=base+"px"),this.$element.css(key,effect_css[key]));var that=this;clearTimeout(this.to),this.to=setTimeout(function(){that.$element.css("visibility",""),that._playAnimation(that.start_anim,start_css_eff)},that.start_anim.delay||.01),this.clTo=setTimeout(function(){that.show_cl=!0},(this.start_anim.delay||.01)+this.start_anim.duration),this.autoHide&&(clearTimeout(this.hto),this.hto=setTimeout(function(){that.hide()},that.end_anim.time))}},p.hide=function(){if(!this.staticLayer){this.isShowing=!1;var effect_css=MSLayerEffects[this.end_anim.eff_name].apply(null,this._parseEffParams(this.end_anim.eff_params));for(key in effect_css)this._checkPosKey(key,effect_css)||(key===window._jcsspfx+"TransformOrigin"&&this.$element.css(key,effect_css[key]),key in this.baseStyle&&(effect_css[key]=this.baseStyle[key]+parseFloat(effect_css[key])+"px"));this._playAnimation(this.end_anim,effect_css),clearTimeout(this.to),clearTimeout(this.hto),clearTimeout(this.clTo)}},p.reset=function(){this.staticLayer||(this.isShowing=!1,this.$element[0].style.display="none",this.$element.css("opacity",""),this.$element[0].style.transitionDuration="",this.show_tween&&this.show_tween.stop(!0),clearTimeout(this.to),clearTimeout(this.hto))},p.destroy=function(){this.reset(),this.$element.remove()},p.visible=function(value){this.isVisible!=value&&(this.isVisible=value,this.$element.css("display",value?"":"none"))},p.moveParallax=function(x,y,fast){this._paraX=x,this._paraY=y,fast&&(this._lastParaX=x,this._lastParaY=y,this.parallaxRender())},p._playAnimation=function(animation,css){var options={};animation.ease&&(options.ease=animation.ease),options.transProperty=window._csspfx+"transform,opacity",this.show_tween=CTween.animate(this.$element,animation.duration,css,options)},p._randomParam=function(value){var min=Number(value.slice(0,value.indexOf("|"))),max=Number(value.slice(value.indexOf("|")+1));return min+Math.random()*(max-min)},p._parseEff=function(eff_name){var eff_params=[];if(-1!==eff_name.indexOf("(")){var value,temp=eff_name.slice(0,eff_name.indexOf("(")).toLowerCase();eff_params=eff_name.slice(eff_name.indexOf("(")+1,-1).replace(/\"|\'|\s/g,"").split(","),eff_name=temp;for(var i=0,l=eff_params.length;l>i;++i)value=eff_params[i],value in MSLayerEffects.presetEffParams&&(value=MSLayerEffects.presetEffParams[value]),eff_params[i]=value}return{eff_name:eff_name,eff_params:eff_params}},p._parseEffParams=function(params){for(var eff_params=[],i=0,l=params.length;l>i;++i){var value=params[i];"string"==typeof value&&-1!==value.indexOf("|")&&(value=this._randomParam(value)),eff_params[i]=value}return eff_params},p._checkPosKey=function(key,style){return"left"===key&&!(key in this.baseStyle)&&"right"in this.baseStyle?(style.right=-parseInt(style.left)+"px",delete style.left,!0):"top"===key&&!(key in this.baseStyle)&&"bottom"in this.baseStyle?(style.bottom=-parseInt(style.top)+"px",delete style.top,!0):!1},p._parallaxCalc=function(){var x_def=this._paraX-this._lastParaX,y_def=this._paraY-this._lastParaY;this._lastParaX+=x_def/12,this._lastParaY+=y_def/12,Math.abs(x_def)<.019&&(this._lastParaX=this._paraX),Math.abs(y_def)<.019&&(this._lastParaY=this._paraY)},p._parallaxCSS3DRenderer=function(){this._parallaxCalc(),this.$parallaxElement[0].style[window._jcsspfx+"Transform"]="translateX("+this._lastParaX*this.parallax+"px) translateY("+this._lastParaY*this.parallax+"px) translateZ(0)"},p._parallaxCSS2DRenderer=function(){this._parallaxCalc(),this.$parallaxElement[0].style[window._jcsspfx+"Transform"]="translateX("+this._lastParaX*this.parallax+"px) translateY("+this._lastParaY*this.parallax+"px)"},p._parallax2DRenderer=function(){this._parallaxCalc(),this.alignedToBot?this.$parallaxElement[0].style.bottom=this._lastParaY*this.parallax+"px":this.$parallaxElement[0].style.top=this._lastParaY*this.parallax+"px",this.$parallaxElement[0].style.left=this._lastParaX*this.parallax+"px"}}(jQuery),function($){window.MSImageLayerElement=function(){MSLayerElement.call(this),this.needPreload=!0,this.__cssConfig=["width","height","margin-top","padding-top","margin-bottom","padding-left","margin-right","padding-right","margin-left","padding-bottom","left","right","top","bottom"],this.type="image"},MSImageLayerElement.extend(MSLayerElement);var p=MSImageLayerElement.prototype,_super=MSLayerElement.prototype;p.create=function(){if(this.link){var p=this.$element.parent();p.append(this.link),this.link.append(this.$element),this.link.removeClass("ms-layer"),this.$element.addClass("ms-layer"),p=null}if(_super.create.call(this),void 0!=this.$element.data("src"))this.img_src=this.$element.data("src"),this.$element.removeAttr("data-src");else{var that=this;this.$element.on("load",function(){that.controller.preloadCount--,0===that.controller.preloadCount&&that.controller._onlayersReady()}).each($.jqLoadFix)}$.browser.msie&&this.$element.on("dragstart",function(event){event.preventDefault()})},p.loadImage=function(){var that=this;this.$element.preloadImg(this.img_src,function(){that.controller.preloadCount--,0===that.controller.preloadCount&&that.controller._onlayersReady()})}}(jQuery),function($){window.MSVideoLayerElement=function(){MSLayerElement.call(this),this.__cssConfig.push("height"),this.type="video"},MSVideoLayerElement.extend(MSLayerElement);var p=MSVideoLayerElement.prototype,_super=MSLayerElement.prototype;p.__playVideo=function(){this.img&&CTween.fadeOut(this.img,500,2),CTween.fadeOut(this.video_btn,500,2),this.video_frame.attr("src","about:blank").css("display","block"),-1==this.video_url.indexOf("?")&&(this.video_url+="?"),this.video_frame.attr("src",this.video_url+"&autoplay=1")},p.start=function(){_super.start.call(this),this.$element.data("autoplay")&&this.__playVideo()},p.reset=function(){return _super.reset.call(this),(this.needPreload||this.$element.data("btn"))&&(this.video_btn.css("opacity",1).css("display","block"),this.video_frame.attr("src","about:blank").css("display","none")),this.needPreload?void this.img.css("opacity",1).css("display","block"):void this.video_frame.attr("src",this.video_url)},p.create=function(){_super.create.call(this),this.video_frame=this.$element.find("iframe").css({width:"100%",height:"100%"}),this.video_url=this.video_frame.attr("src");var has_img=0!=this.$element.has("img").length;if(has_img||this.$element.data("btn")){this.video_frame.attr("src","about:blank").css("display","none");var that=this;if(this.video_btn=$("<div></div>").appendTo(this.$element).addClass("ms-video-btn").click(function(){that.__playVideo()}),has_img){if(this.needPreload=!0,this.img=this.$element.find("img:first").addClass("ms-video-img"),void 0!==this.img.data("src"))this.img_src=this.img.data("src"),this.img.removeAttr("data-src");else{var that=this;this.img.attr("src",this.img_src).on("load",function(){that.controller.preloadCount--,0===that.controller.preloadCount&&that.controller._onlayersReady()}).each($.jqLoadFix)}$.browser.msie&&this.img.on("dragstart",function(event){event.preventDefault()})}}},p.loadImage=function(){var that=this;this.img.preloadImg(this.img_src,function(){that.controller.preloadCount--,0===that.controller.preloadCount&&that.controller._onlayersReady()})}}(jQuery),function($){"use strict";window.MSHotspotLayer=function(){MSLayerElement.call(this),this.__cssConfig=["margin-top","padding-top","margin-bottom","padding-left","margin-right","padding-right","margin-left","padding-bottom","left","right","top","bottom"],this.ease="Expo",this.hide_start=!0,this.type="hotspot"},MSHotspotLayer.extend(MSLayerElement);var p=MSHotspotLayer.prototype,_super=MSLayerElement.prototype;p._showTT=function(){this.show_cl&&(clearTimeout(this.hto),this._tween&&this._tween.stop(!0),this.hide_start&&(this.align=this._orgAlign,this._locateTT(),this.tt.css({display:"block"}),this._tween=CTween.animate(this.tt,900,this.to,{ease:"easeOut"+this.ease}),this.hide_start=!1))},p._hideTT=function(){if(this.show_cl){this._tween&&this._tween.stop(!0);var that=this;clearTimeout(this.hto),this.hto=setTimeout(function(){that.hide_start=!0,that._tween=CTween.animate(that.tt,900,that.from,{ease:"easeOut"+that.ease,complete:function(){that.tt.css("display","none")}})},200)}},p._updateClassName=function(name){this._lastClass&&this.tt.removeClass(this._lastClass),this.tt.addClass(name),this._lastClass=name},p._alignPolicy=function(){{var w=(this.tt.outerHeight(!1),Math.max(this.tt.outerWidth(!1),parseInt(this.tt.css("max-width")))),ww=window.innerWidth;window.innerHeight}switch(this.align){case"top":if(this.base_t<0)return"bottom";break;case"right":if(this.base_l+w>ww||this.base_t<0)return"bottom";break;case"left":if(this.base_l<0||this.base_t<0)return"bottom"}return null},p._locateTT=function(){var os=this.$element.offset(),os2=this.slide.slider.$element.offset(),dist=50,space=15;this.pos_x=os.left-os2.left-this.slide.slider.$element.scrollLeft(),this.pos_y=os.top-os2.top-this.slide.slider.$element.scrollTop(),this.from={opacity:0},this.to={opacity:1},this._updateClassName("ms-tooltip-"+this.align),this.tt_arrow.css("margin-left","");var arrow_w=15,arrow_h=15;switch(this.align){case"top":var w=Math.min(this.tt.outerWidth(!1),parseInt(this.tt.css("max-width")));this.base_t=this.pos_y-this.tt.outerHeight(!1)-arrow_h-space,this.base_l=this.pos_x-w/2,this.base_l+w>window.innerWidth&&(this.tt_arrow.css("margin-left",-arrow_w/2+this.base_l+w-window.innerWidth+"px"),this.base_l=window.innerWidth-w),this.base_l<0&&(this.base_l=0,this.tt_arrow.css("margin-left",-arrow_w/2+this.pos_x-this.tt.outerWidth(!1)/2+"px")),window._css3d?(this.from[window._jcsspfx+"Transform"]="translateY(-"+dist+"px)",this.to[window._jcsspfx+"Transform"]=""):(this.from.top=this.base_t-dist+"px",this.to.top=this.base_t+"px");break;case"bottom":var w=Math.min(this.tt.outerWidth(!1),parseInt(this.tt.css("max-width")));this.base_t=this.pos_y+arrow_h+space,this.base_l=this.pos_x-w/2,this.base_l+w>window.innerWidth&&(this.tt_arrow.css("margin-left",-arrow_w/2+this.base_l+w-window.innerWidth+"px"),this.base_l=window.innerWidth-w),this.base_l<0&&(this.base_l=0,this.tt_arrow.css("margin-left",-arrow_w/2+this.pos_x-this.tt.outerWidth(!1)/2+"px")),window._css3d?(this.from[window._jcsspfx+"Transform"]="translateY("+dist+"px)",this.to[window._jcsspfx+"Transform"]=""):(this.from.top=this.base_t+dist+"px",this.to.top=this.base_t+"px");break;case"right":this.base_l=this.pos_x+arrow_w+space,this.base_t=this.pos_y-this.tt.outerHeight(!1)/2,window._css3d?(this.from[window._jcsspfx+"Transform"]="translateX("+dist+"px)",this.to[window._jcsspfx+"Transform"]=""):(this.from.left=this.base_l+dist+"px",this.to.left=this.base_l+"px");break;case"left":this.base_l=this.pos_x-arrow_w-this.tt.outerWidth(!1)-space,this.base_t=this.pos_y-this.tt.outerHeight(!1)/2,window._css3d?(this.from[window._jcsspfx+"Transform"]="translateX(-"+dist+"px)",this.to[window._jcsspfx+"Transform"]=""):(this.from.left=this.base_l-dist+"px",this.to.left=this.base_l+"px")}var policyAlign=this._alignPolicy();return null!==policyAlign?(this.align=policyAlign,void this._locateTT()):(this.tt.css("top",parseInt(this.base_t)+"px").css("left",parseInt(this.base_l)+"px"),void this.tt.css(this.from))},p.start=function(){_super.start.call(this),this.tt.appendTo(this.slide.slider.$element),this.tt.css("display","none")},p.reset=function(){_super.reset.call(this),this.tt.detach()},p.create=function(){var that=this;this._orgAlign=this.align=void 0!==this.$element.data("align")?this.$element.data("align"):"top",this.data=this.$element.html(),this.$element.html("").on("mouseenter",function(){that._showTT()}).on("mouseleave",function(){that._hideTT()}),this.point=$('<div><div class="ms-point-center"></div><div class="ms-point-border"></div></div>').addClass("ms-tooltip-point").appendTo(this.$element);var link=this.$element.data("link"),target=this.$element.data("target");link&&this.point.on("click",function(){window.open(link,target||"_self")}),this.tt=$("<div></div>").addClass("ms-tooltip").css("display","hidden").css("opacity",0),void 0!==this.$element.data("width")&&this.tt.css("width",this.$element.data("width")).css("max-width",this.$element.data("width")),this.tt_arrow=$("<div></div>").addClass("ms-tooltip-arrow").appendTo(this.tt),this._updateClassName("ms-tooltip-"+this.align),this.ttcont=$("<div></div>").addClass("ms-tooltip-cont").html(this.data).appendTo(this.tt),this.$element.data("stay-hover")===!0&&this.tt.on("mouseenter",function(){that.hide_start||(clearTimeout(that.hto),that._tween.stop(!0),that._showTT())}).on("mouseleave",function(){that._hideTT()}),_super.create.call(this)}}(jQuery),function(){window.MSButtonLayer=function(){MSLayerElement.call(this),this.type="button"},MSButtonLayer.extend(MSLayerElement);var p=MSButtonLayer.prototype,_super=MSLayerElement.prototype,positionKies=["top","left","bottom","right"];p.create=function(){_super.create.call(this),this.$element.wrap('<div class="ms-btn-container"></div>').css("position","relative"),this.$container=this.$element.parent()},p.locate=function(){_super.locate.call(this);for(var key,tempValue,i=0;4>i;i++)key=positionKies[i],key in this.baseStyle&&(tempValue=this.$element.css(key),this.$element.css(key,""),this.$container.css(key,tempValue));this.$container.width(this.$element.outerWidth(!0)).height(this.$element.outerHeight(!0))}}(jQuery),window.MSSliderEvent=function(type){this.type=type},MSSliderEvent.CHANGE_START="ms_changestart",MSSliderEvent.CHANGE_END="ms_changeend",MSSliderEvent.WAITING="ms_waiting",MSSliderEvent.AUTOPLAY_CHANGE="ms_autoplaychange",MSSliderEvent.VIDEO_PLAY="ms_videoPlay",MSSliderEvent.VIDEO_CLOSE="ms_videoclose",MSSliderEvent.INIT="ms_init",MSSliderEvent.HARD_UPDATE="ms_hard_update",MSSliderEvent.RESIZE="ms_resize",MSSliderEvent.RESERVED_SPACE_CHANGE="ms_rsc",MSSliderEvent.DESTROY="ms_destroy",function(window,document,$){"use strict";window.MSSlide=function(){this.$element=null,this.$loading=$("<div></div>").addClass("ms-slide-loading"),this.view=null,this.index=-1,this.__width=0,this.__height=0,this.fillMode="fill",this.selected=!1,this.pselected=!1,this.autoAppend=!0,this.isSleeping=!0,this.moz=$.browser.mozilla};var p=MSSlide.prototype;p.onSwipeStart=function(){this.link&&(this.linkdis=!0),this.video&&(this.videodis=!0)},p.onSwipeMove=function(e){var move=Math.max(Math.abs(e.data.distanceX),Math.abs(e.data.distanceY));this.swipeMoved=move>4},p.onSwipeCancel=function(){return this.swipeMoved?void(this.swipeMoved=!1):(this.link&&(this.linkdis=!1),void(this.video&&(this.videodis=!1)))},p.setupLayerController=function(){this.hasLayers=!0,this.layerController=new MSLayerController(this)},p.assetsLoaded=function(){this.ready=!0,this.slider.api._startTimer(),(this.selected||this.pselected&&this.slider.options.instantStartLayers)&&(this.hasLayers&&this.layerController.showLayers(),this.vinit&&(this.bgvideo.play(),this.autoPauseBgVid||(this.bgvideo.currentTime=0))),this.isSleeping||this.setupBG(),CTween.fadeOut(this.$loading,300,!0),(0===this.slider.options.preload||"all"===this.slider.options.preload)&&this.index<this.view.slideList.length-1?this.view.slideList[this.index+1].loadImages():"all"===this.slider.options.preload&&this.index===this.view.slideList.length-1&&this.slider._removeLoading()},p.setBG=function(img){this.hasBG=!0;var that=this;this.$imgcont=$("<div></div>").addClass("ms-slide-bgcont"),this.$element.append(this.$loading).append(this.$imgcont),this.$bg_img=$(img).css("visibility","hidden"),this.$imgcont.append(this.$bg_img),this.bgAligner=new MSAligner(that.fillMode,that.$imgcont,that.$bg_img),this.bgAligner.widthOnly=this.slider.options.autoHeight,that.slider.options.autoHeight&&(that.pselected||that.selected)&&that.slider.setHeight(that.slider.options.height),void 0!==this.$bg_img.data("src")?(this.bg_src=this.$bg_img.data("src"),this.$bg_img.removeAttr("data-src")):this.$bg_img.one("load",function(event){that._onBGLoad(event)}).each($.jqLoadFix)},p.setupBG=function(){!this.initBG&&this.bgLoaded&&(this.initBG=!0,this.$bg_img.css("visibility",""),this.bgWidth=this.bgNatrualWidth||this.$bg_img.width(),this.bgHeight=this.bgNatrualHeight||this.$bg_img.height(),CTween.fadeIn(this.$imgcont,300),this.slider.options.autoHeight&&this.$imgcont.height(this.bgHeight*this.ratio),this.bgAligner.init(this.bgWidth,this.bgHeight),this.setSize(this.__width,this.__height),this.slider.options.autoHeight&&(this.pselected||this.selected)&&this.slider.setHeight(this.getHeight()))},p.loadImages=function(){if(!this.ls){if(this.ls=!0,this.bgvideo&&this.bgvideo.load(),this.hasBG&&this.bg_src){var that=this;this.$bg_img.preloadImg(this.bg_src,function(event){that._onBGLoad(event)})}this.hasLayers&&this.layerController.loadLayers(this._onLayersLoad),this.hasBG||this.hasLayers||this.assetsLoaded()}},p._onLayersLoad=function(){this.layersLoaded=!0,(!this.hasBG||this.bgLoaded)&&this.assetsLoaded()},p._onBGLoad=function(event){this.bgNatrualWidth=event.width,this.bgNatrualHeight=event.height,this.bgLoaded=!0,$.browser.msie&&this.$bg_img.on("dragstart",function(event){event.preventDefault()}),(!this.hasLayers||this.layerController.ready)&&this.assetsLoaded()},p.setBGVideo=function($video){if($video[0].play){if(window._mobile)return void $video.remove();this.bgvideo=$video[0];var that=this;$video.addClass("ms-slide-bgvideo"),$video.data("loop")!==!1&&this.bgvideo.addEventListener("ended",function(){that.bgvideo.play()}),$video.data("mute")!==!1&&(this.bgvideo.muted=!0),$video.data("autopause")===!0&&(this.autoPauseBgVid=!0),this.bgvideo_fillmode=$video.data("fill-mode")||"fill","none"!==this.bgvideo_fillmode&&(this.bgVideoAligner=new MSAligner(this.bgvideo_fillmode,this.$element,$video),this.bgvideo.addEventListener("loadedmetadata",function(){that.vinit||(that.vinit=!0,that.video_aspect=that.bgVideoAligner.baseHeight/that.bgVideoAligner.baseWidth,that.bgVideoAligner.init(that.bgvideo.videoWidth,that.bgvideo.videoHeight),that._alignBGVideo(),CTween.fadeIn($(that.bgvideo),200),that.selected&&that.bgvideo.play())})),$video.css("opacity",0),this.$bgvideocont=$("<div></div>").addClass("ms-slide-bgvideocont").append($video),this.hasBG?this.$imgcont.before(this.$bgvideocont):this.$bgvideocont.appendTo(this.$element)}},p._alignBGVideo=function(){this.bgvideo_fillmode&&"none"!==this.bgvideo_fillmode&&this.bgVideoAligner.align()},p.setSize=function(width,height,hard){this.__width=width,this.slider.options.autoHeight&&(this.bgLoaded?(this.ratio=this.__width/this.bgWidth,height=Math.floor(this.ratio*this.bgHeight),this.$imgcont.height(height)):(this.ratio=width/this.slider.options.width,height=this.slider.options.height*this.ratio)),this.__height=height,this.$element.width(width).height(height),this.hasBG&&this.bgLoaded&&this.bgAligner.align(),this._alignBGVideo(),this.hasLayers&&this.layerController.setSize(width,height,hard)
},p.getHeight=function(){return this.hasBG&&this.bgLoaded?this.bgHeight*this.ratio:Math.max(this.$element[0].clientHeight,this.slider.options.height*this.ratio)},p.__playVideo=function(){this.vplayed||this.videodis||(this.vplayed=!0,this.slider.api.paused||(this.slider.api.pause(),this.roc=!0),this.vcbtn.css("display",""),CTween.fadeOut(this.vpbtn,500,!1),CTween.fadeIn(this.vcbtn,500),CTween.fadeIn(this.vframe,500),this.vframe.css("display","block").attr("src",this.video+"&autoplay=1"),this.view.$element.addClass("ms-def-cursor"),this.view.swipeControl&&this.view.swipeControl.disable(),this.slider.slideController.dispatchEvent(new MSSliderEvent(MSSliderEvent.VIDEO_PLAY)))},p.__closeVideo=function(){if(this.vplayed){this.vplayed=!1,this.roc&&this.slider.api.resume();var that=this;CTween.fadeIn(this.vpbtn,500),CTween.animate(this.vcbtn,500,{opacity:0},{complete:function(){that.vcbtn.css("display","none")}}),CTween.animate(this.vframe,500,{opacity:0},{complete:function(){that.vframe.attr("src","about:blank").css("display","none")}}),this.view.swipeControl&&this.view.swipeControl.enable(),this.view.$element.removeClass("ms-def-cursor"),this.slider.slideController.dispatchEvent(new MSSliderEvent(MSSliderEvent.VIDEO_CLOSE))}},p.create=function(){var that=this;this.hasLayers&&this.layerController.create(),this.link&&this.link.addClass("ms-slide-link").html("").click(function(e){that.linkdis&&e.preventDefault()}),this.video&&(-1===this.video.indexOf("?")&&(this.video+="?"),this.vframe=$("<iframe></iframe>").addClass("ms-slide-video").css({width:"100%",height:"100%",display:"none"}).attr("src","about:blank").attr("allowfullscreen","true").appendTo(this.$element),this.vpbtn=$("<div></div>").addClass("ms-slide-vpbtn").click(function(){that.__playVideo()}).appendTo(this.$element),this.vcbtn=$("<div></div>").addClass("ms-slide-vcbtn").click(function(){that.__closeVideo()}).appendTo(this.$element).css("display","none"),window._touch&&this.vcbtn.removeClass("ms-slide-vcbtn").addClass("ms-slide-vcbtn-mobile").append('<div class="ms-vcbtn-txt">Close video</div>').appendTo(this.view.$element.parent())),!this.slider.options.autoHeight&&this.hasBG&&(this.$imgcont.css("height","100%"),("center"===this.fillMode||"stretch"===this.fillMode)&&(this.fillMode="fill")),this.slider.options.autoHeight&&this.$element.addClass("ms-slide-auto-height"),this.sleep(!0)},p.destroy=function(){this.hasLayers&&(this.layerController.destroy(),this.layerController=null),this.$element.remove(),this.$element=null},p.prepareToSelect=function(){this.pselected||this.selected||(this.pselected=!0,(this.link||this.video)&&(this.view.addEventListener(MSViewEvents.SWIPE_START,this.onSwipeStart,this),this.view.addEventListener(MSViewEvents.SWIPE_MOVE,this.onSwipeMove,this),this.view.addEventListener(MSViewEvents.SWIPE_CANCEL,this.onSwipeCancel,this),this.linkdis=!1,this.swipeMoved=!1),this.loadImages(),this.hasLayers&&this.layerController.prepareToShow(),this.ready&&(this.bgvideo&&this.bgvideo.play(),this.hasLayers&&this.slider.options.instantStartLayers&&this.layerController.showLayers()),this.moz&&this.$element.css("margin-top",""))},p.select=function(){this.selected||(this.selected=!0,this.pselected=!1,this.$element.addClass("ms-sl-selected"),this.hasLayers&&(this.slider.options.autoHeight&&this.layerController.updateHeight(),this.slider.options.instantStartLayers||this.layerController.showLayers()),this.ready&&this.bgvideo&&this.bgvideo.play(),this.videoAutoPlay&&(this.videodis=!1,this.vpbtn.trigger("click")))},p.unselect=function(){this.pselected=!1,this.moz&&this.$element.css("margin-top","0.1px"),(this.link||this.video)&&(this.view.removeEventListener(MSViewEvents.SWIPE_START,this.onSwipeStart,this),this.view.removeEventListener(MSViewEvents.SWIPE_MOVE,this.onSwipeMove,this),this.view.removeEventListener(MSViewEvents.SWIPE_CANCEL,this.onSwipeCancel,this)),this.bgvideo&&(this.bgvideo.pause(),!this.autoPauseBgVid&&this.vinit&&(this.bgvideo.currentTime=0)),this.hasLayers&&this.layerController.hideLayers(),this.selected&&(this.selected=!1,this.$element.removeClass("ms-sl-selected"),this.video&&this.vplayed&&(this.__closeVideo(),this.roc=!1))},p.sleep=function(force){(!this.isSleeping||force)&&(this.isSleeping=!0,this.autoAppend&&this.$element.detach(),this.hasLayers&&this.layerController.onSlideSleep())},p.wakeup=function(){this.isSleeping&&(this.isSleeping=!1,this.autoAppend&&this.view.$slideCont.append(this.$element),this.moz&&this.$element.css("margin-top","0.1px"),this.setupBG(),this.hasBG&&this.bgAligner.align(),this.hasLayers&&this.layerController.onSlideWakeup())}}(window,document,jQuery),function($){"use strict";var SliderViewList={};window.MSSlideController=function(slider){this._delayProgress=0,this._timer=new averta.Timer(100),this._timer.onTimer=this.onTimer,this._timer.refrence=this,this.currentSlide=null,this.slider=slider,this.so=slider.options,averta.EventDispatcher.call(this)},MSSlideController.registerView=function(name,_class){if(name in SliderViewList)throw new Error(name+", is already registered.");SliderViewList[name]=_class},MSSlideController.SliderControlList={},MSSlideController.registerControl=function(name,_class){if(name in MSSlideController.SliderControlList)throw new Error(name+", is already registered.");MSSlideController.SliderControlList[name]=_class};var p=MSSlideController.prototype;p.setupView=function(){var that=this;this.resize_listener=function(){that.__resize()};var viewOptions={spacing:this.so.space,mouseSwipe:this.so.mouse,loop:this.so.loop,autoHeight:this.so.autoHeight,swipe:this.so.swipe,speed:this.so.speed,dir:this.so.dir,viewNum:this.so.inView,critMargin:this.so.critMargin};this.so.viewOptions&&$.extend(viewOptions,this.so.viewOptions),this.so.autoHeight&&(this.so.heightLimit=!1);var viewClass=SliderViewList[this.slider.options.view]||MSBasicView;if(!viewClass._3dreq||window._css3d&&!$.browser.msie||(viewClass=viewClass._fallback||MSBasicView),this.view=new viewClass(viewOptions),this.so.overPause){var that=this;this.slider.$element.mouseenter(function(){that.is_over=!0,that._stopTimer()}).mouseleave(function(){that.is_over=!1,that._startTimer()})}},p.onChangeStart=function(){this.change_started=!0,this.currentSlide&&this.currentSlide.unselect(),this.currentSlide=this.view.currentSlide,this.currentSlide.prepareToSelect(),this.so.endPause&&this.currentSlide.index===this.slider.slides.length-1&&(this.pause(),this.skipTimer()),this.so.autoHeight&&this.slider.setHeight(this.currentSlide.getHeight()),this.so.deepLink&&this.__updateWindowHash(),this.dispatchEvent(new MSSliderEvent(MSSliderEvent.CHANGE_START))},p.onChangeEnd=function(){if(this.change_started=!1,this._startTimer(),this.currentSlide.select(),this.so.preload>1){var loc,i,slide,l=this.so.preload-1;for(i=1;l>=i;++i){if(loc=this.view.index+i,loc>=this.view.slideList.length){if(!this.so.loop){i=l;continue}loc-=this.view.slideList.length}slide=this.view.slideList[loc],slide&&slide.loadImages()}for(l>this.view.slideList.length/2&&(l=Math.floor(this.view.slideList.length/2)),i=1;l>=i;++i){if(loc=this.view.index-i,0>loc){if(!this.so.loop){i=l;continue}loc=this.view.slideList.length+loc}slide=this.view.slideList[loc],slide&&slide.loadImages()}}this.dispatchEvent(new MSSliderEvent(MSSliderEvent.CHANGE_END))},p.onSwipeStart=function(){this.skipTimer()},p.skipTimer=function(){this._timer.reset(),this._delayProgress=0,this.dispatchEvent(new MSSliderEvent(MSSliderEvent.WAITING))},p.onTimer=function(){if(this._timer.getTime()>=1e3*this.view.currentSlide.delay&&(this.skipTimer(),this.view.next(),this.hideCalled=!1),this._delayProgress=this._timer.getTime()/(10*this.view.currentSlide.delay),this.so.hideLayers&&!this.hideCalled&&1e3*this.view.currentSlide.delay-this._timer.getTime()<=300){var currentSlide=this.view.currentSlide;currentSlide.hasLayers&&currentSlide.layerController.animHideLayers(),this.hideCalled=!0}this.dispatchEvent(new MSSliderEvent(MSSliderEvent.WAITING))},p._stopTimer=function(){this._timer&&this._timer.stop()},p._startTimer=function(){this.paused||this.is_over||!this.currentSlide||!this.currentSlide.ready||this.change_started||this._timer.start()},p.__appendSlides=function(){var slide,loc,i=0,l=this.view.slideList.length-1;for(i;l>i;++i)slide=this.view.slideList[i],slide.detached||(slide.$element.detach(),slide.detached=!0);for(this.view.appendSlide(this.view.slideList[this.view.index]),l=3,i=1;l>=i;++i){if(loc=this.view.index+i,loc>=this.view.slideList.length){if(!this.so.loop){i=l;continue}loc-=this.view.slideList.length}slide=this.view.slideList[loc],slide.detached=!1,this.view.appendSlide(slide)}for(l>this.view.slideList.length/2&&(l=Math.floor(this.view.slideList.length/2)),i=1;l>=i;++i){if(loc=this.view.index-i,0>loc){if(!this.so.loop){i=l;continue}loc=this.view.slideList.length+loc}slide=this.view.slideList[loc],slide.detached=!1,this.view.appendSlide(slide)}},p.__resize=function(hard){this.created&&(this.width=this.slider.$element[0].clientWidth||this.so.width,this.so.fullwidth||(this.width=Math.min(this.width,this.so.width)),this.so.fullheight?(this.so.heightLimit=!1,this.so.autoHeight=!1,this.height=this.slider.$element[0].clientHeight):this.height=this.width/this.slider.aspect,this.so.autoHeight?(this.currentSlide.setSize(this.width,null,hard),this.view.setSize(this.width,this.currentSlide.getHeight(),hard)):this.view.setSize(this.width,Math.max(this.so.minHeight,this.so.heightLimit?Math.min(this.height,this.so.height):this.height),hard),this.slider.$controlsCont&&this.so.centerControls&&this.so.fullwidth&&this.view.$element.css("left",Math.min(0,-(this.slider.$element[0].clientWidth-this.so.width)/2)+"px"),this.dispatchEvent(new MSSliderEvent(MSSliderEvent.RESIZE)))},p.__dispatchInit=function(){this.dispatchEvent(new MSSliderEvent(MSSliderEvent.INIT))},p.__updateWindowHash=function(){var hash=window.location.hash,dl=this.so.deepLink,dlt=this.so.deepLinkType,eq="path"===dlt?"/":"=",sep="path"===dlt?"/":"&",sliderHash=dl+eq+(this.view.index+1),regTest=new RegExp(dl+eq+"[0-9]+","g");window.location.hash=""===hash?sep+sliderHash:regTest.test(hash)?hash.replace(regTest,sliderHash):hash+sep+sliderHash},p.__curentSlideInHash=function(){var hash=window.location.hash,dl=this.so.deepLink,dlt=this.so.deepLinkType,eq="path"===dlt?"/":"=",regTest=new RegExp(dl+eq+"[0-9]+","g");if(regTest.test(hash)){var index=Number(hash.match(regTest)[0].match(/[0-9]+/g).pop());if(!isNaN(index))return index-1}return-1},p.__onHashChanged=function(){var index=this.__curentSlideInHash();-1!==index&&this.gotoSlide(index)},p.setup=function(){this.created=!0,this.paused=!this.so.autoplay,this.view.addEventListener(MSViewEvents.CHANGE_START,this.onChangeStart,this),this.view.addEventListener(MSViewEvents.CHANGE_END,this.onChangeEnd,this),this.view.addEventListener(MSViewEvents.SWIPE_START,this.onSwipeStart,this),this.currentSlide=this.view.slideList[this.so.start-1],this.__resize();var slideInHash=this.__curentSlideInHash(),startSlide=-1!==slideInHash?slideInHash:this.so.start-1;if(this.view.create(startSlide),0===this.so.preload&&this.view.slideList[0].loadImages(),this.scroller=this.view.controller,this.so.wheel){var that=this,last_time=(new Date).getTime();this.wheellistener=function(event){var e=window.event||event.orginalEvent||event;e.preventDefault();var current_time=(new Date).getTime();if(!(400>current_time-last_time)){last_time=current_time;var delta=Math.abs(e.detail||e.wheelDelta);$.browser.mozilla&&(delta*=100);var scrollThreshold=15;return e.detail<0||e.wheelDelta>0?delta>=scrollThreshold&&that.previous(!0):delta>=scrollThreshold&&that.next(!0),!1}},$.browser.mozilla?this.slider.$element[0].addEventListener("DOMMouseScroll",this.wheellistener):this.slider.$element.bind("mousewheel",this.wheellistener)}0===this.slider.$element[0].clientWidth&&(this.slider.init_safemode=!0),this.__resize();var that=this;this.so.deepLink&&$(window).on("hashchange",function(){that.__onHashChanged()})},p.index=function(){return this.view.index},p.count=function(){return this.view.slidesCount},p.next=function(checkLoop){this.skipTimer(),this.view.next(checkLoop)},p.previous=function(checkLoop){this.skipTimer(),this.view.previous(checkLoop)},p.gotoSlide=function(index){index=Math.min(index,this.count()-1),this.skipTimer(),this.view.gotoSlide(index)},p.destroy=function(reset){this.dispatchEvent(new MSSliderEvent(MSSliderEvent.DESTROY)),this.slider.destroy(reset)},p._destroy=function(){this._timer.reset(),this._timer=null,$(window).unbind("resize",this.resize_listener),this.view.destroy(),this.view=null,this.so.wheel&&($.browser.mozilla?this.slider.$element[0].removeEventListener("DOMMouseScroll",this.wheellistener):this.slider.$element.unbind("mousewheel",this.wheellistener),this.wheellistener=null),this.so=null},p.runAction=function(action){var actionParams=[];if(-1!==action.indexOf("(")){var temp=action.slice(0,action.indexOf("("));actionParams=action.slice(action.indexOf("(")+1,-1).replace(/\"|\'|\s/g,"").split(","),action=temp}action in this?this[action].apply(this,actionParams):console},p.update=function(hard){this.slider.init_safemode&&hard&&(this.slider.init_safemode=!1),this.__resize(hard),hard&&this.dispatchEvent(new MSSliderEvent(MSSliderEvent.HARD_UPDATE))},p.locate=function(){this.__resize()},p.resume=function(){this.paused&&(this.paused=!1,this._startTimer())},p.pause=function(){this.paused||(this.paused=!0,this._stopTimer())},p.currentTime=function(){return this._delayProgress},averta.EventDispatcher.extend(p)}(jQuery),function($){"use strict";var LayerTypes={image:MSImageLayerElement,text:MSLayerElement,video:MSVideoLayerElement,hotspot:MSHotspotLayer,button:MSButtonLayer};window.MasterSlider=function(){this.options={autoplay:!1,loop:!1,mouse:!0,swipe:!0,grabCursor:!0,space:0,fillMode:"fill",start:1,view:"basic",width:300,height:150,inView:15,critMargin:1,heightLimit:!0,smoothHeight:!0,autoHeight:!1,minHeight:-1,fullwidth:!1,fullheight:!1,autofill:!1,layersMode:"center",hideLayers:!1,endPause:!1,centerControls:!0,overPause:!0,shuffle:!1,speed:17,dir:"h",preload:0,wheel:!1,layout:"boxed",autofillTarget:null,fullscreenMargin:0,instantStartLayers:!1,parallaxMode:"mouse",rtl:!1,deepLink:null,deepLinkType:"path",disablePlugins:[]},this.slides=[],this.activePlugins=[],this.$element=null,this.lastMargin=0,this.leftSpace=0,this.topSpace=0,this.rightSpace=0,this.bottomSpace=0,this._holdOn=0;var that=this;this.resize_listener=function(){that._resize()},$(window).bind("resize",this.resize_listener)},MasterSlider.author="Averta Ltd. (www.averta.net)",MasterSlider.version="2.14.6",MasterSlider.releaseDate="May 2015",MasterSlider._plugins=[];var MS=MasterSlider;MS.registerPlugin=function(plugin){-1===MS._plugins.indexOf(plugin)&&MS._plugins.push(plugin)};var p=MasterSlider.prototype;p.__setupSlides=function(){var new_slide,that=this,ind=0;this.$element.children(".ms-slide").each(function(){var $slide_ele=$(this);new_slide=new MSSlide,new_slide.$element=$slide_ele,new_slide.slider=that,new_slide.delay=void 0!==$slide_ele.data("delay")?$slide_ele.data("delay"):3,new_slide.fillMode=void 0!==$slide_ele.data("fill-mode")?$slide_ele.data("fill-mode"):that.options.fillMode,new_slide.index=ind++;var slide_img=$slide_ele.children("img:not(.ms-layer)");slide_img.length>0&&new_slide.setBG(slide_img[0]);var slide_video=$slide_ele.children("video");if(slide_video.length>0&&new_slide.setBGVideo(slide_video),that.controls)for(var i=0,l=that.controls.length;l>i;++i)that.controls[i].slideAction(new_slide);$slide_ele.children("a").each(function(){var $this=$(this);"video"===this.getAttribute("data-type")?(new_slide.video=this.getAttribute("href"),new_slide.videoAutoPlay=$this.data("autoplay"),$this.remove()):$this.hasClass("ms-layer")||(new_slide.link=$(this))});that.__createSlideLayers(new_slide,$slide_ele.find(".ms-layer")),that.slides.push(new_slide),that.slideController.view.addSlide(new_slide)})},p.__createSlideLayers=function(slide,layers){0!=layers.length&&(slide.setupLayerController(),layers.each(function(index,domEle){var $parent_ele,$layer_element=$(this);"A"===domEle.nodeName&&"image"===$layer_element.find(">img").data("type")&&($parent_ele=$(this),$layer_element=$parent_ele.find("img"));var layer=new(LayerTypes[$layer_element.data("type")||"text"]);layer.$element=$layer_element,layer.link=$parent_ele;var eff_parameters={},end_eff_parameters={};void 0!==$layer_element.data("effect")&&(eff_parameters.name=$layer_element.data("effect")),void 0!==$layer_element.data("ease")&&(eff_parameters.ease=$layer_element.data("ease")),void 0!==$layer_element.data("duration")&&(eff_parameters.duration=$layer_element.data("duration")),void 0!==$layer_element.data("delay")&&(eff_parameters.delay=$layer_element.data("delay")),$layer_element.data("hide-effect")&&(end_eff_parameters.name=$layer_element.data("hide-effect")),$layer_element.data("hide-ease")&&(end_eff_parameters.ease=$layer_element.data("hide-ease")),void 0!==$layer_element.data("hide-duration")&&(end_eff_parameters.duration=$layer_element.data("hide-duration")),void 0!==$layer_element.data("hide-time")&&(end_eff_parameters.time=$layer_element.data("hide-time")),layer.setStartAnim(eff_parameters),layer.setEndAnim(end_eff_parameters),slide.layerController.addLayer(layer)}))},p._removeLoading=function(){$(window).unbind("resize",this.resize_listener),this.$element.removeClass("before-init").css("visibility","visible").css("height","").css("opacity",0),CTween.fadeIn(this.$element),this.$loading.remove(),this.slideController&&this.slideController.__resize()},p._resize=function(){if(this.$loading){var h=this.$loading[0].clientWidth/this.aspect;h=this.options.heightLimit?Math.min(h,this.options.height):h,this.$loading.height(h),this.$element.height(h)}},p._shuffleSlides=function(){for(var r,slides=this.$element.children(".ms-slide"),i=0,l=slides.length;l>i;++i)r=Math.floor(Math.random()*(l-1)),i!=r&&(this.$element[0].insertBefore(slides[i],slides[r]),slides=this.$element.children(".ms-slide"))},p._setupSliderLayout=function(){this._updateSideMargins(),this.lastMargin=this.leftSpace;var lo=this.options.layout;"boxed"!==lo&&"partialview"!==lo&&(this.options.fullwidth=!0),("fullscreen"===lo||"autofill"===lo)&&(this.options.fullheight=!0,"autofill"===lo&&(this.$autofillTarget=$(this.options.autofillTarget),0===this.$autofillTarget.length&&(this.$autofillTarget=this.$element.parent()))),"partialview"===lo&&this.$element.addClass("ms-layout-partialview"),("fullscreen"===lo||"fullwidth"===lo||"autofill"===lo)&&($(window).bind("resize",{that:this},this._updateLayout),this._updateLayout()),$(window).bind("resize",this.slideController.resize_listener)},p._updateLayout=function(event){var that=event?event.data.that:this,lo=that.options.layout,$element=that.$element,$win=$(window);if("fullscreen"===lo)document.body.style.overflow="hidden",$element.height($win.height()-that.options.fullscreenMargin-that.topSpace-that.bottomSpace),document.body.style.overflow="";else if("autofill"===lo)return void $element.height(that.$autofillTarget.height()-that.options.fullscreenMargin-that.topSpace-that.bottomSpace).width(that.$autofillTarget.width()-that.leftSpace-that.rightSpace);$element.width($win.width()-that.leftSpace-that.rightSpace);var margin=-$element.offset().left+that.leftSpace+that.lastMargin;$element.css("margin-left",margin),that.lastMargin=margin},p._init=function(){if(!(this._holdOn>0)&&this._docReady){if(this.initialized=!0,"all"!==this.options.preload&&this._removeLoading(),this.options.shuffle&&this._shuffleSlides(),MSLayerEffects.setup(),this.slideController.setupView(),this.view=this.slideController.view,this.$controlsCont=$("<div></div>").addClass("ms-inner-controls-cont"),this.options.centerControls&&this.$controlsCont.css("max-width",this.options.width+"px"),this.$controlsCont.prepend(this.view.$element),this.$msContainer=$("<div></div>").addClass("ms-container").prependTo(this.$element).append(this.$controlsCont),this.controls)for(var i=0,l=this.controls.length;l>i;++i)this.controls[i].setup();if(this._setupSliderLayout(),this.__setupSlides(),this.slideController.setup(),this.controls)for(i=0,l=this.controls.length;l>i;++i)this.controls[i].create();if(this.options.autoHeight&&this.slideController.view.$element.height(this.slideController.currentSlide.getHeight()),this.options.swipe&&!window._touch&&this.options.grabCursor&&this.options.mouse){var $view=this.view.$element;$view.mousedown(function(){$view.removeClass("ms-grab-cursor"),$view.addClass("ms-grabbing-cursor"),$.browser.msie&&window.ms_grabbing_curosr&&($view[0].style.cursor="url("+window.ms_grabbing_curosr+"), move")}).addClass("ms-grab-cursor"),$(document).mouseup(function(){$view.removeClass("ms-grabbing-cursor"),$view.addClass("ms-grab-cursor"),$.browser.msie&&window.ms_grab_curosr&&($view[0].style.cursor="url("+window.ms_grab_curosr+"), move")})}this.slideController.__dispatchInit()}},p.setHeight=function(value){this.options.smoothHeight?(this.htween&&(this.htween.reset?this.htween.reset():this.htween.stop(!0)),this.htween=CTween.animate(this.slideController.view.$element,500,{height:value},{ease:"easeOutQuart"})):this.slideController.view.$element.height(value)},p.reserveSpace=function(side,space){var sideSpace=side+"Space",pos=this[sideSpace];return this[sideSpace]+=space,this._updateSideMargins(),pos},p._updateSideMargins=function(){this.$element.css("margin",this.topSpace+"px "+this.rightSpace+"px "+this.bottomSpace+"px "+this.leftSpace+"px")},p._realignControls=function(){this.rightSpace=this.leftSpace=this.topSpace=this.bottomSpace=0,this._updateSideMargins(),this.api.dispatchEvent(new MSSliderEvent(MSSliderEvent.RESERVED_SPACE_CHANGE))},p.control=function(control,options){if(control in MSSlideController.SliderControlList){this.controls||(this.controls=[]);var ins=new MSSlideController.SliderControlList[control](options);return ins.slider=this,this.controls.push(ins),this}},p.holdOn=function(){this._holdOn++},p.release=function(){this._holdOn--,this._init()},p.setup=function(target,options){if(this.$element="string"==typeof target?$("#"+target):target.eq(0),this.setupMarkup=this.$element.html(),0!==this.$element.length){this.$element.addClass("master-slider").addClass("before-init"),$.browser.msie?this.$element.addClass("ms-ie").addClass("ms-ie"+$.browser.version.slice(0,$.browser.version.indexOf("."))):$.browser.webkit?this.$element.addClass("ms-wk"):$.browser.mozilla&&this.$element.addClass("ms-moz");var ua=navigator.userAgent.toLowerCase(),isAndroid=ua.indexOf("android")>-1;isAndroid&&this.$element.addClass("ms-android");var that=this;$.extend(this.options,options),this.aspect=this.options.width/this.options.height,this.$loading=$("<div></div>").addClass("ms-loading-container").insertBefore(this.$element).append($("<div></div>").addClass("ms-loading")),this.$loading.parent().css("position","relative"),this.options.autofill&&(this.options.fullwidth=!0,this.options.fullheight=!0),this.options.fullheight&&this.$element.addClass("ms-fullheight"),this._resize(),this.slideController=new MSSlideController(this),this.api=this.slideController;for(var i=0,l=MS._plugins.length;i!==l;i++){var plugin=MS._plugins[i];-1===this.options.disablePlugins.indexOf(plugin.name)&&this.activePlugins.push(new plugin(this))}return $(document).ready(function(){that._docReady=!0,that._init()}),this}},p.destroy=function(insertMarkup){for(var i=0,l=this.activePlugins.length;i!==l;i++)this.activePlugins[i].destroy();if(this.controls)for(i=0,l=this.controls.length;i!==l;i++)this.controls[i].destroy();this.slideController&&this.slideController._destroy(),this.$loading&&this.$loading.remove(),insertMarkup?this.$element.html(this.setupMarkup).css("visibility","hidden"):this.$element.remove();var lo=this.options.layout;("fullscreen"===lo||"fullwidth"===lo)&&$(window).unbind("resize",this._updateLayout),this.view=null,this.slides=null,this.options=null,this.slideController=null,this.api=null,this.resize_listener=null,this.activePlugins=null}}(jQuery),function($,window,document,undefined){function MasterSliderPlugin(element,options){this.element=element,this.$element=$(element),this.settings=$.extend({},defaults,options),this._defaults=defaults,this._name=pluginName,this.init()}var pluginName="masterslider",defaults={controls:{}};$.extend(MasterSliderPlugin.prototype,{init:function(){var self=this;this._slider=new MasterSlider;for(var control in this.settings.controls)this._slider.control(control,this.settings.controls[control]);this._slider.setup(this.$element,this.settings);var _superDispatch=this._slider.api.dispatchEvent;this._slider.api.dispatchEvent=function(event){self.$element.trigger(event.type),_superDispatch.call(this,event)}},api:function(){return this._slider.api},slider:function(){return this._slider}}),$.fn[pluginName]=function(options){var args=arguments,plugin="plugin_"+pluginName;if(options===undefined||"object"==typeof options)return this.each(function(){$.data(this,plugin)||$.data(this,plugin,new MasterSliderPlugin(this,options))});if("string"==typeof options&&"_"!==options[0]&&"init"!==options){var returns;return this.each(function(){var instance=$.data(this,plugin);instance instanceof MasterSliderPlugin&&"function"==typeof instance[options]&&(returns=instance[options].apply(instance,Array.prototype.slice.call(args,1))),instance instanceof MasterSliderPlugin&&"function"==typeof instance._slider.api[options]&&(returns=instance._slider.api[options].apply(instance._slider.api,Array.prototype.slice.call(args,1))),"destroy"===options&&$.data(this,plugin,null)}),returns!==undefined?returns:this}}}(jQuery,window,document),window.MSViewEvents=function(type,data){this.type=type,this.data=data},MSViewEvents.SWIPE_START="swipeStart",MSViewEvents.SWIPE_END="swipeEnd",MSViewEvents.SWIPE_MOVE="swipeMove",MSViewEvents.SWIPE_CANCEL="swipeCancel",MSViewEvents.SCROLL="scroll",MSViewEvents.CHANGE_START="slideChangeStart",MSViewEvents.CHANGE_END="slideChangeEnd",function($){"use strict";window.MSBasicView=function(options){this.options={loop:!1,dir:"h",autoHeight:!1,spacing:5,mouseSwipe:!0,swipe:!0,speed:17,minSlideSpeed:2,viewNum:20,critMargin:1},$.extend(this.options,options),this.dir=this.options.dir,this.loop=this.options.loop,this.spacing=this.options.spacing,this.__width=0,this.__height=0,this.__cssProb="h"===this.dir?"left":"top",this.__offset="h"===this.dir?"offsetLeft":"offsetTop",this.__dimension="h"===this.dir?"__width":"__height",this.__translate_end=window._css3d?" translateZ(0px)":"",this.$slideCont=$("<div></div>").addClass("ms-slide-container"),this.$element=$("<div></div>").addClass("ms-view").addClass("ms-basic-view").append(this.$slideCont),this.currentSlide=null,this.index=-1,this.slidesCount=0,this.slides=[],this.slideList=[],this.viewSlidesList=[],this.css3=window._cssanim,this.start_buffer=0,this.firstslide_snap=0,this.slideChanged=!1,this.controller=new Controller(0,0,{snapping:!0,snapsize:100,paging:!0,snappingMinSpeed:this.options.minSlideSpeed,friction:(100-.5*this.options.speed)/100,endless:this.loop}),this.controller.renderCallback("h"===this.dir?this._horizUpdate:this._vertiUpdate,this),this.controller.snappingCallback(this.__snapUpdate,this),this.controller.snapCompleteCallback(this.__snapCompelet,this),averta.EventDispatcher.call(this)};var p=MSBasicView.prototype;p.__snapCompelet=function(){this.slideChanged&&(this.slideChanged=!1,this.__locateSlides(),this.start_buffer=0,this.dispatchEvent(new MSViewEvents(MSViewEvents.CHANGE_END)))},p.__snapUpdate=function(controller,snap,change){if(this.loop){var target_index=this.index+change;this.updateLoop(target_index),target_index>=this.slidesCount&&(target_index-=this.slidesCount),0>target_index&&(target_index=this.slidesCount+target_index),this.index=target_index}else{if(0>snap||snap>=this.slidesCount)return;this.index=snap}this._checkCritMargins(),$.browser.mozilla&&(this.slideList[this.index].$element[0].style.marginTop="0.1px",this.currentSlide&&(this.currentSlide.$element[0].style.marginTop=""));var new_slide=this.slideList[this.index];new_slide!==this.currentSlide&&(this.currentSlide=new_slide,this.autoUpdateZIndex&&this.__updateSlidesZindex(),this.slideChanged=!0,this.dispatchEvent(new MSViewEvents(MSViewEvents.CHANGE_START)))},p._checkCritMargins=function(){if(!this.normalMode){var hlf=Math.floor(this.options.viewNum/2),inView=this.viewSlidesList.indexOf(this.slideList[this.index]),size=this[this.__dimension]+this.spacing,cm=this.options.critMargin;return this.loop?void((cm>=inView||inView>=this.viewSlidesList.length-cm)&&(size*=inView-hlf,this.__locateSlides(!1,size+this.start_buffer),this.start_buffer+=size)):void((cm>inView&&this.index>=cm||inView>=this.viewSlidesList.length-cm&&this.index<this.slidesCount-cm)&&this.__locateSlides(!1))}},p._vertiUpdate=function(controller,value){return this.__contPos=value,this.dispatchEvent(new MSViewEvents(MSViewEvents.SCROLL)),this.css3?void(this.$slideCont[0].style[window._jcsspfx+"Transform"]="translateY("+-value+"px)"+this.__translate_end):void(this.$slideCont[0].style.top=-value+"px")},p._horizUpdate=function(controller,value){return this.__contPos=value,this.dispatchEvent(new MSViewEvents(MSViewEvents.SCROLL)),this.css3?void(this.$slideCont[0].style[window._jcsspfx+"Transform"]="translateX("+-value+"px)"+this.__translate_end):void(this.$slideCont[0].style.left=-value+"px")},p.__updateViewList=function(){if(this.normalMode)return void(this.viewSlidesList=this.slides);var temp=this.viewSlidesList.slice();this.viewSlidesList=[];var l,i=0,hlf=Math.floor(this.options.viewNum/2);if(this.loop)for(;i!==this.options.viewNum;i++)this.viewSlidesList.push(this.slides[this.currentSlideLoc-hlf+i]);else{for(i=0;i!==hlf&&this.index-i!==-1;i++)this.viewSlidesList.unshift(this.slideList[this.index-i]);for(i=1;i!==hlf&&this.index+i!==this.slidesCount;i++)this.viewSlidesList.push(this.slideList[this.index+i])}for(i=0,l=temp.length;i!==l;i++)-1===this.viewSlidesList.indexOf(temp[i])&&temp[i].sleep();temp=null,this.currentSlide&&this.__updateSlidesZindex()},p.__locateSlides=function(move,start){this.__updateViewList(),start=this.loop?start||0:this.slides.indexOf(this.viewSlidesList[0])*(this[this.__dimension]+this.spacing);for(var slide,l=this.viewSlidesList.length,i=0;i!==l;i++){var pos=start+i*(this[this.__dimension]+this.spacing);slide=this.viewSlidesList[i],slide.wakeup(),slide.position=pos,slide.$element[0].style[this.__cssProb]=pos+"px"}move!==!1&&this.controller.changeTo(this.slideList[this.index].position,!1,null,null,!1)},p.__createLoopList=function(){var return_arr=[],i=0,count=this.slidesCount/2,before_count=this.slidesCount%2===0?count-1:Math.floor(count),after_count=this.slidesCount%2===0?count:Math.floor(count);for(this.currentSlideLoc=before_count,i=1;before_count>=i;++i)return_arr.unshift(this.slideList[this.index-i<0?this.slidesCount-i+this.index:this.index-i]);for(return_arr.push(this.slideList[this.index]),i=1;after_count>=i;++i)return_arr.push(this.slideList[this.index+i>=this.slidesCount?this.index+i-this.slidesCount:this.index+i]);return return_arr},p.__getSteps=function(index,target){var right=index>target?this.slidesCount-index+target:target-index,left=Math.abs(this.slidesCount-right);return left>right?right:-left},p.__pushEnd=function(){var first_slide=this.slides.shift(),last_slide=this.slides[this.slidesCount-2];if(this.slides.push(first_slide),this.normalMode){var pos=last_slide.$element[0][this.__offset]+this.spacing+this[this.__dimension];first_slide.$element[0].style[this.__cssProb]=pos+"px",first_slide.position=pos}},p.__pushStart=function(){var last_slide=this.slides.pop(),first_slide=this.slides[0];if(this.slides.unshift(last_slide),this.normalMode){var pos=first_slide.$element[0][this.__offset]-this.spacing-this[this.__dimension];last_slide.$element[0].style[this.__cssProb]=pos+"px",last_slide.position=pos}},p.__updateSlidesZindex=function(){{var slide,l=this.viewSlidesList.length;Math.floor(l/2)}if(this.loop)for(var loc=this.viewSlidesList.indexOf(this.currentSlide),i=0;i!==l;i++)slide=this.viewSlidesList[i],this.viewSlidesList[i].$element.css("z-index",loc>=i?i+1:l-i);
else{for(var beforeNum=this.currentSlide.index-this.viewSlidesList[0].index,i=0;i!==l;i++)this.viewSlidesList[i].$element.css("z-index",beforeNum>=i?i+1:l-i);this.currentSlide.$element.css("z-index",l)}},p.addSlide=function(slide){slide.view=this,this.slides.push(slide),this.slideList.push(slide),this.slidesCount++},p.appendSlide=function(slide){this.$slideCont.append(slide.$element)},p.updateLoop=function(index){if(this.loop)for(var steps=this.__getSteps(this.index,index),i=0,l=Math.abs(steps);l>i;++i)0>steps?this.__pushStart():this.__pushEnd()},p.gotoSlide=function(index,fast){this.updateLoop(index),this.index=index;var target_slide=this.slideList[index];this._checkCritMargins(),this.controller.changeTo(target_slide.position,!fast,null,null,!1),target_slide!==this.currentSlide&&(this.slideChanged=!0,this.currentSlide=target_slide,this.autoUpdateZIndex&&this.__updateSlidesZindex(),this.dispatchEvent(new MSViewEvents(MSViewEvents.CHANGE_START)),fast&&this.dispatchEvent(new MSViewEvents(MSViewEvents.CHANGE_END)))},p.next=function(checkLoop){return checkLoop&&!this.loop&&this.index+1>=this.slidesCount?void this.controller.bounce(10):void this.gotoSlide(this.index+1>=this.slidesCount?0:this.index+1)},p.previous=function(checkLoop){return checkLoop&&!this.loop&&this.index-1<0?void this.controller.bounce(-10):void this.gotoSlide(this.index-1<0?this.slidesCount-1:this.index-1)},p.setupSwipe=function(){this.swipeControl=new averta.TouchSwipe(this.$element),this.swipeControl.swipeType="h"===this.dir?"horizontal":"vertical";var that=this;this.swipeControl.onSwipe="h"===this.dir?function(status){that.horizSwipeMove(status)}:function(status){that.vertSwipeMove(status)}},p.vertSwipeMove=function(status){var phase=status.phase;if("start"===phase)this.controller.stop(),this.dispatchEvent(new MSViewEvents(MSViewEvents.SWIPE_START,status));else if("move"===phase&&(!this.loop||Math.abs(this.currentSlide.position-this.controller.value+status.moveY)<this.cont_size/2))this.controller.drag(status.moveY),this.dispatchEvent(new MSViewEvents(MSViewEvents.SWIPE_MOVE,status));else if("end"===phase||"cancel"===phase){var speed=status.distanceY/status.duration*50/3;Math.abs(speed)>.1?(this.controller.push(-speed),speed>this.controller.options.snappingMinSpeed&&this.dispatchEvent(new MSViewEvents(MSViewEvents.SWIPE_END,status))):(this.controller.cancel(),this.dispatchEvent(new MSViewEvents(MSViewEvents.SWIPE_CANCEL,status)))}},p.horizSwipeMove=function(status){var phase=status.phase;if("start"===phase)this.controller.stop(),this.dispatchEvent(new MSViewEvents(MSViewEvents.SWIPE_START,status));else if("move"===phase&&(!this.loop||Math.abs(this.currentSlide.position-this.controller.value+status.moveX)<this.cont_size/2))this.controller.drag(status.moveX),this.dispatchEvent(new MSViewEvents(MSViewEvents.SWIPE_MOVE,status));else if("end"===phase||"cancel"===phase){var speed=status.distanceX/status.duration*50/3;Math.abs(speed)>.1?(this.controller.push(-speed),speed>this.controller.options.snappingMinSpeed&&this.dispatchEvent(new MSViewEvents(MSViewEvents.SWIPE_END,status))):(this.controller.cancel(),this.dispatchEvent(new MSViewEvents(MSViewEvents.SWIPE_CANCEL,status)))}},p.setSize=function(width,height,hard){if(this.lastWidth!==width||height!==this.lastHeight||hard){this.$element.width(width).height(height);for(var i=0;i<this.slidesCount;++i)this.slides[i].setSize(width,height,hard);this.__width=width,this.__height=height,this.__created&&(this.__locateSlides(),this.cont_size=(this.slidesCount-1)*(this[this.__dimension]+this.spacing),this.loop||(this.controller._max_value=this.cont_size),this.controller.options.snapsize=this[this.__dimension]+this.spacing,this.controller.changeTo(this.currentSlide.position,!1,null,null,!1),this.controller.cancel(),this.lastWidth=width,this.lastHeight=height)}},p.create=function(index){this.__created=!0,this.index=Math.min(index||0,this.slidesCount-1),this.lastSnap=this.index,this.loop&&(this.slides=this.__createLoopList()),this.normalMode=this.slidesCount<=this.options.viewNum;for(var i=0;i<this.slidesCount;++i)this.slides[i].create();this.__locateSlides(),this.controller.options.snapsize=this[this.__dimension]+this.spacing,this.loop||(this.controller._max_value=(this.slidesCount-1)*(this[this.__dimension]+this.spacing)),this.gotoSlide(this.index,!0),this.options.swipe&&(window._touch||this.options.mouseSwipe)&&this.setupSwipe()},p.destroy=function(){if(this.__created){for(var i=0;i<this.slidesCount;++i)this.slides[i].destroy();this.slides=null,this.slideList=null,this.$element.remove(),this.controller.destroy(),this.controller=null}},averta.EventDispatcher.extend(p),MSSlideController.registerView("basic",MSBasicView)}(jQuery),function(){"use strict";window.MSWaveView=function(options){MSBasicView.call(this,options),this.$element.removeClass("ms-basic-view").addClass("ms-wave-view"),this.$slideCont.css(window._csspfx+"transform-style","preserve-3d"),this.autoUpdateZIndex=!0},MSWaveView.extend(MSBasicView),MSWaveView._3dreq=!0,MSWaveView._fallback=MSBasicView;var p=MSWaveView.prototype,_super=MSBasicView.prototype;p._horizUpdate=function(controller,value){_super._horizUpdate.call(this,controller,value);for(var slide,distance,cont_scroll=-value,i=0;i<this.slidesCount;++i)slide=this.slideList[i],distance=-cont_scroll-slide.position,this.__updateSlidesHoriz(slide,distance)},p._vertiUpdate=function(controller,value){_super._vertiUpdate.call(this,controller,value);for(var slide,distance,cont_scroll=-value,i=0;i<this.slidesCount;++i)slide=this.slideList[i],distance=-cont_scroll-slide.position,this.__updateSlidesVertic(slide,distance)},p.__updateSlidesHoriz=function(slide,distance){var value=Math.abs(100*distance/this.__width);slide.$element.css(window._csspfx+"transform","translateZ("+3*-value+"px) rotateY(0.01deg)")},p.__updateSlidesVertic=function(slide,distance){this.__updateSlidesHoriz(slide,distance)},MSSlideController.registerView("wave",MSWaveView)}(jQuery),function(){window.MSFadeBasicView=function(options){MSWaveView.call(this,options),this.$element.removeClass("ms-wave-view").addClass("ms-fade-basic-view")},MSFadeBasicView.extend(MSWaveView);{var p=MSFadeBasicView.prototype;MSFadeBasicView.prototype}p.__updateSlidesHoriz=function(slide,distance){var value=Math.abs(.6*distance/this.__width);value=1-Math.min(value,.6),slide.$element.css("opacity",value)},p.__updateSlidesVertic=function(slide,distance){this.__updateSlidesHoriz(slide,distance)},MSSlideController.registerView("fadeBasic",MSFadeBasicView),MSWaveView._fallback=MSFadeBasicView}(),function(){window.MSFadeWaveView=function(options){MSWaveView.call(this,options),this.$element.removeClass("ms-wave-view").addClass("ms-fade-wave-view")},MSFadeWaveView.extend(MSWaveView),MSFadeWaveView._3dreq=!0,MSFadeWaveView._fallback=MSFadeBasicView;{var p=MSFadeWaveView.prototype;MSWaveView.prototype}p.__updateSlidesHoriz=function(slide,distance){var value=Math.abs(100*distance/this.__width);value=Math.min(value,100),slide.$element.css("opacity",1-value/300),slide.$element[0].style[window._jcsspfx+"Transform"]="scale("+(1-value/800)+") rotateY(0.01deg) "},p.__updateSlidesVertic=function(slide,distance){this.__updateSlidesHoriz(slide,distance)},MSSlideController.registerView("fadeWave",MSFadeWaveView)}(),function(){"use strict";window.MSFlowView=function(options){MSWaveView.call(this,options),this.$element.removeClass("ms-wave-view").addClass("ms-flow-view")},MSFlowView.extend(MSWaveView),MSFlowView._3dreq=!0,MSFlowView._fallback=MSFadeBasicView;{var p=MSFlowView.prototype;MSWaveView.prototype}p.__updateSlidesHoriz=function(slide,distance){var value=Math.abs(100*distance/this.__width),rvalue=Math.min(.3*value,30)*(0>distance?-1:1),zvalue=1.2*value;slide.$element[0].style[window._jcsspfx+"Transform"]="translateZ("+5*-zvalue+"px) rotateY("+rvalue+"deg) "},p.__updateSlidesVertic=function(slide,distance){var value=Math.abs(100*distance/this.__width),rvalue=Math.min(.3*value,30)*(0>distance?-1:1),zvalue=1.2*value;slide.$element[0].style[window._jcsspfx+"Transform"]="translateZ("+5*-zvalue+"px) rotateX("+-rvalue+"deg) "},MSSlideController.registerView("flow",MSFlowView)}(jQuery),function(){window.MSFadeFlowView=function(options){MSWaveView.call(this,options),this.$element.removeClass("ms-wave-view").addClass("ms-fade-flow-view")},MSFadeFlowView.extend(MSWaveView),MSFadeFlowView._3dreq=!0;{var p=MSFadeFlowView.prototype;MSWaveView.prototype}p.__calculate=function(distance){var value=Math.min(Math.abs(100*distance/this.__width),100),rvalue=Math.min(.5*value,50)*(0>distance?-1:1);return{value:value,rvalue:rvalue}},p.__updateSlidesHoriz=function(slide,distance){var clc=this.__calculate(distance);slide.$element.css("opacity",1-clc.value/300),slide.$element[0].style[window._jcsspfx+"Transform"]="translateZ("+-clc.value+"px) rotateY("+clc.rvalue+"deg) "},p.__updateSlidesVertic=function(slide,distance){var clc=this.__calculate(distance);slide.$element.css("opacity",1-clc.value/300),slide.$element[0].style[window._jcsspfx+"Transform"]="translateZ("+-clc.value+"px) rotateX("+-clc.rvalue+"deg) "},MSSlideController.registerView("fadeFlow",MSFadeFlowView)}(),function($){"use strict";window.MSMaskView=function(options){MSBasicView.call(this,options),this.$element.removeClass("ms-basic-view").addClass("ms-mask-view")},MSMaskView.extend(MSBasicView);var p=MSMaskView.prototype,_super=MSBasicView.prototype;p.addSlide=function(slide){slide.view=this,slide.$frame=$("<div></div>").addClass("ms-mask-frame").append(slide.$element),slide.$element[0].style.position="relative",slide.autoAppend=!1,this.slides.push(slide),this.slideList.push(slide),this.slidesCount++},p.setSize=function(width,height){for(var slider=this.slides[0].slider,i=0;i<this.slidesCount;++i)this.slides[i].$frame[0].style.width=width+"px",slider.options.autoHeight||(this.slides[i].$frame[0].style.height=height+"px");_super.setSize.call(this,width,height)},p._horizUpdate=function(controller,value){_super._horizUpdate.call(this,controller,value);var i=0;if(this.css3)for(i=0;i<this.slidesCount;++i)this.slideList[i].$element[0].style[window._jcsspfx+"Transform"]="translateX("+(value-this.slideList[i].position)+"px)"+this.__translate_end;else for(i=0;i<this.slidesCount;++i)this.slideList[i].$element[0].style.left=value-this.slideList[i].position+"px"},p._vertiUpdate=function(controller,value){_super._vertiUpdate.call(this,controller,value);var i=0;if(this.css3)for(i=0;i<this.slidesCount;++i)this.slideList[i].$element[0].style[window._jcsspfx+"Transform"]="translateY("+(value-this.slideList[i].position)+"px)"+this.__translate_end;else for(i=0;i<this.slidesCount;++i)this.slideList[i].$element[0].style.top=value-this.slideList[i].position+"px"},p.__pushEnd=function(){var first_slide=this.slides.shift(),last_slide=this.slides[this.slidesCount-2];if(this.slides.push(first_slide),this.normalMode){var pos=last_slide.$frame[0][this.__offset]+this.spacing+this[this.__dimension];first_slide.$frame[0].style[this.__cssProb]=pos+"px",first_slide.position=pos}},p.__pushStart=function(){var last_slide=this.slides.pop(),first_slide=this.slides[0];if(this.slides.unshift(last_slide),this.normalMode){var pos=first_slide.$frame[0][this.__offset]-this.spacing-this[this.__dimension];last_slide.$frame[0].style[this.__cssProb]=pos+"px",last_slide.position=pos}},p.__updateViewList=function(){if(this.normalMode)return void(this.viewSlidesList=this.slides);var temp=this.viewSlidesList.slice();this.viewSlidesList=[];var l,i=0,hlf=Math.floor(this.options.viewNum/2);if(this.loop)for(;i!==this.options.viewNum;i++)this.viewSlidesList.push(this.slides[this.currentSlideLoc-hlf+i]);else{for(i=0;i!==hlf&&this.index-i!==-1;i++)this.viewSlidesList.unshift(this.slideList[this.index-i]);for(i=1;i!==hlf&&this.index+i!==this.slidesCount;i++)this.viewSlidesList.push(this.slideList[this.index+i])}for(i=0,l=temp.length;i!==l;i++)-1===this.viewSlidesList.indexOf(temp[i])&&(temp[i].sleep(),temp[i].$frame.detach());temp=null},p.__locateSlides=function(move,start){this.__updateViewList(),start=this.loop?start||0:this.slides.indexOf(this.viewSlidesList[0])*(this[this.__dimension]+this.spacing);for(var slide,l=this.viewSlidesList.length,i=0;i!==l;i++){var pos=start+i*(this[this.__dimension]+this.spacing);if(slide=this.viewSlidesList[i],this.$slideCont.append(slide.$frame),slide.wakeup(!1),slide.position=pos,slide.selected&&slide.bgvideo)try{slide.bgvideo.play()}catch(e){}slide.$frame[0].style[this.__cssProb]=pos+"px"}move!==!1&&this.controller.changeTo(this.slideList[this.index].position,!1,null,null,!1)},MSSlideController.registerView("mask",MSMaskView)}(jQuery),function(){"use strict";window.MSParallaxMaskView=function(options){MSMaskView.call(this,options),this.$element.removeClass("ms-basic-view").addClass("ms-parallax-mask-view")},MSParallaxMaskView.extend(MSMaskView),MSParallaxMaskView.parallaxAmount=.5;var p=MSParallaxMaskView.prototype,_super=MSBasicView.prototype;p._horizUpdate=function(controller,value){_super._horizUpdate.call(this,controller,value);var i=0;if(this.css3)for(i=0;i<this.slidesCount;++i)this.slideList[i].$element[0].style[window._jcsspfx+"Transform"]="translateX("+(value-this.slideList[i].position)*MSParallaxMaskView.parallaxAmount+"px)"+this.__translate_end;else for(i=0;i<this.slidesCount;++i)this.slideList[i].$element[0].style.left=(value-this.slideList[i].position)*MSParallaxMaskView.parallaxAmount+"px"},p._vertiUpdate=function(controller,value){_super._vertiUpdate.call(this,controller,value);var i=0;if(this.css3)for(i=0;i<this.slidesCount;++i)this.slideList[i].$element[0].style[window._jcsspfx+"Transform"]="translateY("+(value-this.slideList[i].position)*MSParallaxMaskView.parallaxAmount+"px)"+this.__translate_end;else for(i=0;i<this.slidesCount;++i)this.slideList[i].$element[0].style.top=(value-this.slideList[i].position)*MSParallaxMaskView.parallaxAmount+"px"},MSSlideController.registerView("parallaxMask",MSParallaxMaskView)}(jQuery),function(){"use strict";window.MSFadeView=function(options){MSBasicView.call(this,options),this.$element.removeClass("ms-basic-view").addClass("ms-fade-view"),this.controller.renderCallback(this.__update,this)},MSFadeView.extend(MSBasicView);var p=MSFadeView.prototype,_super=MSBasicView.prototype;p.__update=function(controller,value){for(var slide,distance,cont_scroll=-value,i=0;i<this.slidesCount;++i)slide=this.slideList[i],distance=-cont_scroll-slide.position,this.__updateSlides(slide,distance)},p.__updateSlides=function(slide,distance){var value=Math.abs(distance/this[this.__dimension]);0>=1-value?slide.$element.fadeTo(0,0).css("visibility","hidden"):slide.$element.fadeTo(0,1-value).css("visibility","")},p.__locateSlides=function(move,start){this.__updateViewList(),start=this.loop?start||0:this.slides.indexOf(this.viewSlidesList[0])*(this[this.__dimension]+this.spacing);for(var slide,l=this.viewSlidesList.length,i=0;i!==l;i++){var pos=start+i*this[this.__dimension];slide=this.viewSlidesList[i],slide.wakeup(),slide.position=pos}move!==!1&&this.controller.changeTo(this.slideList[this.index].position,!1,null,null,!1)},p.__pushEnd=function(){var first_slide=this.slides.shift(),last_slide=this.slides[this.slidesCount-2];this.slides.push(first_slide),first_slide.position=last_slide.position+this[this.__dimension]},p.__pushStart=function(){var last_slide=this.slides.pop(),first_slide=this.slides[0];this.slides.unshift(last_slide),last_slide.position=first_slide.position-this[this.__dimension]},p.create=function(index){_super.create.call(this,index),this.spacing=0,this.controller.options.minValidDist=10},MSSlideController.registerView("fade",MSFadeView)}(jQuery),function(){"use strict";window.MSScaleView=function(options){MSBasicView.call(this,options),this.$element.removeClass("ms-basic-view").addClass("ms-scale-view"),this.controller.renderCallback(this.__update,this)},MSScaleView.extend(MSFadeView);var p=MSScaleView.prototype,_super=MSFadeView.prototype;p.__updateSlides=function(slide,distance){var value=Math.abs(distance/this[this.__dimension]),element=slide.$element[0];0>=1-value?(element.style.opacity=0,element.style.visibility="hidden",element.style[window._jcsspfx+"Transform"]=""):(element.style.opacity=1-value,element.style.visibility="",element.style[window._jcsspfx+"Transform"]="perspective(2000px) translateZ("+value*(0>distance?-.5:.5)*300+"px)")},p.create=function(index){_super.create.call(this,index),this.controller.options.minValidDist=.03},MSSlideController.registerView("scale",MSScaleView)}(jQuery),function(){"use strict";window.MSStackView=function(options){MSBasicView.call(this,options),this.$element.removeClass("ms-basic-view").addClass("ms-stack-view"),this.controller.renderCallback(this.__update,this),this.autoUpdateZIndex=!0},MSStackView.extend(MSFadeView),MSStackView._3dreq=!0,MSStackView._fallback=MSFadeView;var p=MSStackView.prototype,_super=MSFadeView.prototype;p.__updateSlidesZindex=function(){for(var slide,l=this.viewSlidesList.length,i=0;i!==l;i++)slide=this.viewSlidesList[i],this.viewSlidesList[i].$element.css("z-index",l-i)},p.__updateSlides=function(slide,distance){var value=Math.abs(distance/this[this.__dimension]),element=slide.$element[0];0>=1-value?(element.style.opacity=1,element.style.visibility="hidden",element.style[window._jcsspfx+"Transform"]=""):(element.style.visibility="",element.style[window._jcsspfx+"Transform"]=0>distance?"perspective(2000px) translateZ("+-300*value+"px)":this.__translate+"("+-value*this[this.__dimension]+"px)")},p.create=function(index){_super.create.call(this,index),this.controller.options.minValidDist=.03,this.__translate="h"===this.dir?"translateX":"translateY"},MSSlideController.registerView("stack",MSStackView)}(jQuery),function(){"use strict";var perspective=2e3;window.MSFocusView=function(options){MSWaveView.call(this,options),this.$element.removeClass("ms-wave-view").addClass("ms-focus-view"),this.options.centerSpace=this.options.centerSpace||1},MSFocusView.extend(MSWaveView),MSFocusView._3dreq=!0,MSFocusView._fallback=MSFadeBasicView;{var p=MSFocusView.prototype;MSWaveView.prototype}p.__calcview=function(z,w){var a=w/2*z/(z+perspective);return a*(z+perspective)/perspective},p.__updateSlidesHoriz=function(slide,distance){var value=Math.abs(100*distance/this.__width);value=15*-Math.min(value,100),slide.$element.css(window._csspfx+"transform","translateZ("+(value+1)+"px) rotateY(0.01deg) translateX("+(0>distance?1:-1)*-this.__calcview(value,this.__width)*this.options.centerSpace+"px)")},p.__updateSlidesVertic=function(slide,distance){var value=Math.abs(100*distance/this.__width);value=15*-Math.min(value,100),slide.$element.css(window._csspfx+"transform","translateZ("+(value+1)+"px) rotateY(0.01deg) translateY("+(0>distance?1:-1)*-this.__calcview(value,this.__width)*this.options.centerSpace+"px)")},MSSlideController.registerView("focus",MSFocusView)}(),function(){window.MSPartialWaveView=function(options){MSWaveView.call(this,options),this.$element.removeClass("ms-wave-view").addClass("ms-partial-wave-view")},MSPartialWaveView.extend(MSWaveView),MSPartialWaveView._3dreq=!0,MSPartialWaveView._fallback=MSFadeBasicView;{var p=MSPartialWaveView.prototype;MSWaveView.prototype}p.__updateSlidesHoriz=function(slide,distance){var value=Math.abs(100*distance/this.__width);slide.hasBG&&slide.$bg_img.css("opacity",(100-Math.abs(120*distance/this.__width/3))/100),slide.$element.css(window._csspfx+"transform","translateZ("+3*-value+"px) rotateY(0.01deg) translateX("+.75*distance+"px)")},p.__updateSlidesVertic=function(slide,distance){var value=Math.abs(100*distance/this.__width);slide.hasBG&&slide.$bg_img.css("opacity",(100-Math.abs(120*distance/this.__width/3))/100),slide.$element.css(window._csspfx+"transform","translateZ("+3*-value+"px) rotateY(0.01deg) translateY("+.75*distance+"px)")},MSSlideController.registerView("partialWave",MSPartialWaveView)}(),function($){"use strict";var BaseControl=function(){this.options={prefix:"ms-",autohide:!0,overVideo:!0,customClass:null}},p=BaseControl.prototype;p.slideAction=function(){},p.setup=function(){this.cont=this.options.insertTo?$(this.options.insertTo):this.slider.$controlsCont,this.options.overVideo||this._hideOnvideoStarts()},p.checkHideUnder=function(){this.options.hideUnder&&(this.needsRealign=!this.options.insetTo&&("left"===this.options.align||"right"===this.options.align)&&this.options.inset===!1,$(window).bind("resize",{that:this},this.onResize),this.onResize())},p.onResize=function(event){var that=event&&event.data.that||this,w=window.innerWidth;w<=that.options.hideUnder&&!that.detached?(that.hide(!0),that.detached=!0,that.onDetach()):w>=that.options.hideUnder&&that.detached&&(that.detached=!1,that.visible(),that.onAppend())},p.create=function(){this.options.autohide&&(this.hide(!0),this.slider.$controlsCont.mouseenter($.proxy(this._onMouseEnter,this)).mouseleave($.proxy(this._onMouseLeave,this)).mousedown($.proxy(this._onMouseDown,this)),this.$element&&this.$element.mouseenter($.proxy(this._onMouseEnter,this)).mouseleave($.proxy(this._onMouseLeave,this)).mousedown($.proxy(this._onMouseDown,this)),$(document).mouseup($.proxy(this._onMouseUp,this))),this.options.align&&this.$element.addClass("ms-align-"+this.options.align),this.options.customClass&&this.$element&&this.$element.addClass(this.options.customClass)},p._onMouseEnter=function(){this._disableAH||this.mdown||this.visible(),this.mleave=!1},p._onMouseLeave=function(){this.mdown||this.hide(),this.mleave=!0},p._onMouseDown=function(){this.mdown=!0},p._onMouseUp=function(){this.mdown&&this.mleave&&this.hide(),this.mdown=!1},p.onAppend=function(){this.needsRealign&&this.slider._realignControls()},p.onDetach=function(){this.needsRealign&&this.slider._realignControls()},p._hideOnvideoStarts=function(){var that=this;this.slider.api.addEventListener(MSSliderEvent.VIDEO_PLAY,function(){that._disableAH=!0,that.hide()}),this.slider.api.addEventListener(MSSliderEvent.VIDEO_CLOSE,function(){that._disableAH=!1,that.visible()})},p.hide=function(fast){if(fast)this.$element.css("opacity",0),this.$element.css("display","none");else{clearTimeout(this.hideTo);var $element=this.$element;this.hideTo=setTimeout(function(){CTween.fadeOut($element,400,!1)},20)}this.$element.addClass("ms-ctrl-hide")},p.visible=function(){this.detached||(clearTimeout(this.hideTo),this.$element.css("display",""),CTween.fadeIn(this.$element,400,!1),this.$element.removeClass("ms-ctrl-hide"))},p.destroy=function(){this.options&&this.options.hideUnder&&$(window).unbind("resize",this.onResize)},window.BaseControl=BaseControl}(jQuery),function($){"use strict";var MSArrows=function(options){BaseControl.call(this),$.extend(this.options,options)};MSArrows.extend(BaseControl);var p=MSArrows.prototype,_super=BaseControl.prototype;p.setup=function(){var that=this;this.$next=$("<div></div>").addClass(this.options.prefix+"nav-next").bind("click",function(){that.slider.api.next(!0)}),this.$prev=$("<div></div>").addClass(this.options.prefix+"nav-prev").bind("click",function(){that.slider.api.previous(!0)}),_super.setup.call(this),this.cont.append(this.$next),this.cont.append(this.$prev),this.checkHideUnder()},p.hide=function(fast){return fast?(this.$prev.css("opacity",0).css("display","none"),void this.$next.css("opacity",0).css("display","none")):(CTween.fadeOut(this.$prev,400,!1),CTween.fadeOut(this.$next,400,!1),this.$prev.addClass("ms-ctrl-hide"),void this.$next.addClass("ms-ctrl-hide"))},p.visible=function(){this.detached||(CTween.fadeIn(this.$prev,400),CTween.fadeIn(this.$next,400),this.$prev.removeClass("ms-ctrl-hide").css("display",""),this.$next.removeClass("ms-ctrl-hide").css("display",""))},p.destroy=function(){_super.destroy(),this.$next.remove(),this.$prev.remove()},window.MSArrows=MSArrows,MSSlideController.registerControl("arrows",MSArrows)}(jQuery),function($){"use strict";var MSThumblist=function(options){BaseControl.call(this),this.options.dir="h",this.options.wheel="v"===options.dir,this.options.arrows=!1,this.options.speed=17,this.options.align=null,this.options.inset=!1,this.options.margin=10,this.options.space=10,this.options.width=100,this.options.height=100,this.options.type="thumbs",this.options.hover=!1,$.extend(this.options,options),this.thumbs=[],this.index_count=0,this.__dimen="h"===this.options.dir?"width":"height",this.__alignsize="h"===this.options.dir?"height":"width",this.__jdimen="h"===this.options.dir?"outerWidth":"outerHeight",this.__pos="h"===this.options.dir?"left":"top",this.click_enable=!0};MSThumblist.extend(BaseControl);var p=MSThumblist.prototype,_super=BaseControl.prototype;p.setup=function(){if(this.$element=$("<div></div>").addClass(this.options.prefix+"thumb-list"),"tabs"===this.options.type&&this.$element.addClass(this.options.prefix+"tabs"),this.$element.addClass("ms-dir-"+this.options.dir),_super.setup.call(this),this.$element.appendTo(this.slider.$controlsCont===this.cont?this.slider.$element:this.cont),this.$thumbscont=$("<div></div>").addClass("ms-thumbs-cont").appendTo(this.$element),this.options.arrows){var that=this;this.$fwd=$("<div></div>").addClass("ms-thumblist-fwd").appendTo(this.$element).click(function(){that.controller.push(-15)}),this.$bwd=$("<div></div>").addClass("ms-thumblist-bwd").appendTo(this.$element).click(function(){that.controller.push(15)})}if(!this.options.insetTo&&this.options.align){var align=this.options.align;this.options.inset?this.$element.css(align,this.options.margin):"top"===align?this.$element.detach().prependTo(this.slider.$element).css({"margin-bottom":this.options.margin,position:"relative"}):"bottom"===align?this.$element.css({"margin-top":this.options.margin,position:"relative"}):(this.slider.api.addEventListener(MSSliderEvent.RESERVED_SPACE_CHANGE,this.align,this),this.align()),"v"===this.options.dir?this.$element.width(this.options.width):this.$element.height(this.options.height)}this.checkHideUnder()},p.align=function(){if(!this.detached){var align=this.options.align,pos=this.slider.reserveSpace(align,this.options[this.__alignsize]+2*this.options.margin);this.$element.css(align,-pos-this.options[this.__alignsize]-this.options.margin)}},p.slideAction=function(slide){var thumb_ele=slide.$element.find(".ms-thumb"),that=this,thumb_frame=$("<div></div>").addClass("ms-thumb-frame").append(thumb_ele).append($('<div class="ms-thumb-ol"></div>')).bind(this.options.hover?"hover":"click",function(){that.changeSlide(thumb_frame)});if(this.options.align&&thumb_frame.width(this.options.width-("v"===this.options.dir&&"tabs"===this.options.type?12:0)).height(this.options.height).css("margin-"+("v"===this.options.dir?"bottom":"right"),this.options.space),thumb_frame[0].index=this.index_count++,this.$thumbscont.append(thumb_frame),this.options.fillMode&&thumb_ele.is("img")){var aligner=new window.MSAligner(this.options.fillMode,thumb_frame,thumb_ele);thumb_ele[0].aligner=aligner,thumb_ele.one("load",function(){var $this=$(this);$this[0].aligner.init($this.width(),$this.height()),$this[0].aligner.align()}).each($.jqLoadFix)}$.browser.msie&&thumb_ele.on("dragstart",function(event){event.preventDefault()}),this.thumbs.push(thumb_frame)},p.create=function(){_super.create.call(this),this.__translate_end=window._css3d?" translateZ(0px)":"",this.controller=new Controller(0,0,{snappingMinSpeed:2,friction:(100-.5*this.options.speed)/100}),this.controller.renderCallback("h"===this.options.dir?this._hMove:this._vMove,this);var that=this;this.resize_listener=function(){that.__resize()},$(window).bind("resize",this.resize_listener),this.thumbSize=this.thumbs[0][this.__jdimen](!0),this.setupSwipe(),this.__resize();var that=this;this.options.wheel&&(this.wheellistener=function(event){var e=window.event||event.orginalEvent||event,delta=Math.max(-1,Math.min(1,e.wheelDelta||-e.detail));return that.controller.push(10*-delta),!1},$.browser.mozilla?this.$element[0].addEventListener("DOMMouseScroll",this.wheellistener):this.$element.bind("mousewheel",this.wheellistener)),this.slider.api.addEventListener(MSSliderEvent.CHANGE_START,this.update,this),this.slider.api.addEventListener(MSSliderEvent.HARD_UPDATE,this.realignThumbs,this),this.cindex=this.slider.api.index(),this.select(this.thumbs[this.cindex])},p._hMove=function(controller,value){return this.__contPos=value,window._cssanim?void(this.$thumbscont[0].style[window._jcsspfx+"Transform"]="translateX("+-value+"px)"+this.__translate_end):void(this.$thumbscont[0].style.left=-value+"px")},p._vMove=function(controller,value){return this.__contPos=value,window._cssanim?void(this.$thumbscont[0].style[window._jcsspfx+"Transform"]="translateY("+-value+"px)"+this.__translate_end):void(this.$thumbscont[0].style.top=-value+"px")},p.setupSwipe=function(){this.swipeControl=new averta.TouchSwipe(this.$element),this.swipeControl.swipeType="h"===this.options.dir?"horizontal":"vertical";var that=this;this.swipeControl.onSwipe="h"===this.options.dir?function(status){that.horizSwipeMove(status)}:function(status){that.vertSwipeMove(status)}},p.vertSwipeMove=function(status){if(!this.dTouch){var phase=status.phase;if("start"===phase)this.controller.stop();else if("move"===phase)this.controller.drag(status.moveY);else if("end"===phase||"cancel"===phase){var speed=Math.abs(status.distanceY/status.duration*50/3);speed>.1?this.controller.push(-status.distanceY/status.duration*50/3):(this.click_enable=!0,this.controller.cancel())}}},p.horizSwipeMove=function(status){if(!this.dTouch){var phase=status.phase;if("start"===phase)this.controller.stop(),this.click_enable=!1;else if("move"===phase)this.controller.drag(status.moveX);else if("end"===phase||"cancel"===phase){var speed=Math.abs(status.distanceX/status.duration*50/3);speed>.1?this.controller.push(-status.distanceX/status.duration*50/3):(this.click_enable=!0,this.controller.cancel())}}},p.update=function(){var nindex=this.slider.api.index();this.cindex!==nindex&&(null!=this.cindex&&this.unselect(this.thumbs[this.cindex]),this.cindex=nindex,this.select(this.thumbs[this.cindex]),this.dTouch||this.updateThumbscroll())},p.realignThumbs=function(){this.$element.find(".ms-thumb").each(function(index,thumb){thumb.aligner&&thumb.aligner.align()})},p.updateThumbscroll=function(){var pos=this.thumbSize*this.cindex;if(0/0==this.controller.value&&(this.controller.value=0),pos-this.controller.value<0)return void this.controller.gotoSnap(this.cindex,!0);if(pos+this.thumbSize-this.controller.value>this.$element[this.__dimen]()){var first_snap=this.cindex-Math.floor(this.$element[this.__dimen]()/this.thumbSize)+1;return void this.controller.gotoSnap(first_snap,!0)}},p.changeSlide=function(thumb){this.click_enable&&this.cindex!==thumb[0].index&&this.slider.api.gotoSlide(thumb[0].index)},p.unselect=function(ele){ele.removeClass("ms-thumb-frame-selected")},p.select=function(ele){ele.addClass("ms-thumb-frame-selected")},p.__resize=function(){var size=this.$element[this.__dimen]();if(this.ls!==size){this.ls=size,this.thumbSize=this.thumbs[0][this.__jdimen](!0);var len=this.slider.api.count()*this.thumbSize;this.$thumbscont[0].style[this.__dimen]=len+"px",size>=len?(this.dTouch=!0,this.controller.stop(),this.$thumbscont[0].style[this.__pos]=.5*(size-len)+"px",this.$thumbscont[0].style[window._jcsspfx+"Transform"]=""):(this.dTouch=!1,this.click_enable=!0,this.$thumbscont[0].style[this.__pos]="",this.controller._max_value=len-size,this.controller.options.snapsize=this.thumbSize,this.updateThumbscroll())}},p.destroy=function(){_super.destroy(),this.options.wheel&&($.browser.mozilla?this.$element[0].removeEventListener("DOMMouseScroll",this.wheellistener):this.$element.unbind("mousewheel",this.wheellistener),this.wheellistener=null),$(window).unbind("resize",this.resize_listener),this.$element.remove(),this.slider.api.removeEventListener(MSSliderEvent.RESERVED_SPACE_CHANGE,this.align,this),this.slider.api.removeEventListener(MSSliderEvent.CHANGE_START,this.update,this)},window.MSThumblist=MSThumblist,MSSlideController.registerControl("thumblist",MSThumblist)}(jQuery),function($){"use strict";
var MSBulltes=function(options){BaseControl.call(this),this.options.dir="h",this.options.inset=!0,this.options.margin=10,this.options.space=10,$.extend(this.options,options),this.bullets=[]};MSBulltes.extend(BaseControl);var p=MSBulltes.prototype,_super=BaseControl.prototype;p.setup=function(){if(_super.setup.call(this),this.$element=$("<div></div>").addClass(this.options.prefix+"bullets").addClass("ms-dir-"+this.options.dir).appendTo(this.cont),this.$bullet_cont=$("<div></div>").addClass("ms-bullets-count").appendTo(this.$element),!this.options.insetTo&&this.options.align){var align=this.options.align;this.options.inset&&this.$element.css(align,this.options.margin)}this.checkHideUnder()},p.create=function(){_super.create.call(this);var that=this;this.slider.api.addEventListener(MSSliderEvent.CHANGE_START,this.update,this),this.cindex=this.slider.api.index();for(var i=0;i<this.slider.api.count();++i){var bullet=$("<div></div>").addClass("ms-bullet");bullet[0].index=i,bullet.on("click",function(){that.changeSlide(this.index)}),this.$bullet_cont.append(bullet),this.bullets.push(bullet),"h"===this.options.dir?bullet.css("margin",this.options.space/2):bullet.css("margin",this.options.space)}"h"===this.options.dir?this.$element.width(bullet.outerWidth(!0)*this.slider.api.count()):this.$element.css("margin-top",-this.$element.outerHeight(!0)/2),this.select(this.bullets[this.cindex])},p.update=function(){var nindex=this.slider.api.index();this.cindex!==nindex&&(null!=this.cindex&&this.unselect(this.bullets[this.cindex]),this.cindex=nindex,this.select(this.bullets[this.cindex]))},p.changeSlide=function(index){this.cindex!==index&&this.slider.api.gotoSlide(index)},p.unselect=function(ele){ele.removeClass("ms-bullet-selected")},p.select=function(ele){ele.addClass("ms-bullet-selected")},p.destroy=function(){_super.destroy(),this.slider.api.removeEventListener(MSSliderEvent.CHANGE_START,this.update,this),this.$element.remove()},window.MSBulltes=MSBulltes,MSSlideController.registerControl("bullets",MSBulltes)}(jQuery),function($){"use strict";var MSScrollbar=function(options){BaseControl.call(this),this.options.dir="h",this.options.autohide=!0,this.options.width=4,this.options.color="#3D3D3D",this.options.margin=10,$.extend(this.options,options),this.__dimen="h"===this.options.dir?"width":"height",this.__jdimen="h"===this.options.dir?"outerWidth":"outerHeight",this.__pos="h"===this.options.dir?"left":"top",this.__translate_end=window._css3d?" translateZ(0px)":"",this.__translate_start="h"===this.options.dir?" translateX(":"translateY("};MSScrollbar.extend(BaseControl);var p=MSScrollbar.prototype,_super=BaseControl.prototype;p.setup=function(){if(this.$element=$("<div></div>").addClass(this.options.prefix+"sbar").addClass("ms-dir-"+this.options.dir),_super.setup.call(this),this.$element.appendTo(this.slider.$controlsCont===this.cont?this.slider.$element:this.cont),this.$bar=$("<div></div>").addClass(this.options.prefix+"bar").appendTo(this.$element),this.slider.options.loop&&(this.disable=!0,this.$element.remove()),"v"===this.options.dir?this.$bar.width(this.options.width):this.$bar.height(this.options.width),this.$bar.css("background-color",this.options.color),!this.options.insetTo&&this.options.align){this.$element.css("v"===this.options.dir?{right:"auto",left:"auto"}:{top:"auto",bottom:"auto"});var align=this.options.align;this.options.inset?this.$element.css(align,this.options.margin):"top"===align?this.$element.prependTo(this.slider.$element).css({"margin-bottom":this.options.margin,position:"relative"}):"bottom"===align?this.$element.css({"margin-top":this.options.margin,position:"relative"}):(this.slider.api.addEventListener(MSSliderEvent.RESERVED_SPACE_CHANGE,this.align,this),this.align())}this.checkHideUnder()},p.align=function(){if(!this.detached){var align=this.options.align,pos=this.slider.reserveSpace(align,2*this.options.margin+this.options.width);this.$element.css(align,-pos-this.options.margin-this.options.width)}},p.create=function(){if(!this.disable){this.scroller=this.slider.api.scroller,this.slider.api.view.addEventListener(MSViewEvents.SCROLL,this._update,this),this.slider.api.addEventListener(MSSliderEvent.RESIZE,this._resize,this),this._resize(),this.options.autohide&&this.$bar.css("opacity","0")}},p._resize=function(){this.vdimen=this.$element[this.__dimen](),this.bar_dimen=this.slider.api.view["__"+this.__dimen]*this.vdimen/this.scroller._max_value,this.$bar[this.__dimen](this.bar_dimen)},p._update=function(){var value=this.scroller.value*(this.vdimen-this.bar_dimen)/this.scroller._max_value;if(this.lvalue!==value){if(this.lvalue=value,this.options.autohide){clearTimeout(this.hto),this.$bar.css("opacity","1");var that=this;this.hto=setTimeout(function(){that.$bar.css("opacity","0")},150)}return 0>value?void(this.$bar[0].style[this.__dimen]=this.bar_dimen+value+"px"):(value>this.vdimen-this.bar_dimen&&(this.$bar[0].style[this.__dimen]=this.vdimen-value+"px"),window._cssanim?void(this.$bar[0].style[window._jcsspfx+"Transform"]=this.__translate_start+value+"px)"+this.__translate_end):void(this.$bar[0].style[this.__pos]=value+"px"))}},p.destroy=function(){_super.destroy(),this.slider.api.view.removeEventListener(MSViewEvents.SCROLL,this._update,this),this.slider.api.removeEventListener(MSSliderEvent.RESIZE,this._resize,this),this.slider.api.removeEventListener(MSSliderEvent.RESERVED_SPACE_CHANGE,this.align,this),this.$element.remove()},window.MSScrollbar=MSScrollbar,MSSlideController.registerControl("scrollbar",MSScrollbar)}(jQuery),function($){"use strict";var MSTimerbar=function(options){BaseControl.call(this),this.options.autohide=!1,this.options.width=4,this.options.color="#FFFFFF",this.options.inset=!0,this.options.margin=0,$.extend(this.options,options)};MSTimerbar.extend(BaseControl);var p=MSTimerbar.prototype,_super=BaseControl.prototype;p.setup=function(){if(_super.setup.call(this),this.$element=$("<div></div>").addClass(this.options.prefix+"timerbar"),_super.setup.call(this),this.$element.appendTo(this.slider.$controlsCont===this.cont?this.slider.$element:this.cont),this.$bar=$("<div></div>").addClass("ms-time-bar").appendTo(this.$element),"v"===this.options.dir?(this.$bar.width(this.options.width),this.$element.width(this.options.width)):(this.$bar.height(this.options.width),this.$element.height(this.options.width)),this.$bar.css("background-color",this.options.color),!this.options.insetTo&&this.options.align){this.$element.css({top:"auto",bottom:"auto"});var align=this.options.align;this.options.inset?this.$element.css(align,this.options.margin):"top"===align?this.$element.prependTo(this.slider.$element).css({"margin-bottom":this.options.margin,position:"relative"}):"bottom"===align?this.$element.css({"margin-top":this.options.margin,position:"relative"}):(this.slider.api.addEventListener(MSSliderEvent.RESERVED_SPACE_CHANGE,this.align,this),this.align())}this.checkHideUnder()},p.align=function(){if(!this.detached){var align=this.options.align,pos=this.slider.reserveSpace(align,2*this.options.margin+this.options.width);this.$element.css(align,-pos-this.options.margin-this.options.width)}},p.create=function(){_super.create.call(this),this.slider.api.addEventListener(MSSliderEvent.WAITING,this._update,this),this._update()},p._update=function(){this.$bar[0].style.width=this.slider.api._delayProgress+"%"},p.destroy=function(){_super.destroy(),this.slider.api.removeEventListener(MSSliderEvent.RESERVED_SPACE_CHANGE,this.align,this),this.slider.api.removeEventListener(MSSliderEvent.WAITING,this._update,this),this.$element.remove()},window.MSTimerbar=MSTimerbar,MSSlideController.registerControl("timebar",MSTimerbar)}(jQuery),function($){"use strict";var MSCircleTimer=function(options){BaseControl.call(this),this.options.color="#A2A2A2",this.options.stroke=10,this.options.radius=4,this.options.autohide=!1,$.extend(this.options,options)};MSCircleTimer.extend(BaseControl);var p=MSCircleTimer.prototype,_super=BaseControl.prototype;p.setup=function(){return _super.setup.call(this),this.$element=$("<div></div>").addClass(this.options.prefix+"ctimer").appendTo(this.cont),this.$canvas=$("<canvas></canvas>").addClass("ms-ctimer-canvas").appendTo(this.$element),this.$bar=$("<div></div>").addClass("ms-ctimer-bullet").appendTo(this.$element),this.$canvas[0].getContext?(this.ctx=this.$canvas[0].getContext("2d"),this.prog=0,this.__w=2*(this.options.radius+this.options.stroke/2),this.$canvas[0].width=this.__w,this.$canvas[0].height=this.__w,void this.checkHideUnder()):(this.destroy(),void(this.disable=!0))},p.create=function(){if(!this.disable){_super.create.call(this),this.slider.api.addEventListener(MSSliderEvent.WAITING,this._update,this);var that=this;this.$element.click(function(){that.slider.api.paused?that.slider.api.resume():that.slider.api.pause()}),this._update()}},p._update=function(){var that=this;$(this).stop(!0).animate({prog:.01*this.slider.api._delayProgress},{duration:200,step:function(){that._draw()}})},p._draw=function(){this.ctx.clearRect(0,0,this.__w,this.__w),this.ctx.beginPath(),this.ctx.arc(.5*this.__w,.5*this.__w,this.options.radius,1.5*Math.PI,1.5*Math.PI+2*Math.PI*this.prog,!1),this.ctx.strokeStyle=this.options.color,this.ctx.lineWidth=this.options.stroke,this.ctx.stroke()},p.destroy=function(){_super.destroy(),this.disable||($(this).stop(!0),this.slider.api.removeEventListener(MSSliderEvent.WAITING,this._update,this),this.$element.remove())},window.MSCircleTimer=MSCircleTimer,MSSlideController.registerControl("circletimer",MSCircleTimer)}(jQuery),function($){"use strict";window.MSLightbox=function(options){BaseControl.call(this,options),this.options.autohide=!1,$.extend(this.options,options),this.data_list=[]},MSLightbox.fadeDuratation=400,MSLightbox.extend(BaseControl);var p=MSLightbox.prototype,_super=BaseControl.prototype;p.setup=function(){_super.setup.call(this),this.$element=$("<div></div>").addClass(this.options.prefix+"lightbox-btn").appendTo(this.cont),this.checkHideUnder()},p.slideAction=function(slide){$("<div></div>").addClass(this.options.prefix+"lightbox-btn").appendTo(slide.$element).append($(slide.$element.find(".ms-lightbox")))},p.create=function(){_super.create.call(this)},MSSlideController.registerControl("lightbox",MSLightbox)}(jQuery),function($){"use strict";window.MSSlideInfo=function(options){BaseControl.call(this,options),this.options.autohide=!1,this.options.align=null,this.options.inset=!1,this.options.margin=10,this.options.size=100,this.options.dir="h",$.extend(this.options,options),this.data_list=[]},MSSlideInfo.fadeDuratation=400,MSSlideInfo.extend(BaseControl);var p=MSSlideInfo.prototype,_super=BaseControl.prototype;p.setup=function(){if(this.$element=$("<div></div>").addClass(this.options.prefix+"slide-info").addClass("ms-dir-"+this.options.dir),_super.setup.call(this),this.$element.appendTo(this.slider.$controlsCont===this.cont?this.slider.$element:this.cont),!this.options.insetTo&&this.options.align){var align=this.options.align;this.options.inset?this.$element.css(align,this.options.margin):"top"===align?this.$element.prependTo(this.slider.$element).css({"margin-bottom":this.options.margin,position:"relative"}):"bottom"===align?this.$element.css({"margin-top":this.options.margin,position:"relative"}):(this.slider.api.addEventListener(MSSliderEvent.RESERVED_SPACE_CHANGE,this.align,this),this.align()),"v"===this.options.dir?this.$element.width(this.options.size):this.$element.css("min-height",this.options.size)}this.checkHideUnder()},p.align=function(){if(!this.detached){var align=this.options.align,pos=this.slider.reserveSpace(align,this.options.size+2*this.options.margin);this.$element.css(align,-pos-this.options.size-this.options.margin)}},p.slideAction=function(slide){var info_ele=$(slide.$element.find(".ms-info"));info_ele.detach(),this.data_list[slide.index]=info_ele},p.create=function(){_super.create.call(this),this.slider.api.addEventListener(MSSliderEvent.CHANGE_START,this.update,this),this.cindex=this.slider.api.index(),this.switchEle(this.data_list[this.cindex])},p.update=function(){var nindex=this.slider.api.index();this.switchEle(this.data_list[nindex]),this.cindex=nindex},p.switchEle=function(ele){if(this.current_ele){this.current_ele[0].tween&&this.current_ele[0].tween.stop(!0),this.current_ele[0].tween=CTween.animate(this.current_ele,MSSlideInfo.fadeDuratation,{opacity:0},{complete:function(){this.detach(),this[0].tween=null,ele.css("position","relative")},target:this.current_ele}),ele.css("position","absolute")}this.__show(ele)},p.__show=function(ele){ele.appendTo(this.$element).css("opacity","0"),this.current_ele&&ele.height(Math.max(ele.height(),this.current_ele.height())),clearTimeout(this.tou),this.tou=setTimeout(function(){CTween.fadeIn(ele,MSSlideInfo.fadeDuratation),ele.css("height","")},MSSlideInfo.fadeDuratation),ele[0].tween&&ele[0].tween.stop(!0),this.current_ele=ele},p.destroy=function(){_super.destroy(),clearTimeout(this.tou),this.current_ele&&this.current_ele[0].tween&&this.current_ele[0].tween.stop("true"),this.$element.remove(),this.slider.api.removeEventListener(MSSliderEvent.RESERVED_SPACE_CHANGE,this.align,this),this.slider.api.removeEventListener(MSSliderEvent.CHANGE_START,this.update,this)},MSSlideController.registerControl("slideinfo",MSSlideInfo)}(jQuery),function($){window.MSGallery=function(id,slider){this.id=id,this.slider=slider,this.telement=$("#"+id),this.botcont=$("<div></div>").addClass("ms-gallery-botcont").appendTo(this.telement),this.thumbcont=$("<div></div>").addClass("ms-gal-thumbcont hide-thumbs").appendTo(this.botcont),this.playbtn=$("<div></div>").addClass("ms-gal-playbtn").appendTo(this.botcont),this.thumbtoggle=$("<div></div>").addClass("ms-gal-thumbtoggle").appendTo(this.botcont),slider.control("thumblist",{insertTo:this.thumbcont,autohide:!1,dir:"h"}),slider.control("slidenum",{insertTo:this.botcont,autohide:!1}),slider.control("slideinfo",{insertTo:this.botcont,autohide:!1}),slider.control("timebar",{insertTo:this.botcont,autohide:!1}),slider.control("bullets",{insertTo:this.botcont,autohide:!1})};var p=MSGallery.prototype;p._init=function(){var that=this;this.slider.api.paused||this.playbtn.addClass("btn-pause"),this.playbtn.click(function(){that.slider.api.paused?(that.slider.api.resume(),that.playbtn.addClass("btn-pause")):(that.slider.api.pause(),that.playbtn.removeClass("btn-pause"))}),this.thumbtoggle.click(function(){that.vthumbs?(that.thumbtoggle.removeClass("btn-hide"),that.vthumbs=!1,that.thumbcont.addClass("hide-thumbs")):(that.thumbtoggle.addClass("btn-hide"),that.thumbcont.removeClass("hide-thumbs"),that.vthumbs=!0)})},p.setup=function(){var that=this;$(document).ready(function(){that._init()})}}(jQuery),function($){var getPhotosetURL=function(key,id,count){return"https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key="+key+"&photoset_id="+id+"&per_page="+count+"&extras=url_o,description,date_taken,owner_name,views&format=json&jsoncallback=?"},getUserPublicURL=function(key,id,count){return"https://api.flickr.com/services/rest/?&method=flickr.people.getPublicPhotos&api_key="+key+"&user_id="+id+"&per_page="+count+"&extras=url_o,description,date_taken,owner_name,views&format=json&jsoncallback=?"},getImageSource=function(fid,server,id,secret,size,data){return"_o"===size&&data?data.url_o:"https://farm"+fid+".staticflickr.com/"+server+"/"+id+"_"+secret+size+".jpg"};window.MSFlickrV2=function(slider,options){var _options={count:10,type:"photoset",thumbSize:"q",imgSize:"c"};if(this.slider=slider,this.slider.holdOn(),!options.key)return void this.errMsg("Flickr API Key required. Please add it in settings.");$.extend(_options,options),this.options=_options;var that=this;"photoset"===this.options.type?$.getJSON(getPhotosetURL(this.options.key,this.options.id,this.options.count),function(data){that._photosData(data)}):$.getJSON(getUserPublicURL(this.options.key,this.options.id,this.options.count),function(data){that.options.type="photos",that._photosData(data)}),""!==this.options.imgSize&&"-"!==this.options.imgSize&&(this.options.imgSize="_"+this.options.imgSize),this.options.thumbSize="_"+this.options.thumbSize,this.slideTemplate=this.slider.$element.find(".ms-slide")[0].outerHTML,this.slider.$element.find(".ms-slide").remove()};var p=MSFlickrV2.prototype;p._photosData=function(data){if("fail"===data.stat)return void this.errMsg("Flickr API ERROR#"+data.code+": "+data.message);{var that=this;this.options.author||this.options.desc}$.each(data[this.options.type].photo,function(i,item){var slide_cont=that.slideTemplate.replace(/{{[\w-]+}}/g,function(match){return match=match.replace(/{{|}}/g,""),shortCodes[match]?shortCodes[match](item,that):"{{"+match+"}}"});$(slide_cont).appendTo(that.slider.$element)}),that._initSlider()},p.errMsg=function(msg){this.slider.$element.css("display","block"),this.errEle||(this.errEle=$('<div style="font-family:Arial; color:red; font-size:12px; position:absolute; top:10px; left:10px"></div>').appendTo(this.slider.$loading)),this.errEle.html(msg)},p._initSlider=function(){this.slider.release()};var shortCodes={image:function(data,that){return getImageSource(data.farm,data.server,data.id,data.secret,that.options.imgSize,data)},thumb:function(data,that){return getImageSource(data.farm,data.server,data.id,data.secret,that.options.thumbSize)},title:function(data){return data.title},"owner-name":function(data){return data.ownername},"date-taken":function(data){return data.datetaken},views:function(data){return data.views},description:function(data){return data.description._content}}}(jQuery),function($){window.MSFacebookGallery=function(slider,options){var _options={count:10,type:"photostream",thumbSize:"320",imgSize:"orginal",https:!1};this.slider=slider,this.slider.holdOn(),$.extend(_options,options),this.options=_options,this.graph=this.options.https?"https://graph.facebook.com":"http://graph.facebook.com";var that=this;"photostream"===this.options.type?$.getJSON(this.graph+"/"+this.options.username+"/photos/uploaded/?fields=source,name,link,images,from&limit="+this.options.count,function(data){that._photosData(data)}):$.getJSON(this.graph+"/"+this.options.albumId+"/photos?fields=source,name,link,images,from&limit="+this.options.count,function(data){that._photosData(data)}),this.slideTemplate=this.slider.$element.find(".ms-slide")[0].outerHTML,this.slider.$element.find(".ms-slide").remove()};var p=MSFacebookGallery.prototype;p._photosData=function(content){if(content.error)return void this.errMsg("Facebook API ERROR#"+content.error.code+"("+content.error.type+"): "+content.error.message);for(var that=this,i=(this.options.author||this.options.desc,0),l=content.data.length;i!==l;i++){var slide_cont=that.slideTemplate.replace(/{{[\w-]+}}/g,function(match){return match=match.replace(/{{|}}/g,""),shortCodes[match]?shortCodes[match](content.data[i],that):"{{"+match+"}}"});$(slide_cont).appendTo(that.slider.$element)}that._initSlider()},p.errMsg=function(msg){this.slider.$element.css("display","block"),this.errEle||(this.errEle=$('<div style="font-family:Arial; color:red; font-size:12px; position:absolute; top:10px; left:10px"></div>').appendTo(this.slider.$loading)),this.errEle.html(msg)},p._initSlider=function(){this.slider.release()};var getImageSource=function(images,size){if("orginal"===size)return images[0].source;for(var i=0,l=images.length;i!==l;i++)if(-1!==images[i].source.indexOf(size+"x"+size))return images[i].source;return images[l-3].source},shortCodes={image:function(data,that){return getImageSource(data.images,that.options.imgSize)},thumb:function(data,that){return getImageSource(data.images,that.options.thumbSize)},name:function(data){return data.name},"owner-name":function(data){return data.from.name},link:function(data){return data.link}}}(jQuery),function($){"use strict";window.MSScrollParallax=function(slider,parallax,bgparallax,fade){this.fade=fade,this.slider=slider,this.parallax=parallax/100,this.bgparallax=bgparallax/100,slider.api.addEventListener(MSSliderEvent.INIT,this.init,this),slider.api.addEventListener(MSSliderEvent.DESTROY,this.destory,this),slider.api.addEventListener(MSSliderEvent.CHANGE_END,this.resetLayers,this),slider.api.addEventListener(MSSliderEvent.CHANGE_START,this.updateCurrentSlide,this)},window.MSScrollParallax.setup=function(slider,parallax,bgparallax,fade){return window._mobile?void 0:(null==parallax&&(parallax=50),null==bgparallax&&(bgparallax=40),new MSScrollParallax(slider,parallax,bgparallax,fade))};var p=window.MSScrollParallax.prototype;p.init=function(){this.slider.$element.addClass("ms-scroll-parallax"),this.sliderOffset=this.slider.$element.offset().top,this.updateCurrentSlide();for(var slide,slides=this.slider.api.view.slideList,i=0,l=slides.length;i!==l;i++)slide=slides[i],slide.hasLayers&&(slide.layerController.$layers.wrap('<div class="ms-scroll-parallax-cont"></div>'),slide.$scrollParallaxCont=slide.layerController.$layers.parent());$(window).on("scroll",{that:this},this.moveParallax).trigger("scroll")},p.resetLayers=function(){if(this.lastSlide){var layers=this.lastSlide.$scrollParallaxCont;window._css2d?(layers&&(layers[0].style[window._jcsspfx+"Transform"]=""),this.lastSlide.hasBG&&(this.lastSlide.$imgcont[0].style[window._jcsspfx+"Transform"]="")):(layers&&(layers[0].style.top=""),this.lastSlide.hasBG&&(this.lastSlide.$imgcont[0].style.top="0px"))}},p.updateCurrentSlide=function(){this.lastSlide=this.currentSlide,this.currentSlide=this.slider.api.currentSlide,this.moveParallax({data:{that:this}})},p.moveParallax=function(e){var that=e.data.that,slider=that.slider,offset=that.sliderOffset,scrollTop=$(window).scrollTop(),layers=that.currentSlide.$scrollParallaxCont,out=offset-scrollTop;0>=out?(layers&&(window._css3d?layers[0].style[window._jcsspfx+"Transform"]="translateY("+-out*that.parallax+"px) translateZ(0.4px)":window._css2d?layers[0].style[window._jcsspfx+"Transform"]="translateY("+-out*that.parallax+"px)":layers[0].style.top=-out*that.parallax+"px"),that.updateSlidesBG(-out*that.bgparallax+"px",!0),layers&&that.fade&&layers.css("opacity",1-Math.min(1,-out/slider.api.height))):(layers&&(window._css2d?layers[0].style[window._jcsspfx+"Transform"]="":layers[0].style.top=""),that.updateSlidesBG("0px",!1),layers&&that.fade&&layers.css("opacity",1))},p.updateSlidesBG=function(pos,fixed){for(var slides=this.slider.api.view.slideList,position=!fixed||$.browser.msie||$.browser.opera?"":"fixed",i=0,l=slides.length;i!==l;i++)slides[i].hasBG&&(slides[i].$imgcont[0].style.position=position,slides[i].$imgcont[0].style.top=pos),slides[i].$bgvideocont&&(slides[i].$bgvideocont[0].style.position=position,slides[i].$bgvideocont[0].style.top=pos)},p.destory=function(){slider.api.removeEventListener(MSSliderEvent.INIT,this.init,this),slider.api.removeEventListener(MSSliderEvent.DESTROY,this.destory,this),slider.api.removeEventListener(MSSliderEvent.CHANGE_END,this.resetLayers,this),slider.api.removeEventListener(MSSliderEvent.CHANGE_START,this.updateCurrentSlide,this),$(window).off("scroll",this.moveParallax)}}(jQuery),function($,document,window){var PId=0;if(window.MasterSlider){var KeyboardNav=function(slider){this.slider=slider,this.PId=PId++,this.slider.options.keyboard&&slider.api.addEventListener(MSSliderEvent.INIT,this.init,this)};KeyboardNav.name="MSKeyboardNav";var p=KeyboardNav.prototype;p.init=function(){var api=this.slider.api;$(document).on("keydown.kbnav"+this.PId,function(event){var which=event.which;37===which||40===which?api.previous(!0):(38===which||39===which)&&api.next(!0)})},p.destroy=function(){$(document).off("keydown.kbnav"+this.PId),this.slider.api.removeEventListener(MSSliderEvent.INIT,this.init,this)},MasterSlider.registerPlugin(KeyboardNav)}}(jQuery,document,window),function($,document,window){var PId=0,$window=$(window),$doc=$(document);if(window.MasterSlider){var StartOnAppear=function(slider){this.PId=PId++,this.slider=slider,this.$slider=slider.$element,this.slider.options.startOnAppear&&(slider.holdOn(),$doc.ready($.proxy(this.init,this)))};StartOnAppear.name="MSStartOnAppear";var p=StartOnAppear.prototype;p.init=function(){this.slider.api;$window.on("scroll.soa"+this.PId,$.proxy(this._onScroll,this)).trigger("scroll")},p._onScroll=function(){var vpBottom=$window.scrollTop()+$window.height(),top=this.$slider.offset().top;vpBottom>top&&($window.off("scroll.soa"+this.PId),this.slider.release())},p.destroy=function(){},MasterSlider.registerPlugin(StartOnAppear)}}(jQuery,document,window),function(document,window){var filterUnits={"hue-rotate":"deg",blur:"px"},initialValues={opacity:1,contrast:1,brightness:1,saturate:1,"hue-rotate":0,invert:0,sepia:0,blur:0,grayscale:0};if(window.MasterSlider){var Filters=function(slider){this.slider=slider,this.slider.options.filters&&slider.api.addEventListener(MSSliderEvent.INIT,this.init,this)};Filters.name="MSFilters";var p=Filters.prototype;p.init=function(){var api=this.slider.api,view=api.view;this.filters=this.slider.options.filters,this.slideList=view.slideList,this.slidesCount=view.slidesCount,this.dimension=view[view.__dimension],this.target="slide"===this.slider.options.filterTarget?"$element":"$bg_img",this.filterName=$.browser.webkit?"WebkitFilter":"filter";var superFun=view.controller.__renderHook.fun,superRef=view.controller.__renderHook.ref;view.controller.renderCallback(function(controller,value){superFun.call(superRef,controller,value),this.applyEffect(value)},this),this.applyEffect(view.controller.value)},p.applyEffect=function(value){for(var factor,slide,i=0;i<this.slidesCount;++i)slide=this.slideList[i],factor=Math.min(1,Math.abs(value-slide.position)/this.dimension),slide[this.target]&&($.browser.msie?null!=this.filters.opacity&&slide[this.target].opacity(1-this.filters.opacity*factor):slide[this.target][0].style[this.filterName]=this.generateStyle(factor))},p.generateStyle=function(factor){var unit,style="";for(var filter in this.filters)unit=filterUnits[filter]||"",style+=filter+"("+(initialValues[filter]+(this.filters[filter]-initialValues[filter])*factor)+") ";return style},p.destroy=function(){this.slider.api.removeEventListener(MSSliderEvent.INIT,this.init,this)},MasterSlider.registerPlugin(Filters)}}(document,window,jQuery),function($,document,window){if(window.MasterSlider){var ScrollToAction=function(slider){this.slider=slider,slider.api.addEventListener(MSSliderEvent.INIT,this.init,this)};ScrollToAction.name="MSScrollToAction";var p=ScrollToAction.prototype;p.init=function(){var api=this.slider.api;api.scrollToEnd=_scrollToEnd,api.scrollTo=_scrollTo},p.destroy=function(){};var _scrollTo=function(target,duration){var target=(this.slider.$element,$(target).eq(0));0!==target.length&&(null==duration&&(duration=1.4),$("html, body").animate({scrollTop:target.offset().top},1e3*duration,"easeInOutQuad"))},_scrollToEnd=function(duration){var sliderEle=this.slider.$element;null==duration&&(duration=1.4),$("html, body").animate({scrollTop:sliderEle.offset().top+sliderEle.outerHeight(!1)},1e3*duration,"easeInOutQuad")};MasterSlider.registerPlugin(ScrollToAction)}}(jQuery,document,window);
//# sourceMappingURL=masterslider.min.js.map;/**/
(function($){
        $.fn.joomlaviMasterSlider = function (opts) {
            var md_setting = Drupal.settings.mod_media_multi;
            var $self = $(this);
            var id_slider = $(this).attr('id');
                defaults = {
                    width:md_setting.width,
                    height:md_setting.height,
                    heightLimit:md_setting.heightLimit,
                    autoHeight:md_setting.autoHeight,
                    fillMode:md_setting.fillMode,
                    space:md_setting.space,
                    wheel:md_setting.wheel,
                    swipe:md_setting.swipe,
                    grabCursor:md_setting.grabCursor,
                    mouse:md_setting.mouse,
                    keyboard:md_setting.keyboard,
                    autoplay:md_setting.autoPlay,
                    loop:md_setting.loop,
                    layout:md_setting.layout,
                    fullwidth:md_setting.fullwidth,
                    endPause:md_setting.endPause,
                    smoothHeight:md_setting.smoothHeight,
                    view:md_setting.view,
                    centerControls: md_setting.centerControls,
                    speed:md_setting.speed,
                    dir:md_setting.dir,
                    controls : {
                        arrows : {autohide:false},
                        //bullets : {}
                        // more slider controls...
                    }
                },
                options = $.extend(defaults, $self.data(), opts),
                slider = new MasterSlider;

            slider.setup(id_slider, options);
            slider.control('arrows');
            slider.api.addEventListener(MSSliderEvent.RESIZE , function(){
                /* Setting audio Sound Cloud */
                if (!$self.data('settingAudio')) {
                    $self.data('settingAudio', true);
                    $('.ms-slide', $self).each( function () {


                        if ($(this).children('a').data('type') == 'sound') {
                            var $el = $(this),
                                $a = $(this).children('a'),
                                href = $el.children('a').attr('href');

                            $el.data('firstActive', true);
                            $el.on('slideActive', function (event) {
                                event.preventDefault();
                                event.stopPropagation();

                                if ($a.data('autoplay')) {
                                    if ($el.data('iframeLoaded') && ($el.index() == slider.indexActive)) {
                                        $('.ms-slide-vpbtn', $el).trigger('click');
                                        if ($el.data('firstActive')) {
                                            $el.data('firstActive', false)
                                        }
                                    }
                                }
                                if ($el.index() != slider.indexActive && $('.ms-slide-vcbtn', $el).css('display') == 'block') {
                                    $('.ms-slide-vcbtn', $el).trigger('click');

                                }
                            });
                            $el.addClass('ms-loading-audio');
                            getIdSoundCloud($el, href);
                        }
                    });
                }

                /* End Setting audio Sound Cloud */
            });

            /* Event Change Start Slide */
            slider.api.addEventListener(MSSliderEvent.CHANGE_START , function(object){
                var $selected = object.target.currentSlide.$element;

                slider.indexActive = $selected.index();
                if (slider.$previousActive) {
                    slider.$previousActive.trigger('slideActive');
                }
                $selected.trigger('slideActive');

                slider.$previousActive = $selected;
            });
            /* End Event Change Start  Slide */

            /* Get ID Sound Cloud */
            function getIdSoundCloud($el, trackUrl) {
                var Client_ID = '851ed65ddbf3f0895eb6e38b8b1a7094',
                    $buttonPlay = $('<div class="ms-slide-vpbtn"></div>'),
                    $buttonRemove = $('<div class="ms-slide-vcbtn"></div>'),
                    $iframe = $('<iframe class="ms-slide-audio" src="" width="100%" height="100%" allowfullscreen="true" scrolling="no" frameborder="no"></iframe>'),
                    id  =  'ms-audio-' + $.now(),
                    widget = SC.Widget($iframe[0]);

                $el.append($iframe);
                $el.append($buttonPlay);
                $el.append($buttonRemove);
                $buttonRemove.hide();
                $iframe.css('height', 0);
                /* Ajax query */
                $.ajax({
                    'type': 'POST',
                    'url': 'http://api.soundcloud.com/resolve.json?url=' + trackUrl + '&client_id=' + Client_ID,
                    success: function (response) {
                        var $a = $el.children('a'),
                            $img = $('img', $el),
                            trackURI = response.uri,
                            url = 'https://w.soundcloud.com/player/?url=' + trackURI;


                        $el.data('widget', widget);
                        url += '&hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;visual=true"';
                        $el.data('widget', widget);
                        $el.removeClass('ms-loading-audio');
                        $iframe.attr('src', url);
                        $el.data('response', response);
                        $iframe.load( function () {
                            $el.data('iframeLoaded', true);


                            $buttonPlay.click( function () {
                                var temp = $el.data('firstActive');

                                $('.ms-slide-bgcont', $el).hide();
                                $buttonPlay.hide();
                                $buttonRemove.show();
                                $img.hide();
                                widget.play();

                                setTimeout( function () {
                                    if (($el.data('firstActive') && $a.data('time')) || (temp && $a.data('time') && $a.data('autoplay'))) {
                                        $el.data('firstActive', false);
                                        var time = parseInt($a.data('time'));
                                        if (isNaN(time)) {
                                            time = 0;
                                        }
                                        widget.seekTo(120000);
                                    }
                                }, 1000);
                                $iframe.css('height', '');

                            });
                            $buttonRemove.click( function() {
                                $('.ms-slide-bgcont', $el).show();
                                $buttonPlay.show();
                                $buttonRemove.hide();
                                widget.pause();
                                $img.show();
                                $iframe.css('height', 0);

                            });
                            $el.trigger('slideActive');
                        })
                    }
                });
                /* End Ajax query */
            }

        };
        $(document).ready( function () {
            $('.master-slider').each( function () {
                $(this).joomlaviMasterSlider();
            })
        })
 
})(jQuery);



;/**/
Drupal.TBMegaMenu = Drupal.TBMegaMenu || {};

(function ($) {
  Drupal.TBMegaMenu.oldWindowWidth = 0;
  Drupal.TBMegaMenu.displayedMenuMobile = false;
  Drupal.TBMegaMenu.supportedScreens = [980];
  Drupal.TBMegaMenu.menuResponsive = function () {
    var windowWidth = window.innerWidth ? window.innerWidth : $(window).width();
    var navCollapse = $('.tb-megamenu').children('.nav-collapse');
    if (windowWidth < Drupal.TBMegaMenu.supportedScreens[0]) {
      navCollapse.addClass('collapse');
      if (Drupal.TBMegaMenu.displayedMenuMobile) {
        navCollapse.css({height: 'auto', overflow: 'visible'});
      } else {
        navCollapse.css({height: 0, overflow: 'hidden'});
      }
    } else {
      // If width of window is greater than 980 (supported screen).
      navCollapse.removeClass('collapse');
      if (navCollapse.height() <= 0) {
        navCollapse.css({height: 'auto', overflow: 'visible'});
      }
    }
  };
  
  Drupal.behaviors.tbMegaMenuAction = {
    attach: function(context) {
      $('.tb-megamenu-button', context).once('menuIstance', function () {
        var This = this;
        $(This).click(function() {
          if(parseInt($(this).parent().children('.nav-collapse').height())) {
            $(this).parent().children('.nav-collapse').css({height: 0, overflow: 'hidden'});
            Drupal.TBMegaMenu.displayedMenuMobile = false;
          }
          else {
            $(this).parent().children('.nav-collapse').css({height: 'auto', overflow: 'visible'});
            Drupal.TBMegaMenu.displayedMenuMobile = true;
          }
        });
      });
      
      
      var isTouch = 'ontouchstart' in window && !(/hp-tablet/gi).test(navigator.appVersion);
      if(!isTouch){
        $(document).ready(function($){
          var mm_duration = 0;
          $('.tb-megamenu').each (function(){
            if ($(this).data('duration')) {
              mm_duration = $(this).data('duration');
            }
          });
          var mm_timeout = mm_duration ? 100 + mm_duration : 500;
          $('.nav > li, li.mega').hover(function(event) {
            var $this = $(this);
            if ($this.hasClass ('mega')) {
              $this.addClass ('animating');
              clearTimeout ($this.data('animatingTimeout'));
              $this.data('animatingTimeout', setTimeout(function(){$this.removeClass ('animating')}, mm_timeout));
              clearTimeout ($this.data('hoverTimeout'));
              $this.data('hoverTimeout', setTimeout(function(){$this.addClass ('open')}, 100));  
            } else {
              clearTimeout ($this.data('hoverTimeout'));
              $this.data('hoverTimeout', 
              setTimeout(function(){$this.addClass ('open')}, 100));
            }
          },
          function(event) {
            var $this = $(this);
            if ($this.hasClass ('mega')) {
              $this.addClass ('animating');
              clearTimeout ($this.data('animatingTimeout'));
              $this.data('animatingTimeout', 
              setTimeout(function(){$this.removeClass ('animating')}, mm_timeout));
              clearTimeout ($this.data('hoverTimeout'));
              $this.data('hoverTimeout', setTimeout(function(){$this.removeClass ('open')}, 100));
            } else {
              clearTimeout ($this.data('hoverTimeout'));
              $this.data('hoverTimeout', 
              setTimeout(function(){$this.removeClass ('open')}, 100));
            }
          });
        });
      }
      
      $(window).resize(function() {
        var windowWidth = window.innerWidth ? window.innerWidth : $(window).width();
        if(windowWidth != Drupal.TBMegaMenu.oldWindowWidth){
          Drupal.TBMegaMenu.oldWindowWidth = windowWidth;
          Drupal.TBMegaMenu.menuResponsive();
        }
      });
    },
  }
})(jQuery);

;/**/
Drupal.TBMegaMenu = Drupal.TBMegaMenu || {};

(function ($) {
  Drupal.TBMegaMenu.createTouchMenu = function(items) {
      items.children('a').each( function() {
	var $item = $(this);
        var tbitem = $(this).parent();
        $item.click( function(event){
          if ($item.hasClass('tb-megamenu-clicked')) {
            var $uri = $item.attr('href');
            window.location.href = $uri;
          }
          else {
            event.preventDefault();
            $item.addClass('tb-megamenu-clicked');
            if(!tbitem.hasClass('open')){	
              tbitem.addClass('open');
            }
          }
        }).closest('li').mouseleave( function(){
          $item.removeClass('tb-megamenu-clicked');
          tbitem.removeClass('open');
        });
     });
     /*
     items.children('a').children('span.caret').each( function() {
	var $item = $(this).parent();
        $item.click(function(event){
          tbitem = $item.parent();
          if ($item.hasClass('tb-megamenu-clicked')) {
            Drupal.TBMegaMenu.eventStopPropagation(event);
            if(tbitem.hasClass('open')){	
              tbitem.removeClass('open');
              $item.removeClass('tb-megamenu-clicked');
            }
          }
          else {
            Drupal.TBMegaMenu.eventStopPropagation(event);
            $item.addClass('tb-megamenu-clicked');
            if(!tbitem.hasClass('open')){	
              tbitem.addClass('open');
              $item.removeClass('tb-megamenu-clicked');
            }
          }
        });
     });
     */
  }
  
  Drupal.TBMegaMenu.eventStopPropagation = function(event) {
    if (event.stopPropagation) {
      event.stopPropagation();
    }
    else if (window.event) {
      window.event.cancelBubble = true;
    }
  }  
  Drupal.behaviors.tbMegaMenuTouchAction = {
    attach: function(context) {
      var isTouch = 'ontouchstart' in window && !(/hp-tablet/gi).test(navigator.appVersion);
      if(isTouch){
        $('html').addClass('touch');
        Drupal.TBMegaMenu.createTouchMenu($('.tb-megamenu ul.nav li.mega').has('.dropdown-menu'));
      }
    }
  }
})(jQuery);
;/**/
(function ($) {
  Drupal.behaviors.newsletter = {
    attach: function (context, settings) {
      $("input[name='email']", context).click(function () {
          if ($(this).val() == Drupal.t('user@example.com')) {
            $(this).val('');
          }
      });
      $("input[name='email']", context).blur(function () {
        if ($(this).val() == '') {
          $(this).val(Drupal.t('user@example.com'));
        }
      });
    },

    subscribeForm: function(data) {
      $.each(Drupal.settings.exposed, function(e,i) {
        if (!$('#edit-field-newsletter-list-' + Drupal.settings.lang + '-' + i).attr('checked')) {
          $('.form-item-exposed-' + i).hide();
        }

        $('#edit-field-newsletter-list-' + Drupal.settings.lang + '-' + i).click(function () {
          $('.form-item-exposed-' + i).toggle();
        });
      });
    }
  };
})(jQuery);
;/**/
