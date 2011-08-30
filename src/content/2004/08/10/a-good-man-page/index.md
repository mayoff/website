---
date: '2004-08-10 14:34:00'
template: default
title: a good man page
wordpress_id: '6'
---

It's trivial for any C/C++ programmer to remember the purpose of the `strstr` function: it finds the first occurrence of one string in another string. The hard part is remembering which comes first, the string to search for or the string to search in.  So inevitably I have to look at the documentation. It turns out that even for something so apparently simple as the documentation of `strstr`, it's possible to design a solution that is qualitatively better than "adequate" or "sufficient".

The C99 standard &sect;7.21.5.7 describes it this way:

> ### SYNOPSIS
>     char *strstr(const char *s1, const char *s2);
> ### DESCRIPTION
> The `strstr` function locates the first occurrence in the string pointed to by `s1` of the sequence of characters (excluding the terminating null character) in the string pointed to by `s2`. 

Old man pages said something pretty similar. So I have to read the description to figure out what `s1` and `s2` are.

The MacOS X man page is improved:

> ### SYNOPSIS
>     char *strstr(const char *big, const char *little)
> ### DESCRIPTION
> The `strstr()` function locates the first occurrence of the null-terminated string `little` in the null-terminated string `big`.

Now I can look at just the synopsis and think "Hmm, a little string fits inside a big string but not vice versa, so the string to search in must be the first argument."  It's faster to think that than to read the description.

However, the Linux man page really aces the test:

> ### SYNOPSIS
>     char *strstr(const char *haystack, const char *needle)
> ### DESCRIPTION
> The `strstr()` function finds the first occurrence of the substring `needle` in the string `haystack`. The terminating `' characters are not compared.

The phrase "looking for a needle in a haystack" is so familiar to me that when I read the synopsis, I don't even have to think about what the words mean. I pick up the information instantly and effortlessly.

