---
date: '2006-07-02 17:11:00'
template: default
title: Mortgage Calculator
wordpress_id: '34'
---

I've been thinking about how to compare mortgages, because I'm buying a house.  There are several decisions to make.  I've written a [mortgage calculator](calculator.html) that takes them all into account.  It's in Javascript, and I've tested it in Safari and Firefox.  I seriously doubt it works in Internet Explorer.  Anyway, here are the decisions.

Any money used to pay off the loan principal is effectively an investment with the same interest rate as the loan.  Several of the decisions are between paying down the principal and investing the money elsewhere. You have to decide whether you think you can invest at a better rate than the loan's.  If so, you generally want to invest rather than pay down the loan principal.  If (like me) you think you can't invest at a better rate than the loan's, then you have to decide how much liquidity you want, because money used to pay down the loan principal can't easily be reclaimed.

You can spend money on "points" to get a lower interest rate, or you can put that money into a larger downpayment, or you can invest the money.  This has an additional tradeoff: if you think you'll refinance the loan at some point, you have to consider whether the lower interest rate will cover its cost by the time you bail out, which involves looking at your equity and your investment at the time of the bail-out.  On the other hand, if you intend to pay off the loan without refinancing, then you will always end up with the full equity of the property and you only need to consider your investment's value at the end of the loan.

You can choose a shorter loan term, which gets you a lower interest rate, but your monthly payment is higher.  Or you can take a longer loan term, which gives you a higher interest rate but a lower monthly payment.  You can then go ahead and pay extra each month, paying off the loan early.  By taking the longer term loan and higher interest rate, you're buying the option of making lower payments, which is handy if you might want or need to live off your savings for a while.

You can deduct the mortgage interest from your taxable income, so a higher interest rate gives you a larger tax deduction.  You can either invest the tax savings or you can add it to your monthly payments.

There's another factor which I haven't implemented yet: inflation.  You're borrowing today's dollars and paying back future dollars.  Because of inflation, future dollars will have less buying power than current dollars.  If you assume that your earning power will keep up with inflation, then inflation effectively reduces the interest rate of the loan.  I haven't decided exactly how to handle this in the calculator yet.
