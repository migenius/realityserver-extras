/******************************************************************************
 * Copyright 2010-2019 migenius pty ltd, Australia. All rights reserved.
 *****************************************************************************/
import { Vector3, Vector4, Matrix4x4 } from 'realityserver-client';

/**
 * @file Transform.js
 * Defines the Transform class.
 */

/**
 * @class Transform.
 */

const _X_AXIS = new Vector4(1, 0, 0, 0);
const _Y_AXIS = new Vector4(0, 1, 0, 0);
const _Z_AXIS = new Vector4(0, 0, 1, 0);

const _NEG_X_AXIS = new Vector4(-1, 0, 0, 0);
const _NEG_Y_AXIS = new Vector4( 0, -1, 0, 0);
const _NEG_Z_AXIS = new Vector4( 0, 0, -1, 0);

/**
 * @ctor
 * Creates a %Transform.
 */
export class Transform {
    static get X_AXIS() {
        return _X_AXIS;
    }
    static get Y_AXIS() {
        return _Y_AXIS;
    }
    static get Z_AXIS() {
        return _Z_AXIS;
    }

    static get NEG_X_AXIS() {
        return _NEG_X_AXIS;
    }
    static get NEG_Y_AXIS() {
        return _NEG_Y_AXIS;
    }
    static get NEG_Z_AXIS() {
        return _NEG_Z_AXIS;
    }

    constructor() {
        this.m_translation = new Vector4();

        this.m_x_axis = Transform.X_AXIS.clone();
        this.m_y_axis = Transform.Y_AXIS.clone();
        this.m_z_axis = Transform.Z_AXIS.clone();

        this.m_scale = new Vector3(1, 1, 1);

        this.m_dirty_matrix = true;

        this.m_world_to_obj = new Matrix4x4();
    }


    /**
     * Returns a new transform exactly the same as the current one.
     */
    clone() {
        let transform = new Transform();
        this.populate_clone(transform);

        return transform;
    }

    /**
     * Populates the clone with all the required information.
     * Can be used by subclasses so that they can add their own
     * data to the populating process.
     */
    populate_clone(clone) {
        clone.m_translation.set(this.m_translation);
        clone.m_z_axis.set(this.m_z_axis);
        clone.m_y_axis.set(this.m_y_axis);
        clone.m_x_axis.set(this.m_x_axis);
        clone.m_scale.set(this.m_scale);
        clone.m_dirty_matrix = this.m_dirty_matrix;
        clone.m_world_to_obj.set(this.m_world_to_obj);
    }

    derive_world_to_obj() {
        this.m_world_to_obj.xx = this.m_x_axis.x;
        this.m_world_to_obj.yx = this.m_x_axis.y;
        this.m_world_to_obj.zx = this.m_x_axis.z;

        this.m_world_to_obj.xy = this.m_y_axis.x;
        this.m_world_to_obj.yy = this.m_y_axis.y;
        this.m_world_to_obj.zy = this.m_y_axis.z;

        this.m_world_to_obj.xz = this.m_z_axis.x;
        this.m_world_to_obj.yz = this.m_z_axis.y;
        this.m_world_to_obj.zz = this.m_z_axis.z;

        let c = new Vector4();

        c.x = this.m_world_to_obj.xx;
        c.y = this.m_world_to_obj.yx;
        c.z = this.m_world_to_obj.zx;
        this.m_world_to_obj.wx = -1 * this.m_translation.dot(c);

        c.x = this.m_world_to_obj.xy;
        c.y = this.m_world_to_obj.yy;
        c.z = this.m_world_to_obj.zy;
        this.m_world_to_obj.wy = -1 * this.m_translation.dot(c);

        c.x = this.m_world_to_obj.xz;
        c.y = this.m_world_to_obj.yz;
        c.z = this.m_world_to_obj.zz;
        this.m_world_to_obj.wz = -1 * this.m_translation.dot(c);

        this.m_world_to_obj.xx /= this.m_scale.x;
        this.m_world_to_obj.yx /= this.m_scale.x;
        this.m_world_to_obj.zx /= this.m_scale.x;
        this.m_world_to_obj.wx /= this.m_scale.x;

        this.m_world_to_obj.xy /= this.m_scale.y;
        this.m_world_to_obj.yy /= this.m_scale.y;
        this.m_world_to_obj.zy /= this.m_scale.y;
        this.m_world_to_obj.wy /= this.m_scale.y;

        this.m_world_to_obj.xz /= this.m_scale.z;
        this.m_world_to_obj.yz /= this.m_scale.z;
        this.m_world_to_obj.zz /= this.m_scale.z;
        this.m_world_to_obj.wz /= this.m_scale.z;
    }

