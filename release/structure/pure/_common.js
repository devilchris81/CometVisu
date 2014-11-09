/* _common.js (c) 2010 by Christian Mayer [CometVisu at ChristianMayer dot de]
 *
 * This program is free software; you can redistribute it and/or modify it
 * under the terms of the GNU General Public License as published by the Free
 * Software Foundation; either version 3 of the License, or (at your option)
 * any later version.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License for
 * more details.
 *
 * You should have received a copy of the GNU General Public License along
 * with this program; if not, write to the Free Software Foundation, Inc.,
 * 59 Temple Place - Suite 330, Boston, MA  02111-1307, USA
 */

define(["jquery"],function(e){function n(){var t=this;this.creators={},this.addCreator=function(e,t){this.creators[e]=t},this.getCreator=function(e){return this.creators[e]===undefined?this.creators.unknown:this.creators[e]};var n={};this.addPopup=function(e,t){n[e]=t,n[e].type=e},this.getPopup=function(e){var t=n[e];return t===undefined?n.unknown:n[e]},this.addPopup("unknown",{create:function(t){var n=!1,i=e('<div class="popup" style="display:none"/><div class="popup_background" style="display:none" />').appendTo("body");i.addClass(this.type),t.title&&i.filter(".popup").append(e('<div class="head" />').append(t.title)),t.content&&i.filter(".popup").append(e('<div class="main" />').append(t.content)),t.width&&(i.width(t.width),reposition=!0),t.height&&(i.height(t.height),reposition=!0);var s={x:-1,y:-1,w:0,h:0},o;if(t.position)if(t.position.offset){var u=t.position.offset();s.x=u.left,s.y=u.top,s.w=t.position.width(),s.h=t.position.height()}else t.position.hasOwnProperty("x")&&(s.x=t.position.x),t.position.hasOwnProperty("y")&&(s.y=t.position.y),t.position.hasOwnProperty("w")&&(s.w=t.position.w),t.position.hasOwnProperty("h")&&(s.h=t.position.h),s.w==0&&s.h==0&&(o=5);t.align!==undefined&&(o=t.align);var a=r(s,{w:i.outerWidth(),h:i.outerHeight()},{w:e(window).width(),h:e(window).height()},o);return i.css("left",a.x),i.css("top",a.y),i.bind("click",function(){return i.remove(),!1}),i.css("display","block"),i}}),this.addPopup("info",e.extend(!0,{},this.getPopup("unknown"))),this.addPopup("warning",e.extend(!0,{},this.getPopup("unknown"))),this.addPopup("error",e.extend(!0,{},this.getPopup("unknown"))),this.defaultValueHandling=function(e,t,n){if(undefined!==e)var r=n.address[e.type][0],i=templateEngine.transformDecode(r,t);else var r="",i=t;n.basicvalue=i,i=templateEngine.map(i,n.mapping),n.precision&&(i=Number(i).toPrecision(n.precision)),n.format&&(i=sprintf(n.format,i)),n.value=i;if(undefined!==i&&i.constructor==Date)switch(r){case"DPT:10.001":i=i.toLocaleTimeString();break;case"DPT:11.001":i=i.toLocaleDateString()}return i},this.defaultUpdate=function(n,r,i,s){var o=i||e(this),u=s?o.find('.actor:has(".value")'):o,a=t.defaultValueHandling(n,r,o.data());templateEngine.setWidgetStyling(u,o.data("basicvalue"),o.data("styling")),o.data("align")&&o.addClass(o.data("align"));var f=o.find(".value");f.empty();if(undefined!==a)if("string"==typeof a||"number"==typeof a)f.append(a);else if("function"==typeof a)a(f);else for(var l=0;l<a.length;l++){var c=a[l];if(!c)continue;"string"==typeof c||"number"==typeof c?f.append(c):"function"==typeof c?c(f):f.append(e(c).clone())}else f.append("-");return a},this.defaultUpdate3d=function(e,t,n){var r=e.data.layout,i=t.building2screen(new THREE.Vector3(r.x,r.y,r.z));e.data.element.css("left",i.x+"px"),e.data.element.css("top",i.y+"px");var s=!0;r.floorFilter&&(s=t.getState("showFloor")==t.buildingProperties.floorNames[r.floorFilter]),e.data.element.css("display",s?"":"none")},this.extractLayout=function(e,t,n){typeof defaultValue=="undefined"&&(n=[]);var r=t=="2d"?"position:absolute;":"";return e.getAttribute("x")?r+="left:"+e.getAttribute("x")+";":n.x&&(r+="left:"+n.x+";"),e.getAttribute("y")?r+="top:"+e.getAttribute("y")+";":n.y&&(r+="top:"+n.y+";"),e.getAttribute("width")?r+="width:"+e.getAttribute("width")+";":n.width&&(r+="width:"+n.width+";"),e.getAttribute("height")?r+="height:"+e.getAttribute("height")+";":n.height&&(r+="height:"+n.height+";"),r},this.extractLayout3d=function(e){var t={};return e.getAttribute("x")&&(t.x=e.getAttribute("x")),e.getAttribute("y")&&(t.y=e.getAttribute("y")),e.getAttribute("z")&&(t.z=e.getAttribute("z")),e.getAttribute("floor")&&(t.floor=e.getAttribute("floor")),e.getAttribute("floorFilter")&&(t.floorFilter=e.getAttribute("floorFilter")),e.getAttribute("roomFilter")&&(t.roomFilter=e.getAttribute("roomFilter")),t},this.extractLabel=function(t,n){if(!t)return;var r=e('<div class="label"></div>');return e(t).contents().each(function(){var t=e(this);if(t.is("icon")){var i=icons.getIcon(t.attr("name"),t.attr("type"),t.attr("flavour")||n,t.attr("color"),t.attr("styling"));"function"==typeof i?i(r):i&&r.append(i.clone())}else r.append(this.textContent)}),r},this.makeAddressList=function(e,t){var n={};return e.find("address").each(function(){var e=this.textContent,r=this.getAttribute("transform");if(!e||!r)return;var i=3;switch(this.getAttribute("mode")){case"disable":i=0;break;case"read":i=1;break;case"write":i=2;break;case"readwrite":i=3}var s=t?t(e,r,i,this.getAttribute("variant")):[!0,undefined];s[0]&&templateEngine.addAddress(e),n["_"+e]=[r,i,s[1]];return}),n},this.setWidgetLayout=function(t,n){return t.data("colspan",n.children("layout").attr("colspan")||e("head").data("colspanDefault")||6),n.children("layout").attr("rowspan")&&(t.data("rowspanClass",templateEngine.rowspanClass(n.children("layout").attr("rowspan")||1)),t.addClass("innerrowspan")),t},this.makeWidgetLabel=function(e,t,n){var r=t.find("label")[0];return r&&e.append(this.extractLabel(r,n)),e},this.createDefaultWidget=function(t,n,r,i,s,o,u){var a=n.children("layout")[0],f=a?'style="'+this.extractLayout(a,s)+'"':"",l="widget clearfix "+t;n.attr("align")&&(l+=" "+n.attr("align"));var c=e('<div class="'+l+'" '+f+"/>");this.setWidgetLayout(c,n),n.attr("flavour")&&(i=n.attr("flavour")),i&&c.addClass("flavour_"+i),n.attr("class")&&c.addClass("custom_"+n.attr("class"));var h=this.extractLabel(n.find("label")[0],i),p=this.makeAddressList(n,u);c.data({address:p,bind_click_to_widget:n.attr("bind_click_to_widget"),mapping:n.attr("mapping"),styling:n.attr("styling"),format:n.attr("format"),align:n.attr("align"),path:r,type:t}),c.append(h);if(o)for(var d in p)p[d][1]&1&&c.bind(d,o);return c},this.createDefaultButtonAction=function(){var t="ontouchstart"in window||"onmsgesturechange"in window,n=function(t){t.preventDefault();var n=t.data.action,r=t.data.actor;n&&e.proxy(n,r)(t),r.removeClass("switchUnpressed").addClass("switchPressed")},r=function(t){t.preventDefault();var n=t.data.action,r=t.data.actor;n&&e.proxy(n,r)(t),r.removeClass("switchPressed").addClass("switchUnpressed")};return function(e,i,s,o){e.bind(t?"touchstart":"mousedown",{actor:i,action:s},n).bind(t?"touchend":"mouseup",{actor:i,action:o},r).bind(t?"touchout":"mouseout",{actor:i},r)}}()}function r(e,t,n,r){var i=[8,2,6,4,9,3,7,1,5,0];r!==undefined&&i.unshift(r);for(pos in i){var s={};switch(i[pos]){case 0:return{x:(n.w-t.w)/2,y:(n.h-t.h)/2};case 1:s.x=e.x-t.w,s.y=e.y+e.h;break;case 2:s.x=e.x+e.w/2-t.w/2,s.y=e.y+e.h;break;case 3:s.x=e.x+e.w,s.y=e.y+e.h;break;case 4:s.x=e.x-t.w,s.y=e.y+e.h/2-t.h/2;break;case 5:s.x=e.x+e.w/2-t.w/2,s.y=e.y+e.h/2-t.h/2;break;case 6:s.x=e.x+e.w,s.y=e.y+e.h/2-t.h/2;break;case 7:s.x=e.x-t.w,s.y=e.y-t.h;break;case 8:s.x=e.x+e.w/2-t.w/2,s.y=e.y-t.h;break;case 9:s.x=e.x+e.w,s.y=e.y-t.h}if(s.x>=0&&s.y>=0&&s.x+t.w<=n.w&&s.y+t.h<=n.h)return s}return{x:0,y:0}}var t={release:0,development:1},i=new n;return{basicdesign:i,Maturity:t,placementStrategy:r}});