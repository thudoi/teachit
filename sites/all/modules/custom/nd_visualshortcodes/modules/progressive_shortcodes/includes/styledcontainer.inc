<?php

function progressive_shortcodes_styledcontainer_shortcode_info(&$shortcodes)
{
    $shortcodes['styledcontainer'] = array(
        'title' => t('Frame Container'),
        'description' => t('Styled Container'),
        'process callback' => 'progressive_shortcodes_shortcode_styledcontainer',
        'process settings callback' => 'progressive_shortcodes_shortcode_styledcontainer_settings',
        'icon' => 'fa fa-strikethrough',
        'description_field' => 'type',
    );
}
function progressive_shortcodes_shortcode_styledcontainer($attrs, $text) {
    $attrs['class'] = isset($attrs['class']) ? ' ' . $attrs['class'] : '';
    $attrs['class'] .= isset($attrs['type']) ? ' ' . $attrs['type'] : '';
    $attrs['class'] .= isset($attrs['border']) ? ' ' . $attrs['border'] : '';
    $attrs['class'] .= isset($attrs['shadow']) ? ' ' . $attrs['shadow'] : '';
    if(isset($attrs['degree']) && $attrs['degree']) {
        $wrap_attrs = array();
        foreach(array('-webkit-', '-moz-', '-ms', '-o-', '') as $suffix) {
            $wrap_attrs['style'] = (isset($attrs['styles']) ? $attrs['styles'] . ' ' : ' ') . $suffix . 'transform: rotate(' . $attrs['degree'] . 'deg);';
        }
    }
    $overlay = isset($attrs['overlay']) && $attrs['overlay'] ? '<div class="overlay"></div>' : '';
    if(isset($attrs['background_image']) && $attrs['background_image'] && in_array($attrs['background'], array('fixed', 'static', 'paralax', 'blur'))) {
        $attrs['class'] .= ' full-width-box';
        if(isset($attrs['background']) && $attrs['background'] == 'static') {
            $inner_attrs = array(
                'style_background_image' => $attrs['background_image']
            );
           // $attrs['class']['style_background_image'] = $attrs['class']['background_image'];
            $text = '<div class="fwb-bg fwb-' . $attrs['background'] . '" ' . _progressive_shortcodes_shortcode_attributes($inner_attrs) . '>' . $overlay . '</div>' . $text;
        }
        if(isset($attrs['background']) && $attrs['background'] == 'fixed') {
            $inner_attrs = array(
                'style_background_image' => $attrs['background_image']
            );
            $text = '<div class="fwb-bg fwb-' . $attrs['background'] . '" ' . _progressive_shortcodes_shortcode_attributes($inner_attrs) . '>' . $overlay . '</div>' . $text;
        }
        if(isset($attrs['background']) && $attrs['background'] == 'paralax') {
            $inner_attrs = array(
                'data-stellar-background-ratio' => isset($attrs['stellar_background_ratio']) ? $attrs['stellar_background_ratio'] : '0.5',
                'style_background_image' => $attrs['background_image']
            );
            $text = '<div class="fwb-bg fwb-' . $attrs['background'] . '" ' . _progressive_shortcodes_shortcode_attributes($inner_attrs) . '>' . $overlay . '</div>' . $text;
        }
        if(isset($attrs['background']) && $attrs['background'] == 'blur') {
            $file = file_load($attrs['background_image']);
            $file_url  = file_create_url($file->uri);
            $inner_attrs = array(
                'data-blur-amount' => isset($attrs['blur_amount']) ? $attrs['blur_amount'] : '2',
                'data-blur-image' => isset($file_url) ? $file_url : '',
            );
            $text = '<div class="fwb-bg fwb-' . $attrs['background'] . '" ' . _progressive_shortcodes_shortcode_attributes($inner_attrs) . '>' . $overlay . '</div>' . $text;
        }
    }
    if(isset($attrs['background']) && $attrs['background'] == 'video' && isset($attrs['video']) && $attrs['video']) {
        static $video_id = 999;
        $attrs['class'] = 'full-width-box';
        $attrs['data-stellar-background-ratio'] = isset($attrs['stellar_background_ratio']) ? $attrs['stellar_background_ratio'] : '0.5';
        $attrs['id'] = 'wrap-' . ++$video_id;
        $text = '<a class="player" data-property="{videoURL: \'' . $attrs['video'] . '\', containment:\'#' . $attrs['id'] . '\', autoPlay:true, showControls:true, loop:true, mute:true, startAt:0, opacity:1, addRaster:false}"></a>' . $overlay . $text;
        drupal_add_js(drupal_get_path('module', 'nd_visualshortcodes') . '/js/jquery.mb.YTPlayer.js');
        drupal_add_css(drupal_get_path('module', 'nd_visualshortcodes') . '/css/YTPlayer.css');
    }
    $output = '<div ' . _progressive_shortcodes_shortcode_attributes($attrs) . '>' . $text . '</div>';
    if(isset($wrap_attrs)) {
        $output = '<div ' . _progressive_shortcodes_shortcode_attributes($wrap_attrs) . '>' . $output . '</div>';
    }
    return $output;
}

