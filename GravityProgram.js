var particles = new Array();
var deadParticles = new Array();
var vectorFieldArrows = new Array();
var gravityConstant = 0.5;
var width;
var height;
var save_button;
var clear_button;
var reset_button;
var gravityBool = true;
var time_label, time_input, time = 0;
var play_button, playBoolean = false;
var nextFrame_button;
var toggleTrails_button;			// set toggleTrailsBool for starting
var toggleDeadTrails_button;		// toggleDeadTrailsBool = true;
var toggleTrailsOptions_radio;
var toggleFadeTrails_button;		// toggleFadeTrailsBool = false;
var toggleStaticParticle_checkbox;
var toggleWall_checkbox;
var toggleVectorField_checkbox;
var customParticleMass_label, customMass_input, defaultMass = 500;
var mouseClickPos = null;
var undoLastParticle_button, undoLastParticle;
var clearTrail_button, clearTrail;
var controlsContainerWidth = 485;
var toggleTrailsContainer;
var toggleCollision_checkbox;

function setup() {

	var canvas = createCanvas(document.getElementById("canvasContainer").offsetWidth, windowHeight-10);
	canvas.parent("canvasContainer");

	background(0);

	save_button = createButton("Save Screenshot");
  	save_button.mousePressed(saveScreen);
  	save_button.parent("SettingsContainer");

  	reset_button = createButton("RESET");
  	reset_button.parent("SettingsContainer");
  	reset_button.mousePressed(reset);

  	clear_button = createButton("Clear Particles");
  	clear_button.parent("SettingsContainer");
  	clear_button.mousePressed(clearParticle);

  	undoLastParticle_button = createButton("Undo Last Particle");
  	undoLastParticle_button.parent("SettingsContainer");
  	undoLastParticle_button.mousePressed(undoLastParticle);

  	clearTrail_button = createButton("Clear Trails");
  	clearTrail_button.parent("SettingsContainer");
  	clearTrail_button.mousePressed(clearTrail);

  	play_button = createButton("Start/Stop Time");
  	play_button.size(100);
  	createElement("br").parent("SettingsContainer");
  	play_button.parent("SettingsContainer");
  	play_button.mousePressed(playControl);

  	nextFrame_button = createButton("Next Frame");
  	nextFrame_button.parent("SettingsContainer");
  	nextFrame_button.mousePressed(nextFrame);

  	customParticleMass_label = createSpan("Custom Particle:");
  	customParticleMass_label.parent("customParticleContainer");
	createElement("br").parent("customParticleContainer");

  	createSpan("Mass:").parent("customParticleContainer");

  	customMass_input = createInput(defaultMass);
  	customMass_input.value(defaultMass);
  	customMass_input.size(50);
  	customMass_input.parent("customParticleContainer");


	toggleStaticParticle_checkbox = createCheckbox("Toggle Static Particle", false);
	toggleStaticParticle_checkbox.parent("customParticleContainer");

	toggleTrails_button = createCheckbox("Enable Trails", true);
	toggleTrails_button.parent("ParticleOptionContainer");
	toggleTrails_button.changed(function(){redraw()});

	toggleTrailsOptions_radio = createRadio();
	toggleTrailsOptions_radio.parent(ParticleOptionContainer);

	toggleTrailsOptions_radio.option("Show Default Trails", 1);
		toggleTrailsOptions_radio.child(document.createElement("br"));
			toggleTrailsOptions_radio.child(document.createElement("br"));

	toggleTrailsOptions_radio.option("Show Entire Path History", 2);
		toggleTrailsOptions_radio.child(document.createElement("br"));
			toggleTrailsOptions_radio.child(document.createElement("br"));

	toggleTrailsOptions_radio.option("Show Entire Path History For Every Particle That Ever Existed", 3);
		toggleTrailsOptions_radio.child(document.createElement("br"));

	toggleTrailsOptions_radio.changed(function(){redraw()});
	toggleTrailsOptions_radio.value(1);

  	time_label = createSpan("Run for ");
  	time_label.parent("GameplaySettingsContainer");

  	time_input = createInput(time);
  	time_input.value(time);
  	time_input.size(75);
  	time_input.parent("GameplaySettingsContainer");

  	setTime_button = createButton("seconds. Go!");
  	setTime_button.parent("GameplaySettingsContainer");
  	setTime_button.mousePressed(setTime);

	createElement("br").parent("GameplaySettingsContainer");

  	var preSet1_button = createButton("Pre-Set 1");
  	preSet1_button.parent("GameplaySettingsContainer");
  	preSet1_button.mousePressed(preSet1);

  	var preSet2_button = createButton("Pre-Set 2");
  	preSet2_button.parent("GameplaySettingsContainer");
  	preSet2_button.mousePressed(preSet2);

  	var preSet3_button = createButton("Pre-Set 3");
  	preSet3_button.parent("GameplaySettingsContainer");
  	preSet3_button.mousePressed(preSet3);

  	var preSet4_button = createButton("Pre-Set 4");
  	preSet4_button.parent("GameplaySettingsContainer");
  	preSet4_button.mousePressed(preSet4);

  	var preSet5_button = createButton("Pre-Set 5");
  	preSet5_button.parent("GameplaySettingsContainer");
  	preSet5_button.mousePressed(preSet5);

  	var randomParticles_button = createButton("Random Particles!");
  	randomParticles_button.parent("GameplaySettingsContainer");
  	randomParticles_button.mousePressed(randomParticles);

	toggleVectorField_checkbox = createCheckbox("Enable Vector Field", false);
	toggleVectorField_checkbox.parent("GameplaySettingsContainer");
	toggleVectorField_checkbox.changed(function(){redraw()});

	toggleCollision_checkbox = createCheckbox("Enable Collision", false);
	toggleCollision_checkbox.parent("GameplaySettingsContainer");

	toggleWall_checkbox = createCheckbox("Enable Walls", true);
	toggleWall_checkbox.parent("GameplaySettingsContainer");

	createElement("br").parent("GameplaySettingsContainer");
	var twoBody_label = createSpan("Two Body:");
  	twoBody_label.parent("GameplaySettingsContainer");
	createElement("br").parent("GameplaySettingsContainer");
	
	var twoBodyPreSet1_button = createButton("2B - Pre-Set 1");
  	twoBodyPreSet1_button.parent("GameplaySettingsContainer");
  	twoBodyPreSet1_button.mousePressed(twoBodyPreSet1);

  	var twoBodyPreSet2_button = createButton("2B - Pre-Set 2");
  	twoBodyPreSet2_button.parent("GameplaySettingsContainer");
  	twoBodyPreSet2_button.mousePressed(twoBodyPreSet2);
	
	
	initializeVectorField();

  	noLoop();

  	frameRate(30);


}

