$(function() {
	var canvas = $("#c");
	var canvasHeight;
	var canvasWidth;
	var ctx;
	var dt = 0.1;
	
	var pointCollection;
	
	function init() {
		updateCanvasDimensions();
		
		var g =  [new Point(-45, 120, 0.0, 8, "#3059e3"),new Point(-45, 100, 0.0, 8, "#3059e3"),new Point(-45, 80, 0.0, 8, "#3059e3"),new Point(-45, 60, 0.0, 8, "#3059e3"),new Point(-45, 40, 0.0, 8, "#3059e3"),new Point(-45, 20, 0.0, 8, "#3059e3"),new Point(-45, 0, 0.0, 8, "#3059e3"),new Point(-25, 10, 0.0, 6, "#3059e3"),new Point(-10, 5, 0.0, 7, "#3059e3"),new Point(15, 15, 0.0, 8, "#3059e3"),new Point(0, 50, 0.0, 7, "#3059e3"),new Point(10, 35, 0.0, 7, "#3059e3"),new Point(-15, 60, 0.0, 7, "#3059e3"),new Point(-25, 75, 0.0, 6, "#3059e3"),new Point(-15, 90, 0.0, 7, "#3059e3"),new Point(-5, 105, 0.0, 7, "#3059e3"),new Point(10, 115, 0.0, 8, "#3059e3"),new Point(90, 120, 0.0, 7, "#cd4359"),new Point(80, 110, 0.0, 7, "#c41731"),new Point(70, 120, 0.0, 6, "#c41731"),new Point(60, 125, 0.0, 5, "#c41731"),new Point(50, 125, 0.0, 4, "#c41731"),new Point(45, 115, 0.0, 4, "#c41731"),new Point(50, 125, 0.0, 4, "#c41731"),new Point(45, 105, 0.0, 5, "#c41731"),new Point(48, 95, 0.0, 5, "#c41731"),new Point(53, 85, 0.0, 6, "#c41731"),new Point(67, 80, 0.0, 7, "#c41731"),new Point(75, 95, 0.0, 7, "#c41731"),new Point(120, 120, 0.0, 7, "#ed9d33"),new Point(120, 105, 0.0, 7, "#ed9d33"),new Point(120, 90, 0.0, 7, "#ed9d33"),new Point(120, 75, 0.0, 7, "#ed9d33"),new Point(132, 85, 0.0, 5, "#ed9d33"),new Point(145, 77, 0.0, 6, "#ed9d33"),new Point(155, 88, 0.0, 7, "#ed9d33"),new Point(157, 105, 0.0, 7, "#ed9d33"),new Point(157, 122, 0.0, 7, "#ed9d33"),new Point(225, 25, 0.0, 8, "#3059e3"),new Point(225, 45, 0.0, 8, "#3059e3"),new Point(225, 65, 0.0, 8, "#3059e3"),new Point(225, 85, 0.0, 8, "#3059e3"),new Point(225, 105, 0.0, 8, "#3059e3"),new Point(225, 125, 0.0, 7, "#3059e3"),new Point(210, 125, 0.0, 8, "#3059e3"),new Point(195, 115, 0.0, 7, "#3059e3"),new Point(185, 100, 0.0, 7, "#3059e3"),new Point(195, 85, 0.0, 7, "#3059e3"),new Point(205, 70, 0.0, 7, "#3059e3"),new Point(205, 70, 0.0, 7, "#3059e3"),new Point(255, 100, 0.0, 5, "#11ab35"),new Point(270, 108, 0.0, 5, "#11ab35"),new Point(285, 100, 0.0, 5, "#11ab35"),new Point(293, 90, 0.0, 5, "#11ab35"),new Point(280, 80, 0.0, 6, "#11ab35"),new Point(265, 88, 0.0, 5, "#11ab35"),new Point(257, 115, 0.0, 5, "#11ab35"),new Point(270, 125, 0.0, 7, "#11ab35"),new Point(285, 120, 0.0, 6, "#11ab35"),new Point(300, 118, 0.0, 5, "#11ab35"),new Point(325, 125, 0.0, 7, "#cd4359"),new Point(325, 110, 0.0, 7, "#cd4359"),new Point(325, 95, 0.0, 7, "#cd4359"),new Point(325, 80, 0.0, 7, "#cd4359"),new Point(325, 65, 0.0, 7, "#cd4359"),new Point(325, 50, 0.0, 7, "#cd4359"),new Point(325, 35, 0.0, 7, "#cd4359"),new Point(325, 20, 0.0, 7, "#cd4359"),new Point(325, 5, 0.0, 7, "#cd4359")];
		gLength = g.length;
		for (var i = 0; i < gLength; i++) {
			g[i].curPos.x = (canvasWidth/2 - 180) + g[i].curPos.x;
			g[i].curPos.y = (canvasHeight/2 - 65) + g[i].curPos.y;
			
			g[i].originalPos.x = (canvasWidth/2 - 180) + g[i].originalPos.x;
			g[i].originalPos.y = (canvasHeight/2 - 65) + g[i].originalPos.y;
		};
		
		pointCollection = new PointCollection();
		pointCollection.points = g;
		
		initEventListeners();
		timeout();
	};
	
	function initEventListeners() {
		$(window).bind('resize', updateCanvasDimensions).bind('mousemove', onMove);
		
		canvas.get(0).ontouchmove = function(e) {
			e.preventDefault();
			onTouchMove(e);
		};
		
		canvas.get(0).ontouchstart = function(e) {
			e.preventDefault();
		};
	};
	
	function updateCanvasDimensions() {
		canvas.attr({height: $(window).height(), width: $(window).width()});
		canvasWidth = canvas.width();
		canvasHeight = canvas.height();

		draw();
	};
	
	function onMove(e) {
		if (pointCollection)
			pointCollection.mousePos.set(e.pageX, e.pageY);
	};
	
	function onTouchMove(e) {
		if (pointCollection)
			pointCollection.mousePos.set(e.targetTouches[0].pageX, e.targetTouches[0].pageY);
	};
	
	function timeout() {
		draw();
		update();
		
		setTimeout(function() { timeout() }, 30);
	};
	
	function draw() {
		var tmpCanvas = canvas.get(0);

		if (tmpCanvas.getContext == null) {
			return; 
		};
		
		ctx = tmpCanvas.getContext('2d');
		ctx.clearRect(0, 0, canvasWidth, canvasHeight);
		
		if (pointCollection)
			pointCollection.draw();
	};
	
	function update() {		
		if (pointCollection)
			pointCollection.update();
	};
	
	function Vector(x, y, z) {
		this.x = x;
		this.y = y;
		this.z = z;
 
		this.addX = function(x) {
			this.x += x;
		};
		
		this.addY = function(y) {
			this.y += y;
		};
		
		this.addZ = function(z) {
			this.z += z;
		};
 
		this.set = function(x, y, z) {
			this.x = x; 
			this.y = y;
			this.z = z;
		};
	};
	
	function PointCollection() {
		this.mousePos = new Vector(0, 0);
		this.points = new Array();
		
		this.newPoint = function(x, y, z) {
			var point = new Point(x, y, z);
			this.points.push(point);
			return point;
		};
		
		this.update = function() {		
			var pointsLength = this.points.length;
			
			for (var i = 0; i < pointsLength; i++) {
				var point = this.points[i];
				
				if (point == null)
					continue;
				
				var dx = this.mousePos.x - point.curPos.x;
				var dy = this.mousePos.y - point.curPos.y;
				var dd = (dx * dx) + (dy * dy);
				var d = Math.sqrt(dd);
				
				if (d < 150) {
					point.targetPos.x = (this.mousePos.x < point.curPos.x) ? point.curPos.x - dx : point.curPos.x - dx;
					point.targetPos.y = (this.mousePos.y < point.curPos.y) ? point.curPos.y - dy : point.curPos.y - dy;
				} else {
					point.targetPos.x = point.originalPos.x;
					point.targetPos.y = point.originalPos.y;
				};
				
				point.update();
			};
		};
		
		this.draw = function() {
			var pointsLength = this.points.length;
			for (var i = 0; i < pointsLength; i++) {
				var point = this.points[i];
				
				if (point == null)
					continue;

				point.draw();
			};
		};
	};
	
	function Point(x, y, z, size, colour) {
		this.colour = colour;
		this.curPos = new Vector(x, y, z);
		this.friction = 0.8;
		this.originalPos = new Vector(x, y, z);
		this.radius = size;
		this.size = size;
		this.springStrength = 0.1;
		this.targetPos = new Vector(x, y, z);
		this.velocity = new Vector(0.0, 0.0, 0.0);
		
		this.update = function() {
			var dx = this.targetPos.x - this.curPos.x;
			var ax = dx * this.springStrength;
			this.velocity.x += ax;
			this.velocity.x *= this.friction;
			this.curPos.x += this.velocity.x;
			
			var dy = this.targetPos.y - this.curPos.y;
			var ay = dy * this.springStrength;
			this.velocity.y += ay;
			this.velocity.y *= this.friction;
			this.curPos.y += this.velocity.y;
			
			var dox = this.originalPos.x - this.curPos.x;
			var doy = this.originalPos.y - this.curPos.y;
			var dd = (dox * dox) + (doy * doy);
			var d = Math.sqrt(dd);
			
			this.targetPos.z = d/100 + 1;
			var dz = this.targetPos.z - this.curPos.z;
			var az = dz * this.springStrength;
			this.velocity.z += az;
			this.velocity.z *= this.friction;
			this.curPos.z += this.velocity.z;
			
			this.radius = this.size*this.curPos.z;
			if (this.radius < 1) this.radius = 1;
		};
		
		this.draw = function() {
			ctx.fillStyle = this.colour;
			ctx.beginPath();
			ctx.arc(this.curPos.x, this.curPos.y, this.radius, 0, Math.PI*2, true);
			ctx.fill();
		};
	};
	
	init();
});