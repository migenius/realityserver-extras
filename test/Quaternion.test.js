/******************************************************************************
 * Copyright 2010-2021 migenius pty ltd, Australia. All rights reserved.
 * Portions of this file are Copyright © 2010-2021 three.js authors
*****************************************************************************/

import { Quaternion } from '../src/Quaternion';
import { Euler } from '../src/Euler';
const x = 2;
const y = 3;
const z = 4;
const w = 5;
const eps = 0.0001;

import { Vector3, Vector4, Matrix4x4, radians } from '@migenius/realityserver-client';

const orders = [ 'XYZ', 'YXZ', 'ZXY', 'ZYX', 'YZX', 'XZY' ];
const eulerAngles = new Euler( 0.1, -0.3, 0.25 );

function qSub( a, b ) {

    let result = new Quaternion();
    result.set( a );

    result.x -= b.x;
    result.y -= b.y;
    result.z -= b.z;
    result.w -= b.w;

    return result;

}

function changeEulerOrder( euler, order ) {
    return new Euler( euler.x, euler.y, euler.z, order );
}


test('default', () => {

    let a = new Quaternion();
    expect(a.x).toBe(0);
    expect(a.y).toBe(0);
    expect(a.z).toBe(0);
    expect(a.w).toBe(1);

    a = new Quaternion( x, y, z, w );
    expect(a.x).toBe(x);
    expect(a.y).toBe(y);
    expect(a.z).toBe(z);
    expect(a.w).toBe(w);
} );

test('properties', () => {
    const a = new Quaternion();

    a.x = x;
    a.y = y;
    a.z = z;
    a.w = w;

    expect(a.x).toBe(x);
    expect(a.y).toBe(y);
    expect(a.z).toBe(z);
    expect(a.w).toBe(w);

} );

test('x', () => {
    let a = new Quaternion();
    expect(a.x).toBe(0);

    a = new Quaternion( 1, 2, 3 );
    expect(a.x).toBe(1);

    a = new Quaternion( 4, 5, 6, 1 );
    expect(a.x).toBe(4);

    a = new Quaternion( 7, 8, 9 );
    a.x = 10;
    expect(a.x).toBe(10);

    a = new Quaternion( 11, 12, 13 );
    a.x = 14;
    expect(a.x).toBe(14);

});

test('y', () => {
    let a = new Quaternion();
    expect(a.y).toBe(0);

    a = new Quaternion( 1, 2, 3 );
    expect(a.y).toBe(2);

    a = new Quaternion( 4, 5, 6, 1 );
    expect(a.y).toBe(5);

    a = new Quaternion( 7, 8, 9 );
    a.y = 10;
    expect(a.y).toBe(10);

    a = new Quaternion( 11, 12, 13 );
    a.y = 14;
    expect(a.y).toBe(14);

});

test('z', () => {
    let a = new Quaternion();
    expect(a.z).toBe(0);

    a = new Quaternion( 1, 2, 3 );
    expect(a.z).toBe(3);

    a = new Quaternion( 4, 5, 6, 1 );
    expect(a.z).toBe(6);

    a = new Quaternion( 7, 8, 9 );
    a.z = 10;
    expect(a.z).toBe(10);

    a = new Quaternion( 11, 12, 13 );
    a.z = 14;
    expect(a.z).toBe(14);

});

test('w', () => {
    let a = new Quaternion();
    expect(a.w).toBe(1);

    a = new Quaternion( 1, 2, 3 );
    expect(a.w).toBe(1);

    a = new Quaternion( 4, 5, 6, 1 );
    expect(a.w).toBe(1);

    a = new Quaternion( 7, 8, 9 );
    a.w = 10;
    expect(a.w).toBe(10);

    a = new Quaternion( 11, 12, 13 );
    a.w = 14;
    expect(a.w).toBe(14);

});

test( 'set', () => {

    {
        let a = new Quaternion();
        expect(a.x).toBe(0);
        expect(a.y).toBe(0);
        expect(a.z).toBe(0);
        expect(a.w).toBe(1);

        a.set( x, y, z, w );
        expect(a.x).toBe(x);
        expect(a.y).toBe(y);
        expect(a.z).toBe(z);
        expect(a.w).toBe(w);
    }
    {
        let a = new Quaternion();
        a.set( x );
        expect(a.x).toBe(x);
        expect(a.y).toBe(0);
        expect(a.z).toBe(0);
        expect(a.w).toBe(1);
    }
    {
        let a = new Quaternion();
        a.set( [ x, y, z, w ] );
        expect(a.x).toBe(x);
        expect(a.y).toBe(y);
        expect(a.z).toBe(z);
        expect(a.w).toBe(w);
    }
    {
        let a = new Quaternion();
        a.set( { x, y, z, w } );
        expect(a.x).toBe(x);
        expect(a.y).toBe(y);
        expect(a.z).toBe(z);
        expect(a.w).toBe(w);
    }
    {
        let a = new Quaternion();
        a.set( new Quaternion(x, y, z, w) );
        expect(a.x).toBe(x);
        expect(a.y).toBe(y);
        expect(a.z).toBe(z);
        expect(a.w).toBe(w);
    }
} );


