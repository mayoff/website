---
date: '2006-11-22 19:14:05'
template: default
title: Cocoa Programming Notes
wordpress_id: '46'
---

It appears to be perfectly acceptable to set an NSArrayController's content object to an NSSet.  For example:

<pre>NSSet* symbolSet = [stockMarket symbolSet];
[symbolListController setContent:symbolSet];</pre>

On a related note, suppose your NSArrayController's content is a set (or array) of NSStrings, and you want it to sort those strings by their values.  You have to give the controller an NSSortDescriptor, and an NSSortDescriptor requires a key path specifying a property of the controlled objects.  But in this case you don't want to sort by a property, you want to sort by the objects (NSStrings) themselves.  It turns out that NSObject has a method, <code>-(id)self</code>, which returns <code>self</code>.  So you can specify <code>@"self"</code> as the key path, like this:

<pre>NSSortDescriptor* sd = [[[NSSortDescriptor alloc]
    initWithKey:@"self" ascending:YES] autorelease];
[symbolListController setSortDescriptors:
    [NSArray arrayWithObject:sd]];</pre>

Note that specifying <code>nil</code> or <code>@""</code> as the key path will not work.
