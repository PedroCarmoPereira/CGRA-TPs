/**
* MyScene
* @constructor
*/
class MyScene extends CGFscene {
    constructor() {
        super();
    }
    init(application) {
        super.init(application);
        this.initCameras();
        this.initLights();
        this.enableTextures(true);

        //Background color
        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

        this.gl.clearDepth(100.0);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.enable(this.gl.CULL_FACE);
        this.gl.depthFunc(this.gl.LEQUAL);

        this.skyboxMode = "Day";

        //Initialize scene objects
        this.axis = new CGFaxis(this);
        this.house = new MyHouse(this, 'images/wall.png', 'images/column.jpg', 'images/roof.png', 'images/door.jpeg');
        this.treeRow = new MyTreeRowPatch(this, 10);
        this.skybox = new MyCubeMap(this, this.skyboxMode);
        this.plane = new MyQuad(this);
        this.planeMaterial = new CGFappearance(this);
        this.planeMaterial.setAmbient(0.1, 0.1, 0.1, 1);
        this.planeMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
        this.planeMaterial.setSpecular(0.1, 0.1, 0.1, 1);
        this.planeMaterial.setShininess(10.0);
        this.planeMaterial.loadTexture('images/mineTop.jpeg');
        this.planeMaterial.setTextureWrap('REPEAT', 'REPEAT');

        //Objects connected to MyInterface
    }
    initLights() {
        this.lights[0].setPosition(50, 65, -50, 1);
        this.lights[0].setDiffuse(2.0, 2.0, 2.0, 1.0);
        this.lights[0].setSpecular(1.0, 1.0, 1.0, 1.0);
        this.lights[0].setLinearAttenuation(0.0001); 
        this.lights[0].enable();
        this.lights[0].setVisible(false);
        this.lights[0].update();

        this.lights[1].setPosition(50, 75, -50, 1);
        this.lights[1].setDiffuse(0.5, 0.5, 0.7, 1.0);
        this.lights[1].setSpecular(1.0, 1.0, 1.0, 1.0);
        this.lights[1].setLinearAttenuation(0.01); 
        this.lights[1].disable();
        this.lights[1].setVisible(false);
        this.lights[1].update();

        this.lights[2].setPosition(5, 0.5, -5, 1);
        this.lights[2].setDiffuse(1.9, 0.2, 0.1, 1.0);
        this.lights[2].setSpecular(0.5, 0.5, 0.8, 1.0);
        this.lights[2].setLinearAttenuation(0.5); 
        this.lights[2].disable();
        this.lights[2].setVisible(false);
        this.lights[2].update();
    }
    initCameras() {
        this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(15, 15, 15), vec3.fromValues(0, 0, 0));
    }
    setDefaultAppearance() {
        this.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.setShininess(10.0);
    }

    updateSkybox(){
        this.skybox.setMode(this.skyboxMode);
    }

    display() {
        // ---- BEGIN Background, camera and axis setup
        // Clear image and depth buffer everytime we update the scene
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        // Initialize Model-View matrix as identity (no transformation
        this.updateProjectionMatrix();
        this.loadIdentity();
        // Apply transformations corresponding to the camera position relative to the origin
        this.applyViewMatrix();

        this.lights[0].update();
        this.lights[1].update();
        this.lights[2].update();

        // Draw axis
        this.axis.display();

        //Apply default appearance
        this.setDefaultAppearance();
        this.house.display();
        this.treeRow.display();
        this.skybox.display();

        this.planeMaterial.apply();
        this.pushMatrix();
        this.scale(200, 200, 200);
        this.rotate(Math.PI/2 + Math.PI, 1, 0, 0);
        this.plane.display();
        this.popMatrix();

        // ---- BEGIN Primitive drawing section


        // ---- END Primitive drawing section
    }
}