test( 'clone', () => {
    let a = new Quaternion().clone();
    expect(a.x).toBe(0);
    expect(a.y).toBe(0);
    expect(a.z).toBe(0);
    expect(a.w).toBe(1);

    let b = a.set( x, y, z, w ).clone();
    expect(b.x).toBe(x);
    expect(b.y).toBe(y);
    expect(b.z).toBe(z);
    expect(b.w).toBe(w);
    expect(b).not.toBe(a);

} );

test( 'set with Euler/Quaternion', () => {

    let angles = [ new Vector3( 1, 0, 0 ), new Vector3( 0, 1, 0 ), new Vector3( 0, 0, 1 ) ];

    // ensure euler conversion to/from Quaternion matches.
    for ( let i = 0; i < orders.length; i++ ) {

        for ( let j = 0; j < angles.length; j++ ) {

            let eulers2 = new Euler(new Quaternion(
                new Euler( angles[j].x,
                    angles[j].y,
                    angles[j].z, orders[i] ) ),
            orders[i] );
            let newAngle = new Vector3( eulers2.x, eulers2.y, eulers2.z );
            expect(newAngle.distance( angles[j] )).toBeLessThan(0.001);
        }
    }

} );


test( 'set_rotation_around_axis', () => {

    // assert.ok( true, "Passed!" );

    let zero = new Quaternion();

    let a = new Quaternion().set_rotation_around_axis( new Vector3( 1, 0, 0 ), 0 );
    expect(a).toBeQuaternion(zero);
    a = new Quaternion().set_rotation_around_axis( new Vector3( 0, 1, 0 ), 0 );
    expect(a).toBeQuaternion(zero);
    a = new Quaternion().set_rotation_around_axis( new Vector3( 0, 0, 1 ), 0 );
    expect(a).toBeQuaternion(zero);

    let b1 = new Quaternion().set_rotation_around_axis( new Vector3( 1, 0, 0 ), Math.PI );
    expect(a).not.toBeQuaternion(b1);
    let b2 = new Quaternion().set_rotation_around_axis( new Vector3( 1, 0, 0 ), -Math.PI );
    expect(a).not.toBeQuaternion(b2);

    b1.multiply( b2 );
    expect(a).toBeQuaternion( b1 );

    b1 = new Quaternion().set_rotation_around_axis( new Vector3( 0.5070926, 0.8451543, -0.1690309 ), radians(34) );
    expect(a).not.toBeQuaternion(b1);
    expect(b1).toBeQuaternion(new Quaternion(0.1482595, 0.2470992, -0.0494198, 0.9563047));
    b2 = new Quaternion().set_rotation_around_axis( new Vector3( 0.5070926, 0.8451543, -0.1690309 ), radians(-34) );
    expect(a).not.toBeQuaternion(b2);
    expect(b2).toBeQuaternion(new Quaternion(-0.1482595, -0.2470992, 0.0494198, 0.9563047));

    b1.multiply( b2 );
    expect(a).toBeQuaternion( b1 );

} );

test( 'set with Euler/Matrix', () => {

    // ensure euler conversion for Quaternion matches that of Matrix4
    for ( let i = 0; i < orders.length; i++ ) {

        let q = new Quaternion(changeEulerOrder( eulerAngles, orders[i] ) );
        //let m = new Matrix4().makeRotationFromEuler( changeEulerOrder( eulerAngles, orders[i] ) );
        let m = changeEulerOrder( eulerAngles, orders[i] ).to_matrix();
        let q2 = new Quaternion(m);

        expect(qSub( q, q2 ).length()).toBeLessThan(0.001);
    }

} );

