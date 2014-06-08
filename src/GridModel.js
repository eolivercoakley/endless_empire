import animate;
import device;
import ui.View;
import ui.ImageView;
import ui.resource.Image as Image;
import ui.widget.ButtonView as ButtonView;
import ui.widget.GridView as GridView;
import src.Item as Item;

exports = Class(ui.View, function (supr) {

	
	this.init = function (opts) {
		this.opts = merge(opts, {
			height : opts.height ? opts.height : 100,			
			zIndex : opts.zIndex ? opts.zIndex : 1,
		});

		this.gridItems = [];
		this.initialWidth = 100;
		this.initialY = device.height - 50 - this.opts.height;
		
		supr(this, 'init');

		this.build();
	};

	/*
	 * Layout
	 */
	this.build = function () {
		this._gridView = new GridView({
			superview: this.opts.superview,
			tierName: this.opts.tierName,
			backgroundColor : 'transparent',
			x: 0,
			y: this.initialY,
			zIndex : this.opts.zIndex,
			width: this.initialWidth,
			height: this.opts.height,
			cols: 1,
			rows: 1,
			//Make hide cells out of the grid range...
			hideOutOfRange: true,
			//Make cells in the grid range visible...
			showInRange: true
		});
	};
	
	//Adds a new item to the empire view
	this.addNewItemToGrid = function(item){		
		console.log("Adding a new item to the empire grid: ", this.opts.tierName);	
		this._gridView.updateOpts({width : this.initialWidth * (this.gridItems.length + 1), x : (device.width / 2) - (this.initialWidth * (this.gridItems.length + 1) / 2)});
		this._gridView.setCols(this.gridItems.length + 1);
		this.gridItems.push(new Item({superview: this._gridView, col : this.gridItems.length, tierName : item.getTierName(), spawnable : false}));
	};
	
	
});
