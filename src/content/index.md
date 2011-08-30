---
title: Rob Mayoff
indexable: false
allowComments: false
template: default
---
This is my blog and stuff.

<table id='index'>
{% for entry in index.pages %}
    <tr><td class='date'></td><td><a href='{{entry.url}}'>{{entry.title}}</a></td></tr>
{% endfor %}
{% for entry in index.posts %}
    <tr><td><span class='date'>{{entry.date}}</span></td><td><a href='{{entry.url}}'>{{entry.title}}</a></td></tr>
{% endfor %}
</table>

