import animate;
import device;
import ui.TextView;
import ui.View;
import ui.ImageView;
import ui.resource.Image as Image;
import ui.widget.ButtonView as ButtonView;

exports = Class(ui.View, function (supr) {

	this.init = function (opts) {
		this.opts = merge(opts, {
			purchasePrice: opts.purchasePrice ? opts.purchasePrice : 10,
		});
		
		supr(this, 'init');
		this.build();
		this.setPrice();
	};

	/*
	 * Layout
	 */
	this.build = function () {
		this.priceIcon = new ui.TextView({
				superview: this.opts.superview,
				backgroundColor : "transparent",
				width: device.width / 2,
				height: 10,
				autoSize: false,
				size: 32,
				verticalAlign: 'middle',
				horizontalAlign: 'center',
				col: this.opts.col,
				row: 0,
				wrap: false,
				color: '#ffffff'
			});		
	};
	
	this.setPrice = function(){
		this.priceIcon.setText(this.opts.purchasePrice);
	}		
});
