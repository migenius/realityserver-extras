/******************************************************************************
 * Copyright 2010-2019 migenius pty ltd, Australia. All rights reserved.
 *****************************************************************************/
import { Transform } from '../src/Transform';
import { Vector3, Matrix4x4, Math as RS_math } from 'realityserver-client';

test('default', () => {
    const transform = new Transform();
    const Identity = new Matrix4x4();

    expect(transform.world_to_obj).toBeMatrix4x4(Identity);
    expect(transform.x_axis).toBeVector3(new Vector3(1, 0, 0));
    expect(transform.y_axis).toBeVector3(new Vector3(0, 1, 0));
    expect(transform.z_axis).toBeVector3(new Vector3(0, 0, 1));
    expect(transform.translation).toBeVector3(new Vector3(0, 0, 0, 1));
    expect(transform.scale).toBeVector3(new Vector3(1, 1, 1));

});

test('set world_to_obj', () => {
    const transform = new Transform();

    transform.world_to_obj = new Matrix4x4({
        xx: 0.9063078165054321, xy: -0.2716537714004517, xz: 0.3237443566322327, xw: 0,
        yx: -2.775557561562891e-17, yy: 0.7660444378852844, yz: 0.6427876353263855, yw: 0,
        zx: -0.4226182699203491, zy: -0.5825634002685547, zz: 0.6942720413208008, zw: 0,
        wx: -0.0005766593385487795, wy: -0.01665955409407616, wz: -0.2741777300834656, ww: 1
    });

    expect(transform.world_to_obj).toBeMatrix4x4(new Matrix4x4({
        ww: 1, wz: -0.2741777300834656, wy: -0.01665955409407616, wx: -0.0005766593385487795,
        zw: 0, zz: 0.6942720413208008, zy: -0.5825634002685547, zx: -0.4226182699203491,
        yw: 0, yz: 0.6427876353263855, yy: 0.7660444378852844, yx: -2.775557561562891e-17,
        xw: 0, xz: 0.3237443566322327, xy: -0.2716537714004517, xx: 0.9063078165054321 }));

    expect(transform.translation).toBeVector3(
        new Vector3(0.08476049553891127, 0.18900000243478815, 0.18040497944778802));
    expect(transform.x_axis).toBeVector3(new Vector3(0.9063077917371404, 5.185256700623759e-9, -0.42261825166046507));
    expect(transform.y_axis).toBeVector3(new Vector3(-0.27165378746517177, 0.7660444269818932, -0.5825634348685216));
    expect(transform.z_axis).toBeVector3(new Vector3(0.3237443704899228, 0.642787601163245, 0.6942720521286195));
    expect(transform.scale).toBeVector3(new Vector3(1, 1, 1));
});

test('set world_to_obj', () => {
    const transform = new Transform();

    transform.world_to_obj = new Matrix4x4({
        xx: 0.9063078165054321/2, xy: -0.2716537714004517/.2, xz: 0.3237443566322327/4, xw: 0,
        yx: -2.775557561562891e-17/2, yy: 0.7660444378852844/.2, yz: 0.6427876353263855/4, yw: 0,
        zx: -0.4226182699203491/2, zy: -0.5825634002685547/.2, zz: 0.6942720413208008/4, zw: 0,
        wx: -0.0005766593385487795, wy: -0.01665955409407616, wz: -0.2741777300834656, ww: 1
    });

    expect(transform.world_to_obj).toBeMatrix4x4(new Matrix4x4({
        ww: 1, wz: -0.2741777300834656, wy: -0.01665955409407616, wx: -0.0005766593385487795,
        zw: 0, zz: 0.6942720413208008/4, zy: -0.5825634002685547/.2, zx: -0.4226182699203491/2,
        yw: 0, yz: 0.6427876353263855/4, yy: 0.7660444378852844/.2, yx: -2.775557561562891e-17/2,
        xw: 0, xz: 0.3237443566322327/4, xy: -0.2716537714004517/.2, xx: 0.9063078165054321/2 }));

    expect(transform.translation).toBeVector3(
        new Vector3(0.3551941184369366, 0.7075045663839591, 0.7589872707100626));
    expect(transform.x_axis).toBeVector3(new Vector3(0.9063077917371404, 5.185256700623759e-9, -0.42261825166046507));
    expect(transform.y_axis).toBeVector3(new Vector3(-0.27165378746517177, 0.7660444269818932, -0.5825634348685216));
    expect(transform.z_axis).toBeVector3(new Vector3(0.3237443704899228, 0.642787601163245, 0.6942720521286195));
    expect(transform.scale).toBeVector3(new Vector3(2, 0.2, 4));
});

test('set translation', () => {
    const transform = new Transform();
    const translate = new Vector3(-2.3, 5.4, 103.4);
    transform.translation = translate;

    expect(transform.translation).toBeVector3(translate);
    expect(transform.world_to_obj).toBeMatrix4x4(new Matrix4x4(
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        2.3, -5.4, -103.4, 1
    ));
});
test('set scale', () => {
    const transform = new Transform();
    const scale = new Vector3(-2.3, 5.4, 103.4);
    transform.scale = scale;

    expect(transform.scale).toBeVector3(scale);
    expect(transform.world_to_obj).toBeMatrix4x4(new Matrix4x4(
        1/-2.3, 0, 0, 0,
        0, 1/5.4, 0, 0,
        0, 0, 1/103.4, 0,
        0, 0, 0, 1
    ));
});


test('set rotate', () => {
    const transform = new Transform();
    transform.set_rotation(RS_math.radians(45), 0, 0);

    expect(transform.x_axis).toBeVector3(new Vector3(1, 0, 0, 1));
    expect(transform.world_to_obj).toBeMatrix4x4(new Matrix4x4(
        1, 0, 0, 0,
        0, 0.7071067811865475, -0.7071067811865475, 0,
        0, 0.7071067811865475, 0.7071067811865475, 0,
        0, 0, 0, 1
    ));

    const transform2 = new Transform();
    transform2.set_rotation(RS_math.radians(129), RS_math.radians(-32), RS_math.radians(64));

    expect(transform2.world_to_obj).toBeMatrix4x4(new Matrix4x4(
        0.3717598164443862, 0.3850973914558067, 0.84468611801732, 0,
        0.7622205798007392, -0.6460214145897677, -0.04094043990555752, 0,
        0.529919264233205, 0.6590571530492396, -0.533693959502232, 0,
        0, 0, 0, 1
    ));
});
