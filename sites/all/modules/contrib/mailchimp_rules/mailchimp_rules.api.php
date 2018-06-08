<?php

/**
 * @file
 * This file contains no working PHP code; it exists to provide additional
 * documentation for doxygen as well as to document hooks in the standard
 * Drupal manner.
 */


/**
 * Alter the parameters of user that is about to be subscribed or updated.
 *
 * @param array $parameters
 *   An array of parameters, for example merge_fields, interest groups or
 *   language.
 * @param string $list
 *   The list id to which the user will be subscribed to.
 * @param string $account
 *   An user object containing the mail address which will subscribed.
 */
function hook_mailchimp_rules_user_subscribe_list_parameters_alter(&$parameters, &$list, &$account) {
  // Change parameters.
}
