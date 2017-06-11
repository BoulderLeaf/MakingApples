var Debug  = function()
{
	
}

Debug.prototype.Assert = function Assert(condition, message)
{
	 if (!condition) {
		message = message || "Assertion failed";
		if (typeof Error !== "undefined") {
			throw new Error(message);
		}
		throw message; // Fallback
	}
}

export default (new Debug())