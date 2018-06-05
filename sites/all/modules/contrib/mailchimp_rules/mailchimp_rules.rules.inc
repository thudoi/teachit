<?php

/**
 * @file
 * Rules integration for the mailchimp_rules module.
 */

/**
 * Implements hook_rules_condition_info().
 */
function mailchimp_rules_rules_condition_info() {
  $items = array();

  $items['mailchimp_rules_mail_is_subscribed'] = array(
    'label' => t('Is a mail subscribed to list'),
    'parameter' => array(
      'list' => array(
        'type' => 'text',
        'label' => t('MailChimp list'),
        'description' => t('Select an existing MailChimp list from your account'),
        'options list' => 'mailchimp_rules_list_names',
      ),
      'mail' => array(
        'type' => 'text',
        'label' => t('Mail address'),
        'description' => t('The mail address to subscribe to the list'),
        'default mode' => 'selector',
      ),
    ),
    'group' => t('MailChimp Rules'),
    'base' => 'mailchimp_rules_rules_condition_mail_is_subscribed',
  );

  return $items;
}

/**
 * Implements hook_rules_action_info().
 */
function mailchimp_rules_rules_action_info() {
  $items = array();

  $items['mailchimp_rules_mail_subscribe'] = array(
    'label' => t('Subscribe a mail to a MailChimp list'),
    'parameter' => array(
      'list' => array(
        'type' => 'text',
        'label' => t('MailChimp list'),
        'description' => t('Select an existing MailChimp list from your account'),
        'options list' => 'mailchimp_rules_list_names',
      ),
      'mail' => array(
        'type' => 'text',
        'label' => t('Mail address'),
        'description' => t('The mail address to subscribe to the list'),
        'default mode' => 'selector',
      ),
    ),
    'group' => t('MailChimp Rules'),
    'base' => 'mailchimp_rules_rules_action_mail_subscribe_list',
  );

  $items['mailchimp_rules_mail_unsubscribe'] = array(
    'label' => t('Unsubscribe a mail from a MailChimp list'),
    'parameter' => array(
      'list' => array(
        'type' => 'text',
        'label' => t('MailChimp list'),
        'description' => t('Select an existing MailChimp list from your account'),
        'options list' => 'mailchimp_rules_list_names',
      ),
      'mail' => array(
        'type' => 'text',
        'label' => t('Mail address'),
        'description' => t('The mail address which should be unsubscribed.'),
        'default mode' => 'selector',
      ),
    ),
    'group' => t('MailChimp Rules'),
    'base' => 'mailchimp_rules_rules_action_mail_unsubscribe_list',
  );

  $items['mailchimp_rules_mail_unsubscribe_all'] = array(
    'label' => t('Unsubscribe a mail from all MailChimp lists'),
    'parameter' => array(
      'mail' => array(
        'type' => 'text',
        'label' => t('Mail address'),
        'description' => t('The mail address which should be unsubscribed.'),
        'default mode' => 'selector',
      ),
    ),
    'group' => t('MailChimp Rules'),
    'base' => 'mailchimp_rules_rules_action_mail_unsubscribe_all_lists',
  );

  $items['mailchimp_rules_user_subscribe'] = array(
    'label' => t('Subscribe a user to a MailChimp list'),
    'parameter' => array(
      'list' => array(
        'type' => 'text',
        'label' => t('MailChimp list'),
        'description' => t('Select an existing MailChimp list from your account'),
        'options list' => 'mailchimp_rules_list_names',
      ),
      'user' => array(
        'type' => 'user',
        'label' => t('User'),
        'description' => t('The user which should subscribe to the list'),
        'default mode' => 'selector',
      ),
      'merge_fields' => array(
        'type' => 'list<text>',
        'label' => t('Merge fields'),
        'description' => t("For each line you can enter a merge field in the form of 'merge_field': '[replacement_pattern]'. You can view the merge field tags in the settings for the selected list."),
        'restriction' => 'input',
        'optional' => TRUE,
      ),
      'language' => array(
        'type' => 'text',
        'label' => t('Language'),
        'description' => t("The language for the user, which should be subscribed."),
        'optional' => TRUE,
        'allow null' => TRUE,
        'default value' => language_default()->language,
      )
    ),
    'optional' => TRUE,
    'group' => t('MailChimp Rules'),
    'base' => 'mailchimp_rules_rules_action_user_subscribe_list',
  );

  return $items;
}

/**
 * Returns all the available MailChimp lists for the rules.
 */
function mailchimp_rules_list_names(RulesPlugin $element, $param_name) {
  return mailchimp_rules_retrieve_lists();
}

/**
 * Callback for the mail is subscribed condition.
 */
function mailchimp_rules_rules_condition_mail_is_subscribed($list, $mail) {
  return mailchimp_rules_mail_is_subscribed($list, $mail);
}

/**
 * Callback to subscribe an email address to a MailChimp list.
 */
function mailchimp_rules_rules_action_mail_subscribe_list($list, $mail) {
  mailchimp_rules_subscribe_mail($list, $mail);
}

/**
 * Callback to unsubscribe an email address from a MailChimp list.
 */
function mailchimp_rules_rules_action_mail_unsubscribe_list($list, $mail) {
  mailchimp_rules_unsubscribe_mail($list, $mail);
}

/**
 * Callback to unsubscribe an email address from all MailChimp lists.
 */
function mailchimp_rules_rules_action_mail_unsubscribe_all_lists($mail) {
  mailchimp_rules_unsubscribe_mail_all_lists($mail);
}

/**
 * Callback to subscribe an user to a MailChimp list.
 */
function mailchimp_rules_rules_action_user_subscribe_list($list, $account, $merge_fields = array(), $language = NULL) {
  $fields = array();
  foreach ($merge_fields as $line) {
    if (!empty($line)) {
      $parts = array();
      // Fields should have to json like format 'key': 'value' where, the key is
      // the merge field tag/name and value is the value the should be used for
      // the merge key. Ignore any spaces around the apostrophes.
      preg_match("/^\s*'(.*)':\s*'(.*)'\s*$/", $line, $parts);

      // Save the merge field only if we have a key and a value.
      if (count($parts) == 3) {
        $fields[$parts[1]] = $parts[2];
      }
    }
  }

  if (!empty($fields)) {
    $parameters['merge_fields'] = $fields;
  }

  if (isset($language) &&  $language != LANGUAGE_NONE) {
    // todo: Mailchimp has its own language list:
    // http://kb.mailchimp.com/lists/managing-subscribers/view-and-edit-subscriber-languages?utm_source=mc-api&utm_medium=docs&utm_campaign=apidocs
    // For now we don't care about that and just send the first two characters,
    // which is enough for most languages. Patches are welcome to fix this
    // properly.
    $parameters['language'] = substr($language, 0, 2);
  }

  drupal_alter('mailchimp_rules_user_subscribe_list_parameters', $parameters, $list, $account);

  mailchimp_rules_subscribe_mail($list, $account->mail, $parameters);
}