function draw()
{

	background(0);


	if(playBoolean)
	{
		gravityCalc();
		

		for(var i = 0; i < particles.length; i++)
		{
		 	// Update and display
		 	particles[i].update();
		}

		
	}

	for(var i = 0; i < particles.length; i++)
	{
	 	//Display
	 	particles[i].display();

	}

	if(toggleTrails_button.checked()) //toggle ALL trails
	{

		if(toggleTrailsOptions_radio.value() == 1)
		{
						

			for(var i = 0; i < particles.length; i++)
			{
				particles[i].displayFadingTrails();
			}
		}
		if(toggleTrailsOptions_radio.value() == 2)
		{

			for(var i = 0; i < particles.length; i++)
			{
				particles[i].displayTrails();
			}
		}
		if(toggleTrailsOptions_radio.value() == 3)
		{

			for(var i = 0; i < particles.length; i++)
			{
				particles[i].displayTrails();
			}
			for(var i = 0; i < deadParticles.length; i++)
			{
				deadParticles[i].displayTrails();
			}
		}

	}
	

	if(toggleVectorField_checkbox.checked())
	{
		displayVectorField();
			//camera(particles[0].position.x,particles[0].position.y,0,0,0,0,0,0,0);
			//translate(particles[0].position.x, particles[0].position.y);
	}



}

