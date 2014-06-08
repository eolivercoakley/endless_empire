import device;
import ui.TextView;
import ui.ImageView;
import ui.widget.ButtonView as ButtonView;
import ui.widget.GridView as GridView;
import src.Item as Item;
import src.Price as Price;
import src.Empire as Empire;
import src.GridModel as GridModel;
import src.StoreData as StoreData;
//User variables

//Item Tab variables
var Items_num = 5;

exports = Class(GC.Application, function () {

	this.initUI = function () {
		 //General UI Style
		 this.view.style.backgroundColor = "#FFFFFF";
		 
		 //Crystal Icon
		 new ButtonView({
		      superview: this.view,
		      width: 100,
		      height: 100,
		      justifyContent: 'center', 
		      layoutHeight: 'wrapContent', 
		      layoutWidth: 'wrapContent',
		      y: 50,
		      x: 50,
		      images: {
		        up: "resources/images/logo3.jpg",
		      },
		      on: {
		        up: bind(this, function () {
		        	this.empire_view.user_current_energy = this.empire_view.user_current_energy + 1;
				})
		      }
		    });
		    
		//Bottom resource bar    
		this.energy_text_view = new ui.TextView({
				backgroundColor : "#ebebeb",
				superview: this,
				x: 0,
				y: device.height - 50,
				width: device.width / 2,
				height: 50,
				autoSize: false,
				size: 38,
				verticalAlign: 'middle',
				horizontalAlign: 'center',
				wrap: false,
				color: '#000000'
			});
			
		//Bottom resource bar    
		this.energy_rate_text_view = new ui.TextView({
				backgroundColor : "#ebebeb",
				superview: this,
				x: device.width / 2,
				y: device.height - 50,
				width: device.width / 2,
				height: 50,
				autoSize: false,
				size: 38,
				verticalAlign: 'middle',
				horizontalAlign: 'center',
				wrap: false,
				color: '#000000'
			});		
					
					//Empire
		 this.empire_view = new Empire({superview: this.view, col: x, empire : this._empireView, 
		 	energy_rate_text_view : this.energy_rate_text_view, energy_text_view : this.energy_text_view});
		 	
		//Store Menu: Buttons	
		this._storeView_buttons = new GridView({
			superview: this.view,
			backgroundColor : 'transparent',
			x: device.width - 610,
			y: 10,
			width: 600,
			height: 100,
			cols: 6,
			rows: 1,
			//Make hide cells out of the grid range...
			hideOutOfRange: true,
			//Make cells in the grid range visible...
			showInRange: true
		});		
		
		//Store Menu: Text	
		this._storeView_text = new GridView({
			superview: this.view,
			backgroundColor : 'transparent',
			x: device.width - 610,
			y: 110,
			width: 600,
			height: 50,
			cols: 6,
			rows: 1,
			//Make hide cells out of the grid range...
			hideOutOfRange: true,
			//Make cells in the grid range visible...
			showInRange: true,
			borderColor : "red"
		});

		//Populate store menu
		for (var x = 0; x < 6; x++) {
			new Item(
				{
					superview: this._storeView_buttons, col: x, empire : this.empire_view, spawnable : true,
					purchasePrice : StoreData.storeInfo[x].energy_cost, energyRate : StoreData.storeInfo[x].energy_rate, tierName : StoreData.storeInfo[x].tier + x
				}
			);			
			new Price(
				{
					superview: this._storeView_text, purchasePrice : StoreData.storeInfo[x].energy_cost, col : x
				}
			);
		}
		
		//Interval for updating counters
		setInterval(function(){
			this.empire_view.updateEnergyRate();
		}.bind(this),100);
		
		//Interval for generating rate growth 		
		setInterval(function(){
			this.empire_view.addEnergyRateToTotal(0.1);
		}.bind(this),100);
			
		};			
	
	this.launchUI = function () {};
});
