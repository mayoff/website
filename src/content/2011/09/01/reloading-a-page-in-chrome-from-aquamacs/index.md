---
date: '2011-09-01'
template: default
title: Reloading a page in Chrome from Aquamacs
---
The Emacs function [`browse-url`](http://www.emacswiki.org/emacs/BrowseUrl) tells your browser to open a URL.  It's pretty simple.  Your default browser will open the URL in a new tab or window.

If we're editing a web page, we'll probably be reloading it pretty often in the browser.  I couldn't find a way to make Emacs tell our browser to *reload* a URL if the browser already has that URL open in some tab.  So let's write some elisp.

This code is Mac-specific, because it relies on AppleScript to talk to the browser.  It works (for me) in both [Aquamacs](http://aquamacs.org/) and [Emacs.app](http://emacsformacosx.com/).

This code is also [Chrome](http://www.google.com/chrome)-specific, because Safari has a slightly different AppleScript dictionary and Firefox isn't scriptable.

So anyway, our goal is to have the visible tab of Chrome's front window show our URL.  If Chrome already has a tab in any of its windows showing the URL, it should make that tab visible, bring that window to the front, and reload that tab.  If there's no such tab, it should make one in the frontmost window.  And if Chrome doesn't have any windows open, it should make a new window.

So we need an elisp function that takes a URL and does all of that, using AppleScript.  Here it is:

    (defun mayoff:open-url-in-chrome (url)
      "Open URL in Google Chrome.  I use AppleScript to do several things:
      1. I tell Chrome to come to the front. If Chrome wasn't launched, this will also launch it.
      2. If Chrome has no windows open, I tell it to create one.
      3. If Chrome has a tab showing URL, I tell it to reload the tab, make that tab the active tab in its window, and bring its window to the front.
      4. If Chrome has no tab showing URL, I tell Chrome to make a new tab (in the front window) showing URL."
      (when (symbolp url)
        ; User passed a symbol instead of a string.  Use the symbol name.
        (setq url (symbol-name url)))
      (do-applescript (format "
    tell application \"Google Chrome\"
            activate
            set theUrl to %S

            if (count every window) = 0 then
                    make new window
            end if

            set found to false
            set theTabIndex to -1
            repeat with theWindow in every window
                    set theTabIndex to 0
                    repeat with theTab in every tab of theWindow
                            set theTabIndex to theTabIndex + 1
                            if theTab's URL = theUrl then
                                    set found to true
                                    exit
                            end if
                    end repeat

                    if found then
                            exit repeat
                    end if
            end repeat

            if found then
                    tell theTab to reload
                    set theWindow's active tab index to theTabIndex
                    set index of theWindow to 1
            else
                    tell window 1 to make new tab with properties {URL:theUrl}
            end if
    end tell
      " url)))

Now we can evaluate an expression like

    (mayoff:open-url-in-chrome "http://qwan.org/2011/09/01/reloading-a-page-in-google-chrome-from-emacs-on-a-mac/")

to view that URL in Chrome, reloading it if it's already loaded.

Of course, we're not going to want to type all that out every time we update the page.  What we really want is a way to set a URL to be loaded, and then a way to run `mayoff:open-url-in-chrome` on that URL.  I like to put both actions on F5, using `C-u F5` to set the URL and plain `F5` to send it to the browser.  Here's the code:

    (defvar mayoff:open-in-chrome-url nil
      *The URL that the mayoff:open-in-chrome function will send to Google Chrome.")

    (defun mayoff:open-in-chrome (arg)
      "Open or reload a file in Google Chrome.  If you give me a prefix argument, I get Chrome's currently-displayed URL and save it for the future.  If you don't give me a prefix argument, I send the previously-saved URL to Chrome for reloading."
      (interactive "P")
      (cond
       (arg (setq mayoff:open-in-chrome-url (do-applescript "tell application \"Google Chrome\" to get window 1's active tab's URL")))
       ((not mayoff:open-in-chrome-url) (error "You haven't set a URL for me to send to the browser."))
       (t (save-buffer)
          (mayoff:open-url-in-chrome mayoff:open-in-chrome-url))))

    (global-set-key (kbd "<f5>") 'mayoff:open-in-chrome)

Mission accomplished.

- [This gist contains all of the elisp.](https://gist.github.com/1185476)
- [This gist contains just the AppleScript.](https://gist.github.com/1138816)

