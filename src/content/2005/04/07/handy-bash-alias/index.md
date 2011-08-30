---
date: '2005-04-07 18:23:00'
template: default
title: handy bash alias
wordpress_id: '11'
---
Often I run some command that's going to take a long time to finish, like

    make solver

and when it's done I want to run some other command, like

    ./solver < problem.1

but I only want to run that second command if the first command (the `make` in this example) succeeded.  If I'd thought ahead, I could have run this in the first place:

    make solver && ./solver < problem.1

But I didn't.  So I have this handy `bash` alias:

    alias +='(exit $?) && '

Which gives me a similar effect.  I run the first command (the `make`), and *while it's running* I type in a plus followed by the second command:

    + ./solver < problem.1

If the first command finishes, the second command will run.  Otherwise, the second command will be ignored.

Note that this only works if the first command doesn't read from standard input.
