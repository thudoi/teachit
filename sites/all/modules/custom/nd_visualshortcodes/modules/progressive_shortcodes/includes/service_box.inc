<?php

function progressive_shortcodes_service_box_shortcode_info(&$shortcodes)
{
    $shortcodes['service_box'] = array(
        'title' => t('Service Box'),
        'description' => t('Service box with text.'),
        'process callback' => 'progressive_shortcodes_shortcode_servicebox',
        'tips callback' => 'progressive_shortcodes_shortcode_servicebox_tip',
        'process settings callback' => 'progressive_shortcodes_shortcode_servicebox_settings',
        'icon' => 'fa fa-star',
        'description_field' => 'title',
    );
}

function progressive_shortcodes_shortcode_servicebox($attrs, $text) {
    $icon_display = '';
    $attrs['class'] = 'services-box';
    $attrs['link'] = isset($attrs['link']) ? (strpos($attrs['link'], '#') === FALSE ? url($attrs['link']) : $attrs['link']) : '';
    $attrs['type'] = isset($attrs['type']) ? $attrs['type'] : 'center_big';
    $icon_display = isset($attrs['icon_display']) ? $attrs['icon_display'].' ' : '';
    $attrs['type_border']  = isset($attrs['type_border'])  ? $attrs['type_border'].' '  : '';
    $attrs['type_background'] = ($attrs['icon_display'] == 'background' && isset($attrs['type_background'])) ? $attrs['type_background'] : '';
    $attrs['border_icon_color'] =  isset($attrs['border_icon_color']) ? 'style="border-color:#'.$attrs['border_icon_color'].'"' : '';
    $attrs['background_icon_color'] = isset($attrs['background_icon_color']) ? 'style="background-color:#'.$attrs['background_icon_color'].'"' : '';


    $attrs['type_border'] = isset($attrs['type_border']) ? $attrs['type_border'] : '';
    $attrs['background_color'] = isset($attrs['type_background']) ? $attrs['type_background'] : '';
    $attrs['icon_color'] = isset($attrs['icon_color']) ? 'style="color:#'.$attrs['icon_color'].'"' : '';
    $attrs['inner_animation'] = isset($attrs['inner_animation'])  ? ' data-appear-animation="' . $attrs['inner_animation'] . '"' : '';
    $attrs['inner_icon_animation'] = isset($attrs['inner_icon_animation']) ? 'data-appear-animation="'.$attrs['inner_icon_animation'].'"' : '';
    $attrs['link_text'] = isset($attrs['link_text']) ? $attrs['link_text'] : t('Read More');

    if($attrs['type_services'] == 'image')
    {
        $attrs['class'] .= ' services-box-image';
        $filename = (isset($attrs['fid']) ? file_load($attrs['fid'])->uri : '');
        $text = '<div ' . _progressive_shortcodes_shortcode_attributes($attrs) . '>
        ' . (isset($attrs['icon']) ? '<div class="image" ' . $attrs['inner_icon_animation'] . '><img class="box-img" src='.file_create_url($filename).' alt="'.drupal_html_id('Services_box').'" /></div>' : '') . '
        ' . (isset($attrs['title']) ? '<h4 class="title" ' . $attrs['inner_animation'] . '>' . $attrs['title'] . '</h4>' : '') . '
        <div class="text-small" ' . $attrs['inner_animation'] . '>
          ' . $text . '
        </div>
        '.($attrs['link'] ? '<a class="btn btn-default" href = "' . $attrs['link'] . '">' . $attrs['link_text'] . '</a>' : '') .'
      </div>';
    }

    if($attrs['type_services'] == 'icon') {
        switch ($attrs['type']) {
            case 'left_small' :
            case 'left_medium':
            case 'left_big'   :
                $attrs['class'].= ' '.str_replace('_','-',$attrs['type']);
                if($attrs['icon_display'] == 'background') {
                    $text = '<div ' . _progressive_shortcodes_shortcode_attributes($attrs) . '>
                        <a class = "header-box" href = "' . $attrs['link'] . '">
                        ' . (isset($attrs['icon']) ? '<div '.$attrs['background_icon_color'].' class="pull-left text-center '.$icon_display . $attrs['type_border'] . '" ' . $attrs['inner_icon_animation'] . '><i '.$attrs['icon_color'] .' class="' . $attrs['icon'] . '"></i></div>' : '') . '</a>
                        <div class="des_text"' . $attrs['inner_animation'] . '>
                        ' . (isset($attrs['title']) ? '<h4 class="title" ' . $attrs['inner_animation'] . '>' . $attrs['title'] . '</h4>' : '') . '
                       
                          ' . $text . '
                        </div>
                      </div>';
                }
                if($attrs['icon_display'] == 'border'){
                    $text = '<div ' . _progressive_shortcodes_shortcode_attributes($attrs) . '>
                        <a class = "header-box" href = "' . $attrs['link'] . '">
                        ' . (isset($attrs['icon']) ? '<div ' . $attrs['border_icon_color'] . ' class="pull-left text-center '.$icon_display . $attrs['type_border'] . '"  ' . $attrs['inner_icon_animation'] . '><i '.$attrs['icon_color'] .' class="' . $attrs['icon'] . '"></i></div>' : '') . '      
                        </a>
                        <div class="des_text" ' . $attrs['inner_animation'] . '>
                          ' . (isset($attrs['title']) ? '<h4 class="title" ' . $attrs['inner_animation'] . '>' . $attrs['title'] . '</h4>' : '') . '  
                          ' . $text . '
                        </div>
                      </div>';
                }
                break;
            case 'center_big':
                $attrs['class'] = 'big-center' . (isset($attrs['class']) ? ' ' . $attrs['class'] : '');
                if($attrs['icon_display'] == 'background') {
                    $text = '<div ' . _progressive_shortcodes_shortcode_attributes($attrs) . '>
                        ' . (isset($attrs['icon']) ? '<div ' . $attrs['background_icon_color'] . '  class="big-icon ' . $icon_display . $attrs['type_background'] . '"' . $attrs['inner_icon_animation'] . '><i  ' . $attrs['icon_color'] . '  class="' . $attrs['icon'] . '"></i></div>' : '') . '
                        ' . (isset($attrs['title']) ? '<h4 class="title" ' . $attrs['inner_animation'] . '>' . $attrs['title'] . '</h4>' : '') . '
                        <div class="text-small" ' . $attrs['inner_animation'] . '>
                          ' . $text . '
                        </div>
                        ' . ($attrs['link'] ? '<a class="btn btn-default" href = "' . $attrs['link'] . '">' . $attrs['link_text'] . '</a>' : '') . '
                      </div>';
                }
                if($attrs['icon_display'] == 'border') {
                    $text = '<div ' . _progressive_shortcodes_shortcode_attributes($attrs) . '>
                        ' . (isset($attrs['icon']) ? '<div ' . $attrs['border_icon_color'] . '  class="big-icon ' . $icon_display . $attrs['type_border'] . '"' . $attrs['inner_icon_animation'] . '><i  ' . $attrs['icon_color'] . '  class="' . $attrs['icon'] . '"></i></div>' : '') . '
                        ' . (isset($attrs['title']) ? '<h4 class="title" ' . $attrs['inner_animation'] . '>' . $attrs['title'] . '</h4>' : '') . '
                        <div class="text-small" ' . $attrs['inner_animation'] . '>
                          ' . $text . '
                        </div>
                        ' . ($attrs['link'] ? '<a class="btn btn-default" href = "' . $attrs['link'] . '">' . $attrs['link_text'] . '</a>' : '') . '
                      </div>';
                }
                break;
        }
    }

    return $text;
}


