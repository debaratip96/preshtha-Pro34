class Stone {
    constructor(x, y, width, height, handAngle) {
      var options = {
        isStatic: true,
        density: 0.1
      };
      this.width = width;
      this.height = height;
      this.body = Bodies.rectangle(x, y, this.width, this.height, options);
      this.image = loadImage("stone.png");
      this.trajectory = [];
      this.isRemoved = false;
      this.handAngle = handAngle;
      this.velocity = p5.Vector.fromAngle(handAngle);
      World.add(world, this.body);
    }
    shoot(handAngle) {
      handAngle += 90;

      this.velocity = p5.Vector.fromAngle(handAngle * (3.14 / 180));
  
      this.velocity.mult(1);
  
      Matter.Body.setVelocity(this.body, {
        x: -this.velocity.x * (180 / 3.14),
        y: -this.velocity.y * (180 / 3.14) *2
      });
  
      Matter.Body.setStatic(this.body, false);
    }

    
  
  
    display() {
      var ranAngle;
      if (this.body.velocity.y === 0) {
        ranAngle = this.handAngle + 90;
      } else {
        ranAngle =
          Math.atan(this.body.velocity.y / this.body.velocity.x) * (180 / 3.14);
      }
  
      Matter.Body.setAngle(this.body, ranAngle);
  
      var pos = this.body.position;
      var angle = this.body.angle;
  
      push();
      translate(pos.x, pos.y);
      rotate(angle);
      imageMode(CENTER);
      image(this.image, 0, 0, this.width, this.height);
      
      pop();
  

    }
  }
  