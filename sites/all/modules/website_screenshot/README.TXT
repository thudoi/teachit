INTRODUCTION
------------

The main goal of this project is to easily integrate screenshots of websites and
web pages (URLs) into your Drupal site, utilizing various other modules to extend
the functionality and power of this one.

REQUIREMENTS
------------

No special requirements.

RECOMMENDED MODULES
-------------------

 * Markdown filter (https://www.drupal.org/project/markdown):
   When enabled, display of the project's README.md help will be rendered
   with markdown.
 * Colorbox or Lightbox2 module if you want to show screenshots in a lightbox.

INSTALLATION
------------

Install as you would normally install a contributed Drupal module. See:
https://drupal.org/documentation/install/modules-themes/modules-7
for further information.

CONFIGURATION
-------------

 * Enable one of the Website screenshot engines (Shrinktheweb, Bluga or
   Thumbalizr) on modules' configuration page.
 * Configure selected engine on /admin/config/media/website_screenshot/.
 * Add field of type Website screenshot to any of your Content types.

SUPPORTED SCREENSHOT ENGINES
----------------------------

 * ShrinkTheWeb: https://shrinktheweb.com (Free -- upgrades optional)
 * Thumbalizr: http://www.thumbalizr.com (anonymous or with API Key)
 * Bluga: http://webthumb.bluga.net/home (with API Key).

SCREENSHOT API
--------------

Each screenshot engine should implement 4 functions:
 * wss_<engine name>_request($url) - this function perform the screenshot
   request to remote service.
    @param $url (string): The url to perform screenshoot
    @return (boolean):
     - TRUE (int) if the request is correctly performed
     - FALSE (0) if the request is not performed

 * wss_<engine_name>_status($url) - this function check the screenshot status to
   remote service.
    @param $url (string): The url to perform screenshoot
    @return (boolean):
     - TRUE (int) if the request is correctly performed
     - FALSE (0) if the request is not performed

 * wss_<engine name>_download($url) - this function download the screenshot from
   remote service.
    @param $url (string): The url to perform screenshot
    @return
     - TRUE (int) if the request is correctly performed
     - FALSE (0) if the request is not performed & message with some information

 * wss_<engine name>_request_refresh($url) - this function will be used in Batch
   process of refreshing all screenshots of all engines. So this function should
   send refresh request for one screenshot of a given URL. It'll be called for
   each screenshot of this engine. Engine developer should also implement engine
   refresh logic. For example, ShrinkTheWeb service receives screenshots via
   callback URL so this URL is created by ShrinkTheWeb engine.
    @param $url (string): The url to perform screenshoot
    @return (boolean):
     - TRUE (int) if the request is correctly performed
     - FALSE (0) if the request is not performed

MAINTAINERS
-----------

Current maintainers:
 * Dmitry Evdokimov - https://www.drupal.org/u/devdokimov
 * Brandon Elliott - https://www.drupal.org/u/puravida

This project has been sponsored by:
 * ShrinkTheWeb service: https://shrinktheweb.com