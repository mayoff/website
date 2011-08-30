
var stateObject = new Object();

// Load the persistent state.
function loadState() {
    stateObject = new Object();
    var hash = window.top.location.hash.replace(/^#/, '');
    hash = hash.replace(/_p/g, '%');
    hash = hash.replace(/_u/g, '_');
    foreach(hash.split('&'), function (s) {
	if (s == '')
	    return;
	var nv = s.split('=');
	stateObject[decodeURIComponent(nv[0])] = decodeURIComponent(nv[1]);
    });
}

// Save the persistent state.
function saveState() {
    var s = '';
    var sep = '';
    for (name in stateObject) {
	s += sep;
	sep = '&';
	s += encodeURIComponent(name);
	s += '=';
	s += encodeURIComponent(stateObject[name]);
    }
    s = s.replace(/_/g, '_u');
    s = s.replace(/%/g, '_p');
    if (window.top.location.hash != s)
	window.top.location.hash = s;
}

// Return the variable named `name' from the persistent state.
function getState(name) {
    return stateDecode(stateObject[name]);
}

// Set persistent state variable `name' to `value'.
function setState(name, value) {
    stateObject[name] = stateEncode(value);
}

// Encode `o' so that it can be stored as persistent state.
function stateEncode(o) {
    if (o == null) {
	return '';
    } else if (typeof o == "object") {
	if (o.length == null) {
	    var s = 'm';
	    var sep = '';
	    for (name in o) {
		s += sep;
		sep = '&';
		s += encodeURIComponent(name);
		s += '=';
		s += encodeURIComponent(stateEncode(o[name]));
	    }
	    return s;
	} else {
	    var s = 'a';
	    var sep = '';
	    for (var i = 0; i < o.length; ++i) {
		s += sep;
		sep = '&';
		s += encodeURIComponent(stateEncode(o[i]));
	    }
	    return s;
	}
    } else {
	return 's' + o;
    }
}

// Decode `s', reversing the operation of stateEncode.
function stateDecode(s) {
    if (s == '' || s == null) {
	return null;
    } else if (s[0] == 'm') {
	var chunks = s.substr(1).split('&');
	var o = new Object();
	foreach(chunks, function (chunk) {
	    var nv = chunk.split('=');
	    o[decodeURIComponent(nv[0])] =
		stateDecode(decodeURIComponent(nv[1]));
	});
	return o;
    } else if (s[0] == 'a') {
	var chunks = s.substr(1).split('&');
	var a = new Array(chunks.length);
	var i = 0;
	foreach(chunks, function (chunk) {
	    a[i] = stateDecode(decodeURIComponent(chunk));
	    ++i;
	});
	return a;
    } else {
	return s.substr(1);
    }
}

// If o is null, return o2.  Otherwise, return o.
function nvl() {
    for (var i = 0; i < arguments.length; ++i) {
	if (arguments[i] != null)
	    return arguments[i];
    }
    return null;
}

// Remove each occurrence of `badWord' from the space-separated list
// of words in string `words'.
function removeWord(words, badWord) {
    var newWords = new Array();
    foreach (words.split(' '), function (word) {
	if (word != badWord) {
	    newWords.push(word);
	}
    });
    return newWords.join(' ');
}

// Return s with whitespace removed from both ends.
function trim(s) {
    return s.replace(/^\s+/, '').replace(/\s+$/, '');
}

// Call fn on each object in objects.
function foreach(objects, fn)
{
    for (var i = 0, l = objects.length; i < l; ++i) {
	fn(objects[i]);
    }
}

// Call fn on each object in objects, returning an array of the values
// returned by fn.
function map(fn, objects)
{
    var r = new Array(objects.length);
    for (var i = 0, l = objects.length; i < l; ++i) {
	r[i] = fn(objects[i]);
    }
    return r;
}

// Call fn on each object in objects, returning an array of the values
// for which fn return true.
function filter(fn, objects)
{
    var r = new Array();
    for (var i = 0, l = objects.length; i < l; ++i) {
	if (fn(objects[i])) {
	    r.push(objects[i]);
	}
    }
    return r;
}

// Return true if string haystack starts with needle.
function startsWith(haystack, needle)
{
    return haystack.slice(0, needle.length) == needle;
}

// Given a sorted array and a value, find the first place in array
// where value could be inserted and leave array sorted.  Return the
// index of that place (which may be array.length).
function lowerBound(array, value)
{
    var lo = 0;
    var hi = array.length;
    while (lo < hi) {
	// Invariant: array[lo-1] < value
	// Invariant: array[hi] >= value
	var mid = Math.floor((lo + hi) / 2);
	if (value > array[mid])
	    lo = mid + 1;
	else
	    hi = mid;
    }
    return lo;
}

// Given a sorted array and a value, find the last place in array
// where value could be inserted and leave array sorted.  Return the
// index of that place (which may be array.length).
function upperBound(array, value)
{
    var lo = 0;
    var hi = array.length;
    while (lo < hi) {
	// Invariant: value >= array[lo-1]
	// Invariant: value < array[hi]
	var mid = Math.floor((lo + hi) / 2);
	if (value < array[mid])
	    hi = mid;
	else
	    lo = mid + 1;
    }
    return lo;
}

// Return true iff value is a member of array.
function member_p(value, array)
{
    for (var i = 0, l = array.length; i < l; ++i) {
	if (array[i] == value) {
	    return true;
	}
    }
    return false;
}

// Return the index of the first element of array for which fn returns
// true, or -1 if no such element exists.
function findIf(fn, array)
{
    for (var i = 0, l = array.length; i < l; ++i) {
	if (fn(array[i])) {
	    return i;
	}
    }
    return -1;
}

// If value appears in array, remove the first instance of it and
// return true.  Otherwise, return false.
function remove(array, value)
{
    for (var i = 0, l = array.length; i < l; ++i) {
	if (array[i] == value) {
	    array.splice(i, 1);
	    return true;
	}
    }
    return false;
}

// Remove the first element of array for which fn returns true, and
// return true.  If no such element exists, return false.
function removeIf(fn, array)
{
    var i = findIf(fn, array);
    if (i != -1) {
	array.splice(i, 1);
	return true;
    }
    return false;
}

// Given a sorted array a, remove all duplicate elements.
function removeDups(a)
{
    if (a.length == 0)
	return;

    for (var i = 1, j = 0; i < a.length; ++i) {
	// Invariant: a[0...j] contains no dups
	if (a[i] != a[j]) {
	    ++j;
	    a[j] = a[i];
	}
    }

    // Since a[0..j] contains no dups, new length is j+1.
    a.splice(j + 1);
}

// Delete all rows from a TABLE/TBODY/THEAD/TFOOT.
function deleteAllRows(t)
{
    while (t.rows.length > 0)
	t.deleteRow(t.rows.length - 1);
}

// For every element in root with an id, add a property to target
// with the id as the name and the element as the value.
function setIdProperties(target, root)
{
    var nodes = root.getElementsByTagName('*');
    foreach(nodes, function (node) {
	if (node.id != null && node.id != '')
	    target[node.id] = node;
    });
}

// Return all of the property names of object as an array.
function keys(object)
{
    var k = new Array();
    for (p in object) {
	k.push(p);
    }
    return k;
}

// Convert the given array to a Tcl list.
function makeTclList(array)
{
    var l = '';
    for (var i = 0; i < array.length; ++i) {
	if (array[i] instanceof Array) {
	    l += '{';
	    l += makeTclList(array[i]);
	    l += '} ';
	}

	else {
	    var word = array[i].toString().replace(/[{}\\]/g, '\\$&');
	    if (word.match(/[ \t\r\n]/)) {
		l += '{';
		l += word;
		l += '} ';
	    }
	    else {
		l += word;
		l += ' ';
	    }
	}
    }
    return l;
}

// Return all descendants of node with tag name tag and class cname.
function getElementsByTagAndClass(node, tag, cname)
{
    var all_nodes = node.getElementsByTagName(tag);
    var filtered_nodes = new Array();
    for (var i = 0; i < all_nodes.length; ++i) {
	var child_node = all_nodes[i];
	if (child_node.getAttribute('class') == cname) {
	    filtered_nodes.push(child_node);
	}
    }

    return filtered_nodes;
}

// Convert an XML table to an array of objects.
function convertXmlTable(table)
{
    var objects = new Array();
    var rowNodes = table.childNodes;
    for (var i = 0; i < rowNodes.length; ++i) {
	var node = rowNodes[i];
	if (node.nodeType == Node.ELEMENT_NODE) {
	    objects.push(convertXmlTableRow(node));
	}
    }
    return objects;
}

// Convert an XML table row to an object.
function convertXmlTableRow(row)
{
//    var object = new Object();
    var object = new Array();
    var colNodes = row.childNodes;
    for (var i = 0; i < colNodes.length; ++i) {
//	var node = colNodes[i];
//	if (node.nodeType == Node.ELEMENT_NODE
//	    && node.firstChild
//	    && 'data' in node.firstChild)
//	{
//	    object[node.nodeName] = node.firstChild.data;
	    object.push(colNodes[i].firstChild.data);
//	}
    }
    return object;
}

// Remove all options from select.
function clearOptions(select)
{
    while (select.options.length > 0) {
	select.remove(select.options.length - 1);
    }
}

// Return the label of the selected option in a SELECT, or null.
function selectedLabel(select)
{
    var i = select.selectedIndex;
    return (i == -1) ? null : select.options[i].label;
}

// Return the value of the selected option in a SELECT, or null.
function selectedValue(select)
{
    var i = select.selectedIndex;
    return (i == -1) ? null : select.options[i].value;
}

// Set the SELECT selected value to value, if possible.
function selectValue(select, value)
{
    var options = select.options;
    for (var i = 0; i < options.length; ++i) {
	if (options[i].value == value) {
	    select.selectedIndex = i;
	    return;
	}
    }
}

// Asynchronously perform an HTTP GET on url.  Pass the resulting
// text to fn.
function doHttpGet(url, fn)
{
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
	fn(xhr.responseText, xhr.status);
    }
    xhr.open('GET', url);
    xhr.send(null);
    return xhr;
}

