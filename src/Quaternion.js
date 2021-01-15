/******************************************************************************
 * Copyright 2010-2021 migenius pty ltd, Australia. All rights reserved.
 * Portions of this file are Copyright © 2010-2021 three.js authors
 *****************************************************************************/
import { Matrix4x4, ALMOST_ZERO } from '@migenius/realityserver-client';
import { Euler } from './Euler';

/**
 * The Quaternion class reprents quaternion rotations and supports conversion
 * to/from matrices and Euler rotation representations.
 * @memberof RS
 */
class Quaternion {
    /**
     * Creates a new Quaternion. Accepts any arguments that
     * {@link RS.Quaternion#set} accepts.
     * @param {(RS.Quaternion|RS.Euler|RS.Math.Matrix4x4|Array|Object|...Number)=} initial - initial value.
     */
    constructor( initial ) {
        if (initial !== undefined) {
            this.set(...arguments);
        } else {
            this.set(0, 0, 0, 1);
        }
    }

    /**
     * Spherically interpolates `start` to `end` by `t` storing the result in `target`
     * @param {RS.Quaternion} start - The starting quaternion (where `t` is 0).
     * @param {RS.Quaternion} end - The end quaternion (where `t` is 1).
     * @param {RS.Quaternion} target - Target quaternion to store result in.
     * @param {Number} t - interploation factor in range `[0, 1]`
     */
    static slerp( start, end, target, t ) {
        return target.set( start ).slerp( end, t );
    }

    /**
     * Spherical interpolates quaternions where the quaternions are represented
     * by flat arrays of numbers rather than the {@link RS.Quaternion} class.
     * @param {Array} target - Target array to store result.
     * @param {Number} target_offset - Offset into `target` to store result at.
     * @param {Array} src0 - Source array for the starting quaternion.
     * @param {Number} src_offset0 - Offset into `src0` to read quaternion from.
     * @param {Array} src1 - Source array for the end quaternion.
     * @param {Number} src_offset1 - Offset into `src1` to read quaternion from.
     * @param {Number} t - interploation factor in range `[0, 1]`
     */
    static slerp_flat( target, target_offset, src0, src_offset0, src1, src_offset1, t ) {

        // fuzz-free, array-based Quaternion SLERP operation
        let x0 = src0[src_offset0 + 0],
            y0 = src0[src_offset0 + 1],
            z0 = src0[src_offset0 + 2],
            w0 = src0[src_offset0 + 3];

        const x1 = src1[src_offset1 + 0],
            y1 = src1[src_offset1 + 1],
            z1 = src1[src_offset1 + 2],
            w1 = src1[src_offset1 + 3];

        if ( w0 !== w1 || x0 !== x1 || y0 !== y1 || z0 !== z1 ) {

            let s = 1 - t;
            const cos = x0 * x1 + y0 * y1 + z0 * z1 + w0 * w1,
                dir = ( cos >= 0 ? 1 : -1 ),
                sqrSin = 1 - cos * cos;

            // Skip the Slerp for tiny steps to avoid numeric problems:
            if ( sqrSin > Number.EPSILON ) {

                const sin = Math.sqrt( sqrSin ),
                    len = Math.atan2( sin, cos * dir );

                s = Math.sin( s * len ) / sin;
                t = Math.sin( t * len ) / sin;

            }

            const tDir = t * dir;

            x0 = x0 * s + x1 * tDir;
            y0 = y0 * s + y1 * tDir;
            z0 = z0 * s + z1 * tDir;
            w0 = w0 * s + w1 * tDir;

            // Normalize in case we just did a lerp:
            if ( s === 1 - t ) {

                const f = 1 / Math.sqrt( x0 * x0 + y0 * y0 + z0 * z0 + w0 * w0 );

                x0 *= f;
                y0 *= f;
                z0 *= f;
                w0 *= f;

            }

        }

        target[target_offset] = x0;
        target[target_offset + 1] = y0;
        target[target_offset + 2] = z0;
        target[target_offset + 3] = w0;

    }

