class Vector {
   constructor(x, y) {
      this.x = x;
      this.y = y;
   }

   set(x, y) {
      this.x = x;
      this.y = y;

      return this;
   }

   add(value) {
      this.x += value.x;
      this.y += value.y;

      return this;
   }

   subtract(velocity) {
      this.x -= velocity.x;
      this.y -= velocity.y;

      return this;
   }

   multiply(scalar) {
      this.x *= scalar;
      this.y *= scalar;

      return this;
   }

   divide(scalar) {
      if (!scalar) {
         console.log('cannot divide by zero');
         return this;
      }

      this.x /= scalar;
      this.y /= scalar;

      return this;
   }

   magnitude() {
      return Math.sqrt(this.x * this.x + this.y * this.y);
   }
   
   angle() {
      return Math.atan2(this.y, this.x);
   }

   setMagnitude(magnitude) {
      var angle = this.angle();
      this.x = magnitude * Math.cos(angle);
      this.y = magnitude * Math.sin(angle);

      return this;
   }

   setAngle(angle) {
      var magnitude = this.magnitude();
      this.x = magnitude * Math.cos(angle);
      this.y = magnitude * Math.sin(angle);

      return this;
   }

   rotate(angle) {
      this.setAngle(this.angle() + angle);

      return this;
   }

   limit(limit) {
      var magnitude = this.magnitude();
      if (magnitude > limit) 
         this.setMagnitude(limit);
      return this;
   }

   normalize() {
      this.divide(this.magnitude());

      return this;
   }

   angleBetween(vector) {
      return this.angle() - vector.angle();
   }

   dot(vector) {
      return this.x * vector.x + this.y * vector.y;
   }

   lerp(vector, amount) {
      this.x += (vector.x - this.x) * amount;
      this.y += (vector.y - this.y) * amount;

      return this;
   }

   distance(vector) {
      var dx = this.x - vector.x;
      var dy = this.y - vector.y;

      return Math.sqrt(dx * dx + dy * dy);
   }

   copy() {
      return new Vector(this.x, this.y);
   }

   random() {
      this.set(1, 1);
      this.setAngle(Math.random() * Math.PI * 2);

      return this;
   }
}

export default Vector;