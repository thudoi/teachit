<?php

function superblog_form_system_theme_settings_alter(&$form,&$form_state, $form_id = NULL) {

    $logo_setting = '<img src="'.base_path().drupal_get_path('theme','superblog').'/theme-settings/image/logo_joomlavi.png" alt="Joomlavi"/>';
    drupal_add_css(drupal_get_path('theme','superblog').'/vendor/minicolors/jquery.minicolors.css',array('preprocess'=>false));
    drupal_add_js(drupal_get_path('theme','superblog').'/vendor/minicolors/jquery.minicolors.min.js',array('cache'=>false,'preprocess'=>false));
    drupal_add_css(base_path().drupal_get_path('theme','superblog').'/theme-settings/theme-settings.css',array('preprocess'=>false));
    drupal_add_js(drupal_get_path('theme','superblog').'/theme-settings/theme-settings.js',array('cache'=>false,'preprocess'=>false));
    // Get all themes.
    $themes = list_themes();
    // Get the current theme
    $active_theme = $GLOBALS['theme_key'];
    $form_state['build_info']['files'][] = str_replace("/$active_theme.info", '', $themes[$active_theme]->filename) . '/theme-settings.php';
    $form['superblog_settings'] = array(
        '#type' => 'vertical_tabs',
        '#prefix' =>'<div class="oss_vertical_tab"><div class="oss_bg_header">'.$logo_setting.'<span class="pull-right label-setting">'.t('Theme settings').'</div>',
        '#suffix' =>'</div>',
        '#weight' => -10,
        '#attributes' => array(
            'class' => array('vertical_settings')
        )
    );
    $form['drupal_core_settings'] = array(
        '#type' => 'fieldset',
        '#title' => 'Drupal core',
        '#group' => 'superblog_settings',
        '#weight' => 99,
        '#attributes' => array(
            'class' => array('drupal_core')
        )
    );
    $form['logo']['settings']['logo_mobile'] = array(
        '#type' => 'managed_file',
        '#title' => t('Upload Logo Mobile'),
        '#description' => t("If you don't have direct file access to the server, use this field to upload your logo mobile."),
        '#default_value' => variable_get('superblog_logo_mobile', ''),
        '#upload_location' => 'public://logo_mobile/',
        '#upload_validators' => array(
            'file_validate_extensions' => array('gif png jpg jpeg'),
        )
    );

    /** Move Core theme settings,Logo,Favicon to fieldset */
    $form['drupal_core_settings']['theme_settings'] = $form['theme_settings'];
    $form['drupal_core_settings']['logo'] = $form['logo'];
    $form['drupal_core_settings']['favicon'] = $form['favicon'];
    // Logo Mobile

    //Switcher Style
    $form['switcher_style'] = array(
        '#type' => 'fieldset',
        '#title' => t('Switcher Style'),
        '#group' => 'superblog_settings'
    );
    $form['switcher_style']['check_switch_style'] = array(
        '#type' => 'checkbox',
        '#title' => t('Check to show tool Switcher Style'),
        '#default_value' => theme_get_setting('check_switch_style'),
        '#prefix' => '<div class="default-checkboxs">',
        '#suffix' => '</div>'
    );

    $form['switcher_style']['font'] = array(
        '#type' => 'fieldset',
        '#title' => t('Font'),
        '#collapsible' => TRUE,
        '#collapsed' => FALSE,
    );
    $form['switcher_style']['font']['font_body'] = array(
        '#type' => 'select',
        '#title' => t('Font Body'),
        '#options' => array('none'=> '--none--','f1'=> 'Raleway','f2' => 'Roboto Slab','f3'=>'Open Sans','f4' => 'Oswald' , 'f5' => 'Lato', 'f6'=>'Montserrat','f7'=>'Source Sans Pro','f8' => 'PT Sans','f9' => 'Droid Serif'),
        '#default_value' => theme_get_setting('font_body'),
    );
    $form['switcher_style']['font']['font_menu'] = array(
        '#type' => 'select',
        '#title' => t('Font Menu'),
        '#options' => array('none'=> '--none--','f1'=> 'Raleway','f2' => 'Roboto Slab','f3'=>'Open Sans','f4' => 'Oswald' , 'f5' => 'Lato', 'f6'=>'Montserrat','f7'=>'Source Sans Pro','f8' => 'PT Sans','f9' => 'Droid Serif'),
        '#default_value' => theme_get_setting('font_menu'),
    );
    $form['switcher_style']['font']['font_title'] = array(
        '#type' => 'select',
        '#title' => t('Font Title'),
        '#options' => array('none'=> '--none--','f1'=> 'Raleway','f2' => 'Roboto Slab','f3'=>'Open Sans','f4' => 'Oswald' , 'f5' => 'Lato', 'f6'=>'Montserrat','f7'=>'Source Sans Pro','f8' => 'PT Sans','f9' => 'Droid Serif'),
        '#default_value' => theme_get_setting('font_title'),
    );



    for($i = 1 ; $i<=6;$i++){
        $colors['color-'.$i] = '<img src="'.base_path().drupal_get_path('theme','superblog').'/assets/css/colors/color-'.$i.'/thumbnail.jpg"/>';
    }
    $form['switcher_style']['color_default'] = array(
        '#type' => 'radios',
        '#title' => t('Color default theme'),
        '#options' => $colors,
        '#prefix' => '<div class="list_colors_settings">',
        '#suffix' => '</div>',
        '#default_value' => theme_get_setting('color_default'),
    );

    $layout_style = array(
        'body-wide' => '<span class="btn style-layout" >'.t('Wide').'</span>',
        'body-boxed' => '<span class="btn style-layout">'.t('Boxed').'</span>',
        'body-framed' => '<span class="btn style-layout">'.t('Framed').'</span>',
        'body-rounded' => '<span class="btn style-layout">'.t('Rounded').'</span>',
    );
    $form['switcher_style']['layout_style_default'] = array(
        '#type' => 'radios',
        '#title' => t('Layout Style'),
        '#options' => $layout_style,
        '#default_value' => theme_get_setting('layout_style_default'),
        '#prefix' => '<div class="list_style_layout">',
        '#suffix' => '</div>'
    );
    $form['switcher_style']['background'] = array(
        '#type' => 'fieldset',
        '#title' => t('Background'),
        '#collapsible' => TRUE,
        '#collapsed' => FALSE,
    );
    $form['switcher_style']['background']['check_type_background'] = array(
        '#type' => 'radios',
        '#title'=> t('Type Background'),
        '#options' => array('type-image'=> t('Background Image'),'type-color' => t('Background Color')),
        '#default_value' => theme_get_setting('check_type_background') ,
        '#prefix' => '<div class="default-radios">',
        '#suffix' => '</div>'

    );
    $form['switcher_style']['background']['background_color'] = array(
        '#type' => 'container',
        '#attributes' => array(),
         'background_color' => array(
            '#type' => 'textfield',
            '#default_value' => theme_get_setting('background_color'),
            '#attributes' => array(
                'class' => array('minicolors'),
            ),
         ),
        '#states' => array(
            'visible' => array(
               ':input[name="check_type_background"]' => array('value' => 'type-color'),
            ),

        ),
    );

    for($i = 0 ; $i <= 23 ; $i++){
        $list_bg_default['body-bg-'.$i] = '<span class="body-bg body-bg-'.$i.'"></span>';
    }
    $form['switcher_style']['background']['background_image_default'] = array(
        '#type' => 'container',
        '#attributes' => array(),
        'background_image_default' => array(
            '#type' => 'radios',
            '#options' => $list_bg_default,
            '#default_value' => theme_get_setting('background_image_default'),
            '#prefix' => '<div class="list_bg_default">',
            '#suffix' => '</div>'
        ),
        '#states' => array(
            'visible' => array(
                ':input[name="check_type_background"]' => array('value' => 'type-image'),
            ),

        ),
    );
    // Page 404
    $form['page_404'] = array(
        '#type' => 'fieldset',
        '#title' => t('Page 404'),
        '#description' => t('Custom Page 404'),
        '#group' => 'superblog_settings',
    );
    $form['page_404']['supper_search_form'] = array(
        '#type' => 'checkbox',
        '#title' => t('Show Search Form'),
        '#default_value' => theme_get_setting('supper_search_form'),
        '#prefix' => '<div class="default-checkboxs">',
        '#suffix' => '</div>'
    );
    $bg_404 = file_load(variable_get('superblog_bg_404'));

    if(isset($bg_404)){
        $form['page_404']['thumnail_bg_404'] = array(
            '#type' => 'markup',
            '#theme' => 'image',
            '#path'  => $bg_404->uri,
            '#width' => '300',
            '#height' => '200',
            '#title'  => isset($bg_404->title) ? $bg_404->title : 'Background 404',
        );
    }
    $form['page_404']['superblog_bg_404'] = array(
        '#type' => 'managed_file',
        '#title' => t('Background 404'),
        '#description' => t('The uploaded background will be displayed on page 404.'),
        '#default_value' => variable_get('superblog_bg_404', ''),
        '#upload_location' => 'public://background_404/',
        '#upload_validators' => array(
            'file_validate_extensions' => array('gif png jpg jpeg'),
            // Pass the maximum file size in bytes
            'file_validate_size' => array(10 * 1024 * 1024),
        )
    );
    $form['page_404']['superblog_title_404'] = array(
        '#type' => 'textfield',
        '#title' => t('Title 404'),
        '#default_value' => theme_get_setting('superblog_title_404'),

    );
    $body_404 = theme_get_setting('superblog_body_404');
    $form['page_404']['superblog_body_404'] = array(
        '#type' => 'text_format',
        '#title' => t('Body'),
        '#default_value' => isset($body_404) ? $body_404['value'] : '',
        '#format' => isset($body_404) ? $body_404['format'] : 'plain_text',
    );


    //Portfolio
    $form['portfolio'] = array(
        '#type' => 'fieldset',
        '#title' => t('Portfolio'),
        '#group' => 'superblog_settings',
    );
    $form['portfolio']['portfolio_detail'] = array(
        '#type' => 'radios',
        '#title' => t('View portfolio default'),
        '#description' => t('If role permission account access "Bypass content access control" always default view "Page".Cause allow saw page for edit detail Portfolio'),
        '#options' => array('popup' => 'Popup','page' => 'Page'),
        '#default_value' => theme_get_setting('portfolio_detail'),
        '#prefix' => '<div class="default-radios">',
        '#suffix' => '</div>'
    );


    // Contact
    $form['contact'] = array(
        '#type' => 'fieldset',
        '#title' => t('Contact'),
        '#group' => 'superblog_settings',
    );
    $form['contact']['style_contact'] = array(
        '#type' => 'select',
        '#title' => t('Default Contact Style'),
        '#options' => array('contact-1'=>t('Contact 1'),'contact-2'=>t('Contact 2')),
        '#default_value' => theme_get_setting('style_contact')
    );
    $form['contact']['map_contact'] = array(
        '#type' => 'fieldset',
        '#title' => t('Google Map'),
        '#collapsible' => False,
        '#collapsed' => TRUE
    );
    $form['contact']['map_contact']['info_map'] = array(
        '#markup'=> '<div id="infoPanel">
                    <b>Marker status:</b>
                    <div id="markerStatus"><i>Click and drag the marker.</i></div>
                    <b>Current position:</b>
                    <div id="info"></div>
                   
                  </div>'
    );
     $form['contact']['map_contact']['address_map'] = array(
         '#type' => 'textfield',
         '#title' => t('Address Map'),
         '#description' => t('Input automatic search address map'),
         '#default_value' => theme_get_setting('address_map'),
         '#attributes' => array(
             'id' =>'map_auto_contact',
         ),
     );

    $longitude = variable_get('superblog_longitude_map','');
    $latitude =  variable_get('superblog_latitude_map','');

    $form['contact']['map_contact']['bt_map'] = array(
        '#markup'=>'<input class="form-submit" type="button" value="Geocode" onclick="codeAddress()">'
    );
    $form['contact']['map_contact']['latitude_map'] = array(
        '#type' => 'hidden',
        '#default_value' => $latitude,
        '#attributes' => array(
            'id' => 'latitude_map',
        )
    );
    $form['contact']['map_contact']['longitude_map'] = array(
        '#type' => 'hidden',
        '#default_value' => $longitude,
        '#attributes' => array(
            'id' => 'longitude_map'
        )
    );
     $form['contact']['map_contact']['show_map'] = array(
         '#type' => 'markup',
         '#markup' => '<div id="address_map_contact"></div>',
     );
    $icon_marker = file_load(variable_get('superblog_marker_map'));
    $form['contact']['map_contact']['marker_map'] = array(
        '#type' => 'managed_file',
        '#title' => t('Icon Maker'),
        '#description' => t('The uploaded image will be displayed marker map.'),
        '#default_value' => variable_get('superblog_marker_map', ''),
        '#upload_location' => 'public://marker_map/',
        '#upload_validators' => array(
            'file_validate_extensions' => array('gif png jpg jpeg'),
            // Pass the maximum file size in bytes
            'file_validate_size' => array(10 * 1024 * 1024),
        )
    );
    $infowindow = theme_get_setting('map_infowindow');
    $form['contact']['map_contact']['map_infowindow'] = array(
        '#type' => 'text_format',
        '#title' => t('Info Window Map'),
        '#default_value' => isset($infowindow['value']) ? $infowindow['value'] : '',
        '#format' => isset($infowindow['format']) ? $infowindow['format'] : 'plain_text',
    );
     $form['contact']['address_jv'] = array(
        '#type' => 'fieldset',
        '#title' => t('Address'),
        '#collapsible' => TRUE,
        '#collapsed' => TRUE
    );
    $form['contact']['address_jv']['address_icon'] = array(
        '#type' => 'textfield',
        '#title' => t('Icon Address'),
        '#autocomplete_path' => 'admin/ajax/nd_visualshortcodes/icons_autocomplete/all',
        '#default_value' => theme_get_setting('address_icon')
    );
    $address_body = theme_get_setting('address_body');
    $form['contact']['address_jv']['address_body'] = array(
        '#type' => 'text_format',
        '#title' => t('Address body'),
        '#default_value' => isset($address_body) ? $address_body['value'] : '',
        '#format' => isset($address_body) ? $address_body['format'] : 'plain_text',
    );

    $form['contact']['phone_jv'] = array(
        '#type' => 'fieldset',
        '#title' => t('Phone'),
        '#collapsible' => TRUE,
        '#collapsed' => TRUE
    );
    $form['contact']['phone_jv']['phone_icon'] = array(
        '#type' => 'textfield',
        '#title' => t('Icon Phone '),
        '#autocomplete_path' => 'admin/ajax/nd_visualshortcodes/icons_autocomplete/all',
        '#default_value' => theme_get_setting('phone_icon')
    );
    $phone_body = theme_get_setting('phone_body');
    $form['contact']['phone_jv']['phone_body'] = array(
        '#type' => 'text_format',
        '#title' => t('Phone body'),
        '#default_value' => isset($phone_body) ? $phone_body['value'] : '',
        '#format' => isset($phone_body) ? $phone_body['format'] : 'plain_text',
    );

    $form['contact']['email_jv'] = array(
        '#type' => 'fieldset',
        '#title' => t('Email'),
        '#collapsible' => TRUE,
        '#collapsed' => TRUE
    );
    $form['contact']['email_jv']['email_icon'] = array(
        '#type' => 'textfield',
        '#title' => t('Email Icon'),
        '#autocomplete_path' => 'admin/ajax/nd_visualshortcodes/icons_autocomplete/all',
        '#default_value' => theme_get_setting('email_icon')
    );
    $email_body = theme_get_setting('email_body');
    $form['contact']['email_jv']['email_body'] = array(
        '#type' => 'text_format',
        '#title' => t('Email body'),
        '#default_value' => isset($email_body) ? $email_body['value'] : '',
        '#format' => isset($email_body) ? $email_body['format'] : 'plain_text',
    );
    //drupal_add_js('https://maps.googleapis.com/maps/api/js?key=AIzaSyClPVhpfPttvi19c0pdDR8OCg3sKssqC5s&libraries=places&callback=initAutocomplete');
    $icon_marker->uri = file_create_url($icon_marker->uri);
    $infowindow['value'] = str_replace(array("\n", "\r"), '', $infowindow['value']);

    drupal_add_css(drupal_get_path('theme','superblog').'/theme-settings/autoaddress-map.css');
    drupal_add_js(drupal_get_path('theme','superblog').'/theme-settings/autoaddress-map.js',array('type'=>'file','cache'=>false,'scope'=>'footer'));
    drupal_add_js(array('superblog'=>array('superblog_longitude_map'=>$longitude,'superblog_latitude_map'=>$latitude,'marker'=>$icon_marker,'infowindow'=>$infowindow)),'setting');
    /** Unset  */
    unset($form['theme_settings']);
    unset($form['logo']);
    unset($form['favicon']);
    $form['#submit'][] = 'superblog_form_system_theme_settings_submit';
}

