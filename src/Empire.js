import animate;
import device;
import ui.View;
import ui.ImageView;
import ui.resource.Image as Image;
import ui.widget.ButtonView as ButtonView;
import ui.View as View;
import src.GridModel as GridModel;


exports = Class(ui.View, function (supr) {

	this.grid_tier = []; //The arrays which store each tier of item
	this.user_current_energy = 0;
	this.user_current_energy_rate = 0;
	this.fractionOfEnergy = 0; //Used for adding multiple energy amounts per second
	
	this.init = function (opts) {
		this.opts = merge(opts, {
		});

		supr(this, 'init');

		this.build();
	};

	/*
	 * Layout
	 */
	this.build = function () {
		this._empireView = new View({
			backgroundColor: "#111111",
		      superview: this.opts.superview,
		      width: device.width,
		      height: device.height - 50,		      
		      justifyContent: 'center', 
		      layoutHeight: 'wrapContent', 
		      layoutWidth: 'wrapContent',
		      y: 0,
		      x: 0,
		      zIndex : -1,
		});
	};
	
	//Adds a new item to the empire view
	this.addNewItem = function(item){		
		console.log("Adding a new item to the empire: ", item);	
		//Check if tier exists, if not create a new tier
		if(this.checkGridForTier(item.getTierName()) == false){
			this.createTier(item);
		}	
		//add object to tier
		var grid = this.getGridTier(item.getTierName());		
		grid ? grid.addNewItemToGrid(item) : "";
	};
	
	//Creates and adds a tier to the grid_tier object, based on an item class
	this.createTier = function(item){		
		console.log("Creating a new tier");
		this.grid_tier.push(new GridModel({superview: this.opts.superview, tierName : item.getTierName(), zIndex : (6 - this.grid_tier.length), height : ((this.grid_tier.length + 1) * 100)}));
		console.log("Current Grid: ", this.grid_tier )
	};
	
	//Checks the array of grids.
	//Returns true if any of the items contain a name matching "tierName"
	this.checkGridForTier = function(tierName){
		for(var i = 0; i < this.grid_tier.length; i++){
			console.error("Looking for: " + this.grid_tier[i].opts.tierName );
			if(this.grid_tier[i].opts.tierName == tierName){
				return true;
			}
		}
		return false;
	}
	
	this.getGridTier = function(tierName){
		for(var i = 0; i < this.grid_tier.length; i++){
			if(this.grid_tier[i].opts.tierName == tierName){
				return this.grid_tier[i];
			}
		}
		return null;
	}
	
	//Adjusts the current energy rate by the "amount" value
	this.adjustEnergyRate = function(amount){
		this.user_current_energy_rate += amount;
	}
	
	//Adjusts the total energy amount by the "amount" value
	this.adjustEnergyTotal = function(amount){
		this.user_current_energy += amount;
	}
	
	this.updateEnergyRateAmount = function(){	
		this.opts.energy_rate_text_view.setText(this.user_current_energy_rate);
	}
	
	this.updateEnergyAmount = function(){	
		this.opts.energy_text_view.setText(this.user_current_energy);
	}
	
	//Updates both the total and growth amounts
	this.updateEnergyRate = function(){
		if(this.user_current_energy_rate > -1){
			this.updateEnergyRateAmount();
			this.updateEnergyAmount();					
		}
	}
	
	//Adds the growth rate to the total
	//@param - amtOfTotal : Multiplies the enery rate amount and adds that to the current energy. Default is 1. Used for multiple updates per second
	this.addEnergyRateToTotal = function(timesPerSecond){
		if(!timesPerSecond){
			var timesPerSecond = 1;
		}
		//Determine the amount to add
		var amtToAdd = this.fractionOfEnergy + (timesPerSecond * this.user_current_energy_rate);
		//Update the amount we're adding in this instance (whole numbers only, and fractions are saved)
		this.fractionOfEnergy = Number((amtToAdd % 1).toFixed(4));		
		amtToAdd = Math.floor(amtToAdd);
		//Add to current
		this.user_current_energy += amtToAdd;
	}
	
});
