/******************************************************************************
 * Copyright 2010-2019 migenius pty ltd, Australia. All rights reserved.
 *****************************************************************************/
import { Transform } from './Transform';
import { Transform_target } from './Transform_target';
import { Utils } from 'realityserver-client';

/**
 * @file Camera.js
 * Camera class.
 */

/**
 * @class Camera
 * A client side representation of a camera.
 */

/**
 * @ctor
 * Creates a %Camera.
 */
export class Camera extends Utils.EventEmitter {

    static get Y_UP() {
        return 0;
    }

    static get Z_UP() {
        return 1;
    }

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
     * Clones a Camera. This performs a deep copy on this Camera.
     *
     * @return The cloned Camera.
     */
    clone() {
        let new_camera = new Camera();
        this.populate_clone(new_camera);
        return new_camera;
    }

    /**
     * Used to put values onto a newly created clone. Can be extended
     * by subclasses to include more values.
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

    changed(what, value) {
        this.emit(`${what}-changed`, {
            source: this,
            value: value
        });
    }

    /**
     * Sets the matrix of the transform from anything that Matrix4x4.setFromObject supports.
     */
    set matrix(value) {
        if (value) {
            this.m_transform.world_to_obj = value;
            this.changed('transform');
        }
    }

    get matrix() {
        return this.m_transform.world_to_obj;
    }

    /**
     * Sets the camera data from either an object with appropriate properties
     * or from another Camera instance.
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
                    this.transform = camera.transform.clone();
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
     * @param camera The camera to set from.
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
     * @param horizontal The amount to pan in the right direction.
     * @param vertical The amount to pan in the up direction.
     * @param shift_target_point Move the target point with the camera.
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
     * @param depth The amount to move along the direction vector.
     * @param shift_target_point Move the target point along direction*i_z.
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
     * Elevates the camera.
     *
     * @param vertical The amount to move along the up vector.
     */
    elevate(vertical) {
        this.m_transform.translate(0, vertical, 0, true);
        this.changed('target_point');
        this.changed('transform');
    }