    /**
     * Multiplies quaternions where the quaternions are represented
     * by flat arrays of numbers rather than the {@link RS.Quaternion} class.
     * @param {Array} target - Target array to store result.
     * @param {Number} target_offset - Offset into `target` to store result at.
     * @param {Array} src0 - Source array for the left hand quaternion.
     * @param {Number} src_offset0 - Offset into `src0` to read quaternion from.
     * @param {Array} src1 - Source array for the right hand quaternion.
     * @param {Number} src_offset1 - Offset into `src1` to read quaternion from.
     */
    static multiply_quaternions_flat( target, target_offset, src0, src_offset0, src1, src_offset1 ) {

        const x0 = src0[src_offset0];
        const y0 = src0[src_offset0 + 1];
        const z0 = src0[src_offset0 + 2];
        const w0 = src0[src_offset0 + 3];

        const x1 = src1[src_offset1];
        const y1 = src1[src_offset1 + 1];
        const z1 = src1[src_offset1 + 2];
        const w1 = src1[src_offset1 + 3];

        target[target_offset] = x0 * w1 + w0 * x1 + y0 * z1 - z0 * y1;
        target[target_offset + 1] = y0 * w1 + w0 * y1 + z0 * x1 - x0 * z1;
        target[target_offset + 2] = z0 * w1 + w0 * z1 + x0 * y1 - y0 * x1;
        target[target_offset + 3] = w0 * w1 - x0 * x1 - y0 * y1 - z0 * z1;

        return dst;

    }

    /**
     * The x component of the quaternion.
     * @member {Number}
     */
    get x() {
        return this.m_x;
    }

    set x( value ) {
        this.m_x = value;
    }

    /**
     * The y component of the quaternion.
     * @member {Number}
     */
    get y() {
        return this.m_y;
    }

    set y( value ) {
        this.m_y = value;
    }

    /**
     * The z component of the quaternion.
     * @member {Number}
     */
    get z() {
        return this.m_z;
    }

    set z( value ) {
        this.m_z = value;
    }

    /**
     * The w component of the quaternion.
     * @member {Number}
     */
    get w() {
        return this.m_w;
    }

    set w( value ) {
        this.m_w = value;
    }

    /**
     * Sets this quaternion. The source may be of the
     * following types:
     * - {@link RS.Quaternion}
     * - {@link RS.Euler}
     * - {@link RS.Math.Matrix4x4}
     * - an `Array` with 4 or more members
     * - an `Object`.
     * - individual arguments for `x`, `y`, `z` and `w`
     *
     * If the source is `RS.Math.Matrix4x4` then it is expected to have no
     * scaling factors. The matrix is expected to be a forward transformation,
     * IE: an object to world space matrix.
     *
     * In the case of an object being supplied it should have the
     * members `x`, `y`, `z` and `w`. Parsing failures on `x`, `y` or `z`
     * will set them to `0`, failures on `w` will set it to `1`.
     * @example
     * const v = new RS.Quaternion();
     * v.set(1,2,0,1);
     * v.set([0.2,-0.3,-.5,-0.2]);
     * v.set({x: 0.1, y: 0.53,z: -0.3, w:1});
     * @param {(RS.Quaternion|RS.Euler|RS.Math.Matrix4x4|Array|Object|...Number)} source - the object to set
     * from or a set of numbers.
     * @return {RS.Quaternion} `this`
     */
    set(source) {
        if (source instanceof Quaternion) {
            this.m_x = source.x;
            this.m_y = source.y;
            this.m_z = source.z;
            this.m_w = source.w;
        } else if (source instanceof Matrix4x4) {
            this.set_from_matrix(source);
        } else if (source instanceof Euler) {
            this.set_fron_euler(source);
        } else if (source instanceof Array) {
            if (source.length < 4) {
                throw new Error('Array needs at least 4 elements.');
            }

            this.m_x = parseFloat(source[0]);
            this.m_y = parseFloat(source[1]);
            this.m_z = parseFloat(source[2]);
            this.m_w = parseFloat(source[3]);
        } else if (!isNaN(source)) {
            this.m_x = parseFloat(arguments[0]);
            this.m_y = parseFloat(arguments[1]);
            this.m_z = parseFloat(arguments[2]);
            this.m_w = parseFloat(arguments[3]);
        } else {
            this.m_x = parseFloat(source.x);
            this.m_y = parseFloat(source.y);
            this.m_z = parseFloat(source.z);
            this.m_w = parseFloat(source.w);
        }
        if (Number.isNaN(this.m_x)) {
            this.m_x = 0;
        }
        if (Number.isNaN(this.m_y)) {
            this.m_y = 0;
        }
        if (Number.isNaN(this.m_z)) {
            this.m_z = 0;
        }
        if (Number.isNaN(this.m_w)) {
            this.m_w = 1;
        }

        return this;

    }

    /**
     * Returns a copy of this quaternion.
     * @return {RS.Euler} a copy of `this`
     */
    clone() {
        return new Quaternion( this.m_x, this.m_y, this.m_z, this.m_w );

    }