// Asynchronously perform an HTTP POST on url, passing data (which
// should be x-www-form-urlencoded) as the POST data. Pass the resulting
// text to fn.
function doHttpPost(url, data, fn)
{
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
	fn(xhr.responseText, xhr.status);
    }
    xhr.open('POST', url);
    xhr.setRequestHeader('Content-Type',
	'application/x-www-form-urlencoded');
    xhr.send(data);
    return xhr;
}

// Create a SELECT with the specified options that calls fn when
// changed.
function makeSelect(opts, selectedValue, fn)
{
    var select = document.createElement('select');

    foreach(opts, function (opt) {
	var option = new Option(opt.text, opt.value);
	option.object = opt;
	select.add(option);
	if (opt.value == selectedValue) {
	    select.selectedIndex = select.options.length - 1;
	}
    });

    return select;
}

// Return the first child of node for which fn returns true, or null
// if no such child exists.
function findChild(node, fn)
{
    var children = node.childNodes;
    for (var i = 0, l = children.length; i < l; ++i) {
	if (fn(children[i])) {
	    return children[i];
	}
    }
    return null;
}

// Return all children of root that match CSS selector selectorString.
//
// CSS3 selectors are supported with these exceptions:
//
// No escapes except \' and \" in quoted strings.
// No namespaces.
// XXX what else?

