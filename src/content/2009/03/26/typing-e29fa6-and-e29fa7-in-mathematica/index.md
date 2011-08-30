---
date: '2009-03-26 21:13:10'
template: default
title: Typing ⟦ and ⟧ in Mathematica
wordpress_id: '171'
---

Mathematica uses doubled brackets for indexing: "x[[1]]" means the first element of x.  It also supports special characters for indexing; they look like "x〚1〛".  The special characters are nice because they take less space (when displayed by Mathematica) and look quite different.

To type the special characters in Mathematica, you have to press ␛[[␛ and ␛]]␛. I found <a href="http://web.ift.uib.no/~szhorvat/mmatricks.php">a tip for typing them more easily</a>.  Add these lines to KeyEventTranslations.tr:

    Item[KeyEvent["[", Modifiers -> {Control}],
        FrontEndExecute[{FrontEnd`NotebookWrite[FrontEnd`InputNotebook[],
            "\[LeftDoubleBracket]", After]}]],
    Item[KeyEvent["]", Modifiers -> {Control}],
        FrontEndExecute[{FrontEnd`NotebookWrite[FrontEnd`InputNotebook[],
            "\[RightDoubleBracket]", After]}]],

This lets you type control-[ to insert 〚 and control-] to insert 〛.

I don't know why Mathematica uses 〚 and 〛 (which are characters x301a and x301b from the CJK Symbols and Punctuation range) instead of ⟦ and ⟧ (which are x27e6 and x27e7 from the Miscellanous Math Symbols-A range).
