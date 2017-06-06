import appleEnums from "../../../enums";
import config from "../../../config";

export default class CreateObjectsController {
	constructor($scope, creatorObjects, enums) {
		this.creatorObjects = creatorObjects;
		this.enums = enums;
		this.$scope = $scope;
		this.objects = {};
		this.newObjectInput = "new_object_name";
		this.objectList = [];
		this.appleEnums = appleEnums;
		this.config = config;
		
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
				this._updateModel();
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
			this._updateModel();
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
		this._updateModel();
		this.$scope.$applyAsync();
	}
	
	createNewProperty(objectId){
		
		var value = null;
		var valueKey = null;
		var selectedType = this.enumData[this.objectParamTypes][this.inputs.selectedType];
		
		switch(selectedType)
		{
			case appleEnums.ObjectParamType.ENUM:
				value = 0;
				valueKey = this.objectParamTypes;
				break;
			case appleEnums.ObjectParamType.STRING:
				value = "";
				break;
			case appleEnums.ObjectParamType.NUMBER:
				value = 0;
				break;
				
		}
		
		this.creatorObjects.createNewProperty(objectId, selectedType, this.inputs.newParamName, value, valueKey)
		this._updateModel();
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
			this._updateModel();
			this.$scope.$applyAsync();
		}.bind(this));
	}
	
	_updateModel(){
		this.objectList.length = 0;
		this.inputs.objects = {};
		for(var i in this.objects)
		{
			this.objectList.push({id:i, object:this.objects[i]});
			this.inputs.objects[i] = {params:{}};
			
			for(var j in this.objects[i].params)
			{
				this.inputs.objects[i].params[j] = {value:this.objects[i].params[j].value, valueKey:this.objects[i].params[j].valueKey}
			}
		}
	}
	
	paramValueChange(objectId, paramId, value){
		this.objects[objectId].params[paramId].value = this.inputs.objects[objectId].params[paramId].value;
	}
	
	paramEnumChange(objectId, paramId, enumId){
		this.objects[objectId].params[paramId].valueKey = enumId;
		this.objects[objectId].params[paramId].value = this.enumData[enumId][Object.keys(this.enumData[enumId])[0]];
		this._updateModel();
		this.$scope.$applyAsync();
	}
	
	paramEnumValueChange(objectId, paramId, value){
		this.objects[objectId].params[paramId].value = value;
	}
	
	dropdownSelectType(enumValue){
		this.inputs.selectedType = enumValue;
	}
	
	deleteParam(objectId, paramId){
		this.creatorObjects.deleteParam(objectId, paramId);
		this._updateModel();
		this.$scope.$applyAsync();
	}
	deleteObject(objectId){
		this.creatorObjects.deleteObject(objectId);
		this._updateModel();
		this.$scope.$applyAsync();
	}
}