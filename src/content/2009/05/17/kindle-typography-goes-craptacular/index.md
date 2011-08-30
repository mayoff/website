---
date: '2009-05-17 23:03:09'
template: default
title: Kindle typography goes craptacular
wordpress_id: '193'
---



I have a Kindle 2.  The built-in font used for book text is apparently <a href="http://www.linotype.com/1313/pmncaecilia-family.html">Caecilia</a>.  I scanned my Kindle displaying a page of <a href='http://books.google.com/books?id=FUha9wJrSXMC'><i>Cryptonomicon</i></a> at the smallest font size.  Here's a picture that is actual size if you have a 96 dpi display.  Click on it for a 600 dpi image.

<a href="cryptonomicon-600-dpi.png"><img src="cryptonomicon-96-dpi.png" alt="96 dpi picture of Kindle displaying Cryptonomicon" title="cryptonomicon-96-dpi" width="128" height="128" class="size-full wp-image-194" /></a>

Now I'm reading <a href='http://books.google.com/books?id=gMOIt0qNcEMC'><i>Power, Sex, Suicide: Mitochondria and the Meaning of Life</i></a> on my Kindle.  Here's what it looks like.

<a href="sps-600-dpi.png"><img src="sps-96-dpi.png" alt="96 dpi image of Kindle displaying Sex, Power, Suicide" title="sps-96-dpi" width="128" height="128" class="size-full wp-image-202" /></a>

Notice how the crossbar on the first character, a capital T, is barely visible?  The Kindle is displaying five capital Ts on that page.  Here they are.

<a href="sps-t-600-dpi.png"><img src="sps-t-600-dpi.png" alt="600 dpi image of Kindle displaying capital Ts" title="sps-T-600-dpi" width="384" height="64" class="size-full wp-image-206" /></a>

Maybe some of the screen pixels don't work as well as others, and that's why the Ts are inconsistent.  Nope.  You can shift the location of that first T around the screen (using Go to Location... in the menu), and it always looks like that.  Here's what those Ts look like at the largest font size.

<div style='max-width: none; overflow-x: auto'><a href="sps-t-large-600-dpi.png"><img src="sps-t-large-600-dpi.png" alt="600 dpi image of Kindle displaying Ts at largest font size" title="sps-T-large-600-dpi" width="864" height="160" class="size-full wp-image-210" /></a></div>

The answer seems to be that the Kindle is displaying those Ts differently on purpose.  While investigating this, I found out that Amazon invented a new ebook format called Topaz that allows embedded fonts.  <i>Cryptonomicon</i> uses the older format and the built-in font.  <i>Power, Sex, Suicide</i> uses the Topaz format and has an embedded font.  I don't know if the embedded font has several versions of each glyph, or if the software for displaying Topaz-embedded fonts is responsible.

Of course, it's not just Ts.  In this book, the Kindle seems to have two or more ways of displaying every glyph, so stroke weight varies at random all over the page, and lots of strokes almost entirely disappear.  It really makes the book much less pleasant to read.
