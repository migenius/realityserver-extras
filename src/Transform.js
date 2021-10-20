/******************************************************************************
 * Copyright 2010-2021 migenius pty ltd, Australia. All rights reserved.
 *****************************************************************************/
import { Vector3, Vector4, Matrix4x4 } from '@migenius/realityserver-client';
import { Quaternion } from './Quaternion';


const _X_AXIS = new Vector4(1, 0, 0, 0);
const _Y_AXIS = new Vector4(0, 1, 0, 0);
const _Z_AXIS = new Vector4(0, 0, 1, 0);

const _NEG_X_AXIS = new Vector4(-1, 0, 0, 0);
const _NEG_Y_AXIS = new Vector4( 0, -1, 0, 0);
const _NEG_Z_AXIS = new Vector4( 0, 0, -1, 0);

/**
 * The Transform class provides a more user friendly way of manipulating matrices.
 * Typically this class would be initialized by setting the `world_to_obj` property
 * with a matrix that has been retrieved from RealityServer. The `translation`,
 * `rotation` and `scale` properties will then contain the object to world space
 * geometric properties of that matrix. The transform can then be manipulated as
 * desired and the `world_to_obj` property then used to set the matrix of a
 * RealityServer Instance.
 *
 * <b>NB</b>: All properties return copies of the internal values. Editing the components
 * of these properties directly will not modify the transform. You need to set values
 * back onto the properties to effect changes.
 * <pre><code>const t = new Transform();
 * t.translation.x = 1.0; //< Incorrect
 * const v = t.translation;
 * v.x = 1.0;
 * t.translation = v; //< Correct
 * </code></pre>
 * @memberof RS
 */
class Transform {
    /**
     * The X Axis vector
     * @type {Vector4}
    */
    static get X_AXIS() {
        return _X_AXIS;
    }
    /**
     * The Y Axis vector
     * @type {Vector4}
    */
    static get Y_AXIS() {
        return _Y_AXIS;
    }
    /**
     * The Z Axis vector
     * @type {Vector4}
    */
    static get Z_AXIS() {
        return _Z_AXIS;
    }
    /**
     * The negative X Axis vector
     * @type {Vector4}
    */
    static get NEG_X_AXIS() {
        return _NEG_X_AXIS;
    }
    /**
     * The negative Y Axis vector
     * @type {Vector4}
    */
    static get NEG_Y_AXIS() {
        return _NEG_Y_AXIS;
    }
    /**
     * The negative Z Axis vector
     * @type {Vector4}
    */
    static get NEG_Z_AXIS() {
        return _NEG_Z_AXIS;
    }

    /**
     * The default constructor initializes with an identity matrix.
     */
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
     * returns a copy of this Transform.
     * @return {RS.Transform}
     */
    clone() {
        const transform = new Transform();
        this.populate_clone(transform);

        return transform;
    }

    /**
     * Populates the clone with all the required information.
     * Can be used by subclasses so that they can add their own
     * data to the populating process.
     * @access private
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

    /**
     * Populates the underling matrix.
     * @access private
     */
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
     * Populates the underling translation, axis and scale from the matrix.
     * @access private
     */
    derive_vectors() {
        let obj_to_world = new Matrix4x4(this.m_world_to_obj);
        obj_to_world.invert();

        this.m_translation.set(0, 0, 0);
        this.m_translation.transform(obj_to_world);

        this.m_z_axis.set(Transform.Z_AXIS);
        this.m_z_axis.rotate(obj_to_world);
        this.m_scale.z = new Vector3(this.m_z_axis).length();
        this.m_z_axis.normalize();

        this.m_y_axis.set(Transform.Y_AXIS);
        this.m_y_axis.rotate(obj_to_world);
        this.m_scale.y = new Vector3(this.m_y_axis).length();
        this.m_y_axis.normalize();

        this.m_x_axis.set(Transform.X_AXIS);
        this.m_x_axis.rotate(obj_to_world);
        this.m_scale.x = new Vector3(this.m_x_axis).length();
        this.m_x_axis.normalize();
    }

    /**
     * The World to Object space Matrix represented by this Transform
     * @type {RS.Matrix4x4}
     */
    get world_to_obj() {
        if (this.m_dirty_matrix) {
            this.derive_world_to_obj();
        }
        return this.m_world_to_obj.clone();
    }

    set world_to_obj(world_to_obj) {
        this.m_world_to_obj.set(world_to_obj);
        this.derive_vectors();
        this.m_dirty_matrix = false;
    }