    /**
     * Calculates the location, direction and up from the current world_to_obj matrix.
     */
    derive_vectors() {
        let obj_to_world = new Matrix4x4(this.m_world_to_obj);
        obj_to_world.invert();

        this.m_translation.set(0, 0, 0);
        this.m_translation.transform(obj_to_world);

        this.m_z_axis.set(Transform.Z_AXIS);
        this.m_z_axis.rotate(obj_to_world);
        this.m_z_axis.normalize();

        this.m_y_axis.set(Transform.Y_AXIS);
        this.m_y_axis.rotate(obj_to_world);
        this.m_y_axis.normalize();

        this.m_x_axis.set(Transform.X_AXIS);
        this.m_x_axis.rotate(obj_to_world);
        this.m_x_axis.normalize();
    }

    /**
     * Allows for the transform to be set directly from a given Matrix4x4.
     *
     * @param world_to_obj The matrix to set the transform to. While it is an object
     *                      it must be an object that Matrix4x4.setFromObject can recognise.
     */
    set world_to_obj(world_to_obj) {
        this.m_world_to_obj.set(world_to_obj);
        this.derive_vectors();
        this.m_dirty_matrix = false;
    }

    get world_to_obj() {
        if (this.m_dirty_matrix) {
            this.derive_world_to_obj();
        }
        return this.m_world_to_obj.clone();
    }

    /**
     * Sets the elements of the translation vector.
     */
    _set_translation(x, y, z) {
        this.m_translation.set(x, y, z);
        this.m_dirty_matrix = true;
    }

    get translation() {
        return new Vector3(this.m_translation);
    }

    set translation(value) {
        this._set_translation(value.x, value.y, value.z);
    }

    /**
     * Translates the transform by {dx, dy, dz} in either world space or object space.
     */
    translate(dx, dy, dz, in_object_space=true) {
        this._translate_vector(dx, dy, dz, this.m_translation, in_object_space);
        this.m_dirty_matrix = true;
    }

    get x_axis() {
        return new Vector3(this.m_x_axis);
    }
    get y_axis() {
        return new Vector3(this.m_y_axis);
    }
    get z_axis() {
        return new Vector3(this.m_z_axis);
    }

    /**
     * Sets the absolute values of the elements of the scaling vector.
     */
    _set_scale(x, y, z) {
        this.m_scale.set(x, y, z);
        this.m_dirty_matrix = true;
    }

    /**
     * Scales the transform scaling vector accumulatively.
     */
    _scale(dx, dy, dz) {
        this.m_scale.x *= dx;
        this.m_scale.y *= dy;
        this.m_scale.z *= dz;
        this.m_dirty_matrix = true;
    }

    get scale() {
        return this.m_scale.clone();
    }

    set scale(value) {
        this._set_scale(value.x, value.y, value.z);
    }

    multiply_scale(value) {
        this._scale(value.x, value.y, value.z);
    }


    /**
     * Rotates the transform by {dx, dy, dz}.
     */
    rotate(dx, dy, dz) {
        this._rotate_z_vectors(this.m_z_axis, dz);
        this._rotate_y_vectors(this.m_y_axis, dy);
        this._rotate_x_vectors(this.m_x_axis, dx);

        this.m_dirty_matrix = true;
    }

    /**
     * This sets the rotation of the transform.
     */
    set_rotation(x, y, z) {
        this.m_x_axis.set(Transform.X_AXIS);
        this.m_y_axis.set(Transform.Y_AXIS);
        this.m_z_axis.set(Transform.Z_AXIS);

        this.rotate(x, y, z);
    }

