export default class EnumEditorController {
	constructor($scope, enums) {
		this.enums = enums;
		this.$scope = $scope;
		this.newEnumInput = "UniqueInputName";
		this.interactionDisabled = false;
		this.data = {};
		this.enumList = [];
		this.data.enums = {};
		this.enumInputs = {};
		this.init();
	}
	
	init(){
		this.interactionDisabled = true;
		this.enums.getEnums().then(function(enums){
			this.interactionDisabled = false;
			this.data.enums = enums;
			this._updateList();
			this.$scope.$applyAsync();
		}.bind(this));
	}
	
	createNew(){
		this.enums.createNew(this.newEnumInput);
		this._updateList();
		this.$scope.$applyAsync();
	}
	
	addKey(enumId){
		this.enums.addValue(enumId, this.enumInputs[enumId].newEnumName, 0);
		this._updateList();
		this.$scope.$applyAsync();
	}
	
	deleteValue(enumId, key){
		this.enums.deleteValue(enumId, key);
		this._updateList();
		this.$scope.$applyAsync();
	}
	
	save(){
		
		
		
		this.interactionDisabled = true;
		this.enums.save().then(function(enums){
			this.interactionDisabled = false;
			this.data.enums = enums;
			this._updateList();
			this.$scope.$applyAsync();
		}.bind(this));
	}
	
	deleteEnum(enumId){
		this.enums.delete(enumId);
		this._updateList();
		this.$scope.$applyAsync();
	}
	
	update_key(enumId, key, value)
	{
		this.data.enums[enumId][key] = value;
	}
	
	_updateList(){
		this.enumList = [];
		
		for(var i in this.data.enums)
		{
			this.enumInputs[i] = {newEnumName:"NewEnumName"};
			this.enumList.push({id:i, key_values:this.data.enums[i], inputs:this.enumInputs[i]});
		}
	}
}