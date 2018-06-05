<?php

/**
 * @file
 * Configuration file for Drupal's multi-site directory aliasing feature.
 *
 * This file allows you to define a set of aliases that map hostnames, ports, and
 * pathnames to configuration directories in the sites directory. These aliases
 * are loaded prior to scanning for directories, and they are exempt from the
 * normal discovery rules. See default.settings.php to view how Drupal discovers
 * the configuration directory when no alias is found.
 *
 * Aliases are useful on development servers, where the domain name may not be
 * the same as the domain of the live server. Since Drupal stores file paths in
 * the database (files, system table, etc.) this will ensure the paths are
 * correct when the site is deployed to a live server.
 *
 * To use this file, copy and rename it such that its path plus filename is
 * 'sites/sites.php'. If you don't need to use multi-site directory aliasing,
 * then you can safely ignore this file, and Drupal will ignore it too.
 *
 * Aliases are defined in an associative array named $sites. The array is
 * written in the format: '<port>.<domain>.<path>' => 'directory'. As an
 * example, to map http://www.drupal.org:8080/mysite/test to the configuration
 * directory sites/example.com, the array should be defined as:
 * @code
 * $sites = array(
 *   '8080.www.drupal.org.mysite.test' => 'example.com',
 * );
 * @endcode
 * The URL, http://www.drupal.org:8080/mysite/test/, could be a symbolic link or
 * an Apache Alias directive that points to the Drupal root containing
 * index.php. An alias could also be created for a subdomain. See the
 * @link http://drupal.org/documentation/install online Drupal installation guide @endlink
 * for more information on setting up domains, subdomains, and subdirectories.
 *
 * The following examples look for a site configuration in sites/example.com:
 * @code
 * URL: http://dev.drupal.org
 * $sites['dev.drupal.org'] = 'example.com';
 *
 * URL: http://localhost/example
 * $sites['localhost.example'] = 'example.com';
 *
 * URL: http://localhost:8080/example
 * $sites['8080.localhost.example'] = 'example.com';
 *
 * URL: http://www.drupal.org:8080/mysite/test/
 * $sites['8080.www.drupal.org.mysite.test'] = 'example.com';
 * @endcode
 *
 * @see default.settings.php
 * @see conf_path()
 * @see http://drupal.org/documentation/install/multi-site
 */

$sites = array(
  'teachit.test' => 'black',
  'spencer.teachit.media' => 'spencer',
  'johnwspencer.pro' => 'spencer',
  'johnwspencer.online' => 'spencer',
  'black.teachit.media' => 'black',
  'blackthoughts.today' => 'black',
  'ariannaspencer.com' => 'arianna',
  'arianna.teachit.media' => 'arianna',
  'brothers.teachit.media' => 'brothers',
  'thebrothersbrunch.com' => 'brothers',
  'bushfire.teachit.media' => 'bushfire',
  'obama.bushfiretheatre.org' => 'bushfire',
  '40th.bushfiretheatre.org' => 'bushfire',
  'dopedads.teachit.media' => 'dopedads',
  'wearedopedads.com' => 'dopedads',
  'hiphop.teachit.media' => 'hiphop',
  'iamreal.hiphop' => 'hiphop',
  'live.teachit.media' => 'live',
  'livelifeoutloud.today' => 'live',
  'offyear.teachit.media' => 'offyear',
  'offyear.org' => 'offyear',
  'sports.teachit.media' => 'sports',
  'oliver.teachit.media' => 'oliver',
  'oliverstwist.xyz' => 'oliver',
  'wtf.teachit.media' => 'wtf',
  'boldbeautiful.teachit.media' => 'boldbeautiful',
  'civics.teachit.education' => 'civics',
  'ela.teachit.education' => 'ela',
  'ell.teachit.education' => 'ell',
  'math.teachit.education' => 'math',
  'science.teachit.education' => 'science',
  'socialjustice.teachit.education' => 'socialjustice',
  'www.johnwspencer.online' => 'spencer',
  'www.johnwspencer.pro' => 'spencer',
  'www.blackthoughts.today' => 'black',
  'www.iamreal.hiphop' => 'hiphop',
  'www.ariannaspencer.com' => 'arianna',
  'www.livelifeoutloud.today' => 'live',
  'www.thebrothersbrunch.com' => 'brothers',
  'www.wearedopedads.com' => 'dopedads',
  'www.oliverstwist.xyz' => 'oliver',
  'www.offyear.org' => 'offyear',
  'www.40th.bushfiretheatre.org' => 'bushfire',
  'www.obama.bushfiretheatre.org' => 'bushfire',
  'www.sports.teachit.media' => 'sports',
  'www.wtf.teachit.media' => 'wtf',
  'www.boldbeautiful.teachit.media' => 'boldbeautiful',
  'www.boldbeautiful.life' => 'boldbeautiful',
  'boldbeautiful.life' => 'boldbeautiful',
  'www.civics.teachit.education' => 'civics',
  'www.ela.teachit.education' => 'ela',
  'www.ell.teachit.education' => 'ell',
  'www.math.teachit.education' => 'math',
  'www.science.teachit.education' => 'science',
  'www.socialjustice.teachit.education' => 'socialjustice',
  'test.teachit.media' => 'test',
);
