---
date: '2006-03-04 12:21:00'
template: default
title: fedora core 4 upgrade problems
wordpress_id: '32'
---

I tried to upgrade my Thinkpad A30p from Fedora Core 3 to Fedora Core 4.  First I tried using a DVD, but apparently the A30p doesn't boot off DVDs.  Then I tried a CD and it booted that but after LILO the screen just went black; even the text mode install ("linux text" at the boot prompt) didn't fix it.  Using "linux nofb" at the boot prompt fixed that problem.

Then when I told it to start the upgrade, I got an unhandled exception:

<pre>Traceback (most recent call list):
  File "/usr/lib/anaconda/gui.py", line 1137, in handleRenderCallback
    self.currentWindow.renderCallback()
  File "/usr/lib/anaconda/iw/progress_gui.py", line 244, in renderCallback
    self.intf.icw.nextClicked()
  File "/usr/lib/anaconda/gui.py", line 873, in nextClicked
    self.dispatch.gotoNext()
  File "/usr/lib/anaconda/dispatch.py", line 174, in gotoNext
    self.moveStep()
  File "/usr/lib/anaconda/dispatch.py", line 242, in moveStep
    rc = apply(func, self.bindArgs(args))
  File "/usr/lib/anaconda/packages.py", line 827, in doPreInstall
    f.close()
IOError: [Errno 22] Invalid argument</pre>

This happened because I had replaced my <code>/etc/mtab</code> file with a symbolic link to <code>/proc/mounts</code>.  Anaconda (the RedHat/Fedora Core installer) tries to truncate <code>/etc/mtab</code> and could not do so.  Replacing the symbolic link with an empty file fixed this problem.