    /**
     * Sets this quaternion from an {@link RS.Euler}.
     * @private
     * @param {RS.Euler} euler - the euler.
     * @return {RS.Quaternion} `this`
     */
    set_fron_euler( euler ) {
        const x = euler.m_x, y = euler.m_y, z = euler.m_z, order = euler.m_order;

        // http://www.mathworks.com/matlabcentral/fileexchange/
        //     20696-function-to-convert-between-dcm-euler-angles-quaternions-and-euler-vectors/
        //    content/SpinCalc.m

        const cos = Math.cos;
        const sin = Math.sin;

        const c1 = cos( x / 2 );
        const c2 = cos( y / 2 );
        const c3 = cos( z / 2 );

        const s1 = sin( x / 2 );
        const s2 = sin( y / 2 );
        const s3 = sin( z / 2 );

        switch ( order ) {

        case 'XYZ':
            this.m_x = s1 * c2 * c3 + c1 * s2 * s3;
            this.m_y = c1 * s2 * c3 - s1 * c2 * s3;
            this.m_z = c1 * c2 * s3 + s1 * s2 * c3;
            this.m_w = c1 * c2 * c3 - s1 * s2 * s3;
            break;

        case 'YXZ':
            this.m_x = s1 * c2 * c3 + c1 * s2 * s3;
            this.m_y = c1 * s2 * c3 - s1 * c2 * s3;
            this.m_z = c1 * c2 * s3 - s1 * s2 * c3;
            this.m_w = c1 * c2 * c3 + s1 * s2 * s3;
            break;

        case 'ZXY':
            this.m_x = s1 * c2 * c3 - c1 * s2 * s3;
            this.m_y = c1 * s2 * c3 + s1 * c2 * s3;
            this.m_z = c1 * c2 * s3 + s1 * s2 * c3;
            this.m_w = c1 * c2 * c3 - s1 * s2 * s3;
            break;

        case 'ZYX':
            this.m_x = s1 * c2 * c3 - c1 * s2 * s3;
            this.m_y = c1 * s2 * c3 + s1 * c2 * s3;
            this.m_z = c1 * c2 * s3 - s1 * s2 * c3;
            this.m_w = c1 * c2 * c3 + s1 * s2 * s3;
            break;

        case 'YZX':
            this.m_x = s1 * c2 * c3 + c1 * s2 * s3;
            this.m_y = c1 * s2 * c3 + s1 * c2 * s3;
            this.m_z = c1 * c2 * s3 - s1 * s2 * c3;
            this.m_w = c1 * c2 * c3 - s1 * s2 * s3;
            break;

        case 'XZY':
            this.m_x = s1 * c2 * c3 - c1 * s2 * s3;
            this.m_y = c1 * s2 * c3 - s1 * c2 * s3;
            this.m_z = c1 * c2 * s3 + s1 * s2 * c3;
            this.m_w = c1 * c2 * c3 + s1 * s2 * s3;
            break;

        default:
            console.warn( 'RS.Quaternion: .set_from_euler() encountered an unknown order: ' + order );

        }

        return this;

    }

    /**
     * Sets this quaternion to the rotation about the given axis by the given angle in radians.
     * @param {RS.Math.Vector3} axis - the axis to rotate around.
     * @param {Number} angle - the amount to rotate by in radians.
     * @return {RS.Quaternion} `this`
     */
    set_rotation_around_axis(axis, angle) {

        // http://www.euclideanspace.com/maths/geometry/rotations/conversions/angleToQuaternion/index.htm

        // assumes axis is normalized

        const half_angle = angle / 2, s = Math.sin( half_angle );

        this.m_x = axis.x * s;
        this.m_y = axis.y * s;
        this.m_z = axis.z * s;
        this.m_w = Math.cos( half_angle );

        return this;
    }

