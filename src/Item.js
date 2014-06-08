import animate;
import device;
import ui.View;
import ui.ImageView;
import ui.resource.Image as Image;
import ui.widget.ButtonView as ButtonView;

var Item_image = new Image({url: "resources/images/Tier1/tier1_frame1.png"});

exports = Class(ui.View, function (supr) {

	this.init = function (opts) {
		this.opts = merge(opts, {
			width:	Item_image.getWidth(),
			height: Item_image.getHeight(),
			energyRate: opts.energyRate ? opts.energyRate : 1,
			purchasePrice: opts.purchasePrice ? opts.purchasePrice : 10,
			tierName : opts.tierName ? opts.tierName : "pinwheel"
		});
		
		supr(this, 'init');
		//console.error("Created new item: ", Item_image);
		this.build();
	};

	/*
	 * Layout
	 */
	this.build = function () {
		console.error(Item_image._originalURL);
		this.storeIcon = new ButtonView({
			superview: this.opts.superview,
			image: Item_image._originalURL,
			x: 0,
			y: 0,
			col: this.opts.col,
			backgroundColor : 'transparent',
  			row: 0,
		      on: {
		        up: bind(this, function () {
		        	if(this.opts.spawnable && this.opts.empire.user_current_energy >= this.opts.purchasePrice){
		        		this.spawnItemInEmpire(this.opts.empire);	
		        		this.opts.empire.adjustEnergyTotal((-1 * this.opts.purchasePrice));		        		
		        		this.opts.empire.adjustEnergyRate(this.opts.energyRate);		  	        		
		        	}
				})
		      }
		});
		console.log("New item built: ", this);
	};
	
	
	//Method to add the new Item to the empire
	//empireView = The Empire View 
	this.spawnItemInEmpire = function(empireView){
		   empireView.addNewItem(this);
	}
	
	this.getTierName = function(){
		return this.opts.tierName;
	}
	
});
