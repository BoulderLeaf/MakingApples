var JS  = function()
{
	
}

JS.prototype.isValid = function isValid(value)
{
	return value !== null && value !== undefined && value !== NaN;
}

export default (new JS())