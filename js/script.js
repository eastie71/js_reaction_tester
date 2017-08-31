		var startTime, delayTime;
		delayTime = (Math.random()*1500);

		displayShapeAfterTimeout(delayTime, function () {
			startTime = new Date().getTime();
		});

		function displayShapeAfterTimeout(dTime, callback) {
			setTimeout(createShape(), dTime);
			// Now set the start time.
			callback();
		}
		
		function setShapeType() {
			var shapeType = (Math.floor(Math.random()*2));

			if (shapeType == 0) {
				document.getElementById('coloredShape').style.borderRadius = "0%";
			} else {
				document.getElementById('coloredShape').style.borderRadius = "50%";
			}
			return;
		}

		function setShapeSize() {
			var shapeSize = (Math.floor(Math.random()*300)+30);
			document.getElementById('coloredShape').style.width = shapeSize + "px";
			document.getElementById('coloredShape').style.height = shapeSize + "px";
			return;
		}

		function setShapePos() {
			var maxTopMargin = window.screen.availHeight - 400;
			var maxLeftMargin = window.screen.availWidth - 200;

			var marginTop = (Math.floor(Math.random()*maxTopMargin));
			var marginLeft = (Math.floor(Math.random()*maxLeftMargin));
			document.getElementById('coloredShape').style.marginTop = marginTop + "px";
			document.getElementById('coloredShape').style.marginLeft = marginLeft + "px";
			return;
		}

		function setShapeColor() {			
			var colorNum = (Math.floor(Math.random()*16777215));
			var hexColorNum = decimalToHex(colorNum, 2);

			document.getElementById('coloredShape').style.backgroundColor = "#" + hexColorNum;
		}

		function decimalToHex(d, padding) {
			var hex = Number(d).toString(16);
			padding = typeof (padding) === "undefined" || padding === null ? padding = 2 : padding;
			while (hex.length < padding) {
        		hex = "0" + hex;
    		}
    		return hex;
		}

		function createShape() {
			setShapeSize();
			setShapeType();
			setShapePos();
			setShapeColor();
			document.getElementById('coloredShape').style.display = "block";
		}

		document.getElementById('coloredShape').onclick = function () {
			var endTime = new Date().getTime();
			var timeTaken = (endTime - startTime)/1000;
			document.getElementById('timeResult').innerHTML = "Your time: " + timeTaken + "s";

			document.getElementById('coloredShape').style.display = "none";
			delayTime = (Math.random()*1500);
			displayShapeAfterTimeout(delayTime, function () {
				startTime = new Date().getTime();
			});

		}