<?php

function progressive_shortcodes_team_shortcode_info(&$shortcodes){
    $shortcodes['team'] = array(
        'title' => t('Team'),
        'description' => t('Information for team'),
        'process callback' => 'progressove_shorcodes_shortcode_team',
        'process backend callback' => 'nd_visualshortcodes_backend_nochilds',
        'process settings callback' => 'progress_shortcodes_shortcode_team_settings',
        'icon' => 'icon-group2'
    );
}

function progressove_shorcodes_shortcode_team($attrs,$text){
    $attrs['class'] = 'jv_team item-inner';
    $filename = (isset($attrs['team_img']) ? file_load($attrs['team_img'])->uri : '');
    $image = '<div class="avatar"><img src="'.file_create_url($filename).'" alt="'.$attrs['team_name'].'" /></div>';
    $name = isset($attrs['team_name']) ? "<h4 class='title'>{$attrs['team_name']}</h4>" : '';
    $job  = isset($attrs['team_job'])  ? "<div class='excerpt'><p>{$attrs['team_job']}</p></div>" : '';
    $team_text = isset($attrs['team_text'])  ? "<p>{$attrs['team_text']}</p>" : '';
    $link_fb = isset($attrs['team_link_fb']) ? "<li><a href='{$attrs['team_link_fb']}'><i class='icon-facebook22'></i></a></li>" : '';
    $link_in = isset($attrs['team_link_in']) ? "<li><a href='{$attrs['team_link_in']}'><i class='icon-linkedin32'></i></a></li>" : '';
    $link_twitter = isset($attrs['team_link_twitter']) ? "<li><a href='{$attrs['team_link_twitter']}'><i class='icon-twitter22'></i></a></li>" : '';
    $description = '<div class="desc">'.$team_text.'<ul class="social-sm social-default social-effect social-color-border">'.$link_fb.$link_in.$link_twitter.'</ul></div>';
    $text = '<div '._progressive_shortcodes_shortcode_attributes($attrs).' >'.$image.'<div class="item-content">'.$name.$job.$description.'</div></div>';
    return $text;
}

function progress_shortcodes_shortcode_team_settings($attrs,$text){

    $filename = (isset($attrs['team_img']) ? file_load($attrs['team_img'])->uri : '');
    $image = $filename ? theme('image_style', array('style_name' => 'media_thumbnail', 'path' => $filename)) : '';
    $form['team_img'] = array(
        '#type'  => 'textfield',
        '#title' => 'Image',
        '#default_value' => isset($attrs['team_img']) ? $attrs['team_img'] : '',
        '#attributes' => array('class' => array('image-media-upload hidden')),
        '#field_suffix' => '<div class = "preview-image">' . $image . '</div><a href = "#" class = "media-upload button">' . t('Upload Image') .'</a><a href = "#" class = "media-remove button">' . t('Remove Image') .'</a></div>',
        '#prefix' => '<div class="row"><div class="col-sm-12">',
        '#suffix' => '</div>'
        );
    $form['team_name'] = array(
        '#type' => 'textfield',
        '#title' => t('Name'),
        '#default_value' => isset($attrs['team_name']) ? $attrs['team_name'] : '',
        '#attributes' => array('class' => array('form-control')),
        '#prefix' => '<div class="row"><div class="col-sm-6">',
    );
    $form['team_job'] = array(
        '#type' => 'textfield',
        '#title' => t('Job'),
        '#default_value' => isset($attrs['team_job']) ? $attrs['team_job'] : '',
        '#attributes' => array('class' => array('form-control')),
        '#prefix' => '</div><div class="col-sm-6">',
        '#suffix' => '</div></div>'
    );
    $form['team_text'] = array(
        '#type' => 'textarea',
        '#title' => t('Text'),
        '#default_value' => isset($attrs['team_text']) ? $attrs['team_text'] : '',
        '#attributes' => array('class' => array('form-control')),
    );
    $form['team_link_fb'] = array(
        '#type' => 'textfield',
        '#title' => 'Link Facebook',
        '#default_value' => isset($attrs['team_link_fb']) ? $attrs['team_link_fb'] : '',
        '#attributes' => array('class' => array('form-control')),
        '#prefix' => '<div class="row"><div class="col-sm-4">',
    );
    $form['team_link_in'] = array(
        '#type' => 'textfield',
        '#title' => 'Link LinkedIn',
        '#default_value' => isset($attrs['team_link_in']) ? $attrs['team_link_in'] : '',
        '#attributes' => array('class' => array('form-control')),
        '#prefix' => '</div><div class="col-sm-4">'
    );
    $form['team_link_twitter'] = array(
        '#type' => 'textfield',
        '#title' => 'Link Twitter',
        '#default_value' => isset($attrs['team_link_twitter']) ? $attrs['team_link_twitter'] : '',
        '#attributes' => array('class' => array('form-control')),
        '#prefix' => '</div><div class="col-sm-4">',
        '#suffix' => '</div></div>'
    );
    return $form;
}