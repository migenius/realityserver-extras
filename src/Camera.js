/******************************************************************************
 * Copyright 2010-2020 migenius pty ltd, Australia. All rights reserved.
 *****************************************************************************/
import { Transform } from './Transform';
import { Transform_target } from './Transform_target';
import { Utils } from '@migenius/realityserver-client';

/**
 * The Camera class allows simple camera manipulation. Events are emitted whenever
 * underlying properties are changed to allow the user to update RealityServer&reg; or
 * other system componenets as necessary.
 * @memberof RS
 */
class Camera extends Utils.EventEmitter {

    /**
     * Enum representing a Y up camera
     */
    static get Y_UP() {
        return 0;
    }

    /**
     * Enum representing a Z up camera
     */
    static get Z_UP() {
        return 1;
    }

    /**
     * Creates a perspective Y up camera with a 90 degree field of view.
     */
    constructor() {
        super();
        this.m_transform = new Transform_target();
        this.m_orthographic = false;
        this.m_aperture = 100;
        this.m_focal = 50;
        this.m_clip_max = 1000;
        this.m_clip_min = 0.1;

        this.m_scene_up_direction = Camera.Y_UP;
    }

    /**
     * Returns a copy of this Camera.
     * @return {RS.Camera}
     */
    clone() {
        let new_camera = new Camera();
        this.populate_clone(new_camera);
        return new_camera;
    }

    /**
     * Populates the clone with all the required information.
     * Can be used by subclasses so that they can add their own
     * data to the populating process.
     * @param {RS.Camera} clone the clone to populate
     * @access private
     */
    populate_clone(clone) {
        clone.m_orthographic = this.m_orthographic;
        clone.m_aperture = this.m_aperture;
        clone.m_focal = this.m_focal;
        clone.m_clip_max = this.m_clip_max;
        clone.m_clip_min = this.m_clip_min;
        clone.m_transform = this.m_transform.clone();
        clone.m_scene_up_direction = this.m_scene_up_direction;
    }

    /**
     * Emits a change event
     * @param {String} what what has changed
     * @param {Object} value the new value
     * @access private
     */
    changed(what, value) {
        this.emit(`${what}-changed`, {
            source: this,
            value: value
        });
    }

    /**
     * The matrix of the transform. When set fires a {@link RS.Camera#event:transform-changed} event
     * @type {RS.Matrix4x4}
     */
    get matrix() {
        return this.m_transform.world_to_obj;
    }

    set matrix(value) {
        if (value) {
            this.m_transform.world_to_obj = value;
            /**
             * Transform changed event.
             *
             * Fired whenever the underlying transform changes
             *
             * @event RS.Camera#transform-changed
             */
            this.changed('transform');
        }
    }

    /**
     * Sets the camera data from either an object with appropriate properties
     * or from another Camera instance.
     * @param {RS.Camera} camera the camera to set from or an object with the same properties
     * @fires RS.Camera#orthographic-changed
     * @fires RS.Camera#focal-changed
     * @fires RS.Camera#aperture-changed
     * @fires RS.Camera#clip_min-changed
     * @fires RS.Camera#clip_max-changed
     * @fires RS.Camera#up_direction-changed
     * @fires RS.Camera#target_point-changed
     * @fires RS.Camera#transform-changed
     */
    set_from_object(camera) {
        if (camera) {
            if (camera instanceof Camera) {
                this.set_from_camera(camera);
            } else {
                if (camera.orthographic !== undefined) {
                    this.orthographic = camera.orthographic;
                }

                if (camera.focal !== undefined) {
                    this.focal = camera.focal;
                }

                if (camera.aperture !== undefined) {
                    this.aperture = camera.aperture;
                }

                if (camera.clip_max !== undefined) {
                    this.clip_max = camera.clip_max;
                }

                if (camera.clip_min !== undefined) {
                    this.clip_min = camera.clip_min;
                }

                if (camera.transform !== undefined) {
                    if (camera.transform instanceof Transform_target) {
                        this.transform = camera.transform.clone();
                    } else {
                        this.matrix = camera.transform;
                    }
                }
                if (camera.matrix !== undefined) {
                    this.matrix = camera.matrix;
                }

                if (camera.scene_up_direction !== undefined) {
                    this.scene_up_direction = camera.scene_up_direction;
                }
            }
        }
    }