    /**
     * Sets the elements of the translation vector.
     * @access private
     */
    _set_translation(x, y, z) {
        this.m_translation.set(x, y, z);
        this.m_dirty_matrix = true;
    }

    /**
     * The translation component of this Transform
     * @type {RS.Vector3}
     */
    get translation() {
        return new Vector3(this.m_translation);
    }

    set translation(value) {
        this._set_translation(value.x, value.y, value.z);
    }

    /**
     * The rotation component of this Transform
     * @type {RS.Quaternion}
     */
    get rotation() {
        // derive quaterion from axis
        return new Quaternion(new Matrix4x4(
            this.m_x_axis.x, this.m_y_axis.x, this.m_z_axis.x, 0,
            this.m_x_axis.y, this.m_y_axis.y, this.m_z_axis.y, 0,
            this.m_x_axis.z, this.m_y_axis.z, this.m_z_axis.z, 0,
            0, 0, 0, 1)).conjugate();
    }

    set rotation(value) {
        // update axis from provided quaternion
        this.m_x_axis = value.rotate_vector(Transform.X_AXIS.clone());
        this.m_y_axis = value.rotate_vector(Transform.Y_AXIS.clone());
        this.m_z_axis = value.rotate_vector(Transform.Z_AXIS.clone());
        this.m_dirty_matrix = true;
    }

    /**
     * Translates the transform by the given amount in either world space or object space.
     * @param {Number} dx the amount to translate in X.
     * @param {Number} dy the amount to translate in Y.
     * @param {Number} dz the amount to translate in Z.
     * @param {Boolean=} in_object_space if `true` then translates in object space, otherwise world.
     */
    translate(dx, dy, dz, in_object_space=true) {
        this._translate_vector(dx, dy, dz, this.m_translation, in_object_space);
        this.m_dirty_matrix = true;
    }

    /**
     * The X axis of this transform
     * @readonly
     * @type {RS.Vector3}
     */
    get x_axis() {
        return new Vector3(this.m_x_axis);
    }

    /**
     * The Y axis of this transform
     * @readonly
    * @type {RS.Vector3}
     */
    get y_axis() {
        return new Vector3(this.m_y_axis);
    }

    /**
     * The Z axis of this transform
     * @readonly
     * @type {RS.Vector3}
     */
    get z_axis() {
        return new Vector3(this.m_z_axis);
    }

    /**
     * Sets the absolute values of the elements of the scaling vector.
     * @param {Number} x the scale in X.
     * @param {Number} y the scale in Y.
     * @param {Number} z the scale in Z.
     * @access private
     */
    _set_scale(x, y, z) {
        this.m_scale.set(x, y, z);
        this.m_dirty_matrix = true;
    }

    /**
     * Scales the current scaling vector.
     * @param {Number} x scaling factor in X.
     * @param {Number} y scaling factor in Y.
     * @param {Number} z scaling factor in Z.
     * @access private
     */
    _scale(dx, dy, dz) {
        this.m_scale.x *= dx;
        this.m_scale.y *= dy;
        this.m_scale.z *= dz;
        this.m_dirty_matrix = true;
    }

    /**
     * The scale component of this transform
     * @type {RS.Vector3}
     */
    get scale() {
        return this.m_scale.clone();
    }

    set scale(value) {
        this._set_scale(value.x, value.y, value.z);
    }

    /**
     * Scales the transform.
     * @param {Vector3} value The amount to scale by
     */
    multiply_scale(value) {
        this._scale(value.x, value.y, value.z);
    }


    /**
     * Performs an Euler rotation on the transform in ZYX order.
     * @param {Number} x X rotation in radians.
     * @param {Number} y Y rotation in radians.
     * @param {Number} z Z rotation in radians.
     */
    rotate(dx, dy, dz) {
        this._rotate_z_vectors(this.m_z_axis, dz);
        this._rotate_y_vectors(this.m_y_axis, dy);
        this._rotate_x_vectors(this.m_x_axis, dx);

        this.m_dirty_matrix = true;
    }

    /**
     * Sets an Euler rotation on the transform in ZYX order.
     * @param {Number} x X rotation in radians.
     * @param {Number} y Y rotation in radians.
     * @param {Number} z Z rotation in radians.
     */
    set_rotation(x, y, z) {
        this.m_x_axis.set(Transform.X_AXIS);
        this.m_y_axis.set(Transform.Y_AXIS);
        this.m_z_axis.set(Transform.Z_AXIS);

        this.rotate(x, y, z);
    }

