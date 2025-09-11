// HSV 色空間変換ライブラリ的クラス

var HSVColorSpace;
HSVColorSpace = new function()
{
	var debugOut = false;
	
	// コンストラクタ
	var self = function HSVColorSpace()
	{
		
	};
	
	self.prototype = {
    constructor: self
		
		,initWithHexColor: function( hexRGBStr )
		{
			var idx = 0;
			for(var i =0;i<hexRGBStr.length;i++)
			{
				if( hexRGBStr.charAt(i) == '#' )
				{
					idx = i+1;
					break;
				}
			}
			
			var charNumPerColor = 2;
			if( hexRGBStr.length < 5 - idx){
				charNumPerColor = 1;
			}
			this.r = parseInt(hexRGBStr.substr(idx  ,charNumPerColor),16) / 0xFF;
			this.g = parseInt(hexRGBStr.substr(idx+2,charNumPerColor),16) / 0xFF;
			this.b = parseInt(hexRGBStr.substr(idx+4,charNumPerColor),16) / 0xFF;
			
			this.setupHSVfromRGBMember();
			
//			console.log(">> " + arguments.callee.caller + " >> ");
			if(debugOut)
			console.log("[HSVColorSpace initWithHexColor] (" + hexRGBStr + ")\n"
						+ "this.h = " + this.h + "\n"
						+ "this.s = " + this.s + "\n"
						+ "this.v = " + this.v + "\n"
						+ "this.r = " + this.r + "\n"
						+ "this.g = " + this.g + "\n"
						+ "this.b = " + this.b + "\n");
		}
		,initWithRGB: function (inR,inG,inB,denom)	//8bit/element decimal
		{
			this.r = inR / denom;
			this.g = inG / denom;
			this.b = inB / denom;
			
			this.setupHSVfromRGBMember();
			
			if(debugOut)
			console.log("[HSVColorSpace initWithRGB] (" +inR+","+inG+","+inB+","+denom+ ")\n"
						+ "this.h = " + this.h + "\n"
						+ "this.s = " + this.s + "\n"
						+ "this.v = " + this.v + "\n"
						+ "this.r = " + this.r + "\n"
						+ "this.g = " + this.g + "\n"
						+ "this.b = " + this.b + "\n");
		}
		
		,initWithHSV: function(inH,inS,inV)
		{
			isNaN(inH) ? this.h = 0 : this.h = inH;
			isNaN(inS) ? this.s = 0 : this.s = inS;
			isNaN(inV) ? this.v = 0 : this.v = inV;
						
			this.setupRGBfromHSVMember();
			
			if(debugOut)
			console.log("[HSVColorSpace initWithHSV] ("+inH+","+inS+","+inV+")\n"
						+ "this.h = " + this.h + "\n"
						+ "this.s = " + this.s + "\n"
						+ "this.v = " + this.v + "\n"
						+ "this.r = " + this.r + "\n"
						+ "this.g = " + this.g + "\n"
						+ "this.b = " + this.b + "\n");
		}
		
		,initWithHSVObject: function(hsvObj)
		{
			this.h = hsvObj.h;
			this.s = hsvObj.s;
			this.v = hsvObj.v;
			
			this.setupRGBfromHSVMember();
			
			if(debugOut)
			console.log("[HSVColorSpace initWithHSVObject] ("+hsvObj.h+","+hsvObj.s+","+hsvObj.v+")\n"
						+ "this.h = " + this.h + "\n"
						+ "this.s = " + this.s + "\n"
						+ "this.v = " + this.v + "\n"
						+ "this.r = " + this.r + "\n"
						+ "this.g = " + this.g + "\n"
						+ "this.b = " + this.b + "\n");
		}
		
		,setupHSVfromRGBMember: function()
		{
			var rgbMax = Math.max(Math.max(this.r,this.g),this.b);
			var rgbMin = Math.min(Math.min(this.r,this.g),this.b);
			
			// 色相
			var H = 0;
			if( rgbMax - rgbMin == 0)
			{
				H = 0;
			}
			else if(rgbMax == this.r)
			{
				H = 60.0 * ( (this.g - this.b) / (rgbMax - rgbMin));
			}
			else if( rgbMax == this.g )
			{
				H = 60.0 * ( (this.b - this.r) / (rgbMax - rgbMin)) + 120;
			}
			else
			{
				H = 60.0 * ( (this.r - this.g) / (rgbMax - rgbMin)) + 240;
			}
			
			if(H < 0){H += 360};
			
			// 彩度
			var S = 0;
			if( rgbMax > 0)
			{
				S = (rgbMax - rgbMin) / rgbMax;
			}
			
			
			// 明度
			var V = rgbMax;
			
			this.h = H;
			this.s = S;
			this.v = V;
			
//			console.log("[HSVColorSpace setupHSVfromRGBMember] \n"
//						+ 'this.h = ' + String(this.h) + "\n"
//						+ 'this.s = ' + String(this.s) + "\n"
//						+ 'this.v = ' + String(this.v) + "\n");
		}
		
		,setupRGBfromHSVMember: function()
		{
			if(this.s < 0){this.s = 0.0};
			if(this.v < 0){this.v = 0.0};
			if(this.s > 1){this.s = 1.0};
			if(this.v > 1){this.v = 1.0};
			
			while(this.h < 0 ){ this.h += 360; };
			while(this.h >= 360){ this.h -= 360; };
			
			if(this.s  == 0)
			{
				this.r = this.g = this.b = this.v;
			}
			
			var Hi = Math.floor(this.h/60);
//			console.log("Hi == " + Hi);
			var f = (this.h/60) - Hi;
			
			var p = this.v * (1 - this.s);
			var q = this.v * (1 - f * this.s);
			var t = this.v * (1 - (1 - f) * this.s);
			
//			my ($R,$G,$B);
			if( Hi == 0){
				this.r = this.v;
				this.g = t;
				this.b = p;
			}else if(Hi == 1){
				this.r = q;
				this.g = this.v;
				this.b = p;
			}else if(Hi == 2){
				this.r = p;
				this.g = this.v;
				this.b = t;
			}else if(Hi == 3){
				this.r = p;
				this.g = q;
				this.b = this.v;
			}else if(Hi == 4){
				this.r = t;
				this.g = p;
				this.b = this.v;
			}else if(Hi == 5){
				this.r = this.v;
				this.g = p;
				this.b = q;
			}
			
//			my @hexRGB = map{ sprintf("%02X", int($_ * 255)) }($R,$G,$B);
//			return wantarray ? @hexRGB : join('',@hexRGB) ;#{'r' =>$R , 'g'=>$G ,'b' => $B};
		}
		
		,hsvObject: function()
		{
			return {
				h:this.h
				,s:this.s
				,v:this.v
			};
		}
		
		,rgbObject: function()
		{
			return {
				r:this.r
				,g:this.g
				,b:this.b
			};
		}
		
		,rgbHexCode: function()
		{
			var hexstr = "";
			hexstr += ("00" + (Math.floor(this.r * 0xff)).toString(16)).substr(-2,2);
			hexstr += ("00" + (Math.floor(this.g * 0xff)).toString(16)).substr(-2,2);
			hexstr += ("00" + (Math.floor(this.b * 0xff)).toString(16)).substr(-2,2);
			
			return hexstr;
		}
		
		,description: function()
		{
			return "[HSVColorSpace description] \n"
						+ "HexColor = " + this.rgbHexCode() + "\n"
						+ "this.h = " + this.h + "\n"
						+ "this.s = " + this.s + "\n"
						+ "this.v = " + this.v + "\n"
						+ "this.r = " + this.r + "\n"
						+ "this.g = " + this.g + "\n"
						+ "this.b = " + this.b + "\n";
		}
		// 色相値 getter
		,hue: function()
		{
			return this.h;
		}
		
		// 色相値 setter
		,setHue: function( hue )
		{
			this.h = hue;
//			this.setupRGBfromHSVMember();
		}
		
		// 彩度 getter
		,saturation: function()
		{
			return this.s;
		}
		
		// 彩度値 setter
		,setSaturation: function( sat )
		{
			this.s = sat < 0 ? 0
					: sat > 1.0 ? 1.0
					: sat;
//			this.setupRGBfromHSVMember();
		}
		
		// 明度 getter
		,value: function()
		{
			return this.v;
		}
		
		// 明度 setter
		,setValue: function( val )
		{
			this.v = val < 0 ? 0
					: val > 1.0 ? 1.0
					: val;
//			this.setupRGBfromHSVMember();
		}
	};
	
	
	/* JavaScript から DOM アクセスで style.backgroundColor などをとってくると
	 "#RRGGBB" ではなく "rgb(170, 187, 204)" というような文字列が反ってくる場合がある
	 これを"#RRGGBB"表現にするためのユーティリティー関数
	 */
	self.domRGB2Hex = function(rgbExp)
	{
		var regexHexCharOnly = /^[0-9a-fA-F]+$/
		if( rgbExp.substr(0,1) == "#" )
		{
			return rgbExp;
		}
		else if(! rgbExp.length )
		{
			return "#000000";
		}
		else if(	rgbExp.length >= 3
				&&	regexHexCharOnly.test(rgbExp) )
		{
			return "#" + rgbExp;
		}
		
		var rgbMatched = rgbExp.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
		function hex(x) {
			return ("0" + parseInt(x).toString(16)).slice(-2);
		}
		return "#" + hex(rgbMatched[1]) + hex(rgbMatched[2]) + hex(rgbMatched[3]);
		
	};
	
	return self;
	
}