test( 'set from matrix', () => {

    // contrived examples purely to please the god of code coverage...
    // match conditions in letious 'else [if]' blocks

    let a = new Quaternion();
    let q = new Quaternion( -9, -2, 3, -4 ).normalize();
    let m = q.to_matrix();
    let expected = new Vector4( 0.8581163303210332,
        0.19069251784911848,
        -0.2860387767736777,
        0.38138503569823695 );

    a.set( m );
    expect( Math.abs( a.x - expected.x )).toBeLessThanOrEqual(eps);//, 'm11 > m22 && m11 > m33: check x' );
    expect( Math.abs( a.y - expected.y )).toBeLessThanOrEqual(eps);//, 'm11 > m22 && m11 > m33: check y' );
    expect( Math.abs( a.z - expected.z )).toBeLessThanOrEqual(eps);//, 'm11 > m22 && m11 > m33: check z' );
    expect( Math.abs( a.w - expected.w )).toBeLessThanOrEqual(eps);//, 'm11 > m22 && m11 > m33: check w' );

    q = new Quaternion( -1, -2, 1, -1 ).normalize();
    m = q.to_matrix();
    expected = new Vector4( 0.37796447300922714,
        0.7559289460184544,
        -0.37796447300922714,
        0.37796447300922714 );

    a.set( m );
    expect( Math.abs( a.x - expected.x )).toBeLessThanOrEqual(eps);//, 'm22 > m33: check x' );
    expect( Math.abs( a.y - expected.y )).toBeLessThanOrEqual(eps);//, 'm22 > m33: check y' );
    expect( Math.abs( a.z - expected.z )).toBeLessThanOrEqual(eps);//, 'm22 > m33: check z' );
    expect( Math.abs( a.w - expected.w )).toBeLessThanOrEqual(eps);//, 'm22 > m33: check w' );

    q = new Quaternion([ 0.1066729, 0.055073, -0.0302653, 0.9923063 ]);
    m = q.to_matrix();
    expect(m).toBeMatrix4x4(new Matrix4x4(
        [   0.9921020, -0.0483154,  -0.1157556, 0,
            0.0718144, 0.9754098, 0.2083708, 0,
            0.1028416, -0.2150380,  0.9711757, 0,
            0, 0, 0, 1 ]));
    let q2 = new Quaternion(m);
    expect(q2).toBeQuaternion(q);
} );

test( 'set_from_unit_vectors', () => {

    let a = new Quaternion();
    let b = new Vector3( 1, 0, 0 );
    let c = new Vector3( 0, 1, 0 );
    let expected = new Quaternion( 0, 0, Math.sqrt( 2 ) / 2, Math.sqrt( 2 ) / 2 );

    a.set_from_unit_vectors( b, c );
    expect( Math.abs( a.x - expected.x )).toBeLessThanOrEqual(eps);//, 'Check x' );
    expect( Math.abs( a.y - expected.y )).toBeLessThanOrEqual(eps);//, 'Check y' );
    expect( Math.abs( a.z - expected.z )).toBeLessThanOrEqual(eps);//, 'Check z' );
    expect( Math.abs( a.w - expected.w )).toBeLessThanOrEqual(eps);//, 'Check w' );

} );

test( 'angle_to', () => {

    let a = new Quaternion();
    let b = new Quaternion(new Euler( 0, Math.PI, 0 ) );
    let c = new Quaternion(new Euler( 0, Math.PI * 2, 0 ) );

    expect( a.angle_to( a )).toBe(0);
    expect( a.angle_to( b )).toBe(Math.PI);
    expect( a.angle_to( c )).toBe(0);

} );

test( 'rotate_towards', () => {

    let a = new Quaternion();
    let b = new Quaternion( new Euler( 0, Math.PI, 0 ) );
    let c = new Quaternion();

    let halfPI = Math.PI * 0.5;

    a.rotate_towards( b, 0 );
    expect(a).toBeQuaternion( a );

    a.rotate_towards( b, Math.PI * 2 ); // test overshoot
    expect(a).toBeQuaternion( b );

    a.set( 0, 0, 0, 1 );
    a.rotate_towards( b, halfPI );
    expect( a.angle_to( c ) - halfPI).toBeLessThanOrEqual(eps);

} );

test( 'identity', () => {

    let a = new Quaternion();

    a.set( x, y, z, w );
    a.identity();

    expect( a.x).toBe(0);
    expect( a.y).toBe(0);
    expect( a.z).toBe(0);
    expect( a.w).toBe(1);

} );

test( 'invert/conjugate', () => {

    let a = new Quaternion( x, y, z, w );

    // TODO: add better validation here.

    let b = a.clone().conjugate();

    expect(a.x).toBe(-b.x);
    expect(a.y).toBe(-b.y);
    expect(a.z).toBe(-b.z);
    expect(a.w).toBe( b.w);

} );

test( 'dot', () => {

    let a = new Quaternion();
    let b = new Quaternion();

    expect(a.dot( b )).toBe(1);
    a = new Quaternion( 1, 2, 3, 1 );
    b = new Quaternion( 3, 2, 1, 1 );

    expect( a.dot( b )).toBe(11);
} );

