/******************************************************************************
 * Copyright 2010-2021 migenius pty ltd, Australia. All rights reserved.
 * Portions of this file are Copyright © 2010-2021 three.js authors
*****************************************************************************/
import { Quaternion } from './Quaternion.js';
import { Matrix4x4, ALMOST_ZERO } from  '@migenius/realityserver-client';

const _DEFAULT_ORDER = 'ZYX';
const _ROTATION_ORDERS = [ 'XYZ', 'YZX', 'ZXY', 'XZY', 'YXZ', 'ZYX' ];

/**
 * The Euler class reprents euler rotations and supports conversion
 * to/from matrices and Quaternion rotation representations.
 *
 * RealityServer uses intrinsic Tait-Bryan angles. This means that rotations are
 * performed with respect to the local coordinate system. That is, for order
 * 'XYZ', the rotation is first around the local-X axis (which is the same
 * as the world-X axis), then around local-Y (which may now be different from
 * the world Y-axis), then local-Z (which may be different from the world Z-axis).
 * @memberof RS
 */
class Euler {
    /**
     * Creates a new Euler. Accepts any arguments that
     * {@link RS.Euler#set} accepts.
     * @param {(RS.Euler|RS.Quaternion|RS.Math.Matrix4x4|Array|Object|...Number)=} initial - initial value.
     * @param {String=} order - order to apply rotations in
     */
    constructor(initial, order) { // eslint-disable-line no-unused-vars
        this.order = Euler.default_order;
        if (initial !== undefined) {
            this.set(...arguments);
        } else {
            this.set(0, 0, 0);
        }
    }
    /**
     * The default euler order.
     * @type {String}
     */
    static get default_order() {
        return _DEFAULT_ORDER;
    }

    /**
     * Array of supported euler orders.
     * @type {Array}
     */
    static get rotation_orders() {
        return _ROTATION_ORDERS;
    }

    /**
     * The x component of the euler in radians.
     * @member {Number}
     */
    get x() {
        return this.m_x;
    }

    set x( value ) {
        this.m_x = value;
    }

    /**
     * The y component of the euler in radians.
     * @member {Number}
     */
    get y() {
        return this.m_y;
    }

    set y( value ) {
        this.m_y = value;
    }

    /**
     * The z component of the euler in radians.
     * @member {Number}
     */
    get z() {
        return this.m_z;
    }

    set z( value ) {
        this.m_z = value;
    }

    /**
     * The rotation order of the euler.
     * @member {String}
     */
    get order() {
        return this.m_order;
    }

    set order( value ) {
        this.m_order = value;
    }

