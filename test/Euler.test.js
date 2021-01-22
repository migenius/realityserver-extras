/******************************************************************************
 * Copyright 2010-2021 migenius pty ltd, Australia. All rights reserved.
 * Portions of this file are Copyright © 2010-2021 three.js authors
*****************************************************************************/
import { Euler } from '../src/Euler';
import { Quaternion } from '../src/Quaternion';

import { Vector3, Matrix4x4, radians } from '@migenius/realityserver-client';

const eulerZero = new Euler( 0, 0, 0, 'ZYX' );
const eulerAxyz = new Euler( 1, 0, 0, 'XYZ' );
const eulerAzyx = new Euler( 0, 1, 0, 'ZYX' );

// INSTANCING
test( 'Instancing', () => {

    let a = new Euler();
    expect(a).toBeEuler(eulerZero);
    expect(a).not.toBeEuler(eulerAxyz);
    expect(a).not.toBeEuler(eulerAzyx);
} );

test( 'rotation_orders', () => {

    expect(Array.isArray(Euler.rotation_orders)).toBeTruthy();
    expect(Euler.rotation_orders).toEqual([ 'XYZ', 'YZX', 'ZXY', 'XZY', 'YXZ', 'ZYX' ]);

} );

test( 'x', () => {

    let a = new Euler();
    expect( a.x).toBe(0);

    a = new Euler( 1, 2, 3 );
    expect( a.x).toBe(1);

    a = new Euler( 4, 5, 6, 'XYZ' );
    expect( a.x).toBe(4);

    a = new Euler( 7, 8, 9, 'XYZ' );
    a.x = 10;
    expect( a.x).toBe(10);

    a = new Euler( 11, 12, 13, 'XYZ' );
    a.x = 14;
    expect( a.x).toBe(14);

} );

test( 'y', () => {

    let a = new Euler();
    expect( a.y).toBe(0);

    a = new Euler( 1, 2, 3 );
    expect( a.y).toBe(2);

    a = new Euler( 4, 5, 6, 'XYZ' );
    expect( a.y).toBe(5);

    a = new Euler( 7, 8, 9, 'XYZ' );
    a.y = 10;
    expect( a.y).toBe(10);

    a = new Euler( 11, 12, 13, 'XYZ' );
    a.y = 14;
    expect( a.y).toBe(14);

} );


test('z', () => {

    let a = new Euler();
    expect( a.z).toBe(0);

    a = new Euler( 1, 2, 3 );
    expect( a.z).toBe(3);

    a = new Euler( 4, 5, 6, 'XYZ' );
    expect( a.z).toBe(6);

    a = new Euler( 7, 8, 9, 'XYZ' );
    a.z = 10;
    expect( a.z).toBe(10);

    a = new Euler( 11, 12, 13, 'XYZ' );
    a.z = 14;
    expect( a.z).toBe(14);

} );

test('order', () => {

    let a = new Euler();
    expect(a.order).toBe(Euler.default_order);

    a = new Euler( 1, 2, 3 );
    expect(a.order).toBe(Euler.default_order);

    a = new Euler( 4, 5, 6, 'YZX' );
    expect(a.order).toBe('YZX');

    a = new Euler( 7, 8, 9, 'YZX' );
    a.order = 'ZXY';
    expect(a.order).toBe('ZXY');

    a = new Euler( 11, 12, 13, 'YZX' );
    a.order = 'ZXY';
    expect(a.order).toBe('ZXY');


} );

test('set', () => {

    let a = new Euler();

    a.set( 0, 1, 0, 'ZYX' );
    expect(a).toBeEuler( eulerAzyx );
    expect(a).not.toBeEuler(eulerAxyz);
    expect(a).not.toBeEuler(eulerZero);

    let vec = new Vector3( 0, 1, 0 );

    // ctor passes through to set so just test via that
    let b = new Euler(vec, 'ZYX');
    expect(b).toBeEuler(a);

    b = new Euler(0, 1, 0, 'ZYX');
    expect(b).toBeEuler(a);

    b = new Euler([ 0, 1, 0 ], 'ZYX');
    expect(b).toBeEuler(a);

    b = new Euler(a);
    expect(b).toBeEuler(a);

} );

test( 'clone/equals', () => {

    let a = eulerAxyz.clone();
    expect( a.equal( eulerAxyz )).toBeTruthy();
    expect( a.equal( eulerZero )).toBeFalsy();
    expect( a.equal( eulerAzyx )).toBeFalsy();

    a.set( eulerAzyx );
    expect( a.equal( eulerAzyx )).toBeTruthy();
    expect( a.equal( eulerZero )).toBeFalsy();
    expect( a.equal( eulerAxyz )).toBeFalsy();

    let b = a.clone();
    expect(b).not.toBe(a); // is a copy
    expect(b).toBeEuler(a); // is the same values

    b.x += 0.001;

    expect( b.equal_with_tolerance(a)).toBeFalsy();
    expect( b.equal_with_tolerance(a, 0.0001)).toBeFalsy();
    expect( b.equal_with_tolerance(a, 0.01)).toBeTruthy();

} );

