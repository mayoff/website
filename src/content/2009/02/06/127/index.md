---
date: '2009-02-06 22:50:10'
template: default
title: Mathematica Home Edition's banner ad
wordpress_id: '127'
---

<a href="http://www.wolfram.com/products/mathematicahomeedition/">Mathematica Home Edition</a> includes a banner ad for itself at the top of every new notebook you create:

<img src='mathematica-home-edition-banner-ad.png' width='564' height='312'>

How annoying.  You can remove it by evaluating this expression:

    SetOptions[SelectedNotebook[],DockedCells->{}]

I haven't figured out how to make this happen automatically in every new notebook I create.

