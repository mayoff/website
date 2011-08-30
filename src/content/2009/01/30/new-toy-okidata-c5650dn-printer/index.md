---
date: '2009-01-30 00:43:58'
template: default
title: 'New toy: Okidata C5650dn printer'
wordpress_id: '108'
---

Maybe ten years ago, I wanted a printer.  My requirements were laser, duplex, reasonably fast, Ethernet, and PostScript.  The cheapest printer that met all of these requirements was the <a href="http://printers.necsam.com/main.cfm?thePage=http://printers.necam.com/public/printers/splash_page/1800.htm&amp;SP=365">NEC SuperScript 1800n</a>.

A few months ago, the SuperScript stopped printing.  I was able to get by with my HP PhotoSmart 2610 all-in-one, but I missed the speed, duplexing, and text quality of the laser printer.  So I've had my eye out for a new laser printer.  My requirements now are almost the same as they were 10 years ago, except that I want color, and I want Mac compatibility rather than PostScript specifically.

The <a href="http://www.okidata.com/mkt/html/nf/c5650home.html">Okidata C5650dn</a> seemed to be just what I wanted, for <a href="http://www.amazon.com/gp/product/B001A34IBS">about $625 with shipping through Amazon</a>, so I ordered it a couple of days ago.  The actual seller was <a href="http://tekgalaxy.com/">Technology Galaxy</a>.

This morning, UPS left a box on my porch.  The box said Okidata on the outside.  Unfortunately, it didn't say C5650dn.  It said it was an <a href="http://esales.okidata.com/IWCatProductPage.process?Merchant_Id=1&amp;Section_Id=79&amp;pcount=1&amp;Product_Id=1102994">option tray</a>.

<a href="http://www.flickr.com/photos/mayoff/3237056065/in/set-72157613135228256/"><img class="alignnone" title="Box" src="http://farm4.static.flickr.com/3259/3237056065_1c75c1a582_s.jpg" alt="" width="75" height="75" /></a> <a href="http://www.flickr.com/photos/mayoff/3237897218/in/set-72157613135228256/"><img class="alignnone" title="Label" src="http://farm4.static.flickr.com/3105/3237897218_358116ece1_s.jpg" alt="" width="75" height="75" /></a>

  I called the seller (Technology Galaxy) about it.  They were already aware that they'd shipped the wrong thing and had shipped the printer.  He gave me the UPS tracking number for the printer, which was already out for delivery on another UPS truck, and told me to give the option tray to the UPS guy when I received the printer.  He also noted my account to get a discount on my next two orders with them.

Then he called back a few minutes later and told me to just keep the option tray because apparently they get promos on those all of the time anyway.  Whee, free option tray!

So later another UPS guy came and delivered the actual printer.  It's kind of big, especially with the second paper tray.

<a href="http://www.flickr.com/photos/mayoff/3237058317/in/set-72157613135228256/"><img class="pc_img" src="http://farm4.static.flickr.com/3398/3237058317_57551617e4_s.jpg" alt="IMG_2582.JPG" width="75" height="75" /></a> <a href="http://www.flickr.com/photos/mayoff/3237902410/in/set-72157613135228256/"><img src="http://farm4.static.flickr.com/3404/3237902410_5f265b40ea_s.jpg" alt="" width="75" height="75" /></a>

Making it work on the Mac took a little work.  It showed up in the Print &amp; Fax Add Printer dialog as a Bonjour printer, but my Mac could not find a driver for it.  So I tried installing the driver from the CD-ROM that was included with the printer.  The installer told me to go to "More Printers" in the Add Printer dialog and choose "OKI TCP/IP".  I did that.  Then I had to manually enter the printer's IP address (which I had set manually using the printer's front panel so I would know it).

Even after that, I could not print from the Mac to the printer.  A little web searching led me to <a href="http://belgium.oki.com/fcgi-bin/public.fcgi?pid=118&amp;prodlink=1&amp;cid=134&amp;pdflag=2&amp;prid=652&amp;prodname=C5650">a support page at Oki Belgium's web site</a> where they had Leopard-specific driver in addition to the older driver that I got from the CD-ROM.  I deleted the /Library/Printers/Okidata folder, downloaded the Leopard driver installer from Oki Belgium, and ran it.  Then I restarted System Preferences and click the Add Printer button again.  This time, when I choose the printer from the Bonjour list, it found the OKI C5650 driver.  And now I can print!

The last thing I had to do was reduce the Power Save Delay Time to 5 minutes (the default is 60 minutes), because the printer's fan is kind of annoying even when it's not printing.  In Power Save, the printer is silent.