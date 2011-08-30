---
date: '2006-11-08 23:38:16'
template: default
title: Parallels + Windows XP from Virtual PC
wordpress_id: '44'
---

I have a copy of "Microsoft Virtual PC for Mac Version 7 with Windows XP Professional" that I used on my PowerBook.  Now I've got a MacBook Pro, which Virtual PC doesn't support and I'd rather use Parallels anyway.

<a href="http://www.nu2.nu/bootcd/#wxp">This page</a> describes how to make a bootable Windows XP installation CD from the Virtual PC installation CDs.  I did that under Virtual PC on the old PowerBook.  Virtual PC couldn't burn the CD, so I copied the ISO to a shared folder and burned it using Disk Utility.

Then I tried to use it in Parallels.  Parallels said, "No boot device available, press Enter to continue".  I modified the Parallels virtual machine configuration so that the CD-ROM was on IDE 0:0 and the hard disk was on IDE 1:0.  That allowed the Parallels VM to find and boot the CD.

Booting from the install CD gets a bootable second-stage installer copied to the hard drive.  Then the VM reboots.  This happens quickly and silently in Parallels, so I ended up back in the first-stage installer again without noticing (I'd put the CD first in the boot order).  I changed the CD to last in the boot order and got the "No boot device available" message again.  So I changed the hard disk back to IDE 0:0 and the VM booted the second-stage installer.

I encountered no other problems after that. I was able to activate Windows XP inside the Parallels VM with no trouble (even though I've activated it under Virtual PC in the past).
