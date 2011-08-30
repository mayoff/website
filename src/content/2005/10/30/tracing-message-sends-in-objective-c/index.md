---
date: '2005-10-30 22:05:00'
template: default
title: Tracing message sends in Objective-C
wordpress_id: '29'
---

<b>Update:</b> It turns it there's a much easier, more reliable way to see every Objective-C message send.  So ignore the rest of this post and read about `NSObjCMessageLoggingEnabled` in [TN2124](http://developer.apple.com/technotes/tn2004/tn2124.html#SECOBJECTIVEC).

<hr>

So now I'm trying to get bindings working when I put my `NSCell` subclass in a table column.  It appears, for the standard `NSCell` subclasses, that NSTableColumn looks at the subclass's exposed bindings and re-exposes them on itself.  However, it's not doing that for my `NSCell` subclass's bindings.

So, I want to trace the messages that are flying around inside Interface Builder to see if I can figure out how `NSTableColumn` decides what bindings to expose.  Ideally I'd have a little dynamic library with a logging version of `objc_msgSend` and I could get Interface Builder to run using that.  I don't have that (yet).  I found <a href='http://groups.google.com/group/comp.sys.next.programmer/browse_frm/thread/ff810961be967d0e/7cb72c89445a0040#7cb72c89445a0040'>this old Usenet post</a> from a NeXT engineer showing how to trace `objc_msgSend` using GDB.  That will be much slower than smashing in a logging version of `objc_msgSend`, but it's better than nothing.

Of course, the GDB command in that Usenet post is for NEXTSTEP running on Intel.  It'll probably work on MacOS X running on Intel, but my Powerbook has a PowerPC processor.  Also, Apple introduced a new message-send function in Tiger, so you have to set two breakpoints.  These commands work on MacOS X on PowerPC:

    b objc_msgSend
    comm
    silent
    printf "%c[%s %s]\n", $r3&&((id)$r3)->isa->info&2?'+':'-', $r3?((id)$r3)->isa->name:"nil", $r4
    cont
    end
    b objc_msgSend_rtp
    comm
    silent
    printf "%c[%s %s]\n", $r3&&((id)$r3)->isa->info&2?'+':'-', $r3?((id)$r3)->isa->name:"nil", $r4
    cont
    end

Here's some sample output from GDB, tracing the first few messages sent in `-[NSObject exposedBindings]`:

    -[NSTableColumn _bindingAdaptor]
    +[NSBinder binderClassesForObject:]
    +[NSBinder _allBinderClasses]
    +[NSDisplayPatternTitleBinder isUsableWithObject:]
    +[NSBox self]
    -[NSTableColumn isKindOfClass:]
    +[NSWindow self]
    -[NSTableColumn isKindOfClass:]
    +[NSWindowTemplate self]
    -[NSTableColumn isKindOfClass:]
    +[NSTableBinder isUsableWithObject:]
    +[NSTableView self]
    -[NSTableColumn isKindOfClass:]
    +[NSObjectParameterBinder isUsableWithObject:]
    +[NSObjectParameterBinder binderClassesSuperseded]
    +[NSArray array]
    +[NSArray allocWithZone:]

