import React, { Component } from 'react';
import Creature from './Creature';
import Vector from '../Vector/Vector';
import './World.css';

class World extends Component {
   constructor(props) {
      super(props);
      this.state = {}
      this.fps = 100;
      this.numCreatures = 7;
      
      this.creatures = [];
   }

   targetY(creature) {
      var cohesion = creature.cohesion(this.creatures);
      return cohesion.y / this.height;
   }

   targetX(creature) {
      var cohesion = creature.cohesion(this.creatures);
      return cohesion.x / this.width;
   }

   targetAngle(creature) {
      var alignment = creature.align(this.creatures);
      return (alignment.angle() + Math.PI) / (Math.PI * 2);
   }

   populate() {
      for (var i = 0; i < this.numCreatures; i++) {
         var x = Math.random() * this.width;
         var y = Math.random() * this.height;

         this.creatures[i] = new Creature(this, x, y);
         this.creatures[i].velocity.random();
      }
   }

   newCreature(pos) {
      console.log(this);
      this.numCreatures++;
      this.creatures.push(new Creature(this, pos.x, pos.y));
      this.creatures[this.numCreatures - 1].velocity.random();
   }

   loop() {
      this.creatures.forEach((creature) => {
         // move
         var input = [];
         for (var i in this.creatures) {
            // location || 0 prevents any NaNs in the input
            input.push(this.creatures[i].location.x || 0);
            input.push(this.creatures[i].location.y || 0);
            input.push(this.creatures[i].velocity.x || 0);
            input.push(this.creatures[i].velocity.y || 0);
         }
         var output = creature.network.activate(input);
         creature.moveTo(output);

         // learn
         var learningRate = 0.1;
         var target = [this.targetX(creature), this.targetY(creature), this.targetAngle(creature)];
         creature.network.propagate(learningRate, target);

         creature.draw();
      });

      setTimeout(() => {
         this.loop();
      }, 100 / this.fps);
   }

   getMousePos(canvas, evt) {
      if (!this.state.target) {
         var rect = canvas.getBoundingClientRect();
         this.setState({
            x: evt.clientX - rect.left,
            y: evt.clientY - rect.top
         });
      }
   }

   explosion() {
      this.creatures.forEach((creature) => {
         var location = new Vector(this.state.x, this.state.y);
         var force = new Vector(creature.velocity.x, creature.velocity.y);
         var direction = new Vector(this.state.x - creature.location.x, this.state.y - creature.location.y);
         var distance = location.distance(creature.location);

         if (distance < 100) {
            creature.flying = true;
            force.normalize();
            force.add(direction.normalize());
            creature.velocity.add(force.multiply(-(Math.sqrt(100 - distance)) / 2));
         }

         setTimeout(() => {
            creature.flying = false;
         }, 100);
      });

   }

   componentDidMount() {
      var canvas = this.refs.canvas;
      this.context = canvas.getContext('2d');
      this.width = this.refs.canvas.parentNode.clientWidth;
      this.height = 800;

      canvas.addEventListener('mousemove', (evt) => {
         this.getMousePos(canvas, evt);
      });

      canvas.addEventListener('click', (evt) => {
         this.getMousePos(canvas, evt);
         this.explosion();
      });

      this.populate();
      this.loop();

      this.setState({
         mounted: true
      })
   }

   render() {
      if (this.state.mounted)
         return (
            <canvas
               id="canvas"
               ref="canvas"
               height={this.height}
               width={this.width}
            />
         )
      else
         return (
            <canvas
               id="canvas"
               ref="canvas"
            />
         )

   }


}

export default World;