    /**
     * Sets this camera from another.
     *
     * @param {RS.Camera} camera the camera to set from or an object with the same properties.
     * @fires RS.Camera#orthographic-changed
     * @fires RS.Camera#focal-changed
     * @fires RS.Camera#aperture-changed
     * @fires RS.Camera#clip_min-changed
     * @fires RS.Camera#clip_max-changed
     * @fires RS.Camera#up_direction-changed
     * @fires RS.Camera#target_point-changed
     * @fires RS.Camera#transform-changed
     */
    set_from_camera(camera) {
        this.transform = camera.transform.clone();
        this.aperture = camera.aperture;
        this.focal = camera.focal;
        this.orthographic = camera.orthographic;
        this.clip_max = camera.clip_max;
        this.clip_min = camera.clip_min;
        this.scene_up_direction = camera.scene_up_direction;
    }

    /**
     * Pans the camera.
     *
     * @param {Number} horizontal The amount to pan in the right direction.
     * @param {Number} vertical The amount to pan in the up direction.
     * @param {Boolean=} shift_target_point If `true` then pans the target as well.
     * @fires RS.Camera#target_point-changed
     * @fires RS.Camera#transform-changed
     */
    pan(horizontal, vertical, shift_target_point=true) {
        this.m_transform.translate(horizontal, vertical, 0, true, shift_target_point);
        if (shift_target_point) {
            this.changed('target_point');
        }
        this.changed('transform');
    }

    /**
     * Dollies the camera.
     *
     * @param {Number} depth The amount to move along the direction vector.
     * @param {Boolean=} shift_target_point If `true` then dollies the target as well.
     * @fires RS.Camera#target_point-changed
     * @fires RS.Camera#transform-changed
     */
    dolly(depth, shift_target_point=false) {
        if (this.orthographic) {
            if (this.m_aperture + depth > 0) {
                this.aperture = this.aperture + depth;
                this.changed('aperture');
            }
        } else {
            this.m_transform.translate(0, 0, depth, true, shift_target_point);
            if (shift_target_point) {
                this.changed('target_point');
            }

            this.changed('transform');
        }
    }

    /**
     * Elevates the camera and the target point
     *
     * @param {Number} vertical The amount to move the camera  up the up vector.
     * @fires RS.Camera#target_point-changed
     * @fires RS.Camera#transform-changed
     */
    elevate(vertical) {
        this.m_transform.translate(0, vertical, 0, true);
        this.changed('target_point');
        this.changed('transform');
    }

    /**
     * Orbits the camera. This method orbits using the initial up and right reference vectors.
     *
     * @param {Number} vertical_axis The amount to orbit around the up vector in radians.
     * @param {Number} horizontal_axis The amount to orbit aroung the right vector in radians.
     * @param {RS.Vector3=} orbit_point The point to orbit around, if provided then this becomes
     * the new target point.
     * @param {Boolean=} level_camera if `true` then orbit around the nominal up direction so the camera remains
     * level. If `false` then rotates around the cameras current Y axis.
     * @fires RS.Camera#target_point-changed
     * @fires RS.Camera#transform-changed
     */
    orbit(vertical_axis, horizontal_axis, orbit_point=null, level_camera=true) {
        if (orbit_point) {
            this.set_target_point(orbit_point, false);
        }
        this.m_transform.orbit_around_target_point(horizontal_axis, vertical_axis, 0, level_camera);
        if (orbit_point) {
            this.changed('target_point');
        }
        this.changed('transform');
    }

