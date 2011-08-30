---
date: '2005-10-30 05:18:00'
template: default
title: Dragging an NSCell subclass from an Interface Builder palette
wordpress_id: '28'
---

If you've got your own `NSCell` subclass that you want to put on an Interface Builder palette, you'll probably think that you need to call `-[IBPalette associateObject:ofType:withView:]` using `IBCellPboardType` as the type.  This doesn't work.  It turns out you need to use `IBTableColumnPboardType`.  I don't know what `IBCellPboardType` is for.

Also, IB will send `-[NSCell setObjectValue:]` to your cell to fill in the dummy values in puts it tables in design mode.  So you have to be able to accept the values it sends (probably of type `NSNumber` and/or `NSString`), even if your cell doesn't normally accept values of those types.

Also, if you want to see how IB's built-in "Data Views" palette (the one with the table view and the cells on it) draws the built-in cells, open up this nib:

    /Developer/Applications/Interface Builder.app/Contents/Resources/CocoaFramework.palette/Contents/Resources/IBDataViews.nib

It turns out to be kind of a hack, with two `NSTextFields` and some appropriate control (`NSButton`, `NSSlider`, etc.) on top of each other, nested in a simple `NSView`.  The `NSTextField`s are set up to overlap, with the bottom one having a black border and the top one having no border and covering the sides of the bottom one.

It's very handy to add a "custom executable" to your IB palette Xcode project, with the executable being `/Developer/Applications/Interface Builder.app`.  Then you can press ⌘R to start IB to test out your palette, or ⌘Y to run IB under GDB so you can debug your palette.  Be careful not to start IB by some other mechanism (like by double-clicking a nib) if you're going to use this technique, because IB won't start up correctly and (at least for me) Xcode will probably hang.
