<?php
/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
global $base_url;
$theme_path = drupal_get_path("theme", "construction");
$flick_id  	= variable_get('flickr_news_id', null);
?>

<div id="flickr"></div>



<script type="text/javascript">
  (function() {
    function Flickr() {
      this.init();
    }

    Flickr.prototype = {
      init: function() {
        this.user = "139910291@N07";
        this.album = "72157663705755660";


        window.getPhotos = this.getPhotos;

        this.getJSON();
      },
      getJSON: function() {
        var src = "http://api.flickr.com/services/feeds/photoset.gne?nsid=" + this.user + "&set=" + this.album + "&format=json&jsoncallback=getPhotos";
        var script = document.createElement( "script" );
        script.src = src;
        document.body.appendChild( script );
      },
      getPhotos: function( data ) {
        var limit = 3;

        if( data && data.items ) {
          var title = data.title;
          var items = data.items;
          var albumTitle = title.replace( "Content from ", "" );
          var html = "<h3>" + albumTitle + "</h3>";
          html += "<div class='images'>";

          for( var i = 0; i < items.length; ++i ) {
            var item = items[i];
            var n = i + 1;
            if( n <= limit ) {
              html += "<a href='" + item.link + "'><img src='" + item.media.m + "' alt='' /></a>";
            }
          }

          html += "</div>";

          document.querySelector( "#flickr" ).innerHTML = html;
        }
      }
    };

    document.addEventListener( "DOMContentLoaded", function() {
      var flickrFeed = new Flickr();

    });

  })();
</script>
