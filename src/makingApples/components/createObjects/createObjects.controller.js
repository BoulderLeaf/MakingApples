export default class CreateObjectsController {
	constructor($scope, creatorObjects, enums) {
		this.creatorObjects = creatorObjects;
		this.enums = enums;
		this.$scope = $scope;
		this.objects = {};
		this.newObjectInput = "new_object_name";
		this.objectList = [];
		this.inputs = {
			newParamName:"NewParamName",
			newParamType:0,
			selectedType:''
		}
		this.objectParamTypes = {};
		this.enumData = {};
		
		this.objectParamTypes = 'ObjectParamTypes';
		
		this._init();
	}
	
	_init()
	{
		this.interactionDisabled = true;
		this.creatorObjects.getObjects().then(function(objects){
			this.objects = objects;
			this._fetchEnums();
		}.bind(this));
	}
	
	_fetchEnums(){
		this.interactionDisabled = true;
		this.enums.getEnums().then(function(enums){
			
			if(this._hasRequiredEnums(enums))
			{
				this._initEnums(enums);
				this.interactionDisabled = false;
				this._updateList();
				this.$scope.$applyAsync();
			}
			else
			{
				this._generateRequiredEnums();
			}
			
		}.bind(this));
	}
	
	_generateRequiredEnums(){
		
		this.enums.createNew(this.objectParamTypes);
		this.enums.addValue(this.objectParamTypes, "ENUM", 0);
		this.enums.addValue(this.objectParamTypes, "STRING", 1);
		this.enums.addValue(this.objectParamTypes, "NUMBER", 2);
		
		this.enums.save().then(function(enums){
			this.interactionDisabled = false;
			this._initEnums(enums);
			this._updateList();
			this.$scope.$applyAsync();
		}.bind(this));
	}
	
	_initEnums(enums)
	{
		this.enumData = enums;
	}
	
	_hasRequiredEnums(enums){
		return enums[this.objectParamTypes] !== undefined &&
			enums[this.objectParamTypes].ENUM !== undefined &&
			enums[this.objectParamTypes].STRING !== undefined &&
			enums[this.objectParamTypes].NUMBER !== undefined;
	}
	
	createNew(){
		this.creatorObjects.createNew(this.newObjectInput);
		this._updateList();
		this.$scope.$applyAsync();
	}
	
	createNewProperty(objectId){
		
		var value = null;
		var valueKey = null;
		var selectedType = this.enumData[this.objectParamTypes][this.inputs.selectedType];
		
		switch(selectedType)
		{
			case '0':
				value = 0;
				valueKey = this.objectParamTypes;
				break;
			case '1':
				value = "";
				break;
			case '2':
				value = 0;
				break;
				
		}
		
		this.creatorObjects.createNewProperty(objectId, selectedType, this.inputs.newParamName, value, valueKey)
		this._updateList();
		this.$scope.$applyAsync();
	}
	
	deleteObject(id){
		this.creatorObjects.deleteObject(id).then(function(){
			this.$scope.$applyAsync();
		}.bind(this));
	}
	
	save(){
		this.interactionDisabled = true;
		this.creatorObjects.save().then(function(objects){
			this.interactionDisabled = false;
			this.objects = objects;
			this._updateList();
			this.$scope.$applyAsync();
		}.bind(this));
	}
	
	_updateList(){
		this.objectList.length = 0;
		this.inputs.objects = {};
		for(var i in this.objects)
		{
			this.objectList.push({id:i, object:this.objects[i]});
		}
	}
	
	dropdownSelectType(enumValue){
		this.inputs.selectedType = enumValue;
	}
}