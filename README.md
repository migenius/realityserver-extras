# realityserver-extras
Classes to assist in the manipulation of RealityServer scene elements in the [RealityServer Client](https://github.com/migenius/realityserver-client "RealityServer Client")

## Introduction

This extras package adds additional classes to the RealityServer Client to assist in common operations

- `Transform` - Allows matricies to be manipulated in a more familiar way.
- `Transform_target` - A `Transform` variant that supports a 'look at' model where the -Z axis is always looking at a given point.
- `Camera` - A camera abstraction class that simplifies camera modelling and navigation.
- `Euler` - Represents Euler rotations.
- `Quaternion` - Represents Quaternion rotations.

## Usage
Download the [minified](https://unpkg.com/@migenius/realityserver-extras@1.0.5 "RealityServer extras") library and include it directly in your HTML, or install via `npm install @migenius/realityserver-extras` and use as a module in [Node.js](https://nodejs.org "Node.js") directly or via your favorite bundler (EG: [rollup.js](https://rollupjs.org "rollup.js") [Webpack](https://webpack.github.io/ "Webpack") [Broswerify](https://github.com/substack/node-browserify "Browerify")). In the browser the classes will be added to the `RS` namespace or can be imported from the `realityserver-extras` module.

## API Documentation

The RealityServer Extras API documentation can be found [here](https://migenius.github.io/realityserver-extras/ "RealityServer Extras").

## Release Notes

## 1.0.6

Added RS.Camera.project_point and RS.Camera.project_point_to_pixel to project world points to screen space.

Fix bug in RS.Camera.set_from_object where `transform` property was not assigned correctly. `transform` can now be an actual `RS.Target_transform` or a matrix. The `matrix` property is not also supported.

Added RS.Camera.transform_point_to_world and RS.Camera.look_at_target_point.

Made RS.Transform_target.look_at_target_point a public function.

Updated to depend on realityserver-client 1.0.9.