    /**
     * Rotates the transform about the given axis by the given angle in radians. If in_object_space is set to true,
     * then the axis will be transform into object space first.
     */
    rotate_around_axis(axis, angle, in_object_space=true) {
        this._rotate_vectors(axis, angle, [ this.m_x_axis, this.m_y_axis, this.m_z_axis ], in_object_space);

        this.m_dirty_matrix = true;
    }


    /**
     * Sets the rotation of the transform about the given axis by the given angle in radians.
     */
    set_rotation_around_axis(axis, angle) {
        this.m_x_axis.set(Transform.X_AXIS);
        this.m_y_axis.set(Transform.Y_AXIS);
        this.m_z_axis.set(Transform.Z_AXIS);

        this.rotate_around_axis(axis, angle, false);
    }

    /**
     * Rotates the transform around a given world space point by {dx, dy, dz}.
     */
    rotate_around_point(point, dx, dy, dz) {
        const to_point = this.translation.subtract(point);
        const rotate = [ to_point ];

        this._rotate_z_vectors(this.m_z_axis, dz);
        this._rotate_y_vectors(this.m_up_direction, dy, rotate);
        this._rotate_x_vectors(this.m_x_axis, dx, rotate);

        this.m_translation.set(point);
        this.m_translation.add(to_point);

        this.m_dirty_matrix = true;
    }

    /**
     * Translates a given vector in either world space or object space by {dx, dy, dz}.
     * This can be used by subclasses to
     */
    _translate_vector(dx, dy, dz, vector, in_object_space=false) {
        if (!!in_object_space) {
            if (dx !== 0) {
                vector.add(this.m_x_axis.clone().scale(dx));
            }
            if (dy !== 0) {
                vector.add(this.m_y_axis.clone().scale(dy));
            }
            if (dz !== 0) {
                vector.add(this.m_z_axis.clone().scale(dz));
            }
        } else {
            vector.x += dx;
            vector.y += dy;
            vector.z += dz;
        }
    }

    /**
     * Rotates an array of vectors around the given axis by the angle (in radians) in either world or object space.
     */
    _rotate_vectors(axis, angle, rotation_vectors, in_object_space=false) {
        let m = new Matrix4x4();
        if (!!in_object_space) {
            axis = axis.clone().rotate_transpose(this.world_to_obj);
        }

        m.set_rotation(axis, angle);
        for (let i = 0; i < rotation_vectors.length; i++) {
            rotation_vectors[i].rotate(m);
        }
    }

    /**
     * Rotates the transform around the current x axis by angle.
     * An optional array of vectors can be given that will also be rotated.
     */
    _rotate_x_vectors(axis, angle, rotation_vectors, in_object_space=false) {
        let vectors = [ this.m_y_axis, this.m_z_axis ];
        if (rotation_vectors != null) {
            vectors = vectors.concat(rotation_vectors);
        }

        this._rotate_vectors(axis, angle, vectors, in_object_space);
        this.m_dirty_matrix = true;
    }

    /**
     * Rotates the transform around the current y axis by angle.
     * An optional array of vectors can be given that will also be rotated.
     */
    _rotate_y_vectors(axis, angle, rotation_vectors, in_object_space=false) {
        let vectors = [ this.m_x_axis, this.m_z_axis ];
        if (rotation_vectors != null) {
            vectors = vectors.concat(rotation_vectors);
        }

        this._rotate_vectors(axis, angle, vectors, in_object_space);
        this.m_dirty_matrix = true;
    }

    /**
     * Rotates the transform around the current z axis by angle.
     * An optional array of vectors can be given that will also be rotated.
     */
    _rotate_z_vectors(axis, angle, rotation_vectors, in_object_space=false) {
        let vectors = [ this.m_x_axis, this.m_y_axis ];
        if (rotation_vectors != null) {
            vectors = vectors.concat(rotation_vectors);
        }

        this._rotate_vectors(axis, angle, vectors, in_object_space);
        this.m_dirty_matrix = true;
    }
}
