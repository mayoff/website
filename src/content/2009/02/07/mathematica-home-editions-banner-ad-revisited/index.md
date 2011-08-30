---
date: '2009-02-07 17:27:17'
template: default
title: Mathematica Home Edition's banner ad, revisited
wordpress_id: '136'
---

It turns out to be very easy to remove the Mathematica Home Edition banner ad from all existing and newly-created notebooks.  Just run this expression:

    SetOptions[$FrontEnd,DockedCells->{}]

The effect of this command persists when you quit and restart Mathematica.

Something else you might find annoying is the "Welcome to Mathematica 7 Home Edition" window (the Mathematica Navigator), which appears every time you start Mathematica.  You can prevent Mathematica from opening that window by running this expression:

    SetOptions[$FrontEnd,AutoOpenNotebooks->{}]
