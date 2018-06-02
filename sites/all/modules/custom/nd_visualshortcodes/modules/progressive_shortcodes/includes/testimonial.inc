<?php

function progressive_shortcodes_testimonial_shortcode_info(&$shortcodes)
{
    $shortcodes['testimonial'] = array(
        'title' => t('Testimonial'),
        'description' => t('Testimonial with image'),
        'process callback' => 'progressive_shortcodes_shortcode_testimonial',
        'process settings callback' => 'progressive_shortcodes_shortcode_testimonial_settings',
        'icon' => 'fa fa-comment',
        'process backend callback' => 'nd_visualshortcodes_backend_nochilds',
        'description_field' => 'author',
    );
}

function progressive_shortcodes_shortcode_testimonial($attrs, $text) {
    $attrs['class'] = 'testimonials-style1 ';

    $file = isset($attrs['image_fid']) && !empty($attrs['image_fid']) ? file_load($attrs['image_fid']) : '';
    $img = isset($file->uri) ? '<img src="'.file_create_url($file->uri).'" alt="'.$file->alt.'" />' : '';

    $author_info = isset($attrs['author_info']) ? '<p>'.$attrs['author_info'].'</p>' :'';
    $author = isset($attrs['author']) ? '<footer>'.$attrs['author'].'</footer>' : '';
    $quote_align = isset($attrs['quote_align']) ? $attrs['quote_align'] : '';
    $output = '<div class="item">
                <div class="avatar">'.$img.'</div>
                <div class="line-gradient-dark"></div>
                <div class="item-content '.$quote_align.'">
                    '.$author_info.'
                    '.$author.'
                </div>
                </div>';
    return '<div ' . _progressive_shortcodes_shortcode_attributes($attrs) . '>' . $output . '</div>';
}

function progressive_shortcodes_shortcode_testimonial_settings($attrs, $text) {

    $form['author'] = array(
        '#type' => 'textfield',
        '#title' => t('Author'),
        '#default_value' => isset($attrs['author']) ? $attrs['author'] : '',
        '#attributes' => array('class' => array('form-control')),
        '#prefix' => '<div class = "row"><div class = "col-sm-6">',
    );
    $form['author_info'] = array(
        '#type' => 'textfield',
        '#title' => t('Author info'),
        '#default_value' => isset($attrs['author_info']) ? $attrs['author_info'] : '',
        '#attributes' => array('class' => array('form-control')),
        '#prefix' => '</div><div class = "col-sm-6">',
        '#suffix' => '</div></div>'
    );
    $form['quote_align'] = array(
        '#type' =>'select',
        '#title' => t('Quote Align'),
        '#options' => array('icon-quote-left'=>'Left','icon-quote-right'=>'Right'),
        '#default_value' => isset($attrs['quote_align']) ? $attrs['quote_align'] : 'icon-quote-left',
        '#prefix' => '<div class="row"><div class="col-sm-6">',
        '#suffix' => '</div></div>'
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
    return $form;
}