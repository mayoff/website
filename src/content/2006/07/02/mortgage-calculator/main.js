
labelSortAccessors = {
    nameLabel: function (loan) { return loan.nodes.name.value; },
    downpaymentLabel: function (loan) { return loan.downpayment; },
    yearsLabel: function (loan) { return loan.months; },
    rateLabel: function (loan) { return loan.monthlyRateFraction; },
    pointsLabel: function (loan) { return loan.pointsFraction; },
    feesLabel: function (loan) { return loan.fees; },
    extraPaymentLabel: function (loan) { return loan.extraPayment; },
    closingCostsLabel: function (loan) { return loan.closingCosts; },
    requiredPaymentLabel: function (loan) { return loan.payment; },
    totalPaymentLabel: function (loan) {
	return loan.payment + loan.extraPayment; },
    bailOutEquityLabel: function (loan) { return loan.bailOutEquity; },
    bailOutInvestmentLabel: function (loan) { return loan.bailOutInvestment; },
    bailOutTotalLabel: function (loan) { return loan.bailOutTotal; },
    finalInvestmentLabel: function (loan) { return loan.finalInvestment; },
};

window.formatDollars = function (v)
{
    v = Math.round(v * 100).toString();
    while (v.length < 3)
	v = '0' + v;
    return v.slice(0, -2) + '.' + v.slice(-2);
}

function
yNodeToPage(y, node)
{
    while (node.offsetParent) {
	y += node.offsetTop;
	node = node.offsetParent;
    }
    return y;
}

function
startDrag(loan, e)
{
    document.addEventListener('mousemove', drag_mousemove, true);
    document.addEventListener('mouseup', drag_mouseup, true);

    drag_loan = loan;
    // drag_offset = e.pageY - yNodeToPage(0, loan.nodes.row);

    drag_loan.nodes.row.style.backgroundColor = '#eeeeff';
}

function
drag_mousemove(e)
{
    var oldPosition = 0;
    for ( ; oldPosition < loans.length; ++oldPosition) {
	if (loans[oldPosition] == drag_loan)
	    break;
    }

    var newPosition = 0;
    for ( ; newPosition < loans.length; ++newPosition) {
	var overRow = loans[newPosition].nodes.row;
	if (yNodeToPage(overRow.offsetHeight / 2, overRow) > e.pageY)
	    break;
    }

    if (newPosition > oldPosition)
	--newPosition;

    if (newPosition == oldPosition)
	return;

    loans.splice(oldPosition, 1);
    loans.splice(newPosition, 0, drag_loan);

    loanTable.removeChild(drag_loan.nodes.row);
    if (newPosition == loans.length - 1) {
	loanTable.appendChild(drag_loan.nodes.row);
    } else {
	loanTable.insertBefore(drag_loan.nodes.row,
	    loans[newPosition + 1].nodes.row);
    }

    var s = '';
    foreach(loans, function (loan) { s += loan.nodes.name.value + ' ' });
    console.log(s);
}

function
drag_mouseup(e)
{
    drag_mousemove(e);
    document.removeEventListener('mousemove', drag_mousemove, true);
    document.removeEventListener('mouseup', drag_mouseup, true);
    drag_loan.nodes.row.style.backgroundColor = null;
    saveMyState();
}

function
DOMTemplate(root)
{
    this.root = root;
    if (root.parentNode) {
	root.parentNode.removeChild(root);
    }

    var nodePaths = {};
    nodePaths[root.id] = [];
    //root.removeAttribute('id');

    function findNodePaths(node, map, path) {
	for (var i = 0; i < node.childNodes.length; ++i) {
	    path.push(i);
	    var child = node.childNodes[i];
	    if (child['id'] != '' && child['id'] != null) {
		map[child.id] = path.slice(0);
		//child.removeAttribute('id');
	    }
	    findNodePaths(child, map, path);
	    path.pop();
	}
    }
    findNodePaths(root, nodePaths, []);
    this.nodePaths = nodePaths;
}

 DOMTemplate.prototype.
make = function () {
    var nodes = {};
    var instance = this.root.cloneNode(true);

    for (var name in this.nodePaths) {
	var path = this.nodePaths[name];
	var node = instance;
	for (var i = 0; i < path.length; ++i) {
	    node = node.childNodes[path[i]];
	}
	nodes[name] = node;
    }

    return nodes;
}