    /**
     * Sets this Quaternion from the rotation component of `m`.
     * @private
     * @param {RS.Matrix4x4} m the matrix to extract the rotation from, assumes no scaling is applied
     * @return {RS.Quaternion} `this`
     */
    set_from_matrix( m ) {

        // http://www.euclideanspace.com/maths/geometry/rotations/conversions/matrixToQuaternion/index.htm

        // assumes the upper 3x3 of m is a pure rotation matrix (i.e, unscaled)
        // not sure if this is right yet
        const
            m11 = m.xx, m12 = m.yx, m13 = m.zx,
            m21 = m.xy, m22 = m.yy, m23 = m.zy,
            m31 = m.xz, m32 = m.yz, m33 = m.zz,

            trace = m11 + m22 + m33;

        if ( trace > 0 ) {

            const s = 0.5 / Math.sqrt( trace + 1.0 );

            this.m_w = 0.25 / s;
            this.m_x = ( m32 - m23 ) * s;
            this.m_y = ( m13 - m31 ) * s;
            this.m_z = ( m21 - m12 ) * s;

        } else if ( m11 > m22 && m11 > m33 ) {

            const s = 2.0 * Math.sqrt( 1.0 + m11 - m22 - m33 );

            this.m_w = ( m32 - m23 ) / s;
            this.m_x = 0.25 * s;
            this.m_y = ( m12 + m21 ) / s;
            this.m_z = ( m13 + m31 ) / s;

        } else if ( m22 > m33 ) {

            const s = 2.0 * Math.sqrt( 1.0 + m22 - m11 - m33 );

            this.m_w = ( m13 - m31 ) / s;
            this.m_x = ( m12 + m21 ) / s;
            this.m_y = 0.25 * s;
            this.m_z = ( m23 + m32 ) / s;

        } else {

            const s = 2.0 * Math.sqrt( 1.0 + m33 - m11 - m22 );

            this.m_w = ( m21 - m12 ) / s;
            this.m_x = ( m13 + m31 ) / s;
            this.m_y = ( m23 + m32 ) / s;
            this.m_z = 0.25 * s;

        }
        return this;
    }

    /**
     * Sets this quaternion to the rotation required to rotate direction vector `from` to direction vector `to`.
     * @param {RS.Math.Vector3} from - the from vector, assumed to be normalized.
     * @param {RS.Math.Vector3} to - the to vector, assumed to be normalized.
     * @return {RS.Quaternion} `this`
     */
    set_from_unit_vectors( from, to ) {
        // assumes direction vectors from and to are normalized
        const EPS = 0.000001;

        let r = from.dot( to ) + 1;

        if ( r < EPS ) {

            r = 0;

            if ( Math.abs( from.x ) > Math.abs( from.z ) ) {

                this.m_x = -from.y;
                this.m_y = from.x;
                this.m_z = 0;
                this.m_w = r;

            } else {

                this.m_x = 0;
                this.m_y = -from.z;
                this.m_z = from.y;
                this.m_w = r;

            }

        } else {

            // crossVectors( from, to ); // inlined to avoid cyclic dependency on Vector3

            this.m_x = from.y * to.z - from.z * to.y;
            this.m_y = from.z * to.x - from.x * to.z;
            this.m_z = from.x * to.y - from.y * to.x;
            this.m_w = r;

        }

        return this.normalize();
    }

    /**
     * Returns the angle between this quaternion and quaternion `q` in radians.
     * @param {RS.Quaternion} q - the quaternion to measure against.
     * @return {Number} the angle between `this` and `q` in radians
     */
    angle_to( q ) {
        function clamp( value, min, max ) {
            return Math.max( min, Math.min( max, value ) );
        }
        return 2 * Math.acos( Math.abs( clamp( this.dot( q ), -1, 1 ) ) );
    }


    /**
     * Rotates this quaternion by a given angular amount towards the quaternion `q`.
     * The method ensures that the final quaternion will not overshoot `q`.
     * @param {RS.Quaternion} q - the quaternion to rotate towards.
     * @param {Number} step - the amount to rotate by in radians.
     * @return {RS.Quaternion} `this`
     */
    rotate_towards( q, step ) {
        const angle = this.angle_to( q );

        if ( angle === 0 ) return this;

        const t = Math.min( 1, step / angle );

        this.slerp( q, t );

        return this;
    }

    /**
     * Sets this quaternion to the identity quaternion.
     * @return {RS.Quaternion} `this`
     */
    identity() {
        return this.set( 0, 0, 0, 1 );
    }

    /**
     * Inverts this quaternion
     * @return {RS.Quaternion} `this`
     */
    invert() {
        // quaternion is assumed to have unit length
        return this.conjugate();
    }

    /**
     * Sets this quaternion to its rotational conjugate.
     * The conjugate of a quaternion represents the same rotation in the opposite direction about the rotational axis.
     * @return {RS.Quaternion} `this`
     */
    conjugate() {
        this.m_x *= -1;
        this.m_y *= -1;
        this.m_z *= -1;

        return this;
    }