function getElementsBySelector(root, selectorString)
{

    function getPreviousElement(node) {
	if (node == null) { return null; }
	while (true) {
	    node = node.previousSibling;
	    if (node == null) { return null; }
	    if (node.nodeType == Node.ELEMENT_NODE) { return node; }
	}
    }

    function getNextElement(node) {
	if (node == null) { return null; }
	while (true) {
	    node = node.nextSibling;
	    if (node == null) { return null; }
	    if (node.nodeType == Node.ELEMENT_NODE) { return node; }
	}
    }

    function isSimpleSelector(type) {
	switch (type) {
	    case '*':
	    case 'ident':
	    case 'hash':
	    case 'class':
	    case '[':
	    case ':':
		return true;

	    default:
		return false;
	}
    }

    function isCombinator(type) {
	return type == ' ' || type == '>' || type == '+' || type == '~';
    }

    function isAttributeComparator(type) {
	switch (type) {
	    case '=':
	    case 'includes':
	    case 'dashmatch':
	    case 'prefixmatch':
	    case 'suffixmatch':
	    case 'substringmatch':
		return true;

	    default:
		return false;
	}
    }

    function tokenize(text) {

	var simpleLexers = [
	    { regexp:/^[ \t\r\n\f]+/, type:' ' },
	    { regexp:/^\/\*[^*]*\*+(?:[^\/][^*]*\*+)*\//, type:'comment' },
	    { regexp:/^~=/, type:'includes' },
	    { regexp:/^\|=/, type:'dashmatch' },
	    { regexp:/^\^=/, type:'prefixmatch' },
	    { regexp:/^\$=/, type:'suffixmatch' },
	    { regexp:/^\*=/, type:'substringmatch' },
	    // STRING is complex because of escapes and surrounding quotes .
	    // function must come before ident because function = ident + '('
	    { regexp:/^[A-Za-z_\x80-\uffff][-A-Za-z0-9_\x80-\uffff]*\(/, type:'function' },
	    { regexp:/^[A-Za-z_\x80-\uffff][-A-Za-z0-9_\x80-\uffff]*/, type:'ident' },
	    // NUMBER is unnecessary.  Nothing uses it.
	    // SIGNED_INTEGER is unnecessary.  We'll recognize it in the parser.
	    { regexp:/^-?[0-9]+/, type:'integer' },
	    // HASH is complex.
	];

	function getToken(text) {
	    if (text == '')
		return { type:'end', len:0, value:'' };

	    var m;

	    // Special handling for commas and combinators, to dump
	    // surrounding whitespace so we don't have to do it later.
	    if (m = text.match(/^[ \t\r\n\f]*([,+>~])[ \t\r\n\f]*/))
		return { type:text[0], len:m[0].length, value:m[1] };

	    for (var i = 0; i < simpleLexers.length; ++i) {
		m = simpleLexers[i].regexp.exec(text);
		if (m != null)
		    return { type:simpleLexers[i].type, len:m[0].length, value:m[0] };
	    }

	    if ((m = text.match(/^"(?:[^\\]|\\.)*"/))
		|| (m = text.match(/^'(?:[^\\]|\\.)*'/)))
	    {
		return { type:'string', len:m[0].length,
		    value:m[0].slice(1, -1).replace(/\\(.)/g, '$1') };
	    }

	    if (m = text.match(/^#[-A-Za-z0-9_\x80-\uffff]+/)) {
		return { type:'hash', len:m[0].length,
		    value:m[0].slice(1) };
	    }

	    if (m = text.match(/^\.[-A-Za-z0-9_\x80-\uffff]+/)) {
		return { type:'class', len:m[0].length,
		    value:m[0].slice(1) };
	    }

	    return { type:text[0], len:1, value:text[0] };
	}

	var tokens = new Array();

	// Discard surrounding whitespace first so we don't have to do
	// so later.
	text = text.replace(/^[ \t\r\n\f]+/,'').replace(/[ \t\r\n\f]+$/, '');

	do {
	    var token = getToken(text);
	    text = text.slice(token.len);

	    // For debugging...
	    token.toString = function () {
		return '{ type:\'' + this.type + '\' len:'
		    + this.len + ' value:\'' + this.value + '\' }';
	    }

	    if (token.type == 'comment')
		continue;

	    // Suppress repeated whitespace (created by comments).
	    if (token.type == ' ' && tokens[tokens.length - 1].type == ' ')
		    continue;

	    tokens.push(token);
	} while (token.type != 'end')

	return tokens;
    }

    // Some sequences of universal selectors separated by
    // combinators (with no other simple selectors) have
    // time complexity that is exponential in the number of
    // combinators if not handled carefully.  Applying the
    // following transformations eliminates many such cases.
    // '_' represents the space combinator.
    // 
    // +*~ becomes ~*+
    // >*_ becomes _*>
    // >*~ becomes >*+
    // _*_ becomes _*>
    // _*~ becomes _*+
    // ~*~ becomes ~*+
    //
    // The following function performs those transformations.
    // On entry, tokens[0] must be a combinator.

    var combinatorTransforms = [
	{ from:['+', '~'], to:['~', '+'] },
	{ from:['>', '_'], to:['_', '>'] },
	{ from:['>', '~'], to:['>', '+'] },
	{ from:[' ', '_'], to:['_', '>'] },
	{ from:[' ', '~'], to:['_', '+'] },
	{ from:['~', '~'], to:['~', '+'] }
    ];

    function transformCombinators(tokens) {
	do {
	    var check_again_p = false;

	    for (var i = 0; i < tokens.length - 3; ++i) {
		if (!isCombinator(tokens[i])
		    || tokens[i+1].type != '*'
		    || !isCombinator(tokens[i+2].type)
		)
		    continue;

		for (var j = 0; j < combinatorTransforms.length; ++j) {
		    var ct = combinatorTransforms[j];
		    if (tokens[j].type == ct.from[0]
			&& tokens[j+2].type == ct.from[1])
		    {
			tokens[j].type = ct.to[0];
			tokens[j+2].type = ct.to[1];
			check_again_p = true;
		    }
		}
	    }
	} while (check_again_p);
    }

    function makeSelectors(text) {
	var tokens = tokenize(text);
	transformCombinators(tokens);

	function returnTrue() { return true; }

	function makeMatchParent(nextMatcher) {
	    return function (node) {
		return node == null
		    ? false
		    : nextMatcher(node.parentNode);
	    }
	}

	function makeMatchAdjacent(nextMatcher) {
	    return function (node) {
		return nextMatcher(getPreviousElement(node));
	    }
	}

	function makeMatchAncestor(nextMatcher) {
	    return function (node) {
		while (node != null) {
		    if (nextMatcher(node.parentNode)) {
			return true;
		    }
		    node = node.parentNode;
		}
		return false;
	    }
	}

	function makeMatchOlderSibling(nextMatcher) {
	    return function (node) {
		if (node == null)
		    return false;
		while (true) {
		    node = getPreviousElement(node);
		    if (node == null)
			return false;
		    if (nextMatcher(node))
			return true;
		}
	    }
	}

	function makeMatchName(nextMatcher, name) {
	    name = name.toUpperCase();
	    return function (node) {
		return node != null
		    && node.nodeName == name
		    && nextMatcher(node);
	    }
	}

	function makeMatchAttExact(nextMatcher, name, value) {
	    return function (node) {
		return node != null
		    && node.getAttribute
		    && node.getAttribute(name) == value
		    && nextMatcher(node);
	    }
	}

	function makeMatchAttExists(nextMatcher, name) {
	    return function (node) {
		return node != null
		    && node.hasAttribute
		    && node.hasAttribute(name)
		    && nextMatcher(node);
	    }
	}

	function makeMatchAttPrefix(nextMatcher, name, value) {
	    return function (node) {
		return node != null
		    && node.hasAttribute
		    && node.hasAttribute(name)
		    && node.getAttribute(name).slice(0, value.length)
			== value
		    && nextMatcher(node);
	    }
	}

	function makeMatchAttSuffix(nextMatcher, name, value) {
	    return function (node) {
		return node != null
		    && node.hasAttribute
		    && node.hasAttribute(name)
		    && node.getAttribute(name).slice(-value.length) == value
		    && nextMatcher(node);
	    }
	}

	function makeMatchAttSubstr(nextMatcher, name, value) {
	    return function (node) {
		return node != null
		    && node.hasAttribute
		    && node.hasAttribute(name)
		    && node.getAttribute(name).indexOf(value) != -1
		    && nextMatcher(node);
	    }
	}

	function makeMatchAttWord(nextMatcher, name, word) {
	    return function (node) {
		return node != null
		    && node.hasAttribute
		    && node.hasAttribute(name)
		    && member_p(word, node.getAttribute(name).split(' '))
		    && nextMatcher(node);
	    }
	}

	function makeMatchAttDash(nextMatcher, name, word) {
	    return makeMatchAttPrefix(nextMatcher, name, word + '-');
	}

	function parseAttSelector(nextMatcher) {
	    tokens.shift();
	    if (tokens[0].type == ' ') tokens.shift();
	    if (tokens[0].type != 'ident') {
		throw 'selector contains "[" followed by '
		    + 'non-identifier "' + tokens[0].value + '"';
	    }
	    var name = tokens[0].value;
	    tokens.shift();

	    if (tokens[0].type == ' ') tokens.shift();
	    if (tokens[0].type == ']') {
		tokens.shift();
		return makeMatchAttExists(nextMatcher, name);
	    }

	    if (!isAttributeComparator(tokens[0].type)) {
		throw 'selector contains "[' + name
		    + '" followed by non-comparator "'
		    + tokens[0].value + '"';
	    }
	    var comparator = tokens[0].type;
	    tokens.shift();

	    if (tokens[0].type == ' ') tokens.shift();
	    if (tokens[0].type != 'ident' && tokens[0].type != 'string') {
		throw 'selector contains "[' + name
		    + comparator
		    + '" followed by non-identifier non-string "'
		    + tokens[0].value + '"';
	    }
	    var value = tokens[0].value;
	    tokens.shift();

	    if (tokens[0].type == ' ') tokens.shift();
	    if (tokens[0].type != ']') {
		throw 'selector contains "[' + name
		    + comparator + value
		    + '" followed by non-right-bracket "'
		    + tokens[0].value + '"';
	    }
	    tokens.shift();

	    switch (comparator) {
		case '=':
		    return makeMatchAttExact(nextMatcher, name, value);
		case 'substringmatch':
		    return makeMatchAttSubstr(nextMatcher, name, value);
		case 'prefixmatch':
		    return makeMatchAttPrefix(nextMatcher, name, value);
		case 'suffixmatch':
		    return makeMatchAttSuffix(nextMatcher, name, value);
		case 'dashmatch':
		    return makeMatchAttDash(nextMatcher, name, value);
		case 'includes':
		    return makeMatchAttWord(nextMatcher, name, value);
	    }
	}

	function parsePseudoSelector(nextMatcher) {
	    tokens.shift();
	    if (tokens[0].type != 'ident'
		&& tokens[0].type != 'function')
	    {
		throw 'selector contains ":" followed by '
		    + 'illegal token "' + tokens[0].value + '"';
	    }

	    var pseudo = tokens[0].value;
	    tokens.shift();

	    switch (pseudo) {
		case 'first-child':
		    return function (node) {
			return node != null
			    && getPreviousElement(node) == null
			    && nextMatcher(node);
		    };

		case 'last-child':
		    return function(node) {
			return node != null
			    && getNextElement(node) == null
			    && nextMatcher(node);
		    };

		case 'empty':
		    return function(node) {
			return node != null
			    && node.childNodes.length == 0
			    && nextMatcher(node);
		    };

		case 'not(':
		    var subMatcher = parseSimpleSelector(returnTrue);
		    if (tokens[0].type != ')') {
			throw 'negation not terminated by right-paren';
		    }
		    tokens.shift();
		    return function(node) {
			return !subMatcher(node)
			    && nextMatcher(node);
		    };

		default:
		    throw 'selector contains unsupported pseudo-selector "'
			+ pseudo + '"';
	    }
	}

	function parseSimpleSelector(nextMatcher) {
	    switch (tokens[0].type) {
		case 'ident':
		    nextMatcher = makeMatchName(nextMatcher,
			tokens[0].value);
		    tokens.shift();
		    return nextMatcher;

		case '*':
		    tokens.shift();
		    return nextMatcher;

		case '[':
		    return parseAttSelector(nextMatcher);

		case 'hash':
		    nextMatcher = makeMatchAttExact(nextMatcher,
			'id', tokens[0].value);
		    tokens.shift();
		    return nextMatcher;

		case ':':
		    return parsePseudoSelector(nextMatcher);

		default:
		    throw 'selector contains unknown token "'
			+ tokens[0].value + '"';
	    }
	}

	function parseSelector() {
	    var nextMatcher = returnTrue;
	    var lastSelectorName = null;
	    var lastSelectorId = null;

	    function checkCombinator() {
		if (nextMatcher == returnTrue)
		    throw 'selector starts with "' + tokens[0].type
			+ '" combinator';

		if (tokens[1].type == 'end' || tokens[1].type == ',') {
		    throw 'selector contains trailing "'
			+ tokens[0].type + '" combinator';
		}

		if (!isSimpleSelector(tokens[1].type)) {
		    throw 'selector contains "' + tokens[0].type
			+ '" combinator followed by non-simple '
			+ 'selector "' + tokens[1].value + '"';
		}

		lastSelectorName = null;
		lastSelectorId = null;
	    }

	parseLoop:
	    while (true) {
		switch (tokens[0].type) {
		    case 'end':
		    case ',':
			tokens.shift();
			break parseLoop;

		    case '>':
			checkCombinator();
			nextMatcher = makeMatchParent(nextMatcher);
			tokens.shift();
			break;

		    case '+':
			checkCombinator();
			nextMatcher = makeMatchAdjacent(nextMatcher);
			tokens.shift();
			break;

		    case ' ':
			checkCombinator();
			nextMatcher = makeMatchAncestor(nextMatcher);
			tokens.shift();
			break;

		    case '~':
			checkCombinator();
			nextMatcher = makeMatchOlderSibling(nextMatcher);
			tokens.shift();
			break;

		    case '*':
			if (nextMatcher == returnTrue) {
			    // universal combinator as first selector;
			    // must prevent other code from thinking
			    // no selectors given
			    nextMatcher = function () {
				return true;
			    }
			}
			tokens.shift();
			break;

		    case 'ident':
			nextMatcher = makeMatchName(nextMatcher,
			    tokens[0].value);
			lastSelectorName = tokens[0].value;
			tokens.shift();
			break;

		    case 'hash':
			nextMatcher = makeMatchAttExact(nextMatcher,
			    'id', tokens[0].value);
			lastSelectorId = tokens[0].value;
			tokens.shift();
			break;

		    case 'class':
			nextMatcher = makeMatchAttWord(nextMatcher,
			    'class', tokens[0].value);
			tokens.shift();
			break;

		    case '[':
			nextMatcher = parseAttSelector(nextMatcher);
			break;

		    case ':':
			nextMatcher = parsePseudoSelector(nextMatcher);
			break;

		    default:
			throw 'selector contains unknown token "'
			    + tokens[0].value + '"';
		}
	    }

	    if (nextMatcher == returnTrue)
		return null;

	    if (lastSelectorId != null) {
		return function (results, root) {
		    var candidate = root.getElementById(lastSelectorId);
		    if (nextMatcher(element))
			results.push(candidate);
		}
	    }

	    else {
		if (lastSelectorName == null)
		    lastSelectorName = '*';

		return function (results, root) {
		    var candidates = root.getElementsByTagName(
			lastSelectorName);
		    for (var i = 0; i < candidates.length; ++i) {
			if (nextMatcher(candidates[i]))
			    results.push(candidates[i]);
		    }
		}
	    }
	}

	var selectors = new Array();
	while (tokens.length > 0) {
	    var selector = parseSelector();
	    if (selector == null)
		throw 'unparseable token in selector: ' + tokens[0];
	    selectors.push(selector);
	}

	return selectors;
    }

    var nodes = new Array();

    if (selectorString == '') {
	return nodes;
    }

    var selectors = makeSelectors(selectorString);

    var results = new Array();

    for (var i = 0; i < selectors.length; ++i)
	selectors[i](results, root);

    return results;
}

// Add a method named setVisibility to `panel'. On
// `panel.setVisibility(true)', hide `shower', reveal `hider', reveal
// `panel', and call `fn(true)'. On `panel.setVisibility(false)',
// reveal `hider', hide `shower', hide `panel', and call `fn(false)'.
// Add a method named isVisible to `panel' that returns true if
// `panel' is revealed. Arrange for a click on `shower' to call
// `panel.setVisibility(true)'. Arrange for a click on `hider' to call
// `panel.setVisibility(false)'.
function makeDisclosure(shower, hider, panel, fn) {
    var shower_display = shower.style.display;
    var hider_display = hider.style.display;
    var panel_display = panel.style.display;

    if (fn == null) {
	fn = function () {};
    }

    panel.setVisibility = function (show_p) {
	if (show_p) {
	    shower.style.display = 'none';
	    hider.style.display = hider_display;
	    panel.style.display = panel_display;
	} else {
	    shower.style.display = shower_display;
	    hider.style.display = 'none';
	    panel.style.display = 'none';
	}

	fn(show_p);
    }

    panel.isVisible = function () {
	return panel.style.display != 'none';
    }

    shower.onclick = function () {
	panel.setVisibility(true);
    }

    hider.onclick = function () {
	panel.setVisibility(false);
    }
}

/// Remove any children of DOM element `e'.
function removeChildren(e) {
    while (e.lastChild) {
	e.removeChild(e.lastChild);
    }
}

/// Remove any children of DOM element `e', and add a text node
/// containing text `s'.
function setElementText(e, s) {
    removeChildren(e);
    e.appendChild(e.ownerDocument.createTextNode(s));
}

/// Create a Template using `element' (a DOM Element) as the root of the
/// template. The element is removed from its document. If `init_fn' is
/// not null, then the Template calls `init_fn' on each instance the
/// Template creates of itself.
function Template(element, initFunction) {
    this.root = element;
    this.initFunction = initFunction;
    if (element.parentNode != null) {
	element.parentNode.removeChild(element);
    }
}

/// Instantiate myself by deep-cloning my root. Let P be the value of
/// my root's id attribute (or the empty string if my root has no id
/// attribute). For every descendant of my root that has an id I, set
/// an attribute on the clone of root with name I.replace(/^P/,'') and
/// value referencing the clone of that descendant. Call my initFunction
/// (if it was specified and not null) as a method of the clone (meaning
/// that inside initFunction, `this' will refer to the clone) and
/// passing as arguments the arguments passed to `make'. Return the
/// clone.
Template.prototype.make = function () {
    var clone = this.root.cloneNode(true);
    clone.id = null;
    var prefix = this.root.id;
    if (prefix == null) prefix = '';
    foreach (clone.getElementsByTagName('*'), function (element) {
	if ('id' in element) {
	    var name = element.id;
	    element.id = null;
	    if (prefix.length > 0
		&& name.substring(0, prefix.length) == prefix)
	    {
		name = name.substring(prefix.length);
	    }
	    clone[name] = element;
	}
    });

    if (this.initFunction != null) {
	this.initFunction.apply(clone, arguments);
    }

    return clone;
}

/// Return a "path" for `node', meaning a string that describes the
/// position of `node' in its DOM tree in a way useful for debugging.
function nodePath(node) {
    var s = '';
    while (node != null) {
	if (node.id != null && node.id != '')
	    s = node.id + s;
	else if (node.nodeName != null && node.nodeName != '')
	    s = node.nodeName + s;
	else
	    s = node + s;
	s = '/' + s;
	node = node.parentNode;
    }
    if (s == '')
	s = 'null';
    return s;
}

/// Return a new function that invokes `fn' with `this' bound to
/// `object' and passes any arguments through to `fn'.
function method(object, fn) {
    return function() { return fn.apply(object, arguments); }
}

/// Short wrapper for getElementById.
function $(id) {
    return document.getElementById(id);
}

