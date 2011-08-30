---
date: '2010-12-27 00:21:08'
template: default
title: Mathematica Home Edition 8.0 banner ad
wordpress_id: '226'
---

Mathematica Home Edition 8.0 shows a banner ad for itself across the top of every notebook.  They changed the way they do this from 7.0 so [my previous fix](http://qwan.org/2009/02/07/mathematica-home-editions-banner-ad-revisited/) doesn't work. You can eliminate the banner ad temporarily using this expression:

    SetOptions[$FrontEndSession,DockedCells->{}];
    
But restarting Mathematica will bring the banner back.  Putting that expression in your `FrontEnd/init.m` or `Kernel/init.m` doesn't work. You can get rid of the banner permanently by editing `SystemFiles/FrontEnd/TextResources/CommonFrontEndInit.tr` and finding this expression:

    SetOptions[$FrontEndSession,
    
    DockedCells->FEPrivate`FrontEndResource["FEExpressions","HomeEditionBar"]
    
    ];

Delete that expression (or comment it out using `(*` and `*)`).