    /**
     * Orbits the camera. This method orbits using the initial up and right reference vectors.
     *
     * @param vertical_axis The amount to rotate around the up vector in radians.
     * @param horizontal_axis The amount to rorate aroung the right vector in radians.
     * @param orbit_point The point to orbit around, if set this will change the orbit point.
     */
    orbit(vertical_axis, horizontal_axis, orbit_point) {
        if (orbit_point) {
            this.setTargetPoint(orbit_point, false);
        }
        this.m_transform.orbit_around_target_point(horizontal_axis, vertical_axis, 0);
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
     * @param point The point to orbit around, this will NOT change the target point.
     * @param vertical_axis The amount to rotate around the up vector in radians.
     * @param horizontal_axis The amount to rorate aroung the right vector in radians.
     * @param shift_target_point If true the target point will also rotate around the point.
     */
    orbit_around_point(point, vertical_axis, horizontal_axis, shift_target_point=false) {
        this.m_transform.rotate_around_point(point, horizontal_axis, vertical_axis, 0, shift_target_point);
        if (shift_target_point) {
            this.changed('target_point');
        }
        this.changed('transform');
    }

    /**
     * Rotates the camera
     *
     * @param vertical_axis Amount to rotate around the up vector in radians.
     * @param horizontal_axis Amount to rotate around the right vector in radians.
     * @param direction_axis Amount to rotate around the direction vector in radians.
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
     * Tilts the camera by rotating around the right vector of the camera.
     *
     * @param horizontal_axis The amount, in radians, to tilt.
     */
    tilt(horizontal_axis, shift_target_point=true) {
        this.m_transform.rotate(horizontal_axis, 0, 0, shift_target_point);
        if (shift_target_point) {
            this.changed('target_point');
        }
        this.changed('transform');
    }

    /**
     * Spins the camera by rotating around the up vector of the camera.
     *
     * @param vertical_axis The amount, in radians, to spin.
     */
    spin(vertical_axis, shift_target_point=true) {
        this.m_transform.rotate(0, vertical_axis, 0, shift_target_point);
        if (shift_target_point) {
            this.changed('target_point');
        }
        this.changed('transform');
    }

    /**
     * Rotates the camera.
     *
     * @param axis The axis to rotate about.
     * @param angle The amount, in radians, to rotate.
     */
    rotate_around_axis(axis, angle, inCameraSpace=false, shift_target_point=true) {
        this.m_transform.rotate_around_axis(axis, angle, inCameraSpace, shift_target_point);
        if (shift_target_point) {
            this.changed('target_point');
        }
        this.changed('transform');
    }

    /**
     * Moves the camera to a given location.
     *
     * @param location The position to move to.
     * @param shift_target_point Set this parameter to true to shift the target point of the camera along the vector
     * new_position -> old_position.
     */
    set_location(location, shift_target_point=true) {
        this.m_transform.set_translation(location.x, location.y, location.z, shift_target_point);
        if (shift_target_point) {
            this.changed('target_point');
        }
        this.changed('transform');
    }

    /**
     * Moves the camera.
     *
     * @param move The vector to move along.
     * @param shift_target_point Set this parameter to true to shift the target point of the camera along v.
     */
    translate(move, shift_target_point=true) {
        this.m_transform.translate(move.x, move.y, move.z, false, shift_target_point);
        if (shift_target_point) {
            this.changed('target_point');
        }
        this.changed('transform');
    }

    /**
     * Transforms a point into camera space.
     *
     * @param point The point to tranform.
     * @param result The result of the transform.
     * @return Always true.
     */
    transform_point(point, result) {
        const world_to_cam = this.transform.world_to_obj;
        result.set(point);
        result.transform(world_to_cam);
        return true;
    }

    /**
     * Transforms a vector to camera space.
     *
     * @param direction The vector to transform.
     * @param result The result of the transform.
     * @return Always true.
     */
    transform_direction(direction, result) {
        const world_to_cam = this.transform.world_to_obj;
        const my_dir = direction.clone();
        result.set(my_dir.rotate(world_to_cam));
        return true;
    }

    /**
     * Transforms a vector from camera space to world space.
     *
     * @param direction The vector to transform.
     * @param result The result of the transform.
     * @result Always true.
     */
    transform_direction_to_world(direction, result) {
        let cam_to_world = this.transform.world_to_obj;
        let my_dir = direction.clone();
        cam_to_world.invert();
        result.set(my_dir.rotate(cam_to_world));
        return true;
    }

    /**
      * Compares two cameras for equality. Equality means apertures, focal lengths, fields of view and transforms
      * are the same.
      *
      * @param camera1 A camera.
      * @param camera2 Another camera.
      * @result True if camera1 equals camera2.
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
     * Aligns the camera to the horizontal plane
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

    get orthographic() {
        return this.m_orthographic;
    }
    /**
     * Sets the orthographic mode of the camera.
     *
     * @param ortho Set to true to enable orthographic mode.
     */
    set orthographic(value) {
        if (value !== this.m_orthographic) {
            this.m_orthographic = value;
            this.changed('orthographic');
        }
    }

    /**
     * The half field of view of the camera.
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
            this.changed('aperture');
        }
    }

    /**
     * The aperture of the camera.
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
     * The focal length of the camera.
     */
    get focal() {
        return this.m_focal;
    }

    set focal(focal) {
        this.m_focal = focal;
        this.changed('focal');
    }

    /**
     * The transform of the camera.
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
    * The clip max of the view frustum
    */
    get clip_max() {
        return this.m_clip_max;
    }

    set clip_max(value) {
        this.m_clip_max = value;
        this.changed('clip_max');
    }

    /**
     * The clip min of the view frustum
     */
    get clip_min() {
        return this.m_clip_min;
    }

    set clip_min(value) {
        this.m_clip_min = value;
        this.changed('clip_min');
    }

    /**
     * Sets the target point of the camera.
     *
     * @param orbit_point The new target point.
     */
    set_target_point(target_point, reset_up_vector=true) {
        this.m_transform.set_target_point(target_point, reset_up_vector);
        this.changed('target_point');
        this.changed('transform');
    }

    set target_point(value) {
        this.set_target_point(value, false);
    }

    get target_point() {
        return this.m_transform.target_point;
    }

    /**
     * The look direction vector of the camera.
     */
    get direction() {
        return this.m_transform.z_axis.scale(-1);
    }

    /**
     * The up vector of the camera.
     */
    get up() {
        return this.m_transform.y_axis;
    }

    /**
     * The right vector of the camera.
     */
    get right() {
        return this.m_transform.x_axis;
    }

    /**
     * The position of the camera in world space.
     */
    get location() {
        return this.m_transform.translation;
    }

    /**
     * The up direction of the scene the camera is in.
     * Can be either Y_UP or Z_UP.
     */
    set scene_up_direction(value) {
        if (this.m_scene_up_direction !== value) {
            this.m_scene_up_direction = value;
            if (value === Camera.Y_UP) {
                this.m_transform.up_direction = Transform.Y_AXIS;
            } else {
                this.m_transform.up_direction = Transform.Z_AXIS;
            }
            this.changed('up_direction');
            this.changed('transform');
        }
    }

    get scene_up_direction() {
        return this.m_scene_up_direction;
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

    get follow_target_point() {
        return this.transform.follow_target_point;
    }
}