function
Loan(original)
{
    this.nodes = Loan.template.make();
    var n = this.nodes;
    n.row = n.loan;
    n.loan = this;

    if (original) {
	loanTable.insertBefore(n.row, original.nodes.row);

	for (var name in n) {
	    var node = n[name];
	    if (node.tagName != 'INPUT')
		continue;
	    var type = node.getAttribute('type');
	    if (type == 'text')
		node.value = original.nodes[name].value;
	    else if (type == 'checkbox')
		node.checked = original.nodes[name].checked;
	}
    } else {
	loanTable.appendChild(n.row);
    }

    foreach(n.row.getElementsByTagName('INPUT'),
	makeTextInputAutosizing);

    n.copy.addEventListener('click', method(this, function () {
	addLoanBasedOn(this);
    }), false);

    n.remove.addEventListener('click', method(this, function () {
	n.row.parentNode.removeChild(n.row);
	remove(loans, this);
	if (loans.length == 0) {
	    loans.push(new Loan(null));
	}
    }), false);

    n.move.addEventListener('mousedown', method(this, function (e) {
	e.cancelBubble = true;
	if (e.preventDefault) e.preventDefault();
	if (e.stopPropagation) e.stopPropagation();
	startDrag(this, e);
    }), true);

    var computeMethod = method(this, this.compute);

    for (var name in n) {
	if (n[name].tagName == 'INPUT') {
	    n[name].addEventListener('change', computeMethod, false);
	}
    }

    // Whoever creates me is responsible for saving the state.
    this.computeWithoutSaving();
}

 Loan.prototype.
computeMonthlyPayment = function ()
{
    var p0 = this.loanAmount;
    var t = this.months;
    var r = this.monthlyRateFraction;
    return Math.ceil(100 * r * p0 * Math.pow(1 + r, t) / (Math.pow(1 + r, t) - 1)) / 100;
}

 Loan.prototype.
amortize = function (callback)
{
    var d = {
	month: 0,
	principal: this.loanAmount,
	interest: 0,
	investment: this.cashUpFront - this.closingCosts
    };

    for (var i = 0; i < 360; ++i) {
	d.month = i + 1;
	d.interest = d.principal * this.monthlyRateFraction;
	d.taxSavings = d.interest * this.taxFraction;
	var nonInterest = this.extraPayment + this.payment - d.interest;
	if (!this.investTaxSavings)
	    nonInterest += d.taxSavings;
	if (nonInterest > d.principal) {
	    nonInterest -= d.principal;
	    d.principal = 0;
	} else {
	    d.principal -= nonInterest;
	    nonInterest = 0;
	}
	d.investment *= 1 + this.investmentMonthlyFraction;
	d.investment += nonInterest + this.monthlyInvestment;
	if (this.investTaxSavings)
	    d.investment += d.taxSavings;
	if (!callback.call(this, d))
	    break;
    }

    return d;
}

 Loan.prototype.
compute = function ()
{
    this.computeWithoutSaving();
    saveMyState();
}

 Loan.prototype.
computeWithoutSaving = function ()
{
    var n = this.nodes;

    this.cashUpFront = parseFloat($('cashUpFront').value);
    this.cashMonthly = parseFloat($('cashMonthly').value);
    this.investmentMonthlyFraction = parseFloat($('investmentPercent').value) / 1200;
    this.salePrice = parseFloat($('salePrice').value);
    this.taxFraction = parseFloat($('taxPercent').value) / 100;
    this.investTaxSavings = n.investTaxSavings.checked;
    this.monthlyRateFraction = parseFloat(n.loanRatePercent.value) / 1200;
    this.months = Math.round(parseFloat(n.years.value) * 12);
    this.bailOutMonths = Math.min(this.months,
	Math.round(parseFloat($('bailOutYears').value) * 12));
    this.pointsFraction = parseFloat(n.points.value) / 100;
    this.fees = parseFloat(n.fees.value);

    if (n.maxDown.checked) {
	var dp = this.cashUpFront - this.fees -
	    this.pointsFraction * this.salePrice;
	dp /= 1 - this.pointsFraction;
	n.downpayment.value = formatDollars(dp);
	autosizeTextInput(n.downpayment);
    }

    this.downpayment = parseFloat(n.downpayment.value);
    this.loanAmount = this.salePrice - this.downpayment;
    this.pointsDollars = this.pointsFraction * this.loanAmount;
    this.closingCosts = this.pointsDollars + this.fees + this.downpayment;

    this.payment = this.computeMonthlyPayment();

    if (n.maxExtra.checked) {
	n.extraPayment.value = formatDollars(this.cashMonthly - this.payment);
	autosizeTextInput(n.extraPayment);
    }
    this.extraPayment = parseFloat(n.extraPayment.value);
    this.monthlyInvestment = this.cashMonthly - this.payment - this.extraPayment;

    var d = this.amortize(function (d) {
	if (d.month == this.bailOutMonths) {
	    this.bailOutEquity = this.salePrice - d.principal;
	    this.bailOutInvestment = d.investment;
	    this.bailOutTotal = this.bailOutEquity + this.bailOutInvestment;
	}
	return true;
    });

    this.finalInvestment = d.investment;

    setElementText(this.nodes['closingCosts'],
	formatDollars(this.closingCosts));
    setElementText(this.nodes['payment'], formatDollars(this.payment));
    setElementText(this.nodes['totalPayment'],
	formatDollars(this.payment + this.extraPayment));
    setElementText(this.nodes['bailOutEquity'],
	formatDollars(this.bailOutEquity));
    setElementText(this.nodes['bailOutEquity'],
	formatDollars(this.bailOutEquity));
    setElementText(this.nodes['bailOutInvestment'],
	formatDollars(this.bailOutInvestment));
    setElementText(this.nodes['bailOutTotal'],
	formatDollars(this.bailOutTotal));
    setElementText(this.nodes['finalInvestment'],
	formatDollars(this.finalInvestment));

    //this.drawPaymentBreakdown();
    //this.drawAmortization();
}

 Loan.prototype.
