<?php

function progressive_shortcodes_video_shortcode_info(&$shortcodes)
{
    $shortcodes['video'] = array(
        'title' => t('Video Iframe'),
        'description' => t('Iframe adaptive video.'),
        'process callback' => 'progressive_shortcodes_shortcode_video',
        'process settings callback' => 'progressive_shortcodes_shortcode_video_settings',
        'process backend callback' => 'nd_visualshortcodes_backend_nochilds',
        'icon' => 'fa fa-video-camera',
        'tips callback' => 'progressive_shortcodes_shortcode_video_tip',
        'description_field' => 'url',
    );
}

function progressive_shortcodes_shortcode_video($attrs, $text) {
    $attrs['class'] = isset($attrs['class']) ? ' ' . $attrs['class'] : '';
    $attrs['url'] = isset($attrs['url']) && $attrs['url'] ? $attrs['url'] : $text;
    $iframe_attrs = (isset($attrs['width']) ? 'width="' . $attrs['width'] .'"' : '') . (isset($attrs['height']) ? ' height ="' . $attrs['height'] . '"' : '');
    if(!$iframe_attrs) {
        $attrs['class'] .= ' video-box';
    }
    if(strpos($attrs['url'], 'vimeo') !== FALSE) {
        $attrs['class'] .= ' vimeo';
        preg_match('|/(\d+)|', $attrs['url'], $matches);
        $video_url = '//player.vimeo.com/video/' . $matches[1] . '';
    }
    elseif(strpos($attrs['url'], 'youtube') !== FALSE) {
        $attrs['class'] .= ' youtube';
        $id = substr($attrs['url'], strpos($attrs['url'], '?v=') + 3);
        $video_url = '//www.youtube.com/embed/' . $id .'?showinfo=0&amp;wmode=opaque';
    }
    $text = '<div  ' . _progressive_shortcodes_shortcode_attributes($attrs)  . '>
    <iframe src="' . $video_url . '" ' . $iframe_attrs . '  frameborder="0" webkitallowfullscreen="" mozallowfullscreen="" allowfullscreen=""></iframe>
  </div>';
    return $text;
}

function progressive_shortcodes_shortcode_video_settings($attrs, $text) {
    $attrs['url'] = isset($attrs['url']) && $attrs['url'] ? $attrs['url'] : $text;
    $form['url'] = array(
        '#type' => 'textfield' ,
        '#title' => t('Video Url'),
        '#default_value' => isset($attrs['url']) ? $attrs['url'] : '',
        '#attributes' => array('class' => array('form-control')),
        '#description' => t('Supports: YouTube and Vimeo')
    );
    $form['width'] = array(
        '#type' => 'textfield' ,
        '#title' => t('Width'),
        '#default_value' => isset($attrs['width']) ? $attrs['width'] : '',
        '#attributes' => array('class' => array('form-control')),
        '#prefix' => '<div class = "row"><div class = "col-sm-6">',
    );
    $form['height'] = array(
        '#type' => 'textfield' ,
        '#title' => t('Height'),
        '#default_value' => isset($attrs['height']) ? $attrs['height'] : '',
        '#attributes' => array('class' => array('form-control')),
        '#prefix' => '</div><div class = "col-sm-6">',
        '#suffix' => '</div></div>',
    );
    return $form;
}

function progressive_shortcodes_shortcode_video_tip($format, $long) {
    $output = array();
    $output[] = '<p><strong>Video iFrame:</strong><br/>[video]player.vimeo.com/video/7449107[/video]</br>';
    $output[] = '<strong>Text</strong> - Embed URL of the video.</p>';
    return implode(' ', $output);
}