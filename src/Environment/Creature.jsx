import React, { Component } from 'react';
import Vector from '../Vector/Vector';

class Creature extends Component {
   constructor(world, x, y) {
      super();

      this.world = world;
      this.network = this.newNetwork(this.world.numCreatures * 4, 30, 3);
      this.context = this.world.context;
      this.mass = 1;
      this.maxspeed = 1;
      this.maxforce = 1000;
      this.lookRange = this.mass * 200;
      this.length = 1;
      this.base = this.length * 2;
      this.location = new Vector(x, y);
      this.velocity = new Vector(0, 0);
      this.acceleration = new Vector(0, 0);
      this.color = '#222222';
      this.flying = false;
   }

   newNetwork(input, hidden, output) {
      var synaptic = require('synaptic');

      var inputLayer = new synaptic.Layer(input);
      var hiddenLayer = new synaptic.Layer(hidden);
      var outputLayer = new synaptic.Layer(output);

      inputLayer.project(hiddenLayer);
      hiddenLayer.project(outputLayer);

      var network = new synaptic.Network({
         input: inputLayer,
         hidden: [hiddenLayer],
         output: outputLayer
      });

      return network;
   }

   moveTo(output) {
      var force = new Vector(0, 0);
      var target = {};

      if (this.world.state.target) 
         target = new Vector(this.world.state.x, this.world.state.y);
      else if (this.world.state.x && this.world.state.y)
         target = new Vector(this.world.state.x, this.world.state.y);
      else 
         target = new Vector(output[0] * this.world.width, output[1] * this.world.height);

      var angle = (output[2] * Math.PI * 2) - Math.PI;

      var seperation = this.seperate(this.world.creatures);
      var alignment = this.align(this.world.creatures).setAngle(angle);
      var cohesion = this.seek(target);

      force.add(seperation);
      force.add(alignment);
      force.add(cohesion);

      this.applyForce(force);
   }

   draw() {
      this.update();

      var angle = this.velocity.angle();

		var x1 = this.location.x + Math.cos(angle) * this.base;
		var y1 = this.location.y + Math.sin(angle) * this.base;

		var x2 = this.location.x + Math.cos(angle + Math.PI / 2) * this.base;
		var y2 = this.location.y + Math.sin(angle + Math.PI / 2) * this.base;

		var x3 = this.location.x + Math.cos(angle - Math.PI / 2) * this.base;
		var y3 = this.location.y + Math.sin(angle - Math.PI / 2) * this.base;

      this.context.lineWidth = 3;
      this.context.fillStyle = "rgba(255,255,255,0.1)";
      this.context.strokeStyle = this.color;
      this.context.fill();
      this.context.fillRect(0, 0, this.world.width, this.world.height);
		this.context.beginPath();
		this.context.moveTo(x1, y1);
      this.context.lineTo(x2, y2);
      this.context.lineTo(x3, y3);
      this.context.stroke();
   }

   update() {
      this.boundaries();

      this.velocity.add(this.acceleration);
      if (!this.flying)
         this.velocity.limit(this.maxspeed);

      if (this.velocity.magnitude() < 1.5) 
         this.velocity.setMagnitude(1.5);

      this.location.add(this.velocity);

      this.acceleration.multiply(0);
   }

   applyForce(force) {
      this.acceleration.add(force);
   }

   boundaries() {
      if (this.location.x < 15)
         this.applyForce(new Vector(this.maxforce * 2, 0));
      if (this.location.x > this.world.width - 15)
         this.applyForce(new Vector(-this.maxforce * 2 ,0));
      if (this.location.y < 15)
         this.applyForce(new Vector(0, this.maxforce * 2));
      if (this.location.y > this.world.height - 15)
         this.applyForce(new Vector(0, -this.maxforce * 2));
   }

   seek(target) {
      var seek = target.copy().subtract(this.location);
      seek.multiply(this.maxspeed);
      seek.subtract(this.velocity).limit(0.3);

      return seek;
   }

   seperate(neighbors) {
      var sum = new Vector(0, 0);
      var count = 0;

      for (var i in neighbors) {
         if (neighbors[i] != this) {
            var d = this.location.distance(neighbors[i].location);
            if (d < 5 && d > 0) {
               var diff = this.location.copy().subtract(neighbors[i].location);

               diff.divide(d);
               sum.add(diff);
               count++; 
            }
         }
      }
      if (!count) 
         return sum;

      sum.divide(count);
      sum.limit(this.maxforce);

      return sum;
   }

   align(neighbors) {
      var sum = new Vector(0,0);
		var count = 0;
		for (var i in neighbors) {
			if (neighbors[i] != this) { 
				sum.add(neighbors[i].velocity);
				count++;
			}
      }	
      sum.divide(count);
		sum.multiply(this.maxspeed);

		return sum.limit(0.1);
   }

   cohesion(neighbors) {
      var sum = new Vector(0, 0);
      var count = 0;
      for (var i in neighbors) 
         if (neighbors[i] != this) {
            sum.add(neighbors[i].location);
            count++;
         }
      sum.multiply(count);

      return sum;
   }
}

export default Creature;