function progressive_shortcodes_shortcode_servicebox_settings($attrs, $text) {

    $options = array('icon','image');
    $form['type_services'] = array(
        '#type' => 'select',
        '#title' => t('Type'),
        '#options' => drupal_map_assoc($options),
        '#default_value' => isset($attrs['type_services']) ? $attrs['type_services'] : 'icon',
        '#attributes' => array('class' => array('form-control  service-box-type')),
        '#prefix' => '<div class="row"><div class="col-sm-6">'

    );

    $filename = (isset($attrs['fid']) ? file_load($attrs['fid'])->uri : '');
    $image = $filename ? theme('image_style', array('style_name' => 'media_thumbnail', 'path' => $filename)) : '';
    $form['container']['fid'] = array(
        '#type' => 'textfield',
        '#title' => t('Image'),
        '#default_value' => isset($attrs['fid']) ? $attrs['fid'] : '',
        '#attributes' => array('class' => array('image-media-upload hidden')),
        '#field_suffix' => '<div class = "preview-image">' . $image . '</div><a href = "#" class = "media-upload button">' . t('Upload Image') .'</a><a href = "#" class = "media-remove button">' . t('Remove Image') .'</a>',
        '#states' => array(
            'visible' => array(
                '.service-box-type' => array('value' => 'image'),
            ),
        ),
        '#prefix' => '</div><div class="col-sm-6">',
        '#suffix' => '</div></div>'
    );

    $form['icon_display'] = array(
        '#type' => 'select',
        '#title' => t('Display'),
        '#options' => drupal_map_assoc(array('background','border')),
        '#default_value' => isset($attrs['icon_display']) ? $attrs['icon_display'] : 'border',
        '#states' => array(
            'visible' => array(
                '.service-box-type' => array('value' => 'icon'),
            ),
        ),
        '#attributes' => array('class' => array('form-control  icon_display')),
        '#prefix'=> '<div class="row"><div class="col-sm-3">'
    );
    $form['type_border'] = array(
        '#type' => 'select',
        '#title' => t('Type border'),
        '#options' => drupal_map_assoc(array('circle','square')),
        '#default_value' => isset($attrs['type_border']) ? $attrs['type_border'] : 'circle',
        '#states' => array(
            'visible' => array(
                '.service-box-type' => array('value' => 'icon'),
                '.icon_display' => array('value' => 'border'),
            ),
        ),
        '#attributes' => array('class' => array('form-control')),
        '#prefix' => '</div><div class="col-sm-3">'
    );
    $form['border_icon_color'] = array(
        '#type' => 'textfield',
        '#title' => t('Border color'),
        '#attributes' => array('class' => array('form-control colorpicker-enable')),
        '#default_value' => isset($attrs['border_icon_color']) ? $attrs['border_icon_color'] : '',
        '#states' => array(
            'visible' => array(
                '.service-box-type' => array('value' => 'icon'),
                '.icon_display' => array('value' => 'border'),
            ),
        ),
        '#prefix' => '</div><div class="col-sm-3">',
        '#suffix' => '</div></div>'
    );

    $form['background_icon_color'] = array(
        '#type' => 'textfield',
        '#title' => t('Background color'),
        '#attributes' => array('class' => array('form-control colorpicker-enable')),
        '#default_value' => isset($attrs['background_icon_color']) ? $attrs['background_icon_color'] : '',
        '#states' => array(
            'visible' => array(
                '.service-box-type' => array('value' => 'icon'),
                '.icon_display' => array('value' => 'background'),
            ),
        ),
        '#prefix' => '<div class="row"><div class="col-sm-6">'
    );
    $form['type_background'] = array(
        '#type' => 'select',
        '#title' => t('Type Background'),
        '#options' => drupal_map_assoc(array('circle','square')),
        '#default_value' => isset($attrs['type_background']) ? $attrs['type_background'] : 'circle',
        '#states' => array(
            'visible' => array(
                '.service-box-type' => array('value' => 'icon'),
                '.icon_display' => array('value' => 'background'),
            ),
        ),
        '#attributes' => array('class' => array('form-control')),
        '#prefix' => '</div><div class="col-sm-6">',
        '#suffix' => '</div></div>'
    );

    $form['title'] = array(
        '#type' => 'textfield' ,
        '#title' => t('Title'),
        '#default_value' => isset($attrs['title']) ? $attrs['title'] : '',
        '#attributes' => array('class' => array('form-control')),
        '#prefix' => '<div class="row"><div class="col-sm-6">'
    );
    $form['link'] = array(
        '#type' => 'textfield' ,
        '#title' => t('Link'),
        '#default_value' => isset($attrs['link']) ? $attrs['link'] : '',
        '#attributes' => array('class' => array('form-control')),
        '#prefix' => '</div><div class="col-sm-6">',
        '#suffix' => '</div></div>'
        );
    $types = array('left_small' => t('Left Small'), 'left_medium' => t('Left Medium'), 'left_big' => t('Left Big'), 'center_big' => t('Center Big'));
    $form['type'] = array(
        '#title' => t('Icon Type'),
        '#type' => 'select',
        '#options' => $types,
        '#default_value' => isset($attrs['type']) ? $attrs['type'] : 'center_big',
        '#attributes' => array('class' => array('form-control type-icon-select')),
        '#states' => array(
            'visible' => array(
                '.service-box-type' => array('value' => 'icon'),
            ),
        ),
        '#prefix' => '<div class="row"><div class="col-sm-4">'
    );
    $form['icon'] = array(
        '#title' => t('Icon'),
        '#type' => 'textfield',
        '#autocomplete_path' => 'admin/ajax/nd_visualshortcodes/icons_autocomplete/all',
        '#default_value' => isset($attrs['icon']) ? $attrs['icon'] : '',
        '#attributes' => array('class' => array('form-control')),
        '#states' => array(
            'visible' => array(
                '.service-box-type' => array('value' => 'icon'),
            ),
        ),
        '#prefix' => '</div><div class="col-sm-4">',
    );
    $form['icon_color'] = array(
        '#type' => 'textfield',
        '#title' => t('Color icon'),
        '#default_value' => isset($attrs['icon_color']) ? $attrs['icon_color'] : '',
        '#states' => array(
            'visible' => array(
                '.service-box-type' => array('value' => 'icon'),
            ),
        ),
        '#attributes' => array('class' => array('form-control colorpicker-enable')),
        '#prefix' => '</div><div class="col-sm-4">',
        '#suffix' => '</div></div>'
    );
    $form['link_text'] = array(
        '#type' => 'textfield' ,
        '#title' => t('Read More text'),
        '#default_value' => isset($attrs['link_text']) ? $attrs['link_text'] : '',
        '#attributes' => array('class' => array('form-control')),
        '#states' => array(
            'visible' => array(
                '.type-icon-select' => array('value' => 'center_big'),
            ),
        ),
        '#prefix' => '<div class="row"><div class="col-sm-6">'
    );
    $form['inner_animation'] = array(
        '#type' => 'select',
        '#title' => t('Content Animation'),
        '#options' => _nd_visualshortcodes_list_animations(),
        '#default_value' => isset($attrs['inner_animation']) ? $attrs['inner_animation'] : '',
        '#attributes' => array('class' => array('form-control')),
        '#prefix' => '</div><div class="col-sm-6">',
        '#suffix' => '</div></div>'

    );
    $form['inner_icon_animation'] = array(
        '#type' => 'select',
        '#title' => t('Icon/Image Animation'),
        '#options' => _nd_visualshortcodes_list_animations(),
        '#default_value' => isset($attrs['inner_icon_animation']) ? $attrs['inner_icon_animation'] : '',
        '#attributes' => array('class' => array('form-control'))
    );
    return $form;
}