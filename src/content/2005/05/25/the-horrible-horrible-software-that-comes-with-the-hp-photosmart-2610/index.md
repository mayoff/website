---
date: '2005-05-25 01:11:00'
template: default
title: the horrible, horrible software that comes with the HP Photosmart 2610
wordpress_id: '16'
---
I bought Delia a new PowerBook from the online Apple Store.  They offered a $100 rebate for a number of printers.  It would be convenient to have a copier and a fax machine, and might be nice to print photographs, so I chose the HP Photosmart 2610 all-in-one.  I read some reviews first, and there were complaints about difficulty installing the software.  I assumed those complaints were for the Windows software.  "That won't be a problem for me because we use Macs," I smugly thought.

Boy, was I wrong.  The HP software sucks.

The software installer insisted on quitting all my other applications.  OK, that's somewhat minor, but an annoyance.

Then, after it installed the software, it launched the HP All-in-One Setup Assistant.  The setup assistant crashed one or two screens in.  Joy.

"Maybe," I thought, "it needs to be rebooted to work.  The developers were obviously not very good, so maybe they forgot to program that in."  So I rebooted.  The setup assistant started automatically when I logged in.

The setup assistant didn't crash this time.  I did start getting mysterious pop-up messages informing me that "The automatic document feeder is empty."  Of course, I wasn't trying to scan anything - I was still trying to set up the printer.  Furthermore, my 2610 has no automatic document feeder.  In fact, <b>the 2610 does not support an automatic document feeder.</b>

Anyway, ignoring those messages, I proceeded through the setup assistant.  It apparently set up the fax support successfully, then launched Apple's Printer Setup Utility for me.  Unfortunately, I could not set up the printer because the setup utility thought the printer was an "Unsupported Printer" and there was no option for the printer in the pop-up list of drivers.

Checking the HP support website revealed no new software to download.

So I uninstalled all of the HP software to try again.  I must say that the uninstaller worked great.  HP sure knows how to uninstall its crapware.

On the second install, I manually quit all of my other applications first.  It didn't help.  The setup assistant didn't crash, but I still couldn't set up the printer.

I checked HP's support website again.  One of the very few FAQs commanded that I disable all startup items.  It didn't give detailed directions, just pointed me at the `/Library/StartupItems` folder and the Login Items pane of the Accounts preference panel.  Fortunately I know how to become root and move things around, so I was able to move all of the items out of `/Library/StartupItems` and I made a backup of my `~/Library/Preferences/loginwindow.plist` before removing all of my Login Items using System Preferences.

Then I uninstalled the HP crapware, rebooted, and installed it again.  Miracle!  This time the Printer Setup Utility identified the printer and offered to use the HP All-in-One driver (which still didn't appear in the pop-up list of drivers, as far as I could tell).

Of course, I was still getting that "The automatic document feeder is empty" message every minute or two.

More searching revealed (in some HP support forums) that others have had this problem, with other HP printers.  One poster said that turning the printer (not a 2610, some other model) off and on fixed the problem.  That appears to work.

However, if I reboot, the HP All-in-One Setup Assistant runs again, and the message comes back!  Each time the setup assistant runs, it re-enables the printer's brain damage.  I never managed to get the Setup Assistant to agree that I had run it to completion, although I don't know why.  Ultimately I renamed the application.  I haven't rebooted since doing that so I don't know if that will prevent it from starting up after I do.

So, in closing, HP's software was written by retards and tested by retards.  Kids, don't do drugs.
