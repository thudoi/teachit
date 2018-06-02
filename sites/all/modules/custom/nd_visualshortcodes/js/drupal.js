(function() {
  var $ = jQuery;
  $.fn.removeClassPrefix = function(prefix) {
      this.each(function(i, el) {
          var classes = el.className.split(" ").filter(function(c) {
              return c.lastIndexOf(prefix, 0) !== 0;
          });
          el.className = classes.join(" ");
      });
      return this;
  };

  if(typeof(Drupal.ajax) != 'undefined') { 
    Drupal.ajax.prototype.commands.progressive_cms_blog_timeline = function(ajax, response, status) {
      var $article = $('#' + response.selector).closest('.post');
      $article.find('.livicon').attr('data-n', response.data.livicon).updateLivicon({name: response.data.livicon});
      $article.find('.timeline-content, .timeline-icon').removeClassPrefix('bg').removeClassPrefix('border');
      $article.find('.timeline-icon').addClass('bg-' + response.data.color);
      var bg = response.data.tranparent_bg ? 'border border-' : 'bg bg-';
      $article.find('.timeline-content').addClass(bg + response.data.color);
      if(response.data.title) {
        $article.find('.entry-title').show();
      }
      else {
        $article.find('.entry-title').hide();
      }
      if(response.data.no_padding) {
        $article.addClass('no-padding');
      }
      else {
        $article.removeClass('no-padding');
      }
    }
  }

  Drupal.behaviors.attachSelectBox = {
    attach: function (context, settings) {
      if(typeof($.fn.selectBox) !== 'undefined') {
       $('select:not(".without-styles")').selectBox();
      }
    }
  };



  Drupal.behaviors.contextual_form = {
    attach: function (context, settings) {
      // Stop the handler of contextual links to close the popup
      $('.contextual-form:not(.contextual-form-processed)', context).once('contextual-form').click(function(e) {
        e.stopPropagation();
      });
    }
  };

  Drupal.behaviors.livicons = {
    attach: function (context, settings) {
      if(typeof($.fn.updateLivicon) !== 'undefined') {
        $('.livicon:not(.livicon-processed)', context).once('livicon').updateLivicon();
      }
    }
  };

  Drupal.behaviors.charts = {
    attach: function (context, settings) {

      $('.graph-resize').html('');

      $('.bar-with-title', context).each(function() {
        return Morris.Bar({
          element    : $(this).attr('id'),
          data       : $(this).data('values'),
          xkey        : "item",
          ykeys       : ["value"],
          labels      : [$(this).attr('data-label')],
          barRatio    : 0.4,
          xLabelAngle : 35,
          hideHover   : "auto",
          barColors   : ["#88c354"]
        });
      });

      $('.donut-graph', context).each(function() {
        Morris.Donut({
          element   : $(this).attr('id'),
          data      : $(this).data('values'),
          colors    : $(this).data('colors'),
          height    : 100,
          formatter : function(y) {
            return y + "%";
          }
        });
      });

    }
  };

  Drupal.behaviors.view_price_filter = {
    attach: function (context, settings) {

      if(typeof($.fn.slider) !== 'undefined' && $('#filter', context).length) {
        var from_date = parseInt($('#filter', context).parents('.view').find('.form-control[name*=min]').val().substr(0, 4));
        var to_date = parseInt($('#filter', context).parents('.view').find('.form-control[name*=max]').val().substr(0, 4));
        $('#filter', context).attr('value', from_date + ';' + to_date);
        $('#filter', context).slider({
          from: from_date - 3,
          to: to_date + 3,
          limits: false,
          step: 1,
          dimension: '',
          calculate: function( value ) {
            return ( value );
          },
          callback: function(value) {
            var dates = value.split(';');
            $('#filter', context).parents('.view').find('.form-control[name*=min]').val(dates[0]);
            $('#filter', context).parents('.view').find('.form-control[name*=max]').val(dates[1]).change();
          }
        });
      }

      if(typeof($.fn.slider) !== 'undefined' && $('#price-filter', context).length) {
        var from_price = parseInt($('#price-filter', context).parents('.view').find('.form-item-sell-price-min .form-control').val());
        var to_price = parseInt($('#price-filter', context).parents('.view').find('.form-item-sell-price-max .form-control').val());
        $('#price-filter', context).attr('value', from_price + ';' + to_price);
        $('#price-filter', context).slider({
          from: from_price > 500 ? from_price - 500 : 0,
          to: to_price + 500,
          limits: false,
          step: 1,
          dimension: '&nbsp;' + Drupal.settings.ubercart_currency,
          calculate: function( value ) {
            return ( value );
          },
          callback: function(value) {
            var prices = value.split(';');
            $('#price-filter', context).parents('.view').find('.form-item-sell-price-min .form-control').val(prices[0]);
            $('#price-filter', context).parents('.view').find('.form-item-sell-price-max .form-control').val(prices[1]).change();
          }
        });
      }

      if(typeof($.fn.slider) !== 'undefined') {
        $('.jslider-pointer').html('\n\
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 8 12" enable-background="new 0 0 8 12" xml:space="preserve">\n\
          <path fill-rule="evenodd" clip-rule="evenodd" fill="#1e1e1e" d="M2,0h4c1.1,0,2,0.9,2,2l-2,8c-0.4,1.1-0.9,2-2,2l0,0c-1.1,0-1.6-0.9-2-2L0,2C0,0.9,0.9,0,2,0z"/>\n\
        </svg>\n\
        ');
      }
    
    }
  };

  if(!navigator.userAgent.match(/iPad|iPhone|Android/i)) {
    var delay_drupal = ( function() {
    var timeout = { };
    
    return function( callback, id, time ) {
      if( id !== null ) {
      time = ( time !== null ) ? time : 100;
      clearTimeout( timeout[ id ] );
      timeout[ id ] = setTimeout( callback, time );
      }
    };
    })();

    $(window).on('resize', function() {
      delay_drupal( function() {

        var graphResize_drupal;
        
        clearTimeout(graphResize_drupal);
        return graphResize_drupal = setTimeout(function() {
          return Drupal.behaviors.charts.attach($(document), Drupal.settings);
        }, 500);
        
      }, 'resize');
    });
  }


  $(document).ready(function() {

    $(document).bind('flagGlobalAfterLinkUpdate', function(event, data) {
      if(data.flagName == 'compare' || data.flagName == 'wishlist') {
        var new_value = parseInt($('.flag-count-' + data.flagName).text()) + (data.flagStatus == 'unflagged' ? -1 : 1);
        if(new_value > 0) {
          $('.flag-status-' + data.flagName + ', .flag-count-' + data.flagName).show();
        }
        else {
          $('.flag-status-' + data.flagName + ', .flag-count-' + data.flagName).hide();
        }
        $('.flag-count-' + data.flagName).text(new_value);
      }
    });

    $('.modern-gallery-action a').click(function() {
      var column = $(this).attr('href').substr(1) * 3;
      $this = $(this);
      $.post(Drupal.settings.basePath + 'progressive/save_variable', {'variable' : 'progressive_modern_gallery', 'variable_key' : $(this).parents('.modern-gallery-action').attr('data-id'), 'value' : column}, function() {
        $this.parents('.images-box').removeClassPrefix('col-md-').addClass('col-md-' + column);
        $(window).resize();
      })
      return false;
    });

    $('.add-cart.js-active').click(function() {
      $(this).addClass('unflag-action');
      $.post($(this).attr('href'), {current_url : window.location.pathname}, function(url) {
        if(url) {
          window.location.replace(url);
        }
        else {
          $.post(Drupal.settings.basePath + 'progressive/cart_count', function(count) {
            $('.cart-count').text(count);
          })
        }
      })
      return false;
    });

  });

}());