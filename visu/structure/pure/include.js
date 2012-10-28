/* include.js (c) 2012 by Christian Mayer [CometVisu at ChristianMayer dot de]
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

basicdesign.addCreator('include', {
  maturity: Maturity.development,
  create: function( page, path, flavour, type ) {
    var p = $.get( $(page).attr('src') );
    var p = $.ajax({
      url: $(page).attr('src'),
      dataType: 'xml',
      async: false
    });
    var child = (p.responseXML.childNodes[0]);
    return create_pages( child, path , flavour ); 
  }
});