function progressive_shortcodes_shortcode_styledcontainer_settings($attrs, $text) {
    $types = array('content-block' => t('Container'), 'frame-padding' => t('Frame'), '' => t(' - No Paddings - '));
    $form['type'] = array(
        '#type' => 'select',
        '#title' => t('Padding type'),
        '#options' => $types,
        '#default_value' => isset($attrs['type']) ? $attrs['type'] : 'content-block',
        '#attributes' => array('class' => array('form-control')),
        '#prefix' => '<div class = "row"><div class = "col-sm-6">',
    );

    $border = array('' => t(' - None - '), 'frame' => t('Border'), 'frame border-radius' => t('Border with Radius'));
    $form['border'] = array(
        '#type' => 'select',
        '#title' => t('Border'),
        '#options' => $border,
        '#default_value' => isset($attrs['border']) ? $attrs['border'] : '',
        '#attributes' => array('class' => array('form-control')),
        '#prefix' => '</div><div class = "col-sm-6">',
        '#suffix' => '</div></div>',
    );

    $shadows = array('' => t(' - None - '), 'frame-shadow' => t('Shadow'), 'frame-shadow-lifted' => t('Shadow Lifted'), 'frame-shadow-raised' => t('Shadow Raised'), 'frame-shadow-curved' => t('Shadow Curved'));
    $form['shadow'] = array(
        '#type' => 'select',
        '#title' => t('Shadow'),
        '#options' => $shadows,
        '#default_value' => isset($attrs['shadow']) ? $attrs['shadow'] : '',
        '#attributes' => array('class' => array('form-control')),
        '#prefix' => '<div class = "row"><div class = "col-sm-6">',
    );
    $form['degree'] = array(
        '#type' => 'textfield' ,
        '#title' => t('Rotate Degree'),
        '#default_value' => isset($attrs['degree']) ? $attrs['degree'] : '',
        '#description' => t('Any degree value, for example: -90'),
        '#attributes' => array('class' => array('form-control')),
        '#prefix' => '</div><div class = "col-sm-6">',
        '#suffix' => '</div></div>',
    );
    $bgs = array('' => t(' - None - '), 'static' => t('Static Image'), 'fixed' => t('Fixed'), 'paralax' => t('Parallax'), 'blur' => t('Blurred Image'), 'video' => t('Video'));
    $form['background'] = array(
        '#type' => 'select',
        '#title' => t('Advanced Background'),
        '#options' => $bgs,
        '#default_value' => isset($attrs['background']) ? $attrs['background'] : '',
        '#attributes' => array('class' => array('form-control background-select'))
    );
    $form['overlay'] = array(
        '#type' => 'checkbox' ,
        '#title' => t('Overlay'),
        '#default_value' => isset($attrs['overlay']) ? $attrs['overlay'] : '',
        '#states' => array(
            'visible' => array(
                '.background-select, abcd' => array('!value' => ''),
                '.background-select, abc' => array('!value' => 'static'),
            ),
        )
    );
    $form['video'] = array(
        '#type' => 'textfield',
        '#title' => t('Video URL'),
        '#default_value' => isset($attrs['video']) ? $attrs['video'] : '',
        '#states' => array(
            'visible' => array(
                '.background-select' => array('value' => 'video'),
            ),
        ),
        '#attributes' => array('class' => array('form-control'))
    );
    $filename = isset($attrs['background_image']) && !empty($attrs['background_image']) ? file_load($attrs['background_image'])->uri : '';
    $image = $filename ? theme('image_style', array('style_name' => 'media_thumbnail', 'path' => $filename)) : '';
    $form['background_image'] = array(
        '#type' => 'textfield',
        '#title' => t('Image'),
        '#default_value' => isset($attrs['background_image']) ? $attrs['background_image'] : '',
        '#attributes' => array('class' => array('image-media-upload hidden')),
        '#field_suffix' => '<div class = "preview-image">' . $image . '</div><a href = "#" class = "media-upload button">' . t('Upload Image') .'</a><a href = "#" class = "media-remove button">' . t('Remove Image') .'</a>',
        '#states' => array(
            'visible' => array(
                '.background-select, abc' => array('!value' => ''),
                '.background-select, abcd' => array('!value' => 'video'),
            ),
        ),
        '#suffix' => '<div class = "clearfix"></div>'
    );
    $form['stellar_background_ratio'] = array(
        '#type' => 'textfield',
        '#title' => t('Stellar ratio'),
        '#default_value' => isset($attrs['stellar_background_ratio']) ? $attrs['stellar_background_ratio'] : '',
        '#attributes' => array('class' => array('form-control')),
        '#states' => array(
            'visible' => array(
                '.background-select, ab' => array('!value' => ''),
                '.background-select, abc' => array('!value' => 'static'),
                '.background-select, abcd' => array('!value' => 'fixed'),
                '.background-select, abcde' => array('!value' => 'blur'),
            ),
        ),
        '#description' => t('Default value: 0.5')
    );
    $form['blur_amount'] = array(
        '#type' => 'textfield',
        '#title' => t('Blur Amount'),
        '#default_value' => isset($attrs['blur_amount']) ? $attrs['blur_amount'] : '',
        '#states' => array(
            'visible' => array(
                '.background-select' => array('value' => 'blur'),
            ),
        ),
        '#description' => t('Default value: 2')
    );
    return $form;
}