function Particle(m, v, x, y)
{
	this.mass = m;

	this.position = createVector(x,y);
	this.velocity = v;

	this.acceleration = createVector(0,0);
	this.color = color(random(75,255),random(75,255),random(75,255));

	this.absorb = absorbParticle;
	//this.radius = Math.cbrt(this.mass);
	//more accurate radius
	this.radius = Math.cbrt((3/4*PI)*(this.mass));
	this.history = new Array();

	this.static = false;
}

function newParticle(m, v, x, y)
{

	var p = new Particle(m, v, x, y);
	
	particles.push(p);
}

function newStaticParticle(m, v, x, y)
{

	var p = new Particle(m, v, x, y);
	p.static = true;
	
	particles.push(p);
}

function VectorFieldArrow(x,y)
{
	this.location = createVector(x,y);
	this.length = 20;
	this.angle = 0;
	this.magColor = color(200,180);


	this.update = function(magVector)
	{
    	this.angle = atan2(magVector.y - this.location.y, magVector.x - this.location.x);
  	};

  	this.display = function()
  	{
	    push();
	 	strokeWeight(4);
		stroke(this.magColor);
		fill(this.magColor);
		translate(x, y);
		rotate(this.angle);
		line(0, 0, this.length, 0);
		triangle(this.length/1.5,this.length/6,this.length,0,this.length/1.5,-this.length/6);
		pop();
  	};
}

function newVectorFieldArrow(x,y)
{
	var vfa = new VectorFieldArrow(x,y);

	vectorFieldArrows.push(vfa);

}

function mousePressed()
{

    mouseClickPos = [mouseX, mouseY];

}

function mouseReleased()
{
	var mouseClickPosNew = [mouseX, mouseY];
	var deltax = mouseClickPos[0] - mouseClickPosNew[0];
	var deltay = mouseClickPos[1] - mouseClickPosNew[1];


	if( (mouseClickPos[0] < width) && (mouseClickPos[1] < height) ) //check if mouse click is inside canvas
	{
		//clicked and released at same point
		if(deltax == 0 && deltay == 0)
		{

			if(toggleStaticParticle_checkbox.checked())
			{
				newStaticParticle( parseInt(customMass_input.value()) , createVector(0,0), mouseX, mouseY);

				redraw();
			}
			else
			{

				newParticle( parseInt(customMass_input.value()) , createVector(0,0), mouseX, mouseY);

				redraw();
			}
		}
		else
		{

			var distance = sqrt(deltax*deltax + deltay*deltay);


			var velocity = createVector(deltax, deltay);
			velocity.div(10); //damping for mouse drag

			newParticle( parseInt(customMass_input.value()) , velocity, mouseX, mouseY);

		}
	}

	return false;

}

function saveScreen()
{
	saveCanvas("Screenshot");
}

function clearParticle()
{
	for(var i = 0; i < particles.length; i++)
	{
		deadParticles.push(particles[i]);
	}

	do
	{
		particles.pop();
	}while(particles.length != 0)

	redraw();
}

function undoLastParticle()
{
	particles.pop();

	redraw();
}

function clearTrail()
{
	
	for(var i = 0; i < particles.length; i++)
	{
		do
		{
		 	particles[i].history.pop();
		}while(particles[i].history.length != 0)
	}

	for(var i = 0; i < deadParticles.length; i++)
	{
		do
		{
		 	deadParticles[i].history.pop();
		}while(deadParticles[i].history.length != 0)
	}

	redraw();
}