test( 'normalize/length/lengthSq', () => {

    let a = new Quaternion( x, y, z, w );

    expect( a.length()).toBe(Math.sqrt(x*x+y*y+z*z+w*w));
    expect( a.length_sq()).toBe(x*x+y*y+z*z+w*w);
    a.normalize();
    expect( a.length()).toBe(1);
    expect( a.length_sq()).toBe(1);

    a.set( 0, 0, 0, 0 );
    expect( a.length_sq()).toBe(0);
    expect( a.length()).toBe(0);
    a.normalize();
    expect( a.length_sq()).toBe(1);
    expect( a.length()).toBe(1);

} );

test( 'equal', () => {

    let a = new Quaternion( x, y, z, w );
    let b = new Quaternion( x, y, z, w );

    expect( a.equal(b)).toBeTruthy();
    expect( a.equal_with_tolerance(b)).toBeTruthy();
    b.x += 0.001;
    expect( a.equal(b)).not.toBeTruthy();
    expect( a.equal_with_tolerance(b)).not.toBeTruthy();
    expect( a.equal_with_tolerance(b, 0.01)).toBeTruthy();

} );
test( 'multiplyQuaternions/multiply', () => {

    let angles = [ new Euler( 1, 0, 0 ), new Euler( 0, 1, 0 ), new Euler( 0, 0, 1 ) ];

    let q1 = new Quaternion(changeEulerOrder( angles[0], 'XYZ' ));
    let q2 = new Quaternion(changeEulerOrder( angles[1], 'XYZ' ));
    let q3 = new Quaternion(changeEulerOrder( angles[2], 'XYZ' ));

    let q = new Quaternion().multiply_quaternions( q1, q2 ).multiply( q3 );

    let m1 = changeEulerOrder( angles[0], 'XYZ' ).to_matrix();
    let m2 = changeEulerOrder( angles[1], 'XYZ' ).to_matrix();
    let m3 = changeEulerOrder( angles[2], 'XYZ' ).to_matrix();

    let m = new Matrix4x4(m3).multiply(m2).multiply(m1);

    let qFromM = new Quaternion(m);

    expect(q).toBeQuaternion(qFromM);
    //assert.ok( qSub( q, qFromM ).length() < 0.001, 'Passed!' );

} );

test( 'premultiply', () => {

    let a = new Quaternion( x, y, z, w );
    let b = new Quaternion( 2 * x, -y, -2 * z, w );
    let expected = new Quaternion( 42, -32, -2, 58 );

    a.premultiply( b );
    expect( Math.abs( a.x - expected.x )).toBeLessThanOrEqual(eps);
    expect( Math.abs( a.y - expected.y )).toBeLessThanOrEqual(eps);
    expect( Math.abs( a.z - expected.z )).toBeLessThanOrEqual(eps);
    expect( Math.abs( a.w - expected.w )).toBeLessThanOrEqual(eps);

} );

test( 'slerp', () => {

    let a = new Quaternion( x, y, z, w );
    let b = new Quaternion( -x, -y, -z, -w );

    let c = a.clone().slerp( b, 0 );
    let d = a.clone().slerp( b, 1 );

    expect(a).toBeQuaternion(c);
    expect(b).toBeQuaternion(d);

    let D = Math.SQRT1_2;

    let e = new Quaternion( 1, 0, 0, 0 );
    let f = new Quaternion( 0, 0, 1, 0 );
    let expected = new Quaternion( D, 0, D, 0 );
    let result = e.clone().slerp( f, 0.5 );
    expect(result).toBeQuaternion(expected);

    let g = new Quaternion( 0, D, 0, D );
    let h = new Quaternion( 0, -D, 0, D );
    expected = new Quaternion( 0, 0, 0, 1 );
    result = g.clone().slerp( h, 0.5 );

    expect(result).toBeQuaternion(expected);

} );

test( 'rotate_vector', () => {

    let angles = [ new Euler( 1, 0, 0 ), new Euler( 0, 1, 0 ), new Euler( 0, 0, 1 ) ];

    // ensure euler conversion for Quaternion matches that of Matrix4
    for ( let i = 0; i < orders.length; i++ ) {

        for ( let j = 0; j < angles.length; j++ ) {

            let q = new Quaternion(changeEulerOrder( angles[j], orders[i] ) );
            let m = changeEulerOrder( angles[j], orders[i] ).to_matrix();

            let v0 = new Vector3( 1, 0, 0 );
            let qv = q.rotate_vector(v0.clone());

            let mv = v0.clone().rotate( m );

            expect(qv).toBeVector3(mv);

        }

    }

} );