test( 'quaternion set', () => {

    let testValues = [ eulerZero, eulerAxyz, eulerAzyx ];
    for ( let i = 0; i < testValues.length; i++ ) {

        let v = testValues[i];
        let q = new Quaternion(v);

        // TODO: this uses matrix to do the conversion so can't be trusted yet
        let v2 = new Euler(q, v.order);
        let q2 = new Quaternion(v2);
        expect(q2).toBeQuaternion(q);
    }
} );

test( 'matrix set', () => {

    let testValues = [ eulerZero, eulerAxyz, eulerAzyx ];
    for ( let i = 0; i < testValues.length; i++ ) {
        // TODO: this uses matrix to do the conversion so can't be trusted yet
        let v = testValues[i];
        let m = new Euler(v).to_matrix();

        let v2 = new Euler(m, v.order );
        let m2 = v2.to_matrix();
        expect(m2).toBeMatrix4x4(m);
    }
} );

test( 'reorder', () => {

    let testValues = [ eulerZero, eulerAxyz, eulerAzyx ];
    for ( let i = 0; i < testValues.length; i++ ) {

        let v = testValues[i];
        let q = new Quaternion(v);

        // these are kind noop tests since the input Eulers only have single non-zero components.
        v.reorder( 'YZX' );
        let q2 = new Quaternion(v);
        expect(q2).toBeQuaternion(q);

        v.reorder( 'ZXY' );
        let q3 = new Quaternion(v);
        expect(q3).toBeQuaternion(q);

    }

} );

test('rotate vectors', () => {
    // rotate 1,0,0 by 90 in Z gives 0, 1 , 0
    let e = new Euler(radians(0), radians(0), radians(90), 'ZYX');
    let r = new Vector3(1, 0, 0).rotate(e.to_matrix());
    expect(r).toBeVector3(new Vector3(0, 1, 0));
    let e2 = new Euler(e.to_matrix(), 'ZYX');
    expect(e2).toBeEuler(e);

    e = new Euler(radians(90), radians(0), radians(90), 'ZYX');
    // rotate 1,0,0 by 90 in Z then 90 in Y gives 0, 0, 1
    r = new Vector3(1, 0, 0).rotate(e.to_matrix());
    expect(r).toBeVector3(new Vector3(0, 1, 0));
    e2 = new Euler(e.to_matrix(), 'ZYX');
    expect(e2).toBeEuler(e);

    e = new Euler(radians(0), radians(0), radians(45), 'ZYX');
    // rotate 1,0,0 by 45 in Z gives 0.7071068, 0.7071068, 0
    r = new Vector3(1, 0, 0).rotate(e.to_matrix());
    expect(r).toBeVector3(new Vector3(0.7071068, 0.7071068, 0));
    e2 = new Euler(e.to_matrix(), 'ZYX');
    expect(e2).toBeEuler(e);

    e = new Euler(radians(23), radians(-143), radians(42), 'YZX');
    // rotate 1,0,0 the above gives -0.5935019,0.6691306,0.4472357
    r = new Vector3(1, 0, 0).rotate(e.to_matrix());
    expect(r).toBeVector3(new Vector3(-0.5935019, 0.6691306, 0.4472357));
    e2 = new Euler(e.to_matrix(), 'YZX');
    expect(e2).toBeEuler(e);

    e = new Euler(new Matrix4x4(
        0, 1, 0, 0,
        0, 0, 1, 0,
        1, 0, 0, 0,
        0, 0, 0, 1
    ), 'ZYX');
    expect(e).toBeEuler(new Euler(radians(90), 0, radians(90), 'ZYX'));

    e = new Euler(new Matrix4x4(
        0.7071068, 0.7071068, 0, 0,
        -0.7071068, 0.7071068, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1
    ), 'ZYX');
    expect(e).toBeEuler(new Euler(radians(0), 0, radians(45), 'ZYX'));
});

test('explicit', () => {
    const e = new Euler(radians(-55.1442), radians(52.8430), radians(-29.6138), 'ZYX');
    // the below is the MI matrix for the above
    const m = new Matrix4x4(
        0.5251040, -0.2861571, 0.801486, 0,
        -0.298468, 0.8200341, 0.4883246, 0,
        -0.7969834, -0.4956391, 0.3451945, 0,
        0, 0, 0, 1
    ).invert();
    const m1 = e.to_matrix();
    expect(m1).toBeMatrix4x4(m);
});

test( 'gimbalLocalQuat', () => {

    // known problematic quaternions
    let q1 = new Quaternion( 0.5207769385244341, -0.4783214164122354, 0.520776938524434, 0.47832141641223547 );
    //let q2 = new Quaternion( 0.11284905712620674, 0.6980437630368944, -0.11284905712620674, 0.6980437630368944 );

    let eulerOrder = 'ZYX';

    // create Euler directly from a Quaternion
    let eViaQ1 = new Euler(q1, eulerOrder ); // there is likely a bug here

    // create Euler from Quaternion via an intermediate Matrix4
    let mViaQ1 = q1.to_matrix();
    let eViaMViaQ1 = new Euler(mViaQ1, eulerOrder );

    // the results here are different

    expect(eViaQ1).toBeQuaternion(eViaMViaQ1); // this result is correct

} );