function reset()
{
	clearParticle();
	do
	{
		deadParticles.pop();
	}while(deadParticles.length != 0)
	customMass_input.value(defaultMass);
	time_input.value(0);
	playBoolean = false;
	play_button.html("Start/Stop Time");
	background(0);
	clear();
	redraw();
}

function playControl() //loop if playBoolean is true
{
	playBoolean = !playBoolean;

	if(playBoolean) // time/frame should start
	{
		loop();
		play_button.html("Pause");
	}
	else  // time/frame should stop
	{
		noLoop();
		play_button.html("Play");
	}


}

function nextFrame()
{
	noLoop();
	playBoolean = true;
	redraw();
	playBoolean = false;

}

function setTime()
{
	time = parseInt(time_input.value());
	time = frameRate()*time;

	for(var i = 0; i < time; i++)
	{
		playBoolean = true;
		redraw();
	}
	
	playBoolean = false;


}

function preSet1()
{
	var pos1 = createVector(width/2, height/2);

	newParticle(500, createVector(25,25), pos1.x, pos1.y);

	redraw();
}

function preSet2()
{
	var incX = width / 10;
	var incY = height / 10;


	for(var i = 0; i < 9; i++)
	{
		var velocity = createVector(0,0);

		newParticle(400, velocity, incX + incX*i, incY + incY*i);
	}

	redraw();

}

function preSet3()
{
	var incX = width / 7;
	var incY = height / 7;

	for(var i = 0; i < 6; i++)
	{
		for(var j = 0; j < 6; j++)
		{

			var velocity = createVector(0,0);
			newParticle(200, velocity, incX + incX*j, incY + incY*i);

		}
	}

	redraw();

}

function preSet4()
{
	var incX = width / 15;
	var incY = height / 15;


	newStaticParticle(500000, createVector(0,0), width/2, height/2);

	newParticle(50, createVector(0,49), (width/2) + 100 , (height/2));

	newParticle(50, createVector(0,35), (width/2) + 200 , (height/2));

	newParticle(500, createVector(0,30), (width/2) + 275 , (height/2));

	redraw();

}

function preSet5()
{
	var planet1 = createVector(width/7,height/7); //pos for planet 1
	var planet1Moon = createVector(planet1.x + 50, planet1.y); //moon pos for pos1
	newParticle(300, createVector(0,0), planet1.x, planet1.y); //planet 1
	newParticle(3, createVector(0,2), planet1Moon.x, planet1Moon.y); //moon for planet 1


	var planet2 = createVector(width/6 * 5.5 ,height/6 * 5.5); //pos for planet 2
	var planet2Moon = createVector(planet2.x + 30, planet2.y)
	newParticle(500, createVector(0,0), planet2.x, planet2.y); //planet 2
	newParticle(10, createVector(0,-2.5), planet2Moon.x, planet2Moon.y); //moon for planet 1

	var planet3 = createVector(width/6 * 5.5 ,height/6); //pos for planet 3
	var planet3Moon = createVector(planet3.x + 30, planet3.y)
	newParticle(100, createVector(-.6,.6), planet3.x, planet3.y); //planet 3
	newParticle(50, createVector(-.5,-.5), planet3Moon.x, planet3Moon.y); //moon for planet 3

	var planet4 = createVector(width/6 ,height/6 * 5.5); //pos for planet 4
	var planet4Moon = createVector(planet4.x + 15, planet4.y)
	var planet4Moon2 = createVector(planet4.x + 40, planet4.y)

	newParticle(150, createVector(0,0), planet4.x, planet4.y); //planet 4
	newParticle(10, createVector(0,-2), planet4Moon.x, planet4Moon.y); //moon for planet 4
	newParticle(20, createVector(0,-1.5), planet4Moon2.x, planet4Moon2.y); //moon2 for planet 4



	redraw();

}

