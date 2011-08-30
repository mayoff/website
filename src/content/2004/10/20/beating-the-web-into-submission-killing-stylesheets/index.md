---
date: '2004-10-20 14:58:00'
template: default
title: 'Beating the web into submission: killing stylesheets'
wordpress_id: '7'
---

Mozilla 1.8 will have the option to disable CSS entirely or on a
per-web-site basis. That will be great, because a lot of web sites have
interesting content and really crappy designs.
Until the glorious day when Fedora Core uses Mozilla 1.8, this
bookmarklet kills stylesheets on the current page:

    javascript:void((function(){for(var i=0;i<document.styleSheets.length;++i){document.styleSheets[i].disabled=true;}})())

Bookmark that.  Call it "Kill Stylesheets".  Click on it to disable the stylesheets on the current page.