    /**
     * Orbits the camera around a point in world space. This method acts much like the standard orbit function
     * however if you choose to orbit around a different point than the target point you can also rotate the
     * target point as well.
     *
     * @param {RS.Vector3} point The point to orbit around, this will NOT change the target point.
     * @param {Number} vertical_axis The amount to rotate around the up vector in radians.
     * @param {Number} horizontal_axis The amount to rorate aroung the right vector in radians.
     * @param {Boolean=} shift_target_point If `true` the target point will also rotate around the point.
     * @param {Boolean=} level_camera if `true` then orbit around the nominal up direction so the camera remains
     * level. If `false` then rotates around the cameras current Y axis.
     * @fires RS.Camera#target_point-changed
     * @fires RS.Camera#transform-changed
     */
    orbit_around_point(point, vertical_axis, horizontal_axis, shift_target_point=false, level_camera=true) {
        this.m_transform.rotate_around_point(point, horizontal_axis, vertical_axis, 0,
            shift_target_point, level_camera);
        if (shift_target_point) {
            this.changed('target_point');
        }
        this.changed('transform');
    }

    /**
     * Rotates the camera around itself.
     *
     * @param {Number} vertical_axis Amount to rotate around the up vector in radians.
     * @param {Number} horizontal_axis Amount to rotate around the right vector in radians.
     * @param {Number} direction_axis Amount to rotate around the direction vector in radians (roll).
     * @param {Boolean=} shift_target_point If `true`` the target point will also rotate around the point.
     * If `false`` then only the `direction_axis` rotation will be applied.
     * @fires RS.Camera#target_point-changed
     * @fires RS.Camera#transform-changed
     */
    rotate(vertical_axis, horizontal_axis, direction_axis, shift_target_point=true) {
        if (isNaN(direction_axis)) {
            direction_axis = 0;
        }

        this.m_transform.rotate(horizontal_axis, vertical_axis, direction_axis, shift_target_point);
        if (shift_target_point) {
            this.changed('target_point');
        }

        this.changed('transform');
    }

    /**
     * Tilts the camera by rotating around the right vector of the camera. This also rotate the
     * target point.
     *
     * @param {Number} horizontal_axis The amount, in radians, to tilt.
     * @fires RS.Camera#target_point-changed
     * @fires RS.Camera#transform-changed
     */
    tilt(horizontal_axis) {
        this.m_transform.rotate(horizontal_axis, 0, 0, true);
        this.changed('target_point');
        this.changed('transform');
    }

    /**
     * Spins the camera by rotating around the up vector of the camera. This also rotate the
     * target point.
     *
     * @param {Number} vertical_axis The amount, in radians, to spin.
     * @fires RS.Camera#transform-changed
     */
    spin(vertical_axis) {
        this.m_transform.rotate(0, vertical_axis, 0, true);
        this.changed('transform');
    }

    /**
     * Rotates the camera around a given axis.
     *
     * @param {RS.Vector3} axis the axis to rotate around.
     * @param {Number} angle the amount to rotate by in radians.
     * @param {Boolean=} in_camera_space if `true` then the axis is in camera space, otherwise world.
     * @param {Boolean=} rotate_target_point if `true` then the target point is rotated by the same amount. Otherwise
     * we keep looking at the current target point only.
     * @fires RS.Camera#target_point-changed
     * @fires RS.Camera#transform-changed
     */
    rotate_around_axis(axis, angle, in_camera_space=false, shift_target_point=true) {
        this.m_transform.rotate_around_axis(axis, angle, in_camera_space, shift_target_point);
        if (shift_target_point) {
            this.changed('target_point');
        }
        this.changed('transform');
    }

    /**
     * Moves the camera to a given location.
     *
     * @param {RS.Vector3} location The position to move to.
     * @param {Boolean=} shift_target_point If `true` then the target point is moved to be
     * at the same relative location as previously. Otherwise the transform will look at the
     * old target point after translation.
     * @fires RS.Camera#target_point-changed
     * @fires RS.Camera#transform-changed
     */
    set_location(location, shift_target_point=true) {
        this.m_transform.set_translation(location.x, location.y, location.z, shift_target_point);
        if (shift_target_point) {
            this.changed('target_point');
        }
        this.changed('transform');
    }

    /**
     * Moves the camera by the given amount
     *
     * @param {RS.Vector3} move The vector to move along.
     * @param {Boolean=} shift_target_point If `true` then the target point is moved as well,
     * otherwise the camera will look at the old target point after translation.
     * @fires RS.Camera#target_point-changed
     * @fires RS.Camera#transform-changed
     */
    translate(move, shift_target_point=true) {
        this.m_transform.translate(move.x, move.y, move.z, false, shift_target_point);
        if (shift_target_point) {
            this.changed('target_point');
        }
        this.changed('transform');
    }

