import { Component, ChangeDetectionStrategy, OnInit,  ViewChild, ElementRef } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl,  } from '@angular/forms';
import * as $ from 'jquery';

// import { Scene, Engine } from 'babylonjs';
// import * as BABYLON from 'babylonjs';


@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
	//changeDetection:ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {

	title = 'app';
	noThanks: Boolean = true;
	form: FormGroup;
	submitted = false;

	constructor(private router: Router,  private formBuilder: FormBuilder) { }

	ngOnInit() {
		
		this.form = this.formBuilder.group({
			emailID: ['',
			Validators.compose([
			Validators.required,
			Validators.email])
			]
		  });
		this.router.events.subscribe((event) => {
			console.log('event>>>>>>>>>>>>>>>>>event', event);
			if (!(event instanceof NavigationEnd)) {
				return;
			}
			var scrollToTop = window.setInterval(function () {
				var position = window.pageYOffset; 
				if (position > 0) {
					window.scrollTo(0, position - 40);
				} else {
					window.clearInterval(scrollToTop);
				}
			}, 10)
		})

	}

	noThanksFun() {
		this.noThanks = false;
	}

	ngAfterViewInit() {

		// var camera;
		// var scene;
		// var canvas = <HTMLInputElement> document.getElementById("canvas");

		// var engine = new BABYLON.Engine(canvas, true, { limitDeviceRatio: 1.0 });
		// BABYLON.SceneLoader.ShowLoadingScreen = true;
		// BABYLON.SceneLoader.CleanBoneMatrixWeights = true;

		// BABYLON.SceneLoader.Load("", "assets/3d/test2.babylon", engine, function (scene) {
		// 	var camera = new BABYLON.ArcRotateCamera("ArcRotateCamera", 0, 30, 0, new BABYLON.Vector3(0, 30, 0), scene);

		// 	camera.wheelPrecision = 10;
		// 	camera.fov = 0.5;
		// 	camera.lowerRadiusLimit = 150;
		// 	camera.upperRadiusLimit = 300;
		// 	camera.radius = 0;
		// 	camera.panningAxis = new BABYLON.Vector3(0,0,0);
		// 	camera.setPosition(new BABYLON.Vector3(0, 0, -25));
		// 	camera.beta = 1.5;
		// 	camera.attachControl(canvas, false);

		// 	var light = new BABYLON.PointLight("PointLight", new BABYLON.Vector3(0, 10, 0), scene);
		// 	light.diffuse = new BABYLON.Color3(1,0,0);
			
		// 	engine.runRenderLoop(function() {
		// 		scene.render();
		// 	});

		// 	window.addEventListener("resize", function () {
		// 		engine.resize();
		// 	});
		// });



	}

    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }

    onSubmit() {
		debugger;
        this.submitted = true;
        // stop here if form is invalid
        if (this.form.invalid) {
            return;
        }
        alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.form.value))
    }
}
