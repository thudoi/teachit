# MailChip Rules
Minimalistic MailChimp integration for rules.

This modules provides a [MailChimp](http://mailchimp.com/) integration for 
drupal via [rules](https://www.drupal.org/project/rules).
There is currently one condition to check if a mail is already subscribed to the
a list, and two actions to subscribe a mail or a user to a list.

The action to subscribe users also allows to sync merge fields and the language.
There is also an alter hook in that action, to add additional parameters.


## Mailchimp module vs Mailchimp Rules
Mailchimp rules is a standalone module and doesn't depends on the 
[MailChimp](https://www.drupal.org/project/mailchimp) module.

The MailChimp module has a deeper integration and allows you to place sign up
blocks.

Compared to that, the MailChimp rules module only provides a few functions and
the rules actions and condition. It has therefore a more programmatic approach.

## Getting started
- Enable the module
- Go to /admin/config/services/mailchimp-rules and set your API key
- Create a new rule and add either the `Subscribe mail address to a mailchimp list` 
  or the `Subscribe a user to a MailChimp list` action.
