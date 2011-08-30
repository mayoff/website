---
date: '2005-05-27 15:51:00'
template: default
title: the awesome power of recursive shell functions
wordpress_id: '17'
---

Recursive shell functions allow you to build a pipeline dynamically.  For example, if you want to print lines from standard input only if they match both of two regular expressions, you might do this:

    grep2 () {
        grep -e "$1" | grep -e "$2"
    }

But what if you want to allow any number of regular expressions?  Here's the way:

    mgrep () {
        if [ $# = 0 ]; then
            cat
        else
            pattern="$1"
            shift
            grep -e "$pattern" | mgrep "$@"
        fi
    }