    /**
     * Sets this euler. The source may be of the
     * following types:
     * - {@link RS.Euler}
     * - {@link RS.Quaternion}
     * - `RS.Math.Matrix4x4`
     * - an `Array` with 4 or more members
     * - an `Object`.
     * - 3 individual arguments for `x`, `y` and `z`
     *
     * In the case of an object being supplied it should have the
     * members `x`, `y`, `z`. Parsing failures on `x`, `y` or `z`
     * will set them to `0`.
     *
     * If the source is `RS.Math.Matrix4x4` then it is expected to have no
     * scaling factors. The matrix is expected to be a forward transformation,
     * IE: an object to world space matrix.
     *
     * Rotation values are in radians.
     *
     * If the source is not {@link RS.Euler} then the final parameter can be a string
     * specifying the order that should be used.
     * @example
     * const v = new RS.Euler();
     * v.set(0,Math.PI/2,0,'XYZ');
     * v.set([0,Math.PI/2,Math.PI/2]);
     * v.set({x: 0, y: Math.PI, z: 0});
     * @param {(RS.Euler|RS.Quaternion|RS.Math.Matrix4x4|Array|Object|...Number)} source - the object
     * to set from or a set of numbers. When a number represents a rotation it is in radians.
     * @param {String=} order - the order in which to apply the extracted rotations, overrides the
	 * current value if given.
     * @return {Euler} `this`
     */
    set(source, order) {
        if (source instanceof Euler) {
            this.m_x = source.x;
            this.m_y = source.y;
            this.m_z = source.z;
            this.m_order = source.order;
        } else if (source instanceof Matrix4x4) {
            this.set_from_matrix(source, order);
        } else if (source instanceof Quaternion) {
            this.set_from_quaternion(source, order);
        } else if (source instanceof Array) {
            if (source.length < 3) {
                throw new Error('Array needs at least 3 elements.');
            }

            this.m_x = parseFloat(source[0]);
            this.m_y = parseFloat(source[1]);
            this.m_z = parseFloat(source[2]);

            this.m_order = order || this.m_order;
        } else if (!isNaN(source)) {
            this.m_x = parseFloat(arguments[0]);
            this.m_y = parseFloat(arguments[1]);
            this.m_z = parseFloat(arguments[2]);

            this.m_order = arguments[3] || this.m_order;
        } else {
            this.m_x = parseFloat(source.x);
            this.m_y = parseFloat(source.y);
            this.m_z = parseFloat(source.z);

            this.m_order = order || this.m_order;
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

        return this;
    }

    /**
     * Returns a copy of this euler.
     * @return {RS.Euler}
     */
    clone() {
        return new Euler( this.m_x, this.m_y, this.m_z, this.m_order );
    }

    /**
     * Sets this euler from a matrix. Must have no scaling factors.
     * @private
     * @param {RS.Math.Matrix4x4} m - the matrix.
     * @param {String=} order - the order to use, if not supplied uses current order.
     * @return {Euler} `this`
     */
    set_from_matrix(m, order) {

        function clamp( value, min, max ) {
            return Math.max( min, Math.min( max, value ) );
        }


        // assumes the upper 3x3 of m is a pure rotation matrix (i.e, unscaled)
        const
            m11 = m.xx, m12 = m.yx, m13 = m.zx,
            m21 = m.xy, m22 = m.yy, m23 = m.zy,
            m31 = m.xz, m32 = m.yz, m33 = m.zz;

        order = order || this.m_order;

        switch ( order ) {

        case 'XYZ':

            this.m_y = Math.asin( clamp( m13, -1, 1 ) );

            if ( Math.abs( m13 ) < 0.9999999 ) {

                this.m_x = Math.atan2( -m23, m33 );
                this.m_z = Math.atan2( -m12, m11 );

            } else {

                this.m_x = Math.atan2( m32, m22 );
                this.m_z = 0;

            }

            break;

        case 'YXZ':

            this.m_x = Math.asin( -clamp( m23, -1, 1 ) );

            if ( Math.abs( m23 ) < 0.9999999 ) {

                this.m_y = Math.atan2( m13, m33 );
                this.m_z = Math.atan2( m21, m22 );

            } else {

                this.m_y = Math.atan2( -m31, m11 );
                this.m_z = 0;

            }

            break;

        case 'ZXY':

            this.m_x = Math.asin( clamp( m32, -1, 1 ) );

            if ( Math.abs( m32 ) < 0.9999999 ) {

                this.m_y = Math.atan2( -m31, m33 );
                this.m_z = Math.atan2( -m12, m22 );

            } else {

                this.m_y = 0;
                this.m_z = Math.atan2( m21, m11 );

            }

            break;

        case 'ZYX':

            this.m_y = Math.asin( -clamp( m31, -1, 1 ) );

            if ( Math.abs( m31 ) < 0.9999999 ) {

                this.m_x = Math.atan2( m32, m33 );
                this.m_z = Math.atan2( m21, m11 );

            } else {

                this.m_x = 0;
                this.m_z = Math.atan2( -m12, m22 );

            }

            break;

        case 'YZX':

            this.m_z = Math.asin( clamp( m21, -1, 1 ) );

            if ( Math.abs( m21 ) < 0.9999999 ) {

                this.m_x = Math.atan2( -m23, m22 );
                this.m_y = Math.atan2( -m31, m11 );

            } else {

                this.m_x = 0;
                this.m_y = Math.atan2( m13, m33 );

            }

            break;

        case 'XZY':

            this.m_z = Math.asin( -clamp( m12, -1, 1 ) );

            if ( Math.abs( m12 ) < 0.9999999 ) {

                this.m_x = Math.atan2( m32, m22 );
                this.m_y = Math.atan2( m13, m11 );

            } else {

                this.m_x = Math.atan2( -m23, m33 );
                this.m_y = 0;

            }

            break;

        default:

            console.warn( 'RS.Euler: .set_from_matrix() encountered an unknown order: ' + order );

        }

        this.m_order = order;

        return this;
    }

    /**
     * Sets this euler from a {@link RS.Quaternion}.
     * @private
     * @param {RS.Quaternion} q - the quaternion.
     * @param {String=} order - the order to use, if not supplied uses crrent order.
     * @return {Euler} `this`
     */
    set_from_quaternion(q, order) {
        const m = q.to_matrix();

        return this.set_from_matrix( m, order);
    }

    /**
     * Change the ordering of this euler to `new_order`.
     * @param {String} new_order - the new order.
     * @return {Euler} `this`
     */
    reorder(new_order) {

        // WARNING: this discards revolution information -bhouston

        const q = new Quaternion(this);

        return this.set_from_quaternion( q, new_order );
    }


    /**
     * Returns whether this euler is equal to another euler within a tolerance.
     * @param {RS.Euler} rhs - the euler to compare to.
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
                rhs.m_order === this.m_order);
    }

    /**
     * Returns whether this euler is equal to another euler within an optional tolerance.
     * @param {RS.Euler} rhs - the euler to compare to.
     * @param {Number=} tolerance - if provided then this level of tolerance is used, otherwise
     * uses an exact match.
     * @return {Boolean} `true` if equal, `false` if not.
     */
    equal(rhs, tolerance) {
        if (tolerance) {
            return this.equal_with_tolerance(rhs, tolerance);
        }
        return ( rhs.m_x === this.m_x ) && ( rhs.m_y === this.m_y ) && ( rhs.m_z === this.m_z ) &&
                ( rhs.m_order === this.m_order );
    }

    /**
     * Returns a matrix representing this euler rotation.
     * This will be a forward transformation, IE: an object to world space matrix.
     * The matrix can be passed to `RS.Math.Vector3.rotate` to rotate a vector by
     * this Euler.
     * @return {RS.Math.Matrix4x4} the matrix.
     */
    to_matrix() {
        const m = new Matrix4x4();

        const x = this.x, y = this.y, z = this.z;
        const a = Math.cos( x ), b = Math.sin( x );
        const c = Math.cos( y ), d = Math.sin( y );
        const e = Math.cos( z ), f = Math.sin( z );

        if ( this.order === 'XYZ' ) {

            const ae = a * e, af = a * f, be = b * e, bf = b * f;

            m.xx = c * e;
            m.yx = -c * f;
            m.zx = d;

            m.xy = af + be * d;
            m.yy = ae - bf * d;
            m.zy = -b * c;

            m.xz = bf - ae * d;
            m.yz = be + af * d;
            m.zz = a * c;

        } else if ( this.order === 'YXZ' ) {

            const ce = c * e, cf = c * f, de = d * e, df = d * f;

            m.xx = ce + df * b;
            m.yx = de * b - cf;
            m.zx = a * d;

            m.xy = a * f;
            m.yy = a * e;
            m.zy = -b;

            m.xz = cf * b - de;
            m.yz = df + ce * b;
            m.zz = a * c;

        } else if ( this.order === 'ZXY' ) {

            const ce = c * e, cf = c * f, de = d * e, df = d * f;

            m.xx = ce - df * b;
            m.yx = -a * f;
            m.zx = de + cf * b;

            m.xy = cf + de * b;
            m.yy = a * e;
            m.zy = df - ce * b;

            m.xz = -a * d;
            m.yz = b;
            m.zz = a * c;

        } else if ( this.order === 'ZYX' ) {

            const ae = a * e, af = a * f, be = b * e, bf = b * f;

            m.xx = c * e;
            m.yx = be * d - af;
            m.zx = ae * d + bf;

            m.xy = c * f;
            m.yy = bf * d + ae;
            m.zy = af * d - be;

            m.xz = -d;
            m.yz = b * c;
            m.zz = a * c;

        } else if ( this.order === 'YZX' ) {

            const ac = a * c, ad = a * d, bc = b * c, bd = b * d;

            m.xx = c * e;
            m.yx = bd - ac * f;
            m.zx = bc * f + ad;

            m.xy = f;
            m.yy = a * e;
            m.zy = -b * e;

            m.xz = -d * e;
            m.yz = ad * f + bc;
            m.zz = ac - bd * f;

        } else if ( this.order === 'XZY' ) {

            const ac = a * c, ad = a * d, bc = b * c, bd = b * d;

            m.xx = c * e;
            m.yx = -f;
            m.zx = d * e;

            m.xy = ac * f + bd;
            m.yy = a * e;
            m.zy = ad * f - bc;

            m.xz = bc * f - ad;
            m.yz = b * e;
            m.zz = bd * f + ac;

        }
        return m;
    }

    /**
     * Returns a quaternion representing this euler rotation.
     * @return {RS.Quaternion} the quaterion.
     */
    to_quaternion() {
        return new Quaternion(this);
    }
}

export { Euler };
