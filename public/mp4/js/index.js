/*
 * jQuery File Upload Demo
 * https://github.com/blueimp/jQuery-File-Upload
 *
 * Copyright 2010, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * https://opensource.org/licenses/MIT
 */

/* global $ */

$(function () {
    'use strict';
  
    // Initialize the jQuery File Upload widget:
    console.log("📢[index.js:19]: ", $('#fileupload'));
    $('#fileupload').fileupload({
      // Uncomment the following to send cross-domain cookies:
      //xhrFields: {withCredentials: true},
      url: '/upload'
    });
  
    // Enable iframe cross-domain access via redirect option:
   /* $('#fileupload').fileupload(
      'option',
      'redirect',
      window.location.href.replace(/\/[^/]*$/, '/cors/result.html?%s')
    );*/
  
    //if (window.location.hostname === 'blueimp.github.io') {
    console.log("📢[index.js:33]: ", window.location.hostname);
    // Demo settings:
      $('#fileupload').fileupload('option', {
        url: '/upload',
        // Enable image resizing, except for Android and Opera,
        // which actually support image resizing, but fail to
        // send Blob objects via XHR requests:
        disableImageResize: /Android(?!.*Chrome)|Opera/.test(
          window.navigator.userAgent
        ),
        maxFileSize: 999000,
        acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i
      });
      // Upload server status check for browsers with CORS support:
      if ($.support.cors) {
          console.log("📢[index.js:48]: ", $.support.cors);
        $.ajax({
          url: '/upload',
          type: 'HEAD'
        }).fail(function () {
          console.log("📢[index.js:54]: ", $('<div class="alert alert-danger"></div>'));
          $('<div class="alert alert-danger"></div>')
            .text('Upload server currently unavailable - ' + new Date())
            .appendTo('#fileupload');
        });
      }
    /*} else {
        console.log("📢[index.js:57]: ", $('#fileupload')[0]);
      // Load existing files:
      $('#fileupload').addClass('fileupload-processing');
      console.log("📢[index.js:66]: ", $('#fileupload'));
      $.ajax({
        // Uncomment the following to send cross-domain cookies:
        //xhrFields: {withCredentials: true},
        url: $('#fileupload').fileupload('option', 'url'),
        dataType: 'json',
        context: $('#fileupload')[0]
      })
        .always(function () {
          $(this).removeClass('fileupload-processing');
        })
        .done(function (result) {
          $(this)
            .fileupload('option', 'done')
            // eslint-disable-next-line new-cap
            .call(this, $.Event('done'), { result: result });
        });
    }*/
  });