function twoBodyPreSet1()
{

	/*
	 *	Two bodies with similar mass orbiting a common barycenter external to both bodies,
	 *		with elliptic orbits—typical of binary stars.
	 */ 	

	angleMode(DEGREES);
	var center = createVector(width/2,height/2);
	
	var body1 = createVector(center.x - 75,center.y); //pos for body 1
	var body1mass = 1000;
	
	
	var body2 = createVector(center.x + 75, center.y); //pos for body 2
	var body2mass = 1000;
	

	newParticle(body1mass, createVector(0,1), body1.x, body1.y); //planet 1
	newParticle(body2mass, createVector(0,-1), body2.x, body2.y); //moon for planet 1

	redraw();

}

function twoBodyPreSet2()
{
	angleMode(DEGREES);
	var center = createVector(width/2,height/2);
	
	var body1 = createVector(center.x - 50,center.y); //pos for body 1
	var body1mass = 1000;
	
	
	var body2 = createVector(center.x + 50, center.y); //pos for body 2
	var body2mass = 900;
	

	newParticle(body1mass, createVector(0,1), body1.x, body1.y); //planet 1
	newParticle(body2mass, createVector(0,-1), body2.x, body2.y); //moon for planet 1



	redraw();

}

function initializeVectorField()
{
	do
	{
		vectorFieldArrows.pop();
	}while(vectorFieldArrows.length != 0)


	//Creating a 10 by 10 vector field grid...divide by 11 bc 11 spacings between
	var incX = width / 11;
	var incY = height / 11;

	for(var i = 1; i < 11; i++)
	{
		for(var j = 1; j < 11; j++)
		{
			var xCoord = incX * j;
			var yCoord = incY * i;

			newVectorFieldArrow(xCoord,yCoord);

		}
	}
}

function displayVectorField()
{

	for(var k = 0; k < vectorFieldArrows.length; k++)
	{

		var forceSum = vectorFieldArrows[k].location.copy();

		for (var i = 0; i < particles.length; i++)
		{

			//Get x-cord,y-cord distance between the two points 
			var xDist = particles[i].position.x - vectorFieldArrows[k].location.x;
			var yDist = particles[i].position.y - vectorFieldArrows[k].location.y;

			//Get the distance via sqrt(a^2 + b^2)
			var distance = Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));

			var forceMag = gravityConstant * (particles[i].mass * 1) / Math.pow(distance, 2); //force between two object... see: https://en.wikipedia.org/wiki/Newton%27s_law_of_universal_gravitation#Modern_form
			
			forceSum.x = forceSum.x + (forceMag * (xDist / distance));
			forceSum.y = forceSum.y + (forceMag * (yDist / distance));

		}
		
		vectorFieldArrows[k].update(forceSum);
		vectorFieldArrows[k].display();
	}


}


function randomParticles()
{
	var randomX = random(width);
	var randomY = random(height);
	var randomMass = random(100, 9000);
	var randomAmount = random(5,10);

	for(var i = 1; i < randomAmount; i++)
	{

		for(var j = 1; j < randomAmount; j++)
		{
			var randomX = random(width);
			var randomY = random(height);
			var randomMass = random(100, 1000);
			var velocity = createVector(0,0);

			newParticle(randomMass, velocity, randomX, randomY);

		}

	}

	redraw();

}

