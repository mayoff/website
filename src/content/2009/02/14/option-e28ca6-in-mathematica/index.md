---
date: '2009-02-14 02:31:17'
template: default
title: Option-⌦ in Mathematica
wordpress_id: '145'
---

Option-⌦ (that's option-forward-delete) is the standard Mac key sequence for deleting the word to the right of the text cursor.  For some reason, Mathematica doesn't understand that by default.

To correct this problem, edit this file:

    /Applications/Mathematica.app/SystemFiles/FrontEnd/TextResources/Macintosh/KeyEventTranslations.tr

Find the line that contains the word "ForwardDelete", and <em>add</em> this line after it:

    Item[KeyEvent["ForwardDelete", Modifiers->{Option}], "DeleteNextWord"],

Of course you might want to make a backup of KeyEventTranslations.tr first.

