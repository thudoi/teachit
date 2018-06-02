<?php unset($form['twitter_signin']);?>

<div class="title"><h2 class="center-title">Log into your account</h2></div>
<div class=" user-login-form-wrapper max-width-500 -align-center">

    <div class="login-left social-col">
        <div class="lf-button-wrapper">
        <a href="/user/simple-fb-connect" class="button button--social js_oauth lf-button social-facebook">
        <span class="icon--svg u-prepended">
            <svg class="svg-icon svg-icon--filled svg-facebook">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#iconset-facebook">
                    <svg id="iconset-facebook" viewBox="0 0 18 18" width="100%" height="100%"><path d="M7.003 17l-.006-7H4l.006-3h2.997V4.995C7.003 2.408 8.457 1 10.808 1c1.126 0 1.91.082 2.192.12v2.877h-1.447c-1.278 0-1.526.597-1.526 1.472V7h2.866l-.403 3h-2.47l.007 7H7.003z"></path></svg>
                </use>
            </svg>
        </span>
            Connect with Facebook</a>
            <a href="/twitter/redirect" class="button button--social js_oauth lf-button social-facebook">
        <span class="icon--svg u-prepended">
            <svg class="svg-icon svg-icon--filled svg-twitter">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#iconset-twitter">
                    <svg id="iconset-twitter" viewBox="0 0 18 18" width="100%" height="100%"><path d="M12.077 2c-1.812 0-3.282 1.582-3.282 3.534 0 .277.03.547.085.806-2.728-.148-5.147-1.555-6.766-3.693a3.727 3.727 0 0 0-.445 1.777c0 1.226.58 2.308 1.46 2.942a3.093 3.093 0 0 1-1.49-.443v.045c0 1.712 1.13 3.14 2.634 3.465a3.07 3.07 0 0 1-1.483.06c.42 1.407 1.632 2.427 3.07 2.457-1.124.946-2.54 1.51-4.077 1.51A6.22 6.22 0 0 1 1 14.413 8.818 8.818 0 0 0 6.032 16c6.038 0 9.34-5.385 9.34-10.056 0-.153-.004-.306-.01-.457A6.98 6.98 0 0 0 17 3.657a6.2 6.2 0 0 1-1.885.557 3.51 3.51 0 0 0 1.443-1.956c-.634.405-1.337.7-2.085.858C13.875 2.43 13.023 2 12.077 2"></path></svg>
                </use>
            </svg>
        </span>
            Connect with Twitter</a>
        </div>
    </div>
    <div class="login-line">
        <span>Or</span>
    </div>
    <div class="login-right">
      <?php print render($form['name']); ?>
      <?php print render($form['pass']); ?>
        <div class="form-action">
          <?php print render($form['actions']['submit_' . REQUEST_TIME]); ?>
        </div>
      <?php print drupal_render_children($form); ?>
    </div>
</div>