function gravityCalc()
{

	for (var i = 0; i < particles.length; i++)
	{

		if(particles[i].static == true)
		{
			continue;
		}

		var forceSum = createVector(0,0);

		for (var j = 0; j < particles.length; j++)
		{

			//For every different particle
			if (j != i)
			{

				//Get x-cord,y-cord distance between the two particles 
				var xDist = particles[i].position.x - particles[j].position.x;
				var yDist = particles[i].position.y - particles[j].position.y;

				//Get the distance via sqrt(a^2 + b^2)
				var distance = Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));

				//check if distance is inside
				if(distance < particles[i].radius + particles[j].radius)
				{ 
					if(toggleCollision_checkbox.checked())
					{
						if(particles[j].static == false)
						{
							particles[i].absorb(particles[j]);
							deadParticles.push(particles[j]);
							particles.splice(j, 1);
						}
					}


				}
				else
				{

					var forceMag = gravityConstant * (particles[i].mass * particles[j].mass) / Math.pow(distance, 2); //force between two object... see: https://en.wikipedia.org/wiki/Newton%27s_law_of_universal_gravitation#Modern_form
					var nextStep = (forceMag / particles[i].mass) + (forceMag / particles[j].mass);

					//need to look into below, why nextStep if already checking above

					if (distance < nextStep)  //check if distance is inside
					{

					  	if(particles[j].static == false)
						{
							particles[i].absorb(particles[j]);
							deadParticles.push(particles[j]);
							particles.splice(j, 1);
						}

					}
					else
					{

						// divide x/y Dist to damppen effect
	  					//Use subtraction for attraction
	  					forceSum.x = forceSum.x - (forceMag * (xDist / distance));
	  					forceSum.y = forceSum.y - (forceMag * (yDist / distance));

	  					//Use addition for repel
	  					//forceSum.x = forceSum.x + (forceMag * (xDist / distance));
	  					//forceSum.y = forceSum.y + (forceMag * (yDist / distance));

					}
				}
			}
		}

		if(particles[i].static == false)
		{
			// Newton's Law : F = m * a  -->  a = F / m
			var accel = forceSum.div(particles[i].mass);

			particles[i].acceleration.add(accel);
		}

	}

}


Particle.prototype.update = function()
{
	this.history.push(this.position.copy());

  	//Bounce off walls
    if(toggleWall_checkbox.checked() == true)
  	{
	  	if( (this.position.x - this.radius <= 0) || (this.position.x + this.radius >= width) )
		{
			this.velocity.x *= -1;
		}
		if( (this.position.y - this.radius <= 0) || (this.position.y + this.radius >= height) )
		{
			this.velocity.y *= -1;
		}
  	}

  	this.velocity.add(this.acceleration);

 	// position changes by velocity
  	this.position.add(this.velocity);

  	// clear acceleration each frame
  	this.acceleration.mult(0);

};

Particle.prototype.display = function()
{
  	fill(this.color);
	if(this.static == true)
	{
		stroke(this.color + 10);
		strokeWeight(3);
	}
	else
	{
		noStroke();
	}

	ellipse(this.position.x,this.position.y, this.radius, this.radius);

};

Particle.prototype.displayFadingTrails = function()
{

	if(toggleTrailsOptions_radio.value() == 1)
	{
		stroke(this.color);
		strokeWeight(1);
		
		for(var i = 0; i <= 12; i++)
		{
			var j = this.history.length - 1 - i;
			if(j <= 0)
			{
				break;
			}
			line(this.history[j].x, this.history[j].y, this.history[j-1].x, this.history[j-1].y);
		}

	}

};

Particle.prototype.displayTrails = function()
{

	if(toggleTrailsOptions_radio.value() == 2 || toggleTrailsOptions_radio.value() == 3) //no fading trails
	{

		stroke(this.color);
		strokeWeight(1);
		//create object trails
		for(var i = this.history.length - 1; i > 1; i--)
		{
			var pos = this.history[i];
			var nextPos = this.history[i-1];
			line(nextPos.x, nextPos.y, pos.x, pos.y);
		}
	}

};



function absorbParticle(p) {
	// decide color
	if (this.mass < p.mass)
	{
	 	this.color = p.color;
	}

	if(this.static == false && p.static == false)
	{
		var temp1 = this.velocity.mult(this.mass);
		var temp2 = p.velocity.mult(p.mass);
		var temp3 = temp1.add(temp2);
		temp3.div(this.mass + p.mass);

		this.velocity = temp3;

		this.mass += p.mass;
		this.radius = Math.cbrt(this.mass);
	}

}

function windowResized()
{
	resizeCanvas(document.getElementById("canvasContainer").offsetWidth, windowHeight-10);

	initializeVectorField();

}