    /**
     * Transforms a world space point into camera space.
     *
     * @param point {RS.Vector4} The point to transform.
     * @param result {RS.Vector4} Receives the result of the transform.
     * @return {RS.Vector4} The transformed point
     */
    transform_point(point, result) {
        const world_to_cam = this.transform.world_to_obj;
        result.set(point);
        result.transform(world_to_cam);
        return result;
    }

    /**
     * Transforms a camera space point into world space.
     *
     * @param point {RS.Vector4} The point to transform.
     * @param result {RS.Vector4} Receives the result of the transform.
     * @return {RS.Vector4} The transformed point
     */
    transform_point_to_world(point, result) {
        const cam_to_world = this.transform.world_to_obj;
        cam_to_world.invert();
        result.set(point);
        result.transform(cam_to_world);
        return result;
    }

    /**
     * Transforms a world space direction into camera space.
     *
     * @param point {RS.Vector4} The point to transform.
     * @param result {RS.Vector4} Receives the result of the transform.
     * @return {RS.Vector4} The transformed direction
     */
    transform_direction(direction, result) {
        const world_to_cam = this.transform.world_to_obj;
        const my_dir = direction.clone();
        result.set(my_dir.rotate(world_to_cam));
        return result;
    }

    /**
     * Transforms a camera space direction into world space.
     *
     * @param direction {RS.Vector4} The direction to transform.
     * @param result {RS.Vector4} Receives the result of the transform.
     * @return {RS.Vector4} The transformed direction
     */
    transform_direction_to_world(direction, result) {
        const cam_to_world = this.transform.world_to_obj;
        cam_to_world.invert();
        const my_dir = direction.clone();
        result.set(my_dir.rotate(cam_to_world));
        return result;
    }


    /**
     * Projects a world space point into the camera focal plane. The X and Y coordinates
     * will be in camera space and the Z coordinate will contain the correct depth value.
     * @param point {RS.Vector4} The point to transform.
     * @param result {RS.Vector4} Receives the result of the transform.
     * @return {RS.Vector4} The projected point.
     */
    project_point(point, result) {
        this.transform_point(point, result);
        if (!this.orthographic) {
            result.x = result.x * this.focal / -result.z;
            result.y = result.y * this.focal / -result.z;
        }
        return result;
    }

    /**
     * Projects a world space point to a pixel coordinate. X/Y origin will be at the
     * bottom left and Z coordinate will contain the correct depth value.
     * @example
     * // Project point <1,2,3> to Full HD resolution.
     * const point = camera.project_point_to_pixel(new RS.Vector4(1,2,3), { x: 1920, y: 1080 }, new RS.Vector4()));
     * @example
     * // Project point <1,2,3> to Full HD resolution with rectangular pixels that have a 3:2 aspect ratio.
     * const point = camera.project_point_to_pixel(new RS.Vector4(1,2,3), { x: 1920, y: 1080 }, 3/2, new RS.Vector4()));
     * @param point {RS.Vector4} The point to transform.
     * @param resolution {RS.Vector2} The image resolution to project to.
     * @param pixel_aspect_ratio {Number=} If provided the pixel aspect ratio to use, otherwise use 1.
     * This would typically only be provided if non-square pixels are used.
     * @param result {RS.Vector4} Receives the result of the transform.
     * @return {RS.Vector4} The projected point.
     */
    project_point_to_pixel(point, resolution, pixel_aspect_ratio, result) {
        if (result === undefined) {
            result = pixel_aspect_ratio;
            pixel_aspect_ratio = 1;
        }
        this.project_point(point, result);
        const aspect = (resolution.x / resolution.y) * pixel_aspect_ratio;
        result.x = resolution.x * (0.5 + result.x / this.aperture);
        result.y = resolution.y * (0.5 + result.y / (this.aperture / aspect));

        return result;
    }