    /**
     * Calculates the dot product between `this` and the quaternion `v`.
     * @param {RS.Quaternion} v - the other quaternion.
     * @return {Number} the dot product.
     */
    dot(v) {
        return this.m_x * v.m_x + this.m_y * v.m_y + this.m_z * v.m_z + this.m_w * v.m_w;
    }

    /**
     * Calculates the squared length of this quaternion.
     * @return {Number} the squared length.
     */
    length_sq() {
        return this.m_x * this.m_x + this.m_y * this.m_y + this.m_z * this.m_z + this.m_w * this.m_w;
    }

    /**
     * Calculates the length of this quaternion.
     * @return {Number} the length.
     */
    length() {

        return Math.sqrt( this.m_x * this.m_x + this.m_y * this.m_y + this.m_z * this.m_z + this.m_w * this.m_w );

    }

    /**
     * Normalizes this quaternion to unit length.
     * @return {RS.Quaternion} `this`
     */
    normalize() {
        let l = this.length();

        if ( l === 0 ) {

            this.m_x = 0;
            this.m_y = 0;
            this.m_z = 0;
            this.m_w = 1;

        } else {

            l = 1 / l;

            this.m_x = this.m_x * l;
            this.m_y = this.m_y * l;
            this.m_z = this.m_z * l;
            this.m_w = this.m_w * l;

        }

        return this;

    }

    /**
     * Multiplies this quaternion with `rhs`. IE: `this = this x rhs`.
     * @param {RS.Quaternion} rhs - the right hand quaternion.
     * @return {RS.Quaternion} `this`
     */
    multiply( q ) {
        return this.multiply_quaternions( this, q );
    }

    /**
     * Premultiplies this quaternion with `lhs`. IE: `this = lhs x this`.
     * @param {RS.Quaternion} lhs - the left hand quaternion.
     * @return {RS.Quaternion} `this`
     */
    premultiply( lhs ) {
        return this.multiply_quaternions( lhs, this );
    }

    /**
     * Sets this quaternion to `lhs` x `rhs`.
     * @param {RS.Quaternion} lhs - the left hand quaternion.
     * @param {RS.Quaternion} rhs - the right hand quaternion.
     * @return {RS.Quaternion} `this`
     */
    multiply_quaternions(lhs, rhs) {

        // from http://www.euclideanspace.com/maths/algebra/realNormedAlgebra/quaternions/code/index.htm

        const qax = lhs.m_x, qay = lhs.m_y, qaz = lhs.m_z, qaw = lhs.m_w;
        const qbx = rhs.m_x, qby = rhs.m_y, qbz = rhs.m_z, qbw = rhs.m_w;

        this.m_x = qax * qbw + qaw * qbx + qay * qbz - qaz * qby;
        this.m_y = qay * qbw + qaw * qby + qaz * qbx - qax * qbz;
        this.m_z = qaz * qbw + qaw * qbz + qax * qby - qay * qbx;
        this.m_w = qaw * qbw - qax * qbx - qay * qby - qaz * qbz;

        return this;
    }

    /**
     * Handles spherical linear interpolation between quaternions.
     * `t` represents the amount of rotation between this quaternion (where `t` is 0) and `end` (where t is 1).
     * This quaternion is set to the result. Also see the static version of `slerp`.
     * @param {RS.Quaternion} end - the quaternion to interpolate to.
     * @param {RS.Quaternion} t - interpolation factor in the closed interval `[0, 1]`.
     * @return {RS.Quaternion} `this`
     */
    slerp( end, t ) {

        if ( t === 0 ) return this;
        if ( t === 1 ) return this.set( end );

        const x = this.m_x, y = this.m_y, z = this.m_z, w = this.m_w;

        // http://www.euclideanspace.com/maths/algebra/realNormedAlgebra/quaternions/slerp/

        let cos_half_theta = w * end.m_w + x * end.m_x + y * end.m_y + z * end.m_z;

        if ( cos_half_theta < 0 ) {

            this.m_w = -end.m_w;
            this.m_x = -end.m_x;
            this.m_y = -end.m_y;
            this.m_z = -end.m_z;

            cos_half_theta = -cos_half_theta;

        } else {

            this.set( end );

        }

        if ( cos_half_theta >= 1.0 ) {

            this.m_w = w;
            this.m_x = x;
            this.m_y = y;
            this.m_z = z;

            return this;

        }

        const sqr_sin_half_theta = 1.0 - cos_half_theta * cos_half_theta;

        if ( sqr_sin_half_theta <= Number.EPSILON ) {

            const s = 1 - t;
            this.m_w = s * w + t * this.m_w;
            this.m_x = s * x + t * this.m_x;
            this.m_y = s * y + t * this.m_y;
            this.m_z = s * z + t * this.m_z;

            this.normalize();

            return this;
        }

        const sin_half_theta = Math.sqrt( sqr_sin_half_theta );
        const half_theta = Math.atan2( sin_half_theta, cos_half_theta );
        const ratio_a = Math.sin( ( 1 - t ) * half_theta ) / sin_half_theta,
            ratio_b = Math.sin( t * half_theta ) / sin_half_theta;

        this.m_w = ( w * ratio_a + this.m_w * ratio_b );
        this.m_x = ( x * ratio_a + this.m_x * ratio_b );
        this.m_y = ( y * ratio_a + this.m_y * ratio_b );
        this.m_z = ( z * ratio_a + this.m_z * ratio_b );

        return this;
    }

