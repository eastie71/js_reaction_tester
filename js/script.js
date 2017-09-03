		var startTime, delayTime, maxDelay, bestTime, avgTime, totalTime, lastXTime, best10Time, countX, totalCount, thisXTime;
		maxRangeCount = 10;
		maxDelay = 2000; // Max 2 second delay.
		
		resetTimes();
		displayShapeAfterTimeout();
		
		function resetTimes() {
			lastXTime = avgTime = countX = totalCount = totalTime = thisXTime = 0;
			bestTime = bestXTime = 1000000;
			document.getElementById('lastTimeResult').innerHTML = "Your time:";
			document.getElementById('counter').style.display = "none";
			document.getElementById('lastXResults').style.display = "none";
		}

		function displayShapeAfterTimeout() {
			createShape();
			// First time make it the maximum delay time
			if (totalCount == 0)
				delayTime = maxDelay;
			else
				delayTime = (Math.random()*maxDelay);
			// Remember that setTimeout is asynchronous - so even though there is a delay in displaying the
			// shape for the user the program continues.
			// Here we have the shape READY to be displayed - it will be displayed after the "delay" time,
			// and the startTime is set at the same time
			setTimeout(function () {
				startTime = Date.now();
				document.getElementById('coloredShape').style.display = "block";
			}, delayTime);
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

		function setShapeSizePos() {
			var shapeSize = (Math.floor(Math.random()*300)+30);
			var maxTopMargin = window.innerHeight;
			var maxLeftMargin = window.innerWidth;

			var marginTop = Math.max(Math.floor(Math.random()*maxTopMargin-300), 0);
			var marginLeft = Math.max(Math.floor(Math.random()*maxLeftMargin)-30, 0);
//alert("Win Height: "+ maxTopMargin + ", Win Width: " + maxLeftMargin + ", Margin Top: " + marginTop + ", Margin Left: " + marginLeft);
			if (shapeSize + marginTop > window.innerHeight-300)
				marginTop-=shapeSize;
			if (shapeSize + marginLeft > window.innerWidth)
				marginLeft -= shapeSize;
			
			document.getElementById('coloredShape').style.marginTop = marginTop + "px";
			document.getElementById('coloredShape').style.marginLeft = marginLeft + "px";
			document.getElementById('coloredShape').style.width = shapeSize + "px";
			document.getElementById('coloredShape').style.height = shapeSize + "px";
			return;
		}

		function setShapePos() {
			//alert("width = " + window.innerWidth + ", height = " + window.innerHeight);
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
			document.getElementById('coloredShape').style.display = "none";
			setShapeSizePos();
			setShapeType();
			//setShapePos();
			setShapeColor();
		}

		document.getElementById('resetTime').onclick = function () {
			alert("Reset All Times...");
			resetTimes();
			// Redisplay the image and reset the start time
			document.getElementById('coloredShape').style.display = "none";
			displayShapeAfterTimeout();
		};

		document.getElementById('coloredShape').onclick = function () {
			var endTime = Date.now();
			var timeTaken = (endTime - startTime)/1000;
			document.getElementById('resetTime').style.display = "block";
			this.style.display = "none";
		
			countX++;
			totalCount++;
			totalTime += timeTaken;
			// Round to 2 decimal places
			avgTime = Math.round(100*totalTime/totalCount)/100;
			if (bestTime > timeTaken) {
				bestTime = timeTaken;
			}
			if (countX > maxRangeCount) {
				// Round to 2 decimal places
				lastXTime = Math.round(100*lastXTime)/100;
				if (bestXTime > lastXTime) {
					bestXTime = lastXTime;
				}
				// Display Last and Best X times
				//alert("Last X Times = " + lastXTime + ", Best X times = " + bestXTime);

				countX = 1;
				thisXTime = lastXTime;
				lastXTime = timeTaken;
			} else {
				lastXTime += timeTaken;
			}
			document.getElementById('lastTimeResult').innerHTML = "Your time: " + timeTaken + "s " + "(Best time: " + bestTime + "s)";
			document.getElementById('counter').innerHTML = "Total Clicks: <strong>" + totalCount + "</strong> Average Click Time: <strong>" + avgTime + "s</strong>";
			if (totalCount <= maxRangeCount)
				document.getElementById('lastXResults').innerHTML ="Run Count: <strong>" + countX + "</strong> of <strong>" + maxRangeCount + "</strong>";
			else
				document.getElementById('lastXResults').innerHTML ="Run Count: <strong>" + countX + "</strong> of <strong>" + maxRangeCount + "</strong> Last " + maxRangeCount + ": <strong>" + thisXTime + "s</strong> (Best " + maxRangeCount + ": <strong>" + bestXTime + "s</strong>)";
			document.getElementById('counter').style.display = "block";
			document.getElementById('lastXResults').style.display = "block";
			//alert("Total Count = " + totalCount + ", Best Time = " + bestTime + ", Average Time = " + avgTime);

			displayShapeAfterTimeout();
		}