    /**
      * Compares this camera to another. The camera are equal if the aperture, focal length,
      * field of view and matrix are the same.
      *
      * @param {RS.Camera} rhs the camera to compare
      * @result `true` if `rhs` matches this camera.
      */
    equal(rhs) {
        if (rhs === this) {
            return true;
        }

        let result = false;

        if (this.aperture === rhs.aperture &&
            this.focal === rhs.focal &&
            this.field_of_view === rhs.field_of_view) {
            let matrix1 = this.transform.world_to_obj;
            let matrix2 = rhs.transform.world_to_obj;

            if ( matrix1.equal_with_tolerance(matrix2)) {
                result = true;
            }
        }
        return result;
    }

    /**
     * Forces the camera to be horizontal.
     * @fires RS.Camera#target_point-changed
     * @fires RS.Camera#transform-changed
     */
    level_camera() {
        // Negative angle to the horizon based on the up vector.
        // TODO: there's no such thing as getDefaultUpDirection on m_transform
        let angle = Math.asin(this.direction.dot(this.m_scene_up_direction === Camera.Y_UP ?
            Transform.Y_AXIS :
            Transform.Z_AXIS));
        this.m_transform.rotate(-angle, 0, 0);
        this.changed('target_point');
        this.changed('transform');
    }

    /**
     * Whether the camera is orthographic or perspective. When changed fires a
     * {@link RS.Camera#event:orthographic-changed} event
     * @type {Boolean}
     */
    get orthographic() {
        return this.m_orthographic;
    }

    set orthographic(value) {
        if (value !== this.m_orthographic) {
            this.m_orthographic = value;
            /**
             * Orthographic changed event.
             *
             * Fired when the camera changes between orthographic and perspective
             *
             * @event RS.Camera#orthographic-changed
             */
            this.changed('orthographic');
        }
    }

    /**
     * The half field of view of the camera in radians. When changed fires a
     * {@link RS.Camera#event:aperture-changed} event
     * @type {Number}
     */
    get field_of_view() {
        if (this.m_orthographic) {
            return -1;
        }
        return Math.atan2(this.aperture / 2, this.focal);
    }

    set field_of_view(value) {
        if (!this.m_orthographic) {
            this.aperture = (this.m_focal * Math.tan(value))*2;
            /**
             * Aperture changed event.
             *
             * Fired when the camera changes aperture
             *
             * @event RS.Camera#aperture-changed
             */
            this.changed('aperture');
        }
    }

    /**
     * The aperture of the camera. When changed fires a
     * {@link RS.Camera#event:aperture-changed} event.
     * @type {Number}
     */
    get aperture() {
        return this.m_aperture;
    }

    set aperture(value) {
        if (isNaN(value)) {
            value = 1.0;
        } else {
            value = Math.abs(value);
        }

        if (this.m_aperture !== value) {
            this.m_aperture = value;
            this.changed('aperture');
        }
    }

    /**
     * The focal length of the camera. When changed fires a
     * {@link RS.Camera#event:focal-changed} event.
     * @type {Number}
     */
    get focal() {
        return this.m_focal;
    }

    set focal(focal) {
        if (this.m_focal !== focal) {
            this.m_focal = focal;
            /**
             * Focal changed event.
             *
             * Fired when the camera changes focal
             *
             * @event RS.Camera#focal-changed
             */
            this.changed('focal');
        }
    }

    /**
     * The transform of the camera. When changed fires a
     * {@link RS.Camera#event:transform-changed} event and a
     * {@link RS.Camera#event:target_point-changed} event.
     * @type {RS.Transform_target}
     */
    get transform() {
        return this.m_transform;
    }

    set transform(value) {
        if (value !== this.m_transform) {
            this.m_transform = value;
            this.changed('target_point');
            this.changed('transform');
        }
    }

    /**
     * The clip max of the view frustum. When changed fires a
     * {@link RS.Camera#event:clip_max-changed} event
    */
    get clip_max() {
        return this.m_clip_max;
    }

    set clip_max(value) {
        if (this.m_clip_max !== value) {
            this.m_clip_max = value;
            /**
             * Clip max changed event.
             *
             * Fired when the camera clip max changes
             *
             * @event RS.Camera#clip_max-changed
             */
            this.changed('clip_max');
        }
    }