    /**
     * Rotates the transform about the given axis by the given angle in radians. If in_object_space is set to `true`,
     * then the axis will be transformed into object space first.
     * @param {RS.Vector3} axis the axis to rotate around.
     * @param {Number} angle the amount to rotate by in radians.
     * @param {Boolean=} in_object_space if `true` then the axis is in object space, otherwise world.
     */
    rotate_around_axis(axis, angle, in_object_space=true) {
        this._rotate_vectors(axis, angle, [ this.m_x_axis, this.m_y_axis, this.m_z_axis ], in_object_space);

        this.m_dirty_matrix = true;
    }


    /**
     * Sets the rotation of the transform about the given world space axis by the given angle in radians.
     * @param {RS.Vector3} axis the axis to rotate around.
     * @param {Number} angle the amount to rotate by in radians.
     */
    set_rotation_around_axis(axis, angle) {
        this.m_x_axis.set(Transform.X_AXIS);
        this.m_y_axis.set(Transform.Y_AXIS);
        this.m_z_axis.set(Transform.Z_AXIS);

        this.rotate_around_axis(axis, angle, false);
    }

    /**
     * Rotates the transform around a given world space point
     * @param {RS.Vector3} point the point to rotate around.
     * @param {Number} dx the amount to rotate around the transforms X axis by in radians.
     * @param {Number} dy the amount to rotate around the transforms Y axis by in radians.
     * @param {Number} dz the amount to rotate around the transforms Z axis by in radians.
     */
    rotate_around_point(point, dx, dy, dz) {
        const to_point = this.translation.subtract(point);
        const rotate = [ to_point ];

        this._rotate_z_vectors(this.m_z_axis, dz);
        this._rotate_y_vectors(this.m_y_axis, dy, rotate);
        this._rotate_x_vectors(this.m_x_axis, dx, rotate);

        this.m_translation.set(point);
        this.m_translation.add(to_point);

        this.m_dirty_matrix = true;
    }

    /**
     * Utility function to translates a given vector.
     * @param {Number} dx the amount to translate in X.
     * @param {Number} dy the amount to translate in Y.
     * @param {Number} dz the amount to translate in Z.
     * @param {RS.Vector3} vector the vector to translate.
     * @param {Boolean=} in_object_space if `true` then translates in object space, otherwise world.
     * @access private
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
     * Utility function to rotate an array of vectors around the given axis by the angle (in radians).
     * @param {RS.Vector3} axis the axis to rotate around.
     * @param {Number} angle the amount to rotate by in radians.
     * @param {Array} rotation_vectors array of RS.Vector4 to rotate.
     * @param {Boolean=} in_object_space if `true` then the axis is in object space, otherwise world.
     * @access private
     */
    _rotate_vectors(axis, angle, rotation_vectors, in_object_space=false) {
        let m = new Matrix4x4();
        if (!!in_object_space) {
            axis = axis.clone().rotate_transpose(this.world_to_obj);
        }

        m.set_rotation(axis.clone().normalize(), angle);
        for (let i = 0; i < rotation_vectors.length; i++) {
            rotation_vectors[i].rotate(m);
        }
    }

    /**
     * Utility function to rotate the Y and Z axis around the given axis by the angle.
     * @param {RS.Vector3} axis the axis to rotate around.
     * @param {Number} angle the amount to rotate by in radians.
     * @param {Array=} rotation_vectors additional array of RS.Vector4 to rotate.
     * @param {Boolean=} in_object_space if `true` then the axis is in object space, otherwise world.
     * @access private
     */
    _rotate_x_vectors(axis, angle, rotation_vectors=null, in_object_space=false) {
        let vectors = [ this.m_y_axis, this.m_z_axis ];
        if (rotation_vectors != null) {
            vectors = vectors.concat(rotation_vectors);
        }

        this._rotate_vectors(axis, angle, vectors, in_object_space);
        this.m_dirty_matrix = true;
    }

    /**
     * Utility function to rotate the X and Z axis around the given axis by the angle.
     * @param {RS.Vector3} axis the axis to rotate around.
     * @param {Number} angle the amount to rotate by in radians.
     * @param {Array=} rotation_vectors additional array of RS.Vector4 to rotate.
     * @param {Boolean=} in_object_space if `true` then the axis is in object space, otherwise world.
     * @access private
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
     * Utility function to rotate the X and Y axis around the given axis by the angle.
     * @param {RS.Vector3} axis the axis to rotate around.
     * @param {Number} angle the amount to rotate by in radians.
     * @param {Array=} rotation_vectors additional array of RS.Vector4 to rotate.
     * @param {Boolean=} in_object_space if `true` then the axis is in object space, otherwise world.
     * @access private
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

export { Transform };
