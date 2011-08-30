---
date: '2005-07-25 18:45:00'
template: default
title: Paul Graham's Accumulator Generator, in PostScript
wordpress_id: '19'
---

In [Revenge of the Nerds](http://paulgraham.com/icad.html), Paul Graham defines the accumulator generator problem.  Solving it requires using a programming language that has, or can simulate, closures and a polymorphic add function.  He presents [solutions in a number of languages](http://paulgraham.com/accgen.html), submitted by various people.

He's no longer accepting solutions, but I managed to solve it in PostScript anyway:

    /make-adder {
        [ exch
            [ exch ]
            {
                dup 3 1 roll
                0 get add
                dup 3 1 roll
                0 exch put
            } /exec cvx
        ] cvx
    } def

You can test it out in Ghostscript.  For example:

    GS>/x 1 make-adder def
    GS>5 x ==
    6
    GS>/y 3 make-adder def
    GS>2.3 x ==
    8.3
    GS>.7 x ==
    9.0
    GS>10 y ==
    13

