---
date: '2004-10-20 15:03:00'
template: default
title: 'Beating the web into submission: killing fixed-width tables'
wordpress_id: '8'
---
Another big problem with a lot of web sites is that they use tables to force the content down to a narrow column.  Oh how I hate that.  It's quite popular, though.  yahoo.com, nytimes.com, audible.com...

It's particularly bad when I'm using my T221, because then I'm using 32 pixel fonts, so a website that uses a 400px column gives me about 5 words (or less) per line, and huge expanses of empty margin.  Useless!

My first approach to fixing this was another bookmarklet:

    javascript:void((function(){function doit(es){for(var i=0;i<es.length;++i)if('width' in es[i])es[i].width='auto';}doit(document.getElementsByTagName('TABLE'));doit(document.getElementsByTagName('TBODY'));doit(document.getElementsByTagName('THEAD'));doit(document.getElementsByTagName('TFOOT'));doit(document.getElementsByTagName('TR'));doit(document.getElementsByTagName('TD'));doit(document.getElementsByTagName('TH'));})())

But it's pretty annoying to have to hit the bookmarklet all the time (or to use a location bar keyword).  So I'm trying a different experiment.  I put this in my [userContent.css](http://www.mozilla.org/unix/customizing.html):

    TABLE,TD,TR,TBODY,THEAD,TFOOT {
        width: auto ! important;
    }

So far, it's bliss.