    /**
     * The clip min of the view frustum. When changed fires a
     * {@link RS.Camera#event:clip_min-changed} event
    */
    get clip_min() {
        return this.m_clip_min;
    }

    set clip_min(value) {
        if (this.m_clip_min !== value) {
            this.m_clip_min = value;
            /**
             * Clip max changed event.
             *
             * Fired when the camera clip max changes
             *
             * @event RS.Camera#clip_min-changed
             */
            this.changed('clip_min');
        }
    }

    /**
     * Sets the target point of the camera and, if following the target point,
     * makes the camera look at it.
     *
     * @param {RS.Vector3} target_point The new target point.
     * @param {Boolean=} reset_up_vector if `true`, and following the target point,
     * then the camera roll will be reset.
     * @fires RS.Camera#target_point-changed
     * @fires RS.Camera#transform-changed
     */
    set_target_point(target_point, reset_up_vector=true) {
        this.m_transform.set_target_point(target_point, reset_up_vector);
        /**
         * Target point changed event.
         *
         * Fired when the camera target point
         *
         * @event RS.Camera#target_point-changed
         */
        this.changed('target_point');
        if (this.follow_target_point) {
            this.changed('transform');
        }
    }

    /**
     * Makes the camera look at the current target point whether it is following
     * it or not.
     *
     * @param {Boolean=} reset_up_vector if `true` then the camera roll will be reset.
     * @fires RS.Camera#transform-changed
     */
    look_at_target_point(reset_up_vector=true) {
        this.m_transform.look_at_target_point(reset_up_vector);
        this.changed('transform');
    }

    /**
     * The target point of the camera. When set fires a {@link RS.Camera#event:target_point-changed}
     * event. If the camera is following the target point then it is rotated to look at the target point
     * and fires a {@link RS.Camera#event:transform-changed} event.
     * @type {RS.Vector3}
     */
    get target_point() {
        return this.m_transform.target_point;
    }

    set target_point(value) {
        this.set_target_point(value, false);
    }

    /**
     * The look direction vector of the camera.
     * @type {RS.Vector3}
     * @readonly
     */
    get direction() {
        return this.m_transform.z_axis.scale(-1);
    }

    /**
     * The actual up direction vector of the camera.
     * @type {RS.Vector3}
     * @readonly
     */
    get up() {
        return this.m_transform.y_axis;
    }

    /**
     * The right direction vector of the camera.
     * @type {RS.Vector3}
     * @readonly
     */
    get right() {
        return this.m_transform.x_axis;
    }

    /**
     * The position of the camera in world space.
     * @type {RS.Vector3}
     * @readonly
     */
    get location() {
        return this.m_transform.translation;
    }

    /**
     * The nominal up direction of the camera. Can be either {@link RS.Camera.Y_UP} or
     * {@link RS.Camera.Z_UP}. When set the camera will rotate to match the new up direction and
     * fires a {@link RS.Camera#event:up_direction-changed} and
     * {@link RS.Camera#event:transform-changed} event.
     * @type {Number}
     */
    get scene_up_direction() {
        return this.m_scene_up_direction;
    }

    set scene_up_direction(value) {
        if (this.m_scene_up_direction !== value) {
            this.m_scene_up_direction = value;
            if (value === Camera.Y_UP) {
                this.m_transform.up_direction = Transform.Y_AXIS;
            } else {
                this.m_transform.up_direction = Transform.Z_AXIS;
            }
            /**
             * Up direction changed event.
             *
             * Fired when the camera up direction changes.
             *
             * @event RS.Camera#up_direction-changed
             */
            this.changed('up_direction');
            this.changed('transform');
        }
    }

    /**
     * Whether to follow the target point or not. When `true` the camera will always look at the
     * target point, when `false` it can be rotated away. When set to `true` will fire a
     * {@link RS.Camera#event:transform-changed} event.
     * @type {Boolean}
     * @default true
     */
    get follow_target_point() {
        return this.transform.follow_target_point;
    }

    set follow_target_point(value) {
        let oldValue = this.transform.follow_target_point;
        if (oldValue !== value) {
            this.transform.follow_target_point = value;
            if (value) {
                this.changed('transform');
            }
        }
    }

}

export { Camera };