function superblog_form_system_theme_settings_submit(&$form,&$form_state){
    $values = $form_state['values'];

    if(isset($values['superblog_bg_404']))
    {
        _process_upload_img('superblog_bg_404',$values['superblog_bg_404']);
    }
    if(isset($values['longitude_map']) && isset($values['latitude_map'])){
        variable_set('superblog_longitude_map',$values['longitude_map']);
        variable_set('superblog_latitude_map',$values['latitude_map']);
    }
    if(isset($values['logo_mobile'])){
        _process_upload_img('superblog_logo_mobile',$values['logo_mobile']);
    }
    if(isset($values['marker_map'])){
        _process_upload_img('superblog_marker_map',$values['marker_map']);
    }
}

function _process_upload_img($set_variable,$value){
    if ($value != 0) {
        $file = file_load((int)$value);
        if (!empty($file->fid)) {
            variable_set($set_variable, $file->fid);
            file_usage_add($file, 'superblog', 'theme', $file->fid);
            $file->status = FILE_STATUS_PERMANENT;
            file_save($file);
        }
    } elseif ($value == 0) {
        $fid = (int)variable_get($set_variable);
        $file = file_load($fid);
        if (!empty($file)) {
            file_usage_delete($file, 'superblog', 'theme', $fid);
            file_delete($file, TRUE);
            drupal_set_message(t('Old Image removed.'));
        }
    }
}
