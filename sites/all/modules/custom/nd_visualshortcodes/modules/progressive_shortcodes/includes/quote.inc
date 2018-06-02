<?php
function progressive_shortcodes_quote_shorcode_info(&$shortcodes)
{
    $shortcodes['quote'] = array(
        'title' => t('Quote'),
        'description' => t('Replace the given text formatted like as a quote.'),
        'process callback' => 'progressive_shortcodes_shortcode_quote',
        'process settings callback' => 'progressive_shortcodes_shortcode_quote_settings',
        'icon' => 'fa fa-quote-right',
        'tips callback' => 'progressive_shortcodes_shortcode_quote_tip',
        'child shortcode' => 'html',
        'description_field' => 'author',
    );
}

function progressive_shortcodes_shortcode_quote_settings($attrs, $text) {
    $form['blockquote'] = array(
        '#type' => 'checkbox',
        '#title' => t('Blockquote'),
        '#default_value' => isset($attrs['blockquote']) ? $attrs['blockquote'] : 0,
        '#attributes' => array('class' => array('blockquote-shortcode-flag'))
    );
    $form['author'] = array(
        '#type' => 'textfield',
        '#title' => t('Author'),
        '#default_value' => isset($attrs['author']) ? $attrs['author'] : '',
        '#attributes' => array('class' => array('form-control')),
    );
    $filename = isset($attrs['image_fid']) && !empty($attrs['image_fid']) ? file_load($attrs['image_fid'])->uri : (isset($attrs['image']) ? $attrs['image'] : '');
    $image = $filename ? theme('image_style', array('style_name' => 'media_thumbnail', 'path' => $filename)) : '';
    $form['image_fid'] = array(
        '#type' => 'textfield',
        '#title' => t('Image'),
        '#default_value' => isset($attrs['image_fid']) ? $attrs['image_fid'] : '',
        '#states' => array(
            'visible' => array(
                '.blockquote-shortcode-flag' => array('checked' => FALSE),
            ),
        ),
        '#attributes' => array('class' => array('image-media-upload hidden')),
        '#field_suffix' => '<div class = "preview-image">' . $image . '</div><a href = "#" class = "media-upload button">' . t('Upload Image') .'</a><a href = "#" class = "media-remove button">' . t('Remove Image') .'</a>'
    );
    // Added only to save the old image attribute
    if(isset($attrs['image']) && !isset($attrs['image_fid']) && !$attrs['image_fid']) {
        $form['image'] = array(
            '#type' => 'textfield',
            '#default_value' => $attrs['image'],
            '#attributes' => array('class' => array('hidden fid-old-field'))
        );
    }
    return $form;
}
function progressive_shortcodes_shortcode_quote($attrs, $text) {
    if(isset($attrs['blockquote']) && $attrs['blockquote']) {
        $output = '<blockquote ' . _progressive_shortcodes_shortcode_attributes($attrs) . '>
      <p>' . $text . ' </p>
      ' . ($attrs['author'] ? '<small>' . $attrs['author'] . '</small>' : '') . '
    </blockquote>';
    }
    else {
        $attrs['class'] = (isset($attrs['class']) ? $attrs['class'] : '') . ' quote centered';
        if(isset($attrs['image']) && $attrs['image']) {
            $img = $attrs['image'];
        }
        elseif(isset($attrs['image_fid']) && $attrs['image_fid']) {
            $file = file_load($attrs['image_fid']);
            $img = isset($file->uri) ? $file->uri : '';
        }
        $h = isset($img) ? '4' : '2';
        $img = isset($img) ? theme('image', array('path' => $img)) : '';
        $output = '<div ' . _progressive_shortcodes_shortcode_attributes($attrs) . '>
      ' . $img . '
      <h' . $h . '><i class="fa fa-quote-left highlight"></i> ' . $text . ' <i class="fa fa-quote-right highlight"></i></h' . $h . '>
      <p class="label label-primary">' . $attrs['author'] . '</p>
    </div>';
    }
    return $output;
}

function progressive_shortcodes_shortcode_quote_tip($format, $long) {
    $output = array();
    $output[] = '<p>All elements supports <strong>class</strong>, <strong>animation</strong> and <strong>delay</strong> attributes. Supports all <a href = "http://daneden.github.io/animate.css/">animation.css</a> values. Delay value in ms. ';
    $output[] = '<p><strong>Quote:</strong><br/>[quote author = "Author Name" image = "/files/author.png" blockquote]text[/quote]</br>';
    $output[] = '<strong>blockquote</strong> - Simple left aligned quote with author name, <strong>image</strong> - URL to the image.</p>';
    return implode(' ', $output);
}