/* refresh.js (c) 2014 by Christian Mayer [CometVisu at ChristianMayer dot de]
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

define(["_common"],function(e){var t=e.basicdesign;e.basicdesign.addCreator("reload",{create:function(e,n,r,i){var s=$(e),o=t.makeAddressList(s,null),u=function(e,t){var n=o[e.type][0],r=templateEngine.transformDecode(n,t);r>0&&window.location.reload(!0)};for(var a in o)o[a][1]&1&&s.bind(a,u)}})});