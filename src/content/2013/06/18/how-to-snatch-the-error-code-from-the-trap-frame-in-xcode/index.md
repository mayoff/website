---
template: default
title: How to Snatch the Error Code from the Trap Frame in Xcode
video: true
---

## What We Want

What should happen when your iOS or OS X app throws an exception and you're running it under the debugger?  It should stop at the moment the exception is thrown, so you can inspect the call stack and the app's variables, and it should show you the exception.

Unfortunately, by default, the app stops in the default exception handler, after the call stack has been unwound all the way to `main`.  And if you set an exception breakpoint, the app stops at the moment the exception is thrown, with the full call stack available for inspection, but it doesn't show you the exception.

If your target is the iOS simulator, or 32-bit OS X, you can print the exception by typing `po ((id*)$esp)[1]` in the debug console when your breakpoint exception is hit.  If your target is an iOS device, you can type `po $r0`.  And if your target is 64-bit OS X, you can type `po $rdi`.

What you really want is for the debugger to print the exception automatically when the exception breakpoint is hit, and you want all of your projects to have the exception breakpoint set automatically.  I'll show you how to get this behavior.

## How We Get It

### Step 1

Create an exception breakpoint in the Breakpoint Navigator and set it to catch Objective-C exceptions:

<div class='videoWrapper paused'>
    <video width='478' height='352'>
        <source src='create-breakpoint.mp4' type='video/mp4; codecs="avc1.42E01E,mp4a.40.2"'>
        <source src='create-breakpoint.webm' type='video/webm; codecs="vp8,vorbis"'>
        <source src='create-breakpoint.ogv' type='video/ogg; codecs="theora,vorbis"'>
    </video>
    <div class='videoDimmer'></div>
</div>

When the app raises an Objective-C exception, it will hit this breakpoint, letting us inspect the call stack at the moment the exception is raised.  But the breakpoint only exists in the current project.  Next we'll make the breakpoint affect all projects.

### Step 2

Right-click (or control-click) the new breakpoint and move it to the User category.

<div class='videoWrapper paused'>
    <video width='502' height='352'>
        <source src='move-to-user-category.mp4' type='video/mp4; codecs="avc1.42E01E,mp4a.40.2"'>
        <source src='move-to-user-category.webm' type='video/webm; codecs="vp8,vorbis"'>
        <source src='move-to-user-category.ogv' type='video/ogg; codecs="theora,vorbis"'>
    </video>
    <div class='videoDimmer'></div>
</div>

Breakpoints in the User category affect every Xcode project you open.

### Step 3

You'd like to add an action to the breakpoint to make it print the exception being raised, but the debugger command you need depends on the target architecture.  Let's add a new debugger command that does the right thing on all of the architectures supported by Xcode (32-bit x86, 64-bit x86, and ARM).  Make a new directory named `~/Library/lldb`.  Copy the following Python code and paste it into a file named `~/Library/lldb/sniff_objc_exception_throw.py` :

    import lldb

    def GetFirstArgumentAsValue(target, frame):
        # Note: I assume the PC is at the first instruction of the function, before the stack and registers have been modified.
        if target.triple.startswith('x86_64'):
            return frame.regs[0].GetChildMemberWithName("rdi")
        elif target.triple.startswith('i386'):
            espValue = frame.regs[0].GetChildMemberWithName("esp")
            address = espValue.GetValueAsUnsigned() + target.addr_size
            return espValue.CreateValueFromAddress('arg0', address, target.FindFirstType('id'))
        else:
            return frame.regs[0].GetChildMemberWithName("r0")

    def command(debugger, user_input, result, unused):
        target = debugger.GetSelectedTarget()
        frame = target.GetProcess().GetSelectedThread().GetFrameAtIndex(0)
        description = GetFirstArgumentAsValue(target, frame).GetObjectDescription()
        if description is None:
            output = "I couldn't get the description of the exception being thrown."
        else:
            output = "Description of exception being thrown: " + repr(description)
        result.PutCString(output)
        return None

    def __lldb_init_module(debugger, unused):
        debugger.HandleCommand('command script add --function sniff_objc_exception_throw.command sniff_objc_exception_throw')

This Python module uses the debugger's API to create a new command named `sniff_objc_exception_throw`.  You need to load the module every time the debugger runs, so edit (or create) the file `~/.lldbinit` and add the following line to it:

    command script import ~/.../lldb/sniff_objc_exception_throw.py

You can copy the code from [this gist](https://gist.github.com/mayoff/5802760) if you prefer.

### Step 4

Now that the debugger has the command you need, right-click the breakpoint to add the command as an action:

<div class='videoWrapper paused'>
    <video width='484' height='274'>
        <source src='add-action.mp4' type='video/mp4; codecs="avc1.42E01E,mp4a.40.2"'>
        <source src='add-action.webm' type='video/webm; codecs="vp8,vorbis"'>
        <source src='add-action.ogv' type='video/ogg; codecs="theora,vorbis"'>
    </video>
    <div class='videoDimmer'></div>
</div>

## What We Get

Now, when your app raises an exception, it will stop at a useful place, where you can inspect the call stack and all of your variables, and you'll get a description of the exception in the debug console:

<div class='videoWrapper paused'>
    <video width='916' height='478'>
        <source src='demo.mp4' type='video/mp4; codecs="avc1.42E01E,mp4a.40.2"'>
        <source src='demo.webm' type='video/webm; codecs="vp8,vorbis"'>
        <source src='demo.ogv' type='video/ogg; codecs="theora,vorbis"'>
    </video>
    <div class='videoDimmer'></div>
</div>

## Thanks

Many thanks to Enrico Granata and Sean Callanan for writing much of the original version of the `sniff_objc_exception_throw` command.