getState = function () {
    var state = {};
    for (var name in this.nodes) {
	var node = this.nodes[name];
	if (node.tagName != 'INPUT')
	    continue;
	var type = node.getAttribute('type');
	if (type == 'text') {
	    state[name] = node.value;
	}
	else if (type == 'checkbox') {
	    state[name] = node.checked;
	}
    }
    return state;
}

 Loan.prototype.
setState = function (state) {
    for (var name in state) {
	var node = this.nodes[name];
	var type = node.getAttribute('type');
	if (type == 'text') {
	    node.value = state[name];
	}
	else if (type == 'checkbox') {
	    node.checked = eval(state[name]);
	}
    }
    this.computeWithoutSaving();
}

function
autosizeTextInput(node)
{
    var size = 1;
    if (node.value) {
	size = node.value.length * .8;
    }
    if (size < 3) size = 3;
    node.style.width = size + 'em';
}

function
makeTextInputAutosizing(node)
{
    if (!node.type || node.type != 'text')
	return;
    node.addEventListener('keyup', function () { autosizeTextInput(this); },
	false);
    autosizeTextInput(node);
}

function
computeAll()
{
    foreach(loans, function (loan) { loan.compute(false); });
    saveMyState();
}

function
addLoanBasedOn(originalLoan)
{
    var newLoan = new Loan(originalLoan);
    if (originalLoan == null) {
	loans.push(newLoan);
    } else {
	for (var i = 0; i < loans.length; ++i) {
	    if (loans[i] == originalLoan) {
		loans.splice(i, 0, newLoan);
		break;
	    }
	}
    }
    saveMyState();
    return newLoan;
}

function
saveMyState()
{
    for (var name in globalInputs) {
	setState(name, globalInputs[name].value);
    }

    var loanStates = new Array();
    foreach(loans, function (loan) {
	loanStates.push(loan.getState());
    });
    setState('loans', loanStates);

    saveState();
}

function
sortLoans(accessor)
{
    // Simple stable insertion sort, since Mozilla's Array.sort isn't
    // stable.

    for (var i = 1, l = loans.length; i < l; ++i) {
	var vi = accessor(loans[i]);
	var j;
	for (j = 0; j < i; ++j) {
	    if (accessor(loans[j]) > vi) {
		var t = loans[i];
		loans.splice(i, 1);
		loans.splice(j, 0, t);
		break;
	    }
	}
    }

    foreach(loans, function (loan) {
	loanTable.removeChild(loan.nodes.row);
	loanTable.appendChild(loan.nodes.row);
    });

    saveMyState();
}

window.addEventListener('load', function() {

    for (var id in labelSortAccessors) {
	(function (id) {
	    $(id).addEventListener('click', function (e) {
		sortLoans(labelSortAccessors[id]);
		e.cancelBubble = true;
		if (e.preventDefault) e.preventDefault();
		if (e.stopPropagation) e.stopPropagation();
	    }, true);
	})(id);
    }

    loadState();

    Loan.template = new DOMTemplate($('loan'));

    globalInputs = new Object();
    foreach(document.getElementsByTagName('INPUT'), function (node) {
	makeTextInputAutosizing(node);
	node.addEventListener('change', computeAll, false);
	if ('id' in node) {
	    globalInputs[node.id] = node;
	    var state = getState(node.id);
	    if (state)
		node.value = state;
	}
    });

    loanTable = $('loanTable').tBodies[0];
    loans = new Array();
    var loanStates = getState('loans');
    if (loanStates) {
	foreach(loanStates, function (state) {
	    var loan = new Loan(null);
	    loan.setState(state);
	    loans.push(loan);
	});
	foreach(document.getElementsByTagName('INPUT'), function (node) {
	    if (node.getAttribute('type') == 'text') {
		autosizeTextInput(node);
	    }
	});
    } else {
	addLoanBasedOn(null);
    }

}, false);
