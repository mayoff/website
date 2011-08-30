---
date: '2005-09-08 10:48:00'
template: default
title: python debugger script
wordpress_id: '21'
---

Put this in a file named <code>pdb</code> in your <code>$PATH</code> and make it executable:

<pre>#!/bin/bash
exec python "$(python -c 'import pdb; print pdb.__file__')" "$@"</pre>

Now if you want to run some Python script under the debugger, run <code>pdb</code> on it.  For example, if you have a script named <code>reverse.py</code> that you want to run under the debugger:

<pre>$ pdb reverse.py
&gt; &lt;string&gt;(1)?()
(Pdb) s
--Call--
&gt; /Users/mayoff/reverse.py(1)?()
-&gt; class Node:
(Pdb) </pre>