    /**
     * Returns whether this quaternion is equal to another quaternion within a tolerance.
     * @param {RS.Quaternion} rhs - the quaternion to compare to.
     * @param {Number=} tolerance - if provided then this level of tolerance is used, otherwise
     * tolerance is `10e-5`.
     * @return {Boolean} `true` if equal, `false` if not.
     */
    equal_with_tolerance(rhs, tolerance) {
        if (tolerance === undefined) {
            tolerance = ALMOST_ZERO;
        }
        return (Math.abs(this.m_x - rhs.m_x) < tolerance &&
				Math.abs(this.m_y - rhs.m_y) < tolerance &&
				Math.abs(this.m_z - rhs.m_z) < tolerance &&
                Math.abs(this.m_w - rhs.m_w) < tolerance);
    }

    /**
     * Returns whether this euler is equal to another quaternion within an optional tolerance.
     * @param {RS.Euler} rhs - the euler to compare to.
     * @param {Number=} tolerance - if provided then this level of tolerance is used, otherwise
     * uses an exact match.
     * @return {Boolean} `true` if equal, `false` if not.
     */
    equal( rhs, tolerance) {
        if (tolerance) {
            return this.equal_with_tolerance(rhs, tolerance);
        }
        return ( rhs.m_x === this.m_x ) && ( rhs.m_y === this.m_y ) && ( rhs.m_z === this.m_z ) &&
                ( rhs.m_w === this.m_w );
    }

    /**
     * Rotates the provided vector by this quaternion. Equivalent to `Vector3.multiply(q.to_matrix())`
     * but will be faster. The vector is modified.
     * @param {RS.Math.Vector3} vec - the vector to rotate.
     * @return {RS.Math.Vector3} the rotated vector.
     */
    rotate_vector(vec) {
        const { x, y, z } = vec;

        // calculate quat * vector
        const ix = this.w * x + this.y * z - this.z * y;
        const iy = this.w * y + this.z * x - this.x * z;
        const iz = this.w * z + this.x * y - this.y * x;
        const iw = -this.x * x - this.y * y - this.z * z;

        // calculate result * inverse quat
        vec.x = ix * this.w + iw * -this.x + iy * -this.z - iz * -this.y;
        vec.y = iy * this.w + iw * -this.y + iz * -this.x - ix * -this.z;
        vec.z = iz * this.w + iw * -this.z + ix * -this.y - iy * -this.x;

        return vec;
    }

    /**
     * Returns a matrix representing this quaternion.
     * This will be a forward transformation, IE: an object to world space matrix.
     * The matrix can be passed to `RS.Math.Vector3.rotate` to rotate a vector by
     * this quaternion.
     * @return {RS.Math.Matrix4x4} the rotation matrix.
     */
    to_matrix() {
        const m = new Matrix4x4();

        const x = this.m_x, y = this.m_y, z = this.m_z, w = this.m_w;
        const x2 = x + x,    y2 = y + y, z2 = z + z;
        const xx = x * x2, xy = x * y2, xz = x * z2;
        const yy = y * y2, yz = y * z2, zz = z * z2;
        const wx = w * x2, wy = w * y2, wz = w * z2;

        m.xx = ( 1 - ( yy + zz ) );
        m.xy = ( xy + wz );
        m.xz = ( xz - wy );

        m.yx = ( xy - wz );
        m.yy = ( 1 - ( xx + zz ) );
        m.yz = ( yz + wx );

        m.zx = ( xz + wy );
        m.zy = ( yz - wx );
        m.zz = ( 1 - ( xx + yy ) );

        return m;
    }
}

export { Quaternion };
